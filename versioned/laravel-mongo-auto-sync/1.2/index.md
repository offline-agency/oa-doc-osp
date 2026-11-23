---
title: "Laravel MongoDB Relationships — 1.2"
description: "Archived Laravel MongoDB Relationships 1.2 (commit 0bc9d4a, 2019-12-27): requirements, changes since 1.1 and the README shipped with the tag."
permalink: /laravel-mongo-auto-sync/1.2/
packageVersion: "1.2"
sourceCommit: 0bc9d4af1f43a1e53d6b9b82ae291626e58d4a9e
documentationSnapshot: true
documentationArchive: generated-tag
---
# Laravel MongoDB Relationships 1.2

This archived page describes tag `1.2` of [offline-agency/laravel-mongo-auto-sync](https://github.com/offline-agency/laravel-mongo-auto-sync). It is generated from the repository at that tag: the manifest, the history since the previous tag and the README shipped with the release. It is not a reviewed guide; read the [current documentation](/laravel-mongo-auto-sync/) for the maintained release (3.1.1).

## Release

| Fact | Value |
| --- | --- |
| Tag | [1.2](https://github.com/offline-agency/laravel-mongo-auto-sync/releases/tag/1.2) |
| Commit | [`0bc9d4af1f43a1e53d6b9b82ae291626e58d4a9e`](https://github.com/offline-agency/laravel-mongo-auto-sync/tree/0bc9d4af1f43a1e53d6b9b82ae291626e58d4a9e) |
| Commit date | 2019-12-27 |
| Composer package | `offline-agency/laravel-mongo-auto-sync` |
| Packagist | Version `1.2`, source reference matches this commit (checked 2026-11-23) |
| Declared license | MIT |

## Requirements

Declared in `composer.json` `require`:

- `php`: `>=7.0`
- `ext-json`: `*`
- `ext-mongodb`: `*`
- `jenssegers/mongodb`: `^3.3`

## Changes since 1.1

[Compare 1.1...1.2 on GitHub](https://github.com/offline-agency/laravel-mongo-auto-sync/compare/1.1...1.2).

5 non-merge commits and 4 changed files.

Commits:

- `0bc9d4a` Update README.md
- `7b75e74` Update .travis.yml
- `f8e9fad` Update .travis.yml
- `37b17a5` Apply fixes from StyleCI
- `2b5f594` Create php.yml

Changed files:

- added `.github/workflows/php.yml`
- modified `.travis.yml`
- modified `README.md`
- modified `src/Traits/MongoSyncTrait.php`

## README at 1.2

Shipped as [`README.md`](https://github.com/offline-agency/laravel-mongo-auto-sync/blob/0bc9d4af1f43a1e53d6b9b82ae291626e58d4a9e/README.md). Headings are shifted one level, HTML markup is reduced to text and images, repository links are kept only when their target exists at this tag, and external links verified as unreachable are shown as text.

::: v-pre
### Laravel Mongo Auto Sync
[![Latest Stable Version](https://poser.pugx.org/offline-agency/laravel-mongo-auto-sync/v/stable)](https://packagist.org/packages/offline-agency/laravel-mongo-auto-sync)
[![MIT Licensed](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](https://github.com/offline-agency/laravel-mongo-auto-sync/blob/0bc9d4af1f43a1e53d6b9b82ae291626e58d4a9e/LICENSE.md)
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
Please see [CONTRIBUTING](https://github.com/offline-agency/laravel-mongo-auto-sync/blob/0bc9d4af1f43a1e53d6b9b82ae291626e58d4a9e/CONTRIBUTING.md) for details.

#### Security
If you discover any security-related issues, please email support@offlineagency.com instead of using the issue tracker.

#### Credits
- [Giacomo Fabbian](https://github.com/Giacomo92)

- [All Contributors](https://github.com/offline-agency/laravel-mongodb-blog/graphs/contributors)

#### About us
Offline Agency is a web design agency based in Padua, Italy. You'll find an overview of our projects [on our website](https://offlineagency.it/#home).

#### License
The MIT License (MIT). Please see [License File](https://github.com/offline-agency/laravel-mongo-auto-sync/blob/0bc9d4af1f43a1e53d6b9b82ae291626e58d4a9e/LICENSE.md) for more information.
:::
