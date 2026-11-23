#!/usr/bin/env bash
set -euo pipefail
: "${PGR_SOURCE:?Set PGR_SOURCE to the v0.1.0 checkout}"
fixture_dir=$(mktemp -d)
printf 'Build directory: %s\n' "$fixture_dir"
cp -R "$PGR_SOURCE/src" "$PGR_SOURCE/test" "$fixture_dir/"
make -C "$fixture_dir/test/c" run
