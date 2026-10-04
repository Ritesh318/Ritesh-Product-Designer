# Taabi Report Visual Language
### Derived from the Fuel Optimization Report (Shyam Steel & Power Ltd · 01–31 Aug)

A single reference for building any Taabi client report in the same look, from the page canvas down to chart marks and sentence patterns. Values below are the ones used in the shipped HTML report.

---

## 1. Principles

1. **One question per page.** Every page opens with a blue question ("How did fuel pilferage impact the fleet this month?") and a light plum title that answers it. The page's job is to answer that question.
2. **Light and airy, not dense.** Thin type, pale tinted page backgrounds, white cards. Weight is saved for numbers, labels and calls to action.
3. **Insight before decoration.** Each data block ends in an `#Insights` line stating what the reader should conclude. Charts are plain; the sentence carries the meaning.
4. **Warm = risk, blue = action / positive.** Orange and plum describe exposure and severity; blue describes navigation, actions and good news.
5. **Print first.** Pages are A4. Nothing scrolls inside a page. Everything must survive "Save as PDF".
6. **Light mode only.** No dark theme. Page colours are part of the brand.

---

## 2. Page system

| Property | Value |
|---|---|
| Format | A4 portrait, 210 × 297 mm |
| Design canvas | 924 × 1308 px (A4 ratio), scaled to the sheet width |
| Page padding | 34px top/bottom, 56px left/right (tight pages 26/22px) |
| Content width | 812px |
| Page gap on screen | 16px, neutral `#dcdce6` gutter, soft shadow |
| Print | `@page { size: A4; margin: 0 }`, one sheet per page, background colours forced on |
| Overflow | Hidden. If content does not fit, reduce spacing or split the page, never shrink below the type minimums |

**Scaling model:** author at 924px wide, then scale the canvas with `transform: scale(sheetWidth / 924)`. This keeps every page identical on phone, laptop and print.

**Page structure (top to bottom):** logo → question line → page title → content blocks → `#Insights`. Cover and closing pages are exceptions.

---

## 3. Colour

### 3.1 Core tokens

```css
:root {
  /* text */
  --ink:    #141414;   /* primary body, table cells */
  --plum:   #4a1548;   /* titles, key numbers, insight text */
  --muted:  #7a5a78;   /* captions, helper text, table headers */
  --blue:   #0047c8;   /* questions, links, CTAs, labels, bars */

  /* surfaces */
  --card:   #ffffff;   /* cards, tables, white page sections */
  --line:   #e3e3ee;   /* borders, row dividers */
  --head:   #f6f6f9;   /* table header, chips */
  --tint:   #e0e9fb;   /* highlighted chart column, "positive" pill */

  /* page backgrounds */
  --cover:  #f5fdff;   /* cover (aqua-white) */
  --lav:    #f1f1fd;   /* overview, refuel hotspots, deep dive (lavender) */
  --rose:   #fff1f0;   /* trend, pilferage hotspots, behaviour (blush) */
  --act:    #f5f5ff;   /* action page (periwinkle-white) */

  /* heat scale (calendar) */
  --h0: #fff5e8;  --h1: #ffe0bd;  --h2: #ffb566;  --h3: #f28a1e;

  /* closing page */
  --band1: #e4e5ff;  --band2: #d0d1ff;  --story: #3a4bff;
}
```

### 3.2 Brand and chart colours

| Use | Hex |
|---|---|
| Logo wordmark | `#1a9ad8` |
| Logo accent bar | `#f28a1e` |
| Chart line and markers | `#1a63e0` |
| Calendar cell text | `#1c1c2a` |
| Closing divider | `#d6d7f5` |

### 3.3 Page background rules

| Page type | Background |
|---|---|
| Cover | `--cover` |
| Overview, KPI-first pages, deep dives | `--lav` |
| Trend, risk, behaviour pages | `--rose` |
| Action / recommendation | `--act`, then `--band1` and `--band2` strips, then `--story` |
| Calendar or other white subsection | `--card` |

Two backgrounds can share one page (overview + calendar, pilferage + refuel hotspots). Split at a hard edge, no gradient. Adjacent pages should alternate between lavender and rose where possible.

### 3.4 Semantic mapping

| Meaning | Colour |
|---|---|
| Exposure, severity, risk | Orange heat scale, plum |
| Needs intervention ("Action") | Orange `#f28a1e`, light orange `#ffb566`, plum on `--h0` pill |
| First-time / root-cause review | `#ffb566` |
| Continuing / chronic | `--plum` |
| Positive change, stopped | `--blue` on `--tint` pill |
| Links, buttons, quantities that are "good to click" | `--blue` |

Never use red or green. The palette communicates direction through warm vs cool, not traffic lights.

---

## 4. Typography

**Typeface:** Plus Jakarta Sans (Google Fonts), weights 300, 400, 500, 600, 700. Fallback `system-ui, sans-serif`.

Hierarchy comes from **weight contrast**: light (300) for large display, semibold (600) for labels and section heads.

| Role | Size | Weight | Colour | Notes |
|---|---|---|---|---|
| Cover client name | 50px | 700 | blue | line-height 1.15 |
| Cover date | 38px | 300 | plum | |
| Cover title | 64px | 300 + **700** second line | ink | "Fuel / **Optimization Report**" |
| Page question | 14px | 600 | blue | Sentence case, ends with `?` |
| Page title (H2) | 42px | 300 | plum | letter-spacing −0.02em, line-height 1.1 |
| Section head (H3) | 24px | 600 | plum | |
| Card head | 20px | 600 | plum | |
| KPI value | 30px | 300 | plum | 34px on roomy pages |
| Vehicle count | 44px | 300 | plum | |
| Sub-headline | 26px | 300 | plum | e.g. "1,910 events in the latest period" |
| Body / list item | 15–17px | 400 | ink | |
| Insight text | 15–17px (22px beside the calendar) | 400 | plum | |
| `#Insights` label | 14px | 600 | blue | |
| Table cell | 13px | 400 | ink | |
| Table header | 13px | 400 | muted | |
| Caption / helper | 11.5–13px | 400 | muted | |
| Eyebrow label (cards) | 12px | 700 | blue | uppercase, letter-spacing 0.08em |

**Rules**
- Numbers and units: value and unit are separated by a space (`2,802.87 L`), with the unit kept in the same style as the value.
- Tables never wrap; `white-space: nowrap` on cells.
- No italics, no underlines except link hover.
- Do not use more than one bold weight inside a title (the cover is the only exception).

---

## 5. Spacing, shape, elevation

| Token | Value |
|---|---|
| Base unit | 4px, common steps 8 / 12 / 16 / 22 / 28 |
| Card radius | 16px |
| Button radius | 8px |
| Chip radius | 6px |
| Pill / tag radius | 99px |
| Bars | 3px (thin rows), 6px (stacked bar) |
| Border | 1px `--line`; day cells 2px `--line` |
| Shadow | None inside the page. Only the sheet on screen carries a soft shadow |

Vertical rhythm on a page: logo (20px below) → question (8px) → title (18px) → first block. Between blocks 22–26px. Insight label sits 16–26px under its block.

---

## 6. Components

### 6.1 Logo
Wordmark "taabi" at 30px, bold, `#1a9ad8`, with a 12×5px orange bar before the "t". Top-left of every page except the cover (large) and the second half of a split page.

### 6.2 Question line + title
Blue 14px/600 question, then 42px/300 plum title. The question is the page's promise; the title is the topic name. Keep titles 2–4 words.

### 6.3 KPI grid
3 columns × 2 rows, one shared 1px `--line` border, transparent cells (the page tint shows through), 12px 16px padding.
Cell = label (14px/500, ink) → value (30px/300, plum) → helper (12.5px, muted).
Use for the headline metrics of a page. Maximum 6 cells. Helper text explains the denominator or comparison ("5.7% Less Vs last month").

### 6.4 Data table card
White card, radius 16, 1px border, horizontal scroll fallback.
- Header row: `--head`, muted 13px, centred except first two columns (left).
- Body rows: 10px vertical padding, 1px top divider.
- First column rank (`#Rank`), second column the entity.
- Footer: full-width centred blue 13px/600 link ("Download all vehicles"), 1px top divider.
- Title row above the table: H3 left, sort/period note right (13px).
- Show top 5 only. Everything else is behind the download link.

### 6.5 Calendar heat map
7-column grid, 4px gap, cells ≥ 50px high. Day number top-left (11px), value bottom-left (13px bold, `#1c1c2a`) in litres.

| Daily value | Fill |
|---|---|
| ≤ 11 L | `--h0` |
| 12–21 L | `--h1` |
| 22–32 L | `--h2` |
| ≥ 33 L | `--h3` |

Place a 22px insight beside it ("Peak days: 13 Aug and 24 Aug…"). Re-tune thresholds per dataset, keep 4 steps.

### 6.6 Line chart (trend)
Rounded white card, SVG `760 × 185`. One line `#1a63e0` 2px, markers r5 white fill with blue stroke, value label above each marker (12px, ink), category label along the bottom (12px, muted). **No axes, no gridlines.** The latest period gets a `--tint` column behind it. Provide an `aria-label` that lists every value.

### 6.7 Lens card (severity / value)
Two side-by-side white cards under H3 "Severity lens" and "Value lens". Row = label (18px, muted) + 3px blue connector line + value (20px, ink). Under each row a 11.5px muted comparison line: `Previous month: … | Decreased by … | Lower exposure`.

### 6.8 Distribution bars
Row = label (110px, 190px for long labels) · 6px blue bar (width = %) · value right-aligned (44px, ink). White card, 18px padding. Used for time-of-day and refuel-timing splits. Bars are proportional, one colour.

### 6.9 Status card (behaviour movement)
White card, radius 16, **5px top border in the group colour**, min-height 290px.
Header: uppercase blue eyebrow left, pill right. Big count (44px/300 plum, "14 vehicles"). Chip row of up to 4 identifiers plus a dashed "+N more" chip. Blue "Download vehicle list ↓" pinned to the bottom.

| Group | Top border | Pill |
|---|---|---|
| Increased / restarted | `#f28a1e` | Action (`--h0` bg, plum text) |
| First-time | `#ffb566` | Action |
| Continuing | `--plum` | Action |
| Stopped | `--blue` | Positive (`--tint` bg, blue text) |

Above the grid, a **stacked bar** (12px high, 6px radius, 2px gaps, flex ratio = counts) with a legend (12.5px, muted, 10px swatches). Counts should total a number stated elsewhere in the report (here, 42).

### 6.9a Chips and tags
Chip: 12.5px/500, 5px 10px padding, 1px `--line`, radius 6, `--head` fill. Overflow chip: transparent, dashed border, muted text. Pill tag: 11px/600, radius 99.

### 6.10 Download card
White card with title (20px/600 plum), one-line helper (14px muted) and a solid button on the right: `--blue` fill, white 14px/600, 12px 22px, radius 8.

### 6.11 `#Insights` block
Label `#Insights` (blue, 14px/600) then one or two sentences in plum. This is the only "narrative" element. See voice rules in §9.

### 6.12 Numbered action list
Counter in blue 600, 28px column, then 17px ink sentence, 18px vertical padding, no dividers. Five items maximum. Each item = **finding + implied action**.

### 6.13 Value story (closing panel)
Full-bleed `--story` (`#3a4bff`) panel, white text. Title 34px/300, four stats (label 12px at 85% opacity, value 28px/300) in a 4-column grid, then a one-paragraph closing statement (max width 700px). Preceded by two bands (`--band1` 24px with a hairline, `--band2` 130px) that step the colour from the page tint into the panel.

---

## 7. Page recipes

| # | Page | Background | Blocks, in order |
|---|---|---|---|
| 1 | Cover | `--cover` | Logo · date (38/300) · client + product (50/700 blue) · … · "Fuel **Optimization Report**" · 68×5px blue rule · topic line (13px blue, dot-separated) |
| 2 | Overview | `--lav` + white calendar | Question · title · KPI grid · Top-5 table · calendar + insight |
| 3 | Trend & intensity | `--rose` | Question · title · sub-headline + definition · line chart · comparison table · severity/value lenses · insight |
| 4 | Hotspots | `--rose` over `--lav` | Two stacked halves, each: question · title · Top-5 table · insight |
| 5 | Vehicle behaviour | `--rose` | Question · title · date · stacked bar + legend · 2×2 status cards · download card · insight |
| 6 | Deep dive | `--lav` | Question · title · 3-cell KPI strip · two distribution cards side by side · full-width timing distribution · insight |
| 7 | Action + value | `--act` → bands → `--story` | Question · title · 5 numbered actions · bands · value story |

**Cover topic line:** list the five chapter nouns in the order they appear ("Pilferage value · Fleet impact · Vehicle behaviour · Hotspots · Action").

**Narrative arc:** *How big is it* (overview) → *Is it getting better* (trend) → *Who and where* (behaviour, hotspots) → *Under what conditions* (deep dive) → *What do we do* (action).

---

## 8. Data visualisation rules

1. One accent colour per chart (blue). Heat uses the orange scale only.
2. No gridlines, axes, legends or 3D. Label marks directly.
3. Bars are proportional to the value they print; never decorative.
4. Always show the comparison baseline (previous month, YTD average) in a table or helper line.
5. Show the **top 5** in the document and link the full list.
6. Highlight only the latest period.
7. Every visual carries an accessible label summarising its values.
8. Keep the same unit everywhere a metric appears (litres for volume, ₹ for value, % for share).

---

## 9. Content and voice

**Tone:** factual, plain, operations-minded. No exclamation marks, no jargon beyond fleet vocabulary.

**Formats**
- Numbers: Indian grouping for rupees (`₹2,45,000/-`, `₹23.0L`, `₹1.84 Cr`); thousands separators for litres (`25,552.96 L`).
- Percent change: `+4.47 L (+50.2%)`, with a true minus sign `−`. Percentage points as `pp`.
- Dates: `01 – 31 Aug`, `01 Aug – 31 Aug, 2026`, `13 Aug`.
- Vehicle identifiers: uppercase, no spaces (`WB37G4107`).
- Time windows: `00–06`, `06–12`, with an en dash.

**Questions** (page openers): sentence case, present or past tense, specific to the page ("Under what conditions is pilferage happening?").

**`#Insights` patterns**
- *Peak:* "Peak days: 13 Aug and 24 Aug show the highest daily pilferage volumes."
- *Concentration:* "68% of pilferage occurs during night hours."
- *Change:* "Total events moved from ~3,037 to ~1,910 in the latest period, about 37% lower than the peak."
- *Location signal:* "Location signal: the Top 10 locations concentrate… and should be reviewed for recurring site and operating-pattern signals."
- *Action logic:* "Increased / restarted and continuing vehicles need intervention; first-time vehicles need root-cause review; stopped vehicles are evidence of positive behaviour change."

**Action items** start with the finding, then the action: "5 vehicles have restarted pilferage after previously showing no incidents and should be prioritised for investigation."

**Closing statement:** one sentence connecting fleet-level loss to cohorts, time windows and hotspots, ending on where intervention changes behaviour.

---

## 10. Interaction and accessibility

- Links and buttons are blue; hover/focus on text links adds an underline. Provide `aria-label`s on icon-only links ("View location 3").
- Colour is never the only carrier of meaning: tags carry the words "Action" / "Positive", heat cells print their values.
- Minimum body size 13px at design canvas (≈11px on A4). Captions can go to 11.5px.
- Contrast: plum and ink on every page tint, white on `--blue` and `--story`, are all above 4.5:1. `--muted` is for secondary text only.
- Tables scroll horizontally inside their card rather than breaking the page.
- Placeholder links (`#`) must be replaced with real exports before sending.

---

## 11. Build checklist

- [ ] Canvas is 924 × 1308 and scaled to A4
- [ ] One question line, one title, one logo per page
- [ ] Background colour matches §3.3; no dark mode
- [ ] Top-5 tables with a "Download all" link
- [ ] Every data block has an `#Insights` line
- [ ] Heat thresholds re-tuned to the dataset
- [ ] Numbers consistent across pages (see §12)
- [ ] Print preview shows exactly one sheet per page, backgrounds intact
- [ ] All placeholder links replaced

---

## 12. Data integrity rules (learned from this report)

The source report had cross-page conflicts that undermine trust. Treat these as release blockers:

1. **One source per metric.** Savings, events and percent change must be identical wherever they appear (₹ savings, event counts, month-on-month %).
2. **Insight must match its chart.** If a chart says 68%, the insight cannot say 65%.
3. **Cohort definitions are stated once and reused.** "Restarted", "continuing", "first-time" and "stopped" need one definition; counts on the behaviour page and in the action list must agree.
4. **No duplicate rows in ranked tables.** A vehicle or site appears once per ranking.
5. **Units follow the column.** A "Value saved" column holds ₹, a "Pilferage" column holds litres.
6. **Charts match their sentence.** If the headline is about events, the chart plots events, not litres.
7. **Month order is chronological** unless the chart is explicitly a ranking.
8. **Each location row has a distinct place name** and each ranked row has distinct values, otherwise the table is a placeholder and should not ship.
