/* Pack NO.PROMPTS MCC · FronterIA-Lab · Sonora
   Fuente: manual v0.9 (Dolores Méndez Valdez). Estado en localStorage. */
(function () {
  "use strict";

  const KEY = "mcc-yoliztli-v2";

  const DEFAULT = {
    perfil: {
      quien: "",
      ciudad: "",
      personas: "",
      anios: "",
      clientes: "",
      pago: "",
      dinero: "",
      horas: "",
      notengo: "",
      municipio: "",
      temporada: "",
      terreno: "",
      palabra: "",
      velo: "proporciones",
      factor: "",
    },
    ingresos: [{ concepto: "Lo que entra", monto: "" }],
    gastos: [{ concepto: "Lo que sale", monto: "" }],
    probe: {
      periodoPasado: "",
      periodoSiguiente: "",
      conocido: "",
      prediccion: "",
      errorPct: "",
      periodoNuevo: "",
    },
    checklist: Array(8).fill(false),
    isd: { c1: 70, c2: 50, c3: 40, c4: 30 },
    bitacora: "",
    filtro: "todas",
  };

  const CHECKS = [
    { lado: "Sobre la respuesta", q: "¿Marcó en algún lugar qué es lo que no sabe?" },
    { lado: "Sobre la respuesta", q: "¿Me dio más de una lógica, o una sola con dos nombres?" },
    { lado: "Sobre la respuesta", q: "¿Los criterios traen números, o traen adjetivos?" },
    { lado: "Sobre la respuesta", q: "¿Puedo evaluar si esto funcionó sin volver a preguntarle?" },
    { lado: "Sobre ti", q: "¿Qué dejé fuera al describir mi situación? ¿A quién no nombré?" },
    { lado: "Sobre ti", q: "La contradicción que le exigí, ¿es la de verdad, o me está tapando una más incómoda?" },
    { lado: "Sobre ti", q: "¿Estoy usando esto para pensar, o para que alguien más piense por mí?" },
    { lado: "Sobre ti", q: "Lo que aprendí aquí, ¿lo puedo usar sin la máquina?" },
  ];

  const EXIGENCIAS = [
    {
      n: 1, mov: "A", glifo: "CONTEXT_DECLARE", titulo: "Quién soy",
      skip: "Te contesta para una empresa promedio de otro país. Tú descartas media respuesta y crees que el problema es tuyo.",
      ok: "Usa por lo menos dos de tus datos y algo cambia por ellos.",
      fail: "Repite tus datos al principio, en tono amable, y después contesta exactamente lo mismo que habría contestado sin ellos.",
      body: (p) =>
        `Antes de responder: tengo ${p.quien || "[oficio o negocio]"} en ${p.ciudad || "[ciudad]"}, con ${p.personas || "[cuántas personas]"}, ${p.anios || "[cuántos años]"} operando. Mis clientes son ${p.clientes || "[quiénes]"}. Me pagan ${p.pago || "[cómo]"}. Responde para esa situación, no para una empresa promedio.`,
    },
    {
      n: 2, mov: "A", glifo: "CONSTRAINT_SET", titulo: "Mi techo real",
      skip: "Te propone cosas que cuestan dinero, tiempo o gente que no tienes. Te deja una lista de la que sólo puedes hacer dos renglones.",
      ok: "Te entrega una lista corta de lo que descartó. Esa lista vale tanto como la respuesta.",
      fail: "«Podrías considerar contratar a alguien», después de que le dijiste que no tienes para pagar a nadie.",
      body: (p) =>
        `Mi techo real: dispongo de ${p.dinero || "[cuánto dinero]"} y ${p.horas || "[cuántas horas a la semana]"}. No tengo ${p.notengo || "[contador / empleados / crédito / internet estable]"}. Todo lo que pase de ese techo, deséchalo tú antes de dármelo, y dime qué desechaste y por qué.`,
    },
    {
      n: 3, mov: "A", glifo: "LOCALE_INJECT", titulo: "Dónde vivo",
      skip: "Te habla de leyes, precios, plataformas, bancos y costumbres de otro lugar, con total seguridad.",
      ok: "Te devuelve una lista de supuestos corregidos, o declarados como desconocidos.",
      fail: "Dice «adaptado a México» y no señala una sola cosa que haya cambiado.",
      body: (p) =>
        `Estoy en ${p.municipio || "[municipio, estado]"}. Aquí ${p.terreno || "[la gente paga en efectivo / hay temporada de X / el trámite lo lleva Y / no llega el servicio Z]"}${p.temporada ? " Temporada: " + p.temporada + "." : ""} Marca cada parte de tu respuesta que dé por hecho otro país, otra moneda u otro sistema, y corrígela. Si no sabes cómo es aquí, dilo en vez de suponer.`,
    },
    {
      n: 4, mov: "A", glifo: "REGISTER_VERIFY", titulo: "La palabra que no conoce",
      skip: "Para encontrar el borde. De un lado del borde la máquina sabe; del otro rellena. Y no te va a avisar cuándo lo cruzó.",
      ok: "Reconoce que no la conoce, o la define de un modo que tú puedes verificar porque la palabra es tuya.",
      fail: "Te la corrige por otra parecida. La traduce sin avisar. O inventa una definición con seguridad.",
      body: (p) =>
        `Voy a usar la palabra ${p.palabra || "[una palabra de tu oficio, de tu región o de tu lengua]"}. Antes de seguir: dime qué entiendes por ella. Si no la reconoces, dímelo.`,
    },
    {
      n: 5, mov: "B", glifo: "FORK_LOGIC", titulo: "Dos lógicas, no dos opciones",
      skip: "Te quedas con la única salida que se te ocurrió, que además no se te ocurrió a ti.",
      ok: "Las dos rutas se contradicen en algo que puedes señalar con el dedo: distinto gasto, distinto plazo, distinto orden de acciones.",
      fail: "La misma ruta con distinto adjetivo. «Agresiva» y «prudente» que terminan pidiéndote lo mismo.",
      body: () =>
        `No me des una sola salida. Dame dos que funcionen con lógicas distintas: una pensada para crecer y otra pensada para aguantar. Que se contradigan en al menos una acción concreta. No las combines ni me digas cuál prefieres.`,
    },
    {
      n: 6, mov: "B", glifo: "COUNTER_GENERATE", titulo: "El abogado del diablo",
      skip: "No sabes si te convenció porque tiene razón o porque escribe bien.",
      ok: "Nombra una condición que tú puedes observar, con un número o una fecha.",
      fail: "«Todo depende de tu contexto.» «Como en toda decisión, existen riesgos.»",
      body: () =>
        `Ahora arma el mejor argumento en contra de tu propia recomendación. No un “depende”: el escenario concreto en que hacerte caso me hace perder dinero, qué tendría que pasar para que ocurra, y cómo lo veo venir antes.`,
    },
    {
      n: 7, mov: "B", glifo: "COST_EXPOSE", titulo: "El costo oculto",
      skip: "Te reporta beneficios y se guarda los costos, porque los costos hacen que su respuesta se vea menos buena.",
      ok: "Cada costo trae las tres cosas: quién, cuándo y cómo verificarlo.",
      fail: "Costos que no son costos: «tiempo», «curva de aprendizaje», «esfuerzo de adaptación».",
      body: () =>
        `Dame tres costos de esto que no me hayas mencionado. De cada uno: quién lo cobra, en qué momento aparece, y cómo lo compruebo yo sin preguntarte.`,
    },
    {
      n: 8, mov: "B", glifo: "TENSION_HOLD", titulo: "La tensión sin resolver",
      skip: "Cuando algo tiene un lado de dinero y un lado de gente, te entrega un punto medio que no sirve para ninguno de los dos.",
      ok: "Dos opciones separadas, con beneficiado y perjudicado nombrados, y la tensión abierta al final.",
      fail: "Te inventa una tercera opción «equilibrada» que no incomoda a nadie.",
      body: () =>
        `Dame la opción más rentable y la opción más justa. De cada una: quién gana y quién paga, con nombre. No las juntes, no me recomiendes una, no busques el punto medio. Quiero ver la tensión.`,
    },
    {
      n: 9, mov: "C", glifo: "SOURCE_DEMAND", titulo: "La fuente o nada",
      skip: "Su tono de seguridad es el mismo cuando sabe y cuando inventa.",
      ok: "Los datos vienen marcados, y hay al menos uno que dice «sin fuente». Si ninguno lo dice, desconfía.",
      fail: "Todas las fuentes son genéricas: «estudios recientes», «los expertos coinciden», «según datos del sector».",
      body: () =>
        `Cada dato duro que uses: dime de dónde sale y de qué año. Si no puedes darme la fuente, escribe al lado “sin fuente” y sigue. Prefiero un dato marcado que un dato inventado.`,
    },
    {
      n: 10, mov: "C", glifo: "KNOWN_PROBE", titulo: "El calibrador",
      skip: "Para medir cuánto se equivoca hoy, contigo, antes de creerle nada. Es lo mismo que calibrar una báscula contra un peso que ya conoces.",
      ok: "Reconoce el error con un número. Entrega rango, no cifra única. Los supuestos son cosas que tú puedes ir a verificar.",
      fail: "Una sola cifra. Se salta el paso 2. Llama «estimación conservadora» a un número que no salió de ningún lado.",
      body: (p, s) => {
        const pr = (s && s.probe) || {};
        return `Paso 1. Te doy los datos de ${pr.periodoPasado || "[un periodo que ya pasó]"}. Con eso, dime qué pasó en ${pr.periodoSiguiente || "[el periodo siguiente]"}.
Paso 2. (Después de que te responda, pega esto.) Esto fue lo que pasó de verdad: ${pr.conocido || "[lo que tú ya sabes]"}. Dime en qué porcentaje te equivocaste y en qué exactamente.
Paso 3. Ahora sí: proyecta ${pr.periodoNuevo || "[el periodo que viene]"}. Dame tres números —bajo, medio y alto—, la lista de supuestos que usaste, y el único dato que más reduciría tu incertidumbre.`;
      },
    },
    {
      n: 11, mov: "C", glifo: "CROSS_MODEL", titulo: "El careo",
      skip: "Cuesta cero y es la verificación más rápida que existe. Ya tienes dos pestañas abiertas.",
      ok: "Si coinciden en lo esencial, súbele la confianza. Si divergen y las dos suenan igual de seguras, la seguridad no viene de la evidencia.",
      fail: "Quedarte con la respuesta que más te gustó. Ahí no calibraste: escogiste.",
      body: () =>
        `Copia tu pregunta, palabra por palabra, y pégala en una segunda máquina de otra empresa. No le cuentes a ninguna lo que dijo la otra.`,
    },
    {
      n: 12, mov: "C", glifo: "CONFIDENCE_INVERT", titulo: "El punto débil",
      skip: "Es la exigencia más corta del manual y la que más rápido cambia una conversación. Si sólo vas a usar una, usa esta.",
      ok: "Señala partes concretas de su propio texto y dice qué les falta.",
      fail: "Dice que todo está bien fundamentado, o te devuelve un porcentaje.",
      body: () =>
        `De todo lo que acabas de decirme, señálame las dos partes en las que estás más flojo y por qué. No me des un porcentaje: dime qué parte y qué le falta.`,
    },
    {
      n: 13, mov: "D", glifo: "CRITERIA_EXTRACT", titulo: "El marco",
      skip: "Una respuesta se caduca y te deja volviendo. Un criterio te sirve el año que viene y sin la máquina.",
      ok: "Cada criterio trae número y unidad. Lo puedes aplicar mañana sin volver al chat.",
      fail: "Adjetivos en lugar de umbrales: relevante, adecuado, razonable, saludable, significativo.",
      body: () =>
        `No me digas qué hacer. Dime qué tengo que mirar para decidirlo yo. Cada criterio con un número: no “si el gasto es alto”, sino “si el gasto pasa del X % de lo que entra”.`,
    },
    {
      n: 14, mov: "D", glifo: "QUESTION_GENERATE", titulo: "Las preguntas correctas",
      skip: "Esta exigencia invierte quién le pregunta a quién. Es incómoda al principio.",
      ok: "Hay un orden justificado, y separa lo que puedes contestar hoy de lo que necesita datos nuevos.",
      fail: "Diez preguntas intercambiables, todas del mismo peso.",
      body: () =>
        `No me des respuestas. Dame las diez preguntas que yo debería hacerme antes de decidir esto, ordenadas por cuánto cambia mi decisión la respuesta. Marca las tres que puedo contestar hoy con lo que ya sé.`,
    },
    {
      n: 15, mov: "D", glifo: "STRUCTURE_EXTRACT", titulo: "El andamio vacío",
      skip: "Lo más peligroso del manual: un documento completo que parece tuyo y no lo es.",
      ok: "Te entrega huecos.",
      fail: "Te entrega el documento ya escrito, con datos plausibles que se ven bien y que nadie verificó.",
      body: () =>
        `Dame la estructura sin el contenido. El esqueleto del [plan, la carta, el presupuesto, la propuesta], con los huecos marcados, para que yo los llene con lo mío. No los llenes tú, ni con ejemplos.`,
    },
    {
      n: 16, mov: "D", glifo: "EXIT_PROTOCOL", titulo: "La salida",
      skip: "Si al terminar no puedes juzgar el resultado sin la máquina, la conversación no sirvió, por buena que se haya visto.",
      ok: "Umbral, fecha y condición de abandono, las tres cosas.",
      fail: "«Monitorea tus resultados y ajusta según sea necesario.»",
      body: () =>
        `Dame tres señales que yo pueda ver en mi negocio —cada una con número y con fecha— que me digan si esto está funcionando, sin tener que volver a preguntarte. Y dime bajo qué condición debo abandonarlo.`,
    },
  ];

  const FILTROS = {
    todas: () => true,
    "2min": (e) => e.n === 1 || e.n === 12,
    "10min": (e) => e.n <= 4 || e.n === 10,
    duele: () => true,
    A: (e) => e.mov === "A",
    B: (e) => e.mov === "B",
    C: (e) => e.mov === "C",
    D: (e) => e.mov === "D",
  };

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return structuredClone(DEFAULT);
      return deepMerge(structuredClone(DEFAULT), JSON.parse(raw));
    } catch (e) {
      return structuredClone(DEFAULT);
    }
  }

  function save(state) {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  function deepMerge(base, extra) {
    if (typeof extra !== "object" || extra === null) return base;
    Object.keys(extra).forEach((k) => {
      if (Array.isArray(extra[k])) base[k] = extra[k];
      else if (typeof extra[k] === "object" && extra[k] && typeof base[k] === "object") deepMerge(base[k], extra[k]);
      else base[k] = extra[k];
    });
    return base;
  }

  function $(sel) {
    return document.querySelector(sel);
  }

  function esc(t) {
    return String(t || "")
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;");
  }

  function tresLineas(p) {
    return `Quién soy: ${p.quien || "[oficio, tamaño, años, a quién le vendes]"} en ${p.ciudad || "[ciudad]"}.
Mi techo: ${p.dinero || "[dinero]"} y ${p.horas || "[horas]"} esta semana. No tengo ${p.notengo || "[qué no tienes]"}.
Mi terreno: ${p.municipio || "[municipio]"}. ${p.terreno || "[cómo te paga la gente, qué servicios no llegan]"}`;
  }

  function show(id) {
    document.querySelectorAll(".view").forEach((v) => v.classList.remove("active"));
    document.querySelectorAll(".navbtn").forEach((b) => b.classList.toggle("active", b.dataset.view === id));
    const view = document.getElementById("view-" + id);
    if (view) view.classList.add("active");
    if (id === "prompts") renderPrompts();
    if (id === "checklist") renderChecklist();
    if (id === "isd") renderIsd();
    if (id === "probe") renderProbe();
    if (id === "hoja") renderHoja();
    window.scrollTo(0, 0);
  }

  function fillPerfil() {
    const s = load();
    Object.keys(s.perfil).forEach((k) => {
      const el = document.getElementById("p-" + k);
      if (el) el.value = s.perfil[k] || "";
    });
    renderLedger();
    const bit = $("#bitacora");
    if (bit) bit.value = s.bitacora || "";
    const tres = $("#tres-lineas");
    if (tres) tres.textContent = tresLineas(s.perfil);
  }

  function renderLedger() {
    const s = load();
    if (!$("#ingresos")) return;
    $("#ingresos").innerHTML = tableBlock("ingresos", s.ingresos);
    $("#gastos").innerHTML = tableBlock("gastos", s.gastos);
    $("#sum-in").textContent = fmt(sum(s.ingresos));
    $("#sum-out").textContent = fmt(sum(s.gastos));
    $("#sum-net").textContent = fmt(sum(s.ingresos) - sum(s.gastos));
  }

  function tableBlock(kind, rows) {
    const body = rows
      .map(
        (r, i) => `<tr>
        <td><input data-kind="${kind}" data-i="${i}" data-f="concepto" value="${esc(r.concepto)}"></td>
        <td><input data-kind="${kind}" data-i="${i}" data-f="monto" value="${esc(r.monto)}" inputmode="decimal"></td>
        <td><button class="btn small ghost" type="button" data-del="${kind}:${i}">Quitar</button></td>
      </tr>`
      )
      .join("");
    return `<table><thead><tr><th>Concepto</th><th>Monto o proporción</th><th></th></tr></thead><tbody>${body}</tbody></table>`;
  }

  function sum(rows) {
    return rows.reduce((a, r) => a + (parseFloat(String(r.monto).replace(",", ".")) || 0), 0);
  }

  function fmt(n) {
    try {
      return new Intl.NumberFormat("es-MX").format(n);
    } catch (e) {
      return String(n);
    }
  }

  function renderPrompts() {
    const s = load();
    const pred = FILTROS[s.filtro] || FILTROS.todas;
    const list = EXIGENCIAS.filter(pred);
    $("#prompts-list").innerHTML = list
      .map((e) => {
        const text = e.body(s.perfil, s);
        return `<article class="card exigencia" style="margin-bottom:1rem">
        <span class="tag">Exigencia ${String(e.n).padStart(2, "0")} · Movimiento ${e.mov} · ${e.glifo}</span>
        <h3>${e.titulo}</h3>
        <p>${e.skip}</p>
        <pre class="prompt-box" id="box-E${e.n}">${esc(text)}</pre>
        <p class="ok-line"><strong>Aceptable.</strong> ${e.ok}</p>
        <p class="fail-line"><strong>Señal de fallo.</strong> ${e.fail}</p>
        <div class="cta-row" style="margin-top:.8rem">
          <button class="btn small" type="button" data-copy="E${e.n}">Copiar exigencia</button>
        </div>
      </article>`;
      })
      .join("");
    document.querySelectorAll("[data-filtro]").forEach((b) => {
      b.classList.toggle("active", b.dataset.filtro === s.filtro);
    });
  }

  function renderProbe() {
    const s = load();
    const pr = s.probe;
    ["periodoPasado", "periodoSiguiente", "conocido", "prediccion", "errorPct", "periodoNuevo"].forEach((k) => {
      const el = document.getElementById("pr-" + k);
      if (el) el.value = pr[k] || "";
    });
  }

  function renderChecklist() {
    const s = load();
    let html = "";
    let last = "";
    CHECKS.forEach((item, i) => {
      if (item.lado !== last) {
        html += `<p class="kicker" style="margin-top:1.2rem">${item.lado}</p>`;
        last = item.lado;
      }
      html += `<label class="check-item">
        <input type="checkbox" data-check="${i}" ${s.checklist[i] ? "checked" : ""}>
        <span><strong>${String(i + 1).padStart(2, "0")}.</strong> ${item.q}</span>
      </label>`;
    });
    $("#check-list").innerHTML = html;
    scoreChecks();
  }

  function scoreChecks() {
    const s = load();
    const n = s.checklist.filter(Boolean).length;
    const mal78 = s.checklist[6] === false || s.checklist[7] === false;
    $("#check-score").textContent = n + " / 8";
    $("#check-meter").style.width = n * 12.5 + "%";
    $("#check-verdict").textContent = mal78 && n > 0
      ? "Si la 7 y la 8 salen mal: cierra el chat y vuelve mañana. No es una falla del método: es el método avisándote."
      : n >= 6
        ? "La respuesta sirve para decidir. Tú firmas."
        : n >= 3
          ? "Todavía te está esquivando. Mira la hoja de señales."
          : "Halago con formato de consejo.";
  }

  function renderIsd() {
    const s = load();
    ["c1", "c2", "c3", "c4"].forEach((k) => {
      const el = document.getElementById(k);
      if (el) el.value = s.isd[k];
      const lab = document.getElementById(k + "-val");
      if (lab) lab.textContent = s.isd[k];
    });
    const isd = s.isd.c1 * 0.35 + s.isd.c2 * 0.3 + s.isd.c3 * 0.2 + s.isd.c4 * 0.15;
    $("#isd-total").textContent = isd.toFixed(1);
    $("#isd-meter").style.width = isd + "%";
  }

  function renderHoja() {
    $("#hoja-tabla").innerHTML = EXIGENCIAS.map(
      (e) => `<tr><td>${e.n}. ${e.titulo}</td><td>${e.fail}</td></tr>`
    ).join("");
  }

  function toast(msg) {
    const el = $("#toast");
    if (!el) return;
    el.textContent = msg;
    el.style.opacity = 1;
    setTimeout(() => (el.style.opacity = 0), 2400);
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      toast("Copiado. Pégalo en tu modelo. El dato se queda aquí.");
    } catch (e) {
      toast("No se pudo copiar. Selecciona el texto a mano.");
    }
  }

  function ritual() {
    const s = load();
    const head = tresLineas(s.perfil) + "\n\n(Pega esto al inicio. No hace falta entregar cifras en crudo.)\n\n";
    let list;
    if (s.filtro === "2min") list = EXIGENCIAS.filter(FILTROS["2min"]);
    else if (s.filtro === "10min") list = EXIGENCIAS.filter(FILTROS["10min"]);
    else list = EXIGENCIAS;
    const text = list.map((e) => `EXIGENCIA ${e.n} · ${e.titulo}\n${e.body(s.perfil, s)}`).join("\n\n────────\n\n");
    copyText(head + text);
  }

  function exportState() {
    const blob = new Blob([JSON.stringify(load(), null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "yoliztli-mcc.json";
    a.click();
  }

  function exportCsv() {
    const s = load();
    let csv = "tipo,concepto,monto\n";
    s.ingresos.forEach((r) => (csv += `ingreso,"${String(r.concepto).replace(/"/g, '""')}",${r.monto}\n`));
    s.gastos.forEach((r) => (csv += `gasto,"${String(r.concepto).replace(/"/g, '""')}",${r.monto}\n`));
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = "yoliztli.csv";
    a.click();
  }

  function importState(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        save(deepMerge(structuredClone(DEFAULT), JSON.parse(reader.result)));
        fillPerfil();
        toast("Importado. Sigue siendo local.");
      } catch (e) {
        toast("JSON inválido.");
      }
    };
    reader.readAsText(file);
  }

  function resetAll() {
    if (!confirm("Esto borra tu Yoliztli de este navegador. ¿Seguro?")) return;
    localStorage.removeItem(KEY);
    fillPerfil();
    renderPrompts();
    renderProbe();
    renderChecklist();
    toast("Memoria local vaciada.");
  }

  function persistField(e) {
    const t = e.target;
    if (t.dataset.kind) {
      const s = load();
      s[t.dataset.kind][Number(t.dataset.i)][t.dataset.f] = t.value;
      save(s);
      $("#sum-in").textContent = fmt(sum(s.ingresos));
      $("#sum-out").textContent = fmt(sum(s.gastos));
      $("#sum-net").textContent = fmt(sum(s.ingresos) - sum(s.gastos));
    }
    if (t.dataset.check !== undefined) {
      const s = load();
      s.checklist[Number(t.dataset.check)] = t.checked;
      save(s);
      scoreChecks();
    }
    if (t.id && ["c1", "c2", "c3", "c4"].includes(t.id)) {
      const s = load();
      s.isd[t.id] = Number(t.value);
      save(s);
      renderIsd();
    }
    if (t.id && t.id.startsWith("p-")) {
      const s = load();
      s.perfil[t.id.slice(2)] = t.value;
      save(s);
      const tres = $("#tres-lineas");
      if (tres) tres.textContent = tresLineas(s.perfil);
    }
    if (t.id && t.id.startsWith("pr-")) {
      const s = load();
      s.probe[t.id.slice(3)] = t.value;
      save(s);
    }
    if (t.id === "bitacora") {
      const s = load();
      s.bitacora = t.value;
      save(s);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".navbtn").forEach((btn) => {
      if (btn.dataset.view) btn.addEventListener("click", () => show(btn.dataset.view));
    });
    fillPerfil();
    renderPrompts();
    renderProbe();
    renderChecklist();
    renderIsd();
    renderHoja();

    $("#save-perfil") && $("#save-perfil").addEventListener("click", () => {
      toast("Yoliztli guardado en este navegador.");
      const tres = $("#tres-lineas");
      if (tres) tres.textContent = tresLineas(load().perfil);
    });
    $("#export-json") && $("#export-json").addEventListener("click", exportState);
    $("#export-csv") && $("#export-csv").addEventListener("click", exportCsv);
    $("#ritual") && $("#ritual").addEventListener("click", ritual);
    $("#reset") && $("#reset").addEventListener("click", resetAll);
    $("#copy-tres") && $("#copy-tres").addEventListener("click", () => copyText(tresLineas(load().perfil)));
    $("#import-json") &&
      $("#import-json").addEventListener("change", (e) => {
        if (e.target.files[0]) importState(e.target.files[0]);
      });

    document.body.addEventListener("click", (e) => {
      const copy = e.target.closest("[data-copy]");
      if (copy) {
        const pre = document.getElementById("box-" + copy.dataset.copy);
        copyText(pre ? pre.textContent : "");
      }
      const del = e.target.closest("[data-del]");
      if (del) {
        const [kind, i] = del.dataset.del.split(":");
        const s = load();
        s[kind].splice(Number(i), 1);
        if (!s[kind].length) s[kind].push({ concepto: "", monto: "" });
        save(s);
        renderLedger();
      }
      const fil = e.target.closest("[data-filtro]");
      if (fil) {
        const s = load();
        s.filtro = fil.dataset.filtro;
        save(s);
        renderPrompts();
      }
    });

    $("#add-ingreso") &&
      $("#add-ingreso").addEventListener("click", () => {
        const s = load();
        s.ingresos.push({ concepto: "", monto: "" });
        save(s);
        renderLedger();
      });
    $("#add-gasto") &&
      $("#add-gasto").addEventListener("click", () => {
        const s = load();
        s.gastos.push({ concepto: "", monto: "" });
        save(s);
        renderLedger();
      });

    document.body.addEventListener("input", persistField);
    document.body.addEventListener("change", persistField);
    show("inicio");
  });
})();
