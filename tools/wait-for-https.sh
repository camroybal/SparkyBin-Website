#!/bin/sh
# Wait for GitHub Pages to issue a certificate for the custom domain, and
# then turn on the HTTPS redirect.
#
#   tools/wait-for-https.sh [domain] [repo]

set -eu

DOMAIN=${1:-sparkybin.com}
REPO=${2:-camroybal/SparkyBin-Website}
DEADLINE=$(( $(date +%s) + ${3:-3600} ))

while [ "$(date +%s)" -lt "$DEADLINE" ]; do
  CERT=$(timeout 20 openssl s_client -connect "$DOMAIN:443" -servername "$DOMAIN" </dev/null 2>/dev/null \
         | openssl x509 -noout -subject 2>/dev/null || true)

  case "$CERT" in
    *"$DOMAIN"*)
      echo "certificate for $DOMAIN is live: $CERT"
      gh api --method PUT "repos/$REPO/pages" -F https_enforced=true >/dev/null
      echo "https enforced"
      exit 0
      ;;
  esac

  echo "$(date +%H:%M:%S) still serving: ${CERT:-none}"
  sleep 60
done

echo "gave up waiting for the certificate"
exit 1
