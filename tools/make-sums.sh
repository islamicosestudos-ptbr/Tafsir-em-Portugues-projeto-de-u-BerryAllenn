#!/bin/sh
# Gera lista de hashes de uma pasta (ex.: o build final).
# Uso:   sh tools/make-sums.sh .output/public > SHA256SUMS
# Checar: cd .output/public && sha256sum -c ../../SHA256SUMS
cd "$1" || exit 1
find . -type f | LC_ALL=C sort | while read -r f; do sha256sum "$f"; done
