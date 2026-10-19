# Laravel Cart 4.1.0 discovery and application recipes

Source contract: upstream tag `4.1.0`, commit `b89d3219202703203453890e2e46467e79ad415d`. All inspection used `git show 4.1.0:<path>`; execution used an archive of that tag in `/private/tmp/cart41-recipes-source`. Upstream checkout remained unchanged.

Site-specific adapters supplied in `maintenance/cart-adapters/`:

- `choosing.md`: application fit, money/tax/checkout limits, changed 4.1 mutation/guest-transfer guarantees, linked recipes and alternatives checked through current primary listings on 2026-10-16.
- `integrations.md`: complete synthetic trusted-catalog mutation service; Livewire action and Blade view; Inertia controller, authenticated routes and Vue form/redirect flow. These are application scaffolding and UI fragments, not frontend integrations exercised here.
- `api-and-mobile.md`: database-owner selection through the active Laravel auth guard, authenticated JSON endpoint scaffolding, CartResource output and visibility/checkout boundaries.
- `variants-and-wishlist.md`: integer catalog product identity versus row identity and unit/row/product counts; validated options, explicit instances, non-atomic application wishlist move, actual getter-only Buyable/CanBeBought contract.
- `redis-sessions.md`: Laravel sessions backed by Redis while the cart driver remains `session`, explicit route blocking and its cache-lock requirements, unsupported dedicated Redis cart driver.

Every adapter has title, description, packageVersion `4.1.0` and exact sourceCommit frontmatter. Internal links use stable `/laravel-cart/<topic>/` routes for the importer to rewrite into snapshots. Root owns routing/manifests/importer output. No JavaScript components are mounted in VuePress.

## Executed service verification

Fixture: `maintenance/fixtures/cart-recipes/{DemoCart.php,bootstrap.php,RecipeTest.php}`. The service is reproduced verbatim in the integration page. It intentionally contains a tiny synthetic public catalog available to authenticated customers; application authorization/catalog/stock replacement points are explicit. Per-request quantity validation is not presented as a stock reservation or final row cap.

Command from repository root:

```sh
CART_RECIPE_AUTOLOAD=/private/tmp/cart-matrix-84-l13-highest/vendor/autoload.php CART_RECIPE_SOURCE=/private/tmp/cart41-recipes-source /private/tmp/cart-matrix-84-l13-highest/vendor/bin/phpunit --no-configuration --bootstrap maintenance/fixtures/cart-recipes/bootstrap.php maintenance/fixtures/cart-recipes/RecipeTest.php
```

Result: PHP 8.5.10, Laravel 13.36.0, PHPUnit 13.4.2; **4 tests, 14 assertions passed**. This verifies submitted amounts are ignored, trusted server VAT/gross/resource totals, distinct variant row ids, quantity/row/product counts, wishlist isolation, rejected variant/product/quantity without mutation, and guest rejection. The bootstrap prepends release-source loading ahead of the external vendor autoloader; dependencies are external and not vendored into this site.

All five adapter frontmatters and Markdown code-fence pairs also validated; all 12 PHP code blocks passed `php -l`, and the embedded service exactly matches its executable fixture.

This verification exercises the application service against the session cart driver with Testbench's in-memory Laravel session. It does not exercise Livewire, Inertia, Sanctum HTTP routes, mobile clients, browser behavior or Redis. Upstream immutable links point to the canonical quick-start, two-driver DocumentationExamplesTest, mutation regressions and relevant contracts rather than attributing these site recipes to upstream.

## Fresh external evidence

Primary sources opened on 2026-10-16:

- https://packagist.org/packages/wearepixel/laravel-cart — 3.0.0, PHP >=8.3 and Illuminate 11/12/13 declarations.
- https://packagist.org/packages/hardevine/shoppingcart — 3.4, Illuminate constraints through 12 and its documented tax/options/persistence behavior.
- https://packagist.org/packages/darryldecode/cart — 4.2.6, PHP >=7.3 and Illuminate through 12; documented conditions and session-oriented binding.
- https://laravel.com/docs/13.x/session — Redis-backed sessions and explicit session blocking, with supported cache lock backends.

Alternatives were not installed or benchmarked. No speed, security, install-count, adoption or maintenance ranking is claimed. There are no upstream edits, commits, messages or deployment actions in this work.
