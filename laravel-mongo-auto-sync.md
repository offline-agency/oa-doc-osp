---
title: Laravel MongoDB Relationships
description: Configure legacy MongoDB embedded relationship synchronization with Laravel Mongo Auto Sync 3.1.1.
meta:
  - name: description
    content: Configure legacy MongoDB embedded relationship synchronization with Laravel Mongo Auto Sync 3.1.1.
gitName: laravel-mongo-auto-sync
packageVersion: '3.1.1'
sourceCommit: 487a622ab48017f8839f4b90a0844d5c8fcbae7f
---

# Laravel MongoDB Relationships

`offline-agency/laravel-mongo-auto-sync` adds explicit CRUD methods for synchronizing configured embedded copies between MongoDB documents. This guide describes published [3.1.1](https://github.com/offline-agency/laravel-mongo-auto-sync/releases/tag/3.1.1), checked against its [released source](https://github.com/offline-agency/laravel-mongo-auto-sync/tree/487a622ab48017f8839f4b90a0844d5c8fcbae7f) and [Packagist distribution](https://packagist.org/packages/offline-agency/laravel-mongo-auto-sync) on 16 October 2026.

::: warning Legacy integration
The stable release uses `Jenssegers\Mongodb\Eloquent\Model` and Illuminate 5–8 constraints. It is not a Laravel 12/13 integration. Development proposals, including a possible 4.x API, are not part of this release.
:::

## Installation

### Prerequisites

Install the [MongoDB PHP extension](https://www.php.net/manual/en/mongodb.installation.php), JSON support and a MongoDB server accessible from your application. Use an isolated development database for the examples.

### Package version Compatibility

These are the constraints in the released `composer.json`, rather than a tested combination matrix:

| Dependency | Declared requirement in 3.1.1 |
| --- | --- |
| PHP | `>=7.4` |
| Extensions | `ext-json`, `ext-mongodb` |
| Illuminate Support, Container, Database, Events | `^5.0|^6.0|^7.0|^8.0` |
| `jenssegers/mongodb` | `^3.6|^3.7|^3.8` |

### PHP Version Compatibility

A PHP lower bound does not ensure that every newer PHP runtime can resolve and run the legacy dependency stack. The checked workflow defines PHP 7.4, 8.0 and 8.1 against MongoDB 3.6, 4.0, 4.2, 5.0, 6.0 and 7.0. Current passing results for that matrix were not verified. No PHP 8.5 database execution was performed for this documentation.

Install the exact documented release in a compatible application:

```bash
composer require offline-agency/laravel-mongo-auto-sync:3.1.1
```

The Composer vendor name contains a hyphen: `offline-agency`. Laravel discovers the service provider automatically.

## Features

The implemented synchronization paths cover `EmbedsOne` and `EmbedsMany`. You describe scalar fields in `$items`, embedded fields in `$mongoRelation`, and explicitly call `storeWithSync()`, `updateWithSync()` or `destroyWithSync()`. Ordinary `save()` calls do not acquire the package's synchronization workflow.

<a id="example-without-our-package"></a>
Without synchronization, changing a source document leaves manually duplicated embedded fields to application code.

<a id="example-with-our-package"></a>
With configured target relationships, these methods write the current document and update selected embedded copies on related documents. These are sequential writes: they do not provide atomic cross-collection updates, foreign-key enforcement or a general cascade-delete guarantee. An exception can leave earlier writes applied.

## Use cases

The package targets applications that deliberately duplicate selected fields to make reads simpler, such as articles containing category summaries and categories containing article summaries. Consider the write cost and repair strategy for those copies before adopting it.

### Before starting

Configure a connection named `mongodb` in your application's `config/database.php`; `MDModel` selects that connection by default. For example, merge this connection into the existing configuration:

```php
return [
    'connections' => [
        'mongodb' => [
            'driver' => 'mongodb',
            'host' => env('MONGO_HOST', '127.0.0.1'),
            'port' => (int) env('MONGO_PORT', 27017),
            'database' => env('MONGO_DATABASE', 'mongo_sync_example'),
        ],
    ],
];
```

This is application connection configuration. The environment names above are conventions chosen by your application, not package-specific settings. Configure authentication and connection options as required by your MongoDB server and the installed Jenssegers driver.

## Model setup

Extend `OfflineAgency\MongoAutoSync\Http\Models\MDModel`, which extends the legacy Jenssegers model. The following minimal model has no relationships, so it demonstrates the CRUD contract without requiring counterpart collections. Save it as `app/Models/Article.php`:

```php
namespace App\Models;

use OfflineAgency\MongoAutoSync\Http\Models\MDModel;

class Article extends MDModel
{
    protected $collection = 'articles';

    protected $items = [
        'title' => [],
        'code' => ['is-editable' => false],
    ];

    protected $mongoRelation = [];
}
```

### Fields

Each `$items` key names a request field. Values are option arrays. Validate and authorize incoming data before invoking the package; the options do not replace Laravel validation.

#### Field Types

| Option | Behavior observed in 3.1.1 |
| --- | --- |
| No flag (`[]`) | Assign the incoming value without a special cast |
| `is-ml` | Merge the incoming value under `config('app.locale')` |
| `is-md` | Convert a date string to `MongoDB\BSON\UTCDateTime`; empty/null becomes null |
| `is-editable` | Default true; false skips assignment on update, while creation still assigns |
| `is-array` | Used when building target mini-model values; null becomes an empty array |
| `is-carbon-date` | Used when building target mini-model date values |

<a id="array-is-array"></a>
`is-array` is not a general validation/casting rule for ordinary `$items`: the plain-field writer only branches on `is-ml` and `is-md`.

<a id="date"></a>
Date handling differs between plain fields and generated mini-models; use the flags only on the path for which they are implemented.

<a id="multi-language-is-ml"></a>
Multilingual values use the configured application locale as their array key; the package does not translate text.

<a id="editable-is-editable"></a>
A non-editable field can still be required in a full update request: request presence is checked before editability. Use an explicit partial request when omitting it.

<a id="default"></a>
An empty option array means pass-through assignment, not a default value.

<a id="boolean"></a>
<a id="double"></a>
<a id="geojson-objects"></a>
<a id="int"></a>
<a id="slug"></a>
<a id="string"></a>
<a id="default-value"></a>
Dedicated boolean, double, GeoJSON, integer, slug, string and default-value field features advertised as TODO in older documentation are not implemented as general field flags. Prepare and validate those values in application code.

### Relationship

Mini-models describe the fields embedded into a parent. Extend `DefaultMini` for the conventional `ref_id` primary key and declare its `$items`. In a relationship with targets, `ref_id` identifies an existing target document; it does not create the target automatically.

This is the shape of a targeted relationship configuration, based on the release's [Article and Category test models](https://github.com/offline-agency/laravel-mongo-auto-sync/tree/487a622ab48017f8839f4b90a0844d5c8fcbae7f/tests/Models). It is an extension to a fully configured model pair, not a standalone model:

```php
class Article extends \OfflineAgency\MongoAutoSync\Http\Models\MDModel
{
    protected $items = ['title' => []];

    protected $mongoRelation = [
        'categories' => [
            'type' => 'EmbedsMany',
            'model' => 'App\Models\MiniCategory',
            'modelTarget' => 'App\Models\Category',
            'methodOnTarget' => 'articles',
            'modelOnTarget' => 'App\Models\MiniArticle',
            'typeOnTarget' => 'EmbedsMany',
        ],
    ];

    public function categories()
    {
        return $this->embedsMany('App\Models\MiniCategory');
    }
}
```

| Key | Meaning |
| --- | --- |
| Relationship array key | Embedded attribute/method on the current model |
| `type` | `EmbedsOne` or `EmbedsMany` |
| `model` | Mini-model embedded into the current document |
| `has-target` | Defaults to true; set false for an embed without target synchronization |
| `modelTarget` | Model class used to find related documents by `ref_id` |
| `methodOnTarget` | Embedded attribute/method to update on that target |
| `modelOnTarget` | Mini-model representing the current document inside the target |
| `typeOnTarget` | Target embed type; defaults to `EmbedsMany` |

Declare matching `embedsOne()`/`embedsMany()` methods so embedded data is returned as models. Initialize target embed attributes and provide every field declared by the relevant mini-model. The target writer rejects missing/uninitialized attributes in some paths; a missing target document is skipped. `mode` does not control synchronization in this implementation.

`HasOne` and `HasMany` synchronization branches remain TODO. Nested target propagation beyond one level is also TODO. For target `EmbedsOne`, the delete helper explicitly does nothing; do not assume deleting a source clears every inverse single embed.

## Operations

### Store

<a id="usage"></a>
Run the following application code against your development connection after creating the minimal `Article` model above:

```php
use App\Models\Article;
use Illuminate\Http\Request;

$article = (new Article)->storeWithSync(new Request([
    'title' => 'First article',
    'code' => 'article-001',
]));

if ($article === null) {
    throw new \RuntimeException('The stored article could not be reloaded.');
}

$id = $article->id;
```

The signatures are `storeWithSync(Request $request, array $additionalData = [], array $options = [], array $target_additional_data = [])` and the same arguments for `updateWithSync()`. Additional data is merged into the supplied request, overriding matching request keys; it is still processed through model configuration. The fourth argument can override fields used to generate target mini-models, keyed by their class name. Store and update return `fresh()` (a reloaded model or `null`), rather than a boolean.

#### Store Relationships

Relationship request fields contain JSON strings encoding an **array of objects**, including for `EmbedsOne`. Every object must include the fields expected by its mini-model. A typical `EmbedsMany` value is:

```json
[{"ref_id":"existing-category-id","name":"News"}]
```

Encode with `json_encode()` before adding the field to an Illuminate request. Define all participating classes/configuration first; copying this payload into the relation-free quickstart does not create a relationship.

### Update

<a id="usage-2"></a>
<a id="field"></a>
Full requests require declared fields to be present. For the model above, use the saved ID to reload it and supply a partial request:

#### Update With Partial Request

```php
$article = \App\Models\Article::findOrFail($id);
$article = $article->updateWithSync(
    new \Illuminate\Http\Request(['title' => 'Revised article']),
    [],
    ['request_type' => 'partial']
);

if ($article === null) {
    throw new \RuntimeException('The updated article could not be reloaded.');
}
```

The option is exactly `request_type => partial`. Absent scalar fields are skipped. This is not a blanket suppression of errors or relationship processing.

<a id="update-a-relationships"></a>
For relationships, absent values are skipped only when there is no target (`has-target => false`). Targeted relationships may still be processed from generated request data containing existing references, so changed scalar data can propagate to target mini-models. Explicit relationship updates can replace current embeds and remove/rebuild target entries. Review [the partial-update tests](https://github.com/offline-agency/laravel-mongo-auto-sync/blob/487a622ab48017f8839f4b90a0844d5c8fcbae7f/tests/UpdateWithSyncTest.php) for the configured relationship patterns before using this on existing collections.

### Destroy

<a id="usage-3"></a>
Delete only the development record created in the example:

```php
$article = \App\Models\Article::findOrFail($id);
$deletedArticle = $article->destroyWithSync();
```

`destroyWithSync()` attempts configured target cleanup, deletes the current record, and returns that deleted instance. It does not return a count. Its cleanup scope is the configured relationships, with the target `EmbedsOne` limitation described above.

## Utilities

The provider merges `config/laravel-mongo-auto-sync.php` under the `laravel-mongo-auto-sync` key. It registers **no publish tag**. To override model discovery, create that configuration file in your application manually:

```php
return [
    'model_path' => app_path('Models'),
    'model_namespace' => 'App\Models',
    'other_models' => [
        'user' => [
            'model_path' => app_path(),
            'model_namespace' => 'App',
        ],
    ],
];
```

#### Generate Model Documentation

```bash
php artisan model-doc:generate Article
```

The command prints a PHPDoc block derived from `$items` and `$mongoRelation`; it does not edit your model. Discovery uses the configured paths/namespaces and can throw when a model cannot be found.

#### Drop Collection

The registered signature is `drop:collection {collection_name}`. `php artisan drop:collection Article` loads all matching model records and invokes `destroyWithSync()` on each. This deletes data and can modify configured target documents; it does not simply drop the underlying MongoDB collection. It is not part of the quickstart.

<a id="check-db-consistency"></a>
A database-consistency checker is not implemented in this release.

## Historical demo

The [Laravel MongoDB blog demo](https://github.com/offline-agency/laravel-mongodb-blog/tree/802f653ed4bbd9fdf33d5ff482fb56b961d12a97) is historical reference material. Its checked `master` commit is `802f653ed4bbd9fdf33d5ff482fb56b961d12a97`; no GitHub release was found. Its manifest requires PHP `^7.2`, Laravel `^6.20` and Mongo Auto Sync `^1.0`. It is not a current quickstart for 3.1.1, and it has not been upgraded or executed here.

<a id="roadmap"></a>
Proposed work in [PR #40](https://github.com/offline-agency/laravel-mongo-auto-sync/pull/40), [PR #99](https://github.com/offline-agency/laravel-mongo-auto-sync/pull/99) and [PR #100](https://github.com/offline-agency/laravel-mongo-auto-sync/pull/100) was open when checked. It does not establish released support for new Laravel versions or a published 4.x API.

## Verification

PHP examples were syntax-checked and compared with the released methods and tests. A compatible legacy runtime/dependency/database fixture was unavailable locally, so these CRUD examples and the upstream suite were not executed against MongoDB. No database performance, atomicity or passing CI claim is made.

## Questions & issues

Use [GitHub issues](https://github.com/offline-agency/laravel-mongo-auto-sync/issues) for package questions. Report security issues privately to support@offlineagency.com.

## About Us

[Offline Agency](https://offlineagency.it) maintains the package with its [contributors](https://github.com/offline-agency/laravel-mongo-auto-sync/graphs/contributors). The released package uses the [MIT license](https://github.com/offline-agency/laravel-mongo-auto-sync/blob/487a622ab48017f8839f4b90a0844d5c8fcbae7f/LICENSE.md).
