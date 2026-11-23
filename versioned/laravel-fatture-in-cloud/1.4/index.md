---
title: "Fatture in Cloud API v1 — 1.4"
description: "Archived Fatture in Cloud API v1 1.4 (commit c40a449, 2020-02-13): requirements, changes since 1.3 and the README shipped with the tag."
permalink: /laravel-fatture-in-cloud/1.4/
packageVersion: "1.4"
sourceCommit: c40a449fef577f6610d2b5f8450ccd010d066af1
documentationSnapshot: true
documentationArchive: generated-tag
---
# Fatture in Cloud API v1 1.4

This archived page describes tag `1.4` of [offline-agency/laravel-fatture-in-cloud](https://github.com/offline-agency/laravel-fatture-in-cloud). It is generated from the repository at that tag: the manifest, the history since the previous tag and the README shipped with the release. It is not a reviewed guide; read the [current documentation](/laravel-fatture-in-cloud/) for the maintained release (2.2.8).

## Release

| Fact | Value |
| --- | --- |
| Tag | [1.4](https://github.com/offline-agency/laravel-fatture-in-cloud/releases/tag/1.4) |
| Commit | [`c40a449fef577f6610d2b5f8450ccd010d066af1`](https://github.com/offline-agency/laravel-fatture-in-cloud/tree/c40a449fef577f6610d2b5f8450ccd010d066af1) |
| Commit date | 2020-02-13 |
| Composer package | `offline-agency/laravel-fatture-in-cloud` |
| Packagist | Not listed on Packagist (checked 2026-11-23) |
| Declared license | MIT |

## Requirements

Declared in `composer.json` `require`:

- `php`: `>=7.1`
- `ext-json`: `*`
- `illuminate/support`: `^5.8|^6.0`
- `illuminate/container`: `^5.8|^6.0`
- `illuminate/database`: `^5.8|^6.0`
- `illuminate/events`: `^5.8|^6.0`

## Changes since 1.3

[Compare 1.3...1.4 on GitHub](https://github.com/offline-agency/laravel-fatture-in-cloud/compare/1.3...1.4).

3 non-merge commits and 2 changed files.

Commits:

- `c40a449` Update php.yml
- `21db5bb` Update composer.json
- `54dc7fd` Update composer.json

Changed files:

- modified `.github/workflows/php.yml`
- modified `composer.json`

## README at 1.4

Shipped as [`README.md`](https://github.com/offline-agency/laravel-fatture-in-cloud/blob/c40a449fef577f6610d2b5f8450ccd010d066af1/README.md). Headings are shifted one level, HTML markup is reduced to text and images, repository links are kept only when their target exists at this tag, and external links verified as unreachable are shown as text.

::: v-pre
### Laravel integration with Fatture in Cloud

[![Latest Stable Version](https://poser.pugx.org/offline-agency/laravel-fatture-in-cloud/v/stable)](https://packagist.org/packages/offline-agency/laravel-fatture-in-cloud)
[![MIT Licensed](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](https://github.com/offline-agency/laravel-fatture-in-cloud/blob/c40a449fef577f6610d2b5f8450ccd010d066af1/LICENSE.md)
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

#### To do

Align Fields with last api version:

- [x] Nuova Fattura
- [ ] Importa Fattura
- [ ] Lista Fattura

Next:

- [ ] Make Test

#### Testing

Run the tests with:

```bash
composer test
```

#### Contributing

Please see [CONTRIBUTING](https://github.com/offline-agency/laravel-fatture-in-cloud/blob/c40a449fef577f6610d2b5f8450ccd010d066af1/CONTRIBUTING.md) for details.

#### Security

If you discover any security-related issues, please email &lt;support@offlineagency.com> instead of using the issue tracker.

#### Homestead Environment

An optional Homestead per project virtual machine environment has been included with this project, for instructions on installing Laravel Homestead with Vagrant see [First Steps](https://laravel.com/docs/master/homestead#first-steps).

Once vagrant is installed, from the project directory, run:

##### Mac / Linux

```bash
php vendor/bin/homestead make
```

##### Windows

```bash
vendor\\bin\\homestead make
```

Next, run the `vagrant up` command in your terminal. You can SSH into your virtual machine by issuing the `vagrant ssh` terminal command from your project directory. For full instructions on how to access the project using Homestead see the [Laravel Homestead documentation](https://laravel.com/docs/master/homestead).

#### Credits

- [Giacomo Fabbian](https://github.com/Giacomo92)
- All Contributors

#### About us

Offline Agency is a web design agency based in Padua, Italy. You'll find an overview of our projects [on our website](https://offlineagency.it/).

#### License

The MIT License (MIT). Please see [License File](https://github.com/offline-agency/laravel-fatture-in-cloud/blob/c40a449fef577f6610d2b5f8450ccd010d066af1/LICENSE.md) for more information.
:::
