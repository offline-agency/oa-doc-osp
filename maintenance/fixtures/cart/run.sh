#!/usr/bin/env bash
set -euo pipefail
: "${CART_PACKAGE_REPO:?Set CART_PACKAGE_REPO to a clone containing release 4.0.3}"
: "${CART_VENDOR_AUTOLOAD:?Set CART_VENDOR_AUTOLOAD to compatible vendor/autoload.php}"
release_sha=60eb1006c9c2b31ff50cebd7b8b677a1dd16cc16
actual_sha=$(git -C "$CART_PACKAGE_REPO" rev-parse '4.0.3^{commit}')
[[ "$actual_sha" = "$release_sha" ]] || { echo 'Unexpected 4.0.3 commit' >&2; exit 1; }
fixture_dir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
release_dir=$(mktemp -d "${TMPDIR:-/tmp}/cart-doc-release.XXXXXX")
git -C "$CART_PACKAGE_REPO" archive --format=tar "$release_sha" | tar -xf - -C "$release_dir"
printf 'Extracted release: %s\n' "$release_dir"
php "$fixture_dir/smoke.php" "$release_dir" "$CART_VENDOR_AUTOLOAD"
