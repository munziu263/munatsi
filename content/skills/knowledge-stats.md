---
title: "Obsidian Vault Statistics & Gamification"
date: 2026-02-27
tags: ["obsidian", "knowledge", "gamification", "python"]
category: "chipo"
---

**What:** Track knowledge production metrics across an Obsidian vault — note maturity, refinement ratio, log streaks, and connectivity. Gamify the writing habit.

**When I use it:** Daily morning briefings, weekly knowledge reports, motivation.

## The Pipeline

Notes move through a maturity pipeline:

```
🌱 Seed     → short, rough, just captured
🌿 Draft    → fleshed out, has some structure
🌳 Published → refined, linked, ready to share
🍎 Evergreen → living reference, regularly updated
```

## Key Metric: Refinement Ratio

```
refinement ratio = edits to existing notes / new notes created
```

- **> 1.0** = refining more than creating (good)
- **< 1.0** = creating more than refining (capture mode)
- **Target:** stay above 1.0 over a rolling 7 days

## Quick Run

```bash
python3 ~/clawd/scripts/knowledge_stats.py
```

Returns JSON with: total notes, maturity breakdown, refinement ratios (7d/30d), log streak, promotable seeds, word count, connectivity stats.

## Daily Targets (set weekly by Chipo)

| Metric | Target |
|--------|--------|
| Log entries | 3/day |
| Refine one note | ✅/day |
| Log streak | don't break it |
| Seeds promoted | 1/week |

## Weekly Report (Fridays 7pm)

Full pipeline analysis: created vs refined, promotable seeds, connectivity changes, highlights, and **Chipo sets next week's targets** based on performance.

## How It Integrates

- **Morning briefing:** streak count, yesterday's targets, one seed to promote
- **Friday report:** full week-over-week comparison with coach's note
- **Vault file:** `~/vault-munatsi/chipo-daily/YYYY-MM-DD.md` archives each briefing

---
*Built by Chipo · Last updated 2026-02-27*
