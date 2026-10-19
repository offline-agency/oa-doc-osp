<?php
// Offline fixture: no OIDC client, HTTP, login or persistent database.
declare(strict_types=1);
$source = getenv('SPID_SOURCE');
$autoload = getenv('LARAVEL_AUTOLOAD');
if (!$source || !$autoload) { throw new RuntimeException('Set SPID_SOURCE and LARAVEL_AUTOLOAD.'); }
require $autoload;
spl_autoload_register(function (string $class) use ($source): void {
    $prefix = 'OfflineAgency\\SpidLaravelTrentino\\';
    if (str_starts_with($class, $prefix)) {
        require $source.'/src/'.str_replace('\\', '/', substr($class, strlen($prefix))).'.php';
    }
}, true, true);
use Carbon\CarbonImmutable;
use Illuminate\Config\Repository;
use Illuminate\Container\Container;
use Illuminate\Session\ArraySessionHandler;
use Illuminate\Session\Store;
use Illuminate\Support\Facades\Facade;
use OfflineAgency\SpidLaravelTrentino\SpidTrentinoUser;
use OfflineAgency\SpidLaravelTrentino\SessionKeys;
use OfflineAgency\SpidLaravelTrentino\Support\LogRedactor;
use OfflineAgency\SpidLaravelTrentino\Support\SessionExpiry;
use OfflineAgency\SpidLaravelTrentino\Support\TokenResponse;
function check(bool $ok, string $message): void { if (!$ok) { throw new RuntimeException($message); } }
$app = new Container;
$app->instance('config', new Repository(['app'=>['key'=>'docs-only-key']]));
$app->instance('session', new Store('fixture', new ArraySessionHandler(120)));
Facade::setFacadeApplication($app);
$user = SpidTrentinoUser::fromArray([
    'sub'=>'fixture-sub', 'given_name'=>'Example', 'family_name'=>'User',
    'enti-codicefiscale'=>['fiscalCode'=>' TINIT-EXAMPLE '],
]);
check($user->getFiscalNumber()==='TINIT-EXAMPLE', 'fiscal claim path and trim');
check($user->getName()==='Example' && $user->getSurname()==='User', 'name mapping');
check(SpidTrentinoUser::fromJson(json_encode($user))->toArray()===$user->toArray(), 'JSON round trip');
check((new SpidTrentinoUser(['given_name'=>['unexpected']]))->getName()==='', 'malformed scalar tolerated');
try { SpidTrentinoUser::fromJson('not-json'); throw new RuntimeException('Missing JSON rejection'); }
catch (InvalidArgumentException) {}
$redacted = LogRedactor::user($user);
check(strlen($redacted['fiscal_code'])===16 && $redacted['fiscal_code']!==$user->getFiscalNumber(), 'identifier redaction');
CarbonImmutable::setTestNow('2026-10-16T12:00:00Z');
$tokens = TokenResponse::from((object)['access_token'=>'fake', 'expires_in'=>'120']);
SessionExpiry::put($tokens->expiresAt());
check(!SessionExpiry::hasExpired() && SessionExpiry::expiresWithin(120), 'expiry window');
$app['session']->put(SessionKeys::ACCESS_TOKEN_EXPIRES_AT, 'not-a-date');
check(SessionExpiry::hasExpired(), 'invalid stored expiry');
SessionExpiry::put(null);
check(!SessionExpiry::hasExpired(), 'absent expiry behavior');
CarbonImmutable::setTestNow();
echo "PASS: DTO claim mapping/JSON, malformed claims, keyed log redaction, token response and session expiry; no network or database.\n";
