<html lang="en"><head>
  <meta charset="UTF-8">
  <title>Sales Performance Dashboard</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    :root {
      --bg: #0f172a;
      --bg-elevated: #111827;
      --bg-elevated-soft: #020617;
      --text: #e5e7eb;
      --text-muted: #9ca3af;
      --accent: #38bdf8;
      --border-subtle: #1f2937;
      --grid-line: #1f2937;
      --category-electronics: #60a5fa;
      --category-furniture: #f97316;
      --category-clothing: #22c55e;
      --category-food: #eab308;
      --category-sports: #ec4899;
      --focus-ring: 0 0 0 2px rgba(56, 189, 248, 0.8);
      --radius-lg: 12px;
      --radius-md: 8px;
      --transition-fast: 140ms ease-out;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      min-height: 100vh;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: radial-gradient(circle at top, #1e293b 0, #020617 45%, #020617 100%);
      color: var(--text);
      padding: 24px;
      display: flex;
      align-items: stretch;
      justify-content: center;
    }

    .app-shell {
      width: 100%;
      max-width: 1100px;
      background: linear-gradient(145deg, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 1));
      border-radius: 18px;
      padding: 22px 22px 24px;
      box-shadow:
        0 40px 80px rgba(0, 0, 0, 0.7),
        0 0 0 1px rgba(15, 23, 42, 0.8);
      border: 1px solid rgba(148, 163, 184, 0.12);
      backdrop-filter: blur(18px);
      color: var(--text);
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    header.app-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding-bottom: 4px;
      border-bottom: 1px solid rgba(31, 41, 55, 0.9);
    }

    .title-block {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .title-row {
      display: flex;
      align-items: baseline;
      gap: 10px;
    }

    h1 {
      margin: 0;
      font-size: 1.4rem;
      letter-spacing: 0.02em;
      font-weight: 600;
      color: #f9fafb;
    }

    .subtitle {
      font-size: 0.8rem;
      color: var(--text-muted);
    }

    .badge {
      font-size: 0.68rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      padding: 2px 8px 3px;
      border-radius: 999px;
      background: rgba(15, 23, 42, 0.9);
      border: 1px solid rgba(148, 163, 184, 0.35);
      color: #e5e7eb;
    }

    .header-metrics {
      display: flex;
      gap: 18px;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-end;
      font-size: 0.78rem;
    }

    .metric-pill {
      display: inline-flex;
      align-items: baseline;
      gap: 6px;
      padding: 6px 10px;
      border-radius: 999px;
      background: radial-gradient(circle at 0 0, rgba(56, 189, 248, 0.28), transparent 55%), rgba(15, 23, 42, 0.95);
      border: 1px solid rgba(56, 189, 248, 0.6);
      box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.9);
    }

    .metric-pill span.label {
      color: var(--text-muted);
      font-weight: 500;
    }

    .metric-pill span.value {
      font-weight: 600;
      color: #e5f2ff;
    }

    main {
      display: grid;
      grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
      gap: 18px;
      align-items: stretch;
    }

    @media (max-width: 900px) {
      main {
        grid-template-columns: minmax(0, 1fr);
      }
    }

    .panel {
      background: radial-gradient(circle at top left, rgba(30, 64, 175, 0.35), transparent 55%),
                  radial-gradient(circle at bottom right, rgba(8, 47, 73, 0.6), transparent 60%),
                  var(--bg-elevated);
      border-radius: var(--radius-lg);
      padding: 14px 14px 16px;
      border: 1px solid rgba(31, 41, 55, 0.95);
      box-shadow: 0 24px 40px rgba(0, 0, 0, 0.7);
      position: relative;
      overflow: hidden;
    }

    .panel::before {
      content: "";
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at top, rgba(56, 189, 248, 0.08), transparent 55%);
      opacity: 0.3;
      pointer-events: none;
    }

    .panel-inner {
      position: relative;
      z-index: 1;
    }

    .panel-header {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 6px;
      margin-bottom: 10px;
    }

    .panel-title {
      font-size: 0.9rem;
      font-weight: 600;
      letter-spacing: 0.03em;
      text-transform: uppercase;
      color: #e5e7eb;
    }

    .panel-subtitle {
      font-size: 0.72rem;
      color: var(--text-muted);
    }

    /* Region filter */
    .region-filter {
      display: flex;
      flex-wrap: wrap;
      gap: 6px 10px;
      margin-bottom: 8px;
      align-items: center;
      font-size: 0.78rem;
    }

    .region-filter-label {
      color: var(--text-muted);
      font-weight: 500;
      margin-right: 2px;
    }

    .region-chip {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 9px;
      border-radius: 999px;
      border: 1px solid rgba(55, 65, 81, 0.9);
      background: rgba(15, 23, 42, 0.9);
      color: var(--text-muted);
      cursor: pointer;
      user-select: none;
      transition: background var(--transition-fast), border-color var(--transition-fast), color var(--transition-fast), box-shadow var(--transition-fast), transform 80ms ease-out;
      font-size: 0.78rem;
    }

    .region-chip:hover {
      background: rgba(30, 64, 175, 0.7);
      border-color: rgba(96, 165, 250, 0.85);
      color: #e5f2ff;
      box-shadow: 0 0 0 1px rgba(30, 64, 175, 0.9);
      transform: translateY(-1px);
    }

    .region-chip input[type="checkbox"] {
      position: absolute;
      inset: 0;
      opacity: 0;
      cursor: pointer;
      margin: 0;
    }

    .region-chip-indicator {
      width: 13px;
      height: 13px;
      border-radius: 50%;
      border: 1px solid rgba(148, 163, 184, 0.9);
      background: radial-gradient(circle at 30% 30%, rgba(148, 163, 184, 0.6), rgba(15, 23, 42, 0.9));
      box-shadow: inset 0 0 0 1px rgba(15, 23, 42, 0.95);
      flex-shrink: 0;
    }

    .region-chip[data-checked="true"] {
      background: radial-gradient(circle at 0 0, rgba(56, 189, 248, 0.55), transparent 70%), rgba(15, 23, 42, 0.98);
      border-color: rgba(56, 189, 248, 0.95);
      color: #f9fafb;
      box-shadow:
        0 0 0 1px rgba(15, 23, 42, 1),
        0 0 0 1.5px rgba(56, 189, 248, 0.7);
    }

    .region-chip[data-checked="true"] .region-chip-indicator {
      border-color: rgba(15, 23, 42, 0.95);
      background: radial-gradient(circle at 30% 30%, #e0f2fe, #38bdf8);
      box-shadow:
        0 0 12px rgba(56, 189, 248, 0.9),
        inset 0 0 0 1px rgba(8, 47, 73, 0.95);
    }

    .region-chip-name {
      font-weight: 500;
    }

    /* Legend */
    .legend {
      display: flex;
      flex-wrap: wrap;
      gap: 6px 12px;
      margin-top: 4px;
      margin-bottom: 8px;
      font-size: 0.72rem;
      color: var(--text-muted);
    }

    .legend-item {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .legend-swatch {
      width: 11px;
      height: 11px;
      border-radius: 3px;
      box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.7);
    }

    .legend-label {
      white-space: nowrap;
    }

    .legend-note {
      margin-left: auto;
      font-style: italic;
      max-width: 45%;
      text-align: right;
      color: #6b7280;
    }

    @media (max-width: 900px) {
      .legend-note {
        flex-basis: 100%;
        text-align: left;
        margin-top: 2px;
      }
    }

    /* Chart area */
    .chart-wrapper {
      margin-top: 4px;
      padding: 10px 10px 14px 14px;
      border-radius: var(--radius-md);
      background: radial-gradient(circle at top right, rgba(15, 118, 110, 0.35), transparent 60%), var(--bg-elevated-soft);
      box-shadow: inset 0 0 0 1px rgba(15, 23, 42, 0.95);
      position: relative;
    }

    .chart-and-axes {
      display: grid;
      grid-template-columns: auto minmax(0, 1fr);
      column-gap: 12px;
      align-items: stretch;
      min-height: 200px;
    }

    @media (max-width: 600px) {
      .chart-and-axes {
        column-gap: 8px;
      }
    }

    .y-axis {
      display: flex;
      flex-direction: column-reverse;
      justify-content: space-between;
      align-items: flex-end;
      font-size: 0.7rem;
      color: var(--text-muted);
      padding: 10px 4px 22px 0;
    }

    .y-axis-label {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      margin-top: 4px;
      font-size: 0.72rem;
      color: #9ca3af;
    }

    .y-axis-title {
      writing-mode: vertical-rl;
      transform: rotate(180deg);
      text-transform: uppercase;
      letter-spacing: 0.16em;
      font-weight: 600;
    }

    .y-axis-unit {
      font-size: 0.7rem;
    }

    .chart-main {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 6px 0 18px;
    }

    .chart-grid {
      position: absolute;
      inset: 6px 0 22px 0;
      display: flex;
      flex-direction: column-reverse;
      justify-content: space-between;
      pointer-events: none;
    }

    .chart-grid-line {
      border-top: 1px solid rgba(31, 41, 55, 0.95);
      opacity: 0.9;
    }

    .chart-grid-line.major {
      border-top-color: rgba(55, 65, 81, 0.95);
      box-shadow: 0 -1px 0 rgba(15, 23, 42, 0.85);
    }

    .chart-grid-line.zero {
      border-top-color: rgba(56, 189, 248, 0.9);
      box-shadow: 0 0 14px rgba(56, 189, 248, 0.5);
      opacity: 0.85;
    }

    .chart-grid-line.zero::after {
      content: "0";
      position: absolute;
      left: 4px;
      top: -7px;
      font-size: 0.7rem;
      color: rgba(148, 163, 184, 0.8);
      background: linear-gradient(to right, rgba(15, 23, 42, 0.95), transparent 70%);
      padding: 0 4px;
    }

    .chart-viewport {
      position: relative;
      flex: 1;
      display: flex;
      align-items: flex-end;
      justify-content: flex-start;
      gap: 16px;
      padding: 4px 4px 0 4px;
    }

    .bars-empty-state {
      font-size: 0.8rem;
      color: var(--text-muted);
      margin: auto;
      text-align: center;
      max-width: 280px;
      padding: 8px 10px;
      border-radius: 8px;
      background: rgba(15, 23, 42, 0.9);
      border: 1px dashed rgba(75, 85, 99, 0.9);
    }

    .bars-empty-state strong {
      color: #e5e7eb;
    }

    .bars-container {
      display: flex;
      align-items: flex-end;
      justify-content: flex-start;
      gap: 16px;
      width: 100%;
    }

    @media (max-width: 600px) {
      .bars-container {
        gap: 10px;
      }
    }

    .bar {
      flex: 1 1 0;
      max-width: 80px;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      min-width: 0;
    }

    .bar-stack {
      position: relative;
      border-radius: 7px;
      overflow: hidden;
      display: flex;
      flex-direction: column-reverse;
      background: radial-gradient(circle at 50% 0, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 1));
      box-shadow:
        0 0 0 1px rgba(15, 23, 42, 0.95),
        0 10px 14px rgba(0, 0, 0, 0.8);
      cursor: default;
      transition: transform 120ms ease-out, box-shadow 120ms ease-out;
    }

    .bar:hover .bar-stack {
      transform: translateY(-3px) scale(1.01);
      box-shadow:
        0 0 0 1px rgba(15, 23, 42, 0.95),
        0 16px 28px rgba(0, 0, 0, 0.9);
    }

    .bar-segment {
      width: 100%;
      position: relative;
      transition: opacity var(--transition-fast), filter var(--transition-fast), transform 120ms ease-out;
      border-top: 1px solid rgba(15, 23, 42, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .bar-segment-inner {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: inset 0 0 0 1px rgba(15, 23, 42, 0.7);
    }

    .bar-segment.highlighted {
      filter: brightness(1.08) saturate(1.2);
      transform: translateY(-1px);
      box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.95);
      z-index: 2;
    }

    .bar-segment.dimmed {
      opacity: 0.35;
      filter: grayscale(0.4) brightness(0.85);
    }

    .bar-segment::after {
      content: attr(data-tooltip);
      position: absolute;
      left: 50%;
      bottom: 100%;
      transform: translate(-50%, -6px);
      background: radial-gradient(circle at top, rgba(15, 23, 42, 1), rgba(15, 23, 42, 0.98));
      border-radius: 7px;
      padding: 5px 7px;
      font-size: 0.7rem;
      color: #e5e7eb;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: opacity 120ms ease-out, transform 120ms ease-out;
      border: 1px solid rgba(148, 163, 184, 0.35);
      box-shadow:
        0 0 0 1px rgba(15, 23, 42, 1),
        0 10px 20px rgba(0, 0, 0, 0.8);
      z-index: 50;
    }

    .bar-segment:hover::after,
    .bar-segment:focus-visible::after {
      opacity: 1;
      transform: translate(-50%, -8px);
    }

    .bar-segment:focus-visible {
      outline: none;
      box-shadow: var(--focus-ring);
      z-index: 3;
    }

    .bar-total-label {
      font-size: 0.72rem;
      color: #e5e7eb;
      text-align: center;
      margin: 3px 0 1px;
      font-variant-numeric: tabular-nums;
    }

    .bar-region-label {
      font-size: 0.78rem;
      color: #9ca3af;
      text-align: center;
      margin-top: 2px;
      letter-spacing: 0.03em;
      text-transform: uppercase;
      white-space: nowrap;
    }

    .x-axis-labels {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 4px;
      padding: 0 4px 0 2px;
      gap: 10px;
    }

    .x-axis-title {
      font-size: 0.72rem;
      text-transform: uppercase;
      letter-spacing: 0.14em;
      color: #9ca3af;
    }

    .x-axis-note {
      font-size: 0.7rem;
      color: #6b7280;
      margin-left: auto;
      text-align: right;
    }

    /* Table */
    .table-wrapper {
      margin-top: 6px;
      border-radius: 10px;
      background: radial-gradient(circle at top left, rgba(37, 99, 235, 0.4), transparent 60%),
                  radial-gradient(circle at bottom right, rgba(8, 47, 73, 0.7), transparent 60%),
                  var(--bg-elevated-soft);
      border: 1px solid rgba(31, 41, 55, 0.95);
      box-shadow: inset 0 0 0 1px rgba(15, 23, 42, 0.95);
      overflow: hidden;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.8rem;
      color: var(--text);
    }

    thead {
      background: linear-gradient(to right, rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 1));
    }

    th, td {
      padding: 7px 9px;
      text-align: left;
      border-bottom: 1px solid rgba(31, 41, 55, 0.96);
    }

    th {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.13em;
      color: #9ca3af;
      font-weight: 600;
      white-space: nowrap;
    }

    tbody tr:last-child td {
      border-bottom: none;
    }

    tbody tr {
      transition: background var(--transition-fast), transform 100ms ease-out;
    }

    tbody tr:nth-child(even) td {
      background: rgba(15, 23, 42, 0.7);
    }

    tbody tr:nth-child(odd) td {
      background: rgba(15, 23, 42, 0.9);
    }

    tbody tr.highlighted-row td {
      background: linear-gradient(to right, rgba(56, 189, 248, 0.16), rgba(8, 47, 73, 0.6));
      box-shadow: inset 0 0 0 1px rgba(56, 189, 248, 0.7);
      transform: translateY(-1px);
    }

    tbody tr:hover td {
      background: linear-gradient(to right, rgba(17, 24, 39, 0.4), rgba(17, 24, 39, 0.8));
    }

    .cell-category {
      display: flex;
      align-items: center;
      gap: 8px;
      white-space: nowrap;
    }

    .cell-color-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      box-shadow:
        0 0 0 1px rgba(15, 23, 42, 0.95),
        0 0 8px rgba(15, 23, 42, 0.8);
      flex-shrink: 0;
    }

    .cell-category-name {
      font-weight: 500;
    }

    .cell-category-meta {
      font-size: 0.7rem;
      color: var(--text-muted);
      margin-left: 2px;
    }

    .cell-right {
      text-align: right;
      font-variant-numeric: tabular-nums;
    }

    .cell-rank {
      font-weight: 600;
      font-size: 0.8rem;
    }

    .cell-rank span {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 20px;
      padding: 0 4px;
      border-radius: 999px;
      border: 1px solid rgba(55, 65, 81, 0.95);
      background: radial-gradient(circle at 50% 0, rgba(148, 163, 184, 0.4), rgba(15, 23, 42, 0.95));
      color: #e5e7eb;
    }

    .cell-rank span[data-rank="1"] {
      background: radial-gradient(circle at 0 0, rgba(253, 224, 71, 0.7), rgba(15, 23, 42, 0.96));
      border-color: rgba(250, 204, 21, 0.9);
      color: #fefce8;
      box-shadow:
        0 0 0 1px rgba(15, 23, 42, 1),
        0 0 10px rgba(250, 204, 21, 0.8);
    }

    .table-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 10px 7px;
      font-size: 0.72rem;
      color: var(--text-muted);
      border-top: 1px solid rgba(31, 41, 55, 0.96);
      background: linear-gradient(to right, rgba(15, 23, 42, 1), rgba(15, 23, 42, 0.95));
    }

    .table-footer strong {
      color: #e5e7eb;
      font-weight: 600;
    }

    .sync-indicator {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .sync-dot {
      width: 7px;
      height: 7px;
      border-radius: 999px;
      background: radial-gradient(circle at 30% 30%, #bbf7d0, #22c55e);
      box-shadow:
        0 0 0 1px rgba(15, 23, 42, 1),
        0 0 10px rgba(22, 163, 74, 0.9);
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  </style>
</head>
<body>
  <div class="app-shell" aria-label="Sales performance dashboard">
    <header class="app-header">
      <div class="title-block">
        <div class="title-row">
          <h1>Sales Performance by Region &amp; Category</h1>
          <span class="badge" aria-hidden="true">Client-side demo</span>
        </div>
        <div class="subtitle">Interactive stacked bar chart and ranking table that always stay in sync.</div>
      </div>
      <div class="header-metrics" aria-hidden="true">
        <div class="metric-pill">
          <span class="label">Total Sales (All Regions)</span>
          <span class="value" id="header-total-sales">$5,300,000</span>
        </div>
      </div>
    </header>

    <main>
      <section class="panel" aria-labelledby="chart-title">
        <div class="panel-inner">
          <div class="panel-header">
            <div>
              <div id="chart-title" class="panel-title">Stacked Bar Chart</div>
              <div class="panel-subtitle">Each bar is a region. Colors represent product categories.</div>
            </div>
          </div>

          <div class="region-filter" aria-label="Region filters">
            <span class="region-filter-label">Regions:</span>
            <label class="region-chip" data-region="North" data-checked="true">
              <span class="region-chip-indicator" aria-hidden="true"></span>
              <span class="region-chip-name">North</span>
              <input type="checkbox" checked="" aria-label="Toggle North region">
            </label>
            <label class="region-chip" data-region="South" data-checked="true">
              <span class="region-chip-indicator" aria-hidden="true"></span>
              <span class="region-chip-name">South</span>
              <input type="checkbox" checked="" aria-label="Toggle South region">
            </label>
            <label class="region-chip" data-region="East" data-checked="true">
              <span class="region-chip-indicator" aria-hidden="true"></span>
              <span class="region-chip-name">East</span>
              <input type="checkbox" checked="" aria-label="Toggle East region">
            </label>
            <label class="region-chip" data-region="West" data-checked="true">
              <span class="region-chip-indicator" aria-hidden="true"></span>
              <span class="region-chip-name">West</span>
              <input type="checkbox" checked="" aria-label="Toggle West region">
            </label>
          </div>

          <div class="legend" aria-hidden="true">
            <div class="legend-item"><span class="legend-swatch" style="background: var(--category-electronics);"></span><span class="legend-label">Electronics</span></div>
            <div class="legend-item"><span class="legend-swatch" style="background: var(--category-furniture);"></span><span class="legend-label">Furniture</span></div>
            <div class="legend-item"><span class="legend-swatch" style="background: var(--category-clothing);"></span><span class="legend-label">Clothing</span></div>
            <div class="legend-item"><span class="legend-swatch" style="background: var(--category-food);"></span><span class="legend-label">Food</span></div>
            <div class="legend-item"><span class="legend-swatch" style="background: var(--category-sports);"></span><span class="legend-label">Sports</span></div>
            <div class="legend-note">Hover a segment to highlight the same category in the ranking table.</div>
          </div>

          <div class="chart-wrapper" role="img" aria-label="Stacked bar chart of sales by region and product category">
            <div class="chart-and-axes">
              <div class="y-axis" aria-hidden="true"><div></div><div>$500k</div><div>$1,000k</div><div>$1,500k</div><div>$2,000k</div></div>
              <div class="chart-main">
                <div class="chart-grid" aria-hidden="true"><div class="chart-grid-line zero"></div><div class="chart-grid-line"></div><div class="chart-grid-line"></div><div class="chart-grid-line"></div><div class="chart-grid-line major"></div></div>
                <div class="chart-viewport">
                  <div class="bars-empty-state" id="bars-empty-state" hidden="">
                    <strong>No regions selected.</strong><br>
                    Turn on at least one region above to see the chart and ranking table.
                  </div>
                  <div class="bars-container" id="bars-container"><div class="bar"><div class="bar-stack" role="group" aria-label="East total sales $1,370,000"><button type="button" class="bar-segment" data-category="Electronics" data-region="East" data-value="390000" data-tooltip="Electronics in East: $390,000" aria-label="Electronics in East: $390,000" style="height: 19.5%;"><div class="bar-segment-inner" style="background: linear-gradient(to top, rgb(96, 165, 250), rgba(96, 165, 250, 0.8));"></div></button><button type="button" class="bar-segment" data-category="Furniture" data-region="East" data-value="250000" data-tooltip="Furniture in East: $250,000" aria-label="Furniture in East: $250,000" style="height: 12.5%;"><div class="bar-segment-inner" style="background: linear-gradient(to top, rgb(249, 115, 22), rgba(249, 115, 22, 0.8));"></div></button><button type="button" class="bar-segment" data-category="Clothing" data-region="East" data-value="230000" data-tooltip="Clothing in East: $230,000" aria-label="Clothing in East: $230,000" style="height: 11.5%;"><div class="bar-segment-inner" style="background: linear-gradient(to top, rgb(34, 197, 94), rgba(34, 197, 94, 0.8));"></div></button><button type="button" class="bar-segment" data-category="Food" data-region="East" data-value="290000" data-tooltip="Food in East: $290,000" aria-label="Food in East: $290,000" style="height: 14.5%;"><div class="bar-segment-inner" style="background: linear-gradient(to top, rgb(234, 179, 8), rgba(234, 179, 8, 0.8));"></div></button><button type="button" class="bar-segment" data-category="Sports" data-region="East" data-value="210000" data-tooltip="Sports in East: $210,000" aria-label="Sports in East: $210,000" style="height: 10.5%;"><div class="bar-segment-inner" style="background: linear-gradient(to top, rgb(236, 72, 153), rgba(236, 72, 153, 0.8));"></div></button></div><div class="bar-total-label">$1,370,000</div><div class="bar-region-label">East</div></div><div class="bar"><div class="bar-stack" role="group" aria-label="West total sales $1,340,000"><button type="button" class="bar-segment" data-category="Electronics" data-region="West" data-value="350000" data-tooltip="Electronics in West: $350,000" aria-label="Electronics in West: $350,000" style="height: 17.5%;"><div class="bar-segment-inner" style="background: linear-gradient(to top, rgb(96, 165, 250), rgba(96, 165, 250, 0.8));"></div></button><button type="button" class="bar-segment" data-category="Furniture" data-region="West" data-value="260000" data-tooltip="Furniture in West: $260,000" aria-label="Furniture in West: $260,000" style="height: 13%;"><div class="bar-segment-inner" style="background: linear-gradient(to top, rgb(249, 115, 22), rgba(249, 115, 22, 0.8));"></div></button><button type="button" class="bar-segment" data-category="Clothing" data-region="West" data-value="220000" data-tooltip="Clothing in West: $220,000" aria-label="Clothing in West: $220,000" style="height: 11%;"><div class="bar-segment-inner" style="background: linear-gradient(to top, rgb(34, 197, 94), rgba(34, 197, 94, 0.8));"></div></button><button type="button" class="bar-segment" data-category="Food" data-region="West" data-value="310000" data-tooltip="Food in West: $310,000" aria-label="Food in West: $310,000" style="height: 15.5%;"><div class="bar-segment-inner" style="background: linear-gradient(to top, rgb(234, 179, 8), rgba(234, 179, 8, 0.8));"></div></button><button type="button" class="bar-segment" data-category="Sports" data-region="West" data-value="200000" data-tooltip="Sports in West: $200,000" aria-label="Sports in West: $200,000" style="height: 10%;"><div class="bar-segment-inner" style="background: linear-gradient(to top, rgb(236, 72, 153), rgba(236, 72, 153, 0.8));"></div></button></div><div class="bar-total-label">$1,340,000</div><div class="bar-region-label">West</div></div><div class="bar"><div class="bar-stack" role="group" aria-label="South total sales $1,320,000"><button type="button" class="bar-segment" data-category="Electronics" data-region="South" data-value="310000" data-tooltip="Electronics in South: $310,000" aria-label="Electronics in South: $310,000" style="height: 15.5%;"><div class="bar-segment-inner" style="background: linear-gradient(to top, rgb(96, 165, 250), rgba(96, 165, 250, 0.8));"></div></button><button type="button" class="bar-segment" data-category="Furniture" data-region="South" data-value="280000" data-tooltip="Furniture in South: $280,000" aria-label="Furniture in South: $280,000" style="height: 14%;"><div class="bar-segment-inner" style="background: linear-gradient(to top, rgb(249, 115, 22), rgba(249, 115, 22, 0.8));"></div></button><button type="button" class="bar-segment" data-category="Clothing" data-region="South" data-value="210000" data-tooltip="Clothing in South: $210,000" aria-label="Clothing in South: $210,000" style="height: 10.5%;"><div class="bar-segment-inner" style="background: linear-gradient(to top, rgb(34, 197, 94), rgba(34, 197, 94, 0.8));"></div></button><button type="button" class="bar-segment" data-category="Food" data-region="South" data-value="330000" data-tooltip="Food in South: $330,000" aria-label="Food in South: $330,000" style="height: 16.5%;"><div class="bar-segment-inner" style="background: linear-gradient(to top, rgb(234, 179, 8), rgba(234, 179, 8, 0.8));"></div></button><button type="button" class="bar-segment" data-category="Sports" data-region="South" data-value="190000" data-tooltip="Sports in South: $190,000" aria-label="Sports in South: $190,000" style="height: 9.5%;"><div class="bar-segment-inner" style="background: linear-gradient(to top, rgb(236, 72, 153), rgba(236, 72, 153, 0.8));"></div></button></div><div class="bar-total-label">$1,320,000</div><div class="bar-region-label">South</div></div><div class="bar"><div class="bar-stack" role="group" aria-label="North total sales $1,270,000"><button type="button" class="bar-segment" data-category="Electronics" data-region="North" data-value="420000" data-tooltip="Electronics in North: $420,000" aria-label="Electronics in North: $420,000" style="height: 21%;"><div class="bar-segment-inner" style="background: linear-gradient(to top, rgb(96, 165, 250), rgba(96, 165, 250, 0.8));"></div></button><button type="button" class="bar-segment" data-category="Furniture" data-region="North" data-value="230000" data-tooltip="Furniture in North: $230,000" aria-label="Furniture in North: $230,000" style="height: 11.5%;"><div class="bar-segment-inner" style="background: linear-gradient(to top, rgb(249, 115, 22), rgba(249, 115, 22, 0.8));"></div></button><button type="button" class="bar-segment" data-category="Clothing" data-region="North" data-value="190000" data-tooltip="Clothing in North: $190,000" aria-label="Clothing in North: $190,000" style="height: 9.5%;"><div class="bar-segment-inner" style="background: linear-gradient(to top, rgb(34, 197, 94), rgba(34, 197, 94, 0.8));"></div></button><button type="button" class="bar-segment" data-category="Food" data-region="North" data-value="260000" data-tooltip="Food in North: $260,000" aria-label="Food in North: $260,000" style="height: 13%;"><div class="bar-segment-inner" style="background: linear-gradient(to top, rgb(234, 179, 8), rgba(234, 179, 8, 0.8));"></div></button><button type="button" class="bar-segment" data-category="Sports" data-region="North" data-value="170000" data-tooltip="Sports in North: $170,000" aria-label="Sports in North: $170,000" style="height: 8.5%;"><div class="bar-segment-inner" style="background: linear-gradient(to top, rgb(236, 72, 153), rgba(236, 72, 153, 0.8));"></div></button></div><div class="bar-total-label">$1,270,000</div><div class="bar-region-label">North</div></div></div>
                </div>
                <div class="x-axis-labels" aria-hidden="true">
                  <div class="x-axis-title">Regions (sorted by total sales)</div>
                  <div class="x-axis-note">Sum of all category totals in the table always matches the chart.</div>
                </div>
              </div>
            </div>
            <div class="y-axis-label" aria-hidden="true">
              <span class="y-axis-title">Sales</span>
              <span class="y-axis-unit">USD</span>
            </div>
          </div>
        </div>
      </section>

      <section class="panel" aria-labelledby="table-title">
        <div class="panel-inner">
          <div class="panel-header">
            <div>
              <div id="table-title" class="panel-title">Ranking Table</div>
              <div class="panel-subtitle">Product categories ranked by total sales for the selected regions.</div>
            </div>
          </div>

          <div class="table-wrapper" aria-live="polite">
            <table>
              <thead>
                <tr>
                  <th scope="col">Category</th>
                  <th scope="col" class="cell-right">Total Sales</th>
                  <th scope="col" class="cell-right">Market Share</th>
                  <th scope="col" class="cell-right">Rank</th>
                </tr>
              </thead>
              <tbody id="ranking-tbody"><tr data-category="Electronics"><td scope="row"><div class="cell-category"><span class="cell-color-dot" style="background: rgb(96, 165, 250);"></span><span class="cell-category-name">Electronics</span><span class="cell-category-meta">Across all regions</span></div></td><td class="cell-right">$1,470,000</td><td class="cell-right">27.7%</td><td class="cell-right cell-rank"><span data-rank="1">1</span></td></tr><tr data-category="Food"><td scope="row"><div class="cell-category"><span class="cell-color-dot" style="background: rgb(234, 179, 8);"></span><span class="cell-category-name">Food</span><span class="cell-category-meta">Across all regions</span></div></td><td class="cell-right">$1,190,000</td><td class="cell-right">22.5%</td><td class="cell-right cell-rank"><span data-rank="2">2</span></td></tr><tr data-category="Furniture"><td scope="row"><div class="cell-category"><span class="cell-color-dot" style="background: rgb(249, 115, 22);"></span><span class="cell-category-name">Furniture</span><span class="cell-category-meta">Across all regions</span></div></td><td class="cell-right">$1,020,000</td><td class="cell-right">19.2%</td><td class="cell-right cell-rank"><span data-rank="3">3</span></td></tr><tr data-category="Clothing"><td scope="row"><div class="cell-category"><span class="cell-color-dot" style="background: rgb(34, 197, 94);"></span><span class="cell-category-name">Clothing</span><span class="cell-category-meta">Across all regions</span></div></td><td class="cell-right">$850,000</td><td class="cell-right">16.0%</td><td class="cell-right cell-rank"><span data-rank="4">4</span></td></tr><tr data-category="Sports"><td scope="row"><div class="cell-category"><span class="cell-color-dot" style="background: rgb(236, 72, 153);"></span><span class="cell-category-name">Sports</span><span class="cell-category-meta">Across all regions</span></div></td><td class="cell-right">$770,000</td><td class="cell-right">14.5%</td><td class="cell-right cell-rank"><span data-rank="5">5</span></td></tr></tbody>
            </table>
            <div class="table-footer">
              <div>
                Total (selected regions): <strong id="footer-total-sales">$5,300,000</strong>
              </div>
              <div class="sync-indicator">
                <span class="sync-dot" aria-hidden="true"></span>
                <span>Chart and table are fully synchronized.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>

  <script>
    (function () {
      // --- Data -----------------------------------------------------------------
      const categories = [
        { id: 'Electronics', colorVar: '--category-electronics' },
        { id: 'Furniture', colorVar: '--category-furniture' },
        { id: 'Clothing', colorVar: '--category-clothing' },
        { id: 'Food', colorVar: '--category-food' },
        { id: 'Sports', colorVar: '--category-sports' }
      ];

      const regions = ['North', 'South', 'East', 'West'];

      // Sales data: values are in dollars
      const salesData = {
        North: {
          Electronics: 420000,
          Furniture: 230000,
          Clothing: 190000,
          Food: 260000,
          Sports: 170000
        },
        South: {
          Electronics: 310000,
          Furniture: 280000,
          Clothing: 210000,
          Food: 330000,
          Sports: 190000
        },
        East: {
          Electronics: 390000,
          Furniture: 250000,
          Clothing: 230000,
          Food: 290000,
          Sports: 210000
        },
        West: {
          Electronics: 350000,
          Furniture: 260000,
          Clothing: 220000,
          Food: 310000,
          Sports: 200000
        }
      };

      // --- State ----------------------------------------------------------------
      let activeRegions = new Set(regions); // all selected by default
      let currentCategoryHover = null; // category id or null

      // --- DOM references -------------------------------------------------------
      const barsContainer = document.getElementById('bars-container');
      const barsEmptyState = document.getElementById('bars-empty-state');
      const rankingTbody = document.getElementById('ranking-tbody');
      const headerTotalSales = document.getElementById('header-total-sales');
      const footerTotalSales = document.getElementById('footer-total-sales');
      const yAxisEl = document.querySelector('.y-axis');
      const chartGridEl = document.querySelector('.chart-grid');
      const regionChips = document.querySelectorAll('.region-chip');

      // --- Helpers --------------------------------------------------------------
      function formatCurrency(value) {
        return '$' + value.toLocaleString('en-US', { maximumFractionDigits: 0 });
      }

      function formatPercent(value) {
        return (value * 100).toFixed(1) + '%';
      }

      function computeRegionTotals() {
        const result = [];
        activeRegions.forEach((region) => {
          const catSales = salesData[region];
          let total = 0;
          categories.forEach((cat) => {
            total += catSales[cat.id];
          });
          result.push({ region, total });
        });
        // Sort descending by total
        result.sort((a, b) => b.total - a.total);
        return result;
      }

      function computeCategoryTotals() {
        const totals = {};
        categories.forEach((cat) => {
          totals[cat.id] = 0;
        });

        activeRegions.forEach((region) => {
          const catSales = salesData[region];
          categories.forEach((cat) => {
            totals[cat.id] += catSales[cat.id];
          });
        });

        const totalAll = Object.values(totals).reduce((sum, v) => sum + v, 0);

        const entries = categories.map((cat) => ({
          category: cat.id,
          total: totals[cat.id],
          share: totalAll > 0 ? totals[cat.id] / totalAll : 0
        }));

        // Sort descending by total
        entries.sort((a, b) => b.total - a.total);

        // Assign rank (shared rank if equal totals)
        let currentRank = 0;
        let lastTotal = null;
        entries.forEach((entry, index) => {
          if (lastTotal === null || entry.total < lastTotal) {
            currentRank = index + 1;
          }
          entry.rank = currentRank;
          lastTotal = entry.total;
        });

        return { entries, totalAll };
      }

      function computeMaxYAxisValue() {
        // Max region total among selected regions
        const regionTotals = computeRegionTotals();
        let max = 0;
        regionTotals.forEach((r) => {
          if (r.total > max) max = r.total;
        });
        if (max === 0) return 100000; // fallback

        // Round up to a nice value (1, 2, 5 × 10^n)
        const magnitude = Math.pow(10, Math.floor(Math.log10(max)));
        const normalized = max / magnitude;
        let nice;
        if (normalized <= 1) nice = 1;
        else if (normalized <= 2) nice = 2;
        else if (normalized <= 5) nice = 5;
        else nice = 10;
        return nice * magnitude;
      }

      function getCategoryColor(categoryId) {
        const cat = categories.find((c) => c.id === categoryId);
        if (!cat) return '#6b7280';
        return getComputedStyle(document.documentElement).getPropertyValue(cat.colorVar) || '#6b7280';
      }

      // --- Rendering: Chart -----------------------------------------------------
      function renderYAxis(maxValue) {
        yAxisEl.innerHTML = '';
        const ticks = 4; // including top (excluding zero for labels here)
        for (let i = 0; i <= ticks; i++) {
          const value = (maxValue / ticks) * i;
          const div = document.createElement('div');
          div.textContent = value === 0 ? '' : formatCurrency(value / 1000).replace('$', '$') + 'k';
          yAxisEl.appendChild(div);
        }
      }

      function renderGridLines(maxValue) {
        chartGridEl.innerHTML = '';
        const lines = 4; // match ticks above 0 + zero line
        for (let i = 0; i <= lines; i++) {
          const line = document.createElement('div');
          line.className = 'chart-grid-line';
          if (i === 0) {
            line.classList.add('zero');
          } else if (i === lines) {
            line.classList.add('major');
          }
          chartGridEl.appendChild(line);
        }
      }

      function renderBars() {
        const regionTotals = computeRegionTotals();

        if (regionTotals.length === 0) {
          barsContainer.innerHTML = '';
          barsEmptyState.hidden = false;
          return;
        }

        barsEmptyState.hidden = true;
        const maxValue = computeMaxYAxisValue();
        renderYAxis(maxValue);
        renderGridLines(maxValue);

        barsContainer.innerHTML = '';

        regionTotals.forEach(({ region, total }) => {
          const barEl = document.createElement('div');
          barEl.className = 'bar';

          const stackEl = document.createElement('div');
          stackEl.className = 'bar-stack';
          stackEl.setAttribute('role', 'group');
          stackEl.setAttribute('aria-label', `${region} total sales ${formatCurrency(total)}`);

          const regionSales = salesData[region];
          let accumulated = 0;

          // Build segments from bottom to top
          categories.forEach((cat) => {
            const value = regionSales[cat.id];
            accumulated += value;
            const heightPercent = (value / maxValue) * 100;
            const seg = document.createElement('button');
            seg.type = 'button';
            seg.className = 'bar-segment';
            seg.style.height = Math.max(heightPercent, 2) + '%';
            const color = getCategoryColor(cat.id);

            const inner = document.createElement('div');
            inner.className = 'bar-segment-inner';
            inner.style.background = `linear-gradient(to top, ${color.trim()}, ${color.trim()}cc)`;
            seg.appendChild(inner);

            seg.dataset.category = cat.id;
            seg.dataset.region = region;
            seg.dataset.value = String(value);

            const tooltipText = `${cat.id} in ${region}: ${formatCurrency(value)}`;
            seg.setAttribute('data-tooltip', tooltipText);
            seg.setAttribute('aria-label', tooltipText);

            seg.addEventListener('mouseenter', () => handleCategoryHover(cat.id));
            seg.addEventListener('focus', () => handleCategoryHover(cat.id));
            seg.addEventListener('mouseleave', () => handleCategoryHover(null));
            seg.addEventListener('blur', () => handleCategoryHover(null));

            stackEl.appendChild(seg);
          });

          const totalLabel = document.createElement('div');
          totalLabel.className = 'bar-total-label';
          totalLabel.textContent = formatCurrency(total);

          const regionLabel = document.createElement('div');
          regionLabel.className = 'bar-region-label';
          regionLabel.textContent = region;

          barEl.appendChild(stackEl);
          barEl.appendChild(totalLabel);
          barEl.appendChild(regionLabel);

          barsContainer.appendChild(barEl);
        });

        applyCategoryHighlighting();
      }

      // --- Rendering: Table -----------------------------------------------------
      function renderTable() {
        const { entries, totalAll } = computeCategoryTotals();

        rankingTbody.innerHTML = '';

        entries.forEach((entry) => {
          const tr = document.createElement('tr');
          tr.dataset.category = entry.category;

          const catTd = document.createElement('td');
          catTd.scope = 'row';

          const catWrapper = document.createElement('div');
          catWrapper.className = 'cell-category';

          const dot = document.createElement('span');
          dot.className = 'cell-color-dot';
          dot.style.background = getCategoryColor(entry.category);

          const nameSpan = document.createElement('span');
          nameSpan.className = 'cell-category-name';
          nameSpan.textContent = entry.category;

          const metaSpan = document.createElement('span');
          metaSpan.className = 'cell-category-meta';
          const regionalText = activeRegions.size === regions.length ? 'all regions' : 'selected regions';
          metaSpan.textContent = `Across ${regionalText}`;

          catWrapper.appendChild(dot);
          catWrapper.appendChild(nameSpan);
          catWrapper.appendChild(metaSpan);
          catTd.appendChild(catWrapper);

          const totalTd = document.createElement('td');
          totalTd.className = 'cell-right';
          totalTd.textContent = formatCurrency(entry.total);

          const shareTd = document.createElement('td');
          shareTd.className = 'cell-right';
          shareTd.textContent = totalAll > 0 ? formatPercent(entry.share) : '0.0%';

          const rankTd = document.createElement('td');
          rankTd.className = 'cell-right cell-rank';
          const rankSpan = document.createElement('span');
          rankSpan.dataset.rank = String(entry.rank);
          rankSpan.textContent = entry.rank;
          rankTd.appendChild(rankSpan);

          tr.appendChild(catTd);
          tr.appendChild(totalTd);
          tr.appendChild(shareTd);
          tr.appendChild(rankTd);

          rankingTbody.appendChild(tr);
        });

        headerTotalSales.textContent = formatCurrency(totalAll);
        footerTotalSales.textContent = formatCurrency(totalAll);

        applyCategoryHighlighting();
      }

      // --- Highlighting sync ----------------------------------------------------
      function handleCategoryHover(categoryId) {
        currentCategoryHover = categoryId;
        applyCategoryHighlighting();
      }

      function applyCategoryHighlighting() {
        const barSegments = document.querySelectorAll('.bar-segment');
        const rows = rankingTbody.querySelectorAll('tr');

        if (!currentCategoryHover) {
          barSegments.forEach((seg) => {
            seg.classList.remove('highlighted', 'dimmed');
          });
          rows.forEach((row) => {
            row.classList.remove('highlighted-row');
          });
          return;
        }

        barSegments.forEach((seg) => {
          if (seg.dataset.category === currentCategoryHover) {
            seg.classList.add('highlighted');
            seg.classList.remove('dimmed');
          } else {
            seg.classList.remove('highlighted');
            seg.classList.add('dimmed');
          }
        });

        rows.forEach((row) => {
          if (row.dataset.category === currentCategoryHover) {
            row.classList.add('highlighted-row');
          } else {
            row.classList.remove('highlighted-row');
          }
        });
      }

      // --- Region filter interaction -------------------------------------------
      function syncRegionChipState(chip, checked) {
        chip.dataset.checked = checked ? 'true' : 'false';
        const input = chip.querySelector('input[type="checkbox"]');
        if (input) {
          input.checked = checked;
        }
      }

      function onRegionToggle(chip) {
        const region = chip.dataset.region;
        const input = chip.querySelector('input[type="checkbox"]');
        if (!region || !input) return;

        const willBeChecked = !input.checked;
        if (!willBeChecked && activeRegions.size === 1 && activeRegions.has(region)) {
          // Prevent removing last region: keep at least one selected
          input.checked = true;
          return;
        }

        if (willBeChecked) {
          activeRegions.add(region);
        } else {
          activeRegions.delete(region);
        }

        syncRegionChipState(chip, willBeChecked);

        // Re-render views
        renderBars();
        renderTable();
      }

      regionChips.forEach((chip) => {
        const input = chip.querySelector('input[type="checkbox"]');
        if (!input) return;
        // Click behavior on the chip surface
        chip.addEventListener('click', (e) => {
          // Avoid double-toggle when clicking directly on checkbox
          if (e.target === input) return;
          onRegionToggle(chip);
        });
        // Keyboard / direct input change
        input.addEventListener('change', () => {
          onRegionToggle(chip);
        });
      });

      // --- Initialization -------------------------------------------------------
      function init() {
        // Precompute header total for all regions (static overall metric)
        const fullTotals = Object.values(computeCategoryTotalsForAllRegions());
        const fullTotal = fullTotals.reduce((sum, v) => sum + v, 0);
        headerTotalSales.textContent = formatCurrency(fullTotal);

        // Now render based on activeRegions
        renderBars();
        renderTable();
      }

      function computeCategoryTotalsForAllRegions() {
        const totals = {};
        categories.forEach((cat) => {
          totals[cat.id] = 0;
        });
        regions.forEach((region) => {
          const catSales = salesData[region];
          categories.forEach((cat) => {
            totals[cat.id] += catSales[cat.id];
          });
        });
        return totals;
      }

      init();
    })();
  </script>


</body></html>
