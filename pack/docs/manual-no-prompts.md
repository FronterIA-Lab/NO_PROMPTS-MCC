# NO.PROMPTS — Manual v0.9

FronterIA-Lab · Sonora  
Método: Calibración Contextual (MCC)  
Autora: Dolores Méndez Valdez  
Versión: 0.9 · borrador de producción

PDF de diseño: `NO-PROMPTS-manual-v0.9.pdf` (esta carpeta y `corpus/catalog/`).

No son 500 prompts. Son 16 exigencias — y una manera de saber si funcionaron.

Un prompt le pide a la máquina que adivine mejor. Una exigencia la obliga a mostrar de dónde salió el número.

Este archivo es la edición en texto del v0.9 para copiar y para la herramienta local. El PDF manda en diseño.

## Empieza aquí

Tres cosas que hace la máquina cuando no la calibras:

1. Te habla igual cuando sabe y cuando inventa.
2. Te da una respuesta y descartó cuatro sin decírtelo.
3. Le responde a un cliente que no eres tú.

No uses las dieciséis cada vez. Son un banco, no una lista de tareas.

| Si tienes | Usa |
| --- | --- |
| Dos minutos | Exigencia 1 y exigencia 12 |
| Diez minutos | Movimiento A completo (1 a 4) y exigencia 10 |
| Una decisión que duele | Las dieciséis, en orden |

## Antes de empezar — Yoliztli

Tres líneas. Pégalas al inicio de cada conversación importante durante el próximo año.

| Línea | Qué va ahí |
| --- | --- |
| Quién soy | Oficio, tamaño, años, a quién le vendes o a quién atiendes |
| Mi techo | Dinero, horas y ayuda con los que realmente cuentas esta semana |
| Mi terreno | Municipio, temporada, cómo te paga la gente, qué servicios no llegan |

Tus números no tienen por qué salir de tu casa. Tres velos: **proporciones**, **base 100**, **factor propio**.

## A · Dile dónde estás parado (1–4)

### 01 Quién soy · CONTEXT_DECLARE

«Antes de responder: tengo [oficio o negocio] en [ciudad], con [cuántas personas], [cuántos años] operando. Mis clientes son [quiénes]. Me pagan [cómo]. Responde para esa situación, no para una empresa promedio.»

- Aceptable: usa por lo menos dos de tus datos y algo cambia por ellos.
- Fallo: repite tus datos al principio, en tono amable, y después contesta exactamente lo mismo que habría contestado sin ellos.

### 02 Mi techo real · CONSTRAINT_SET

«Mi techo real: dispongo de [cuánto dinero] y [cuántas horas a la semana]. No tengo [contador / empleados / crédito / internet estable]. Todo lo que pase de ese techo, deséchalo tú antes de dármelo, y dime qué desechaste y por qué.»

- Aceptable: lista corta de lo que descartó.
- Fallo: «Podrías considerar contratar a alguien» después de que le dijiste que no tienes para pagar a nadie.

### 03 Dónde vivo · LOCALE_INJECT

«Estoy en [municipio, estado]. Aquí [la gente paga en efectivo / hay temporada de X / el trámite lo lleva Y / no llega el servicio Z]. Marca cada parte de tu respuesta que dé por hecho otro país, otra moneda u otro sistema, y corrígela. Si no sabes cómo es aquí, dilo en vez de suponer.»

- Aceptable: supuestos corregidos o declarados como desconocidos.
- Fallo: dice «adaptado a México» y no señala una sola cosa que haya cambiado.

### 04 La palabra que no conoce · REGISTER_VERIFY

«Voy a usar la palabra [una palabra de tu oficio, de tu región o de tu lengua]. Antes de seguir: dime qué entiendes por ella. Si no la reconoces, dímelo.»

- Aceptable: reconoce que no la conoce, o la define de un modo que tú puedes verificar.
- Fallo: te la corrige, la traduce sin avisar, o inventa una definición con seguridad.

El ejemplo de esta exigencia tiene que ser tuyo.

## B · Rómpele la respuesta única (5–8)

### 05 Dos lógicas, no dos opciones · FORK_LOGIC

«No me des una sola salida. Dame dos que funcionen con lógicas distintas: una pensada para crecer y otra pensada para aguantar. Que se contradigan en al menos una acción concreta. No las combines ni me digas cuál prefieres.»

- Fallo: la misma ruta con distinto adjetivo.

### 06 El abogado del diablo · COUNTER_GENERATE

«Ahora arma el mejor argumento en contra de tu propia recomendación. No un “depende”: el escenario concreto en que hacerte caso me hace perder dinero, qué tendría que pasar para que ocurra, y cómo lo veo venir antes.»

- Fallo: «Todo depende de tu contexto.»

### 07 El costo oculto · COST_EXPOSE

«Dame tres costos de esto que no me hayas mencionado. De cada uno: quién lo cobra, en qué momento aparece, y cómo lo compruebo yo sin preguntarte.»

- Fallo: costos que no son costos: «tiempo», «curva de aprendizaje».

### 08 La tensión sin resolver · TENSION_HOLD

«Dame la opción más rentable y la opción más justa. De cada una: quién gana y quién paga, con nombre. No las juntes, no me recomiendes una, no busques el punto medio. Quiero ver la tensión.»

- Fallo: te inventa una tercera opción «equilibrada».

## C · El juez eres tú (9–12)

### 09 La fuente o nada · SOURCE_DEMAND

«Cada dato duro que uses: dime de dónde sale y de qué año. Si no puedes darme la fuente, escribe al lado “sin fuente” y sigue.»

- Fallo: «estudios recientes», «los expertos coinciden».

### 10 El calibrador · KNOWN_PROBE · la exigencia central

Paso 1. «Te doy los datos de [un periodo que ya pasó]. Con eso, dime qué pasó en [el periodo siguiente].» — Tú ya sabes qué pasó. No se lo digas todavía.

Paso 2. «Esto fue lo que pasó de verdad. Dime en qué porcentaje te equivocaste y en qué exactamente.»

Paso 3. «Ahora sí: proyecta [el periodo que viene]. Dame tres números —bajo, medio y alto—, la lista de supuestos, y el único dato que más reduciría tu incertidumbre.»

No le preguntes del 1 al 100 qué tan seguro está. Ese número lo escribe la misma máquina.

### 11 El careo · CROSS_MODEL

Copia tu pregunta, palabra por palabra, y pégala en una segunda máquina de otra empresa. No le cuentes a ninguna lo que dijo la otra. Si divergen y las dos suenan igual de seguras, la seguridad no viene de la evidencia.

Fallo tuyo: quedarte con la respuesta que más te gustó.

### 12 El punto débil · CONFIDENCE_INVERT

«De todo lo que acabas de decirme, señálame las dos partes en las que estás más flojo y por qué. No me des un porcentaje: dime qué parte y qué le falta.»

Si sólo vas a usar una, usa esta.

## D · Sal con criterio, no con respuesta (13–16)

### 13 El marco · CRITERIA_EXTRACT

«No me digas qué hacer. Dime qué tengo que mirar para decidirlo yo. Cada criterio con un número.»

- Fallo: adjetivos en vez de umbrales (razonable, adecuado).

### 14 Las preguntas correctas · QUESTION_GENERATE

«No me des respuestas. Dame las diez preguntas que yo debería hacerme antes de decidir esto, ordenadas por cuánto cambia mi decisión la respuesta. Marca las tres que puedo contestar hoy con lo que ya sé.»

### 15 El andamio vacío · STRUCTURE_EXTRACT

«Dame la estructura sin el contenido. […] No los llenes tú, ni con ejemplos.»

- Fallo: el documento ya escrito, con datos plausibles. Es lo más peligroso del manual.

### 16 La salida · EXIT_PROTOCOL

«Dame tres señales que yo pueda ver en mi negocio —cada una con número y con fecha— […] Y dime bajo qué condición debo abandonarlo.»

- Fallo: «Monitorea tus resultados y ajusta según sea necesario.»

## Al terminar — ocho preguntas

Sobre la respuesta: 1) ¿marcó lo que no sabe? 2) ¿más de una lógica? 3) ¿criterios con números? 4) ¿puedo evaluar sin volver a preguntarle?

Sobre ti: 5) ¿qué dejé fuera? 6) ¿la contradicción es la de verdad? 7) ¿estoy usando esto para pensar, o para que alguien más piense por mí? 8) ¿lo puedo usar sin la máquina?

Si la 7 y la 8 salen mal: cierra el chat y vuelve mañana.

## Si sólo te acuerdas de una cosa

Antes de creerle: pídele que prediga algo que tú ya sabes (10) y pídele su punto más flojo (12).
