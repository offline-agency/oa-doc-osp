#!/usr/bin/env bash
set -euo pipefail
: "${CART_PACKAGE_REPO:?Set CART_PACKAGE_REPO to a clone containing release 4.1.0}"
: "${CART_VENDOR_AUTOLOAD:?Set CART_VENDOR_AUTOLOAD to compatible vendor/autoload.php}"
release_sha=b89d3219202703203453890e2e46467e79ad415d
actual_sha=$(git -C "$CART_PACKAGE_REPO" rev-parse '4.1.0^{commit}')
[[ "$actual_sha" = "$release_sha" ]] || { echo 'Unexpected 4.1.0 commit' >&2; exit 1; }
fixture_dir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
export CART_FIXTURE_RELEASE_SOURCE
CART_FIXTURE_RELEASE_SOURCE=$(mktemp -d "${TMPDIR:-/tmp}/cart41-upstream.XXXXXX")
export CART_VENDOR_AUTOLOAD
vendor_dir=$(dirname -- "$CART_VENDOR_AUTOLOAD")
git -C "$CART_PACKAGE_REPO" archive --format=tar "$release_sha" | tar -xf - -C "$CART_FIXTURE_RELEASE_SOURCE"
mkdir -p "$CART_FIXTURE_RELEASE_SOURCE/vendor/pestphp/pest/bin"
cp "$vendor_dir/pestphp/pest/bin/pest" "$CART_FIXTURE_RELEASE_SOURCE/vendor/pestphp/pest/bin/pest"
cp "$fixture_dir/upstream-bootstrap.php" "$CART_FIXTURE_RELEASE_SOURCE/vendor/autoload.php"
cp -R "$vendor_dir/orchestra/testbench-core/laravel" "$CART_FIXTURE_RELEASE_SOURCE/testbench-app"
printf 'Extracted exact release and isolated Testbench app: %s\n' "$CART_FIXTURE_RELEASE_SOURCE"
cd "$CART_FIXTURE_RELEASE_SOURCE"
php vendor/pestphp/pest/bin/pest --colors=never --compact "$@"
