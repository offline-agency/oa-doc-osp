---
title: "Laravel MongoDB Relationships — 1.4"
description: "Archived Laravel MongoDB Relationships 1.4 (commit e7c191e, 2020-01-23): requirements, changes since 1.3 and the README shipped with the tag."
permalink: /laravel-mongo-auto-sync/1.4/
packageVersion: "1.4"
sourceCommit: e7c191ea0bbc21330bed682d136571dc76753578
documentationSnapshot: true
documentationArchive: generated-tag
---
# Laravel MongoDB Relationships 1.4

This archived page describes tag `1.4` of [offline-agency/laravel-mongo-auto-sync](https://github.com/offline-agency/laravel-mongo-auto-sync). It is generated from the repository at that tag: the manifest, the history since the previous tag and the README shipped with the release. It is not a reviewed guide; read the [current documentation](/laravel-mongo-auto-sync/) for the maintained release (3.1.1).

## Release

| Fact | Value |
| --- | --- |
| Tag | [1.4](https://github.com/offline-agency/laravel-mongo-auto-sync/releases/tag/1.4) |
| Commit | [`e7c191ea0bbc21330bed682d136571dc76753578`](https://github.com/offline-agency/laravel-mongo-auto-sync/tree/e7c191ea0bbc21330bed682d136571dc76753578) |
| Commit date | 2020-01-23 |
| Composer package | `offline-agency/laravel-mongo-auto-sync` |
| Packagist | Version `1.4`, source reference matches this commit (checked 2026-11-23) |
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

## Changes since 1.3

[Compare 1.3...1.4 on GitHub](https://github.com/offline-agency/laravel-mongo-auto-sync/compare/1.3...1.4).

9 non-merge commits and 12 changed files.

Commits:

- `6f18b1c` Apply fixes from StyleCI
- `e7c8f8b` \[GF\] Fix and remove comments
- `4fb543f` \[GF\] Fix styleci config
- `79c2033` \[GF\] Add new dependencies
- `58430d2` Update composer.json
- `20ec8ed` Apply fixes from StyleCI
- `316c2a9` \[GF\] Refactor
- `4f763f3` \[GF\] Add phpinsights
- `3482729` Update .travis.yml

Changed files:

- modified `.styleci.yml`
- modified `.travis.yml`
- modified `composer.json`
- modified `src/Extensions/MongoCollection.php`
- modified `src/Http/Models/MDModel.php`
- modified `src/Providers/ServiceProvider.php`
- modified `src/Traits/ModelAdditionalMethod.php`
- modified `src/Traits/MongoSyncTrait.php`
- modified `src/syncUtils.php`
- modified `tests/BrowserKitTestCase.php`
- modified `tests/CreatesApplication.php`
- modified `tests/TestCase.php`

## README at 1.4

Shipped as [`README.md`](https://github.com/offline-agency/laravel-mongo-auto-sync/blob/e7c191ea0bbc21330bed682d136571dc76753578/README.md). Headings are shifted one level, HTML markup is reduced to text and images, repository links are kept only when their target exists at this tag, and external links verified as unreachable are shown as text.

::: v-pre
### Laravel Mongo Auto Sync
[![Latest Stable Version](https://poser.pugx.org/offline-agency/laravel-mongo-auto-sync/v/stable)](https://packagist.org/packages/offline-agency/laravel-mongo-auto-sync)
[![MIT Licensed](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](https://github.com/offline-agency/laravel-mongo-auto-sync/blob/e7c191ea0bbc21330bed682d136571dc76753578/LICENSE.md)
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
Please see [CONTRIBUTING](https://github.com/offline-agency/laravel-mongo-auto-sync/blob/e7c191ea0bbc21330bed682d136571dc76753578/CONTRIBUTING.md) for details.

#### Security
If you discover any security-related issues, please email support@offlineagency.com instead of using the issue tracker.

#### Credits
- [Giacomo Fabbian](https://github.com/Giacomo92)

- [All Contributors](https://github.com/offline-agency/laravel-mongodb-blog/graphs/contributors)

#### About us
Offline Agency is a web design agency based in Padua, Italy. You'll find an overview of our projects [on our website](https://offlineagency.it/#home).

#### License
The MIT License (MIT). Please see [License File](https://github.com/offline-agency/laravel-mongo-auto-sync/blob/e7c191ea0bbc21330bed682d136571dc76753578/LICENSE.md) for more information.
:::
