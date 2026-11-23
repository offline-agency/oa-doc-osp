---
title: "Laravel MongoDB Relationships — 1.3"
description: "Archived Laravel MongoDB Relationships 1.3 (commit cbd5282, 2020-01-17): requirements, changes since 1.2 and the README shipped with the tag."
permalink: /laravel-mongo-auto-sync/1.3/
packageVersion: "1.3"
sourceCommit: cbd5282187be213add1340a2665c00954bfd04f9
documentationSnapshot: true
documentationArchive: generated-tag
---
# Laravel MongoDB Relationships 1.3

This archived page describes tag `1.3` of [offline-agency/laravel-mongo-auto-sync](https://github.com/offline-agency/laravel-mongo-auto-sync). It is generated from the repository at that tag: the manifest, the history since the previous tag and the README shipped with the release. It is not a reviewed guide; read the [current documentation](/laravel-mongo-auto-sync/) for the maintained release (3.1.1).

## Release

| Fact | Value |
| --- | --- |
| Tag | [1.3](https://github.com/offline-agency/laravel-mongo-auto-sync/releases/tag/1.3) |
| Commit | [`cbd5282187be213add1340a2665c00954bfd04f9`](https://github.com/offline-agency/laravel-mongo-auto-sync/tree/cbd5282187be213add1340a2665c00954bfd04f9) |
| Commit date | 2020-01-17 |
| Composer package | `offline-agency/laravel-mongo-auto-sync` |
| Packagist | Version `1.3`, source reference matches this commit (checked 2026-11-23) |
| Declared license | MIT |

## Requirements

Declared in `composer.json` `require`:

- `php`: `>=7.0`
- `ext-json`: `*`
- `ext-mongodb`: `*`
- `jenssegers/mongodb`: `^3.3`

## Changes since 1.2

[Compare 1.2...1.3 on GitHub](https://github.com/offline-agency/laravel-mongo-auto-sync/compare/1.2...1.3).

5 non-merge commits and 5 changed files.

Commits:

- `cbd5282` \[GF\] Removed unused functions + add more docs
- `18570fe` Update php.yml
- `5cf3864` \[GF\] Added model event
- `a4364bc` \[GF\] Optmize import + format code
- `d870f4d` \[GF\] Update gitignore

Changed files:

- modified `.github/workflows/php.yml`
- modified `.gitignore`
- modified `src/Http/Models/MDModel.php`
- modified `src/Traits/MongoSyncTrait.php`
- modified `src/syncUtils.php`

## README at 1.3

Shipped as [`README.md`](https://github.com/offline-agency/laravel-mongo-auto-sync/blob/cbd5282187be213add1340a2665c00954bfd04f9/README.md). Headings are shifted one level, HTML markup is reduced to text and images, repository links are kept only when their target exists at this tag, and external links verified as unreachable are shown as text.

::: v-pre
### Laravel Mongo Auto Sync
[![Latest Stable Version](https://poser.pugx.org/offline-agency/laravel-mongo-auto-sync/v/stable)](https://packagist.org/packages/offline-agency/laravel-mongo-auto-sync)
[![MIT Licensed](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](https://github.com/offline-agency/laravel-mongo-auto-sync/blob/cbd5282187be213add1340a2665c00954bfd04f9/LICENSE.md)
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
Please see [CONTRIBUTING](https://github.com/offline-agency/laravel-mongo-auto-sync/blob/cbd5282187be213add1340a2665c00954bfd04f9/CONTRIBUTING.md) for details.

#### Security
If you discover any security-related issues, please email support@offlineagency.com instead of using the issue tracker.

#### Credits
- [Giacomo Fabbian](https://github.com/Giacomo92)

- [All Contributors](https://github.com/offline-agency/laravel-mongodb-blog/graphs/contributors)

#### About us
Offline Agency is a web design agency based in Padua, Italy. You'll find an overview of our projects [on our website](https://offlineagency.it/#home).

#### License
The MIT License (MIT). Please see [License File](https://github.com/offline-agency/laravel-mongo-auto-sync/blob/cbd5282187be213add1340a2665c00954bfd04f9/LICENSE.md) for more information.
:::
