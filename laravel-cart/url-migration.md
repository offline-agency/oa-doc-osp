---
title: Route and anchor migration map
description: Compatibility map for old Laravel Cart documentation links.
permalink: /laravel-cart/url-migration/
---

# Route and anchor migration map

The original `/laravel-cart/` remains the stable entry point and uses a generated static HTML redirect to [/laravel-cart/v4/](/laravel-cart/v4/), documenting released package **4.1.0**. Every original heading anchor is present in that redirect as an explicit fallback link to its historical content. No server rewrite rule is required.

The historical page preserves the old API text at its own URL. This archive is a website revision, not a claimed package-major documentation version. Sibling package routes are unchanged.

## Versioned routes

| Entry | Destination and meaning |
| --- | --- |
| `/laravel-cart/` | `/laravel-cart/v4/`, latest verified stable release in package major 4 |
| `/laravel-cart/installation/`, `/storage/`, `/authentication/` and other current topics | Same topic under `/laravel-cart/v4/`; the complete generated map is [redirects.json](/redirects.json) |
| `/laravel-cart/quick-start/` | [/laravel-cart/v4/usage/](/laravel-cart/v4/usage/) |
| `/laravel-cart/support/` | [/laravel-cart/v4/troubleshooting/](/laravel-cart/v4/troubleshooting/) |
| `/laravel-cart/4.0.3/` and its topics | Frozen, self-canonical archive of the earlier published release; no 4.1 guarantees are added there |
| `/laravel-cart/legacy/` | Historical June 2024 site text, with its own canonical |

The v4 selector represents the **package major**, independently of VuePress and Laravel versions. It displays the exact documented release. Old 4.0.3 content remains accessible through its archive link instead of becoming a second current v4 tree. There is no invented v3 guide. An unavailable topic falls back to the target overview with a visible explanation. Prereleases do not replace stable defaults.

Canonical links identify each real versioned page. Alias redirects are noindex; archives retain their own canonicals. [The generated documentation index](/documentation-index.json) lists canonical pages and source/version metadata. Sitemap lastmod uses recorded content-change dates, never the time of a rebuild.

## Original heading anchors

| Original link | Historical destination |
| --- | --- |
| `/laravel-cart/#laravel-cart` | [/laravel-cart/legacy/#laravel-cart](/laravel-cart/legacy/#laravel-cart) |
| `/laravel-cart/#installation` | [/laravel-cart/legacy/#installation](/laravel-cart/legacy/#installation) |
| `/laravel-cart/#overview` | [/laravel-cart/legacy/#overview](/laravel-cart/legacy/#overview) |
| `/laravel-cart/#usage` | [/laravel-cart/legacy/#usage](/laravel-cart/legacy/#usage) |
| `/laravel-cart/#cart-add` | [/laravel-cart/legacy/#cart-add](/laravel-cart/legacy/#cart-add) |
| `/laravel-cart/#cart-update` | [/laravel-cart/legacy/#cart-update](/laravel-cart/legacy/#cart-update) |
| `/laravel-cart/#cart-remove` | [/laravel-cart/legacy/#cart-remove](/laravel-cart/legacy/#cart-remove) |
| `/laravel-cart/#cart-get` | [/laravel-cart/legacy/#cart-get](/laravel-cart/legacy/#cart-get) |
| `/laravel-cart/#cart-content` | [/laravel-cart/legacy/#cart-content](/laravel-cart/legacy/#cart-content) |
| `/laravel-cart/#cart-destroy` | [/laravel-cart/legacy/#cart-destroy](/laravel-cart/legacy/#cart-destroy) |
| `/laravel-cart/#cart-total` | [/laravel-cart/legacy/#cart-total](/laravel-cart/legacy/#cart-total) |
| `/laravel-cart/#cart-vat` | [/laravel-cart/legacy/#cart-vat](/laravel-cart/legacy/#cart-vat) |
| `/laravel-cart/#cart-subtotal` | [/laravel-cart/legacy/#cart-subtotal](/laravel-cart/legacy/#cart-subtotal) |
| `/laravel-cart/#cart-count` | [/laravel-cart/legacy/#cart-count](/laravel-cart/legacy/#cart-count) |
| `/laravel-cart/#cart-search` | [/laravel-cart/legacy/#cart-search](/laravel-cart/legacy/#cart-search) |
| `/laravel-cart/#collections` | [/laravel-cart/legacy/#collections](/laravel-cart/legacy/#collections) |
| `/laravel-cart/#instances` | [/laravel-cart/legacy/#instances](/laravel-cart/legacy/#instances) |
| `/laravel-cart/#models` | [/laravel-cart/legacy/#models](/laravel-cart/legacy/#models) |
| `/laravel-cart/#database` | [/laravel-cart/legacy/#database](/laravel-cart/legacy/#database) |
| `/laravel-cart/#configuration` | [/laravel-cart/legacy/#configuration](/laravel-cart/legacy/#configuration) |
| `/laravel-cart/#storing-the-cart` | [/laravel-cart/legacy/#storing-the-cart](/laravel-cart/legacy/#storing-the-cart) |
| `/laravel-cart/#restoring-the-cart` | [/laravel-cart/legacy/#restoring-the-cart](/laravel-cart/legacy/#restoring-the-cart) |
| `/laravel-cart/#add-a-coupon-to-cart-instance-for-a-specific-cart-item` | [/laravel-cart/legacy/#add-a-coupon-to-cart-instance-for-a-specific-cart-item](/laravel-cart/legacy/#add-a-coupon-to-cart-instance-for-a-specific-cart-item) |
| `/laravel-cart/#exceptions` | [/laravel-cart/legacy/#exceptions](/laravel-cart/legacy/#exceptions) |
| `/laravel-cart/#events` | [/laravel-cart/legacy/#events](/laravel-cart/legacy/#events) |
| `/laravel-cart/#example` | [/laravel-cart/legacy/#example](/laravel-cart/legacy/#example) |
| `/laravel-cart/#testing` | [/laravel-cart/legacy/#testing](/laravel-cart/legacy/#testing) |
| `/laravel-cart/#contributing` | [/laravel-cart/legacy/#contributing](/laravel-cart/legacy/#contributing) |
| `/laravel-cart/#security` | [/laravel-cart/legacy/#security](/laravel-cart/legacy/#security) |
| `/laravel-cart/#credits` | [/laravel-cart/legacy/#credits](/laravel-cart/legacy/#credits) |
| `/laravel-cart/#about-us` | [/laravel-cart/legacy/#about-us](/laravel-cart/legacy/#about-us) |
| `/laravel-cart/#license` | [/laravel-cart/legacy/#license](/laravel-cart/legacy/#license) |

## Release-versioned documentation

The current guide remains at [/laravel-cart/](/laravel-cart/). The current major guide is [/laravel-cart/v4/](/laravel-cart/v4/), with nested pages such as [/laravel-cart/v4/storage/](/laravel-cart/v4/storage/). The frozen [/laravel-cart/4.0.3/](/laravel-cart/4.0.3/) archive retains the earlier release contract. The version selector keeps the corresponding page where available. Only verified releases with real content appear; the historical site archive is not a claimed v3 release.
