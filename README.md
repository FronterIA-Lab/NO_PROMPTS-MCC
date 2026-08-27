# NO_PROMPTS-MCC

**NO.PROMPTS** · FronterIA-Lab · Sonora · $37 USD / $690 MXN · CC BY-NC-SA 4.0

Manual v0.9 de Dolores Méndez Valdez, más una herramienta local para no entregar el dato en crudo.

> Un prompt le pide a la máquina que adivine mejor. Una exigencia la obliga a mostrar de dónde salió el número.

- Landing: [`index.html`](index.html)
- Herramienta: [`pack/abrir-aqui.html`](pack/abrir-aqui.html)
- PDF original: [`corpus/catalog/NO-PROMPTS-manual-v0.9.pdf`](corpus/catalog/NO-PROMPTS-manual-v0.9.pdf)

No necesita cuenta, build ni internet. Yoliztli vive en `localStorage`. Las cifras pueden ir veladas (proporciones, base 100, factor propio).

## El producto

Son **16 exigencias**, no 8 prompts inventados. Banco, no lista. Cada una trae respuesta aceptable y señal de fallo.

| Pieza | Dónde | Del v0.9 |
| --- | --- | --- |
| Tres líneas de Yoliztli | `pack/abrir-aqui.html` | Antes de empezar |
| 16 exigencias con filtros 2 min / 10 min / duele | la misma herramienta | Movimientos A–D |
| 8 preguntas de salida + hoja para pegar | `pack/docs/checklist.md` | Al terminar |
| PDF de producción | `pack/docs/NO-PROMPTS-manual-v0.9.pdf` | el original |

Mínimo que funciona: movimiento A (1–4) + exigencia 10. Si sólo te acuerdas de una cosa: la 10 y la 12.

## Precio y canal

**$37 USD / $690 MXN**, pago único. Directo + taller. No Udemy ni marketplaces de prompts.

```bash
python3 -m http.server 8765
bash scripts/empaquetar.sh
```


## Decisiones de entrega, precio y canal

El brief original pedía decidir estructura, precio y canales. Queda cerrado así:

### Entrega

Un ZIP cuyo corazón es una herramienta HTML local, no un Google Sheet. Google Sheet contradice el marco: los datos del Yoliztli no pueden vivir en un servidor ajeno. CSV se incluye para quien quiera Excel u otra hoja **offline**.

Cómo servir el repo en local:

```bash
python3 -m http.server 8765
# http://127.0.0.1:8765/
```

Cómo empaquetar el ZIP de venta:

```bash
bash scripts/empaquetar.sh
```

### Precio

**$37 USD / $690 MXN**, pago único. El brief sugería ~$700 MXN. Se redondea a un precio que se puede pedir en WhatsApp sin calculadora y que sigue siendo premium frente a un PDF de prompts.

No es un curso. Es el producto de entrada. Escalera:

| Peldaño | Precio | Rol |
| --- | --- | --- |
| Pack No-Prompts (este repo) | $37 / $690 MXN | Puerta. Circula. |
| Taller MCC en vivo | cupo limitado | El rito. El pack es el material. |
| Curso estudiantes | $99 USD | Upsell (propuesta comercial en `corpus/catalog/`) |
| Curso investigadores | $299 USD | Upsell |
| RAG soberano | $49–$199 | Infra local, no este ZIP |

### Canales

1. **Directo (prioridad).** Esta landing + Mercado Pago / Stripe + WhatsApp. El relato no se alquila.
2. **Taller MCC.** Los carteles de `corpus/visual/` ya tienen URL y fecha. El pack se entrega al inscribirse.
3. **Hotmart o Gumroad** solo como espejo de pago, no como dueño de la narrativa.
4. **No.** Udemy, Amazon KDP, marketplaces de prompts. Colonizan el canal y aplanan el marco a “productivity tips”.

## Identidad

Negro mate, papel, cian, magenta, grecas. Quincunx (cuatro direcciones + centro) como marca. Cero Google Fonts, cero analytics, cero CDN: el producto practica la soberanía que predica.

## Corpus

Los papers de Dolores Méndez Valdez están en `corpus/papers/`. Copias con nombre ASCII para la web: `corpus/catalog/`. No son adorno. Son el código fuente del pack.

## Licencia

CC BY-NC-SA 4.0. FronterIA-Lab puede venderlo. Un tercero no puede reempaquetarlo como *prompt pack* corporativo.

El LLM es asistente, no árbitro. Tu mente no está en venta.
