<?php

// Isolated released-source check; no credentials, no live HTTP, no docs-root dependencies.
declare(strict_types=1);

$autoload = getenv('LARAVEL_AUTOLOAD');
$source = getenv('ARUBA_SOURCE');
if (! $autoload || ! $source) {
    throw new RuntimeException('Set LARAVEL_AUTOLOAD and ARUBA_SOURCE (released package directory).');
}
require $autoload;
spl_autoload_register(function (string $class) use ($source): void {
    $prefix = 'OfflineAgency\\ArubaSms\\';
    if (str_starts_with($class, $prefix)) {
        require $source.'/src/'.str_replace('\\', '/', substr($class, strlen($prefix))).'.php';
    }
});

use Illuminate\Config\Repository;
use Illuminate\Events\Dispatcher;
use Illuminate\Foundation\Application;
use Illuminate\Http\Client\Factory;
use Illuminate\Notifications\NotificationServiceProvider;
use Illuminate\Support\Facades\Facade;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;
use OfflineAgency\ArubaSms\ArubaSmsClient;
use OfflineAgency\ArubaSms\ArubaSmsMessage;
use OfflineAgency\ArubaSms\ArubaSmsServiceProvider;
use OfflineAgency\ArubaSms\Events\SmsFailed;
use OfflineAgency\ArubaSms\Events\SmsSent;
use OfflineAgency\ArubaSms\Exceptions\ArubaSmsAuthException;
use OfflineAgency\ArubaSms\Exceptions\ArubaSmsDeliveryException;
use OfflineAgency\ArubaSms\Facades\ArubaSms;
use OfflineAgency\ArubaSms\Notifications\SendSmsNotification;

function check(bool $ok, string $message): void {
    if (! $ok) {
        throw new RuntimeException($message);
    }
}

$app = new Application(sys_get_temp_dir().'/aruba-doc-fixture');
$app->instance('config', new Repository([
    'app' => ['locale' => 'en'],
    'aruba-sms' => [
        'base_url' => 'https://aruba-docs.invalid/',
        'credentials' => ['username' => 'fake', 'password' => 'fake'],
        'message_type' => 'N', 'sender' => 'Docs', 'sandbox' => false,
        'retry' => ['times' => 1, 'sleep_ms' => 0],
    ],
]));
$events = new Dispatcher($app);
$app->instance('events', $events);
Facade::setFacadeApplication($app);
$app->register(NotificationServiceProvider::class);
$app->register(Illuminate\Bus\BusServiceProvider::class);
$app->register(ArubaSmsServiceProvider::class);
Log::swap(new Psr\Log\NullLogger);
$sent = $failed = 0;
$events->listen(SmsSent::class, function () use (&$sent): void { $sent++; });
$events->listen(SmsFailed::class, function () use (&$failed): void { $failed++; });

function fakeHttp(array $responses): void {
    Http::swap(new Factory);
    Http::preventStrayRequests();
    Http::fake($responses);
}

$message = (new ArubaSmsMessage)->content('Your order is ready.')
    ->to(['+393331234567', '+393339876543'])->messageType('N');
fakeHttp([
    '*/login' => Http::response('user;session', 200),
    '*/sms' => Http::response(['id' => 'fake-message'], 201),
]);
$response = app(ArubaSmsClient::class)->sendMessage($message);
check($response->status() === 201 && $sent === 1, 'send success/event');
$requests = Http::recorded();
check(count($requests) === 2, 'login + send');
check($requests[1][0]['recipient'] === $message->getRecipients(), 'multiple recipients payload');

// Execute the documented built-in notification route through the registered channel.
Notification::route('aruba-sms', null)->notify(new SendSmsNotification('Your order is ready.', '+393331234567'));
check($sent === 2 && count(Http::recorded()) === 3, 'notification and session cache');

Notification::route('aruba-sms', null)->notify(new class extends Illuminate\Notifications\Notification {
    public function via(mixed $notifiable): array { return ['aruba-sms']; }
    public function toArubaSms(mixed $notifiable): ArubaSmsMessage {
        return (new ArubaSmsMessage)->content('Your order is ready.')->to('+393331234567')->messageType('N');
    }
});
check($sent === 3, 'custom fluent notification');

fakeHttp([
    '*/status' => Http::response(['sms' => [['type' => 'GP', 'quantity' => 7]]], 200),
    '*smshistory*' => Http::response([], 200),
    '*rcptHistory*' => Http::response([], 200),
]);
check(ArubaSms::checkSmsStatus()->status() === 200, 'status facade');
check(ArubaSms::getSmsHistory('20261001000001', '20261016235959', 1, 20)->status() === 200, 'history facade');
check(ArubaSms::getSmsRecipientHistory('+393331234567', '20261001000001', null, 1, 20)->status() === 200, 'recipient history facade');

ArubaSms::clearSession();
fakeHttp([
    '*/login' => Http::sequence()->push('u1;s1', 200)->push('u2;s2', 200),
    '*/sms' => Http::sequence()->push('expired', 401)->push('OK', 201),
]);
check(ArubaSms::sendMessage($message)->status() === 201 && count(Http::recorded()) === 4, '401 reauthentication');

ArubaSms::clearSession();
fakeHttp([
    '*/login' => Http::response('user;session', 200),
    '*/sms' => Http::response('Bad Request', 400),
    '*/status' => Http::response(['sms' => [['type' => 'GP', 'quantity' => 7]]], 200),
]);
try {
    ArubaSms::sendMessage($message);
    throw new RuntimeException('Expected delivery exception');
} catch (ArubaSmsDeliveryException $e) {
    check($e->httpStatus === 400 && $e->errorBody === 'Bad Request' && $failed === 1, 'delivery exception/event');
}

ArubaSms::clearSession();
fakeHttp(['*/login' => Http::response('Unauthorized', 401)]);
try {
    ArubaSms::sendMessage($message);
    throw new RuntimeException('Expected auth exception');
} catch (ArubaSmsAuthException) {
    check(count(Http::recorded()) === 1 && $failed === 1, 'auth failure emits no SmsFailed');
}

config(['aruba-sms.sandbox' => true]);
fakeHttp([]);
check(ArubaSms::sendMessage($message) === null && count(Http::recorded()) === 0, 'sandbox sends no HTTP');
echo 'PASS: client multi-recipient success, notification channel, facade, session cache, 401 reauthentication, delivery error/event, auth error, sandbox; no live HTTP.'.PHP_EOL;
