# NO_PROMPTS-MCC

**Pack de No-Prompts MCC + Plantilla Yoliztli**  
FronterIA-Lab [Indioyori] · $37 USD / $690 MXN · CC BY-NC-SA 4.0

El mercado está saturado de *“500 prompts para ChatGPT”*. Esos packs entrenan la servidumbre: le pides a un Transformer que te dé *la* respuesta, y te la da con certeza sin sustancia. Este repositorio empaqueta lo contrario.

> Esos son basura. La IA miente con seguridad. Aquí está el método para que te dé respuestas útiles en lugar de halagos. Y de paso, la plantilla para que los datos sean tuyos, no de la nube.

- Abrir la **landing**: [`index.html`](index.html)
- Abrir la **herramienta local** (el producto): [`pack/abrir-aqui.html`](pack/abrir-aqui.html)
- Atlas de 16 glifos: [`protocolo/atlas.md`](protocolo/atlas.md)

No necesita cuenta, build ni internet. Los números de la plantilla viven en `localStorage`.

## Qué es el producto

Tres piezas, una sola lógica: anclar el modelo a la realidad material **antes** de dejarlo hablar de dinero.

| Pieza | Archivo | Capa MCC |
| --- | --- | --- |
| Plantilla Yoliztli | `pack/abrir-aqui.html` + `pack/plantillas/yoliztli.csv` | Capa 1 + glifo 3.2 KNOWN_PROBE |
| Manual de 8 No-Prompts | `pack/docs/manual-no-prompts.md` | Capas 2–4, lenguaje de negocio |
| Guía de evaluación | `pack/docs/checklist.md` | Capa 3: el canal de certeza que el modelo no tiene |

Los 8 No-Prompts no son hechizos. Son glifos traducidos:

1. Yoliztli Declare · 2. Locale Inject · 3. Known Probe · 4. Fork Logic  
5. Cost Expose · 6. Tension Hold · 7. Source or Silence · 8. Framework Exit

Secuencia ritual: **Capa 1 → Glifo 3.2 → Capa 2 → Capa 3 → Capa 4**.

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
