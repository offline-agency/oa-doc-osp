---
title: "Filament SPID — 0.1.1"
description: "Archived Filament SPID 0.1.1 (commit 45e019d, 2025-10-09): requirements, changes and the README shipped with the tag."
permalink: /filament-spid/0.1.1/
packageVersion: "0.1.1"
sourceCommit: 45e019db6e441aa398403b2db6e76477e85e300c
documentationSnapshot: true
documentationArchive: generated-tag
---
# Filament SPID 0.1.1

This archived page describes tag `0.1.1` of [offline-agency/filament-spid](https://github.com/offline-agency/filament-spid). It is generated from the repository at that tag: the manifest, the history since the previous tag and the README shipped with the release. It is not a reviewed guide; read the [current documentation](/filament-spid/) for the maintained release (1.0.0).

## Release

| Fact | Value |
| --- | --- |
| Tag | [0.1.1](https://github.com/offline-agency/filament-spid/releases/tag/0.1.1) |
| Commit | [`45e019db6e441aa398403b2db6e76477e85e300c`](https://github.com/offline-agency/filament-spid/tree/45e019db6e441aa398403b2db6e76477e85e300c) |
| Commit date | 2025-10-09 |
| Composer package | `offline-agency/filament-spid` |
| Packagist | Version `0.1.1`, source reference matches this commit (checked 2026-11-23) |
| Declared license | MIT |

## Requirements

Declared in `composer.json` `require`:

- `php`: `^8.2`
- `filament/filament`: `^3.0|^4.0`
- `illuminate/contracts`: `^10.0|^11.0|^12.0`
- `italia/spid-laravel`: `^2.0`
- `spatie/laravel-package-tools`: `^1.16`

## Changes

First tag of the repository: 2 non-merge commits up to this tag.

## README at 0.1.1

Shipped as [`README.md`](https://github.com/offline-agency/filament-spid/blob/45e019db6e441aa398403b2db6e76477e85e300c/README.md). Headings are shifted one level, HTML markup is reduced to text and images, repository links are kept only when their target exists at this tag, and external links verified as unreachable are shown as text.

::: v-pre
### Filament SPID

[![Latest Version on Packagist](https://img.shields.io/packagist/v/offline-agency/filament-spid.svg?style=flat-square)](https://packagist.org/packages/offline-agency/filament-spid)
[![GitHub Tests Action Status](https://img.shields.io/github/actions/workflow/status/offline-agency/filament-spid/run-tests.yml?branch=main&label=tests&style=flat-square)](https://github.com/offline-agency/filament-spid/actions?query=workflow%3Arun-tests+branch%3Amain)
[![GitHub Code Style Action Status](https://img.shields.io/github/actions/workflow/status/offline-agency/filament-spid/fix-php-code-style-issues.yml?branch=main&label=code%20style&style=flat-square)](https://github.com/offline-agency/filament-spid/actions?query=workflow%3A"Fix+PHP+code+style+issues"+branch%3Amain)
[![Total Downloads](https://img.shields.io/packagist/dt/offline-agency/filament-spid.svg?style=flat-square)](https://packagist.org/packages/offline-agency/filament-spid)

SPID (Sistema Pubblico di Identità Digitale) authentication plugin for Filament based on [italia/spid-laravel](https://github.com/italia/spid-laravel).

This package allows you to integrate SPID authentication into your Filament admin panels, enabling Italian public administration identity management.

#### Features

- 🇮🇹 Full SPID integration for Filament
- 🔐 Secure SAML2 authentication
- 🎨 Customizable login view
- 🔧 Compatible with Filament 3 & 4
- 📦 Support for Laravel 10, 11, 12
- ⚡ PHP 8.2+ ready
- 🧪 Fully tested

#### Requirements

- PHP 8.2 or higher
- Laravel 10.x, 11.x, or 12.x
- Filament 3.x or 4.x
- [italia/spid-laravel](https://github.com/italia/spid-laravel) package

#### Installation

You can install the package via composer:

```bash
composer require offline-agency/filament-spid
```

Publish the configuration file:

```bash
php artisan vendor:publish --tag="filament-spid-config"
```

Publish and run the migrations:

```bash
php artisan vendor:publish --tag="filament-spid-migrations"
php artisan migrate
```

Optionally, you can publish the views:

```bash
php artisan vendor:publish --tag="filament-spid-views"
```

#### SPID Configuration

First, configure the base SPID Laravel package. Follow the [italia/spid-laravel documentation](https://github.com/italia/spid-laravel) to:

1. Generate SPID certificates
2. Configure your Service Provider metadata
3. Set up SPID Identity Providers

Add the following fields to your users table migration (if not already published):

```php
$table->string('fiscal_code')->unique()->nullable();
$table->json('spid_data')->nullable();
```

#### Usage

Register the plugin in your Filament Panel Provider:

```php
use OfflineAgency\FilamentSpid\SpidPlugin;

public function panel(Panel $panel): Panel
{
    return $panel
        ->default()
        ->id('admin')
        ->path('admin')
        ->plugin(
            SpidPlugin::make()
                ->spidButtonLabel('Entra con SPID')
                ->providers([
                    'arubaid',
                    'infocertid',
                    'lepidaid',
                    'namirialid',
                    'posteid',
                    'sielteid',
                    'spiditalia',
                    'timid',
                    'teamsystemid'
                ])
        );
}
```

##### Customization

###### Custom Login View

```php
SpidPlugin::make()
    ->loginView('your-custom-view')
```

###### Custom Routes

```php
SpidPlugin::make()
    ->loginRoute('custom.spid.login')
    ->logoutRoute('custom.spid.logout')
    ->acsRoute('custom.spid.acs')
    ->metadataRoute('custom.spid.metadata')
```

###### Hide SPID Button

```php
SpidPlugin::make()
    ->showSpidButton(false)
```

###### Custom Button Label and Icon

```php
SpidPlugin::make()
    ->spidButtonLabel('Login con SPID')
    ->spidButtonIcon('heroicon-o-shield-check')
```

###### Select Specific Providers

```php
SpidPlugin::make()
    ->providers(['posteid', 'arubaid', 'infocertid'])
```

#### Configuration

The `config/filament-spid.php` configuration file allows you to customize:

```php
return [
    'user_model' => \App\Models\User::class,
    'redirect_after_login' => '/admin',
    'spid_level' => 'https://www.spid.gov.it/SpidL2',
];
```

#### User Model

Your User model should have these fields:

```php
protected $fillable = [
    'name',
    'email',
    'fiscal_code',
    'spid_data',
    // ... other fields
];

protected $casts = [
    'spid_data' => 'array',
];
```

#### SPID Levels

SPID supports three security levels:

- `SpidL1` - Level 1 (Username and password)
- `SpidL2` - Level 2 (Username, password, and OTP) - **Default**
- `SpidL3` - Level 3 (Smart card or hardware token)

Configure the level in your config file or when calling the login:

```php
route('spid.login', ['provider' => 'posteid', 'level' => 'SpidL2'])
```

#### Testing

```bash
composer test
```

Run tests with coverage:

```bash
composer test-coverage
```

#### Code Style

```bash
composer format
```

#### Static Analysis

```bash
composer analyse
```

#### Changelog

Please see CHANGELOG for more information on what has changed recently.

#### Contributing

Please see [CONTRIBUTING](https://github.com/offline-agency/filament-spid/blob/45e019db6e441aa398403b2db6e76477e85e300c/CONTRIBUTING.md) for details.

#### Security Vulnerabilities

Please review our security policy on how to report security vulnerabilities.

#### Credits

- [Offline Agency](https://offlineagency.it)
- All Contributors
- Based on [italia/spid-laravel](https://github.com/italia/spid-laravel)

#### Support

For support and questions:
- Email: support@offlineagency.it
- GitHub Issues: [Create an issue](https://github.com/offline-agency/filament-spid/issues)

#### License

The MIT License (MIT). Please see [License File](https://github.com/offline-agency/filament-spid/blob/45e019db6e441aa398403b2db6e76477e85e300c/LICENSE.md) for more information.

#### About Offline Agency

Offline Agency is a web development agency based in Italy, specializing in Laravel and Filament applications.

- Website: [https://offlineagency.it](https://offlineagency.it)
- GitHub: [@offline-agency](https://github.com/offline-agency)
- Email: support@offlineagency.it
:::
