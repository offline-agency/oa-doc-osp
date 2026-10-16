<?php

use App\Services\DemoCart;
use Illuminate\Auth\GenericUser;
use Illuminate\Validation\ValidationException;
use OfflineAgency\LaravelCart\Cart;
use OfflineAgency\LaravelCart\CartServiceProvider;
use OfflineAgency\LaravelCart\Resources\CartResource;
use Orchestra\Testbench\TestCase;
use Symfony\Component\HttpKernel\Exception\HttpException;

final class RecipeTest extends TestCase
{
    protected function getPackageProviders($app): array
    {
        return [CartServiceProvider::class];
    }

    protected function getEnvironmentSetUp($app): void
    {
        $app['config']->set('session.driver', 'array');
        $app['config']->set('cart.storage.driver', 'session');
    }

    public function test_catalog_variants_and_resources_ignore_submitted_prices(): void
    {
        $this->actingAs(new GenericUser(['id' => 7]));
        $service = app(DemoCart::class);
        $m = $service->add(['product_id' => 101, 'size' => 'M', 'qty' => 1, 'price' => 0.01]);
        $l = $service->add(['product_id' => 101, 'size' => 'L', 'qty' => 2, 'vat' => 0]);
        $cart = app(Cart::class)->instance('shopping');
        self::assertNotSame($m->rowId, $l->rowId);
        self::assertSame(3, $cart->count());
        self::assertSame(2, $cart->uniqueCount());
        self::assertSame(1, $cart->content()->pluck('id')->unique()->count());
        self::assertSame(73.2, (new CartResource($cart))->toArray(request())['total']);
        self::assertSame(13.2, $cart->vat());
        $service->add(['product_id' => 101, 'size' => 'M', 'qty' => 1], 'wishlist');
        self::assertSame(1, $cart->instance('wishlist')->count());
        self::assertSame(3, $cart->instance('shopping')->count());
    }

    public function test_invalid_variant_does_not_mutate(): void
    {
        $this->actingAs(new GenericUser(['id' => 7]));
        try {
            app(DemoCart::class)->add(['product_id' => 101, 'size' => 'XL', 'qty' => 1]);
            self::fail('Invalid variant accepted');
        } catch (ValidationException $e) {
            self::assertArrayHasKey('size', $e->errors());
            self::assertTrue(app(Cart::class)->instance('shopping')->isEmpty());
        }
    }

    public function test_zero_quantity_and_unknown_product_are_rejected(): void
    {
        $this->actingAs(new GenericUser(['id' => 7]));
        try {
            app(DemoCart::class)->add(['product_id' => 999, 'size' => 'M', 'qty' => 0]);
            self::fail('Invalid input accepted');
        } catch (ValidationException $e) {
            self::assertArrayHasKey('product_id', $e->errors());
            self::assertArrayHasKey('qty', $e->errors());
            self::assertTrue(app(Cart::class)->instance('shopping')->isEmpty());
        }
    }

    public function test_guest_is_rejected(): void
    {
        $this->expectException(HttpException::class);
        app(DemoCart::class)->add(['product_id' => 101, 'size' => 'M', 'qty' => 1]);
    }
}
