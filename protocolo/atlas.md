# Atlas MCC — 4 capas · 16 glifos

Especificación operativa condensada. Fuente: *MCC. Protocolo de Calibración Contextual para Gramática Computacional* (Méndez Valdez, FronterIA-Lab / GT EPICC—CLACSO, julio 2026).

Tres propiedades no declaradas del Transformer:

1. **Certeza sin sustancia** — el tono de saber y el de inventar son la misma distribución de tokens.
2. **Optimización silenciosa** — converge a una respuesta y descarta el resto sin reportarlo.
3. **Sesgo de contexto implícito** — el default del corpus no es el Sur Global.

El MCC interviene desde la capa de interacción. No toca pesos. No pide fine-tuning. Independiente de proveedor.

## Secuencia recomendada

Capa 1 → Glifo 3.2 (KNOWN_PROBE) → Capa 2 → Capa 3 completa → Capa 4.

## Capa 1 — Declaración de contexto

Inyección de variables que el espacio de embeddings no tiene.

| Glifo | Nombre | Operación |
| --- | --- | --- |
| 1.1 | CONTEXT_DECLARE | Identidad situacional. Corrección de variable, no personalización. |
| 1.2 | CONSTRAINT_SET | Techo real de tiempo, dinero, acceso, infraestructura. |
| 1.3 | LOCALE_INJECT | Entorno económico, geográfico, cultural. Data, no decorado. |
| 1.4 | REGISTER_VERIFY | Vocabulario situado. Si el modelo “corrige”, marcaste el borde del corpus. |

## Capa 2 — Bifurcación de output

Forzar divergencia. La función objetivo produce UNA respuesta de máxima verosimilitud.

| Glifo | Nombre | Operación |
| --- | --- | --- |
| 2.1 | FORK_LOGIC | Otra lógica, no otra opción. |
| 2.2 | COUNTER_GENERATE | Mejor argumento contra su propia respuesta. |
| 2.3 | COST_EXPOSE | Trade-offs. Los costos se omiten porque bajan la verosimilitud percibida. |
| 2.4 | TENSION_HOLD | Eficiente y ética a la vez, sin reconciliar. |

## Capa 3 — Verificación de certeza

El canal de confianza que la arquitectura no provee.

| Glifo | Nombre | Operación |
| --- | --- | --- |
| 3.1 | SOURCE_DEMAND | Fuente primaria o no verificado. |
| 3.2 | KNOWN_PROBE | Calibrar contra el Yoliztli. La operación más importante. |
| 3.3 | CROSS_MODEL | Misma query, dos modelos. Misma certeza + divergencia = formato, no evidencia. |
| 3.4 | CONFIDENCE_INVERT | Que declare sus puntos de menor confianza. |

## Capa 4 — Extracción de frameworks

Una solución crea dependencia. Un marco crea capacidad.

| Glifo | Nombre | Operación |
| --- | --- | --- |
| 4.1 | CRITERIA_EXTRACT | ¿Qué criterios evalúo? |
| 4.2 | QUESTION_GENERATE | Preguntas para el usuario, no respuestas para memorizar. |
| 4.3 | STRUCTURE_EXTRACT | Andamio vacío. El material lo pone quien vive el problema. |
| 4.4 | EXIT_PROTOCOL | Señales observables en la realidad, independientes del modelo. |

## Glosario mínimo

- **Yoliztli** — vida / existencia / ser vivido. Contexto material del usuario.
- **Yolmatiliztli** — conocimiento caliente, encarnado, territorial.
- **Olvido estructural** — inaccesibilidad condicionada por la forma de la pregunta, no borrado de pesos.
- **Gramática de optimización** — convergencia a máxima verosimilitud presentada como *la* respuesta.
- **Software Colonial V3.0** — la IA como actualización del despojo cognitivo-territorial.
- **ISD** — Índice de Soberanía de Decisión. ISD = C1×0.35 + C2×0.30 + C3×0.20 + C4×0.15 (IVAES).
