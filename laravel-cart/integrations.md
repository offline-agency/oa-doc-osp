---
title: "API, Livewire and Inertia recipes"
description: "Released Laravel Cart 4.0.3: api, livewire and inertia recipes."
permalink: /laravel-cart/integrations/
packageVersion: "4.0.3"
cartRelease: "4.0.3"
sourceCommit: 60eb1006c9c2b31ff50cebd7b8b677a1dd16cc16
---

# API, Livewire and Inertia recipes

These are **application scaffolding / UI fragments** based on the 4.0.3 public API. They are not complete upstream recipes, installed endpoints or browser-tested integrations. Adapt model fields, authorization and tax policy to your app. No frontend framework is required by Laravel Cart.

## Trusted server mutation and JSON response

A minimal action for an application `Product` model with equally priced size variants, net `price`, per-unit VAT amount `vat`, name and saleability fields. Its application-defined `purchase` policy must reject unauthorized customers, invalid product/size combinations and unavailable quantities:

```php
use App\Models\Product;
use Illuminate\Http\Request;
use OfflineAgency\LaravelCart\Facades\Cart;
use OfflineAgency\LaravelCart\Resources\CartResource;

public function store(Request $request): CartResource
{
    $data = $request->validate([
        'product_id' => ['required', 'integer'],
        'qty' => ['required', 'integer', 'min:1', 'max:20'],
        'size' => ['required', 'in:S,M,L'],
    ]);
    $product = Product::query()->findOrFail($data['product_id']);
    $this->authorize('purchase', [$product, $data['size'], $data['qty']]);
    abort_unless($product->is_sellable, 422);
    // The policy above validates this product's variant and available quantity.
    // Recheck catalog/stock at checkout too; adding to the cart reserves no stock.
    $cart = Cart::instance('shopping');
    $cart->add([
        'id' => $product->getKey(), 'name' => $product->name,
        'qty' => $data['qty'], 'price' => (float) $product->price,
        'vat' => (float) $product->vat,
        'options' => ['size' => $data['size']],
    ]);
    return new CartResource($cart);
}
```

The surrounding controller supplies Laravel's authorization trait. The field/policy names are application choices. Do not accept price, VAT, coupon value or user ID from the browser. An update/remove action must resolve a row from the current authorized cart, validate the requested quantity and recheck catalog eligibility. Revalidate all final checkout state inside your application transaction/locking design.

For session-backed actions, register routes in the `web` group and serialize mutations with Laravel session blocking using a lock-capable session backend. Database-owner mutations across devices need a common owner-level application lock in 4.0.3; session blocking alone does not serialize different sessions.

## API resources and mobile carts

`OfflineAgency\LaravelCart\Resources\CartResource` wraps a Cart; `CartItemResource` wraps a CartItem. CartResource exposes `instance`, `items`, `count`, `uniqueCount`, `subtotal`, `vat`, `total`, `discount`, `coupons`, `meta`, `isEmpty`. It delegates to `toArray()`; default Laravel resource wrapping depends on your application's JsonResource configuration.

For authenticated mobile APIs, protect routes with your configured token guard and rate limiting, select the authenticated owner before using database storage, and serialize competing owner mutations. No public UUID in a payload should grant access to another cart. Only return catalog/customer data the client may see. The package does not ship API routes, token authentication or a checkout controller.

## Livewire actions

Application fragment for a component whose `addToCart()` calls your validated server action/service from the previous recipe:

```blade
<button type="button" wire:click="addToCart" wire:loading.attr="disabled">
    Add to cart
</button>
<span wire:loading role="status">Updating cart…</span>
```

Treat public component properties as untrusted input. Validate product/variant/quantity inside every action, authorize on the server, select `shopping` explicitly, then refresh displayed data from the CartResource/array. Disable duplicate submissions for usability, but enforce consistency on the server. This fragment has not been executed in a Livewire application by this docs change.

## Inertia / Vue flow

Inertia controller application fragment:

```php
return \Inertia\Inertia::render('Cart', [
    'cart' => Cart::instance('shopping')->toArray(),
]);
```

Vue application fragment (route `/cart/items` is an app route you must implement):

```vue
<script setup>
import { router } from '@inertiajs/vue3'
const props = defineProps({ productId: Number })
function add() {
  router.post('/cart/items', { product_id: props.productId, qty: 1, size: 'M' })
}
</script>
<template><button type="button" @click="add">Add to cart</button></template>
```

Use a validated mutation endpoint and redirect back with freshly calculated server props according to Inertia's normal response flow. Handle validation errors and pending state in the UI. Do not calculate authoritative totals on the client. This fragment has not been executed in an Inertia application; upstream end-to-end recipes remain follow-up work.

## Redis sessions

Redis can back Laravel sessions and session locks while `CART_STORAGE_DRIVER=session`. It is not a third built-in cart driver. See [storage and concurrency](/laravel-cart/storage/).


---

Source contract: [released 4.0.3 at `60eb100`](https://github.com/offline-agency/laravel-cart/tree/60eb1006c9c2b31ff50cebd7b8b677a1dd16cc16). [Stable overview](/laravel-cart/) · [Unreleased preview](https://github.com/offline-agency/laravel-cart/pull/50) · [Historical site](/laravel-cart/legacy/).
