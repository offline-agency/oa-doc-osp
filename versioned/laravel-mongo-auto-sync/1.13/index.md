---
title: "Laravel MongoDB Relationships — 1.13"
description: "Archived Laravel MongoDB Relationships 1.13 (commit bec53e7, 2020-05-28): requirements, changes since 1.12 and the README shipped with the tag."
permalink: /laravel-mongo-auto-sync/1.13/
packageVersion: "1.13"
sourceCommit: bec53e7259e432aa402e0a1420ec19a603a28f03
documentationSnapshot: true
documentationArchive: generated-tag
---
# Laravel MongoDB Relationships 1.13

This archived page describes tag `1.13` of [offline-agency/laravel-mongo-auto-sync](https://github.com/offline-agency/laravel-mongo-auto-sync). It is generated from the repository at that tag: the manifest, the history since the previous tag and the README shipped with the release. It is not a reviewed guide; read the [current documentation](/laravel-mongo-auto-sync/) for the maintained release (3.1.1).

## Release

| Fact | Value |
| --- | --- |
| Tag | [1.13](https://github.com/offline-agency/laravel-mongo-auto-sync/releases/tag/1.13) |
| Commit | [`bec53e7259e432aa402e0a1420ec19a603a28f03`](https://github.com/offline-agency/laravel-mongo-auto-sync/tree/bec53e7259e432aa402e0a1420ec19a603a28f03) |
| Commit date | 2020-05-28 |
| Composer package | `offline-agency/laravel-mongo-auto-sync` |
| Packagist | Version `1.13`, source reference matches this commit (checked 2026-11-23) |
| Declared license | MIT |

## Requirements

Declared in `composer.json` `require`:

- `php`: `>=7.0`
- `ext-json`: `*`
- `ext-mongodb`: `*`
- `illuminate/support`: `^5.8|^6.0`
- `illuminate/container`: `^5.8|^6.0`
- `illuminate/database`: `^5.8|^6.0`
- `illuminate/events`: `^5.8|^6.0`
- `jenssegers/mongodb`: `^3.3`

## Changes since 1.12

[Compare 1.12...1.13 on GitHub](https://github.com/offline-agency/laravel-mongo-auto-sync/compare/1.12...1.13).

4 non-merge commits and 2 changed files.

Commits:

- `bec53e7` \[GF\] Optmize code
- `31f6655` Apply fixes from StyleCI
- `a115945` \[GF\] Optimize save embeds many
- `32ddcee` Apply fixes from StyleCI

Changed files:

- modified `src/Traits/ModelAdditionalMethod.php`
- modified `src/Traits/MongoSyncTrait.php`

## README at 1.13

Shipped as [`README.md`](https://github.com/offline-agency/laravel-mongo-auto-sync/blob/bec53e7259e432aa402e0a1420ec19a603a28f03/README.md). Headings are shifted one level, HTML markup is reduced to text and images, repository links are kept only when their target exists at this tag, and external links verified as unreachable are shown as text.

::: v-pre
### Laravel Mongo Auto Sync
[![Latest Stable Version](https://poser.pugx.org/offline-agency/laravel-mongo-auto-sync/v/stable)](https://packagist.org/packages/offline-agency/laravel-mongo-auto-sync)
[![Total Downloads](https://img.shields.io/packagist/dt/offline-agency/laravel-mongo-auto-sync.svg?style=flat-square)](https://packagist.org/packages/offline-agency/laravel-mongo-auto-sync)
[![Build Status](https://img.shields.io/github/workflow/status/offline-agency/laravel-mongo-auto-sync/CI)](https://github.com/offline-agency/laravel-mongo-auto-sync/actions)
[![MIT Licensed](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](https://github.com/offline-agency/laravel-mongo-auto-sync/blob/bec53e7259e432aa402e0a1420ec19a603a28f03/LICENSE.md)
[![Quality Score](https://img.shields.io/scrutinizer/g/offline-agency/laravel-mongo-auto-sync.svg?style=flat-square)](https://scrutinizer-ci.com/g/offline-agency/laravel-mongo-auto-sync)

#### Installation

```bash
composer require offlineagency/laravel-mongo-auto-sync
```

#### Documentation
You can find the documentation [here](https://docs.offlineagency.com/laravel-mongo-auto-sync/)

#### Testing
Run the tests with:
``` bash
composer test
```

#### Contributing
Please see [CONTRIBUTING](https://github.com/offline-agency/laravel-mongo-auto-sync/blob/bec53e7259e432aa402e0a1420ec19a603a28f03/CONTRIBUTING.md) for details.

#### Security
If you discover any security-related issues, please email support@offlineagency.com instead of using the issue tracker.

#### Credits
- [Giacomo Fabbian](https://github.com/Giacomo92)

- [All Contributors](https://github.com/offline-agency/laravel-mongodb-blog/graphs/contributors)

#### About us
Offline Agency is a web design agency based in Padua, Italy. You'll find an overview of our projects [on our website](https://offlineagency.it/#home).

#### License
The MIT License (MIT). Please see [License File](https://github.com/offline-agency/laravel-mongo-auto-sync/blob/bec53e7259e432aa402e0a1420ec19a603a28f03/LICENSE.md) for more information.
:::
