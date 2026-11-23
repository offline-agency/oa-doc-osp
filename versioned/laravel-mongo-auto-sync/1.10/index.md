---
title: "Laravel MongoDB Relationships — 1.10"
description: "Archived Laravel MongoDB Relationships 1.10 (commit 3073da4, 2020-04-28): requirements, changes since 1.9 and the README shipped with the tag."
permalink: /laravel-mongo-auto-sync/1.10/
packageVersion: "1.10"
sourceCommit: 3073da48c0ecdafdade9eb44295f5c34842db200
documentationSnapshot: true
documentationArchive: generated-tag
---
# Laravel MongoDB Relationships 1.10

This archived page describes tag `1.10` of [offline-agency/laravel-mongo-auto-sync](https://github.com/offline-agency/laravel-mongo-auto-sync). It is generated from the repository at that tag: the manifest, the history since the previous tag and the README shipped with the release. It is not a reviewed guide; read the [current documentation](/laravel-mongo-auto-sync/) for the maintained release (3.1.1).

## Release

| Fact | Value |
| --- | --- |
| Tag | [1.10](https://github.com/offline-agency/laravel-mongo-auto-sync/releases/tag/1.10) |
| Commit | [`3073da48c0ecdafdade9eb44295f5c34842db200`](https://github.com/offline-agency/laravel-mongo-auto-sync/tree/3073da48c0ecdafdade9eb44295f5c34842db200) |
| Commit date | 2020-04-28 |
| Composer package | `offline-agency/laravel-mongo-auto-sync` |
| Packagist | Version `1.10`, source reference matches this commit (checked 2026-11-23) |
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

## Changes since 1.9

[Compare 1.9...1.10 on GitHub](https://github.com/offline-agency/laravel-mongo-auto-sync/compare/1.9...1.10).

10 non-merge commits and 7 changed files.

Commits:

- `cc20193` Apply fixes from StyleCI
- `cd62e36` \[GF\] Added target additional data in order to save more data on target
- `00da8bb` Update README.md
- `65bad2f` Update and rename php.yml to build-ci.yml
- `d3bad84` \[GF\] Removed travis ci
- `7295bd0` \[GF\] Fix travis ci - removed mongo install
- `fb1116e` Apply fixes from StyleCI
- `35621e0` \[GF\] Removed log
- `e29f751` Apply fixes from StyleCI
- `ea35de9` \[GF\] Fix partial request - update also relationship target not that does not exist on the request - always generate mini model even if in a partial request it is not present - always generate mini model improved performance on default operations

Changed files:

- renamed `.github/workflows/php.yml` → `.github/workflows/build-ci.yml`
- deleted `.travis.yml`
- modified `README.md`
- modified `src/Http/Models/MDModel.php`
- added `src/Traits/Helper.php`
- modified `src/Traits/ModelAdditionalMethod.php`
- modified `src/Traits/MongoSyncTrait.php`

## README at 1.10

Shipped as [`README.md`](https://github.com/offline-agency/laravel-mongo-auto-sync/blob/3073da48c0ecdafdade9eb44295f5c34842db200/README.md). Headings are shifted one level, HTML markup is reduced to text and images, repository links are kept only when their target exists at this tag, and external links verified as unreachable are shown as text.

::: v-pre
### Laravel Mongo Auto Sync
[![Latest Stable Version](https://poser.pugx.org/offline-agency/laravel-mongo-auto-sync/v/stable)](https://packagist.org/packages/offline-agency/laravel-mongo-auto-sync)
[![Total Downloads](https://img.shields.io/packagist/dt/offline-agency/laravel-mongo-auto-sync.svg?style=flat-square)](https://packagist.org/packages/offline-agency/laravel-mongo-auto-sync)
[![Build Status](https://img.shields.io/github/workflow/status/offline-agency/laravel-mongo-auto-sync/CI)](https://github.com/offline-agency/laravel-mongo-auto-sync/actions)
[![MIT Licensed](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](https://github.com/offline-agency/laravel-mongo-auto-sync/blob/3073da48c0ecdafdade9eb44295f5c34842db200/LICENSE.md)
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
Please see [CONTRIBUTING](https://github.com/offline-agency/laravel-mongo-auto-sync/blob/3073da48c0ecdafdade9eb44295f5c34842db200/CONTRIBUTING.md) for details.

#### Security
If you discover any security-related issues, please email support@offlineagency.com instead of using the issue tracker.

#### Credits
- [Giacomo Fabbian](https://github.com/Giacomo92)

- [All Contributors](https://github.com/offline-agency/laravel-mongodb-blog/graphs/contributors)

#### About us
Offline Agency is a web design agency based in Padua, Italy. You'll find an overview of our projects [on our website](https://offlineagency.it/#home).

#### License
The MIT License (MIT). Please see [License File](https://github.com/offline-agency/laravel-mongo-auto-sync/blob/3073da48c0ecdafdade9eb44295f5c34842db200/LICENSE.md) for more information.
:::
