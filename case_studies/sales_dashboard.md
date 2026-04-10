# Case Study: Sales Dashboard (Cross-View Synchronization & Ranking Logic)

---

## Objective

Design and evaluate an LLM-generated interactive sales dashboard that enables users to analyze performance across **regions and product categories**, while maintaining **synchronization between visual and tabular views**.

This task tests the model’s ability to handle:

* Cross-component synchronization (chart ↔ table)
* Aggregation and ranking logic
* Dynamic filtering with consistent state updates
* Coordinated interactions across multiple UI elements

---

## Prompt

Create an interactive dashboard showing sales performance across regions and product categories. 

Use a dataset with 5 product categories (Electronics, Furniture, Clothing, Food, Sports) and 4 regions (North, South, East, West). Each category has a sales value for every region.

Display two views:

1. Stacked Bar Chart - Each bar represents a region. Each segment shows the sales of a product category within that region. Display axis titles. 

2. Ranking Table - The table lists product categories with: Category, Total Sales, Market Share, Rank (1 = highest sales)

Add region checkboxes above the chart to toggle regions on or off. When regions change, the bar chart and the table should update accordingly such that they are always in sync and reflect the same underlying data.

The sum of all category totals in the table must equal the total sales represented in the chart at all times.

Hovering a category segment in the chart should highlight the same category row in the table.

The ranking table must always be sorted by rank, and the bars in the chart should always be ordered from highest to lowest total regional sales based on the currently selected regions.

---

## Evaluation Design

The application was evaluated using **18 structured rubrics** across the following dimensions:

### State & Data Integrity

* Dataset initialization across categories and regions
* Aggregation of category totals and market share
* Consistency between chart and table totals

### Interaction

* Region filtering via checkboxes
* Dynamic updates to chart and table
* Hover-based linking between chart and table

### Visualization & Layout

* Correct rendering of stacked bar chart
* Accurate segmentation by category
* Proper table structure with ranking and metrics

---

## Evaluation Summary

* **Total Rubrics:** 18  
* **Failed Rubrics:** 10  
* **Pass Score:** **44%**

---

## Failed Criteria (Key Gaps)

* Failed to render a proper **stacked bar chart**
* Did not display **category-wise stacked segments**
* Ranking table missing required columns (Total Sales, Market Share, Rank)
* Region checkboxes not displayed or incorrectly placed
* Chart did not update when regions were toggled
* Table values (total sales, share, rank) did not update dynamically
* Table was not consistently sorted by rank
* Hover interaction did not link chart segments to table rows
* Chart and table were not synchronized after filtering

---

## Observed Model Behavior

* Generated a basic dashboard layout structure
* Displayed partial elements of chart and table
* Implemented limited static data representation

However:

* Failed to implement **true stacked visualization**
* Could not maintain **synchronization across views**
* Dynamic filtering logic was incomplete or incorrect
* Ranking and aggregation logic was either missing or inaccurate

---

## Failure Diagnosis

The model struggled primarily with **multi-view coordination and aggregation logic**:

* **Visualization Breakdown**
  Failed to construct a proper stacked bar chart with category segmentation

* **Aggregation Errors**
  Could not correctly compute:

  * Total sales per category
  * Market share
  * Ranking based on totals

* **Dynamic Update Failures**
  Region filtering did not trigger consistent updates across components

* **Sorting Logic Gap**
  Table was not re-sorted dynamically based on updated rankings

* **Cross-Component Interaction Failure**
  Hover interaction between chart and table was missing

* **State Synchronization Issue**
  Chart and table operated on inconsistent datasets after interaction

---

## Resolution Approach

Manual corrections focused on enforcing consistent data flow and coordinated updates:

* Centralized dataset for all regions and categories
* Derived computations:

  * Category totals
  * Market share percentages
  * Rank assignment based on totals

* Filtering pipeline:

  * Apply region selection → recompute dataset → update chart + table

* Visualization fixes:

  * Proper stacked bar chart construction
  * Segmentation by product category

* Interaction fixes:

  * Checkbox-driven filtering
  * Hover linking between chart segments and table rows

* Sorting enforcement:

  * Table dynamically sorted by rank after every update

---

## Model Output Code

Full generated application code:  
[View Code](./sales_dashboard_simulator_code.js)

---

## Key Takeaway

LLMs perform well in:

* Basic dashboard scaffolding
* Static UI component generation

But struggle with:

* Multi-view synchronization (chart ↔ table)
* Aggregation and ranking logic
* Dynamic filtering with consistent updates
* Coordinated interactions across components

These limitations highlight the need for **explicit data pipelines and centralized state management** when building analytical dashboards using LLM-generated code.

---
