---
title: "Laravel MongoDB Relationships — 3.0.0"
description: "Archived Laravel MongoDB Relationships 3.0.0 (commit 3da52d3, 2023-01-10): requirements, changes since 2.0 and the README shipped with the tag."
permalink: /laravel-mongo-auto-sync/3.0.0/
packageVersion: "3.0.0"
sourceCommit: 3da52d3df23c7d931e1c6f1a7c6449546ec3e173
documentationSnapshot: true
documentationArchive: generated-tag
---
# Laravel MongoDB Relationships 3.0.0

This archived page describes tag `3.0.0` of [offline-agency/laravel-mongo-auto-sync](https://github.com/offline-agency/laravel-mongo-auto-sync). It is generated from the repository at that tag: the manifest, the history since the previous tag and the README shipped with the release. It is not a reviewed guide; read the [current documentation](/laravel-mongo-auto-sync/) for the maintained release (3.1.1).

## Release

| Fact | Value |
| --- | --- |
| Tag | [3.0.0](https://github.com/offline-agency/laravel-mongo-auto-sync/releases/tag/3.0.0) |
| Commit | [`3da52d3df23c7d931e1c6f1a7c6449546ec3e173`](https://github.com/offline-agency/laravel-mongo-auto-sync/tree/3da52d3df23c7d931e1c6f1a7c6449546ec3e173) |
| Commit date | 2023-01-10 |
| Composer package | `offline-agency/laravel-mongo-auto-sync` |
| Packagist | Version `3.0.0`, source reference matches this commit (checked 2026-11-23) |
| Declared license | MIT |

## Requirements

Declared in `composer.json` `require`:

- `php`: `>=7.4`
- `ext-json`: `*`
- `ext-mongodb`: `*`
- `illuminate/support`: `^5.0|^6.0|^7.0|^8.0`
- `illuminate/container`: `^5.0|^6.0|^7.0|^8.0`
- `illuminate/database`: `^5.0|^6.0|^7.0|^8.0`
- `illuminate/events`: `^5.0|^6.0|^7.0|^8.0`
- `jenssegers/mongodb`: `^3.6|^3.7|^3.8`

## Changes since 2.0

[Compare 2.0...3.0.0 on GitHub](https://github.com/offline-agency/laravel-mongo-auto-sync/compare/2.0...3.0.0).

32 non-merge commits and 9 changed files.

Commits:

- `3d0bbf0` Apply fixes from StyleCI
- `e7d6a86` fix: update with partial request test
- `9471f80` fix: update with partial request test
- `ea31533` fix: update with partial request
- `07c3009` fix: partial update
- `6ef42df` fix: store with sync test
- `7141688` fix: update with partial request test
- `2c934be` fix: update with partial request
- `f2e88d9` Update README.md
- `620f201` Apply fixes from StyleCI
- `5389d99` feat: add test for getEmbedModel function
- `fb0cef8` remove: useless methods
- `24faaa0` feat: add model additional method test
- `3ced8a5` feat: add main mongo trait tests
- `08faf34` feat: add case on tests
- `10f68cc` remove: useless functions from  sync utils and align tests
- `2ad6502` fix: test
- `652be29` feat: add tests for castValueToBeSaved function
- `1787352` remove: last fix
- `fab7a52` fix: castValueToBeSaved function
- `e4cae35` fix: cast value function
- `8cfc40b` Apply fixes from StyleCI
- `046a1da` fix: installation command on readme
- `26c6ed0` Update UpdateWithSyncTest.php
- `0b46a44` Update UpdateWithSyncTest.php
- `57c1b06` Update UpdateWithSyncTest.php
- `14923d7` Update UpdateWithSyncTest.php
- `b431ca5` Update UpdateWithSyncTest.php
- `f8ae552` Update UpdateWithSyncTest.php
- `4cafe3c` Update UpdateWithSyncTest.php
- `58de9fc` Update SubItem.php
- `7f0d960` Update UpdateWithSyncTest.php

Changed files:

- modified `README.md`
- modified `src/Traits/ModelAdditionalMethod.php`
- modified `src/Traits/RelationshipMongoTrait.php`
- modified `src/syncUtils.php`
- added `tests/MainMongoTraitTest.php`
- added `tests/ModelAdditionalMethodTest.php`
- modified `tests/Models/SubItem.php`
- modified `tests/StoreWIthSyncTest.php`
- modified `tests/UpdateWithSyncTest.php`

## README at 3.0.0

Shipped as [`README.md`](https://github.com/offline-agency/laravel-mongo-auto-sync/blob/3da52d3df23c7d931e1c6f1a7c6449546ec3e173/README.md). Headings are shifted one level, HTML markup is reduced to text and images, repository links are kept only when their target exists at this tag, and external links verified as unreachable are shown as text.

::: v-pre
### Laravel MongoDB Relationships
[![Latest Stable Version](https://poser.pugx.org/offline-agency/laravel-mongo-auto-sync/v/stable)](https://packagist.org/packages/offline-agency/laravel-mongo-auto-sync)
[![Total Downloads](https://img.shields.io/packagist/dt/offline-agency/laravel-mongo-auto-sync.svg?style=flat-square)](https://packagist.org/packages/offline-agency/laravel-mongo-auto-sync)
[![Build Status](https://github.com/offline-agency/laravel-mongo-auto-sync/actions/workflows/build-ci.yml/badge.svg)](https://github.com/offline-agency/laravel-mongo-auto-sync/actions/workflows/build-ci.yml)
[![MIT Licensed](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](https://github.com/offline-agency/laravel-mongo-auto-sync/blob/3da52d3df23c7d931e1c6f1a7c6449546ec3e173/LICENSE.md)
[![Quality Score](https://img.shields.io/scrutinizer/g/offline-agency/laravel-mongo-auto-sync.svg?style=flat-square)](https://scrutinizer-ci.com/g/offline-agency/laravel-mongo-auto-sync)

[![codecov](https://codecov.io/gh/offline-agency/laravel-mongo-auto-sync/branch/master/graph/badge.svg?token=0BHADJQYAW)](https://codecov.io/gh/offline-agency/laravel-mongo-auto-sync)

This package provides a better support for [MongoDB](https://www.mongodb.com) relationships in [Laravel](https://laravel.com/) Projects.
At low level all CRUD operations has been handled by [jenssegers/laravel-mongodb](https://github.com/jenssegers/laravel-mongodb)

#### Installation

```bash
composer require offline-agency/laravel-mongo-auto-sync
```

##### Prerequisites
Make sure you have the MongoDB PHP driver installed. You can find installation instructions at [http://php.net/manual/en/mongodb.installation.php](http://php.net/manual/en/mongodb.installation.php)

##### Package version Compatibility

| This package | Laravel | Laravel MongoDB |
| ------------ | ------- | --------------- |
| 1.x          | 5.8.x   | 3.5.x           |
| 1.x          | 6.x     | 3.6.x           |
| 2.x          | 5.8.x   | 3.5.x           |
| 2.x          | 6.x     | 3.6.x           |
| 2.x          | 7.x     | 3.7.x           |
| 2.x          | 8.x     | 3.8.x           |
| 2.x          | 9.x     | 3.9.x           |

##### PHP Version Compatibility
- Version 1: PHP 7.1, 7.2, 7.3
- Version 2: PHP 7.4+

#### Features
- Sync changes between collection with relationships after CRUD operations
    - EmbedsOne & EmbedsMany 
    
###### Example without our package
  
  ``` php
  //create a new Article with title "Game of Thrones" with Category "TV Series"
  //assign data to $article       
  $article->save();
  /*
  Article::class {
    'title' => 'Game of Thrones',
    'category' => Category::class {
        'name' => 'TV Series'
     }
  }
  */
  
  //Retrieve 'TV Series' category
  $category = Category::where('name', 'TV Series')->first();
  /*
    Category::class {
        'name' => 'Game of Thrones',
        'articles' => null
    }
  */ 
  ```
  
The sub document article has not been updated with the new article. So you will need some extra code to write in order to see the new article it in the category page. The number of sync depends on the number of the relationships and on the number of the entry in every single EmbedsMany relationships.
  
Total updates = ∑ (entry in all EmbedsMany relationships) + ∑ (EmbedsOne relationships)
  
As you can see the lines of extra code can rapidly increase, and you will write many redundant code.
 
###### Example with our package
  
  ``` php
  //create a new Article with title "Game of Thrones" with Category "TV Series"
  $article->storeWithSync($request);
  /*
  Article::class {
    'title' => 'Game of Thrones',
    'category' => Category::class {
        'name' => 'TV Series'
    }
  }
   */
  //Retrieve 'TV Series' category
  $category = Category::where('name', 'TV Series')->first();   
 /*
  Category::class {
    'name' => 'Game of Thrones',
    'articles' => Article::class {
        'title' => 'Game of Thrones'
    }
  }
  */ 
  ```
The sub document article has been updated with the new article, with no need of extra code :tada: 

You can see the new article on the category page because the package synchronizes the information for you by reading the Model Setup.
  
**These example can be applied for all write operations on the database.**
- Referenced sub documents [TO DO] 
- Handle sub document as Model in order to exploit Laravel ORM support during write operation (without sync feature) [TO BE TEST] 
- Handle referenced sub document as Model in order to exploit Laravel ORM support during write operation (without sync feature) [TO DO] 
- Advance cast field support

#### Use cases
- Blog: see demo [here](https://github.com/offline-agency/laravel-mongodb-blog)
- Ecommerce
- API System for mobile application o for generated static site
- Any projects that require fast read operations and (slow) write operations that can be run on background

#### Documentation
You can find the documentation [here](https://docs.offlineagency.com/laravel-mongo-auto-sync/)

#### Testing

Run this command inside your project's route
``` bash
docker-compose up
```

Now run the tests with:
``` bash
composer test
```

#### Roadmap :rocket:
- Refactor target synchronization to Observer pattern, so all this operation can be run on background using [Laravel Queue System](https://laravel.com/docs/5.8/queues). This will also speed up all the operations in the collection that is primary involved in write operations.
- Command Analyse Database: This command will analyse the database in order to find some relationship error. 
Ex: An article with a category associated that is not present on the Category's sub document.
- Refactor **save()** method in order to handle CRUD operation on relationship also without sync.
- Support for [referenced relationships](https://docs.mongodb.com/manual/tutorial/model-referenced-one-to-many-relationships-between-documents/).
- Better support for all field types.
- DestroyWithSync() without delete sub documents on other collections.
- Add more tests.
- Nested relationships.
- Benchmark MongoDB vs Mysql (write and read operation).
- Fix typo errors.

#### Contributing
Please see [CONTRIBUTING](https://github.com/offline-agency/laravel-mongo-auto-sync/blob/3da52d3df23c7d931e1c6f1a7c6449546ec3e173/CONTRIBUTING.md) for details.

#### Security
If you discover any security-related issues, please email support@offlineagency.com instead of using the issue tracker.

#### Credits
- [Giacomo Fabbian](https://github.com/Giacomo92)

- [All Contributors](https://github.com/offline-agency/laravel-mongo-auto-sync/graphs/contributors)

#### About us
Offline Agency is a web design agency based in Padua, Italy. You'll find an overview of our projects [on our website](https://offlineagency.it/#home).

#### License
The MIT License (MIT). Please see [License File](https://github.com/offline-agency/laravel-mongo-auto-sync/blob/3da52d3df23c7d931e1c6f1a7c6449546ec3e173/LICENSE.md) for more information.
:::
