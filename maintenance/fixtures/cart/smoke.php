<?php

declare(strict_types=1);

[$script, $source, $autoload] = $argv + [null, null, null];
if (!$source || !$autoload) { throw new RuntimeException('Usage: php smoke.php RELEASE_SOURCE VENDOR_AUTOLOAD'); }
$source = realpath($source) ?: throw new RuntimeException('Missing source');
$loader = require $autoload;
$loader->setPsr4('OfflineAgency\\LaravelCart\\', $source.'/src');

use Illuminate\Config\Repository;
use Illuminate\Events\Dispatcher;
use Illuminate\Foundation\Application;
use Illuminate\Session\SessionManager;
use Illuminate\Support\Facades\Facade;
use Illuminate\Translation\ArrayLoader;
use Illuminate\Translation\Translator;
use OfflineAgency\LaravelCart\CartCoupon;
use OfflineAgency\LaravelCart\CartItem;
use OfflineAgency\LaravelCart\Events\CartItemAdded;
use OfflineAgency\LaravelCart\Events\CartItemRemoved;
use OfflineAgency\LaravelCart\Events\CartItemUpdated;
use OfflineAgency\LaravelCart\Events\CouponApplied;
use OfflineAgency\LaravelCart\Exceptions\CartLimitExceededException;
use OfflineAgency\LaravelCart\Facades\Cart;
use OfflineAgency\LaravelCart\Storage\SessionStorage;

$app = new Application(sys_get_temp_dir());
$config = require $source.'/config/cart.php';
$app->instance('config', new Repository(['cart' => $config, 'session' => ['driver' => 'array', 'lifetime' => 120, 'serialization' => 'php']]));
$app->instance('events', new Dispatcher($app));
$app->instance('translator', new Translator(new ArrayLoader(), 'en'));
$app->singleton('session', fn ($app) => new SessionManager($app));
$app->singleton('cart', fn ($app) => new OfflineAgency\LaravelCart\Cart(new SessionStorage($app['session']), $app['events']));
Facade::setFacadeApplication($app);
$app['session']->start();
function check(bool $condition, string $label): void { if (!$condition) { throw new RuntimeException($label); } }
function amount(float $actual, float $expected, string $label): void { check(abs($actual - $expected) < 0.000001, "$label: $actual != $expected"); }
check(str_starts_with((new ReflectionClass(OfflineAgency\LaravelCart\Cart::class))->getFileName(), $source.'/'), 'Wrong source loaded');

Cart::instance('shopping');
$item = Cart::add(['id' => 'shirt-42', 'name' => 'Cotton shirt', 'qty' => 2, 'price' => 10.00, 'options' => ['size' => 'M', 'color' => 'blue']]);
$rowId = $item->rowId;
check($rowId !== 'shirt-42' && Cart::count() === 2 && Cart::uniqueCount() === 1, 'Product versus row identity');
amount(Cart::subtotal(), 20.0, 'quickstart subtotal'); amount(Cart::vat(), 0.0, 'quickstart vat'); amount(Cart::total(), 20.0, 'quickstart total');
Cart::update($rowId, 3); check(Cart::get($rowId)->qty === 3, 'Row quantity update');
Cart::remove($rowId); check(Cart::isEmpty(), 'Row removal');

Cart::instance('item-coupon');
$item = Cart::add(['id' => 'shirt', 'name' => 'Shirt', 'qty' => 3, 'price' => 81.97, 'totalPrice' => 100.0, 'vat' => 18.03]);
Cart::addItemCoupon($item->rowId, 'ITEM20', 'percentage', 20.0);
amount(Cart::total(), 280.0, 'One discounted unit');
config(['cart.tax.default_rate' => 22.0, 'cart.tax.tax_behavior' => 'exclusive']);
Cart::instance('tax'); $item = Cart::add(['id' => 'A', 'name' => 'Item A', 'qty' => 1, 'price' => 100.0]);
amount($item->price, 100, 'net'); amount($item->vat, 22, 'vat'); amount($item->totalPrice, 122, 'gross');
config(['cart.tax.tax_behavior' => 'inclusive']);
$item = Cart::add(['id' => 'B', 'name' => 'Item B', 'qty' => 1, 'price' => 122.0]);
amount($item->price, 100, 'inclusive net'); amount($item->vat, 22, 'inclusive vat');
config(['cart.tax.default_rate' => 0.0]);

$rounder = new CartItem(1, 'Rounding', '', 1, 10.0, 10.0, '', '', 0.0);
foreach ([PHP_ROUND_HALF_UP => 0.13, PHP_ROUND_HALF_DOWN => 0.12, PHP_ROUND_HALF_EVEN => 0.12, PHP_ROUND_HALF_ODD => 0.13] as $mode => $expected) {
    config(['cart.format.rounding_mode' => $mode]); amount($rounder->formatFloat(0.125), $expected, 'Rounding mode '.$mode);
}
config(['cart.format.rounding_mode' => RoundingMode::TowardsZero]);
Cart::instance('rounding'); Cart::add('1', 'Item', '', 1, 10.0, 10.129, 0.129);
amount(Cart::total(), 10.12, 'TowardsZero gross'); amount(Cart::vat(), 0.12, 'TowardsZero vat');
config(['cart.format.rounding_mode' => PHP_ROUND_HALF_UP]);

$couponStatus = 'SKIP (BCMath unavailable)';
if (extension_loaded('bcmath')) {
    Cart::instance('cart-coupons'); Cart::add(['id' => 'A', 'name' => 'A', 'qty' => 3, 'price' => 100.0]);
    // Add fixed first to prove calculation groups percentages before fixed discounts.
    Cart::addCoupon(new CartCoupon(hash: 'fixed', code: 'SAVE5', type: 'fixed', value: 5.0, isGlobal: true));
    Cart::addCoupon(new CartCoupon(hash: 'percent', code: 'WELCOME10', type: 'percentage', value: 10.0, isGlobal: true));
    amount(Cart::total(), 265.0, 'Percent then fixed'); amount(Cart::discount(), 35.0, 'Cart discount'); amount(Cart::subtotal(), 300.0, 'Unallocated subtotal');
    Cart::removeCartCoupon('SAVE5');
    Cart::addCoupon(new CartCoupon(hash: 'percent20', code: 'PCT20', type: 'percentage', value: 20.0, isGlobal: true));
    amount(Cart::total(), 216.0, 'Sequential percentages');
    $couponStatus = 'PASS (BCMath enabled)';
}
Cart::instance('meta'); Cart::setMeta('delivery', ['note' => 'Side entrance']);
check(Cart::getMeta('delivery.note') === 'Side entrance', 'Nested metadata read');
$snapshot = Cart::snapshot(); check(isset($snapshot['timestamp']) && $snapshot['meta']['delivery']['note'] === 'Side entrance', 'Memory snapshot metadata');
Cart::instance('other'); check(Cart::getMeta('delivery') === null, 'Metadata instance isolation');
Cart::instance('meta'); Cart::forgetMeta('delivery'); check(Cart::meta() === [], 'Forget metadata');

Cart::instance('sync'); Cart::add(['id' => 'A', 'name' => 'Original', 'qty' => 1, 'price' => 10.0, 'options' => ['size' => 'M']]);
Cart::add(['id' => 'A', 'name' => 'Variant', 'qty' => 2, 'price' => 10.0, 'options' => ['size' => 'L']]);
Cart::sync([['id' => 'A', 'name' => 'Replacement', 'qty' => 4, 'price' => 999.0]]);
check(Cart::uniqueCount() === 2 && Cart::content()->first()->qty === 4 && Cart::content()->last()->qty === 2 && Cart::content()->first()->name === 'Original', 'Sync first product match, not full reconciliation');
Cart::instance('limits'); config(['cart.limits.max_items' => 1]);
Cart::add(['id' => 'one', 'name' => 'One', 'qty' => 1, 'price' => 1.0]);
try { Cart::add(['id' => 'two', 'name' => 'Two', 'qty' => 1, 'price' => 1.0]); throw new RuntimeException('Limit accepted'); }
catch (CartLimitExceededException $exception) { /* Do not infer whole-operation rollback. */ }
config(['cart.limits.max_items' => null, 'cart.limits.min_total' => 10.0]);
check(!Cart::meetsMinimum(), 'Minimum queried separately');
config(['cart.limits.min_total' => null]);

$fake = Cart::fake(); Cart::instance('fake-test');
$item = Cart::add(['id' => 'fake', 'name' => 'Fake test', 'qty' => 1, 'price' => 10.0]);
$fake->assertDispatched(CartItemAdded::class, fn (CartItemAdded $event): bool => $event->cartItem->id === 'fake');
$fake->assertDispatchedTimes(CartItemAdded::class, 1); $fake->assertNotDispatched(CartItemRemoved::class);
Cart::update($item->rowId, 2); Cart::remove($item->rowId);
$fake->assertDispatchedTimes(CartItemUpdated::class, 1); $fake->assertDispatchedTimes(CartItemRemoved::class, 1);
check(count($fake->recorder()->recorded(CartItemAdded::class)) === 1, 'Recorder');
echo 'PASS: release source, SessionStorage array driver, quickstart20, item-coupon280, tax122, rounding4modes+TowardsZero, meta/snapshot, sync, limits, CartFake typed events; cart coupons '.$couponStatus.'. PHP '.PHP_VERSION.'; Laravel '.Composer\InstalledVersions::getPrettyVersion('laravel/framework')."\n";
