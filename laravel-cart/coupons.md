---
title: "Coupons"
description: "Once-per-row item discounts and ordered cart coupons: eligibility, caps and redemption limits."
packageVersion: "4.1.0"
sourceCommit: b89d3219202703203453890e2e46467e79ad415d
permalink: /laravel-cart/coupons/
---

# Coupons

Use `addItemCoupon($rowId, $code, 'fixed'|'percentage', $value)` for a row;
`detachCoupon()` restores its current base. A repeated code on the same row throws
CouponAlreadyAppliedException; detach it before replacing its definition. Repricing retains and reapplies coupons.
Row percentages use original gross, in insertion order. Fixed row discounts are
historically not capped; consuming applications must bound their promotions.

Use `addCoupon(new CartCoupon(hash: 'welcome', code: 'WELCOME', type: 'fixed', value: 5.0))`
for a cart coupon. Percentages run first (stable insertion order), then fixed
amounts, each against remaining gross, capped at that remaining amount.
The returned discount string follows configured decimals and rounding.
Types must be fixed/percentage, values finite and non-negative, percentages <=100.
`usageLimit` is metadata: there is no global redemption accounting/enforcement.
Expiry/minimum are validated on attachment; call `syncCoupons()` before checkout
to remove coupons no longer eligible. Cart changes do not automatically revoke them.

`listCoupons()`, `hasCartCoupon()`, `removeCartCoupon()` are the cart API.
`coupons()`/`removeCoupon()` refer to row coupons. Legacy APIs remain documented
in the [reference](/laravel-cart/reference/). Legacy negative global discount rows remain valid;
getCoupons() represents their amount as a fixed CartCoupon with isGlobal=true, while
coupons() retains the legacy row metadata. See [tax limitations](/laravel-cart/money-and-tax/).

---

Imported from [docs/v4/coupons.md](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/docs/v4/coupons.md) at `b89d3219202703203453890e2e46467e79ad415d` (release `4.1.0`). Upstream [MIT license](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/LICENSE) retained in the frozen import.
