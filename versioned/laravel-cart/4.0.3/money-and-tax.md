---
title: 'Money, VAT, coupons and rounding — 4.0.3'
description: 'Released Laravel Cart 4.0.3: money, vat, coupons and rounding.'
permalink: /laravel-cart/4.0.3/money-and-tax/
packageVersion: 4.0.3
cartRelease: 4.0.3
sourceCommit: 60eb1006c9c2b31ff50cebd7b8b677a1dd16cc16
documentationSnapshot: true
---

# Money, VAT, coupons and rounding

::: warning VAT is before cart-level coupons
Stable 4.0.3 has no post-discount tax allocation API. `vat()` and `vatBreakdown()` do not allocate cart coupons to payable VAT. Do not print their sum as a tax-compliant discounted invoice without your own verified fiscal calculation. PR #50 also documents this limitation.
:::

## Net, VAT amount and gross

`price` is net per unit, `vat` is the VAT **amount** per unit and `totalPrice` is gross per unit. `cart.tax.default_rate` is the percentage used only when VAT is omitted/null. Explicit zero VAT disables automatic calculation.

```php
use OfflineAgency\LaravelCart\Facades\Cart;

config(['cart.tax.default_rate' => 22.0, 'cart.tax.tax_behavior' => 'exclusive']);
$item = Cart::add(['id' => 'A', 'name' => 'Item A', 'qty' => 1, 'price' => 100.0]);
// net 100.0, VAT 22.0, gross 122.0
```

With `tax_behavior = inclusive`, input `price = 122.0` and omitted VAT extracts net 100.0 and VAT 22.0. When explicitly supplying net/gross/VAT, the application is responsible for consistency. See the [stable repricing limitation](/laravel-cart/4.0.3/quick-start/#updates-and-repricing).

## Item coupons apply once per row

```php
use OfflineAgency\LaravelCart\Facades\Cart;

$item = Cart::add([
    'id' => 'shirt', 'name' => 'Shirt', 'qty' => 3,
    'price' => 81.97, 'totalPrice' => 100.0, 'vat' => 18.03,
]);
Cart::addItemCoupon($item->rowId, 'ITEM20', 'percentage', 20.0);
Cart::total(); // 280.0: one discounted unit at 80 + two original units at 100
```

Item fixed coupons subtract from current gross; percentage coupons calculate against the **original** gross unit amount. Repeated percentage item coupons are additive against that original amount, not compounded. Net and VAT are recalculated for the discounted unit. `detachCoupon($rowId, $code)`, `removeCoupon($code)` and `removeAllCoupons()` manage item coupons, independently of the cart-coupon collection.

Always pass a real row ID. Null row ID invokes deprecated negative-row behavior. Validate coupon types/amounts and item eligibility on your server; do not assume invalid or excessive item discounts are automatically capped safely.

## Cart coupons: order, validation and caps

BCMath must be enabled for this path.

```php
use OfflineAgency\LaravelCart\CartCoupon;

Cart::addCoupon(new CartCoupon(
    hash: 'welcome-10', code: 'WELCOME10', type: 'percentage',
    value: 10.0, isGlobal: true,
));
Cart::addCoupon(new CartCoupon(
    hash: 'shipping-5', code: 'SAVE5', type: 'fixed',
    value: 5.0, isGlobal: true,
));
```

On a separate undiscounted gross cart of 300, percentage 10 then fixed 5 yields discount 35 and total 265. All percentages run first, sequentially against the remaining amount, then fixed amounts. Percentages 10 and 20 yield 216 from 300. Fixed discounts cap at the remaining amount; total does not become negative through this cart calculation.

`addCoupon()` checks duplicate hash, expiry and minimum amount against gross after item discounts. A string coupon is a fixed-zero marker, not a database lookup. `usageLimit` is metadata: the application enforces actual redemption limits. Custom Couponable objects are converted to CartCoupon metadata; custom applicability methods are not an arbitrary policy hook.

```php
Cart::syncCoupons(); // rechecks expiry/minimum and removes invalid coupons
Cart::listCoupons();
Cart::hasCartCoupon('WELCOME10');
Cart::removeCartCoupon('WELCOME10');
```

Reading `total()` alone does not refresh eligibility. Recheck catalog/customer eligibility and redemption limits at checkout under appropriate serialization. Cart coupons reduce `total()`/increase `discount()` but leave `subtotal()`, `vat()` and `vatBreakdown()` unchanged.

## Rounding and precision limits

`total()`, `subtotal()` and `vat()` return floats. Historical format arguments are accepted but do not format these results. Use presentation formatting separately. `vatBreakdown()` groups rates to two decimal places and returns formatted amount strings; do not parse display strings as authoritative decimal money.

`cart.format.decimals` and `rounding_mode` affect many calculations; mode accepts PHP rounding constants or supported RoundingMode enum cases. **4.0.3 exception:** cart coupon arithmetic uses BCMath scale 4 and final two-decimal formatting, regardless of configured decimal precision/mode. PHP floats also remain in prices and aggregation. The source README's blanket claim that all amounts obey configurable rounding is too broad.

At two decimal places, the released `CartItem::formatFloat(0.125)` produces:

| Mode | Result |
| --- | --- |
| `PHP_ROUND_HALF_UP` | `0.13` |
| `PHP_ROUND_HALF_DOWN` | `0.12` |
| `PHP_ROUND_HALF_EVEN` | `0.12` |
| `PHP_ROUND_HALF_ODD` | `0.13` |

```php
use OfflineAgency\LaravelCart\Facades\Cart;

config(['cart.format.rounding_mode' => \RoundingMode::TowardsZero]);
Cart::instance('rounding-example'); // use a fresh instance
Cart::add('1', 'Item', '', 1, 10.0, 10.129, 0.129);
Cart::total(); // 10.12
Cart::vat();   // 0.12
```

These numerical cases and the 280/265/216 coupon examples were executed locally against 4.0.3 with the SessionStorage array-session fixture. They do not verify database persistence or real checkout tax rules.

Keep currency per cart under application control. There is no currency conversion, exact arbitrary-precision monetary contract or certified VAT allocation. Do not combine unrelated currencies or claim that BCMath makes every price exact.


---

Source contract: [released 4.0.3 at `60eb100`](https://github.com/offline-agency/laravel-cart/tree/60eb1006c9c2b31ff50cebd7b8b677a1dd16cc16). [Stable overview](/laravel-cart/4.0.3/) · [Unreleased preview](https://github.com/offline-agency/laravel-cart/pull/50) · [Historical site](/laravel-cart/legacy/).
