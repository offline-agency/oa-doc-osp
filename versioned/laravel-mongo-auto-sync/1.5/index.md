---
title: "Laravel MongoDB Relationships — 1.5"
description: "Archived Laravel MongoDB Relationships 1.5 (commit 42898a5, 2020-01-24): requirements, changes since 1.4 and the README shipped with the tag."
permalink: /laravel-mongo-auto-sync/1.5/
packageVersion: "1.5"
sourceCommit: 42898a5835295daa6554273931403209ad6bb081
documentationSnapshot: true
documentationArchive: generated-tag
---
# Laravel MongoDB Relationships 1.5

This archived page describes tag `1.5` of [offline-agency/laravel-mongo-auto-sync](https://github.com/offline-agency/laravel-mongo-auto-sync). It is generated from the repository at that tag: the manifest, the history since the previous tag and the README shipped with the release. It is not a reviewed guide; read the [current documentation](/laravel-mongo-auto-sync/) for the maintained release (3.1.1).

## Release

| Fact | Value |
| --- | --- |
| Tag | [1.5](https://github.com/offline-agency/laravel-mongo-auto-sync/releases/tag/1.5) |
| Commit | [`42898a5835295daa6554273931403209ad6bb081`](https://github.com/offline-agency/laravel-mongo-auto-sync/tree/42898a5835295daa6554273931403209ad6bb081) |
| Commit date | 2020-01-24 |
| Composer package | `offline-agency/laravel-mongo-auto-sync` |
| Packagist | Version `1.5`, source reference matches this commit (checked 2026-11-23) |
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

## Changes since 1.4

[Compare 1.4...1.5 on GitHub](https://github.com/offline-agency/laravel-mongo-auto-sync/compare/1.4...1.5).

3 non-merge commits and 3 changed files.

Commits:

- `42898a5` \[GF\] Removed phpinsight that conflicts with php 7.1
- `64db101` Apply fixes from StyleCI
- `883056e` \[GF\] Code Optimizations

Changed files:

- modified `composer.json`
- modified `src/Traits/MongoSyncTrait.php`
- modified `src/syncUtils.php`

## README at 1.5

Shipped as [`README.md`](https://github.com/offline-agency/laravel-mongo-auto-sync/blob/42898a5835295daa6554273931403209ad6bb081/README.md). Headings are shifted one level, HTML markup is reduced to text and images, repository links are kept only when their target exists at this tag, and external links verified as unreachable are shown as text.

::: v-pre
### Laravel Mongo Auto Sync
[![Latest Stable Version](https://poser.pugx.org/offline-agency/laravel-mongo-auto-sync/v/stable)](https://packagist.org/packages/offline-agency/laravel-mongo-auto-sync)
[![MIT Licensed](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](https://github.com/offline-agency/laravel-mongo-auto-sync/blob/42898a5835295daa6554273931403209ad6bb081/LICENSE.md)
[![Build Status](https://travis-ci.com/offline-agency/laravel-mongo-auto-sync.svg?branch=master)](https://travis-ci.org/offline-agency/laravel-mongo-auto-sync)
[![Quality Score](https://img.shields.io/scrutinizer/g/offline-agency/laravel-mongo-auto-sync.svg?style=flat-square)](https://scrutinizer-ci.com/g/offline-agency/laravel-mongo-auto-sync)

[![Total Downloads](https://img.shields.io/packagist/dt/offline-agency/laravel-mongo-auto-sync.svg?style=flat-square)](https://packagist.org/packages/offline-agency/laravel-mongo-auto-sync)

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
Please see [CONTRIBUTING](https://github.com/offline-agency/laravel-mongo-auto-sync/blob/42898a5835295daa6554273931403209ad6bb081/CONTRIBUTING.md) for details.

#### Security
If you discover any security-related issues, please email support@offlineagency.com instead of using the issue tracker.

#### Credits
- [Giacomo Fabbian](https://github.com/Giacomo92)

- [All Contributors](https://github.com/offline-agency/laravel-mongodb-blog/graphs/contributors)

#### About us
Offline Agency is a web design agency based in Padua, Italy. You'll find an overview of our projects [on our website](https://offlineagency.it/#home).

#### License
The MIT License (MIT). Please see [License File](https://github.com/offline-agency/laravel-mongo-auto-sync/blob/42898a5835295daa6554273931403209ad6bb081/LICENSE.md) for more information.
:::
