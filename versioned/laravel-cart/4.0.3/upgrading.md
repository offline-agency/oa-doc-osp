---
title: Upgrade guide — 4.0.3
description: 'Released Laravel Cart 4.0.3: upgrade guide.'
permalink: /laravel-cart/4.0.3/upgrading/
packageVersion: 4.0.3
cartRelease: 4.0.3
sourceCommit: 60eb1006c9c2b31ff50cebd7b8b677a1dd16cc16
documentationSnapshot: true
---

# Upgrade guide

## From historical docs or v3 to 4.0.3

Use the [pinned upstream UPGRADE guide](https://github.com/offline-agency/laravel-cart/blob/60eb1006c9c2b31ff50cebd7b8b677a1dd16cc16/UPGRADE.md) with your application's own tests. The [historical site page](/laravel-cart/legacy/) is an archive of the old website, not an accurate v4 reference or a verified package-v3 contract.

1. Check PHP `~8.4.0 || ~8.5.0`, Laravel/Illuminate `^12.69.2 || ^13.32` and Symfony Translation constraints. Back up persistent cart data.
2. Pin `offline-agency/laravel-cart:4.0.3` while validating this documented contract. Review Composer changes and run the app's suite.
3. Replace incompatible positional `add()` examples with arrays or actual named parameters. In v4, `subtitle` precedes quantity; options are the last parameter.
4. Implement all getter-only Buyable methods, including `getWeight()`. Fiscal methods moved to FiscalBuyable. Put cart weight into item options.
5. Review exception handling: package errors inherit CartException. Totals return floats; display formatting is separate. Legacy events remain enabled by default through `cart.use_legacy_events`.
6. Publish only the required migration tags. Existing legacy `cart` tables need missing coupons/meta columns; fresh live database storage uses separate `carts` / `cart_items` migrations. If you used prerelease schemas, compare actual columns/indexes against the tagged migrations before rollout.
7. Test instances, login/session regeneration, snapshots, coupons, TTL, rounding and competing requests with your real configured driver. Revalidate fiscal and pricing assumptions.

## Migration examples from the released upgrade guide

The [v3-to-v4 guide bundled with 4.0.3](https://github.com/offline-agency/laravel-cart/blob/60eb1006c9c2b31ff50cebd7b8b677a1dd16cc16/UPGRADE.md#1-buyable-interface-getter-only-new-getweight) is the migration reference. Its descriptions of older behavior are upstream migration guidance, not a separately verified v3 release here. The June 2024 website archive is not evidence of that v3 contract.

For a product using the provided getters, the guide's v4 shape is:

```php
use Illuminate\Database\Eloquent\Model;
use OfflineAgency\LaravelCart\CanBeBought;
use OfflineAgency\LaravelCart\Contracts\Buyable;

class Product extends Model implements Buyable
{
    use CanBeBought;
}
```

For fiscal codes, replace `Buyable` with `FiscalBuyable` and include the fiscal trait, as shown in the released migration guide:

```php
use Illuminate\Database\Eloquent\Model;
use OfflineAgency\LaravelCart\CanBeBought;
use OfflineAgency\LaravelCart\Contracts\FiscalBuyable;
use OfflineAgency\LaravelCart\Traits\HasFiscalCodes;

class FiscalProduct extends Model implements FiscalBuyable
{
    use CanBeBought;
    use HasFiscalCodes;
}
```

Custom implementations must satisfy the getter-only [released Buyable contract](https://github.com/offline-agency/laravel-cart/blob/60eb1006c9c2b31ff50cebd7b8b677a1dd16cc16/src/Contracts/Buyable.php), including `getWeight(): float`; retain application setters only if needed. `Cart::weight()` reads item `options['weight']` multiplied by quantity, so implement `getOptions()` accordingly when you need cart weight. FiscalBuyable additionally supplies `getVatFcCode(): string` and `getProductFcCode(): string`.

The released guide also changes fake behavior to return CartFake and changes container bindings to scoped. Update tests to assert typed events with the [testing helpers](/laravel-cart/4.0.3/support/#testing-with-cartfake), and remove application singleton captures of Cart before deploying to persistent workers.

## Do not promote a merge to released documentation

The [next preview](https://github.com/offline-agency/laravel-cart/pull/50) is pinned to PR #50 and remains unreleased. Stronger atomic mutation behavior, corrected repricing and opt-in guest transfer are not 4.0.3 features. A future release needs a verified tag, matching immutable commit and Packagist metadata before replacing default installation guidance. The maintainer release-update procedure and provenance checks live outside public content in `maintenance/README.md` of the site repository.


---

Source contract: [released 4.0.3 at `60eb100`](https://github.com/offline-agency/laravel-cart/tree/60eb1006c9c2b31ff50cebd7b8b677a1dd16cc16). [Stable overview](/laravel-cart/4.0.3/) · [Unreleased preview](https://github.com/offline-agency/laravel-cart/pull/50) · [Historical site](/laravel-cart/legacy/).
