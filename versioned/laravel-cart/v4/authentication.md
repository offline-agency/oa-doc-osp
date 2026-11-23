---
title: Authentication and guest transfer — v4 · 4.2.0
description: >-
  Since 4.1: opt-in guest-to-user live database cart transfer, login
  regeneration and legacy snapshot middleware.
packageVersion: 4.2.0
sourceCommit: e24c589d4ea02ae571c5c441a2e4886b3d9f2fd2
permalink: /laravel-cart/v4/authentication/
documentationSnapshot: true
documentationKey: v4
documentationChannel: stable
---

# Authentication and guest transfer

> **Release 4.2.0.** This guide describes the selected `4.2.0` release, pinned below. **Since 4.1.0:** built-in atomic live mutations, repricing that preserves and reapplies item coupons, and opt-in live guest-cart transfer. **Since 4.2.0:** read-only [payableTaxBreakdown()](/laravel-cart/v4/post-discount-tax/) post-discount allocation per row and VAT rate, and executable adoption recipes. These guarantees must not be assumed for the earlier 4.0.3 release. See the [capability map](/laravel-cart/v4/capabilities/), [storage](/laravel-cart/v4/storage/), [money and tax](/laravel-cart/v4/money-and-tax/) and [authentication](/laravel-cart/v4/authentication/). Public amounts remain floats; legacy VAT methods still precede cart coupons, and the allocation is not fiscal certification.

Release 4.2.0 documentation: see the [capability map](/laravel-cart/v4/capabilities/) for the release
that introduced each feature.

Legacy CartMergeMiddleware restores the saved `cart` snapshot; its defaults remain
unchanged. Live database guest transfer is a separate, disabled-by-default feature.
Enable `cart.guest_transfer.enabled` and explicitly allow instance names in
`cart.guest_transfer.instances` (default `['default']`).

In `bootstrap/app.php`, append the following middleware to the **web** group, after
Laravel's StartSession (and before the login route/controller):

```php
->withMiddleware(function (\Illuminate\Foundation\Configuration\Middleware $middleware) {
    $middleware->web(append: [\OfflineAgency\LaravelCart\Http\Middleware\TransferGuestCart::class]);
})
```

It captures the trusted session id when the request starts as a guest, invokes the
login action, then transfers to the actual authenticated owner after success and
session regeneration. No Login listener is required. Include this middleware on
subsequent web requests to retry a rejected transfer. It never accepts source ids
from browser fields. The pending retry identity is stored server-side and bound to
the authenticated owner; another user's request cannot consume it.

The transfer locks both owners in consistent order, merges all allowlisted instances
in one database transaction and deletes the source only after successful persistence.
Replay is a no-op. Matching row quantities add; option variants remain separate.
Authenticated base prices and row coupons win matching rows; guest-only rows retain
their state. **Revalidate all catalog prices/availability before checkout**, especially
guest-only rows; this package does not trust a stale guest catalog price as checkout authority.
Authenticated options/meta win top-level key conflicts; guest-only keys survive.
Coupons deduplicate by hash or code, authenticated definitions win, then expiry and
minimum rules are revalidated against merged gross. Invalid coupons are removed.

Limits/storage rejection retains both carts. Login continues; GuestCartTransferFailed
contains the user id and an actionable GuestCartTransferException and the exception
is reported via Laravel. Display a retry/revalidation message to the user. The pending
identity is retained until retry succeeds; no unconditional success marker is written.
GuestCartTransferred fires after commit, once when a source actually transferred.
Configuration/programming errors propagate. Do not combine automatic snapshot restore
and live transfer without defining their application order.

---

Imported from [docs/v4/authentication.md](https://github.com/offline-agency/laravel-cart/blob/e24c589d4ea02ae571c5c441a2e4886b3d9f2fd2/docs/v4/authentication.md) at `e24c589d4ea02ae571c5c441a2e4886b3d9f2fd2` (release `4.2.0`). Upstream [MIT license](https://github.com/offline-agency/laravel-cart/blob/e24c589d4ea02ae571c5c441a2e4886b3d9f2fd2/LICENSE) retained in the frozen import.
