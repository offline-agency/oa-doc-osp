---
title: "Laravel MongoDB Relationships — 2.0"
description: "Archived Laravel MongoDB Relationships 2.0 (commit faab81e, 2022-05-21): requirements, changes since 2.0-alpha.2 and the README shipped with the tag."
permalink: /laravel-mongo-auto-sync/2.0/
packageVersion: "2.0"
sourceCommit: faab81e3d10d6ad232ee9d0bb6c67b8b5fdea58c
documentationSnapshot: true
documentationArchive: generated-tag
---
# Laravel MongoDB Relationships 2.0

This archived page describes tag `2.0` of [offline-agency/laravel-mongo-auto-sync](https://github.com/offline-agency/laravel-mongo-auto-sync). It is generated from the repository at that tag: the manifest, the history since the previous tag and the README shipped with the release. It is not a reviewed guide; read the [current documentation](/laravel-mongo-auto-sync/) for the maintained release (3.1.1).

## Release

| Fact | Value |
| --- | --- |
| Tag | [2.0](https://github.com/offline-agency/laravel-mongo-auto-sync/releases/tag/2.0) |
| Commit | [`faab81e3d10d6ad232ee9d0bb6c67b8b5fdea58c`](https://github.com/offline-agency/laravel-mongo-auto-sync/tree/faab81e3d10d6ad232ee9d0bb6c67b8b5fdea58c) |
| Commit date | 2022-05-21 |
| Composer package | `offline-agency/laravel-mongo-auto-sync` |
| Packagist | Version `2.0`, source reference matches this commit (checked 2026-11-23) |
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

## Changes since 2.0-alpha.2

[Compare 2.0-alpha.2...2.0 on GitHub](https://github.com/offline-agency/laravel-mongo-auto-sync/compare/2.0-alpha.2...2.0).

70 non-merge commits and 57 changed files.

Commits:

- `6f3942f` fix: doc
- `f7517a9` Update build-ci.yml
- `d3b0191` fix: php version on scrutinizer configuration file
- `4026113` remove: useless factories
- `646eea1` fix: composer dependencies
- `d46947d` fix: php unit and phpcov versions
- `4bfcfcf` remove: phpcov  5.0
- `459ba4d` remove: php 7.2 &amp; php 7.3 from github actions
- `1031acb` feat: upgrade php minimum version
- `2e29b4f` Update composer.json
- `296cf26` Update composer.json
- `4a4d039` Update composer.json
- `b925895` Update composer.json
- `5db04ac` Update composer.json
- `a8d42f0` Update build-ci.yml
- `6ca2d41` fix: composer
- `e29e0ca` fix: illuminata db version
- `1f32c5e` feat: composer update
- `bcf4e6b` fix: composer
- `88a4d8b` feat: add orchestra version
- `f5a8861` remove: version 5.8 from illuminate packages
- `8ad1d18` remove: dbal package
- `64fb5ce` remove: mockery package
- `1783ff3` fix: update composer
- `1d71cfb` feat: add composer lock
- `f28bad6` fix: upgrade dependencies
- `c561801` Apply fixes from StyleCI
- `d3b990f` Update RelationshipMongoTrait.php
- `da8b746` Apply fixes from StyleCI
- `2a7d708` fix: handle temp is null
- `234929c` Update composer.json
- `5941bc5` Apply fixes from StyleCI
- `5aa3e24` feat: add test HelperTest
- `a9fddbf` fix: MongoCollectionTest
- `a11e1c2` feat: add test coverage for abort 404 MongoCollection
- `1a7b621` refactor: remove unused comment
- `dda7e7c` fix: checkpermission Test
- `6769048` fix: missing parameter delete target object
- `bce2b98` feat: add more tests on MongoCollection
- `0d452ad` fix: MongoCollection Test
- …and 30 more (see the comparison)

Changed files:

- modified `.github/workflows/build-ci.yml`
- modified `.gitignore`
- modified `.scrutinizer.yml`
- renamed `Docker` → `Dockerfile`
- modified `README.md`
- modified `composer.json`
- added `composer.lock`
- modified `src/Console/DropCollection.php`
- modified `src/Console/GenerateModelDocumentation.php`
- deleted `src/Eloquent/Builder.php`
- deleted `src/Eloquent/EmbedsRelationships.php`
- deleted `src/Eloquent/Model.php`
- modified `src/Extensions/MongoCollection.php`
- modified `src/Http/Models/MDModel.php`
- deleted `src/Relationships/EmbedsMany.php`
- deleted `src/Relationships/EmbedsOne.php`
- deleted `src/Relationships/EmbedsOneOrMany.php`
- modified `src/Traits/Helper.php`
- modified `src/Traits/MainMongoTrait.php`
- modified `src/Traits/ModelAdditionalMethod.php`
- modified `src/Traits/PlainMongoTrait.php`
- modified `src/Traits/RelationshipMongoTrait.php`
- modified `src/syncUtils.php`
- modified `tests/BrowserKitTestCase.php`
- modified `tests/DropCollectionTest.php`
- deleted `tests/EmbeddedRelationsTest.php`
- added `tests/HelperTest.php`
- added `tests/MDModelTest.php`
- deleted `tests/Models/Address.php`
- modified `tests/Models/Article.php`
- deleted `tests/Models/Book.php`
- added `tests/Models/Category.php`
- deleted `tests/Models/Client.php`
- deleted `tests/Models/Group.php`
- deleted `tests/Models/Location.php`
- added `tests/Models/MiniArticle.php`
- added `tests/Models/MiniCategory.php`
- added `tests/Models/MiniPermission.php`
- added `tests/Models/MiniRole.php`
- added `tests/Models/MiniUser.php`
- modified `tests/Models/Navigation.php`
- added `tests/Models/Permission.php`
- deleted `tests/Models/Photo.php`
- modified `tests/Models/Role.php`
- deleted `tests/Models/Scoped.php`
- deleted `tests/Models/Soft.php`
- modified `tests/Models/SubItem.php`
- modified `tests/Models/User.php`
- added `tests/MongoCollectionTest.php`
- deleted `tests/QueryBuilderTest.php`
- modified `tests/SimpleTestCase.php`
- modified `tests/SyncTestCase.php`
- added `tests/SyncUtilsTest.php`
- modified `tests/TestCase.php`
- modified `tests/UpdateWithSyncTest.php`
- deleted `tests/factories/ArticleFactory.php`
- deleted `tests/factories/ModelFactory.php`

## README at 2.0

Shipped as [`README.md`](https://github.com/offline-agency/laravel-mongo-auto-sync/blob/faab81e3d10d6ad232ee9d0bb6c67b8b5fdea58c/README.md). Headings are shifted one level, HTML markup is reduced to text and images, repository links are kept only when their target exists at this tag, and external links verified as unreachable are shown as text.

::: v-pre
### Laravel MongoDB Relationships
[![Latest Stable Version](https://poser.pugx.org/offline-agency/laravel-mongo-auto-sync/v/stable)](https://packagist.org/packages/offline-agency/laravel-mongo-auto-sync)
[![Total Downloads](https://img.shields.io/packagist/dt/offline-agency/laravel-mongo-auto-sync.svg?style=flat-square)](https://packagist.org/packages/offline-agency/laravel-mongo-auto-sync)
[![Build Status](https://img.shields.io/github/workflow/status/offline-agency/laravel-mongo-auto-sync/CI)](https://github.com/offline-agency/laravel-mongo-auto-sync/actions)
[![MIT Licensed](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](https://github.com/offline-agency/laravel-mongo-auto-sync/blob/faab81e3d10d6ad232ee9d0bb6c67b8b5fdea58c/LICENSE.md)
[![Quality Score](https://img.shields.io/scrutinizer/g/offline-agency/laravel-mongo-auto-sync.svg?style=flat-square)](https://scrutinizer-ci.com/g/offline-agency/laravel-mongo-auto-sync)

[![codecov](https://codecov.io/gh/offline-agency/laravel-mongo-auto-sync/branch/master/graph/badge.svg?token=0BHADJQYAW)](https://codecov.io/gh/offline-agency/laravel-mongo-auto-sync)

This package provides a better support for [MongoDB](https://www.mongodb.com) relationships in [Laravel](https://laravel.com/) Projects.
At low level all CRUD operations has been handled by [jenssegers/laravel-mongodb](https://github.com/jenssegers/laravel-mongodb)

#### Installation

```bash
composer require offlineagency/laravel-mongo-auto-sync
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
Please see [CONTRIBUTING](https://github.com/offline-agency/laravel-mongo-auto-sync/blob/faab81e3d10d6ad232ee9d0bb6c67b8b5fdea58c/CONTRIBUTING.md) for details.

#### Security
If you discover any security-related issues, please email support@offlineagency.com instead of using the issue tracker.

#### Credits
- [Giacomo Fabbian](https://github.com/Giacomo92)

- [All Contributors](https://github.com/offline-agency/laravel-mongo-auto-sync/graphs/contributors)

#### About us
Offline Agency is a web design agency based in Padua, Italy. You'll find an overview of our projects [on our website](https://offlineagency.it/#home).

#### License
The MIT License (MIT). Please see [License File](https://github.com/offline-agency/laravel-mongo-auto-sync/blob/faab81e3d10d6ad232ee9d0bb6c67b8b5fdea58c/LICENSE.md) for more information.
:::
