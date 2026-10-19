<?php
// Usage: php verify.php /path/to/isolated/vendor/autoload.php /path/to/released/source
require $argv[1];
$source = $argv[2];
spl_autoload_register(function ($class) use ($source) {
    $prefix = 'OfflineAgency\\LaravelBankOfItaly\\';
    if (str_starts_with($class, $prefix)) {
        require $source.'/src/'.str_replace('\\', '/', substr($class, strlen($prefix))).'.php';
    }
});
use Carbon\Carbon;
use Illuminate\Container\Container;
use Illuminate\Config\Repository;
use Illuminate\Http\Client\Factory;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Facade;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\MessageBag;
use Illuminate\Translation\ArrayLoader;
use Illuminate\Translation\Translator;
use Illuminate\Validation\Factory as ValidatorFactory;
use OfflineAgency\LaravelBankOfItaly\Api\ExchangeRate;
use OfflineAgency\LaravelBankOfItaly\Entities\Error;
use OfflineAgency\LaravelBankOfItaly\Entities\ExchangeRate\ExchangeRates;

$app = new Container;
Container::setInstance($app);
Facade::setFacadeApplication($app);
$app->instance('config', new Repository(['bank-of-italy' => require $source.'/config/bank-of-italy.php']));
$app->instance('validator', new ValidatorFactory(new Translator(new ArrayLoader, 'en'), $app));
function config($key) { return Container::getInstance()->make('config')->get($key); }
$checks = [];
function check($condition, $label) {
    global $checks;
    if (!$condition) { throw new RuntimeException($label); }
    $checks[] = $label;
}
function fakeResponse($body, $status = 200) {
    Http::swap(new Factory);
    Http::fake(['*' => Http::response($body, $status)]);
}
Carbon::setTestNow(Carbon::parse('2026-10-16 12:00:00', 'Europe/Rome'));
$csv = "currency,currencyIsoCode,currencyUicCode,rate,rateConvention,referenceDate\nSynthetic dollar,USD,001,1.2345,synthetic units per base unit,2026-10-15\n";
$api = new ExchangeRate;
fakeResponse($csv);
$result = $api->getExchangeRates();
check($result instanceof ExchangeRates, 'success entity');
check(count($result->getItems()) === 1, 'one synthetic row');
check($result->getItems()[0]->rate === '1.2345', 'rate remains string');
check($result->getItems()[0]->referenceDate === '2026-10-15', 'date passed through');
check(count(Http::recorded(fn ($r) => $r->method() === 'GET' && $r['lang'] === 'it' && $r['baseCurrencyIsoCode'] === 'USD' && $r['currencyIsoCode'] === 'EUR' && $r['startDate'] === '2025-10-16' && $r['endDate'] === '2026-10-16')) === 1, 'default query captured');
check(true, 'configured defaults and rolling dates');
fakeResponse($csv);
$api->getExchangeRates(['lang'=>'en', 'baseCurrencyIsoCode'=>'GBP', 'currencyIsoCode'=>'USD', 'startDate'=>'2026-01-02', 'endDate'=>'2026-01-01', 'ignored'=>'value']);
check(count(Http::recorded(fn ($r) => $r['lang'] === 'en' && $r['baseCurrencyIsoCode'] === 'GBP' && $r['startDate'] === '2026-01-02' && $r['endDate'] === '2026-01-01' && !isset($r['ignored']) && !isset($r['startYear']))) === 1, 'custom query captured');
check(true, 'overrides, unknown-key filtering and no date-order validation');
fakeResponse($csv);
$result = $api->getExchangeRates(['lang'=>[], 'baseCurrencyIsoCode'=>[], 'currencyIsoCode'=>'GBP', 'startDate'=>'01-01-2000', 'endDate'=>'bad']);
check($result instanceof MessageBag && count($result->messages()) === 5, 'five validation errors');
check(count(Http::recorded()) === 0, 'no requests recorded');
check(true, 'validation prevents HTTP');
fakeResponse('synthetic unavailable', 503);
$result = $api->getExchangeRates();
check($result instanceof Error && $result->getError() === 'synthetic unavailable', 'non-200 raw body error');
check(count(Http::recorded()) === 1, 'one request recorded');
check(true, 'one request without package retry');
fakeResponse('', 204);
check($api->getExchangeRates() instanceof Error, '204 also error');
fakeResponse('{"rates":[{"rate":"1.23"}]}');
check($api->getExchangeRates()->getItems() === [], '200 JSON silently yields empty collection');
$parsed = new ExchangeRates("header\nshort,row\n\nA,USD,001,2.50,units,date,extra\n");
check(count($parsed->getItems()) === 1 && $parsed->getItems()[0]->referenceDate === 'date', 'short rows skipped, extra columns ignored');
$parsed->setItems("header\nB,EUR,002,3.00,units,raw-date\n");
check(count($parsed->getItems()) === 1 && $parsed->getItems()[0]->currency === 'B', 'setItems replaces collection');
fakeResponse($csv);
$api->getExchangeRates(['lang'=>null, 'baseCurrencyIsoCode'=>null, 'currencyIsoCode'=>null, 'startDate'=>null, 'endDate'=>null]);
check(count(Http::recorded(fn ($r) => $r['startDate'] === '2025-10-16' && !isset($r['lang']) && !isset($r['baseCurrencyIsoCode']))) === 1, 'nullable query captured');
check(true, 'nullable dates default; nullable currencies do not restore defaults');
Http::swap(new Factory);
Http::fake(['*' => function () { throw new ConnectionException('synthetic transport failure'); }]);
try { $api->getExchangeRates(); throw new RuntimeException('missing connection exception'); }
catch (ConnectionException $e) { check($e->getMessage() === 'synthetic transport failure', 'connection exception propagates'); }
Carbon::setTestNow();
$versions = [];
foreach (['illuminate/http','illuminate/support','illuminate/container','illuminate/validation','guzzlehttp/guzzle','nesbot/carbon'] as $package) {
    $versions[$package] = Composer\InstalledVersions::getPrettyVersion($package);
}
echo json_encode(['php'=>PHP_VERSION, 'dependencies'=>$versions, 'network'=>'HTTP fakes only', 'checks'=>count($checks), 'passed'=>$checks], JSON_PRETTY_PRINT|JSON_UNESCAPED_SLASHES)."\n";
