---
meta:
  - name: description
    content: This Laravel wrapper allows you to send newsletters using EmailChef's API.
gitName: laravel-email-chef
---

# laravel-email-chef

Email Chef is a project that helps you create and send beautiful newsletters with features that make your work easier.

[![Github](./assets/icon/github.svg "Github Icon")](https://github.com/offline-agency/laravel-fatture-in-cloud)
[![Latest Stable Version](https://poser.pugx.org/offline-agency/laravel-fatture-in-cloud/v/stable)](https://packagist.org/packages/offline-agency/laravel-fatture-in-cloud)
[![Total Downloads](https://img.shields.io/packagist/dt/offline-agency/laravel-fatture-in-cloud.svg?style=flat-square)](https://packagist.org/packages/offline-agency/laravel-fatture-in-cloud)
[![Build Status](https://img.shields.io/github/workflow/status/offline-agency/laravel-fatture-in-cloud/CI)](https://github.com/offline-agency/laravel-fatture-in-cloud/actions)
[![MIT Licensed](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![Build Status](https://img.shields.io/travis/offline-agency/laravel-fatture-in-cloud/master.svg?style=flat-square)](https://travis-ci.org/offline-agency/laravel-fatture-in-cloud)
[![StyleCI](https://github.styleci.io/repos/167236902/shield)](https://styleci.io/repos/167236902)
[![codecov](https://codecov.io/gh/offline-agency/laravel-fatture-in-cloud/branch/master/graph/badge.svg?token=0BHADJQYAW)](https://codecov.io/gh/offline-agency/laravel-fatture-in-cloud)

## Installation and setup

Placeholder

### Basic installation

You can install this package via composer using:

``` bash 
composer require offline-agency/laravel-email-chef
```

The package will automatically register its service provider.

To publish the config file to `config/backup.php` run:

``` bash 
php artisan vendor:publish --provider="OfflineAgency\EmailChef\EmailChefServiceProvider" --tag="config"    
```



## Api coverage

We are currently work on this package to implement all endpoints. Enable notifications on [GitHub](https://github.com/offline-agency/laravel-fatture-in-cloud-v2) to be notified when new API are released.

✅ = implemented

🔜 = coming soon

❌ = not implemented

Each response entity has this prefix on the namespace: `\OfflineAgency\LaravelFattureInCloudV2\Entities\`

#### Account
| Done | Endpoint        | Type                      | Response |
|------|-----------------|--------------------------|----------|
| ✅    | account         | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ✅    | get instance    | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ✅    | update instance | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=blue)]() | -        |

#### Subscription
| Done | Endpoint     | Type                                                                                   | Response |
| ---- |--------------|----------------------------------------------------------------------------------------| -------- |
| ✅ | subscription | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | - |

#### Lists
| Done | Endpoint        | Type                                                                                    | Response |
| ---- |-----------------|-----------------------------------------------------------------------------------------| -------- |
| ✅ | get collection  | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()  | - |
| ✅ | get instance    | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()  | - |
| ✅ | get stats       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()  | - |
| ✅ | unsubscribe     | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()  | - |
| ✅ | create instance | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=blue)]() | - |
| ✅ | update instance | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=violet)]()  | - |
| ✅ | delete instance | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]()  | - |

#### Contacts
| Done | Endpoint        | Type | Response |
| ---- |-----------------| ---- | -------- |
| ✅ | get count       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | - |
| ✅ | get collection  | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | - |
| ✅ | get instance    | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | - |
| ✅ | create instance | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=blue)]() | - |
| ✅ | update instance | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=violet)]() | - |


#### Predefined Fields
| Done | Endpoint        | Type                | Response |
| ---- |-----------------|---------------------| -------- |
| ✅ | get collection  | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | - |

#### Custom fields
| Done | Endpoint        | Type                 | Response |
| ---- |-----------------|---------------------| -------- |
| ✅ | get collection  | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | - |
| ✅ | get instance    | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | - |
| ✅ | get count       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | - |
| ✅ | create instance | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=blue)]() | - |
| ✅ | update instance | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=violet)]() | - |
| ✅ | delete instance | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | - |

#### Blockings
| Done | Endpoint        | Type                 | Response |
| ---- |-----------------|---------------------| -------- |
| ✅ | get collection  | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | - |
| ✅ | get count       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | - |
| ✅ | create instance | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=blue)]() | - |
| ✅ | delete instance | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | - |


#### Import Tasks
| Done | Endpoint                                           | Type                 | Response |
| ---- |----------------------------------------------------|----------------------| -------- |
| ✅ | get collection                                     | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | - |
| ✅ | get instance (a.k.a. “single task instant status”) | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | - |
| ✅ | create instance (a.k.a. “import contacts”)         | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=blue)]() | - |

#### Segments
| Done | Endpoint             | Type                 | Response |
| ---- |----------------------|---------------------| -------- |
| ✅ | get collection       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | - |
| ✅ | get instance         | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | - |
| ✅ | get count            | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | - |
| ✅ | get contacts counter | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | - |
| ✅ | create instance      | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=blue)]() | - |
| ✅ | update instance      | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=violet)]()  | - |
| ✅ | delete instance      | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | - |

#### Campaigns
| Done | Endpoint             | Type                 | Response |
| - |----------------------|---------------------| -------- |
| ✅ | get count            | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | - |
| ✅ | get collection       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | - |
| ✅ | get instance         | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | - |
| ✅ | create instance      | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=blue)]() | - |
| ✅ | update instance      | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=violet)]()  | - |
| ✅ | delete instance      | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | - |
| ✅ | schedule             | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=violet)]()  | - |
| ✅ | cancel scheduling    | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=violet)]()  | - |
| ✅ | archive              | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=violet)]()  | - |
| ✅ | unarchive            | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=violet)]()  | - |
| ✅ | clone                | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=blue)]() | - |
| ✅ | get links collection | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | - |

#### Autoresponders
| Done | Endpoint             | Type                 | Response |
| ---- |----------------------|---------------------| -------- |
| ✅ | get count            | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | - |
| ✅ | get collection       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | - |
| ✅ | get instance         | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | - |
| ✅ | create instance      | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=blue)]() | - |
| ✅ | update instance      | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=violet)]()  | - |
| ❌ | delete instance      | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | - |
| ✅ | squend test email    | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=violet)]()  | - |
| ✅ | activate             | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=violet)]()  | - |
| ✅ | deactivate           | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=violet)]()  | - |
| ✅ | clone                | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=violet)]() | - |
| ✅ | get links collection | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | - |


#### Send Mail
| Done | Endpoint  | Type                | Response |
| ---- |-----------|---------------------| -------- |
| ✅ | send mail | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=blue)]()  | - |

#### SMS
| Done | Endpoint                  | Type                 | Response |
| ---- |---------------------------|---------------------| -------- |
| ❌ | send                      | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=blue)]()  | - |
| ❌ | get balance               | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | - |
| ❌ | get status message        | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | - |
| ❌ | get bulk message statuses | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()| - |

## Basic Usage
Create a new invoice on FC



``` php
php code here
```
## Entities

### Account

``` php
php code here
```

#### Available Methods
- **method1**: description
- **method2**: description
    - key - *value*


### Registry

``` php
php code here
```

### Available Methods
- **method1**: description
- **method2**: description

### Products <Badge text="TO DO" type="warning"/>

### Documents Issued

``` php
php code here
```



#### Available Methods
- **lista()**: return  a list of all documents;
- **nuovo()**: it allows to create a new document
- **importa()**: it allows to create document in batch
- **modifica()**: it allows to edit a specific document
- **elimina()**: it allows to delete a specific document

### Purchases  <Badge text="TO DO" type="warning"/>

### Compensation  <Badge text="TO DO" type="warning"/>

### Warehouse  <Badge text="TO DO" type="warning"/>

### Mail <Badge text="TO DO" type="warning"/>

## Use Cases

### Create an invoice
Using Observer pattern to create an invoice on Fatture in Cloud after order creation in your E-commerce application.

### Update a customer
Using Observer pattern when update a customer propagate the change also in Fatture in Cloud

### Add a new product
Using a job you can publish a new product on your ecommerce from Fatture in Cloud

### Update a product availability
Using a job keep update a product avaiability on your ecommerce and also in Fatture in Cloud

## Roadmap :rocket:
- **Demo**: New repository with full examples and functionality. Synchronization from application and Fatture in Cloud and vice versa
- **Tests**: Add test to achieve 100% of test coverage
- **More Validations**: Add more validations before send request to the API.
- **L8 Compatibility**: Add Laravel 8 support

## Questions & issues
Find yourself stuck using the package? Found a bug? Do you have general questions or suggestions for improving the plugin? Feel free to create an issue on [GitHub](https://github.com/offline-agency/laravel-fatture-in-cloud/issues), we’ll try to address it as soon as possible.

If you’ve found a bug regarding security please mail <support@offlineagency.com> instead of using the issue tracker.

## About Us

[Offline Agency](https://offlineagency.it) is an agency based in Padua, Italy.

Open source software is used in all projects we deliver. This is just a few of the free pieces of software we use every single day. For this, we are very grateful. When we feel we have solved a problem in a way that can help other developers, we release our code as open source software on [GitHub](https://github.com/offline-agency).

This package was made by [Giacomo Fabbian](https://github.com/Giacomo92). There are [many other contributors](https://github.com/offline-agency/laravel-fatture-in-cloud/graphs/contributors) who devoted time and effort to make this package better.


[^1]: **FIC (Fatture in Cloud)**: it's a software that allow you to handle invoices from pc, smartphone or tablet.
