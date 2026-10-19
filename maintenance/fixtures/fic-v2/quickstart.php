<?php

use Illuminate\Support\Facades\Http;
use Illuminate\Support\MessageBag;
use OfflineAgency\LaravelFattureInCloudV2\Api\Client;
use OfflineAgency\LaravelFattureInCloudV2\Entities\Error;
use OfflineAgency\LaravelFattureInCloudV2\FattureInCloud;

// Synthetic responses only. Prevent accidental requests to any real API.
Http::preventStrayRequests();
Http::fakeSequence()
    ->push(['data' => [['id' => 101, 'name' => 'Example client']],
        'current_page' => 1, 'per_page' => 50, 'total' => 1,
        'next_page_url' => null])
    ->push(['error' => ['message' => 'Synthetic API failure']], 422)
    ->push(['data' => ['id' => 101, 'name' => 'Example client']])
    ->push(['data' => ['id' => 101, 'name' => 'Updated example']]);

$clients = new Client(new FattureInCloud('123', 'synthetic-token'));
$list = $clients->list(['per_page' => 50]);
if ($list instanceof Error) {
    throw new RuntimeException(json_encode($list->error));
}
echo $list->getItems()[0]->name, PHP_EOL;

$failure = $clients->detail(999);
if ($failure instanceof Error) {
    echo $failure->error->message, PHP_EOL;
}

$invalid = $clients->create([]);
if ($invalid instanceof MessageBag) {
    echo 'Local validation rejected missing data.name', PHP_EOL;
}

$created = $clients->create(['data' => ['name' => 'Example client']]);
if ($created instanceof MessageBag) {
    throw new RuntimeException($created->toJson());
}
if ($created instanceof Error) {
    throw new RuntimeException(json_encode($created->error));
}
$edited = $clients->edit($created->id, ['data' => ['name' => 'Updated example']]);
if ($edited instanceof MessageBag) {
    throw new RuntimeException($edited->toJson());
}
if ($edited instanceof Error) {
    throw new RuntimeException(json_encode($edited->error));
}
echo $edited->name, PHP_EOL;
