---
title: "Upgrading"
description: "Upgrade to released Laravel Cart 4.x from earlier v4 or v3: requirements, migrations and changed guarantees."
packageVersion: "4.2.0"
sourceCommit: e24c589d4ea02ae571c5c441a2e4886b3d9f2fd2
permalink: /laravel-cart/upgrading/
---

# Upgrading

> **Release 4.2.0.** This guide describes the selected `4.2.0` release, pinned below. **Since 4.1.0:** built-in atomic live mutations, repricing that preserves and reapplies item coupons, and opt-in live guest-cart transfer. **Since 4.2.0:** read-only [payableTaxBreakdown()](/laravel-cart/post-discount-tax/) post-discount allocation per row and VAT rate, and executable adoption recipes. These guarantees must not be assumed for the earlier 4.0.3 release. See the [capability map](/laravel-cart/capabilities/), [storage](/laravel-cart/storage/), [money and tax](/laravel-cart/money-and-tax/) and [authentication](/laravel-cart/authentication/). Public amounts remain floats; legacy VAT methods still precede cart coupons, and the allocation is not fiscal certification.

See [UPGRADE.md](https://github.com/offline-agency/laravel-cart/blob/e24c589d4ea02ae571c5c441a2e4886b3d9f2fd2/UPGRADE.md) for v3 -> v4 migration, positional API changes,
owner migrations and snapshots. This compatible v4 extension requires BCMath to be
installed explicitly. Repricing now changes the base and reapplies coupons; use
`update($rowId, ['price' => 20.0])` instead of editing item properties. Item coupon
allocation remains once per row. Sync variants use product/options identity; reject
duplicate identical rows before calling sync. Database mutations preserve concurrent
accepted changes; direct put remains replacement. Guest transfer requires explicit opt-in.

---

Imported from [docs/v4/upgrading.md](https://github.com/offline-agency/laravel-cart/blob/e24c589d4ea02ae571c5c441a2e4886b3d9f2fd2/docs/v4/upgrading.md) at `e24c589d4ea02ae571c5c441a2e4886b3d9f2fd2` (release `4.2.0`). Upstream [MIT license](https://github.com/offline-agency/laravel-cart/blob/e24c589d4ea02ae571c5c441a2e4886b3d9f2fd2/LICENSE) retained in the frozen import.
