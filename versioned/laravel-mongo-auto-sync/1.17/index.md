---
title: "Laravel MongoDB Relationships — 1.17"
description: "Archived Laravel MongoDB Relationships 1.17 (commit a8e4d48, 2021-01-20): requirements, changes since 1.16 and the README shipped with the tag."
permalink: /laravel-mongo-auto-sync/1.17/
packageVersion: "1.17"
sourceCommit: a8e4d483be24c54eee6f1f3429448c2c6da443ba
documentationSnapshot: true
documentationArchive: generated-tag
---
# Laravel MongoDB Relationships 1.17

This archived page describes tag `1.17` of [offline-agency/laravel-mongo-auto-sync](https://github.com/offline-agency/laravel-mongo-auto-sync). It is generated from the repository at that tag: the manifest, the history since the previous tag and the README shipped with the release. It is not a reviewed guide; read the [current documentation](/laravel-mongo-auto-sync/) for the maintained release (3.1.1).

## Release

| Fact | Value |
| --- | --- |
| Tag | [1.17](https://github.com/offline-agency/laravel-mongo-auto-sync/releases/tag/1.17) |
| Commit | [`a8e4d483be24c54eee6f1f3429448c2c6da443ba`](https://github.com/offline-agency/laravel-mongo-auto-sync/tree/a8e4d483be24c54eee6f1f3429448c2c6da443ba) |
| Commit date | 2021-01-20 |
| Composer package | `offline-agency/laravel-mongo-auto-sync` |
| Packagist | Version `1.17`, source reference matches this commit (checked 2026-11-23) |
| Declared license | MIT |

## Requirements

Declared in `composer.json` `require`:

- `php`: `>=7.1`
- `ext-json`: `*`
- `ext-mongodb`: `*`
- `illuminate/support`: `^5.8|^6.0`
- `illuminate/container`: `^5.8|^6.0`
- `illuminate/database`: `^5.8|^6.0`
- `illuminate/events`: `^5.8|^6.0`
- `jenssegers/mongodb`: `3.6.7`

## Changes since 1.16

[Compare 1.16...1.17 on GitHub](https://github.com/offline-agency/laravel-mongo-auto-sync/compare/1.16...1.17).

65 non-merge commits and 40 changed files.

Commits:

- `bc1de23` Apply fixes from StyleCI
- `9e5b3d2` fix: missing parameter on deleteTargetObject
- `5d073d6` feat: add test on update old target
- `20adefb` fix: add nullable typo for target\_id
- `3fb2ba1` fix: remove TODO from comments
- `3f622f1` feat: add assert on target partial update
- `cea31d6` feat: add new update tests
- `aef6a03` fix: deletetarget error add more type hint
- `9cb0a17` Apply fixes from StyleCI
- `f809810` refactor: remove processList function from package
- `33a5857` fix:missing Datetime import
- `219c9e5` feat: add more tests
- `c2d680a` Apply fixes from StyleCI
- `71dc4c8` fix: test\_update\_with\_partial\_request\_plain\_field
- `53e549f` revert: attribute doc parameters on ml function
- `0f49b31` feat: add parameters doc on ml functions
- `acf113d` feat: add phunit cache file to gitignore
- `97f9cad` Update MainMongoTrait.php
- `2b3e1e7` Apply fixes from StyleCI
- `7e73af5` \[GF\] Added more traits
- `2a76274` Update build-ci.yml
- `9b6e463` Update composer.json
- `fc77bf5` Update build-ci.yml
- `cae2fff` Fix scrutinizer configuration (#32)
- `21831a6` Added codacy
- `bdd8626` Update syncUtils.php
- `f2a2fd3` Apply fixes from StyleCI
- `07a1349` \[GF\] Added test, fix typo, fix embeds one on target save
- `4641bb2` Update README.md
- `2f2951f` Update README.md
- `13acf1a` Create FUNDING.yml
- `6fc19a9` Apply fixes from StyleCI
- `fc0e8b3` \[GF\] Removed tests
- `327578e` \[GF\] First commit
- `1ca866d` Apply fixes from StyleCI
- `692558e` \[GF\] Skipped some tests
- `4ab78ca` Apply fixes from StyleCI
- `83bb997` \[GF\] Update tests
- `3f60198` Apply fixes from StyleCI
- `17cca9f` \[GF\] Update tests
- …and 25 more (see the comparison)

Changed files:

- added `.codacy.yml`
- added `.github/FUNDING.yml`
- modified `.github/workflows/build-ci.yml`
- modified `.gitignore`
- added `.scrutinizer.yml`
- added `Docker`
- modified `README.md`
- modified `composer.json`
- added `config/laravel-mongo-auto-sync.php`
- added `docker-compose.yml`
- modified `phpunit.xml`
- added `src/Console/DropCollection.php`
- added `src/Console/GenerateModelDocumentation.php`
- modified `src/Http/Models/DefaultGeo.php`
- modified `src/Http/Models/MDModel.php`
- added `src/MongoAutoSyncServiceProvider.php`
- deleted `src/Providers/ServiceProvider.php`
- added `src/Traits/MainMongoTrait.php`
- modified `src/Traits/ModelAdditionalMethod.php`
- deleted `src/Traits/MongoSyncTrait.php`
- added `src/Traits/PlainMongoTrait.php`
- added `src/Traits/RelationshipMongoTrait.php`
- modified `src/syncUtils.php`
- added `tests/DropCollectionTest.php`
- added `tests/GenerateModelDocumentationTest.php`
- added `tests/Models/Article.php`
- added `tests/Models/Item.php`
- added `tests/Models/MiniItem.php`
- added `tests/Models/MiniNavigation.php`
- added `tests/Models/MiniSubItem.php`
- added `tests/Models/Navigation.php`
- added `tests/Models/SubItem.php`
- added `tests/MongoSyncTraitTest.php`
- added `tests/StoreWIthSyncTest.php`
- added `tests/SyncTestCase.php`
- modified `tests/TestCase.php`
- added `tests/UpdateWithSyncTest.php`
- added `tests/config/database.php`
- added `tests/config/queue.php`
- added `tests/factories/ArticleFactory.php`

## README at 1.17

Shipped as [`README.md`](https://github.com/offline-agency/laravel-mongo-auto-sync/blob/a8e4d483be24c54eee6f1f3429448c2c6da443ba/README.md). Headings are shifted one level, HTML markup is reduced to text and images, repository links are kept only when their target exists at this tag, and external links verified as unreachable are shown as text.

::: v-pre
### Laravel MongoDB Relationships
[![Latest Stable Version](https://poser.pugx.org/offline-agency/laravel-mongo-auto-sync/v/stable)](https://packagist.org/packages/offline-agency/laravel-mongo-auto-sync)
[![Total Downloads](https://img.shields.io/packagist/dt/offline-agency/laravel-mongo-auto-sync.svg?style=flat-square)](https://packagist.org/packages/offline-agency/laravel-mongo-auto-sync)
[![Build Status](https://img.shields.io/github/workflow/status/offline-agency/laravel-mongo-auto-sync/CI)](https://github.com/offline-agency/laravel-mongo-auto-sync/actions)
[![MIT Licensed](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](https://github.com/offline-agency/laravel-mongo-auto-sync/blob/a8e4d483be24c54eee6f1f3429448c2c6da443ba/LICENSE.md)
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
Please see [CONTRIBUTING](https://github.com/offline-agency/laravel-mongo-auto-sync/blob/a8e4d483be24c54eee6f1f3429448c2c6da443ba/CONTRIBUTING.md) for details.

#### Security
If you discover any security-related issues, please email support@offlineagency.com instead of using the issue tracker.

#### Credits
- [Giacomo Fabbian](https://github.com/Giacomo92)

- [All Contributors](https://github.com/offline-agency/laravel-mongo-auto-sync/graphs/contributors)

#### About us
Offline Agency is a web design agency based in Padua, Italy. You'll find an overview of our projects [on our website](https://offlineagency.it/#home).

#### License
The MIT License (MIT). Please see [License File](https://github.com/offline-agency/laravel-mongo-auto-sync/blob/a8e4d483be24c54eee6f1f3429448c2c6da443ba/LICENSE.md) for more information.
:::
