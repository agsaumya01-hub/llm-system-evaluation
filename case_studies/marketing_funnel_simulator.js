<html lang="en"><head>
  <meta charset="UTF-8">
  <title>Marketing Funnel Simulator</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    :root {
      --bg: #0f172a;
      --bg-elevated: #111827;
      --border-subtle: #1f2937;
      --accent: #3b82f6;
      --accent-soft: rgba(59, 130, 246, 0.15);
      --accent-strong: #2563eb;
      --accent-2: #22c55e;
      --accent-2-soft: rgba(34, 197, 94, 0.14);
      --text-main: #f9fafb;
      --text-muted: #9ca3af;
      --text-softer: #6b7280;
      --table-header: #111827;
      --radius-lg: 14px;
      --radius-md: 10px;
      --shadow-soft: 0 18px 45px rgba(15, 23, 42, 0.85);
      --shadow-subtle: 0 10px 25px rgba(15, 23, 42, 0.65);
      --focus-ring: 0 0 0 1px rgba(148, 163, 184, 0.8),0 0 0 3px rgba(59, 130, 246, 0.55);
      --danger: #ef4444;
      --danger-soft: rgba(239, 68, 68, 0.1);
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif;
      background: radial-gradient(circle at top, #1f2937 0, #020617 55%, #000 100%);
      color: var(--text-main);
      min-height: 100vh;
      display: flex;
      align-items: stretch;
      justify-content: center;
      padding: 24px;
    }

    .app-shell {
      display: flex;
      flex-direction: column;
      max-width: 1200px;
      width: 100%;
      background: radial-gradient(circle at 0 0, rgba(59, 130, 246, 0.08), transparent 55%),
                  radial-gradient(circle at 100% 100%, rgba(34, 197, 94, 0.06), transparent 60%),
                  linear-gradient(135deg, #020617, #020617 52%, #030712 100%);
      border-radius: 22px;
      box-shadow: var(--shadow-soft);
      border: 1px solid rgba(31, 41, 55, 0.9);
      overflow: hidden;
    }

    header {
      padding: 18px 24px 10px;
      border-bottom: 1px solid rgba(31, 41, 55, 0.8);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      background: linear-gradient(to right, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.92));
      backdrop-filter: blur(18px);
    }

    .title-block {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    h1 {
      font-size: 18px;
      margin: 0;
      letter-spacing: 0.02em;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .chip {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.16em;
      padding: 2px 8px;
      border-radius: 999px;
      border: 1px solid rgba(148, 163, 184, 0.4);
      color: var(--text-muted);
      background: radial-gradient(circle at 0 0, rgba(59, 130, 246, 0.25), transparent 55%),
                  rgba(15, 23, 42, 0.95);
    }

    .subtitle {
      font-size: 13px;
      color: var(--text-muted);
      max-width: 460px;
    }

    .header-metrics {
      display: flex;
      align-items: center;
      gap: 16px;
      font-size: 12px;
      color: var(--text-softer);
    }

    .metric-pill {
      padding: 6px 10px;
      border-radius: 999px;
      border: 1px solid rgba(55, 65, 81, 0.9);
      background: radial-gradient(circle at 0 0, rgba(59, 130, 246, 0.35), transparent 70%),
                  rgba(15, 23, 42, 0.95);
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      color: #e5e7eb;
    }

    .metric-pill strong {
      color: #f9fafb;
      font-weight: 600;
    }

    .layout {
      display: grid;
      grid-template-columns: minmax(0, 1.08fr) minmax(0, 1.2fr);
      gap: 0;
      min-height: 520px;
    }

    .panel {
      padding: 18px 20px 20px;
    }

    .panel + .panel {
      border-left: 1px solid rgba(31, 41, 55, 0.9);
      background: radial-gradient(circle at 100% 0, rgba(37, 99, 235, 0.12), transparent 60%),
                  radial-gradient(circle at 0 100%, rgba(34, 197, 94, 0.12), transparent 60%),
                  #020617;
    }

    .panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 14px;
      gap: 12px;
    }

    .panel-title {
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: var(--text-softer);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .panel-title::before {
      content: "";
      width: 8px;
      height: 8px;
      border-radius: 999px;
      background: radial-gradient(circle at 30% 30%, #93c5fd, #2563eb);
      box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.22);
    }

    .panel-description {
      font-size: 11px;
      color: var(--text-muted);
    }

    /* Table */
    .table-wrapper {
      background: radial-gradient(circle at top left, rgba(31, 41, 55, 0.9), rgba(15, 23, 42, 0.96));
      border-radius: var(--radius-lg);
      border: 1px solid rgba(30, 64, 175, 0.55);
      box-shadow: var(--shadow-subtle);
      overflow: hidden;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
    }

    thead {
      background: radial-gradient(circle at 0 0, rgba(59, 130, 246, 0.45), transparent 65%),
                  #020617;
      border-bottom: 1px solid rgba(30, 64, 175, 0.8);
    }

    th, td {
      padding: 9px 10px;
      text-align: left;
      border-bottom: 1px solid rgba(31, 41, 55, 0.75);
      white-space: nowrap;
    }

    th {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: #9ca3af;
      font-weight: 600;
    }

    tbody tr:last-child td {
      border-bottom: none;
    }

    tbody tr:nth-child(even) td {
      background: linear-gradient(to right, rgba(15, 23, 42, 0.92), rgba(15, 23, 42, 0.94));
    }

    tbody tr:nth-child(odd) td {
      background: linear-gradient(to right, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.96));
    }

    tbody tr:hover td {
      background: radial-gradient(circle at 0 0, rgba(59, 130, 246, 0.3), transparent 60%),
                  rgba(15, 23, 42, 0.98);
    }

    .stage-name {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 500;
      color: #e5e7eb;
    }

    .stage-badge {
      width: 18px;
      height: 18px;
      border-radius: 999px;
      background: radial-gradient(circle at 30% 30%, #bfdbfe, #1d4ed8);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: 700;
      color: #0b1220;
      box-shadow: 0 0 0 2px rgba(30, 64, 175, 0.8);
    }

    .stage-subtitle {
      display: block;
      font-size: 11px;
      color: var(--text-softer);
      font-weight: 400;
    }

    .number-input {
      position: relative;
      display: inline-flex;
      align-items: center;
      background: rgba(15, 23, 42, 0.98);
      border-radius: 999px;
      padding: 3px 8px 3px 10px;
      border: 1px solid rgba(55, 65, 81, 0.9);
      box-shadow: inset 0 0 0 1px rgba(15, 23, 42, 0.5);
      min-width: 120px;
    }

    .number-input input {
      background: transparent;
      border: none;
      color: #e5e7eb;
      font: inherit;
      width: 100%;
      padding: 0;
      outline: none;
      text-align: right;
    }

    .number-input span.suffix {
      margin-left: 4px;
      font-size: 11px;
      color: var(--text-softer);
    }

    .number-input[data-error="true"] {
      border-color: var(--danger);
      box-shadow: inset 0 0 0 1px rgba(248, 113, 113, 0.2);
      background: radial-gradient(circle at 100% 0, rgba(248, 113, 113, 0.35), transparent 65%),
                  rgba(15, 23, 42, 0.97);
    }

    .number-input input:focus-visible {
      box-shadow: none;
    }

    .number-input:focus-within {
      box-shadow: var(--focus-ring);
      border-color: rgba(148, 163, 184, 0.9);
    }

    .readonly-cell {
      color: #e5e7eb;
      font-variant-numeric: tabular-nums;
      text-align: right;
      padding-right: 12px;
    }

    .readonly-cell span {
      display: inline-block;
      min-width: 72px;
      text-align: right;
    }

    .note-text {
      margin-top: 8px;
      font-size: 11px;
      color: var(--text-softer);
      display: flex;
      align-items: flex-start;
      gap: 6px;
    }

    .note-dot {
      width: 6px;
      height: 6px;
      border-radius: 999px;
      background: radial-gradient(circle at 30% 30%, #6ee7b7, #22c55e);
      margin-top: 4px;
    }

    /* Chart */
    .chart-card {
      height: 100%;
      background: linear-gradient(145deg, rgba(15, 23, 42, 0.92), rgba(15, 23, 42, 0.97));
      border-radius: var(--radius-lg);
      border: 1px solid rgba(37, 99, 235, 0.6);
      box-shadow: var(--shadow-subtle);
      padding: 12px 14px 14px;
      display: flex;
      flex-direction: column;
    }

    .chart-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
      gap: 6px;
      padding: 0 6px;
    }

    .legend {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      font-size: 11px;
      color: var(--text-muted);
      flex-wrap: wrap;
    }

    .legend-item {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 2px 8px;
      border-radius: 999px;
      background: rgba(15, 23, 42, 0.95);
      border: 1px solid rgba(55, 65, 81, 0.9);
    }

    .legend-swatch {
      width: 12px;
      height: 4px;
      border-radius: 999px;
    }

    .legend-swatch.volume {
      background: linear-gradient(to right, #93c5fd, #2563eb);
      box-shadow: 0 0 0 1px rgba(147, 197, 253, 0.7);
    }

    .legend-swatch.conv {
      background: linear-gradient(to right, #6ee7b7, #16a34a);
      box-shadow: 0 0 0 1px rgba(74, 222, 128, 0.7);
    }

    .chart-meta {
      font-size: 10px;
      color: var(--text-softer);
      text-align: right;
    }

    .chart-inner {
      flex: 1;
      position: relative;
      padding: 4px 4px 2px;
    }

    canvas {
      width: 100%;
      height: 100%;
      display: block;
    }

    .tooltip {
      position: absolute;
      pointer-events: none;
      background: radial-gradient(circle at 0 0, rgba(59, 130, 246, 0.5), transparent 55%),
                  rgba(15, 23, 42, 0.96);
      border-radius: 10px;
      border: 1px solid rgba(148, 163, 184, 0.7);
      padding: 8px 9px 8px 9px;
      font-size: 11px;
      color: #e5e7eb;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.7);
      z-index: 20;
      min-width: 170px;
      max-width: 220px;
      transform: translate(-50%, -100%);
      opacity: 0;
      transition: opacity 0.12s ease-out, transform 0.12s ease-out;
      backdrop-filter: blur(12px);
    }

    .tooltip.visible {
      opacity: 1;
      transform: translate(-50%, -110%);
    }

    .tooltip-title {
      font-weight: 600;
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
    }

    .tooltip-badge {
      width: 8px;
      height: 8px;
      border-radius: 999px;
      background: #93c5fd;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.7);
    }

    .tooltip-line {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 2px;
      color: var(--text-softer);
    }

    .tooltip-line strong {
      color: #e5e7eb;
      font-weight: 500;
    }

    .error-banner {
      margin-top: 8px;
      padding: 6px 8px;
      border-radius: 8px;
      font-size: 11px;
      background: var(--danger-soft);
      color: #fecaca;
      border: 1px solid rgba(248, 113, 113, 0.7);
      display: none;
    }

    .error-banner.visible {
      display: block;
    }

    @media (max-width: 900px) {
      body {
        padding: 12px;
      }

      .app-shell {
        border-radius: 18px;
      }

      .layout {
        grid-template-columns: 1fr;
      }

      .panel + .panel {
        border-left: none;
        border-top: 1px solid rgba(31, 41, 55, 0.9);
      }

      header {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }

      .header-metrics {
        align-self: stretch;
        justify-content: space-between;
      }
    }

    @media (max-width: 600px) {
      th:nth-child(4), td:nth-child(4) {
        display: none;
      }

      .number-input {
        min-width: 100px;
      }
    }
  </style>
</head>
<body>
  <main class="app-shell" aria-label="Marketing funnel simulator">
    <header>
      <div class="title-block">
        <h1>
          Marketing Funnel Simulator
          <span class="chip">Client-side demo</span>
        </h1>
        <p class="subtitle">Adjust volumes and conversion rates at each stage to instantly see how your funnel performance shifts.</p>
      </div>
      <div class="header-metrics" aria-hidden="true">
        <div class="metric-pill">
          Total Impressions
          <strong id="headerTotal">50,000</strong>
        </div>
        <div class="metric-pill">
          Funnel Conversion
          <strong id="headerOverallConv">0.5%</strong>
        </div>
      </div>
    </header>

    <section class="layout" aria-label="Funnel inputs and chart">
      <section class="panel" aria-label="Funnel table">
        <div class="panel-header">
          <div class="panel-title">Funnel stages</div>
          <div class="panel-description">Edit any volume or conversion rate to explore different scenarios.</div>
        </div>

        <div class="table-wrapper" role="region" aria-label="Funnel configuration table">
          <table>
            <thead>
              <tr>
                <th scope="col">Stage</th>
                <th scope="col">Volume</th>
                <th scope="col">Conversion → next</th>
                <th scope="col">Resulting next volume</th>
              </tr>
            </thead>
            <tbody id="funnelBody"><tr><th scope="row"><div class="stage-name"><span class="stage-badge">1</span><span><span>Impressions</span><span class="stage-subtitle">Top of funnel</span></span></div></th><td style="text-align: right;"><div class="number-input" data-error="false"><input type="number" inputmode="decimal" min="0" step="any" aria-label="Impressions volume" data-stage-index="0"></div></td><td style="text-align: right;"><div class="number-input" data-error="false"><input type="number" inputmode="decimal" min="0" max="100" step="any" aria-label="Impressions conversion to next stage (percent)" data-conv-index="0"><span class="suffix">%</span></div></td><td class="readonly-cell"><span data-result-index="0">8,000</span></td></tr><tr><th scope="row"><div class="stage-name"><span class="stage-badge">2</span><span><span>Clicks</span><span class="stage-subtitle">Engaged visitors</span></span></div></th><td style="text-align: right;"><div class="number-input" data-error="false"><input type="number" inputmode="decimal" min="0" step="any" aria-label="Clicks volume" data-stage-index="1"></div></td><td style="text-align: right;"><div class="number-input" data-error="false"><input type="number" inputmode="decimal" min="0" max="100" step="any" aria-label="Clicks conversion to next stage (percent)" data-conv-index="1"><span class="suffix">%</span></div></td><td class="readonly-cell"><span data-result-index="1">1,200</span></td></tr><tr><th scope="row"><div class="stage-name"><span class="stage-badge">3</span><span><span>Signups</span><span class="stage-subtitle">Leads captured</span></span></div></th><td style="text-align: right;"><div class="number-input" data-error="false"><input type="number" inputmode="decimal" min="0" step="any" aria-label="Signups volume" data-stage-index="2"></div></td><td style="text-align: right;"><div class="number-input" data-error="false"><input type="number" inputmode="decimal" min="0" max="100" step="any" aria-label="Signups conversion to next stage (percent)" data-conv-index="2"><span class="suffix">%</span></div></td><td class="readonly-cell"><span data-result-index="2">240</span></td></tr><tr><th scope="row"><div class="stage-name"><span class="stage-badge">4</span><span><span>Purchases</span><span class="stage-subtitle">Customers</span></span></div></th><td style="text-align: right;"><div class="number-input" data-error="false"><input type="number" inputmode="decimal" min="0" step="any" aria-label="Purchases volume" data-stage-index="3"></div></td><td style="text-align: right;"><span style="color:var(--text-softer);font-size:11px;">n/a (last stage)</span></td><td class="readonly-cell"><span style="color:var(--text-softer);font-size:11px;">—</span></td></tr></tbody>
          </table>
        </div>

        <p class="note-text">
          <span class="note-dot" aria-hidden="true"></span>
          <span>
            Volumes can never exceed the previous stage. Updating any value cascades downstream automatically.
          </span>
        </p>
        <div id="errorBanner" class="error-banner" aria-live="polite"></div>
      </section>

      <section class="panel" aria-label="Funnel chart visualization">
        <div class="panel-header">
          <div class="panel-title">Performance trends</div>
          <div class="panel-description">Volume and conversion rate trends across the funnel.</div>
        </div>

        <div class="chart-card">
          <div class="chart-header">
            <div class="legend" aria-hidden="true">
              <div class="legend-item">
                <span class="legend-swatch volume"></span>
                Volume per stage
              </div>
              <div class="legend-item">
                <span class="legend-swatch conv"></span>
                Conversion to next
              </div>
            </div>
            <div class="chart-meta" id="chartMeta">Hover any point for details</div>
          </div>

          <div class="chart-inner">
            <canvas id="funnelChart" aria-label="Line chart of funnel volume and conversion" role="img" width="841" height="640"></canvas>
            <div id="chartTooltip" class="tooltip" role="dialog" aria-hidden="true"></div>
          </div>
        </div>
      </section>
    </section>
  </main>

  <script>
    (function () {
      const stages = [
        { id: 0, name: "Impressions", subtitle: "Top of funnel", key: "impressions" },
        { id: 1, name: "Clicks", subtitle: "Engaged visitors", key: "clicks" },
        { id: 2, name: "Signups", subtitle: "Leads captured", key: "signups" },
        { id: 3, name: "Purchases", subtitle: "Customers", key: "purchases" }
      ];

      let volumes = [50000, 8000, 1200, 240];
      let convRates = [0.16, 0.15, 0.20]; // Between stage i and i+1

      const funnelBody = document.getElementById("funnelBody");
      const errorBanner = document.getElementById("errorBanner");
      const headerTotal = document.getElementById("headerTotal");
      const headerOverallConv = document.getElementById("headerOverallConv");
      const chartCanvas = document.getElementById("funnelChart");
      const tooltipEl = document.getElementById("chartTooltip");
      const chartMeta = document.getElementById("chartMeta");

      const ctx = chartCanvas.getContext("2d");

      function formatNumber(value) {
        return value.toLocaleString(undefined, {
          maximumFractionDigits: value >= 100 ? 0 : 1
        });
      }

      function clamp(num, min, max) {
        return Math.max(min, Math.min(max, num));
      }

      function showError(msg) {
        errorBanner.textContent = msg;
        errorBanner.classList.add("visible");
      }

      function clearError() {
        errorBanner.textContent = "";
        errorBanner.classList.remove("visible");
      }

      function recomputeFromVolumes() {
        for (let i = 0; i < convRates.length; i++) {
          if (volumes[i] <= 0) {
            convRates[i] = 0;
            volumes[i + 1] = 0;
          } else {
            const raw = volumes[i + 1] / volumes[i];
            convRates[i] = clamp(raw, 0, 1);
            volumes[i + 1] = Math.round(volumes[i] * convRates[i]);
          }
        }
      }

      function recomputeFromConv(startIndex) {
        for (let i = startIndex; i < convRates.length; i++) {
          volumes[i + 1] = Math.round(volumes[i] * clamp(convRates[i], 0, 1));
        }
      }

      function buildTable() {
        funnelBody.innerHTML = "";

        stages.forEach((stage, index) => {
          const tr = document.createElement("tr");

          const th = document.createElement("th");
          th.scope = "row";
          const nameDiv = document.createElement("div");
          nameDiv.className = "stage-name";
          const badge = document.createElement("span");
          badge.className = "stage-badge";
          badge.textContent = index + 1;
          const labelSpan = document.createElement("span");
          labelSpan.textContent = stage.name;
          const subtitleSpan = document.createElement("span");
          subtitleSpan.className = "stage-subtitle";
          subtitleSpan.textContent = stage.subtitle;
          const labelWrap = document.createElement("span");
          labelWrap.appendChild(labelSpan);
          labelWrap.appendChild(subtitleSpan);
          nameDiv.appendChild(badge);
          nameDiv.appendChild(labelWrap);
          th.appendChild(nameDiv);
          tr.appendChild(th);

          // Volume input
          const tdVolume = document.createElement("td");
          tdVolume.style.textAlign = "right";
          const volWrapper = document.createElement("div");
          volWrapper.className = "number-input";
          volWrapper.dataset.error = "false";
          const volInput = document.createElement("input");
          volInput.type = "number";
          volInput.inputMode = "decimal";
          volInput.min = "0";
          volInput.step = "any";
          volInput.value = volumes[index];
          volInput.setAttribute("aria-label", stage.name + " volume");
          volInput.dataset.stageIndex = String(index);
          volWrapper.appendChild(volInput);
          tdVolume.appendChild(volWrapper);
          tr.appendChild(tdVolume);

          // Conversion input (except last stage)
          const tdConv = document.createElement("td");
          tdConv.style.textAlign = "right";
          if (index < stages.length - 1) {
            const convWrapper = document.createElement("div");
            convWrapper.className = "number-input";
            convWrapper.dataset.error = "false";
            const convInput = document.createElement("input");
            convInput.type = "number";
            convInput.inputMode = "decimal";
            convInput.min = "0";
            convInput.max = "100";
            convInput.step = "any";
            convInput.value = (convRates[index] * 100).toFixed(1).replace(/\.0$/, "");
            convInput.setAttribute("aria-label", stage.name + " conversion to next stage (percent)");
            convInput.dataset.convIndex = String(index);
            const suffix = document.createElement("span");
            suffix.className = "suffix";
            suffix.textContent = "%";
            convWrapper.appendChild(convInput);
            convWrapper.appendChild(suffix);
            tdConv.appendChild(convWrapper);
          } else {
            tdConv.innerHTML = "<span style=\"color:var(--text-softer);font-size:11px;\">n/a (last stage)</span>";
          }
          tr.appendChild(tdConv);

          // Resulting next volume
          const tdResult = document.createElement("td");
          tdResult.className = "readonly-cell";
          if (index < stages.length - 1) {
            const span = document.createElement("span");
            span.textContent = formatNumber(volumes[index + 1]);
            span.dataset.resultIndex = String(index);
            tdResult.appendChild(span);
          } else {
            tdResult.innerHTML = "<span style=\"color:var(--text-softer);font-size:11px;\">—</span>";
          }
          tr.appendChild(tdResult);

          funnelBody.appendChild(tr);
        });

        wireInputs();
        updateHeader();
      }

      function wireInputs() {
        funnelBody.querySelectorAll("input[data-stageIndex]").forEach((input) => {
          input.addEventListener("change", onVolumeChange);
          input.addEventListener("blur", onVolumeBlur);
        });

        funnelBody.querySelectorAll("input[data-convIndex]").forEach((input) => {
          input.addEventListener("change", onConvChange);
          input.addEventListener("blur", onConvBlur);
        });
      }

      function onVolumeBlur(e) {
        const input = e.target;
        if (!input.value) {
          const idx = Number(input.dataset.stageIndex);
          input.value = volumes[idx];
        }
      }

      function onConvBlur(e) {
        const input = e.target;
        if (!input.value && input.value !== "0") {
          const idx = Number(input.dataset.convIndex);
          input.value = (convRates[idx] * 100).toFixed(1).replace(/\.0$/, "");
        }
      }

      function onVolumeChange(e) {
        clearError();
        const input = e.target;
        const idx = Number(input.dataset.stageIndex);
        let val = parseFloat(input.value);
        if (isNaN(val) || val < 0) {
          val = 0;
        }

        if (idx > 0 && val > volumes[idx - 1]) {
          val = volumes[idx - 1];
          input.value = val;
          showError("A stage's volume cannot exceed the previous stage. It has been capped.");
        }

        volumes[idx] = val;
        recomputeFromVolumes();
        refreshTableValues();
        drawChart();
      }

      function onConvChange(e) {
        clearError();
        const input = e.target;
        const idx = Number(input.dataset.convIndex);
        let val = parseFloat(input.value);
        if (isNaN(val) || val < 0) val = 0;
        if (val > 100) {
          val = 100;
          showError("Conversion rate has been capped at 100%.");
        }
        convRates[idx] = clamp(val / 100, 0, 1);
        input.value = val;
        recomputeFromConv(idx);
        refreshTableValues();
        drawChart();
      }

      function refreshTableValues() {
        funnelBody.querySelectorAll("input[data-stageIndex]").forEach((input) => {
          const idx = Number(input.dataset.stageIndex);
          input.value = volumes[idx];
        });

        funnelBody.querySelectorAll("input[data-convIndex]").forEach((input) => {
          const idx = Number(input.dataset.convIndex);
          input.value = (convRates[idx] * 100).toFixed(1).replace(/\.0$/, "");
        });

        funnelBody.querySelectorAll("span[data-resultIndex]").forEach((span) => {
          const idx = Number(span.dataset.resultIndex);
          span.textContent = formatNumber(volumes[idx + 1]);
        });

        updateHeader();
      }

      function updateHeader() {
        headerTotal.textContent = formatNumber(volumes[0]);
        const overall = volumes[0] ? volumes[volumes.length - 1] / volumes[0] : 0;
        headerOverallConv.textContent = (overall * 100).toFixed(1).replace(/\.0$/, "") + "%";
      }

      function resizeCanvas() {
        const rect = chartCanvas.parentElement.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        chartCanvas.width = rect.width * dpr;
        chartCanvas.height = rect.height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        drawChart();
      }

      window.addEventListener("resize", () => {
        resizeCanvas();
      });

      let lastHover = null;

      chartCanvas.addEventListener("mousemove", (e) => {
        const rect = chartCanvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const hit = hitTest(x, y);
        if (hit) {
          showTooltip(hit, x, y);
          lastHover = hit;
        } else {
          hideTooltip();
          lastHover = null;
        }
      });

      chartCanvas.addEventListener("mouseleave", () => {
        hideTooltip();
        lastHover = null;
      });

      function getChartGeometry() {
        const rect = chartCanvas.getBoundingClientRect();
        const padding = { left: 40, right: 16, top: 14, bottom: 30 };
        const width = rect.width;
        const height = rect.height;
        return { padding, width, height, innerWidth: width - padding.left - padding.right, innerHeight: height - padding.top - padding.bottom };
      }

      function drawChart() {
        if (!chartCanvas.width || !chartCanvas.height) return;
        const { padding, width, height, innerWidth, innerHeight } = getChartGeometry();

        ctx.clearRect(0, 0, width, height);

        ctx.save();
        const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
        bgGrad.addColorStop(0, "rgba(15,23,42,0.2)");
        bgGrad.addColorStop(1, "rgba(15,23,42,0.9)");
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();

        const maxVol = Math.max(...volumes, 1);
        const maxConv = 1;

        const volScale = (v) => padding.top + innerHeight * (1 - v / maxVol * 0.92 - 0.03);
        const convScale = (c) => padding.top + innerHeight * (1 - c * 0.85 - 0.10);

        const xForStage = (i) => padding.left + (innerWidth * i) / (stages.length - 1 || 1);

        // Grid & axes
        ctx.save();
        ctx.strokeStyle = "rgba(55,65,81,0.8)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(padding.left, padding.top);
        ctx.lineTo(padding.left, height - padding.bottom);
        ctx.stroke();

        ctx.strokeStyle = "rgba(31,41,55,0.8)";
        ctx.beginPath();
        ctx.moveTo(padding.left, height - padding.bottom);
        ctx.lineTo(width - padding.right, height - padding.bottom);
        ctx.stroke();

        const yLines = 4;
        ctx.strokeStyle = "rgba(31,41,55,0.6)";
        ctx.setLineDash([3, 3]);
        for (let i = 1; i <= yLines; i++) {
          const y = padding.top + (innerHeight * i) / (yLines + 1);
          ctx.beginPath();
          ctx.moveTo(padding.left, y);
          ctx.lineTo(width - padding.right, y);
          ctx.stroke();
        }
        ctx.setLineDash([]);

        ctx.fillStyle = "#6b7280";
        ctx.font = "10px system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif";
        ctx.textAlign = "center";
        stages.forEach((s, i) => {
          const x = xForStage(i);
          const y = height - padding.bottom + 16;
          ctx.fillText(s.name, x, y);
        });
        ctx.restore();

        const volPoints = stages.map((_, i) => ({ x: xForStage(i), y: volScale(volumes[i]) }));
        const convPoints = stages.map((_, i) => {
          const c = i < convRates.length ? convRates[i] : convRates[convRates.length - 1] || 0;
          return { x: xForStage(i), y: convScale(c) };
        });

        // Volume area
        ctx.save();
        const volGrad = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
        volGrad.addColorStop(0, "rgba(59,130,246,0.35)");
        volGrad.addColorStop(1, "rgba(37,99,235,0)");
        ctx.beginPath();
        volPoints.forEach((p, i) => {
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });
        ctx.lineTo(volPoints[volPoints.length - 1].x, height - padding.bottom);
        ctx.lineTo(volPoints[0].x, height - padding.bottom);
        ctx.closePath();
        ctx.fillStyle = volGrad;
        ctx.fill();
        ctx.restore();

        // Volume line
        ctx.save();
        ctx.lineWidth = 2;
        const volStroke = ctx.createLinearGradient(padding.left, 0, width - padding.right, 0);
        volStroke.addColorStop(0, "#93c5fd");
        volStroke.addColorStop(1, "#2563eb");
        ctx.strokeStyle = volStroke;
        ctx.beginPath();
        volPoints.forEach((p, i) => {
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });
        ctx.stroke();
        ctx.restore();

        // Conversion line
        ctx.save();
        ctx.lineWidth = 1.8;
        const convStroke = ctx.createLinearGradient(padding.left, 0, width - padding.right, 0);
        convStroke.addColorStop(0, "#6ee7b7");
        convStroke.addColorStop(1, "#16a34a");
        ctx.strokeStyle = convStroke;
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        convPoints.forEach((p, i) => {
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();

        // Points
        ctx.save();
        volPoints.forEach((p, i) => {
          const radius = 4;
          ctx.beginPath();
          ctx.fillStyle = "#1d4ed8";
          ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.fillStyle = "#e5f0ff";
          ctx.arc(p.x, p.y, 2.1, 0, Math.PI * 2);
          ctx.fill();
        });
        convPoints.forEach((p, i) => {
          const radius = 3.2;
          ctx.beginPath();
          ctx.fillStyle = "#16a34a";
          ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.fillStyle = "#ecfdf5";
          ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.restore();

        if (lastHover) {
          showTooltip(lastHover, lastHover.canvasX, lastHover.canvasY);
        }
      }

      function hitTest(x, y) {
        const radius = 10;
        const { padding, width, height, innerWidth, innerHeight } = getChartGeometry();
        if (x < padding.left || x > width - padding.right || y < padding.top || y > height - padding.bottom) {
          return null;
        }

        const xForStage = (i) => padding.left + (innerWidth * i) / (stages.length - 1 || 1);
        const maxVol = Math.max(...volumes, 1);
        const volScale = (v) => padding.top + innerHeight * (1 - v / maxVol * 0.92 - 0.03);

        for (let i = 0; i < stages.length; i++) {
          const px = xForStage(i);
          const py = volScale(volumes[i]);
          const dx = x - px;
          const dy = y - py;
          if (dx * dx + dy * dy <= radius * radius) {
            const conv = i < convRates.length ? convRates[i] : null;
            const nextVol = i < volumes.length - 1 ? volumes[i + 1] : null;
            return {
              stageIndex: i,
              stage: stages[i],
              volume: volumes[i],
              conv,
              nextVolume: nextVol,
              canvasX: px,
              canvasY: py
            };
          }
        }
        return null;
      }

      function showTooltip(hit, canvasX, canvasY) {
        if (!hit) return;
        const { stageIndex, stage, volume, conv, nextVolume } = hit;

        const convText = conv != null ? (conv * 100).toFixed(1).replace(/\.0$/, "") + "%" : "—";
        const nextText = nextVolume != null ? formatNumber(nextVolume) : "—";

        tooltipEl.innerHTML = "";
        const title = document.createElement("div");
        title.className = "tooltip-title";
        const badge = document.createElement("span");
        badge.className = "tooltip-badge";
        const titleText = document.createElement("span");
        titleText.textContent = `${stageIndex + 1}. ${stage.name}`;
        title.appendChild(badge);
        title.appendChild(titleText);
        tooltipEl.appendChild(title);

        const line1 = document.createElement("div");
        line1.className = "tooltip-line";
        line1.innerHTML = `<span>Stage volume</span><strong>${formatNumber(volume)}</strong>`;

        const line2 = document.createElement("div");
        line2.className = "tooltip-line";
        line2.innerHTML = `<span>Conversion → next</span><strong>${convText}</strong>`;

        const line3 = document.createElement("div");
        line3.className = "tooltip-line";
        line3.innerHTML = `<span>Next stage volume</span><strong>${nextText}</strong>`;

        tooltipEl.appendChild(line1);
        tooltipEl.appendChild(line2);
        tooltipEl.appendChild(line3);

        const rect = chartCanvas.getBoundingClientRect();
        const parentRect = chartCanvas.parentElement.getBoundingClientRect();
        const left = parentRect.left + (canvasX / rect.width) * rect.width;
        const top = parentRect.top + (canvasY / rect.height) * rect.height;

        tooltipEl.style.left = `${canvasX}px`;
        tooltipEl.style.top = `${canvasY}px`;
        tooltipEl.classList.add("visible");
        tooltipEl.setAttribute("aria-hidden", "false");

        chartMeta.textContent = `${stage.name}: ${formatNumber(volume)} | to next: ${convText}`;
      }

      function hideTooltip() {
        tooltipEl.classList.remove("visible");
        tooltipEl.setAttribute("aria-hidden", "true");
        chartMeta.textContent = "Hover any point for details";
      }

      recomputeFromVolumes();
      buildTable();
      resizeCanvas();
    })();
  </script>


</body></html>
