<?php

// External dependencies are deliberately not vendored into the documentation site.
$autoload = getenv('CART_RECIPE_AUTOLOAD');
$source = getenv('CART_RECIPE_SOURCE');
if (!$autoload || !$source) {
    throw new RuntimeException('Set CART_RECIPE_AUTOLOAD and CART_RECIPE_SOURCE (extracted release source).');
}
require $autoload;
spl_autoload_register(function (string $class) use ($source): void {
    $prefix = 'OfflineAgency\\LaravelCart\\';
    if (str_starts_with($class, $prefix)) {
        $path = $source.'/src/'.str_replace('\\', '/', substr($class, strlen($prefix))).'.php';
        if (is_file($path)) {
            require $path;
        }
    }
}, true, true);
require __DIR__.'/DemoCart.php';
