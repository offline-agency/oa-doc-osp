---
title: Testing and documentation checks — v4 · 4.1.0
description: >-
  CartFake, executable examples, regression tests and contributing checks for
  Laravel Cart.
packageVersion: 4.1.0
sourceCommit: b89d3219202703203453890e2e46467e79ad415d
permalink: /laravel-cart/v4/testing/
documentationSnapshot: true
documentationKey: v4
documentationChannel: stable
---

# Testing and documentation checks

```sh
composer validate:strict
composer audit --abandoned=report
composer lint:check
composer analyse
composer test
composer test:coverage
composer docs:check
composer examples:check
node --test .github/scripts/release/test/*.test.mjs
```

Run executable examples on both drivers with `composer examples:check`. Snippets are
generated from marked trusted source sections using `node scripts/docs.mjs --write`;
CI runs check mode and never updates tracked files. Pure controller/frontend recipes
are illustrative. Link checking validates repository paths/anchors and publish tags.

For server tests use only disposable databases named `laravel_cart_test*`.
`docker compose -p laravel-cart-correctness -f compose.test.yaml up -d --wait` creates
PostgreSQL 17 on port 18471 and MySQL 8.4 on port 18472, both using tmpfs. Set
CART_TEST_DB_DRIVER/PORT/USERNAME/PASSWORD and run `composer test` (default database
laravel_cart_test, PostgreSQL user postgres / MySQL root, password cart_test).
`composer test -- --group=concurrency` runs bounded independent-process lock tests.
Stop the same compose project with `down` afterwards. Never reuse an application DB.

Use [testing helpers](/laravel-cart/v4/reference/) for facade fakes, typed event assertions and
CartAssertions. Fakes do not prove transaction/concurrency behavior; use real drivers
for those contracts. The workflow tests PHP 8.4/8.5 and Laravel 12/13; lowest jobs
are PHP 8.4 only, with actual versions printed in each job.

---

Imported from [docs/v4/testing.md](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/docs/v4/testing.md) at `b89d3219202703203453890e2e46467e79ad415d` (release `4.1.0`). Upstream [MIT license](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/LICENSE) retained in the frozen import.
