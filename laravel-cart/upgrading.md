---
title: "Upgrading"
description: "Upgrade to released Laravel Cart 4.1 from earlier v4 or v3: requirements, migrations and changed guarantees."
packageVersion: "4.1.0"
sourceCommit: b89d3219202703203453890e2e46467e79ad415d
permalink: /laravel-cart/upgrading/
---

# Upgrading

> **Release 4.1.0.** This guide describes the selected `4.1.0` release, pinned below. **Since 4.1.0:** built-in atomic live mutations, repricing that preserves and reapplies item coupons, and opt-in live guest-cart transfer. These guarantees must not be assumed for the earlier 4.0.3 release. See [storage](/laravel-cart/storage/), [money and tax](/laravel-cart/money-and-tax/) and [authentication](/laravel-cart/authentication/). Public amounts remain floats; cart coupons do not allocate post-discount VAT per tax rate.

See [UPGRADE.md](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/UPGRADE.md) for v3 -> v4 migration, positional API changes,
owner migrations and snapshots. This compatible v4 extension requires BCMath to be
installed explicitly. Repricing now changes the base and reapplies coupons; use
`update($rowId, ['price' => 20.0])` instead of editing item properties. Item coupon
allocation remains once per row. Sync variants use product/options identity; reject
duplicate identical rows before calling sync. Database mutations preserve concurrent
accepted changes; direct put remains replacement. Guest transfer requires explicit opt-in.

---

Imported from [docs/v4/upgrading.md](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/docs/v4/upgrading.md) at `b89d3219202703203453890e2e46467e79ad415d` (release `4.1.0`). Upstream [MIT license](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/LICENSE) retained in the frozen import.
