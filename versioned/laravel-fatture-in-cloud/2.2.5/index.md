---
title: "Fatture in Cloud API v1 — 2.2.5"
description: "Archived Fatture in Cloud API v1 2.2.5 (commit c91c3e0, 2021-10-21): requirements, changes since 2.2.4 and the README shipped with the tag."
permalink: /laravel-fatture-in-cloud/2.2.5/
packageVersion: "2.2.5"
sourceCommit: c91c3e067c6b0fbcf37dcdc40326f5e46f85c6d6
documentationSnapshot: true
documentationArchive: generated-tag
---
# Fatture in Cloud API v1 2.2.5

This archived page describes tag `2.2.5` of [offline-agency/laravel-fatture-in-cloud](https://github.com/offline-agency/laravel-fatture-in-cloud). It is generated from the repository at that tag: the manifest, the history since the previous tag and the README shipped with the release. It is not a reviewed guide; read the [current documentation](/laravel-fatture-in-cloud/) for the maintained release (2.2.8).

## Release

| Fact | Value |
| --- | --- |
| Tag | [2.2.5](https://github.com/offline-agency/laravel-fatture-in-cloud/releases/tag/2.2.5) |
| Commit | [`c91c3e067c6b0fbcf37dcdc40326f5e46f85c6d6`](https://github.com/offline-agency/laravel-fatture-in-cloud/tree/c91c3e067c6b0fbcf37dcdc40326f5e46f85c6d6) |
| Commit date | 2021-10-21 |
| Composer package | `offline-agency/laravel-fatture-in-cloud` |
| Packagist | Version `2.2.5`, source reference matches this commit (checked 2026-11-23) |
| Declared license | MIT |

## Requirements

Declared in `composer.json` `require`:

- `php`: `>=7.1`
- `ext-json`: `*`
- `illuminate/support`: `^5.8|^6.0|^7.0|^8.0`
- `illuminate/container`: `^5.8|^6.0|^7.0|^8.0`

## Changes since 2.2.4

[Compare 2.2.4...2.2.5 on GitHub](https://github.com/offline-agency/laravel-fatture-in-cloud/compare/2.2.4...2.2.5).

11 non-merge commits and 8 changed files.

Commits:

- `d055e85` feat: add methods description
- `9402bb7` fix: get errors codes from config on handle throttle method
- `4d2761b` fix: error code on handle throttle
- `2047f4e` fix: document callback
- `16d325c` fix: call method
- `cea93ec` remove: broadcastOn on event
- `a5b7f15` feat: add additional data to documents endpoints
- `e9db4e9` feat: add hook
- `bf2446e` Update FattureInCloudFacadeTest.php
- `740f02d` Add missing facade
- `039350a` Update README.md

Changed files:

- modified `README.md`
- modified `composer.json`
- modified `config/fatture-in-cloud.php`
- modified `src/Auth.php`
- modified `src/Entities/Documenti.php`
- added `src/Events/DocumentRequestPerformed.php`
- added `src/FattureInCloudFacade.php`
- added `tests/Unit/FattureInCloudFacadeTest.php`

## README at 2.2.5

Shipped as [`README.md`](https://github.com/offline-agency/laravel-fatture-in-cloud/blob/c91c3e067c6b0fbcf37dcdc40326f5e46f85c6d6/README.md). Headings are shifted one level, HTML markup is reduced to text and images, repository links are kept only when their target exists at this tag, and external links verified as unreachable are shown as text.

::: v-pre
### Laravel integration with Fatture in Cloud

[![Latest Stable Version](https://poser.pugx.org/offline-agency/laravel-fatture-in-cloud/v/stable)](https://packagist.org/packages/offline-agency/laravel-fatture-in-cloud)
[![MIT Licensed](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](https://github.com/offline-agency/laravel-fatture-in-cloud/blob/c91c3e067c6b0fbcf37dcdc40326f5e46f85c6d6/LICENSE.md)
[![Build Status](https://img.shields.io/travis/offline-agency/laravel-fatture-in-cloud/master.svg?style=flat-square)](https://travis-ci.org/offline-agency/laravel-fatture-in-cloud)
[![StyleCI](https://github.styleci.io/repos/167236902/shield)](https://styleci.io/repos/167236902)
[![Total Downloads](https://img.shields.io/packagist/dt/offline-agency/laravel-fatture-in-cloud.svg?style=flat-square)](https://packagist.org/packages/offline-agency/laravel-fatture-in-cloud)

This Laravel wrapper allows you to integrate a Laravel e-commerce platform with the invoicing program [Fatture in Cloud](https://fattureincloud.it) using Api.

 
  ![Fatture in Cloud](https://s3.eu-west-1.amazonaws.com/fattureincloud-landing/img/loghi/logo-fic-blu.png)

With [Fatture in Cloud](https://fattureincloud.it) you can generate online invoices, electronic invoices (B2B, B2C and PA), estimates and you can check profits and costs from your computer or from Android and iOS smartphones and tablets.

Offline Agency is a web design agency based in Padua, Italy. You'll find an overview of our projects [on our website](https://offlineagency.it/).

#### Installation and usage

```bash
composer require offline-agency/laravel-fatture-in-cloud
```

You'll find installation instructions and full documentation on https://docs.offlineagency.com/laravel-fatture-in-cloud/.

#### Testing

Run the tests with:

```bash
composer test
```

#### Contributing

Please see [CONTRIBUTING](https://github.com/offline-agency/laravel-fatture-in-cloud/blob/c91c3e067c6b0fbcf37dcdc40326f5e46f85c6d6/CONTRIBUTING.md) for details.

#### Security

If you discover any security-related issues, please email &lt;support@offlineagency.com> instead of using the issue tracker.

#### Credits

- [Giacomo Fabbian](https://github.com/Giacomo92)
- All Contributors

#### About us

Offline Agency is a web design agency based in Padua, Italy. You'll find an overview of our projects [on our website](https://offlineagency.it/).

#### License

The MIT License (MIT). Please see [License File](https://github.com/offline-agency/laravel-fatture-in-cloud/blob/c91c3e067c6b0fbcf37dcdc40326f5e46f85c6d6/LICENSE.md) for more information.
:::
