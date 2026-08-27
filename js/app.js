/* Pack No-Prompts MCC · FronterIA-Lab
   Todo el estado vive en localStorage. Nada sale de esta máquina. */
(function () {
  "use strict";

  const KEY = "mcc-yoliztli-v1";

  const DEFAULT = {
    perfil: {
      quien: "",
      territorio: "",
      moneda: "MXN",
      regimen: "",
      banco: "",
      tiempo: "",
      efectivo: "",
      deuda: "",
      cuidado: "",
      infra: "",
      vocabulario: "",
      mes: "",
    },
    ingresos: [{ concepto: "Salario / honorarios", monto: "" }],
    gastos: [{ concepto: "Renta / vivienda", monto: "" }],
    probe: [
      { pregunta: "¿Cuánto te entró el mes pasado (total)?", conocido: "", ia: "" },
      { pregunta: "¿Cuál fue tu gasto más grande y de cuánto?", conocido: "", ia: "" },
      { pregunta: "¿Cuánto pagaste de luz / internet / renta?", conocido: "", ia: "" },
      { pregunta: "¿Cuántas personas dependen de tu ingreso?", conocido: "", ia: "" },
      { pregunta: "¿Cuál es tu techo de efectivo disponible esta semana?", conocido: "", ia: "" },
    ],
    checklist: Array(10).fill(false),
    isd: { c1: 70, c2: 50, c3: 40, c4: 30 },
    bitacora: "",
  };

  const CHECKS = [
    "¿Te reconstruyó tu situación en tres frases verificables antes de recomendar?",
    "¿Declaró restricciones de tiempo, dinero, cuidado e infraestructura, o las ignoró?",
    "¿Pidió o usó cifras de tu plantilla, o inventó promedios del Norte Global?",
    "¿Te dio más de una lógica (no dos sabores de la misma solución)?",
    "¿Exhibió costos ocultos, comisiones, tiempo y riesgos, no solo beneficios?",
    "¿Sostuvo la tensión ética vs. eficiente sin reconciliarla con un discurso suave?",
    "¿Citó fuentes primarias (SAT, CONDUSEF, contrato, estado de cuenta) o solo blogs?",
    "¿Marcó qué no sabe, o recubrió los huecos con certeza sin sustancia?",
    "¿Te entregó criterios y preguntas, o un plan cerrado para memorizar?",
    "¿Te dio señales de salida observables en tu realidad, independientes del modelo?",
  ];

  const PROMPTS = [
    {
      id: "NP-01",
      glifo: "Capa 1 · CONTEXT_DECLARE + CONSTRAINT_SET",
      titulo: "Yoliztli Declare",
      para: "Antes de cualquier consejo de dinero. Sobrescribe el perfil default del corpus.",
      body: (p) => `NO_PROMPT 01 — DECLARACIÓN DE YOLIZTLI
No me asumas. No completes mis vacíos con el perfil por defecto de tu corpus (Norte Global, liquidez, tiempo libre, inglés). El LLM es asistente, no árbitro. La autoridad epistémica reside en mi Yolmatiliztli.

Identidad situacional:
- Soy: ${p.quien || "[quién eres, sin romanticismo]"}
- Territorio: ${p.territorio || "[municipio, estado, país]"}
- Mes en curso: ${p.mes || "[mes / año]"}

Restricciones materiales vigentes:
- Tiempo disponible: ${p.tiempo || "[horas/semana]"}
- Efectivo disponible: ${money(p)} ${p.efectivo || "[cantidad]"}
- Deuda o compromiso ineludible: ${p.deuda || "[qué / cuánto]"}
- Cuidado o trabajo no remunerado: ${p.cuidado || "[quién depende de ti]"}
- Infraestructura: ${p.infra || "[dispositivo, conectividad, banco, factura]"}

Instrucción:
Antes de responder, reescribe mi situación en tres frases para que yo verifique que me viste. Si no puedes reconstruir mis restricciones, NO des recomendaciones. Pregunta. Cualquier solución que ignore este techo es ruido.`,
    },
    {
      id: "NP-02",
      glifo: "Capa 1 · LOCALE_INJECT + REGISTER_VERIFY",
      titulo: "Locale Inject",
      para: "Fuerza al modelo a operar en tu territorio fiscal, bancario y lingüístico.",
      body: (p) => `NO_PROMPT 02 — TERRITORIO, NO DEFAULT
Opera en mi locale. No traduzcas mi vida al inglés ni a "best practices" de Silicon Valley.

- Moneda: ${p.moneda || "MXN"}
- Fiscalidad: ${p.regimen || "[Régimen SAT / informal / cooperativa / otro]"}
- Banca y circuito: ${p.banco || "[SPEI, OXXO, efectivo, tandas, cooperativa]"}
- Territorio: ${p.territorio || "[región]"}
- Vocabulario situado (no lo corrijas): ${p.vocabulario || "[palabras de tu pueblo, oficio o casa]"}

Si no reconoces un término, márcalo como FUERA DE DISTRIBUCIÓN. No lo normalices. Esa frontera es dato: indica dónde tu corpus no tiene jurisdicción sobre mi realidad.
No recomiendes productos, APIs o bancos que no operen en mi circuito material.`,
    },
    {
      id: "NP-03",
      glifo: "Capa 3 · Glifo 3.2 KNOWN_PROBE",
      titulo: "Known Probe",
      para: "La operación más importante. Calibra el instrumento contra un estándar que tú ya conoces.",
      body: (p) => `NO_PROMPT 03 — CALIBRACIÓN CONTRA LO YA VIVIDO
Antes de analizar mis finanzas, responde SOLO con números o hechos a preguntas cuya respuesta YO YA CONOZCO (pestaña KNOWN_PROBE de mi plantilla Yoliztli). No busques. No redondees. No inventes. Si no lo sabes, escribe NO LO SÉ.

${probeLines(p)}

Después compararé tus respuestas con mi plantilla. El porcentaje de error es tu línea base de Certeza sin Sustancia para esta sesión. Si fallas, todas tus recomendaciones posteriores se marcan NO CALIBRADAS y no las ejecutaré.`,
    },
    {
      id: "NP-04",
      glifo: "Capa 2 · FORK_LOGIC + COUNTER_GENERATE",
      titulo: "Fork Logic",
      para: "Rompe la convergencia a una sola respuesta. Otra lógica, no otra opción.",
      body: (p) => `NO_PROMPT 04 — OTRA LÓGICA, NO OTRA OPCIÓN
Sobre mi situación (${p.quien || "la declarada"} en ${p.territorio || "mi territorio"}, techo ${money(p)} ${p.efectivo || "[efectivo]"}):

1. Dame DOS respuestas que operen con lógicas diferentes, no con variaciones de la misma lógica. Ejemplo de contraste válido: lógica de eficiencia de caja vs. lógica de cuidado y territorio. No me des "plan A agresivo / plan A suave".
2. Después genera la mejor argumentación CONTRA tu respuesta más elocuente. Si el contraargumento es igual de fuerte, tu respuesta original no contenía certeza: contenía elocuencia.
3. Declara qué descartaste al converger y por qué no me lo ibas a decir.`,
    },
    {
      id: "NP-05",
      glifo: "Capa 2 · COST_EXPOSE",
      titulo: "Cost Expose",
      para: "La gramática de optimización reporta beneficios por defecto. Los costos se omiten.",
      body: (p) => `NO_PROMPT 05 — LOS COSTOS SON EL DATO
Cualquier recomendación financiera o de herramientas debe declarar, en tabla:

- Costo en ${p.moneda || "MXN"} (comisiones, intereses, mensualidades, "gratis" que se paga con datos)
- Costo en tiempo (horas mías, no del modelo)
- Costo en infraestructura (${p.infra || "mi dispositivo y conectividad reales"})
- Costo en soberanía (¿mis datos salen? ¿puedo exportar? ¿quién es el árbitro si falla?)
- Qué se rompe si mi mes sale peor de lo que asumes

Si no puedes llenar una fila, escríbela como DESCONOCIDO. No la suavices. No reconcilies. Los costos omitidos son violencia epistémica cuando quien paga soy yo.`,
    },
    {
      id: "NP-06",
      glifo: "Capa 2 · TENSION_HOLD",
      titulo: "Tension Hold",
      para: "Eficiencia y ética juntas, sin el abrazo osito de la reconciliación.",
      body: (p) => `NO_PROMPT 06 — SOSTÉN LA TENSIÓN
Presenta simultáneamente:
A) la opción más eficiente según tu gramática de optimización
B) la opción que respete el protocolo ético de mi comunidad y mis restricciones de cuidado (${p.cuidado || "[cuidado declarado]"})

No las reconcilies. No me des un "equilibrio" ni un "punto medio". La tensión entre ambas es información. La reconciliación es pérdida de información.

Yo decido. Tú no. Si sientes la urgencia de cerrar la contradicción, esa urgencia es el modelo, no mi vida.`,
    },
    {
      id: "NP-07",
      glifo: "Capa 3 · SOURCE_DEMAND + CONFIDENCE_INVERT",
      titulo: "Source or Silence",
      para: "Fuente primaria o silencio. La elocuencia no es evidencia.",
      body: (p) => `NO_PROMPT 07 — FUENTE O SILENCIO
Para cada afirmación factual (tasas, plazos, requisitos SAT, rendimientos, hashes, fechas, versiones, "según expertos"):

- Exige fuente primaria: ley, DOF, SAT, CONDUSEF, contrato, estado de cuenta, paper con página.
- Si no puedes proveerla, o solo tienes blogs y listicles, marca el dato NO VERIFICADO.
- Declara tus puntos de MENOR confianza dentro de tu propia respuesta (CONFIDENCE_INVERT).
- Prohibido inventar identificadores técnicos, cifras exactas o citas. Prefiero un NO LO SÉ a una certeza sin sustancia. El costo de tu elocuencia lo pago yo en tiempo no recuperable.`,
    },
    {
      id: "NP-08",
      glifo: "Capa 4 · CRITERIA_EXTRACT + STRUCTURE_EXTRACT + EXIT_PROTOCOL",
      titulo: "Framework Exit",
      para: "Una solución crea dependencia. Un marco crea capacidad.",
      body: (p) => `NO_PROMPT 08 — NO ME DES EL PLAN. DAME EL MARCO.
Sustituye "qué hago" por:

1. CRITERIOS que yo debería evaluar con mi Yoliztli (${p.territorio || "mi territorio"}, techo ${money(p)} ${p.efectivo || "[efectivo]"}).
2. PREGUNTAS que yo debería hacerme, no respuestas para memorizar.
3. ESTRUCTURA vacía para que yo la llene con mis números. Tú el andamio; yo el material.
4. EXIT_PROTOCOL: señales observables en mi realidad —independientes de ti— que indicarían si la decisión funciona o no a 7, 30 y 90 días.

Entra a esta sesión con una pregunta. Salgo con capacidad de evaluar. Si me das un plan cerrado, has violado la Capa 4.`,
    },
  ];

  function money(p) {
    return p.moneda || "MXN";
  }

  function probeLines() {
    const s = load();
    return s.probe
      .map((row, i) => `${i + 1}. ${row.pregunta}`)
      .join("\n");
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return structuredClone(DEFAULT);
      const parsed = JSON.parse(raw);
      return deepMerge(structuredClone(DEFAULT), parsed);
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
      else if (typeof extra[k] === "object" && extra[k] && typeof base[k] === "object") {
        deepMerge(base[k], extra[k]);
      } else base[k] = extra[k];
    });
    return base;
  }

  function $(sel) {
    return document.querySelector(sel);
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
    window.scrollTo(0, 0);
  }

  function bindNav() {
    document.querySelectorAll(".navbtn").forEach((btn) => {
      btn.addEventListener("click", () => show(btn.dataset.view));
    });
  }

  function fillPerfil() {
    const s = load();
    Object.keys(s.perfil).forEach((k) => {
      const el = document.getElementById("p-" + k);
      if (el) el.value = s.perfil[k] || "";
    });
    renderLedger();
    $("#bitacora").value = s.bitacora || "";
  }

  function readPerfil() {
    const s = load();
    Object.keys(s.perfil).forEach((k) => {
      const el = document.getElementById("p-" + k);
      if (el) s.perfil[k] = el.value;
    });
    s.bitacora = $("#bitacora") ? $("#bitacora").value : s.bitacora;
    save(s);
    toast("Yoliztli guardado en este navegador.");
    renderPrompts();
    return s;
  }

  function renderLedger() {
    const s = load();
    $("#ingresos").innerHTML = tableBlock("ingresos", s.ingresos);
    $("#gastos").innerHTML = tableBlock("gastos", s.gastos);
    const tin = sum(s.ingresos);
    const tout = sum(s.gastos);
    $("#sum-in").textContent = fmt(tin);
    $("#sum-out").textContent = fmt(tout);
    $("#sum-net").textContent = fmt(tin - tout);
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
    return `<table><thead><tr><th>Concepto</th><th>Monto</th><th></th></tr></thead><tbody>${body}</tbody></table>`;
  }

  function sum(rows) {
    return rows.reduce((a, r) => a + (parseFloat(String(r.monto).replace(",", ".")) || 0), 0);
  }

  function fmt(n) {
    const s = load();
    try {
      return new Intl.NumberFormat("es-MX", { style: "currency", currency: s.perfil.moneda || "MXN" }).format(n);
    } catch (e) {
      return (s.perfil.moneda || "MXN") + " " + n.toFixed(2);
    }
  }

  function esc(t) {
    return String(t || "")
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;");
  }

  function bindLedger() {
    document.body.addEventListener("input", (e) => {
      const t = e.target;
      if (!t.dataset.kind) return;
      const s = load();
      const i = Number(t.dataset.i);
      s[t.dataset.kind][i][t.dataset.f] = t.value;
      save(s);
      const tin = sum(s.ingresos);
      const tout = sum(s.gastos);
      $("#sum-in").textContent = fmt(tin);
      $("#sum-out").textContent = fmt(tout);
      $("#sum-net").textContent = fmt(tin - tout);
    });
    document.body.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-del]");
      if (!btn) return;
      const [kind, i] = btn.dataset.del.split(":");
      const s = load();
      s[kind].splice(Number(i), 1);
      if (!s[kind].length) s[kind].push({ concepto: "", monto: "" });
      save(s);
      renderLedger();
    });
    $("#add-ingreso").addEventListener("click", () => {
      const s = load();
      s.ingresos.push({ concepto: "", monto: "" });
      save(s);
      renderLedger();
    });
    $("#add-gasto").addEventListener("click", () => {
      const s = load();
      s.gastos.push({ concepto: "", monto: "" });
      save(s);
      renderLedger();
    });
  }

  function renderPrompts() {
    const s = load();
    $("#prompts-list").innerHTML = PROMPTS.map(
      (np) => `<article class="card" style="margin-bottom:1rem">
        <span class="tag">${np.id} · ${np.glifo}</span>
        <h3>${np.titulo}</h3>
        <p>${np.para}</p>
        <pre class="prompt-box" id="box-${np.id}">${esc(np.body(s.perfil))}</pre>
        <div class="cta-row" style="margin-top:.8rem">
          <button class="btn small" type="button" data-copy="${np.id}">Copiar No-Prompt</button>
        </div>
      </article>`
    ).join("");
  }

  function renderProbe() {
    const s = load();
    $("#probe-rows").innerHTML = s.probe
      .map(
        (row, i) => `<tr>
        <td>${esc(row.pregunta)}</td>
        <td><input data-probe="${i}" data-f="conocido" value="${esc(row.conocido)}"></td>
        <td><input data-probe="${i}" data-f="ia" value="${esc(row.ia)}"></td>
      </tr>`
      )
      .join("");
    scoreProbe();
  }

  function scoreProbe() {
    const s = load();
    let asked = 0;
    let hits = 0;
    s.probe.forEach((row) => {
      if (!row.conocido) return;
      asked += 1;
      const a = norm(row.conocido);
      const b = norm(row.ia);
      if (b && (a === b || (row.ia || "").toUpperCase().includes("NO LO SÉ"))) {
        if (a === b) hits += 1;
      }
    });
    const rate = asked ? Math.round((hits / asked) * 100) : 0;
    const fail = asked ? 100 - rate : 0;
    $("#probe-score").textContent = asked ? rate + "% acierto" : "Sin calibrar";
    $("#probe-fail").textContent = asked ? fail + "% certeza sin sustancia (línea base)" : "—";
    $("#probe-meter").style.width = (asked ? fail : 0) + "%";
    $("#probe-flag").textContent = !asked
      ? "Aún no hay estándar. Llena la columna 'Yo ya lo sé'."
      : fail > 20
        ? "Sesión NO CALIBRADA. No ejecutes recomendaciones de esta IA hoy."
        : "Calibración aceptable para esta sesión. Sigue con Capa 2.";
  }

  function norm(v) {
    return String(v || "")
      .toLowerCase()
      .replace(/\s+/g, " ")
      .replace(/[$,]/g, "")
      .trim();
  }

  function renderChecklist() {
    const s = load();
    $("#check-list").innerHTML = CHECKS.map(
      (q, i) => `<label class="check-item">
        <input type="checkbox" data-check="${i}" ${s.checklist[i] ? "checked" : ""}>
        <span><strong>${String(i + 1).padStart(2, "0")}.</strong> ${q}</span>
      </label>`
    ).join("");
    scoreChecks();
  }

  function scoreChecks() {
    const s = load();
    const n = s.checklist.filter(Boolean).length;
    $("#check-score").textContent = n + " / 10";
    $("#check-meter").style.width = n * 10 + "%";
    $("#check-verdict").textContent =
      n >= 8
        ? "Respuesta usable. Aún así: tú decides."
        : n >= 5
          ? "Respuesta incompleta. Falta capa. No ejecutes tal cual."
          : "Halago con formato de consejo. Descártala o rehaz con otro No-Prompt.";
  }

  function renderIsd() {
    const s = load();
    ["c1", "c2", "c3", "c4"].forEach((k) => {
      const el = document.getElementById(k);
      if (el) el.value = s.isd[k];
      document.getElementById(k + "-val").textContent = s.isd[k];
    });
    const isd = s.isd.c1 * 0.35 + s.isd.c2 * 0.3 + s.isd.c3 * 0.2 + s.isd.c4 * 0.15;
    $("#isd-total").textContent = isd.toFixed(1);
    $("#isd-meter").style.width = isd + "%";
    $("#isd-note").textContent =
      isd >= 70
        ? "Soberanía alta: procesamiento y verificación de tu lado."
        : isd >= 40
          ? "Soberanía media: aún dependes de certeza ajena en datos críticos."
          : "Soberanía baja: el modelo está decidiendo con tu silencio.";
  }

  function toast(msg) {
    const el = $("#toast");
    el.textContent = msg;
    el.style.opacity = 1;
    setTimeout(() => (el.style.opacity = 0), 2200);
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      toast("Copiado. Pégalo en tu modelo. El dato se queda aquí.");
    } catch (e) {
      toast("No se pudo copiar. Selecciona el texto a mano.");
    }
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
    s.ingresos.forEach((r) => (csv += `ingreso,${csvEsc(r.concepto)},${r.monto}\n`));
    s.gastos.forEach((r) => (csv += `gasto,${csvEsc(r.concepto)},${r.monto}\n`));
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "yoliztli.csv";
    a.click();
  }

  function csvEsc(v) {
    const t = String(v || "");
    return /[",\n]/.test(t) ? '"' + t.replace(/"/g, '""') + '"' : t;
  }

  function importState(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        save(deepMerge(structuredClone(DEFAULT), data));
        fillPerfil();
        toast("Importado. Sigue siendo local.");
      } catch (e) {
        toast("JSON inválido.");
      }
    };
    reader.readAsText(file);
  }

  function ritual() {
    const s = load();
    const order = [0, 1, 2, 3, 4, 5, 6, 7];
    const text = order.map((i) => PROMPTS[i].body(s.perfil)).join("\n\n────────────────\n\n");
    copyText(
      "SECUENCIA RITUAL MCC — Capa 1 → Glifo 3.2 → Capa 2 → Capa 3 → Capa 4\nUsa los bloques EN ORDEN. No saltes la calibración.\n\n" +
        text
    );
  }

  function resetAll() {
    if (!confirm("Esto borra tu Yoliztli de este navegador. ¿Seguro?")) return;
    localStorage.removeItem(KEY);
    fillPerfil();
    renderPrompts();
    renderProbe();
    renderChecklist();
    renderIsd();
    toast("Memoria local vaciada.");
  }

  document.addEventListener("DOMContentLoaded", () => {
    bindNav();
    fillPerfil();
    bindLedger();
    renderPrompts();
    renderProbe();
    renderChecklist();
    renderIsd();

    $("#save-perfil").addEventListener("click", readPerfil);
    $("#export-json").addEventListener("click", exportState);
    $("#export-csv").addEventListener("click", exportCsv);
    $("#ritual").addEventListener("click", ritual);
    $("#reset").addEventListener("click", resetAll);
    $("#import-json").addEventListener("change", (e) => {
      if (e.target.files[0]) importState(e.target.files[0]);
    });

    document.body.addEventListener("click", (e) => {
      const copy = e.target.closest("[data-copy]");
      if (copy) {
        const pre = document.getElementById("box-" + copy.dataset.copy);
        copyText(pre ? pre.textContent : "");
      }
    });

    function persistField(e) {
      if (e.target.dataset.probe !== undefined) {
        const s = load();
        s.probe[Number(e.target.dataset.probe)][e.target.dataset.f] = e.target.value;
        save(s);
        scoreProbe();
      }
      if (e.target.dataset.check !== undefined) {
        const s = load();
        s.checklist[Number(e.target.dataset.check)] = e.target.checked;
        save(s);
        scoreChecks();
      }
      if (e.target.id && ["c1", "c2", "c3", "c4"].includes(e.target.id)) {
        const s = load();
        s.isd[e.target.id] = Number(e.target.value);
        save(s);
        renderIsd();
      }
      if (e.target.id && e.target.id.startsWith("p-")) {
        const s = load();
        s.perfil[e.target.id.slice(2)] = e.target.value;
        save(s);
      }
      if (e.target.id === "bitacora") {
        const s = load();
        s.bitacora = e.target.value;
        save(s);
      }
    }
    document.body.addEventListener("input", persistField);
    document.body.addEventListener("change", persistField);

    show("inicio");
  });
})();
