#!/bin/sh
# node_modules lives in a Docker volume (see compose.yaml), which keeps
# whatever was installed when it was first created. Reinstall whenever
# package-lock.json has changed since, so new dependencies just work.
set -e

if ! sha256sum -c --status node_modules/.lockfile-hash 2>/dev/null; then
  echo "package-lock.json has changed: reinstalling dependencies..."
  npm ci
  sha256sum package-lock.json > node_modules/.lockfile-hash
fi

exec "$@"
