---
title: Troubleshooting — v4 · 4.1.0
description: >-
  Diagnose invalid prices, cart limits, contention, failed transfer, missing
  rows and VAT discrepancies.
packageVersion: 4.1.0
sourceCommit: b89d3219202703203453890e2e46467e79ad415d
permalink: /laravel-cart/v4/troubleshooting/
documentationSnapshot: true
documentationKey: v4
documentationChannel: stable
---

# Troubleshooting

- Composer reports ext-bcmath missing: enable BCMath for the PHP binary running
  Composer and the web worker. Do not ignore platform requirements.
- InvalidArgumentException on repricing: supply coherent net/VAT/gross or only net.
  Non-finite values and unsupported coupon domains are rejected before persistence.
- CartLimitExceededException: inspect configured maximums and retry with a valid
  complete batch/sync. No successful mutation events should have escaped.
- QueryException after contention retries: inspect database timeout/deadlock details;
  retry the logical operation after resolving contention. Do not retry committed
  operations merely because an external post-commit listener failed.
- Guest transfer failed: login may continue; listen to GuestCartTransferFailed,
  resolve its cause and retry through the same server-bound pending identity.
- Unknown snapshot/row/coupon: handle the dedicated exceptions listed in the
  [reference](/laravel-cart/v4/reference/); authorize ownership, never guess another identifier.
- VAT breakdown differs from payable total: cart coupons have no final VAT allocation.
  See [money and tax](/laravel-cart/v4/money-and-tax/).

---

Imported from [docs/v4/troubleshooting.md](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/docs/v4/troubleshooting.md) at `b89d3219202703203453890e2e46467e79ad415d` (release `4.1.0`). Upstream [MIT license](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/LICENSE) retained in the frozen import.
