<?php

declare(strict_types=1);

$source = realpath((string) getenv('CART_FIXTURE_RELEASE_SOURCE')) ?: throw new RuntimeException('Missing release source');
$autoload = (string) getenv('CART_VENDOR_AUTOLOAD');
$loader = require $autoload;
$loader->setPsr4('OfflineAgency\\LaravelCart\\', $source.'/src');
$loader->setPsr4('OfflineAgency\\LaravelCart\\Tests\\', $source.'/tests');
$loaded = (new ReflectionClass(OfflineAgency\LaravelCart\Cart::class))->getFileName();
if (!is_string($loaded) || !str_starts_with($loaded, $source.'/src/')) {
    throw new RuntimeException('Wrong Cart release source loaded');
}
$_ENV['APP_BASE_PATH'] = $source.'/testbench-app';
