---
title: "Troubleshooting, tests and support"
description: "Released Laravel Cart 4.0.3: troubleshooting, tests and support."
permalink: /laravel-cart/support/
packageVersion: "4.0.3"
cartRelease: "4.0.3"
sourceCommit: 60eb1006c9c2b31ff50cebd7b8b677a1dd16cc16
---

# Troubleshooting, tests and support

## Common failures

| Symptom | Check |
| --- | --- |
| Composer rejects the release | Exact PHP/Illuminate floors and Symfony Translation conflict |
| Undefined `bccomp` / BCMath function | Enable BCMath in the runtime using cart-level coupons |
| Old positional add examples fail | Use item arrays; `subtitle` is parameter three in v4 |
| Same product appears in two rows | Options are part of row identity; normalize allowed variant values |
| Three items receive only one coupon discount | Item coupons apply once per row, not once per unit |
| VAT does not match discounted invoice payable | Cart coupons are not allocated into VAT |
| Price update leaves old financial fields | Stable repricing limitation; rebuild from trusted catalog under your application lock |
| Database cart is empty after login | Auth owner differs from guest session owner; stable has no live guest transfer |
| Cart expires despite recent writes | Database TTL is absolute from creation in 4.0.3 |
| Logout leaves database carts | destroy_on_logout only forgets session cart state |
| Snapshot restore leaks data or changes instance | Authorize snapshot identifiers/instances; review fallback semantics |
| Concurrent requests lose a mutation | Stable end-to-end operations are not atomic; serialize with application locks |

## Tests and contributing

Use the [actual upstream CI](https://github.com/offline-agency/laravel-cart/blob/60eb1006c9c2b31ff50cebd7b8b677a1dd16cc16/.github/workflows/ci.yml), [contributing guide](https://github.com/offline-agency/laravel-cart/blob/60eb1006c9c2b31ff50cebd7b8b677a1dd16cc16/CONTRIBUTING.md) and pinned tests as the package reference. In a compatible PHP checkout:

```sh
composer install
composer check
```

Those are upstream maintainer commands, not commands needed to build this VuePress website. A coverage threshold in a script is not a measured published coverage report; this site makes no coverage claim. Preview executable examples belong to the pinned PR; importing their Markdown is not proof this site executed the PHP examples.

The site change checks generated links, anchors, provenance and static HTML. Application recipes require your own integration tests for guards, sessions, database engine, concurrency and frontend stack.

## Support and security

For reproducible non-sensitive bugs, use [GitHub issues](https://github.com/offline-agency/laravel-cart/issues) with release, PHP/Laravel versions, driver and a minimal example. Never post credentials, customer data or serialized production carts. For a vulnerability, use the repository's private reporting mechanism if enabled, or contact the maintainer privately at the address in [composer.json](https://github.com/offline-agency/laravel-cart/blob/60eb1006c9c2b31ff50cebd7b8b677a1dd16cc16/composer.json); confirm a private channel before sharing sensitive details.

## Testing with CartFake

`Cart::fake()` returns `OfflineAgency\LaravelCart\Testing\CartFake` and swaps the facade binding. It runs the real Cart logic with `SessionStorage(app('session'))`; it does not select the database driver or create a separate session backend. Use an isolated test session (for example Laravel's array session driver) and a fresh instance. The fake records object events and **forwards** dispatches to the underlying dispatcher, so application listeners can still run.

```php
use OfflineAgency\LaravelCart\Events\CartItemAdded;
use OfflineAgency\LaravelCart\Events\CartItemRemoved;
use OfflineAgency\LaravelCart\Facades\Cart;

$fake = Cart::fake();
Cart::instance('cart-fake-example');
$item = Cart::add(['id' => 'test-product', 'name' => 'Test product', 'qty' => 1, 'price' => 10.0]);

$fake->assertDispatched(CartItemAdded::class, fn (CartItemAdded $event): bool =>
    $event->cartItem->id === 'test-product'
);
$fake->assertDispatchedTimes(CartItemAdded::class, 1);
$fake->assertNotDispatched(CartItemRemoved::class);
$events = $fake->recorder()->recorded(CartItemAdded::class); // list of recorded event objects
```

Assertions use PHPUnit, so run this inside your Pest/PHPUnit test runtime. Use `assertDispatched($eventClass, ?callable $callback = null)`, `assertNotDispatched($eventClass)` and `assertDispatchedTimes($eventClass, int $times = 1)`. The recorder does not record legacy string events. `Cart::fake()` does not clear existing session cart state, and retained event payload objects may reflect later mutations.

The repository's isolated `maintenance/fixtures/cart/run.sh` extracts the released source, overrides its PSR-4 map and checks that release classes actually load. Locally executed on PHP 8.5.10 / Laravel 13.35.0 with BCMath: quick start totals, row identity/quantity, item coupon 280, tax 122, cart coupon totals 265/216, rounding, metadata/snapshot, sync, limits and CartFake event assertions passed. It uses the actual SessionStorage with an array session, no database or external API. It does not replace application database, concurrency, OAuth/session or checkout tests.

## Explicit limitations and upstream handoff

Stable 4.0.3 needs follow-up for undeclared BCMath dependency, cart coupon precision versus configurable rounding, incomplete repricing, concurrent mutation guarantees and misleading database logout comments. Snapshot identifiers need application authorization. Keep these limits visible until a verified release changes them.

PR #50 proposes some corrections but not a final post-discount tax allocation API. Complete Livewire/Inertia and variants/wishlist recipes with executable examples are upstream follow-up work unless a later verified release adds them. The fragments here are not claimed as tested framework integrations.

[MIT license](https://github.com/offline-agency/laravel-cart/blob/60eb1006c9c2b31ff50cebd7b8b677a1dd16cc16/LICENSE) · [Offline Agency](https://offlineagency.it)


---

Source contract: [released 4.0.3 at `60eb100`](https://github.com/offline-agency/laravel-cart/tree/60eb1006c9c2b31ff50cebd7b8b677a1dd16cc16). [Stable overview](/laravel-cart/) · [Unreleased preview](https://github.com/offline-agency/laravel-cart/pull/50) · [Historical site](/laravel-cart/legacy/).
