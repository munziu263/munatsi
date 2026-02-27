---
title: "Daily Logging via Apple Shortcuts"
date: 2026-02-27
tags: ["apple", "shortcuts", "obsidian", "logging", "voice"]
category: "personal"
---

**What:** One-tap voice logging from iPhone to Obsidian vault. Press a button, speak, and it lands as a timestamped entry in today's daily note.

**When I use it:** Quick thoughts, task notes, meeting observations, anything worth capturing in the moment — without opening an app or typing.

## How It Works

The iPhone 16 has a dedicated **Action Button** which I've mapped to an Apple Shortcut. The flow:

1. **Press the Action Button** on the side of the phone
2. **Speak** your log entry (as long as you need)
3. The Shortcut **records and transcribes** your voice using iOS speech recognition
4. The transcription is sent as a message to **Chipo** (my AI assistant) via the OpenClaw chat completions API running on a VPS
5. Chipo receives the text and **appends it** to today's daily note in the Obsidian vault with a timestamp

The whole loop — press, speak, transcribed, logged — takes a few seconds. No screen interaction needed beyond the initial button press.

## The API

The VPS runs an [OpenClaw](https://github.com/openclaw/openclaw) gateway with an OpenAI-compatible chat completions endpoint. The Shortcut sends a POST request with the transcribed text, and Chipo handles the `/log` command — formatting it and appending to the vault.

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
