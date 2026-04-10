# Case Study: Ecosystem Simulator (State, Constraints & Time-Based Logic)

---

## Objective

Design and evaluate an LLM-generated interactive application that simulates ecosystem health based on **pollution and biodiversity trade-offs**, with dynamic state transitions and irreversible collapse behavior.

---

## Prompt

Create an interactive ecosystem simulator where users explore how pollution and biodiversity affect the health of a habitat.

At the top of the page, provide two sliders for Pollution and Biodiversity, each ranging from 0 to 100. The two values should always add up to 100, so adjusting one slider automatically updates the other. The simulation should update instantly whenever either slider changes.

In the simulation, display a visual habitat area where the ecosystem’s population is represented by moving clusters. The number of clusters should reflect the current population level, which depends on the balance between biodiversity and pollution. Higher biodiversity should support a larger population, while higher pollution should visibly reduce it. Also display the current population value.

In the top-right corner, show an Ecosystem State badge that updates in real time:

* ‘Balanced’ when the population is 60 or above
* ‘Stressed’ when the population is between 30–59
* ‘Collapsing’ when the population is less than 30 for 3 seconds

When the collapse conditions are met but collapse has not yet triggered, display a countdown in the top left corner, showing the time remaining before collapse. It should reset if the above condition breaks.

When the collapse triggers:

* The population rapidly declines and should not increase thereafter
* Users should not be able to increase biodiversity beyond 80

On initial load, set pollution to 20.

---

## Evaluation Design

The system was evaluated using **task-specific rubrics** across the following dimensions:

### State & Logic

* Enforces Pollution + Biodiversity = 100 invariant
* Correct population calculation based on inputs
* Accurate threshold-based state transitions
* Time-based collapse trigger (3 seconds)
* Irreversible collapse behavior

### Interaction

* Real-time updates on slider movement
* Bi-directional slider dependency
* Countdown reset on condition break
* Post-collapse interaction restrictions

### UI Behavior

* Ecosystem state badge updates correctly
* Population visually represented via clusters
* Countdown visibility and accuracy

---

## Sample Rubric Snapshot

| Category    | Criterion                                 | Weight |
| ----------- | ----------------------------------------- | ------ |
| State       | Collapse triggers only after 3s threshold | Major  |
| Interaction | Sliders dynamically maintain sum = 100    | Major  |
| UI          | Ecosystem badge updates correctly         | Minor  |
| State       | Post-collapse restrictions enforced       | Major  |

---

## Observed Model Behavior

* Implemented basic slider interaction
* Population updated based on input changes
* Ecosystem state badge partially functional
* Collapse condition implemented incorrectly
* No enforcement of post-collapse constraints
* Inconsistent synchronization between sliders

---

## Failure Diagnosis

The model failed primarily in **coordinated system behavior**, rather than isolated logic:

* **Constraint Violation**
  Did not consistently enforce the invariant: Pollution + Biodiversity = 100

* **Time-Based Logic Failure**
  Collapse trigger was either immediate or incorrectly delayed

* **State Irreversibility Missing**
  System allowed recovery after collapse, violating requirements

* **Weak State Synchronization**
  UI elements (sliders, badge, population) were not consistently aligned

---

## Resolution Approach

Manual corrections were implemented to align system behavior with requirements:

* Introduced controlled state updates to enforce slider dependency
* Implemented timer-based tracking for collapse trigger (3-second threshold)
* Added irreversible state flag post-collapse
* Enforced interaction constraints after collapse (biodiversity cap)
* Strengthened synchronization between UI and internal state

---

## Model Output Code

Full generated application code:
[View Code](./ecosystem_simulator_code.js)

---

## Key Takeaway

LLMs struggle significantly with:

* Coupled variable constraints
* Time-dependent state transitions
* Irreversible system behavior
* Synchronization across multiple UI and logic components

These failures highlight the importance of **structured evaluation and human-in-the-loop correction** when deploying LLM-generated applications.

---
