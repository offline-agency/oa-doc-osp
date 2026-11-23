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
