---
title: Laravel Aruba SMS
description: Send Laravel notifications with Aruba SMS Panel, configure sandbox mode, and monitor SMS credits.
meta:
  - name: description
    content: Send Laravel notifications with Aruba SMS Panel, configure sandbox mode, and monitor SMS credits.
gitName: laravel-aruba-sms
packageVersion: '1.1.0'
sourceCommit: b090caba23f4882486619f2eaed90dfa9b7a2014
---

# Laravel Aruba SMS

Send SMS through a Laravel notification channel or the Aruba SMS Panel API client. This guide covers [release 1.1.0](https://github.com/offline-agency/laravel-aruba-sms/releases/tag/1.1.0), available on [Packagist](https://packagist.org/packages/offline-agency/laravel-aruba-sms), checked on 16 October 2026.

## Requirements

Composer declares PHP `^8.4` and Illuminate HTTP, Notifications and Support `^12.0|^13.0`. The release CI workflow defines PHP 8.4 with Laravel 12 and 13; this configuration does not establish that every compatible version has been tested. The documentation examples were exercised with PHP 8.5.10 and Laravel 13.35.0 using fake HTTP responses.

## Installation

```bash
composer require offline-agency/laravel-aruba-sms:^1.1
php artisan vendor:publish --tag=aruba-sms-config
```

Laravel discovers the service provider automatically. Publishing creates `config/aruba-sms.php`; configuration keys use the `aruba-sms` namespace, for example `config('aruba-sms.sender')`.

## Configuration

Start with sandbox enabled:

```dotenv
ARUBA_SMS_ID=your_aruba_username
ARUBA_SMS_PASSWORD=your_aruba_password
ARUBA_SMS_SENDER=YourBrand
ARUBA_SMS_MESSAGE_TYPE=N
ARUBA_SMS_SANDBOX=true
ARUBA_SMS_MINIMUM_SMS=50
ARUBA_SMS_LOW_CREDIT_RECIPIENTS=admin@example.com,ops@example.com
```

| Environment variable | Configuration key | Default / purpose |
| --- | --- | --- |
| `ARUBA_SMS_ID` | `credentials.username` | Empty; Aruba username |
| `ARUBA_SMS_PASSWORD` | `credentials.password` | Empty; Aruba password |
| `ARUBA_SMS_BASE_URL` | `base_url` | `https://smspanel.aruba.it/API/v1.0/REST/` |
| `ARUBA_SMS_SENDER` | `sender` | `YourBrand` |
| `ARUBA_SMS_MESSAGE_TYPE` | `message_type` | `N` |
| `ARUBA_SMS_SANDBOX` | `sandbox` | `false`; log message details instead of sending |
| `ARUBA_SMS_MINIMUM_SMS` | `minimum_sms` | `50`; falls back to legacy `MINIMUM_SMS` |
| `ARUBA_SMS_LOW_CREDIT_RECIPIENTS` | `low_credit_recipients` | Empty; comma-separated email addresses |
| `ARUBA_SMS_RETRY_TIMES` | `retry.times` | `3`; HTTP retry setting (`0` disables retries) |
| `ARUBA_SMS_RETRY_SLEEP_MS` | `retry.sleep_ms` | `100`; delay in milliseconds |

All keys above are relative to `aruba-sms`. Sandbox `sendMessage()` logs recipients and content, returns `null`, makes no HTTP request and emits no `SmsSent`. Status/history client calls still use the API. Set sandbox to `false` when ready to send real SMS using your Aruba account.

## Usage

### Notification

For a single recipient, use the included notification:

```php
use Illuminate\Support\Facades\Notification;
use OfflineAgency\ArubaSms\Notifications\SendSmsNotification;

Notification::route('aruba-sms', null)->notify(
    new SendSmsNotification('Your order is ready.', '+393331234567')
);
```

The recipient is supplied to `SendSmsNotification`, which accepts a string. The channel reads `toArubaSms()`; it does not infer a phone number from the notification route.

For your own notification, return an `ArubaSmsMessage`:

```php
namespace App\Notifications;

use Illuminate\Notifications\Notification;
use OfflineAgency\ArubaSms\ArubaSmsMessage;

class OrderReady extends Notification
{
    public function via(mixed $notifiable): array
    {
        return ['aruba-sms'];
    }

    public function toArubaSms(mixed $notifiable): ArubaSmsMessage
    {
        return (new ArubaSmsMessage)
            ->content('Your order is ready.')
            ->to($notifiable->phone_number)
            ->messageType('N');
    }
}
```

Call `$user->notify(new \App\Notifications\OrderReady)` on a notifiable model with a `phone_number`. Older notifications may expose public `message`, `recipient` and optional `message_type` properties when `toArubaSms()` is absent. If `toArubaSms()` returns another type, the channel returns `null` without sending.

### Direct client and facade

```php
use OfflineAgency\ArubaSms\ArubaSmsClient;
use OfflineAgency\ArubaSms\ArubaSmsMessage;

$message = (new ArubaSmsMessage)
    ->content('Your order is ready.')
    ->to(['+393331234567', '+393339876543'])
    ->messageType('N');

$response = app(ArubaSmsClient::class)->sendMessage($message);
// Illuminate HTTP Response on HTTP 200/201, or null in sandbox.
```

The constructor also accepts `new ArubaSmsMessage($content, $recipient, $message_type)`; the recipient can be a string or an array. Messages and the client pass phone numbers through unchanged. Supply complete international numbers yourself. The optional `OfflineAgency\ArubaSms\Support\PhoneNumberFormatter::format()` helper strips literal spaces and adds `+39` only when the number does not start with `+`; it does not validate phone numbers.

The facade resolves the same singleton client:

```php
use OfflineAgency\ArubaSms\Facades\ArubaSms;

$status = ArubaSms::checkSmsStatus();
$history = ArubaSms::getSmsHistory('20261001000001', '20261016235959', 1, 20);
$recipientHistory = ArubaSms::getSmsRecipientHistory(
    '+393331234567', '20261001000001', null, 1, 20
);
```

These methods return an Illuminate HTTP `Response`. `ArubaSms::sendMessage($message)` is also available. The client caches its login session in memory; `clearSession()` forces login on the next request. If an authenticated SMS, status or history request returns HTTP 401, it logs in again and repeats that request once. Configured transient retries cover connection errors and HTTP 5xx.

### Results, events and errors

Successful send responses (HTTP 200 or 201) dispatch `OfflineAgency\ArubaSms\Events\SmsSent`, exposing readonly `message` and `response`. API acceptance does not establish handset delivery.

```php
use OfflineAgency\ArubaSms\Exceptions\ArubaSmsAuthException;
use OfflineAgency\ArubaSms\Exceptions\ArubaSmsDeliveryException;

try {
    $response = app(\OfflineAgency\ArubaSms\ArubaSmsClient::class)
        ->sendMessage($message);
} catch (ArubaSmsAuthException $exception) {
    // Check configured account credentials.
} catch (ArubaSmsDeliveryException $exception) {
    $httpStatus = $exception->httpStatus;
    $apiError = $exception->errorBody;
    // Also available: recipient (JSON), messageContent and statusInfo.
}
```

For a failed send response, the client queries credit status, constructs `ArubaSmsDeliveryException`, dispatches `SmsFailed` with readonly `message` and `exception`, then throws. Authentication or connection failures can interrupt this path before `SmsFailed` is emitted; it is not a catch-all failure event. Transport failures may propagate as Illuminate HTTP exceptions. Exception text and logs can include message content and recipients.

### Commands

The registered signatures are:

```text
aruba:sms {command_type} {--from=} {--to=} {--pageNumber=} {--pageSize=} {--recipient=} {--phoneNumber=*}
aruba:check-remaining-sms
```

```bash
php artisan aruba:sms status
php artisan aruba:sms history --from=20261001000001 --to=20261016235959 --pageNumber=1 --pageSize=20
php artisan aruba:sms recipient-history --recipient=+393331234567 --from=20261001000001
php artisan aruba:check-remaining-sms
```

History commands default `from` to today at `00:00:01`. Low-credit checks use the `GP` quantity and email each configured recipient when it is strictly below `minimum_sms`; configure Laravel mail delivery first. No alert is sent when no GP quantity is available. Schedule the check in your application if needed.

To exercise the console notification in sandbox:

```bash
php artisan aruba:sms notification --phoneNumber=+393331234567
```

This command formats numbers with `PhoneNumberFormatter` and uses fixed text `Sms from console command`. In 1.1.0, although repeated `--phoneNumber` options are accepted, only the first number is sent. Use an `ArubaSmsMessage` recipient array for multiple recipients.

`php artisan aruba:sms remaining-credit-raw` returns GP quantity from the handler rather than printing a credit value. Its process exit code is not a reliable credit-reporting API. Use `checkSmsStatus()` and `OfflineAgency\ArubaSms\Support\SmsStatusResponse::fromResponse($response)?->getGpCredits()` instead. In sandbox, this handler and the low-credit check generate a random integer from 0 to 100; the latter can still send low-credit email.

## Testing

In a checkout of the package release with development dependencies installed:

```bash
composer test
```

Use Laravel `Http::fake()` and `Http::preventStrayRequests()` for isolated tests. Sandbox protects SMS sends; status and history still need HTTP fakes. The documentation fixture exercises success, notification dispatch, delivery/authentication failures and one-time HTTP 401 reauthentication without real credentials.

### Changelog

See [GitHub releases](https://github.com/offline-agency/laravel-aruba-sms/releases).

## Contributing

Use the [package repository](https://github.com/offline-agency/laravel-aruba-sms) for source and contributions.

### Security

Report security issues privately to support@offlineagency.it.

## Credits

[Offline Agency](https://github.com/offline-agency) and [package contributors](https://github.com/offline-agency/laravel-aruba-sms/graphs/contributors).

## License

[MIT license](https://github.com/offline-agency/laravel-aruba-sms/blob/b090caba23f4882486619f2eaed90dfa9b7a2014/LICENSE).

<a id="laravel-package-boilerplate"></a>
