---
title: "Laravel MongoDB Relationships — 2.0-alpha.2"
description: "Archived Laravel MongoDB Relationships 2.0-alpha.2 (commit 88d271a, 2020-07-22): requirements, changes since 2.0-alpha.1 and the README shipped with the tag."
permalink: /laravel-mongo-auto-sync/2.0-alpha.2/
packageVersion: "2.0-alpha.2"
sourceCommit: 88d271ad227fd47f9fbef3c6d783d96f344af9b4
documentationSnapshot: true
documentationArchive: generated-tag
---
# Laravel MongoDB Relationships 2.0-alpha.2

This archived page describes tag `2.0-alpha.2` of [offline-agency/laravel-mongo-auto-sync](https://github.com/offline-agency/laravel-mongo-auto-sync). It is generated from the repository at that tag: the manifest, the history since the previous tag and the README shipped with the release. It is not a reviewed guide; read the [current documentation](/laravel-mongo-auto-sync/) for the maintained release (3.1.1).

## Release

| Fact | Value |
| --- | --- |
| Tag | [2.0-alpha.2](https://github.com/offline-agency/laravel-mongo-auto-sync/releases/tag/2.0-alpha.2) |
| Commit | [`88d271ad227fd47f9fbef3c6d783d96f344af9b4`](https://github.com/offline-agency/laravel-mongo-auto-sync/tree/88d271ad227fd47f9fbef3c6d783d96f344af9b4) |
| Commit date | 2020-07-22 |
| Composer package | `offline-agency/laravel-mongo-auto-sync` |
| Packagist | Version `2.0-alpha.2`, source reference matches this commit (checked 2026-11-23) |
| Declared license | MIT |

## Requirements

Declared in `composer.json` `require`:

- `php`: `>=7.2`
- `ext-json`: `*`
- `ext-mongodb`: `*`
- `illuminate/support`: `^7.0`
- `illuminate/container`: `^7.0`
- `illuminate/database`: `^7.0`
- `illuminate/events`: `^7.0`
- `mongodb/mongodb`: `^1.6`
- `jenssegers/mongodb`: `4.0.0-alpha.1`

## Changes since 2.0-alpha.1

[Compare 2.0-alpha.1...2.0-alpha.2 on GitHub](https://github.com/offline-agency/laravel-mongo-auto-sync/compare/2.0-alpha.1...2.0-alpha.2).

5 non-merge commits and 21 changed files.

Commits:

- `a188332` Apply fixes from StyleCI
- `651541f` feat: add new pre-release
- `0d5ac4c` fix: truncate items and user before start test
- `170b0c3` Apply fixes from StyleCI
- `d3fd0b2` feat: upgrade laravel-monogodb

Changed files:

- modified `README.md`
- modified `composer.json`
- added `src/Eloquent/Builder.php`
- added `src/Eloquent/EmbedsRelationships.php`
- added `src/Eloquent/Model.php`
- modified `src/Http/Models/MDModel.php`
- added `src/Relationships/EmbedsMany.php`
- added `src/Relationships/EmbedsOne.php`
- added `src/Relationships/EmbedsOneOrMany.php`
- added `tests/EmbeddedRelationsTest.php`
- added `tests/Models/Address.php`
- added `tests/Models/Book.php`
- added `tests/Models/Client.php`
- added `tests/Models/Group.php`
- added `tests/Models/Location.php`
- added `tests/Models/Photo.php`
- added `tests/Models/Role.php`
- added `tests/Models/Scoped.php`
- added `tests/Models/Soft.php`
- added `tests/Models/User.php`
- added `tests/QueryBuilderTest.php`

## README at 2.0-alpha.2

Shipped as [`README.md`](https://github.com/offline-agency/laravel-mongo-auto-sync/blob/88d271ad227fd47f9fbef3c6d783d96f344af9b4/README.md). Headings are shifted one level, HTML markup is reduced to text and images, repository links are kept only when their target exists at this tag, and external links verified as unreachable are shown as text.

::: v-pre
### Laravel MongoDB Relationships
[![Latest Stable Version](https://poser.pugx.org/offline-agency/laravel-mongo-auto-sync/v/stable)](https://packagist.org/packages/offline-agency/laravel-mongo-auto-sync)
[![Total Downloads](https://img.shields.io/packagist/dt/offline-agency/laravel-mongo-auto-sync.svg?style=flat-square)](https://packagist.org/packages/offline-agency/laravel-mongo-auto-sync)
[![Build Status](https://img.shields.io/github/workflow/status/offline-agency/laravel-mongo-auto-sync/CI)](https://github.com/offline-agency/laravel-mongo-auto-sync/actions)
[![MIT Licensed](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](https://github.com/offline-agency/laravel-mongo-auto-sync/blob/88d271ad227fd47f9fbef3c6d783d96f344af9b4/LICENSE.md)
[![Quality Score](https://img.shields.io/scrutinizer/g/offline-agency/laravel-mongo-auto-sync.svg?style=flat-square)](https://scrutinizer-ci.com/g/offline-agency/laravel-mongo-auto-sync)

This package provides a better support for [MongoDB](https://www.mongodb.com) relationships in [Laravel](https://laravel.com/) Projects.
At low level all CRUD operations has been handled by [jenssegers/laravel-mongodb](https://github.com/jenssegers/laravel-mongodb)

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

#### Installation

```bash
composer require offlineagency/laravel-mongo-auto-sync
```
##### Laravel version Compatibility

| Laravel     | Package     |
| ----------- | ----------- |
| 5.8.x       | 1.x         |
| 6.x         | 1.x         |
| 7.x         | &lt;Badge text="TO BE TEST" type="warning"/> 2.0-alpha.1 (Pre-release)         |

#### Documentation
You can find the documentation [here](https://docs.offlineagency.com/laravel-mongo-auto-sync/)

#### Testing
Run the tests with:
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
Please see [CONTRIBUTING](https://github.com/offline-agency/laravel-mongo-auto-sync/blob/88d271ad227fd47f9fbef3c6d783d96f344af9b4/CONTRIBUTING.md) for details.

#### Security
If you discover any security-related issues, please email support@offlineagency.com instead of using the issue tracker.

#### Credits
- [Giacomo Fabbian](https://github.com/Giacomo92)

- [All Contributors](https://github.com/offline-agency/laravel-mongo-auto-sync/graphs/contributors)

#### About us
Offline Agency is a web design agency based in Padua, Italy. You'll find an overview of our projects [on our website](https://offlineagency.it/#home).

#### License
The MIT License (MIT). Please see [License File](https://github.com/offline-agency/laravel-mongo-auto-sync/blob/88d271ad227fd47f9fbef3c6d783d96f344af9b4/LICENSE.md) for more information.
:::
