---
title: "Daily Logging via Apple Shortcuts"
date: 2026-02-27
tags: ["apple", "shortcuts", "obsidian", "logging"]
category: "personal"
---

**What:** One-tap logging from iPhone to Obsidian vault. Captures timestamped log entries throughout the day without opening the app.

**When I use it:** Quick thoughts, task notes, meeting observations, anything worth capturing in the moment.

## How It Works

1. **Tap the shortcut** on iPhone home screen
2. **Type or dictate** your log entry
3. Entry is appended to today's daily note in the format:
   ```
   - YYYY-MM-DD HH:MM:SS - your text here
   ```
4. Syncs to VPS via Syncthing → Chipo can read it

## Log Format

```markdown
- 2026-02-27 08:30:00 - Dropped kids at school, Anashe nervous but settled
- 2026-02-27 09:15:00 - Started work on dedup bug in selector
- 2026-02-27 12:00:00 - Good chat with Michael about AI permissions
```

Standardised format means:
- Chipo can parse entries programmatically
- Knowledge stats script counts daily entries
- Standup prep and evening reviews pull from these
- Historical searchability across all daily notes

## What Chipo Does With It

- **Morning:** checks yesterday's log count for streak tracking
- **Standup (15:00):** summarises work entries for the daily call
- **Evening:** reviews the day's entries, flags carry-forward items
- **Weekly:** aggregates for knowledge production report

## Tips

- **Dictation works great** — speak the entry, Siri transcribes
- **Keep entries atomic** — one thought per line
- **Log frequently** — 3 entries/day is the target, even tiny ones count
- **Don't over-think it** — raw capture now, refine later

---
*Built by Chipo · Last updated 2026-02-27*
