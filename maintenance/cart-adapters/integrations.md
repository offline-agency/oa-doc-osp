---
title: Livewire and Inertia recipes
description: Minimal server actions and Vue UI scaffolding using the released Laravel Cart 4.1.0 API.
packageVersion: '4.1.0'
sourceCommit: b89d3219202703203453890e2e46467e79ad415d
---

# Livewire and Inertia recipes

These are application scaffolding and UI fragments. They use the released 4.1.0 API; they are not installed endpoints or framework integrations tested in Livewire/Inertia. Use them inside an application that already has the chosen frontend stack configured. The package requires neither stack.

Requires PHP 8.4/8.5, BCMath and supported Laravel 12/13 dependencies:

```sh
composer require offline-agency/laravel-cart:4.1.0
```

See [installation](/laravel-cart/installation/) for exact dependency floors and optional migrations. Default session carts need no package tables.

## Trusted server mutation

Place the following in `app/Services/DemoCart.php`. This deliberately small synthetic catalog has one integer product id, two equally priced variants and explicit per-unit net/VAT amounts. Its authorization policy permits every signed-in customer to buy this public catalog. In a real app, load authorized catalog records and enforce customer/product eligibility, allowed variant combinations and quantity rules here. Prices, taxes and instance names come from the server, never from the client.

```php
<?php

namespace App\Services;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use OfflineAgency\LaravelCart\Cart;
use OfflineAgency\LaravelCart\CartItem;

final class DemoCart
{
    public function __construct(private Cart $cart) {}

    public function add(array $input, string $instance = 'shopping'): CartItem
    {
        // Demo policy: every signed-in customer may buy this public catalog.
        abort_unless(Auth::check(), 401);
        abort_unless(in_array($instance, ['shopping', 'wishlist'], true), 422);
        $data = Validator::make($input, [
            'product_id' => ['required', 'integer', 'in:101'],
            'size' => ['required', 'in:M,L'],
            'qty' => ['required', 'integer', 'min:1', 'max:5'],
        ])->validate();

        // Synthetic trusted server catalog. In an app, load authorized records.
        $catalog = [101 => [
            'name' => 'Demo shirt', 'net' => 20.0, 'vat' => 4.4,
            'variants' => ['M' => true, 'L' => true],
        ]];
        $product = $catalog[(int) $data['product_id']];
        abort_unless($product['variants'][$data['size']] ?? false, 422);
        return $this->cart->instance($instance)->add([
            'id' => (int) $data['product_id'], 'name' => $product['name'],
            'qty' => (int) $data['qty'], 'price' => $product['net'],
            'totalPrice' => $product['net'] + $product['vat'],
            'vat' => $product['vat'], 'options' => ['size' => $data['size']],
        ]);
    }
}
```

`qty` is the quantity to add, not the desired final quantity. Repeated additions accumulate. The demo checks a per-request limit; configure `cart.limits.max_qty_per_item` for a cart-row cap. It does not model stock. A cart is not a reservation: revalidate catalog prices, variants, owner authorization, availability, tax and coupon eligibility at checkout, inside your application's order/inventory concurrency design.

Adding an existing row retains its stored base prices and row coupons. In 4.1.0, use explicit `update($rowId, ['price' => ...])` or a complete trusted amount update to reprice; array/Buyable repricing recalculates net/VAT/gross while retaining row coupons. Notify the customer when checkout prices change. Cart-level discounts do not allocate back into VAT buckets, and amount fields are floats.

## Minimal Livewire action and view

For an application with Livewire already installed, place this component in `app/Livewire/ShopCart.php`:

```php
<?php
namespace App\Livewire;

use App\Services\DemoCart;
use Livewire\Component;
use OfflineAgency\LaravelCart\Cart;

final class ShopCart extends Component
{
    public $productId = 101;
    public $size = 'M';
    public $qty = 1;

    public function addToCart(DemoCart $service): void
    {
        $service->add([
            'product_id' => $this->productId,
            'size' => $this->size,
            'qty' => $this->qty,
        ]);
    }

    public function render()
    {
        abort_unless(auth()->check(), 401);
        return view('livewire.shop-cart', [
            'cart' => app(Cart::class)->instance('shopping')->toArray(),
        ]);
    }
}
```

Place this view in `resources/views/livewire/shop-cart.blade.php` and render `<livewire:shop-cart />` within your application's authenticated page/layout:

```blade
<div>
    <select wire:model="size" aria-label="Size">
        <option value="M">M</option><option value="L">L</option>
    </select>
    <input type="number" min="1" max="5" wire:model="qty" aria-label="Quantity">
    <button type="button" wire:click="addToCart" wire:loading.attr="disabled">
        Add to cart
    </button>
    @error('qty') <p role="alert">{{ $message }}</p> @enderror
    @error('size') <p role="alert">{{ $message }}</p> @enderror
    @error('product_id') <p role="alert">{{ $message }}</p> @enderror
    <span wire:loading role="status">Updating…</span>
    <p>{{ $cart['count'] }} units; total {{ number_format($cart['total'], 2) }}</p>
</div>
```

Public component properties are untrusted even when the input is hidden or absent. The service validates on every action and `render()` reads fresh server totals. Add your application currency label, error handling for cart-limit failures and accessible feedback. Disabling a button improves usability; it does not serialize competing requests.

## Minimal Inertia / Vue flow

In an application with Inertia/Vue already configured, create `app/Http/Controllers/CartPageController.php`:

```php
<?php
namespace App\Http\Controllers;

use App\Services\DemoCart;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use OfflineAgency\LaravelCart\Cart;

final class CartPageController
{
    public function index(Cart $cart): Response
    {
        return Inertia::render('Cart', [
            'cart' => $cart->instance('shopping')->toArray(),
        ]);
    }

    public function store(Request $request, DemoCart $service): RedirectResponse
    {
        $service->add($request->only(['product_id', 'size', 'qty']));
        return redirect()->route('cart.index');
    }
}
```

Register authenticated application routes in `routes/web.php` so session and CSRF middleware run:

```php
use App\Http\Controllers\CartPageController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('/cart', [CartPageController::class, 'index'])->name('cart.index');
    Route::post('/cart/items', [CartPageController::class, 'store'])->block(10, 10);
});
```

The `block()` call needs a lock-capable Laravel cache configuration; see [Redis sessions and blocking](/laravel-cart/redis-sessions/). In 4.1.0, database driver package mutations already lock before reading across sessions. Inventory/checkout locks remain application work.

Create `resources/js/Pages/Cart.vue` (adapt its location to your Inertia page resolver):

```vue
<script setup>
import { useForm } from '@inertiajs/vue3'
defineProps({ cart: Object })
const form = useForm({ product_id: 101, size: 'M', qty: 1 })
function add() {
  form.post('/cart/items', { preserveScroll: true })
}
</script>
<template>
  <form @submit.prevent="add">
    <select v-model="form.size" aria-label="Size">
      <option value="M">M</option><option value="L">L</option>
    </select>
    <input v-model="form.qty" type="number" min="1" max="5" aria-label="Quantity">
    <button :disabled="form.processing">Add to cart</button>
    <p v-for="(error, field) in form.errors" :key="field" role="alert">{{ error }}</p>
  </form>
  <p>{{ cart.count }} units; total {{ cart.total }}</p>
</template>
```

The POST redirects to GET `/cart`; Inertia receives newly calculated server props. Display authoritative server amounts with your currency formatting. Do not accept browser-submitted prices or calculate the payable total in Vue. These snippets are shown as code, not mounted as VuePress components.

For JSON responses and token guards use [API/mobile resources](/laravel-cart/api-and-mobile/). For database login transitions use the opt-in [guest-transfer middleware](/laravel-cart/authentication/), introduced in 4.1.0; saved `store()`/`restore()` snapshots are separate.

Source: [canonical executable 4.1.0 example](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/examples/quick-start.php), [its two-driver tests](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/tests/Feature/DocumentationExamplesTest.php), [Cart API](https://github.com/offline-agency/laravel-cart/blob/b89d3219202703203453890e2e46467e79ad415d/src/Cart.php). The frontend scaffolding above is site-specific and has not been tested in Livewire or Inertia.
