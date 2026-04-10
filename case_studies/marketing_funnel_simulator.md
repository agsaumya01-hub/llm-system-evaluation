# Case Study: Marketing Funnel Simulator (State Consistency & Bidirectional Updates)

---

## Objective

Design and evaluate an LLM-generated marketing funnel simulator that enables users to dynamically manipulate **volume and conversion rates** across funnel stages, while maintaining **state consistency and bidirectional data flow**.

This task tests the model’s ability to handle:

* Dependent variable updates across multiple entities
* Bidirectional state propagation (table ↔ chart)
* Constraint enforcement in dynamic systems
* Synchronization between UI components

---

## Prompt

Create a marketing funnel simulator with four stages: Impressions, Clicks, Signups, and Purchases.

On the left side of the page, display a table representing the funnel stages. Each row corresponds to one stage and shows the stage name, the number of users at that stage (i.e. volume), the conversion rate to the next stage, and the resulting number of users that move forward. The volume and the conversion rate fields should be editable. Changing a stage’s volume should update the conversion rate of the previous stage and also update the volume of all the downstream stages. Changing the conversion rate of a stage should update the next stage’s volume and consequently the volume values of all the downstream stages. A stage’s volume cannot exceed the volume of the previous stage.

On the right side of the page, display a line chart with two lines, one for the volume trend, and another for the conversion rate trend. Both lines should reflect the values currently shown in the table. The horizontal axis should show the four stages in order. Dragging a point on the volume trend line adjusts the volume for that stage and updates the table and related conversion rates. Hovering over any point on any line should display a tooltip showing the stage name, volume at that stage, conversion rate to the next stage, and the resulting volume moving to the next stage.

---

## Evaluation Design

The application was evaluated using **14 structured rubrics** across the following dimensions:

### State & Logic

* Proper initialization of funnel stages
* Consistency of volume and conversion relationships
* Enforcement of logical constraints (monotonic funnel)

### Interaction

* Editable table inputs (volume and conversion rate)
* Cascading updates across upstream and downstream stages
* Interactive chart manipulation (drag + hover)

### UI & Visualization

* Correct rendering of table and chart layout
* Synchronization between table and chart
* Tooltip completeness and accuracy

---

## Evaluation Summary

* **Total Rubrics:** 14
* **Failed Rubrics:** 8
* **Pass Score:** **43%**

---

## Failed Criteria (Key Gaps)

* Table did not correctly display all required fields (volume, conversion rate, resulting volume)
* Failed to update **previous stage conversion rate** when volume was edited
* Downstream volumes were **not consistently updated**
* Conversion rate edits did not propagate correctly to later stages
* Did not enforce constraint: **stage volume ≤ previous stage volume**
* Chart axis labeling was incomplete or incorrect
* Chart values were **not synchronized** with table data
* Tooltip did not display complete funnel metrics

---

## Observed Model Behavior

* Successfully rendered a basic table and chart layout
* Implemented partial edit functionality for inputs
* Displayed general funnel structure

However:

* Failed to maintain **data consistency across interactions**
* Could not correctly handle **cascading updates**
* Visualization and data layers became **desynchronized**
* Constraint enforcement was missing or incorrect

---

## Failure Diagnosis

The model struggled primarily with **state propagation and interdependent updates**:

* **Bidirectional Update Failure**
  Could not correctly handle relationships where:

  * Editing volume affects conversion rates upstream
  * Editing conversion rates affects volumes downstream

* **Cascade Logic Breakdown**
  Failed to propagate updates across multiple dependent stages

* **Constraint Enforcement Gap**
  Did not enforce funnel validity (monotonic decrease in volume)

* **State Synchronization Issue**
  Chart and table operated on **inconsistent or stale state**

* **Derived Value Mismanagement**
  Incorrect handling of:

  * Resulting volumes
  * Conversion rate recalculations

---

## Resolution Approach

Manual corrections focused on enforcing deterministic data flow and synchronization:

* Centralized state model for:

  * Stage volumes
  * Conversion rates

* Explicit update pipelines:

  * Volume change → update previous conversion → recompute downstream volumes
  * Conversion change → recompute next stage volume → propagate forward

* Enforced constraint:

  * Volume[i] ≤ Volume[i-1]

* Unified data source for:

  * Table rendering
  * Chart rendering

* Tooltip logic derived directly from current state

---

## Model Output Code

Full generated application code:
👉 [View Code](./marketing_funnel_simulator_code.js)

---

## Key Takeaway

LLMs show strong performance in:

* UI scaffolding and layout generation
* Basic interactivity implementation

But struggle with:

* Multi-variable dependency systems
* Bidirectional state updates
* Data consistency across components
* Constraint enforcement in dynamic models

These limitations highlight the importance of **explicit state management and validation logic** when building interactive analytical tools with LLMs.

---
