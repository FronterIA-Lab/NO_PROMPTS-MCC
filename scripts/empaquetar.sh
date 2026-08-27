#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/dist/NO-PROMPTS-MCC"
rm -rf "$OUT"
mkdir -p "$OUT/css" "$OUT/js" "$OUT/docs" "$OUT/plantillas"
cp "$ROOT/css/mcc.css" "$OUT/css/"
cp "$ROOT/js/app.js" "$OUT/js/"
cp "$ROOT/favicon.ico" "$OUT/"
cp "$ROOT/pack/LEEME.txt" "$OUT/"
cp "$ROOT/pack/docs/"*.md "$OUT/docs/"
cp "$ROOT/pack/plantillas/"*.csv "$OUT/plantillas/"
# rewrite parent-relative paths to local pack paths
sed -e 's|href="../css/mcc.css"|href="css/mcc.css"|' \
    -e 's|src="../js/app.js"|src="js/app.js"|' \
    -e 's|href="../favicon.ico"|href="favicon.ico"|' \
    -e 's|href="../assets/web/favicon.svg"|href="favicon.ico"|' \
    -e 's|href="../index.html"|href="abrir-aqui.html"|' \
  "$ROOT/pack/abrir-aqui.html" > "$OUT/abrir-aqui.html"
mkdir -p "$ROOT/dist"
( cd "$ROOT/dist" && rm -f NO-PROMPTS-MCC.zip && zip -r -q NO-PROMPTS-MCC.zip NO-PROMPTS-MCC )
echo "Listo: $ROOT/dist/NO-PROMPTS-MCC.zip"
