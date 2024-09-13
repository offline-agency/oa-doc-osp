# Laravel Bank of Italy

[![Latest Stable Version](https://poser.pugx.org/offline-agency/laravel-bank-of-italy/v/stable)](https://packagist.org/packages/offline-agency/laravel-bank-of-italy)
[![MIT Licensed](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![Total Downloads](https://img.shields.io/packagist/dt/offline-agency/laravel-bank-of-italy.svg?style=flat-square)](https://packagist.org/packages/offline-agency/laravel-bank-of-italy)
![Laravel Bank of Italy](https://banners.beyondco.de/Laravel%20Bank%20of%20Italy.png?theme=dark&packageManager=composer+require&packageName=offline-agency%2Flaravel-bank-of-italy&pattern=yyy&style=style_1&description=A+simple+Laravel+package+to+retrieve+information+from+the+Bank+of+Italy&md=1&showWatermark=1&fontSize=100px&images=cash)

A simple Laravel package to retrieve information from the Bank of Italy.

## Installation

You can install the package via composer:

```bash
composer require offline-agency/laravel-bank-of-italy
```

You need to publish config file with:

```bash
php artisan vendor:publish --provider="OfflineAgency\LaravelBankOfItaly\LaravelBankOfItalyServiceProvider"
```

## Usage

Currently, the package provides a method to retrieve exchange rates between currencies.

### Basic

```php
$exchange_rate = new ExchangeRate();
$exchange_rates = $exchange_rate->getExchangeRates();

foreach ($exchange_rates->getItems() as $exchange_rate) {
    dd($exchange_rate); 
    /*
     OfflineAgency\LaravelBankOfItaly\Entities\ExchangeRate\ExchangeRate {
        +currency: "Dollaro USA"
        +currencyIsoCode: "USD"
        +currencyUicCode: "001"
        +rate: "1.0724"
        +rateConvention: "Quantità di valuta estera per 1 Euro"
        +referenceDate: "Y-m-d"
     }
     */
}
```

In this example, the method `getExchangeRates()` returns an instance of `OfflineAgency\LaravelBankOfItaly\Entities\ExchangeRate\ExchangeRates`. You can use the `getItems()` method to retrieve an array of `ExchangeRate` objects. Each `ExchangeRate` object contains the following properties:
* currency: The name of the currency (e.g., "Dollaro USA")
* currencyIsoCode: The ISO code of the currency (e.g., "USD")
* currencyUicCode: The UIC code of the currency (e.g., "001")
* rate: The exchange rate (e.g., "1.0724")
* rateConvention: The rate convention (e.g., "Quantità di valuta estera per 1 Euro")
* referenceDate: The reference date of the rate (format: Y-m-d)

### Custom Query Parameters

You can also provide custom query parameters to filter the results. Here are the fields you can specify:

```php
$exchange_rate = new ExchangeRate();
$response = $exchange_rate->getExchangeRates([
    'lang' => 'en', // Default: it
    'baseCurrencyIsoCode' => 'EUR', // Default: USD
    'currencyIsoCode' => 'ITL', // Default: EUR (accepted values: EUR, USD, ITL)
    'startDate' => '01-01-2000', // Default: Carbon::now()->subYear() (format: Y-m-d)
    'endDate' => '01-01-2000' // Default: Carbon::now() (format: Y-m-d)
]);
```

### Error Handling

* If there is a validation error, the method returns an instance of `Illuminate\Support\MessageBag`.
* If there is an error during the API call, the method returns an instance of `OfflineAgency\LaravelBankOfItaly\Entities\Error`, which contains an error property.

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

## Security

If you discover any security-related issues, please email <support@offlineagency.com> instead of using the issue
tracker.

## Credits

- [Offline Agency](https://github.com/offline-agency)
- [Giacomo Fabbian](https://github.com/Giacomo92)
- [Nicolas Sanavia](https://github.com/SanaviaNicolas)
- [All Contributors](../../contributors)

## About us

Offline Agency is a web design agency based in Padua, Italy. You'll find an overview of our
projects [on our website](https://offlineagency.it/).

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.