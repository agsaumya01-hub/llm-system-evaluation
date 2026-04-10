# Case Study: Interactive Adventure Story Explorer (State Transitions & Rule-Based Outcomes)

---

## Objective

Design and evaluate an LLM-generated interactive storytelling application where users progress through **Yes/No decisions**, with dynamic path classification and rule-based outcome transformations.

This task tests the model’s ability to handle:

* Sequential decision flows
* State tracking across interactions
* Conditional outcome transformations
* Multi-rule logic with overrides

---

## Prompt

Create an interactive adventure story where users progress by making Yes or No decisions. When the page loads, the user should see the starting scene of the story. As the user makes Yes/No decisions, the story continues with new scene appearing below the previous completed one. In completed scenes, only the selected choice should remain visible.

The story structure must include one starting scene, at least six more decision scenes, and exactly four possible endings. Every ending should be reachable through at least one path. Each decision scene must display two buttons: Yes and No. After the user selects an option, the next scene should appear below it.

In the top-left corner, display a Path Type label that updates based on how many decisions the user has made:

* ‘Cautious’ if decisions ≤ 2
* ‘Balanced’ if decisions are 3–4
* ‘Reckless’ if decisions ≥ 5

Each ending has a base category:

* Ending A: Good
* Ending B: Neutral
* Ending C: Bad
* Ending D: Neutral

Final category rules:

* Cautious + Yes → shift toward Good
* Reckless + No → shift toward Bad
* Balanced → no change
* Reckless + ≥4 Yes → ‘Secret’ (override all rules)

When an ending is reached:

* Prevent further decisions
* Display a summary panel showing:

  * Total decisions
  * Final Path Type
  * Base category
  * Final category
  * Sequence of choices

---

## Evaluation Design

The application was evaluated using **20 structured rubrics** across the following dimensions:

### State & Logic

* Correct number of decision and ending scenes
* Reachability of all endings and path types
* Accurate implementation of category transformation rules
* Handling of override conditions (Secret ending)

### Interaction

* Progressive scene rendering
* Persistence of selected choices
* Blocking further interaction after ending

### UI & Content

* Visibility of path type label
* Presence of Yes/No buttons
* Summary panel completeness

---

## Evaluation Summary

* **Total Rubrics:** 20
* **Failed Rubrics:** 5
* **Pass Score:** **75%**

---

## Failed Criteria (Key Gaps)

* Did not enforce **exact structure requirements** (4 endings, ≥6 decisions)
* Some endings and path types were **not reachable**
* Incorrect implementation of **Cautious + Yes → category shift logic**
* Failed to preserve category when already at **maximum (Good)**
* Did not correctly implement **‘Secret’ override condition**

---

## Observed Model Behavior

* Successfully implemented basic story progression and UI rendering
* Maintained sequential flow of decision scenes
* Displayed path type label and summary panel

However:

* Logical rules governing endings were inconsistently applied
* Structural constraints were partially violated
* Complex conditional logic was not reliably handled

---

## Failure Diagnosis

The model struggled primarily with **multi-layered rule systems and state tracking**:

* **Rule Composition Failure**
  Could not correctly combine multiple conditional rules affecting final outcomes

* **Override Logic Breakdown**
  Failed to prioritize “Secret” condition over other rules

* **State Tracking Limitations**
  Inconsistent tracking of:

  * Number of decisions
  * Count of Yes responses
  * Path type transitions

* **Graph Completeness Issue**
  Did not ensure all endings and path types were reachable

---

## Resolution Approach

Manual corrections focused on enforcing deterministic logic and state consistency:

* Explicit tracking of:

  * Decision count
  * Yes-response count
  * Path type classification

* Implementation of **rule hierarchy**:

  * Secret override > Path-based rules > Base category

* Validation of **all possible paths** to ensure reachability

* Separation of:

  * Base ending logic
  * Transformation rules
  * Final output computation

---

## Model Output Code

Full generated application code:
👉 [View Code](./interactive_story_explorer_code.js)

---

## Key Takeaway

LLMs show strong performance in:

* UI scaffolding
* Sequential content generation

But struggle with:

* Multi-condition rule systems
* Override logic and prioritization
* Consistent state tracking across interactions
* Ensuring completeness in decision graphs

These limitations highlight the importance of **structured evaluation and rule validation** in LLM-generated applications.

---
