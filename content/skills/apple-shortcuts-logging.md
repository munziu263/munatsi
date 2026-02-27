---
title: "Daily Logging via Apple Shortcuts"
date: 2026-02-27
tags: ["apple", "shortcuts", "obsidian", "logging", "voice"]
category: "personal"
---

**What:** One-tap voice logging from iPhone to Obsidian vault. Press a button, speak, and it lands as a timestamped entry in today's daily note.

**When I use it:** Quick thoughts, task notes, meeting observations, anything worth capturing in the moment — without opening an app or typing.

## How It Works

The iPhone 16 has a dedicated **Action Button** which I've mapped to an Apple Shortcut called "Log To Clawdbot". The flow:

1. **Press the Action Button** on the side of the phone
2. **Record audio** — speak your log entry
3. **Transcribe** — iOS speech recognition converts it to text on-device
4. **POST** the transcription to a `/log` endpoint on the VPS (via Tailscale)
5. **Chipo** receives it, formats it with a timestamp, appends to today's daily note
6. **Show alert** — the response is displayed as confirmation

The whole loop — press, speak, transcribed, logged — takes a few seconds. No typing, no app switching.

## The Shortcut (6 steps)

```
Record audio
  ↓
Transcribe [Recorded Audio] to text
  ↓
URL: http://<vps-tailscale-ip>:18790/log
  ↓
Get contents of [URL]
  ↓
Get Value for [msg] in [Contents of URL]
  ↓
Show alert [Dictionary Value]
```

The VPS endpoint is only accessible over [Tailscale](https://tailscale.com/) — the phone and VPS are on the same private network, so it's secure without exposing anything to the public internet.

For how the VPS, vault sync, and AI assistant all fit together, see [Setting Up a Shared Workspace with an AI Assistant](/skills/shared-workspace/).

## Log Format

Every entry follows a standardised format:

```markdown
- 2026-02-27 08:30:00 - Dropped kids at school, Anashe nervous but settled
- 2026-02-27 09:15:00 - Started work on dedup bug in selector
- 2026-02-27 12:00:00 - Good chat with Michael about AI permissions
```

## Why It Matters

- **Zero friction** — the Action Button makes it truly one-tap
- **Voice-first** — no typing, works while walking, driving, holding a baby
- **Atomic entries** — one thought per log, easy to scan later
- **Feeds everything downstream** — Chipo uses these logs for standup prep, evening reviews, weekly reports, and knowledge production metrics

## What Chipo Does With The Logs

- **Morning:** counts yesterday's entries for streak tracking
- **Standup (15:00):** summarises work entries for the daily call
- **Evening:** reviews the day, flags carry-forward items
- **Weekly:** aggregates for knowledge production report and gamification targets

---
*Last updated 2026-02-27*
