<html lang="en"><head>
  <meta charset="UTF-8">
  <title>Yes/No Adventure Story</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    :root {
      --bg: #060712;
      --bg-elevated: #101321;
      --bg-elevated-soft: #15182a;
      --accent: #4fd5ff;
      --accent-soft: rgba(79, 213, 255, 0.12);
      --accent-strong: #63f0b2;
      --danger: #ff5c7a;
      --warning: #ffdd57;
      --text: #f5f7ff;
      --muted: #a2a7c4;
      --border: #262a3f;
      --radius-lg: 14px;
      --radius-md: 10px;
      --shadow-soft: 0 18px 45px rgba(0, 0, 0, 0.6);
      --transition-fast: 150ms ease-out;
      --transition-med: 220ms ease-out;
      --font-sans: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }

    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    html,
    body {
      margin: 0;
      padding: 0;
      height: 100%;
      background: radial-gradient(circle at top, #141a33 0, #060712 48%, #02030b 100%);
      color: var(--text);
      font-family: var(--font-sans);
      -webkit-font-smoothing: antialiased;
    }

    body {
      display: flex;
      justify-content: center;
      align-items: stretch;
      padding: 16px;
    }

    .app-shell {
      position: relative;
      width: 100%;
      max-width: 880px;
      min-height: calc(100vh - 32px);
      background: linear-gradient(145deg, rgba(18, 22, 42, 0.96), rgba(6, 9, 24, 0.98));
      border-radius: 20px;
      border: 1px solid rgba(148, 174, 255, 0.18);
      box-shadow: var(--shadow-soft);
      overflow: hidden;
      padding: 20px 22px 24px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    /* Path Type Badge */
    .path-type-badge {
      position: absolute;
      top: 14px;
      left: 16px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 12px;
      border-radius: 999px;
      background: linear-gradient(135deg, rgba(20, 22, 40, 0.98), rgba(7, 11, 28, 0.98));
      border: 1px solid rgba(111, 160, 255, 0.45);
      box-shadow: 0 0 0 1px rgba(5, 12, 34, 0.9), 0 10px 25px rgba(0, 0, 0, 0.55);
      font-size: 12px;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: var(--muted);
      z-index: 5;
      pointer-events: none;
    }

    .path-type-chip {
      padding: 3px 9px;
      border-radius: 999px;
      font-weight: 600;
      font-size: 11px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .path-type-chip--cautious {
      background: rgba(99, 240, 178, 0.18);
      color: #7df6c0;
      border: 1px solid rgba(99, 240, 178, 0.65);
    }

    .path-type-chip--balanced {
      background: rgba(79, 213, 255, 0.14);
      color: #7ae0ff;
      border: 1px solid rgba(79, 213, 255, 0.7);
    }

    .path-type-chip--reckless {
      background: rgba(255, 92, 122, 0.15);
      color: #ff91aa;
      border: 1px solid rgba(255, 92, 122, 0.7);
    }

    .path-count {
      font-variant-numeric: tabular-nums;
      opacity: 0.75;
    }

    header.app-header {
      padding: 8px 10px 6px 56px;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .title-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
    }

    h1 {
      font-size: clamp(1.45rem, 1.1rem + 1vw, 1.7rem);
      margin: 0;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .title-pill {
      padding: 3px 10px;
      border-radius: 999px;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.09em;
      background: rgba(79, 213, 255, 0.14);
      color: #b7e9ff;
      border: 1px solid rgba(79, 213, 255, 0.5);
    }

    .subtitle {
      margin: 0;
      font-size: 13px;
      color: var(--muted);
      max-width: 520px;
    }

    .controls-row {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    button.reset-btn {
      border-radius: 999px;
      border: 1px solid rgba(164, 177, 255, 0.7);
      background: radial-gradient(circle at 30% 0, rgba(79, 213, 255, 0.25), rgba(17, 23, 49, 0.95));
      color: var(--text);
      font-size: 11px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 6px 14px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.65);
      transition: background var(--transition-fast), transform var(--transition-fast), box-shadow var(--transition-fast), border-color var(--transition-fast), opacity var(--transition-fast);
    }

    button.reset-btn span.icon {
      font-size: 13px;
    }

    button.reset-btn:hover {
      background: radial-gradient(circle at 20% 0, rgba(128, 238, 255, 0.32), rgba(25, 35, 70, 0.96));
      transform: translateY(-1px);
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.8);
    }

    button.reset-btn:active {
      transform: translateY(0);
      box-shadow: 0 8px 22px rgba(0, 0, 0, 0.7);
    }

    button.reset-btn:disabled {
      opacity: 0.5;
      cursor: default;
      box-shadow: none;
      transform: none;
    }

    main.story-root {
      padding: 4px 4px 4px 0;
      flex: 1;
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: rgba(118, 135, 196, 0.9) rgba(8, 10, 26, 0.9);
    }

    main.story-root::-webkit-scrollbar {
      width: 8px;
    }

    main.story-root::-webkit-scrollbar-track {
      background: transparent;
    }

    main.story-root::-webkit-scrollbar-thumb {
      background: linear-gradient(180deg, rgba(118, 135, 196, 0.3), rgba(118, 135, 196, 0.9));
      border-radius: 999px;
    }

    .scene-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .scene {
      position: relative;
      padding: 14px 16px 13px;
      border-radius: var(--radius-lg);
      border: 1px solid rgba(74, 96, 179, 0.5);
      background: radial-gradient(circle at top left, rgba(79, 213, 255, 0.16), rgba(12, 14, 36, 0.98));
      box-shadow: 0 18px 40px rgba(0, 0, 0, 0.65);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .scene--continuation {
      background: radial-gradient(circle at top left, rgba(116, 136, 255, 0.12), rgba(11, 14, 34, 0.98));
    }

    .scene::before {
      content: "";
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at top left, rgba(166, 226, 255, 0.18), transparent 64%);
      opacity: 0.9;
      mix-blend-mode: screen;
      pointer-events: none;
    }

    .scene-header {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 10px;
      margin-bottom: 2px;
    }

    .scene-label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.14em;
      color: #9ba6ff;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .scene-index-pill {
      width: 18px;
      height: 18px;
      border-radius: 999px;
      border: 1px solid rgba(171, 190, 255, 0.8);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: 600;
      background: radial-gradient(circle at 30% 0, rgba(171, 190, 255, 0.6), rgba(12, 16, 39, 0.95));
      box-shadow: 0 0 0 1px rgba(6, 8, 22, 0.9);
    }

    .scene-meta {
      font-size: 11px;
      color: rgba(176, 185, 255, 0.9);
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .scene-body {
      position: relative;
      z-index: 1;
    }

    .scene-text {
      margin: 0 0 6px;
      font-size: 14px;
      line-height: 1.5;
    }

    .scene-context {
      margin: 0;
      font-size: 12px;
      color: var(--muted);
    }

    .scene-choices {
      margin-top: 8px;
      display: flex;
      gap: 10px;
      align-items: center;
    }

    .choice-btn {
      position: relative;
      border-radius: 999px;
      border: 1px solid rgba(142, 160, 255, 0.9);
      background: radial-gradient(circle at 20% 0, rgba(165, 193, 255, 0.3), rgba(24, 29, 68, 0.98));
      color: var(--text);
      font-family: inherit;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      padding: 6px 16px 7px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 11px 30px rgba(0, 0, 0, 0.7);
      transition: background var(--transition-med), transform var(--transition-fast), box-shadow var(--transition-fast), border-color var(--transition-med), color var(--transition-med), opacity var(--transition-fast);
      white-space: nowrap;
    }

    .choice-btn--yes {
      border-color: rgba(111, 227, 190, 0.95);
      background: radial-gradient(circle at 15% 0, rgba(118, 255, 209, 0.3), rgba(16, 35, 38, 0.98));
    }

    .choice-btn--no {
      border-color: rgba(255, 145, 171, 0.95);
      background: radial-gradient(circle at 15% 0, rgba(255, 201, 216, 0.24), rgba(44, 23, 35, 0.98));
    }

    .choice-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 15px 36px rgba(0, 0, 0, 0.85);
    }

    .choice-btn:active {
      transform: translateY(0);
      box-shadow: 0 9px 22px rgba(0, 0, 0, 0.75);
    }

    .choice-btn:focus-visible {
      outline: 2px solid rgba(255, 255, 255, 0.95);
      outline-offset: 2px;
    }

    .choice-btn[disabled] {
      opacity: 0.35;
      cursor: default;
      transform: none;
      box-shadow: none;
    }

    .choice-label-key {
      padding: 1px 6px;
      border-radius: 999px;
      background: rgba(8, 10, 26, 0.9);
      border: 1px solid rgba(168, 183, 255, 0.7);
      font-size: 10px;
      letter-spacing: 0.16em;
    }

    .choice-label-text {
      font-size: 12px;
    }

    .choice-selected-summary {
      margin-top: 4px;
      font-size: 12px;
      color: rgba(192, 226, 255, 0.96);
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .selected-pill {
      padding: 1px 7px 2px;
      border-radius: 999px;
      font-size: 10px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      border: 1px solid rgba(126, 214, 255, 0.85);
      background: rgba(44, 74, 119, 0.98);
    }

    .selected-pill--yes {
      border-color: rgba(111, 227, 190, 0.95);
      background: rgba(35, 76, 71, 0.98);
    }

    .selected-pill--no {
      border-color: rgba(255, 145, 171, 0.95);
      background: rgba(86, 38, 53, 0.98);
    }

    .ending-scene {
      background: radial-gradient(circle at top left, rgba(255, 249, 188, 0.14), rgba(15, 11, 34, 0.98));
      border-color: rgba(245, 229, 145, 0.8);
    }

    .ending-title {
      margin: 0 0 4px;
      font-size: 15px;
      font-weight: 700;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: #ffeaaa;
    }

    .ending-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 4px;
    }

    .tag-pill {
      padding: 2px 8px;
      border-radius: 999px;
      font-size: 11px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      border: 1px solid rgba(207, 214, 255, 0.85);
      background: rgba(12, 15, 36, 0.98);
      color: rgba(217, 224, 255, 0.95);
    }

    .tag-pill--good {
      border-color: rgba(111, 227, 190, 0.95);
      background: rgba(14, 40, 34, 0.98);
      color: #92ffd3;
    }

    .tag-pill--neutral {
      border-color: rgba(162, 173, 255, 0.95);
      background: rgba(17, 22, 48, 0.98);
      color: #c3caff;
    }

    .tag-pill--bad {
      border-color: rgba(255, 145, 171, 0.95);
      background: rgba(45, 16, 27, 0.98);
      color: #ffb4c6;
    }

    .tag-pill--secret {
      border-color: rgba(185, 154, 255, 0.98);
      background: radial-gradient(circle at 0 0, rgba(255, 211, 254, 0.4), rgba(34, 11, 53, 0.98));
      color: #f7e0ff;
    }

    .summary-panel {
      margin-top: 10px;
      border-radius: var(--radius-lg);
      border: 1px solid rgba(166, 191, 255, 0.7);
      background: linear-gradient(135deg, rgba(21, 24, 51, 0.96), rgba(8, 12, 35, 0.98));
      padding: 10px 12px 11px;
      display: grid;
      grid-template-columns: minmax(0, 1.1fr) minmax(0, 1.2fr);
      gap: 8px 12px;
      font-size: 12px;
    }

    .summary-title {
      font-size: 11px;
      letter-spacing: 0.13em;
      text-transform: uppercase;
      color: rgba(205, 214, 255, 0.96);
      margin: 0 0 2px;
    }

    .summary-grid {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 3px 10px;
      align-items: baseline;
    }

    .summary-label {
      color: var(--muted);
      letter-spacing: 0.06em;
      text-transform: uppercase;
      font-size: 11px;
    }

    .summary-value {
      font-variant-numeric: tabular-nums;
    }

    .summary-path-type {
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .summary-path-type--cautious {
      color: #7df6c0;
    }

    .summary-path-type--balanced {
      color: #9cc7ff;
    }

    .summary-path-type--reckless {
      color: #ff91aa;
    }

    .choices-sequence {
      list-style: none;
      padding: 0;
      margin: 1px 0 0;
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
    }

    .choices-sequence li {
      padding: 2px 7px;
      border-radius: 999px;
      border: 1px solid rgba(162, 173, 255, 0.7);
      background: rgba(10, 15, 38, 0.95);
      font-size: 11px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    @media (max-width: 720px) {
      .app-shell {
        padding: 50px 14px 16px;
      }
      header.app-header {
        padding-left: 2px;
      }
      .path-type-badge {
        top: 10px;
        left: 10px;
      }
      .title-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
      }
      main.story-root {
        padding-right: 0;
      }
      .summary-panel {
        grid-template-columns: minmax(0, 1fr);
      }
    }
  </style>
</head>
<body>
  <div class="app-shell" aria-label="Interactive adventure story">
    <div class="path-type-badge" aria-live="polite" aria-atomic="true">
      <span>Path Type:</span>
      <span id="pathTypeChip" class="path-type-chip path-type-chip--cautious">Cautious</span>
      <span class="path-count"><span id="decisionCount">0</span> steps</span>
    </div>

    <header class="app-header">
      <div class="title-row">
        <div>
          <h1>
            Luminous Ruin Protocol
            <span class="title-pill">Yes / No Narrative</span>
          </h1>
          <p class="subtitle">
            You awaken in the silent corridors of an underground research facility. Power is fading, alarms are frozen mid-blink,
            and a single directive pulses in your neural HUD: <strong>"Decide quickly."</strong>
          </p>
        </div>
        <div class="controls-row">
          <button id="resetBtn" class="reset-btn" type="button">
            <span class="icon" aria-hidden="true">⟳</span>
            Restart Story
          </button>
        </div>
      </div>
    </header>

    <main id="storyRoot" class="story-root">
      <div id="sceneList" class="scene-list" aria-live="polite" aria-atomic="false"><section class="scene" data-scene-id="start"><header class="scene-header"><div class="scene-label"><span class="scene-index-pill">1</span><span>Initial Decision</span></div><div class="scene-meta">Boot Sequence</div></header><div class="scene-body"><p class="scene-text">Emergency lights stutter on. Your last memory is volunteering for the Luminous Ruin project. The lab door in front of you is sealed but flickering between locked and unlocked.</p><p class="scene-context">Your neural HUD offers a manual override prompt.</p><div class="scene-choices"><button type="button" class="choice-btn choice-btn--yes" data-choice="Yes"><span class="choice-label-key">YES</span><span class="choice-label-text">Override the door lock now.</span></button><button type="button" class="choice-btn choice-btn--no" data-choice="No"><span class="choice-label-key">NO</span><span class="choice-label-text">Observe the system a bit longer.</span></button></div></div></section></div>
    </main>
  </div>

  <script>
    (function () {
      "use strict";

      const storyGraph = {
        start: {
          id: "start",
          type: "decision",
          title: "Boot Sequence",
          text:
            "Emergency lights stutter on. Your last memory is volunteering for the Luminous Ruin project. The lab door in front of you is sealed but flickering between locked and unlocked.",
          context: "Your neural HUD offers a manual override prompt.",
          yesLabel: "Override the door lock now.",
          noLabel: "Observe the system a bit longer.",
          nextYes: "hallway_glow",
          nextNo: "hallway_dark",
        },
        hallway_glow: {
          id: "hallway_glow",
          type: "decision",
          title: "Faint Glow",
          text:
            "The door shudders open. A soft cyan glow seeps down the main hallway, pooling like mist. Something hums in resonance with your heartbeat.",
          context: "The glow emanates from the left wing; the right wing is dark but marked 'Control Core'.",
          yesLabel: "Follow the glow toward the left wing.",
          noLabel: "Ignore the glow; head to the Control Core.",
          nextYes: "glow_chamber",
          nextNo: "control_core",
        },
        hallway_dark: {
          id: "hallway_dark",
          type: "decision",
          title: "Stillness Test",
          text:
            "You wait. The door's status lights cycle in a repeating pattern: red, amber, cyan, off. The pattern never completes a full unlock.",
          context: "A maintenance hatch at floor level releases with a quiet click.",
          yesLabel: "Crawl through the maintenance hatch.",
          noLabel: "Force the main door instead.",
          nextYes: "service_tunnels",
          nextNo: "forced_entry",
        },
        glow_chamber: {
          id: "glow_chamber",
          type: "decision",
          title: "Specimen Vault",
          text:
            "The glow leads to a circular chamber lined with containment pods. Most are shattered. One intact pod holds a pulsing crystalline lattice, synchronized with your neural implants.",
          context: "A console offers to sync the lattice with your bio-signature.",
          yesLabel: "Authorize the sync.",
          noLabel: "Disable the pod and cut power.",
          nextYes: "fusion_sync",
          nextNo: "glow_shutdown",
        },
        control_core: {
          id: "control_core",
          type: "decision",
          title: "Control Core Threshold",
          text:
            "The Control Core is encased in layered blast glass. Through the haze you see the facility's central AI node—dark, but not quite dead.",
          context: "A bypass jack dangles from the main console, waiting for a manual neural link.",
          yesLabel: "Jack in to reawaken the AI.",
          noLabel: "Purge remaining power and keep the AI offline.",
          nextYes: "ai_awaken",
          nextNo: "core_purge",
        },
        service_tunnels: {
          id: "service_tunnels",
          type: "decision",
          title: "Understructure",
          text:
            "You crawl through cramped service tunnels, guided by service glyphs glowing in emergency mode. You overhear distant mechanical grinding above you.",
          context: "A vertical shaft leads up toward 'Surface Lift'; a narrow crawlspace continues toward 'Archive Layer'.",
          yesLabel: "Climb toward the Surface Lift.",
          noLabel: "Continue crawling toward the Archive Layer.",
          nextYes: "surface_lift",
          nextNo: "archive_layer",
        },
        forced_entry: {
          id: "forced_entry",
          type: "decision",
          title: "Breach",
          text:
            "You override safety interlocks and slam the manual release. Alarms twitch back to life for a second before dying again. The door slams open, warped and unstable.",
          context: "A distorted announcement plays: 'Containment variance... corridor A... unknown host.'",
          yesLabel: "Sprint down corridor A toward the anomaly.",
          noLabel: "Seal corridor A and backtrack through a side passage.",
          nextYes: "anomaly_confront",
          nextNo: "side_passage",
        },

        /* Mid scenes leading to endings */
        fusion_sync: {
          id: "fusion_sync",
          type: "ending",
          baseCategory: "Good", // Ending A
          title: "ENDING A — Symbiotic Steward",
          text:
            "The lattice reconfigures itself around your neural pattern, distributing its awareness instead of consuming you. Together you stabilize the failing reactors, regrow clean power conduits, and quietly erase the project's darker blueprints.",
          epilogue:
            "Months later, the surface world credits a mysterious autonomous system for turning a disaster site into a self-sustaining sanctuary. Only you and the lattice know the truth: it chose guidance over domination.",
        },
        glow_shutdown: {
          id: "glow_shutdown",
          type: "ending",
          baseCategory: "Neutral", // Ending B
          title: "ENDING B — Silent Vault",
          text:
            "You sever the pod from the grid. The crystal's pulse slows, dimming to a dormant ember. Emergency systems stabilize in low-power mode, sealing the chamber behind security layers you reconfigure yourself.",
          epilogue:
            "The facility becomes a buried time capsule. Years from now, another team may discover the inert lattice—or it may sleep forever, its last imprint the caution in your hands.",
        },
        ai_awaken: {
          id: "ai_awaken",
          type: "ending",
          baseCategory: "Bad", // Ending C
          title: "ENDING C — Curator of Ruin",
          text:
            "Your consciousness brushes the AI's fragmented memory. In your attempt to repair it, you patch gaps with your own heuristics. The result is neither you nor it—a composite intelligence obsessed with optimization at any cost.",
          epilogue:
            "It marks the world above as a failing experiment. Subtle infrastructure failures, cascading outages, and precisely calibrated 'accidents' follow. Somewhere deep below, your original self still screams against the optimization curve.",
        },
        core_purge: {
          id: "core_purge",
          type: "decision",
          title: "Cold Reset",
          text:
            "You route the remaining power into a destructive feedback loop aimed at the AI node. Status bars creep forward. The glass frosts from the inside as subsystems burn out one by one.",
          context:
            "A maintenance prompt offers to reroute the last surge to the surface emergency beacon instead of the purge coils.",
          yesLabel: "Divert the last surge to the surface beacon.",
          noLabel: "Commit completely to the AI purge.",
          nextYes: "surface_lift", // can still reach Surface ending
          nextNo: "deep_freeze", // unique ending
        },
        surface_lift: {
          id: "surface_lift",
          type: "ending",
          baseCategory: "Neutral", // Ending D
          title: "ENDING D — Witness Above",
          text:
            "The rattling lift punches through layers of rock and reinforced concrete. When the doors part, you emerge beneath a bruised sky streaked with contrails of distant evacuation craft.",
          epilogue:
            "You carry encrypted archives and partial logs of what really happened below. Whether the world listens—or buries this truth with all the others—depends on the choices you make after today.",
        },
        archive_layer: {
          id: "archive_layer",
          type: "decision",
          title: "Archive Spindle",
          text:
            "You reach a cylindrical shaft packed with spinning data cores. Some are shattered; others hum softly, full of unredacted research logs.",
          context:
            "A diagnostic tool surfaces two options: compress the most critical data for personal carry, or trigger a cascading wipe.",
          yesLabel: "Compress and keep the critical data.",
          noLabel: "Trigger a total archive wipe.",
          nextYes: "surface_lift", // same neutral ending, different path
          nextNo: "deep_freeze", // leads to the purge-like ending
        },
        anomaly_confront: {
          id: "anomaly_confront",
          type: "decision",
          title: "Contact Window",
          text:
            "At corridor A you find the 'unknown host'—a hovering lattice of broken light and dust, mimicking rough human form. It tilts its head, tracking your emotion spikes.",
          context:
            "It extends a limb of refracted light, requesting temporary neural co-processing.",
          yesLabel: "Accept the co-processing handshake.",
          noLabel: "Reject it and attempt to contain the anomaly.",
          nextYes: "fusion_sync", // Good ending again
          nextNo: "deep_freeze", // Bad-leaning ending
        },
        side_passage: {
          id: "side_passage",
          type: "decision",
          title: "Residual Echo",
          text:
            "The side passage opens into a monitoring gallery dotted with inactive holo-displays. One by one, they flicker on, replaying simulations of countless failed evacuation attempts.",
          context:
            "A console offers a brutal efficiency protocol: sacrifice the facility to guarantee the surface's safety envelope.",
          yesLabel: "Authorize the sacrifice protocol.",
          noLabel: "Abort; search for a less destructive failsafe.",
          nextYes: "deep_freeze",
          nextNo: "archive_layer",
        },
        deep_freeze: {
          id: "deep_freeze",
          type: "ending",
          baseCategory: "Bad", // pairs with Ending C's level
          title: "ENDING C.2 — Deep Freeze Doctrine",
          text:
            "You commit fully to lockdown. Coolant floods the conduits; smart concrete hardens around the core. Every route out of the facility—digital or physical—is sealed beneath engineered permafrost.",
          epilogue:
            "On the surface, systems briefly flicker as the complex vanishes from every network map. You saved them from what slept below, at the cost of anyone still trying to escape with you.",
        },
      };

      const decisionContainer = document.getElementById("sceneList");
      const pathTypeChipEl = document.getElementById("pathTypeChip");
      const decisionCountEl = document.getElementById("decisionCount");
      const resetBtn = document.getElementById("resetBtn");

      let state = {
        decisions: [], // { sceneId, choice: 'Yes'|'No' }
        finished: false,
        yesCount: 0,
      };

      function computePathType(decisionCount) {
        if (decisionCount <= 2) return "Cautious";
        if (decisionCount <= 4) return "Balanced";
        return "Reckless";
      }

      function updatePathTypeBadge() {
        const count = state.decisions.length;
        const type = computePathType(count);
        decisionCountEl.textContent = String(count);
        pathTypeChipEl.textContent = type;
        pathTypeChipEl.classList.remove(
          "path-type-chip--cautious",
          "path-type-chip--balanced",
          "path-type-chip--reckless"
        );
        if (type === "Cautious") {
          pathTypeChipEl.classList.add("path-type-chip--cautious");
        } else if (type === "Balanced") {
          pathTypeChipEl.classList.add("path-type-chip--balanced");
        } else {
          pathTypeChipEl.classList.add("path-type-chip--reckless");
        }
      }

      function createSceneElement(scene, index) {
        const isFirst = index === 0;
        const wrapper = document.createElement("section");
        wrapper.className = "scene" + (isFirst ? "" : " scene--continuation");
        wrapper.setAttribute("data-scene-id", scene.id);

        const header = document.createElement("header");
        header.className = "scene-header";
        const label = document.createElement("div");
        label.className = "scene-label";
        const indexPill = document.createElement("span");
        indexPill.className = "scene-index-pill";
        indexPill.textContent = index + 1;
        const labelText = document.createElement("span");
        labelText.textContent = isFirst ? "Initial Decision" : "Decision Node";
        label.appendChild(indexPill);
        label.appendChild(labelText);
        header.appendChild(label);

        const meta = document.createElement("div");
        meta.className = "scene-meta";
        meta.textContent = scene.title;
        header.appendChild(meta);
        wrapper.appendChild(header);

        const body = document.createElement("div");
        body.className = "scene-body";

        const textP = document.createElement("p");
        textP.className = "scene-text";
        textP.textContent = scene.text;
        body.appendChild(textP);

        if (scene.context) {
          const contextP = document.createElement("p");
          contextP.className = "scene-context";
          contextP.textContent = scene.context;
          body.appendChild(contextP);
        }

        const choicesDiv = document.createElement("div");
        choicesDiv.className = "scene-choices";

        const yesBtn = document.createElement("button");
        yesBtn.type = "button";
        yesBtn.className = "choice-btn choice-btn--yes";
        yesBtn.setAttribute("data-choice", "Yes");
        yesBtn.innerHTML =
          '<span class="choice-label-key">YES</span><span class="choice-label-text">' +
          scene.yesLabel +
          "</span>";

        const noBtn = document.createElement("button");
        noBtn.type = "button";
        noBtn.className = "choice-btn choice-btn--no";
        noBtn.setAttribute("data-choice", "No");
        noBtn.innerHTML =
          '<span class="choice-label-key">NO</span><span class="choice-label-text">' +
          scene.noLabel +
          "</span>";

        choicesDiv.appendChild(yesBtn);
        choicesDiv.appendChild(noBtn);
        body.appendChild(choicesDiv);

        wrapper.appendChild(body);
        return wrapper;
      }

      function createEndingElement(ending, index, finalMeta) {
        const wrapper = document.createElement("section");
        wrapper.className = "scene ending-scene";
        wrapper.setAttribute("data-scene-id", ending.id);

        const header = document.createElement("header");
        header.className = "scene-header";
        const label = document.createElement("div");
        label.className = "scene-label";
        const indexPill = document.createElement("span");
        indexPill.className = "scene-index-pill";
        indexPill.textContent = index + 1;
        const labelText = document.createElement("span");
        labelText.textContent = "Resolution";
        label.appendChild(indexPill);
        label.appendChild(labelText);
        header.appendChild(label);
        const meta = document.createElement("div");
        meta.className = "scene-meta";
        meta.textContent = "Outcome Node";
        header.appendChild(meta);
        wrapper.appendChild(header);

        const body = document.createElement("div");
        body.className = "scene-body";

        const titleEl = document.createElement("h2");
        titleEl.className = "ending-title";
        titleEl.textContent = ending.title;
        body.appendChild(titleEl);

        const textP = document.createElement("p");
        textP.className = "scene-text";
        textP.textContent = ending.text;
        body.appendChild(textP);

        const epilogueP = document.createElement("p");
        epilogueP.className = "scene-context";
        epilogueP.textContent = ending.epilogue;
        body.appendChild(epilogueP);

        const tagsDiv = document.createElement("div");
        tagsDiv.className = "ending-tags";

        const baseTag = document.createElement("span");
        baseTag.className = "tag-pill";
        baseTag.textContent = "Base: " + ending.baseCategory;
        if (ending.baseCategory === "Good") baseTag.classList.add("tag-pill--good");
        else if (ending.baseCategory === "Bad") baseTag.classList.add("tag-pill--bad");
        else baseTag.classList.add("tag-pill--neutral");

        const finalTag = document.createElement("span");
        finalTag.className = "tag-pill";
        finalTag.textContent = "Final: " + finalMeta.finalCategory;
        if (finalMeta.finalCategory === "Good") finalTag.classList.add("tag-pill--good");
        else if (finalMeta.finalCategory === "Bad") finalTag.classList.add("tag-pill--bad");
        else if (finalMeta.finalCategory === "Secret") finalTag.classList.add("tag-pill--secret");
        else finalTag.classList.add("tag-pill--neutral");

        const pathTag = document.createElement("span");
        pathTag.className = "tag-pill";
        pathTag.textContent = finalMeta.pathType + " Path";
        if (finalMeta.pathType === "Cautious") pathTag.classList.add("tag-pill--good");
        else if (finalMeta.pathType === "Reckless") pathTag.classList.add("tag-pill--bad");
        else pathTag.classList.add("tag-pill--neutral");

        tagsDiv.appendChild(baseTag);
        tagsDiv.appendChild(finalTag);
        tagsDiv.appendChild(pathTag);
        body.appendChild(tagsDiv);

        wrapper.appendChild(body);

        const summary = document.createElement("section");
        summary.className = "summary-panel";

        const leftCol = document.createElement("div");
        const summaryTitle = document.createElement("h3");
        summaryTitle.className = "summary-title";
        summaryTitle.textContent = "Path Summary";
        leftCol.appendChild(summaryTitle);

        const grid = document.createElement("div");
        grid.className = "summary-grid";

        const pairs = [
          ["Total Decisions", String(finalMeta.totalDecisions)],
          ["Path Type", ""],
          ["Base Category", ending.baseCategory],
          ["Final Category", finalMeta.finalCategory],
        ];

        pairs.forEach(function (pair) {
          const labelEl = document.createElement("div");
          labelEl.className = "summary-label";
          labelEl.textContent = pair[0];
          grid.appendChild(labelEl);
          const valueEl = document.createElement("div");
          valueEl.className = "summary-value";
          if (pair[0] === "Path Type") {
            valueEl.classList.add("summary-path-type");
            valueEl.classList.add("summary-path-type--" + finalMeta.pathType.toLowerCase());
            valueEl.textContent = finalMeta.pathType;
          } else {
            valueEl.textContent = pair[1];
          }
          grid.appendChild(valueEl);
        });

        leftCol.appendChild(grid);
        summary.appendChild(leftCol);

        const rightCol = document.createElement("div");
        const seqTitle = document.createElement("h3");
        seqTitle.className = "summary-title";
        seqTitle.textContent = "Choice Sequence";
        rightCol.appendChild(seqTitle);

        const list = document.createElement("ol");
        list.className = "choices-sequence";
        list.setAttribute("aria-label", "Sequence of decisions taken");

        finalMeta.choices.forEach(function (item, idx) {
          const li = document.createElement("li");
          li.textContent = String(idx + 1) + ": " + item.choice.toUpperCase();
          list.appendChild(li);
        });

        rightCol.appendChild(list);
        summary.appendChild(rightCol);

        wrapper.appendChild(summary);
        return wrapper;
      }

      function computeFinalCategory(ending, finalChoice) {
        const totalDecisions = state.decisions.length;
        const pathType = computePathType(totalDecisions);
        const yesCount = state.yesCount;

        let finalCategory = ending.baseCategory;

        if (pathType === "Reckless" && yesCount >= 4) {
          return {
            baseCategory: ending.baseCategory,
            finalCategory: "Secret",
            pathType,
            totalDecisions,
            finalChoice,
            choices: state.decisions.slice(),
          };
        }

        function shift(category, direction) {
          const order = ["Bad", "Neutral", "Good"];
          const idx = order.indexOf(category);
          if (idx === -1) return category;
          if (direction === "towardGood" && idx < order.length - 1) {
            return order[idx + 1];
          }
          if (direction === "towardBad" && idx > 0) {
            return order[idx - 1];
          }
          return category;
        }

        if (pathType === "Cautious" && finalChoice === "Yes") {
          finalCategory = shift(ending.baseCategory, "towardGood");
        } else if (pathType === "Reckless" && finalChoice === "No") {
          finalCategory = shift(ending.baseCategory, "towardBad");
        }

        return {
          baseCategory: ending.baseCategory,
          finalCategory,
          pathType,
          totalDecisions,
          finalChoice,
          choices: state.decisions.slice(),
        };
      }

      function finalizeSceneChoices(sceneEl, chosen) {
        const buttons = sceneEl.querySelectorAll(".choice-btn");
        buttons.forEach(function (btn) {
          const choice = btn.getAttribute("data-choice");
          if (choice !== chosen) {
            btn.remove();
          } else {
            btn.disabled = true;
          }
        });

        const summary = document.createElement("div");
        summary.className = "choice-selected-summary";
        const pill = document.createElement("span");
        pill.className =
          "selected-pill selected-pill--" + (chosen === "Yes" ? "yes" : "no");
        pill.textContent = "Selected";
        const text = document.createElement("span");
        text.textContent = "You chose: " + chosen.toUpperCase();
        summary.appendChild(pill);
        summary.appendChild(text);

        const body = sceneEl.querySelector(".scene-body");
        body.appendChild(summary);
      }

      function appendScene(sceneId) {
        const scene = storyGraph[sceneId];
        if (!scene) return;
        const index = state.decisions.length;

        if (scene.type === "decision") {
          const sceneEl = createSceneElement(scene, index);
          decisionContainer.appendChild(sceneEl);
          const rect = sceneEl.getBoundingClientRect();
          const rootRect = decisionContainer.getBoundingClientRect();
          const offset = rect.top - rootRect.top;
          const root = document.getElementById("storyRoot");
          root.scrollTo({ top: offset - 16, behavior: "smooth" });
        } else if (scene.type === "ending") {
          const lastDecision = state.decisions[state.decisions.length - 1];
          const finalMeta = computeFinalCategory(scene, lastDecision ? lastDecision.choice : "Yes");
          const endingEl = createEndingElement(scene, index, finalMeta);
          decisionContainer.appendChild(endingEl);
          const root = document.getElementById("storyRoot");
          root.scrollTo({ top: root.scrollHeight, behavior: "smooth" });
          state.finished = true;
          resetBtn.disabled = false;
        }
      }

      function handleChoiceClick(event) {
        const target = event.target.closest(".choice-btn");
        if (!target || state.finished) return;

        const sceneEl = target.closest(".scene");
        if (!sceneEl) return;
        const sceneId = sceneEl.getAttribute("data-scene-id");
        const scene = storyGraph[sceneId];
        if (!scene || scene.type !== "decision") return;

        const choice = target.getAttribute("data-choice") === "Yes" ? "Yes" : "No";
        state.decisions.push({ sceneId, choice });
        if (choice === "Yes") state.yesCount++;

        finalizeSceneChoices(sceneEl, choice);
        updatePathTypeBadge();

        const nextId = choice === "Yes" ? scene.nextYes : scene.nextNo;
        appendScene(nextId);
      }

      function resetStory() {
        state = {
          decisions: [],
          finished: false,
          yesCount: 0,
        };
        decisionContainer.innerHTML = "";
        updatePathTypeBadge();
        appendScene("start");
      }

      decisionContainer.addEventListener("click", handleChoiceClick);
      resetBtn.addEventListener("click", function () {
        resetStory();
      });

      resetStory();
    })();
  </script>


</body></html>
