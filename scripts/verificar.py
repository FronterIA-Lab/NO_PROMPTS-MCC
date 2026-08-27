#!/usr/bin/env python3
"""Smoke checks for the No-Prompts MCC pack. No network, no cloud."""
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
errors = []

def ok(cond, msg):
    if not cond:
        errors.append(msg)

ok((ROOT / "index.html").is_file(), "falta index.html")
ok((ROOT / "pack/abrir-aqui.html").is_file(), "falta abrir-aqui.html")
ok((ROOT / "css/mcc.css").is_file(), "falta mcc.css")
ok((ROOT / "js/app.js").is_file(), "falta app.js")
ok((ROOT / "assets/web/soberania-cognitiva.jpg").is_file(), "falta imagen hero")
ok((ROOT / "favicon.ico").is_file(), "falta favicon")

html = (ROOT / "index.html").read_text(encoding="utf-8")
ok("cdn" not in html.lower() and "googleapis" not in html.lower(), "landing con CDN")
ok("$37" in html, "landing sin precio")

app = (ROOT / "js/app.js").read_text(encoding="utf-8")
for token in ["CONTEXT_DECLARE", "KNOWN_PROBE", "EXIT_PROTOCOL", "Exigencia"]:
    ok(token in app or "n: 16" in app or "n:16" in app, f"falta {token}")
ok("n: 16" in app or "n:16" in app, "no hay 16 exigencias")
ok(app.count("glifo:") >= 16 or app.count('glifo:') >= 16, "faltan glifos")
ok("localStorage" in app, "app.js no persiste local")

manual = (ROOT / "pack/docs/manual-no-prompts.md").read_text(encoding="utf-8")
ok("16 exigencias" in manual or "dieciséis" in manual.lower(), "manual no habla de 16")
ok((ROOT / "corpus/catalog/NO-PROMPTS-manual-v0.9.pdf").is_file(), "falta PDF v0.9")
ok((ROOT / "pack/docs/NO-PROMPTS-manual-v0.9.pdf").is_file(), "falta PDF en pack")

css = (ROOT / "css/mcc.css").read_text(encoding="utf-8")
ok("--cyan" in css and "--magenta" in css, "paleta incompleta")

pack_html = (ROOT / "pack/abrir-aqui.html").read_text(encoding="utf-8")
ok("view-yoliztli" in pack_html and "view-probe" in pack_html, "app sin vistas")
ok("googleapis" not in pack_html.lower(), "app con CDN")

# catalog papers
for name in ["mcc-protocolo.pdf", "certeza-sin-sustancia.pdf", "manual-soberania-cognitiva.pdf"]:
    ok((ROOT / "corpus/catalog" / name).is_file(), f"falta catalog/{name}")

if errors:
    print("FALLOS:")
    for e in errors:
        print(" -", e)
    sys.exit(1)
print("ok · pack, glifos, paleta, cero CDN, corpus")
