<?php
// Usage: php run.php /absolute/vendor/autoload.php /absolute/pinned-release
$loader = require $argv[1];
$loader->setPsr4('OfflineAgency\\LaravelFattureInCloudV2\\', rtrim($argv[2], '/').'/src');
$resolved = (new ReflectionClass(OfflineAgency\LaravelFattureInCloudV2\Api\Client::class))->getFileName();
if (! str_starts_with($resolved, realpath($argv[2]).'/src/')) {
    throw new RuntimeException('Package did not load from pinned release: '.$resolved);
}
$app = new Illuminate\Container\Container();
Illuminate\Container\Container::setInstance($app);
Illuminate\Support\Facades\Facade::setFacadeApplication($app);
$app->instance('config', new Illuminate\Config\Repository(['fatture-in-cloud-v2' => [
    'baseUrl' => 'https://example.invalid/',
    'companies' => ['default' => ['id' => '123', 'bearer' => 'synthetic-token']],
]]));
$app->singleton(Illuminate\Http\Client\Factory::class);
$app->instance('validator', new Illuminate\Validation\Factory(
    new Illuminate\Translation\Translator(new Illuminate\Translation\ArrayLoader(), 'en'), $app
));
ob_start();
require __DIR__.'/quickstart.php';
$output = ob_get_clean();
$expected = "Example client\nSynthetic API failure\nLocal validation rejected missing data.name\nUpdated example\n";
if ($output !== $expected) {
    throw new RuntimeException('Unexpected quickstart output: '.$output);
}
if (Illuminate\Support\Facades\Http::recorded()->count() !== 4) {
    throw new RuntimeException('Expected four fake requests');
}
$matched = Illuminate\Support\Facades\Http::recorded(fn ($request) =>
    $request->url() === 'https://example.invalid/c/123/entities/clients/101'
    && $request->method() === 'PUT'
    && $request['data']['name'] === 'Updated example'
    && $request->hasHeader('Authorization', 'Bearer synthetic-token')
);
if ($matched->count() !== 1) {
    throw new RuntimeException('Expected synthetic authenticated edit request');
}
echo $output, "PASS: pinned-release list, API error, validation, create and edit; 4 fake requests\n";
