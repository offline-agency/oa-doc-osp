---
title: Redis-backed Laravel sessions — v4 · 4.1.0
description: >-
  Use Laravel Redis sessions with the session cart driver; understand the
  persistence and locking boundaries in 4.1.0.
packageVersion: 4.1.0
sourceCommit: b89d3219202703203453890e2e46467e79ad415d
permalink: /laravel-cart/v4/redis-sessions/
documentationSnapshot: true
documentationKey: v4
documentationChannel: stable
---

# Redis-backed Laravel sessions

Laravel Cart 4.1.0 has two built-in live storage drivers: `session` and `database`. Redis can store the Laravel session used by the first driver. `CART_STORAGE_DRIVER=redis` is unsupported and throws `InvalidDriverException`.

Requires PHP 8.4/8.5, BCMath and supported Laravel 12/13 dependencies:

```sh
composer require offline-agency/laravel-cart:4.1.0
```

Configure Redis connectivity and a supported Redis client in your Laravel application, then use these application environment settings:

```dotenv
SESSION_DRIVER=redis
CART_STORAGE_DRIVER=session
```

Configure `SESSION_CONNECTION` and your Redis connections as required by the app. Session driver data needs no package database tables. Deploy application configuration using your normal Laravel workflow; existing carts do not automatically migrate when you change the session backend.

## Serialize concurrent browser mutations

Laravel permits concurrent requests in a session by default. 4.1.0 stages each cart mutation, but separate requests can still overwrite session state without session blocking. For example, after implementing the application controller in [integrations](/laravel-cart/v4/integrations/):

```php
use App\Http\Controllers\CartPageController;
use Illuminate\Support\Facades\Route;

Route::post('/cart/items', [CartPageController::class, 'store'])
    ->middleware('auth')->block(10, 10);
```

Put this route in `routes/web.php` so sessions and CSRF protection run. Configure a Laravel cache lock backend supported by session blocking; backing sessions with Redis alone does not automatically enable route blocking. Apply the same locking discipline to every route that changes that session cart. Livewire mutations use Livewire's update route, so blocking a separate `/cart/items` controller route does not protect them; configure the Livewire update route in your app if you need this guarantee.

The `DemoCart` service in [integrations](/laravel-cart/v4/integrations/#trusted-server-mutation) validates the quantity and synthetic product/variant on the server and requires an authenticated customer. Continue to revalidate catalog prices, authorization, stock, tax and coupons at checkout. Redis persistence is not inventory reservation, cross-device owner storage or guest-to-user database transfer.

For a cart shared by authenticated devices, select the database live driver instead and read [storage guarantees](/laravel-cart/v4/storage/). Its package mutations lock owner/instance before reading in 4.1.0. The opt-in [guest transfer](/laravel-cart/v4/authentication/) handles database carts around login; it is distinct from moving session storage into Redis or restoring a saved snapshot.

Source: [released SessionStorage](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/src/Storage/SessionStorage.php), [provider driver selection](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/src/CartServiceProvider.php). Laravel configuration and locking guidance checked 2026-10-16 against [Laravel 13 session documentation](https://laravel.com/docs/13.x/session). Redis connectivity and framework route integration were not tested for this guide.
