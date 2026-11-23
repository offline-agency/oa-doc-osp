# Bank of Italy isolated fixture

Run date: 2026-10-16. Source: release `1.0.1`, commit `8b4ae70b92d0b802139138e70367d789d80251af`.

Dependencies are installed only in a disposable directory. Do not install this Composer project in the documentation site's root or in a package checkout. The fixture uses Illuminate 9 components, not a booted Laravel application; it does not test auto-discovery or console publishing. All HTTP behavior is faked with a wildcard handler, including transport failure. It never calls the provider.

Reproduce (substitute the PHP 8.1 and Composer paths on your machine):

```bash
mkdir -p /tmp/bank-fixture-runtime /tmp/bank-fixture-source
cp maintenance/fixtures/bank-of-italy/composer.json /tmp/bank-fixture-runtime/
cp maintenance/fixtures/bank-of-italy/composer.lock /tmp/bank-fixture-runtime/
composer install --working-dir=/tmp/bank-fixture-runtime --no-interaction --no-plugins --no-scripts
# Read-only archive from an existing clone, or clone into a separate temporary directory first.
git -C /path/to/laravel-bank-of-italy archive 8b4ae70b92d0b802139138e70367d789d80251af | tar -x -C /tmp/bank-fixture-source
php81 maintenance/fixtures/bank-of-italy/verify.php /tmp/bank-fixture-runtime/vendor/autoload.php /tmp/bank-fixture-source
```

The lock was resolved with Composer 2.10.2 and a PHP platform setting of 8.1.34; execution used actual PHP 8.1.34. The checked-in `results.json` records 21 passing assertions and exact primary dependency versions. No PHPStan/Larastan was installed or run. No upstream tests, framework matrix, live upstream response check or coverage run was performed.
