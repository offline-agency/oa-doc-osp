#!/usr/bin/env bash
set -euo pipefail
: "${CART_PACKAGE_REPO:?Set CART_PACKAGE_REPO to a clone containing release 4.1.0}"
: "${CART_VENDOR_AUTOLOAD:?Set CART_VENDOR_AUTOLOAD to compatible vendor/autoload.php}"
release_sha=b89d3219202703203453890e2e46467e79ad415d
actual_sha=$(git -C "$CART_PACKAGE_REPO" rev-parse '4.1.0^{commit}')
[[ "$actual_sha" = "$release_sha" ]] || { echo 'Unexpected 4.1.0 commit' >&2; exit 1; }
fixture_dir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
release_dir=$(mktemp -d "${TMPDIR:-/tmp}/cart-doc-release.XXXXXX")
git -C "$CART_PACKAGE_REPO" archive --format=tar "$release_sha" | tar -xf - -C "$release_dir"
printf 'Extracted release: %s\n' "$release_dir"
php "$fixture_dir/smoke.php" "$release_dir" "$CART_VENDOR_AUTOLOAD"
