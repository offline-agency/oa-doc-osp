<?php

declare(strict_types=1);

// Dependencies are borrowed read-only; package classes MUST load from the extracted release.
[$script, $source, $autoload] = $argv + [null, null, null];
if (!$source || !$autoload) {
    fwrite(STDERR, "Usage: php smoke.php RELEASE_SOURCE VENDOR_AUTOLOAD\n");
    exit(2);
}
$source = realpath($source) ?: throw new RuntimeException('Release source directory missing');
$loader = require $autoload;
$loader->setPsr4('Offlineagency\\LaravelWebex\\', $source.'/src');
$loader->setPsr4('Offlineagency\\LaravelWebex\\Http\\', $source.'/Http');

use Illuminate\Config\Repository;
use Illuminate\Events\Dispatcher;
use Illuminate\Foundation\Application;
use Illuminate\Http\Client\Factory;
use Illuminate\Support\Facades\Facade;
use Illuminate\Support\Facades\Http;
use Offlineagency\LaravelWebex\Entities\Error;
use Offlineagency\LaravelWebex\Exceptions\WebexPaginationException;
use Offlineagency\LaravelWebex\Exceptions\WebexRequestException;
use Offlineagency\LaravelWebex\LaravelWebexFacade as LaravelWebex;

$app = new Application(sys_get_temp_dir());
$app->instance('config', new Repository(['webex' => [
    'base_url' => 'https://webexapis.com/v1/',
    'bearer' => 'configuration-token',
    'timeout' => 30,
    'retry' => ['times' => 3, 'max_delay_seconds' => 0],
]]));
$app->instance('events', new Dispatcher($app));
Facade::setFacadeApplication($app);
$app->singleton('laravel-webex', fn () => new Offlineagency\LaravelWebex\LaravelWebex());
Http::swap(new Factory());
Http::preventStrayRequests();
function check(bool $condition, string $message): void {
    if (!$condition) { throw new RuntimeException($message); }
}
check(str_starts_with((new ReflectionClass(Offlineagency\LaravelWebex\LaravelWebex::class))->getFileName(), $source.'/'), 'Wrong package source loaded');

// Execute the Meetings and Messaging calls shown in the guide with synthetic responses.
Http::fake([
    'webexapis.com/v1/meetings*' => Http::response(['items' => [['id' => 'existing-meeting']]], 200),
]);
$client = LaravelWebex::forToken('synthetic-token');
$meetings = $client->meeting()->list(['state' => 'inProgress', 'max' => 10]);
check(is_array($meetings) && $meetings[0]->id === 'existing-meeting', 'Meeting list');
Http::assertSent(fn ($r) => $r->method() === 'GET' && $r['state'] === 'inProgress' && $r->hasHeader('Authorization', 'Bearer synthetic-token'));

// Replacing the factory resets fakes between independent scenarios.
function fakeResponses(array $responses): void {
    Http::swap(new Factory());
    Http::preventStrayRequests();
    $sequence = Http::sequence();
    foreach ($responses as [$body, $status, $headers]) { $sequence->push($body, $status, $headers); }
    Http::fake(['webexapis.com/*' => $sequence]);
}
fakeResponses([[['id' => 'synthetic-meeting-id', 'title' => 'Project review'], 201, []]]);
$meeting = $client->meeting()->create('Project review', '2026-11-15T10:00:00Z', '2026-11-15T11:00:00Z', ['agenda' => 'Review the next milestone']);
check(!$meeting instanceof Error && $meeting->id === 'synthetic-meeting-id', 'Meeting create');
Http::assertSent(fn ($r) => $r->method() === 'POST' && $r->url() === 'https://webexapis.com/v1/meetings' && $r['agenda'] === 'Review the next milestone');
fakeResponses([[['items' => [['id' => 'participant-id']]], 200, []]]);
$participants = LaravelWebex::meeting_participants()->list('synthetic-meeting-id', ['max' => 20]);
check(is_array($participants) && count($participants) === 1, 'Participants');
Http::assertSent(fn ($r) => $r->method() === 'GET' && $r['meetingId'] === 'synthetic-meeting-id' && $r['max'] === 20);
fakeResponses([[['id' => 'synthetic-message-id', 'text' => 'Hello from the application'], 201, []]]);
$message = LaravelWebex::forToken('synthetic-token')->messages()->create('synthetic-room-id', 'Hello from the application', ['markdown' => '**Hello** from the application']);
check(!$message instanceof Error && $message->id === 'synthetic-message-id', 'Message create');
Http::assertSent(fn ($r) => $r->method() === 'POST' && $r->url() === 'https://webexapis.com/v1/messages' && $r['roomId'] === 'synthetic-room-id' && $r['markdown'] === '**Hello** from the application');

fakeResponses([[['message' => 'Rejected', 'trackingId' => 'synthetic-trace', 'errors' => []], 401, []]]);
$result = LaravelWebex::messages()->detail('synthetic-message-id');
check($result instanceof Error && $result->status === 401 && $result->trackingId === 'synthetic-trace', 'HTTP Error details');
fakeResponses([['invalid json', 200, []]]);
$malformed = LaravelWebex::messages()->detail('id');
check($malformed instanceof Error && $malformed->status === null, 'Malformed JSON local error status');
fakeResponses([['', 204, []]]);
check(LaravelWebex::messages()->destroy('id') === true, 'Empty deletion');

fakeResponses([[['message' => 'Busy'], 429, ['Retry-After' => '90']], [['id' => 'after-retry'], 200, []]]);
check(LaravelWebex::messages()->detail('id')->id === 'after-retry', 'GET retry');
Http::assertSentCount(2);
fakeResponses([[['message' => 'Busy'], 429, ['Retry-After' => '90']]]);
$error = LaravelWebex::messages()->create('room', 'text');
check($error instanceof Error && $error->status === 429 && $error->retryAfter === 90, 'POST not retried / Retry-After metadata');
Http::assertSentCount(1);

$next = 'https://webexapis.com/v1/messages?roomId=room&before=page2';
fakeResponses([[['items' => [['id' => 'first']]], 200, ['Link' => '<'.$next.'>; rel="next"']], [['items' => [['id' => 'second']]], 200, []]]);
$items = LaravelWebex::messages()->cursor('room', ['max' => 1], maxPages: 2)->all();
check(count($items) === 2 && $items[1]->id === 'second', 'Lazy cursor pages');
Http::assertSentCount(2);
fakeResponses([[['items' => []], 200, ['Link' => '<https://outside.example/messages>; rel="next"']]]);
try { LaravelWebex::messages()->cursor('room')->all(); throw new RuntimeException('External nextLink accepted'); }
catch (WebexPaginationException $e) { Http::assertSentCount(1); }
fakeResponses([[['message' => 'Rejected'], 401, []]]);
try { LaravelWebex::rooms()->cursor()->all(); throw new RuntimeException('Failed page accepted'); }
catch (WebexRequestException $e) { check($e->error->status === 401, 'Cursor exception Error'); }

$package = Composer\InstalledVersions::getPrettyVersion('laravel/framework');
echo 'PASS: released Webex source; Meetings/Messaging requests, typed results, 401/malformed JSON/204, GET retry, POST no retry, two-page cursor, origin guard and failed-page exception. PHP '.PHP_VERSION.'; Laravel '.$package."\n";
