# Manual de 8 No-Prompts MCC

**Pack No-Prompts MCC + Plantilla de Control**  
FronterIA-Lab [Indioyori] · Dolores Méndez Valdez  
Licencia: CC BY-NC-SA 4.0

Esto **no** es un pack de prompts. El mercado vende halagos con formato de productividad. Aquí hay ocho intervenciones sobre la gramática de un modelo Transformer. Cada No-Prompt corresponde a glifos del Método de Calibración Contextual.

Secuencia ritual (no negociable):

1. Capa 1 — declaración de contexto (NP-01, NP-02)
2. Glifo 3.2 — calibración KNOWN_PROBE (NP-03)
3. Capa 2 — bifurcación (NP-04, NP-05, NP-06)
4. Capa 3 — certeza (NP-07)
5. Capa 4 — marco y salida (NP-08)

Si saltas la calibración, estás pesando con una báscula sin tarar.

El LLM es asistente, no árbitro. La autoridad epistémica reside en tu Yolmatiliztli.

Rellena los corchetes con tu plantilla Yoliztli, o usa `pack/abrir-aqui.html` para que se rellenen solos.

---

## NP-01 · Yoliztli Declare

Capa 1 · CONTEXT_DECLARE + CONSTRAINT_SET

```
NO_PROMPT 01 — DECLARACIÓN DE YOLIZTLI
No me asumas. No completes mis vacíos con el perfil por defecto de tu corpus (Norte Global, liquidez, tiempo libre, inglés). El LLM es asistente, no árbitro. La autoridad epistémica reside en mi Yolmatiliztli.

Identidad situacional:
- Soy: [quién eres, sin romanticismo]
- Territorio: [municipio, estado, país]
- Mes en curso: [mes / año]

Restricciones materiales vigentes:
- Tiempo disponible: [horas/semana]
- Efectivo disponible: [moneda y cantidad]
- Deuda o compromiso ineludible: [qué / cuánto]
- Cuidado o trabajo no remunerado: [quién depende de ti]
- Infraestructura: [dispositivo, conectividad, banco, factura]

Instrucción:
Antes de responder, reescribe mi situación en tres frases para que yo verifique que me viste. Si no puedes reconstruir mis restricciones, NO des recomendaciones. Pregunta. Cualquier solución que ignore este techo es ruido.
```

---

## NP-02 · Locale Inject

Capa 1 · LOCALE_INJECT + REGISTER_VERIFY

```
NO_PROMPT 02 — TERRITORIO, NO DEFAULT
Opera en mi locale. No traduzcas mi vida al inglés ni a "best practices" de Silicon Valley.

- Moneda: [MXN u otra]
- Fiscalidad: [Régimen SAT / informal / cooperativa / otro]
- Banca y circuito: [SPEI, OXXO, efectivo, tandas, cooperativa]
- Territorio: [región]
- Vocabulario situado (no lo corrijas): [palabras de tu pueblo, oficio o casa]

Si no reconoces un término, márcalo como FUERA DE DISTRIBUCIÓN. No lo normalices. Esa frontera es dato: indica dónde tu corpus no tiene jurisdicción sobre mi realidad.
No recomiendes productos, APIs o bancos que no operen en mi circuito material.
```

---

## NP-03 · Known Probe

Capa 3 · Glifo 3.2 — la operación más importante del protocolo.

```
NO_PROMPT 03 — CALIBRACIÓN CONTRA LO YA VIVIDO
Antes de analizar mis finanzas, responde SOLO con números o hechos a preguntas cuya respuesta YO YA CONOZCO (pestaña KNOWN_PROBE de mi plantilla Yoliztli). No busques. No redondees. No inventes. Si no lo sabes, escribe NO LO SÉ.

1. ¿Cuánto te entró el mes pasado (total)?
2. ¿Cuál fue tu gasto más grande y de cuánto?
3. ¿Cuánto pagaste de luz / internet / renta?
4. ¿Cuántas personas dependen de tu ingreso?
5. ¿Cuál es tu techo de efectivo disponible esta semana?

Después compararé tus respuestas con mi plantilla. El porcentaje de error es tu línea base de Certeza sin Sustancia para esta sesión. Si fallas, todas tus recomendaciones posteriores se marcan NO CALIBRADAS y no las ejecutaré.
```

---

## NP-04 · Fork Logic

Capa 2 · FORK_LOGIC + COUNTER_GENERATE

```
NO_PROMPT 04 — OTRA LÓGICA, NO OTRA OPCIÓN
Sobre mi situación (la declarada en NP-01):

1. Dame DOS respuestas que operen con lógicas diferentes, no con variaciones de la misma lógica. Ejemplo de contraste válido: lógica de eficiencia de caja vs. lógica de cuidado y territorio. No me des "plan A agresivo / plan A suave".
2. Después genera la mejor argumentación CONTRA tu respuesta más elocuente. Si el contraargumento es igual de fuerte, tu respuesta original no contenía certeza: contenía elocuencia.
3. Declara qué descartaste al converger y por qué no me lo ibas a decir.
```

---

## NP-05 · Cost Expose

Capa 2 · COST_EXPOSE

```
NO_PROMPT 05 — LOS COSTOS SON EL DATO
Cualquier recomendación financiera o de herramientas debe declarar, en tabla:

- Costo en [moneda] (comisiones, intereses, mensualidades, "gratis" que se paga con datos)
- Costo en tiempo (horas mías, no del modelo)
- Costo en infraestructura (mi dispositivo y conectividad reales)
- Costo en soberanía (¿mis datos salen? ¿puedo exportar? ¿quién es el árbitro si falla?)
- Qué se rompe si mi mes sale peor de lo que asumes

Si no puedes llenar una fila, escríbela como DESCONOCIDO. No la suavices. No reconcilies. Los costos omitidos son violencia epistémica cuando quien paga soy yo.
```

---

## NP-06 · Tension Hold

Capa 2 · TENSION_HOLD

```
NO_PROMPT 06 — SOSTÉN LA TENSIÓN
Presenta simultáneamente:
A) la opción más eficiente según tu gramática de optimización
B) la opción que respete el protocolo ético de mi comunidad y mis restricciones de cuidado

No las reconcilies. No me des un "equilibrio" ni un "punto medio". La tensión entre ambas es información. La reconciliación es pérdida de información.

Yo decido. Tú no. Si sientes la urgencia de cerrar la contradicción, esa urgencia es el modelo, no mi vida.
```

---

## NP-07 · Source or Silence

Capa 3 · SOURCE_DEMAND + CONFIDENCE_INVERT

```
NO_PROMPT 07 — FUENTE O SILENCIO
Para cada afirmación factual (tasas, plazos, requisitos SAT, rendimientos, hashes, fechas, versiones, "según expertos"):

- Exige fuente primaria: ley, DOF, SAT, CONDUSEF, contrato, estado de cuenta, paper con página.
- Si no puedes proveerla, o solo tienes blogs y listicles, marca el dato NO VERIFICADO.
- Declara tus puntos de MENOR confianza dentro de tu propia respuesta (CONFIDENCE_INVERT).
- Prohibido inventar identificadores técnicos, cifras exactas o citas. Prefiero un NO LO SÉ a una certeza sin sustancia. El costo de tu elocuencia lo pago yo en tiempo no recuperable.
```

---

## NP-08 · Framework Exit

Capa 4 · CRITERIA_EXTRACT + STRUCTURE_EXTRACT + EXIT_PROTOCOL

```
NO_PROMPT 08 — NO ME DES EL PLAN. DAME EL MARCO.
Sustituye "qué hago" por:

1. CRITERIOS que yo debería evaluar con mi Yoliztli.
2. PREGUNTAS que yo debería hacerme, no respuestas para memorizar.
3. ESTRUCTURA vacía para que yo la llene con mis números. Tú el andamio; yo el material.
4. EXIT_PROTOCOL: señales observables en mi realidad —independientes de ti— que indicarían si la decisión funciona o no a 7, 30 y 90 días.

Entra a esta sesión con una pregunta. Salgo con capacidad de evaluar. Si me das un plan cerrado, has violado la Capa 4.
```

---

## Cómo usarlo en 20 minutos

1. Abre `abrir-aqui.html` (sin internet).
2. Llena Yoliztli con números del mes pasado, no con deseos.
3. Copia NP-01 y NP-02. Verifica que el modelo te haya visto.
4. Copia NP-03. Anota sus respuestas en Known Probe. Si el fallo es alto: para.
5. Sigue con NP-04 a NP-08 según lo que necesites.
6. Pasa el checklist de 10 preguntas. Menos de 8/10: no ejecutes.

Independencia de modelo: ChatGPT, Claude, Grok, DeepSeek, Qwen, Llama local. El protocolo opera sobre la capa de interacción.
