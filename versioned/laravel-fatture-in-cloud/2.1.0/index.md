---
title: "Fatture in Cloud API v1 — 2.1.0"
description: "Archived Fatture in Cloud API v1 2.1.0 (commit 60b060e, 2021-01-21): requirements, changes since 2.0 and the README shipped with the tag."
permalink: /laravel-fatture-in-cloud/2.1.0/
packageVersion: "2.1.0"
sourceCommit: 60b060eb63e8fc3e64fe2273e32a7d32a4c243da
documentationSnapshot: true
documentationArchive: generated-tag
---
# Fatture in Cloud API v1 2.1.0

This archived page describes tag `2.1.0` of [offline-agency/laravel-fatture-in-cloud](https://github.com/offline-agency/laravel-fatture-in-cloud). It is generated from the repository at that tag: the manifest, the history since the previous tag and the README shipped with the release. It is not a reviewed guide; read the [current documentation](/laravel-fatture-in-cloud/) for the maintained release (2.2.8).

## Release

| Fact | Value |
| --- | --- |
| Tag | [2.1.0](https://github.com/offline-agency/laravel-fatture-in-cloud/releases/tag/2.1.0) |
| Commit | [`60b060eb63e8fc3e64fe2273e32a7d32a4c243da`](https://github.com/offline-agency/laravel-fatture-in-cloud/tree/60b060eb63e8fc3e64fe2273e32a7d32a4c243da) |
| Commit date | 2021-01-21 |
| Composer package | `offline-agency/laravel-fatture-in-cloud` |
| Packagist | Version `2.1.0`, source reference matches this commit (checked 2026-11-23) |
| Declared license | MIT |

## Requirements

Declared in `composer.json` `require`:

- `php`: `>=7.1`
- `ext-json`: `*`
- `illuminate/support`: `^5.8|^6.0`
- `illuminate/container`: `^5.8|^6.0`
- `illuminate/database`: `^5.8|^6.0`
- `illuminate/events`: `^5.8|^6.0`

## Changes since 2.0

[Compare 2.0...2.1.0 on GitHub](https://github.com/offline-agency/laravel-fatture-in-cloud/compare/2.0...2.1.0).

11 non-merge commits and 9 changed files.

Commits:

- `ea983f1` Apply fixes from StyleCI
- `87c9dfa` Update php.yml
- `ef680b0` refactor: path funding.yml
- `b01a72a` feat: update dependencies
- `d87c15a` Update php.yml
- `35e644d` Create FUNDING.yml
- `7c23f5b` Create .styleci.yml
- `de94bec` Create .codacy.yml
- `4fb62e0` Apply fixes from StyleCI
- `846aba3` feat: add new entities
- `dea020b` Update README.md

Changed files:

- added `.codacy.yml`
- added `.github/FUNDING.yml`
- modified `.github/workflows/php.yml`
- added `.styleci.yml`
- modified `README.md`
- modified `composer.json`
- modified `src/Entities/Account.php`
- added `src/Entities/OrdiniFornitori.php`
- modified `src/Requests/Common.php`

## README at 2.1.0

Shipped as [`README.md`](https://github.com/offline-agency/laravel-fatture-in-cloud/blob/60b060eb63e8fc3e64fe2273e32a7d32a4c243da/README.md). Headings are shifted one level, HTML markup is reduced to text and images, repository links are kept only when their target exists at this tag, and external links verified as unreachable are shown as text.

::: v-pre
### Laravel integration with Fatture in Cloud

[![Latest Stable Version](https://poser.pugx.org/offline-agency/laravel-fatture-in-cloud/v/stable)](https://packagist.org/packages/offline-agency/laravel-fatture-in-cloud)
[![MIT Licensed](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](https://github.com/offline-agency/laravel-fatture-in-cloud/blob/60b060eb63e8fc3e64fe2273e32a7d32a4c243da/LICENSE.md)
[![Build Status](https://img.shields.io/travis/offline-agency/laravel-fatture-in-cloud/master.svg?style=flat-square)](https://travis-ci.org/offline-agency/laravel-fatture-in-cloud)
![Quality Score](https://img.shields.io/scrutinizer/g/offline-agency/laravel-fatture-in-cloud.svg?style=flat-square)
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

Please see [CONTRIBUTING](https://github.com/offline-agency/laravel-fatture-in-cloud/blob/60b060eb63e8fc3e64fe2273e32a7d32a4c243da/CONTRIBUTING.md) for details.

#### Security

If you discover any security-related issues, please email &lt;support@offlineagency.com> instead of using the issue tracker.

#### Credits

- [Giacomo Fabbian](https://github.com/Giacomo92)
- All Contributors

#### About us

Offline Agency is a web design agency based in Padua, Italy. You'll find an overview of our projects [on our website](https://offlineagency.it/).

#### License

The MIT License (MIT). Please see [License File](https://github.com/offline-agency/laravel-fatture-in-cloud/blob/60b060eb63e8fc3e64fe2273e32a7d32a4c243da/LICENSE.md) for more information.
:::
