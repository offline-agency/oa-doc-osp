---
title: Money and tax — v4 · 4.2.0
description: >-
  Net, gross, VAT, rounding and mixed tax rates; legacy VAT methods precede cart
  coupons, payableTaxBreakdown() allocates them since 4.2.0.
packageVersion: 4.2.0
sourceCommit: e24c589d4ea02ae571c5c441a2e4886b3d9f2fd2
permalink: /laravel-cart/v4/money-and-tax/
documentationSnapshot: true
documentationKey: v4
documentationChannel: stable
---

# Money and tax

> **Release 4.2.0.** This guide describes the selected `4.2.0` release, pinned below. **Since 4.1.0:** built-in atomic live mutations, repricing that preserves and reapplies item coupons, and opt-in live guest-cart transfer. **Since 4.2.0:** read-only [payableTaxBreakdown()](/laravel-cart/v4/post-discount-tax/) post-discount allocation per row and VAT rate, and executable adoption recipes. These guarantees must not be assumed for the earlier 4.0.3 release. See the [capability map](/laravel-cart/v4/capabilities/), [storage](/laravel-cart/v4/storage/), [money and tax](/laravel-cart/v4/money-and-tax/) and [authentication](/laravel-cart/v4/authentication/). Public amounts remain floats; legacy VAT methods still precede cart coupons, and the allocation is not fiscal certification.

Release 4.2.0 documentation: see the [capability map](/laravel-cart/v4/capabilities/) for the release
that introduced each feature.

The normalized database schema uses DECIMAL(12,4); keep persisted unit amounts within
that range and use at most four decimal places. Public amounts remain floats, rounded using `cart.format.decimals` (default 2)
and `rounding_mode` (default half up). Use one currency/precision per cart; this
is not a full multi-currency or certified tax-compliance engine. Non-finite amounts
and quantities are rejected. Legacy negative discount rows remain supported.

`originalPrice`, `originalVat`, `originalTotalPrice` are base **unit** amounts.
`price`, `vat`, `totalPrice` are the discounted first unit. Item coupons apply
**once per row**, with remaining units at base price. Public `subtotal`, `total`
and `taxTotal` allocate the row using the same policy as Cart totals.

| Operation | Quantity | Base net/VAT/gross per unit | Row net/VAT/gross |
| --- | --- | --- | --- |
| Add explicit 22% VAT | 1 | 10 / 2.20 / 12.20 | 10 / 2.20 / 12.20 |
| Update price to 20 | 2 | 20 / 4.40 / 24.40 | 40 / 8.80 / 48.80 |
| Apply 10% row coupon | 2 | 20 / 4.40 / 24.40 | 38 / 8.36 / 46.36 |
| Detach that coupon | 2 | 20 / 4.40 / 24.40 | 40 / 8.80 / 48.80 |

Price-only updates retain the explicit rate, including at zero price. Arrays and
Buyables update base amounts and reapply retained coupons in insertion order.
For arrays: `price` is net; omitted VAT is computed at the retained rate; omitted
gross is net + VAT. Supplied net/VAT/gross must agree at configured precision or
InvalidArgumentException rejects the whole operation. Explicit VAT sets a new rate.
Inclusive/exclusive defaults apply at creation, not to price-only updates.

Coupon net is rounded from discounted gross; VAT is the residual gross minus net,
so net + VAT equals gross at precision. Cart totals aggregate row amounts. At three
decimals a 10% cart coupon on 1.235 discounts 0.124, payable 1.111.

**Cart coupons reduce payable total without allocating their discount to VAT.**
`subtotal()`, `vat()` and `vatBreakdown()` include item discounts but are before
cart coupons; they are not the final payable tax breakdown. With cart coupons:
`total() = max(0, subtotal() + vat() - discount())` for normal positive rows,
subject to configured rounding. Legacy discount rows have separate historical
subtotal semantics. Do not print vatBreakdown as a final fiscal allocation when
cart coupons are present. Since 4.2.0, the additive [payableTaxBreakdown()](/laravel-cart/v4/post-discount-tax/) exposes a
separate deterministic post-discount allocation without changing those methods.

---

Imported from [docs/v4/money-and-tax.md](https://github.com/offline-agency/laravel-cart/blob/e24c589d4ea02ae571c5c441a2e4886b3d9f2fd2/docs/v4/money-and-tax.md) at `e24c589d4ea02ae571c5c441a2e4886b3d9f2fd2` (release `4.2.0`). Upstream [MIT license](https://github.com/offline-agency/laravel-cart/blob/e24c589d4ea02ae571c5c441a2e4886b3d9f2fd2/LICENSE) retained in the frozen import.
