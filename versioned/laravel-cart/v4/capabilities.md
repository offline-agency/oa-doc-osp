---
title: Capability and availability map — v4 · 4.2.0
description: >-
  Which Laravel Cart release introduced each capability, with maintained
  examples, executed tests and documented limits.
packageVersion: 4.2.0
sourceCommit: e24c589d4ea02ae571c5c441a2e4886b3d9f2fd2
permalink: /laravel-cart/v4/capabilities/
documentationSnapshot: true
documentationKey: v4
documentationChannel: stable
---

# Capability and availability map

Release **4.2.0** (PR #51, `e24c589`) adds read-only post-discount allocation and the adoption
recipes to the 4.1.0 guarantees (PR #50, `b89d321`). Each row names the release that introduced
the capability. Earlier API
presence is not a claim of current PHP/Laravel support on an old package line.

| Use case | Availability | Maintained example/reference | Executed evidence / limit |
| --- | --- | --- | --- |
| Option variants, named wishlist, associated models (S06) | Core APIs verified in 3.1.5; recipe since 4.2.0 | [Variants/wishlist](https://github.com/offline-agency/laravel-cart/blob/e24c589d4ea02ae571c5c441a2e4886b3d9f2fd2/docs/v4/recipes/variants-wishlist.md), [CartActions](https://github.com/offline-agency/laravel-cart/blob/e24c589d4ea02ae571c5c441a2e4886b3d9f2fd2/examples/CartActions.php) | [Adoption service](https://github.com/offline-agency/laravel-cart/blob/e24c589d4ea02ae571c5c441a2e4886b3d9f2fd2/tests/Feature/AdoptionRecipesTest.php), [model association](https://github.com/offline-agency/laravel-cart/blob/e24c589d4ea02ae571c5c441a2e4886b3d9f2fd2/tests/CartItemTest.php); move is not cross-instance atomic |
| Session/database carts and CartResource | 4.0.0 (verified tag) | [Storage](/laravel-cart/v4/storage/), [API recipe](https://github.com/offline-agency/laravel-cart/blob/e24c589d4ea02ae571c5c441a2e4886b3d9f2fd2/docs/v4/recipes/api-mobile.md) | Resource/owner tests; default active Laravel auth identity |
| Coherent repricing and atomic logical mutations | 4.1.0 | [Quick start](https://github.com/offline-agency/laravel-cart/blob/e24c589d4ea02ae571c5c441a2e4886b3d9f2fd2/examples/quick-start.php), [money](/laravel-cart/v4/money-and-tax/) | [Mutation regressions](https://github.com/offline-agency/laravel-cart/blob/e24c589d4ea02ae571c5c441a2e4886b3d9f2fd2/tests/Regression/MutationCorrectnessTest.php); custom-driver limits remain |
| Trusted login transfer (S09) | 4.1.0, opt-in | [Authentication](/laravel-cart/v4/authentication/) | [Real login/session test](https://github.com/offline-agency/laravel-cart/blob/e24c589d4ea02ae571c5c441a2e4886b3d9f2fd2/tests/Feature/GuestTransferTest.php); web lifecycle required |
| Read-modify-write database concurrency (S10) | 4.1.0 | [Concurrency boundaries](/laravel-cart/v4/storage/) | [Independent server processes](https://github.com/offline-agency/laravel-cart/blob/e24c589d4ea02ae571c5c441a2e4886b3d9f2fd2/tests/Regression/ServerConcurrencyTest.php); excludes direct raw writes |
| Pre-cart-coupon VAT grouping | 4.0.0 | [Legacy reference](/laravel-cart/v4/reference/#vat-breakdown-before-cart-coupons) | Existing methods unchanged; not final payable tax |
| Post-discount row/rate allocation (S11) | 4.2.0 | [payableTaxBreakdown](/laravel-cart/v4/post-discount-tax/) | [Mixed-rate/rounding/reload/read-only tests](https://github.com/offline-agency/laravel-cart/blob/e24c589d4ea02ae571c5c441a2e4886b3d9f2fd2/tests/Feature/PayableTaxBreakdownTest.php); no negative adjustments or fiscal certification |
| Livewire/Inertia adoption (S13) | Recipes since 4.2.0, no frontend runtime dependency | [Livewire](https://github.com/offline-agency/laravel-cart/blob/e24c589d4ea02ae571c5c441a2e4886b3d9f2fd2/docs/v4/recipes/livewire.md), [Inertia/Vue](https://github.com/offline-agency/laravel-cart/blob/e24c589d4ea02ae571c5c441a2e4886b3d9f2fd2/docs/v4/recipes/inertia-vue.md) | Real shared service tested; UI/controller fragments illustrative |
| Redis-backed sessions (S15) | SessionStorage shipped in 4.0.0; recipe since 4.2.0 | [Redis sessions](https://github.com/offline-agency/laravel-cart/blob/e24c589d4ea02ae571c5c441a2e4886b3d9f2fd2/docs/v4/recipes/redis-sessions.md) | Real Redis session/lock probe; HTTP route blocking illustrative |
| Dedicated Redis driver / independent cart TTL (S15) | **Not implemented** | No shipped dedicated driver | Future real Redis/CAS/cluster tests required |
| Exact EUR/JPY/KWD Money model (S16) | **Not implemented** | No shipped exact Money API | Public float API is not exact multi-currency support |
| Boost guidelines/skill | 4.1.0; allocation/recipe guidance updated in 4.2.0 | [Agent integration](/laravel-cart/v4/agents/) | Archived consumer discovery/rendering smoke test |

The supplied discovery exercise used twenty package-neutral research sessions;
its observations prioritize these improvements. It did not test competing packages
or establish universal selection probabilities. No discovery benchmark was rerun.

---

Imported from [docs/v4/capabilities.md](https://github.com/offline-agency/laravel-cart/blob/e24c589d4ea02ae571c5c441a2e4886b3d9f2fd2/docs/v4/capabilities.md) at `e24c589d4ea02ae571c5c441a2e4886b3d9f2fd2` (release `4.2.0`). Upstream [MIT license](https://github.com/offline-agency/laravel-cart/blob/e24c589d4ea02ae571c5c441a2e4886b3d9f2fd2/LICENSE) retained in the frozen import.
