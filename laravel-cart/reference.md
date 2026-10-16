---
title: "Full API reference and limitations"
description: "Released Laravel Cart 4.0.3: full api reference and limitations."
permalink: /laravel-cart/reference/
packageVersion: "4.0.3"
cartRelease: "4.0.3"
sourceCommit: 60eb1006c9c2b31ff50cebd7b8b677a1dd16cc16
---

# Full API reference and limitations

This index links the complete immutable source API for **4.0.3**. Use the task guides for safe examples; legacy aliases remain for compatibility and do not define newer guarantees.

## Actual add signature

```php
add(
    mixed $id, mixed $name = null, ?string $subtitle = null,
    ?int $qty = null, ?float $price = null, ?float $totalPrice = null,
    ?float $vat = null, ?string $vatFcCode = '', ?string $productFcCode = '',
    ?string $urlImg = '', ?Carbon $createdAt = null,
    ?Carbon $updatedAt = null, array $options = []
): array|CartItem
```

Prefer arrays for clarity. For Buyable inputs argument two is quantity; options come from the model. For arrays, field coercion differs from positional parameter types. Do not infer a universal positive-integer guarantee.

## Methods by task

| Area | Public methods |
| --- | --- |
| Instance | `instance(?string $instance = null)`, `currentInstance()` |
| Mutation | `add(...)`, `addBatch(array $items)`, `update(string $rowId, mixed $qty)`, `remove(string $rowId)`, `destroy()`, `sync(array $items)` |
| Query | `get($rowId)`, `content()`, `count()`, `uniqueCount()`, `isEmpty()`, `isNotEmpty()`, `first(?Closure)`, `where($key, $value)`, `search(Closure)`, `isAlreadyAdded($id, $model)`, `searchById($id, $model)`, `meetsMinimum()` |
| Money | `total()`, `subtotal()`, `vat()`, `originalTotalPrice()`, `discount()`, `vatBreakdown()`, `totalVatLabel()`, `taxName()`, `numberFormat(...)` |
| Models/export | `associate($rowId, $model)`, `toArray()`, `toJson($options)`, `sum($attribute)`, `weight()`, `snapshot()` |
| Meta/options | `setMeta($key, $value)`, `getMeta($key, $default)`, `meta()`, `forgetMeta($key)`, `getOptions()`, `setOptions($options)`, `getOptionsByKey($key, $default_value)` |
| Persistence | `store(int\|string $identifier, bool $overwrite = true)`, `restore(int\|string $identifier, bool $mergeOnRestore = false, bool $keepStored = false)` |
| Item coupons | `addItemCoupon(?string $rowId, string $couponCode, string $couponType, float $couponValue)`, `detachCoupon($rowId, $code)`, `coupons()`, `getCoupons()`, `hasCoupon($code)`, `hasCoupons()`, `hasGlobalCoupon()`, `getCoupon($code)`, `removeCoupon($code)`, `removeAllCoupons()` |
| Cart coupons | `addCoupon(string\|CartCoupon\|Couponable $coupon)`, `removeCartCoupon($hashOrCode)`, `listCoupons()`, `hasCartCoupon($hashOrCode)`, `syncCoupons()` |
| Legacy coupon APIs | `applyCoupon(...)`, `addGlobalCoupon(...)`, `removeGlobalCoupon(...)`, `getGlobalCoupons()`, `globalCouponDiscount($total)`, `applyGlobalCoupon(...)` |

Read full signatures/return types and exact method documentation in [Cart.php](https://github.com/offline-agency/laravel-cart/blob/60eb1006c9c2b31ff50cebd7b8b677a1dd16cc16/src/Cart.php), [CartItem.php](https://github.com/offline-agency/laravel-cart/blob/60eb1006c9c2b31ff50cebd7b8b677a1dd16cc16/src/CartItem.php), [CartCoupon.php](https://github.com/offline-agency/laravel-cart/blob/60eb1006c9c2b31ff50cebd7b8b677a1dd16cc16/src/CartCoupon.php), [Buyable](https://github.com/offline-agency/laravel-cart/blob/60eb1006c9c2b31ff50cebd7b8b677a1dd16cc16/src/Contracts/Buyable.php), [FiscalBuyable](https://github.com/offline-agency/laravel-cart/blob/60eb1006c9c2b31ff50cebd7b8b677a1dd16cc16/src/Contracts/FiscalBuyable.php), [CartStorage](https://github.com/offline-agency/laravel-cart/blob/60eb1006c9c2b31ff50cebd7b8b677a1dd16cc16/src/Contracts/CartStorage.php) and [Couponable](https://github.com/offline-agency/laravel-cart/blob/60eb1006c9c2b31ff50cebd7b8b677a1dd16cc16/src/Contracts/Couponable.php). Item and cart coupon collections are separate; identically named legacy APIs are not interchangeable.

## Events and exceptions

All event classes below live in `OfflineAgency\LaravelCart\Events` and are final readonly objects. Their item/coupon properties refer to mutable value objects; copy values if you need an immutable audit record.

| Typed event | Public payload |
| --- | --- |
| `CartItemAdded`, `CartItemUpdated`, `CartItemRemoved` | `CartItem $cartItem` |
| `CartStored`, `CartRestored` | `int\|string $identifier`, `string $instance` |
| `CouponApplied`, `CouponRemoved` | `CartCoupon $coupon`, `string $cartInstance` |

`CouponApplied`/`CouponRemoved` describe the newer **cart-level** `addCoupon()`/`removeCartCoupon()` operations, not every item/legacy coupon API. Item events identify the row through `$event->cartItem->rowId`; they do not carry a separate owner/instance field. Snapshot events use the instance being stored/restored, and do not authorize the identifier.

```php
use Illuminate\Support\Facades\Event;
use OfflineAgency\LaravelCart\Events\CartItemAdded;

Event::listen(CartItemAdded::class, function (CartItemAdded $event): void {
    logger()->info('Cart row added', ['rowId' => $event->cartItem->rowId]);
});
```

Legacy string events remain enabled by default with `cart.use_legacy_events = true`. Item `cart.added`, `cart.updated`, `cart.removed` carry the CartItem; `cart.stored` and `cart.restored` have no payload. The legacy string event precedes its typed counterpart. Legacy coupon APIs also emit strings such as `cart.global_coupon_added`, `cart.global_coupon_removed`, `cart.coupon_removed` and `cart.coupons_cleared`; these are separate from typed cart-coupon events. Set the flag to false when migrating listeners to typed events. A typed item event is not an after-commit hook: removal dispatches before its storage write. Stable listeners and mutations do not promise transaction-wide rollback.

All package exceptions extend CartException. Handle row-not-found, duplicate snapshot/coupon, invalid driver/configuration, cart limit and storage decoding failures as application errors. [Exception classes](https://github.com/offline-agency/laravel-cart/tree/60eb1006c9c2b31ff50cebd7b8b677a1dd16cc16/src/Exceptions) are the full reference. A defined class is not proof every driver throws it: stable database expiration treats carts as missing rather than throwing CartExpiredException. Stable failed mutations do not promise rollback of all in-memory or persisted state.

## CLI and resources

The released Artisan signatures are shown below; square brackets indicate optional options. These are maintenance commands for stored database records, not operations on the current HTTP request cart. The ordinary queries use `cart.database.connection` and the legacy snapshot `cart.database.table`; `cart:prune --expired-only` instead targets the normalized live-driver carts table.

```text
cart:clear [--force] [--instance=]
cart:export [--path=storage/app/cart-export.json] [--instance=] [--since=] [--pretty]
cart:inspect <identifier> [--instance=default] [--json] [--raw]
cart:list [--instance=] [--limit=50] [--sort=newest] [--json]
cart:migrate-driver [--from=session] [--to=database] [--dry-run] [--force] [--chunk=100]
cart:prune [--hours=24] [--instance=] [--expired-only] [--dry-run] [--force]
cart:stats [--instance=] [--json]
```

`cart:clear` clears the entire snapshot table unless `--instance` is provided; `--force` skips its confirmation. `cart:prune` defaults to records not updated for 24 hours; `--dry-run` only reports matches. `cart:export --since` accepts `Y-m-d`, and `--path` selects the output file. `cart:list --sort` accepts `newest`, `oldest` or `identifier`.

Despite its name, `cart:migrate-driver` is **not** a general live-driver converter: database-to-session returns failure; session-to-database supports only Laravel file/database session backends and writes decoded cart content into the legacy snapshot table. It does not populate normalized live `carts`/`cart_items`, does not import cart coupons (`coupons` is written as null), and does not transfer every cart-level field. Review the [released command implementation](https://github.com/offline-agency/laravel-cart/blob/60eb1006c9c2b31ff50cebd7b8b677a1dd16cc16/src/Console/CartMigrateDriverCommand.php) and verify a staging migration before use. `--dry-run` scans sessions; it is not proof every decoded record will migrate successfully. No database maintenance command was executed to verify this documentation.

Inspect your installed `php artisan <command> --help` before maintenance and scope writes to the intended environment. No Artisan command is required to build this website.

[CartResource](https://github.com/offline-agency/laravel-cart/blob/60eb1006c9c2b31ff50cebd7b8b677a1dd16cc16/src/Resources/CartResource.php) and [CartItemResource](https://github.com/offline-agency/laravel-cart/blob/60eb1006c9c2b31ff50cebd7b8b677a1dd16cc16/src/Resources/CartItemResource.php) delegate to their wrapped object's `toArray()`. The package supplies no frontend routes, payment checkout or dedicated Redis cart storage.


---

Source contract: [released 4.0.3 at `60eb100`](https://github.com/offline-agency/laravel-cart/tree/60eb1006c9c2b31ff50cebd7b8b677a1dd16cc16). [Stable overview](/laravel-cart/) · [Unreleased preview](https://github.com/offline-agency/laravel-cart/pull/50) · [Historical site](/laravel-cart/legacy/).
