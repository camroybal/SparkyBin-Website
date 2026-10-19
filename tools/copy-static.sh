#!/bin/sh
# Copy the files that have to be in the published site but that the build
# does not put there: the CNAME that tells GitHub Pages which domain to
# serve, and the Flathub verification file, whose directory starts with a
# dot and is skipped by the copy of the public directory.

set -eu

cd "$(dirname "$0")/.."

cp CNAME dist/CNAME

mkdir -p dist/.well-known
cp public/.well-known/org.flathub.VerifiedApps.txt dist/.well-known/

echo "copied CNAME and .well-known into dist"
