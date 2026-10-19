---
title: API resources and mobile carts — v4 · 4.1.0
description: >-
  Authenticated owner selection, trusted catalog mutations and JSON resources in
  Laravel Cart 4.1.0.
packageVersion: 4.1.0
sourceCommit: b89d3219202703203453890e2e46467e79ad415d
permalink: /laravel-cart/v4/api-and-mobile/
documentationSnapshot: true
documentationKey: v4
documentationChannel: stable
---

# API resources and mobile carts

Requires PHP 8.4/8.5, BCMath and supported Laravel 12/13 dependencies; start with:

```sh
composer require offline-agency/laravel-cart:4.1.0
```

For token-authenticated devices, use the database live driver and [publish its migrations](/laravel-cart/v4/installation/). Set `CART_STORAGE_DRIVER=database`. The package resolves the owner with Laravel's active `auth()->id()`; configure your token middleware/guard so that this is the same authenticated user as `$request->user()`. There is no package method for selecting an arbitrary user's live cart from a request payload.

## Application endpoint scaffolding

Reuse the complete `App\Services\DemoCart` service from [the integration recipe](/laravel-cart/v4/integrations/#trusted-server-mutation). Its synthetic catalog permits any signed-in customer to buy product 101 in M/L; replace that rule with your application's catalog authorization. It validates integer quantity, product id and permitted variant and ignores submitted amounts. This controller is an application file, not an endpoint installed by the package:

```php
<?php
namespace App\Http\Controllers;

use App\Services\DemoCart;
use Illuminate\Http\Request;
use OfflineAgency\LaravelCart\Cart;
use OfflineAgency\LaravelCart\Resources\CartResource;

final class CartApiController
{
    public function show(Request $request, Cart $cart): CartResource
    {
        abort_unless($request->user(), 401);
        return new CartResource($cart->instance('shopping'));
    }

    public function store(Request $request, DemoCart $service, Cart $cart): CartResource
    {
        abort_unless($request->user(), 401);
        $service->add($request->only(['product_id', 'size', 'qty']));
        return new CartResource($cart->instance('shopping'));
    }
}
```

Application routes in `routes/api.php`, assuming the app has installed/configured Sanctum and enabled API routing:

```php
use App\Http\Controllers\CartApiController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum', 'throttle:60,1'])->group(function () {
    Route::get('/cart', [CartApiController::class, 'show']);
    Route::post('/cart/items', [CartApiController::class, 'store']);
});
```

With Laravel's normal API prefix, the client posts `{ "product_id": 101, "size": "M", "qty": 1 }` to `/api/cart/items`, using its authenticated bearer token and `Accept: application/json`. The returned resource contains fresh server totals. Configure token issuance/revocation in your app; the package supplies no token guard or mobile SDK. These routes have not been exercised in a mobile application.

For update/remove, accept a row id and resolve it only through `Cart::instance('shopping')->get($rowId)` under the authenticated owner. Revalidate the requested quantity and current catalog/variant before `update()`; never interpret a row id, cart UUID or snapshot identifier as authorization. Authorize `store($identifier)`/`restore($identifier)` identifiers separately if exposing saved snapshots.

## Response and checkout boundaries

`CartResource` delegates to `Cart::toArray()`: `instance`, `items`, `count`, `uniqueCount`, `subtotal`, `vat`, `total`, `discount`, `coupons`, `meta`, `isEmpty`. `CartItemResource` wraps an individual row. Laravel's configured resource wrapping determines whether an outer `data` key appears. Filter sensitive catalog/options/metadata through an application resource when needed; the stock resource is serialization, not a visibility policy.

4.1.0 database package mutations lock the owner/instance before reading and persist their candidate state atomically. This protects accepted package mutations across device sessions, but does not reserve stock or make your inventory/payment workflow atomic. Session blocking applies to a shared browser session, not independently authenticated mobile sessions. Recheck current authorization, prices, stock, variants, taxes and coupons when creating the order; return a review/reprice response when anything changes. Cart-level discounts are not allocated into VAT buckets, and amount fields are floats.

Source: [owner resolution](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/src/Storage/DatabaseStorage.php), [CartResource](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/src/Resources/CartResource.php), [canonical executed example and resource assertion](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/tests/Feature/DocumentationExamplesTest.php).
