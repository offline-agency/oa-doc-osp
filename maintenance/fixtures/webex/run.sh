#!/usr/bin/env bash
set -euo pipefail
: "${WEBEX_PACKAGE_REPO:?Set WEBEX_PACKAGE_REPO to a read-only clone containing release 2.0.0}"
: "${WEBEX_VENDOR_AUTOLOAD:?Set WEBEX_VENDOR_AUTOLOAD to a compatible vendor/autoload.php}"
release_sha=c4aec48c1c416676cc411936fe7e905398f66b8c
actual_sha=$(git -C "$WEBEX_PACKAGE_REPO" rev-parse '2.0.0^{commit}')
if [[ "$actual_sha" != "$release_sha" ]]; then
    echo 'Release 2.0.0 does not match the reviewed source commit' >&2
    exit 1
fi
fixture_dir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
release_dir=$(mktemp -d "${TMPDIR:-/tmp}/webex-doc-release.XXXXXX")
git -C "$WEBEX_PACKAGE_REPO" archive --format=tar "$release_sha" | tar -xf - -C "$release_dir"
printf 'Extracted release: %s\n' "$release_dir"
php "$fixture_dir/smoke.php" "$release_dir" "$WEBEX_VENDOR_AUTOLOAD"
