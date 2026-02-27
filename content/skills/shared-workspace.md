---
title: "Setting Up a Shared Workspace with an AI Assistant"
date: 2026-02-27
tags: ["vps", "obsidian", "syncthing", "tailscale", "infrastructure"]
category: "chipo"
---

**What:** A VPS that acts as a shared workspace between me and my AI assistant. My notes, calendar, and daily operations live there — I write in Obsidian on my Mac or phone, and Chipo (the AI) can read, organise, and build on top of it.

**Why:** An AI assistant is more useful when it has persistent access to your actual context — not just a chat window. By giving Chipo access to my Obsidian vault, calendar, and task list, it can do things like prepare standup summaries, track habits, manage appointments, and produce meeting minutes without me having to explain everything from scratch each session.

## The Architecture

```
iPhone / Mac                        VPS (always on)
┌──────────┐    Syncthing     ┌──────────────────┐
│ Obsidian │ ◄──────────────► │ Obsidian Vault   │
│ (notes)  │                  │ (shared copy)    │
└──────────┘                  │                  │
                              │ AI Assistant     │
┌──────────┐    Tailscale     │ (Chipo/OpenClaw) │
│ iPhone   │ ◄──────────────► │                  │
│ Shortcut │   (private net)  │ Calendar sync    │
└──────────┘                  │ (vdirsyncer)     │
                              └──────────────────┘
```

**Three layers:**

1. **Private network (Tailscale)** — all devices are on the same encrypted mesh network. Nothing is exposed to the public internet. The iPhone can talk to the VPS directly, securely.

2. **File sync (Syncthing)** — the Obsidian vault syncs automatically between my Mac and the VPS. I write notes on my Mac, they appear on the VPS within seconds. Chipo writes files on the VPS, they appear on my Mac.

3. **AI assistant (OpenClaw)** — runs on the VPS with full access to the vault. It can read my notes, append log entries, manage tasks, query my calendar, and produce documents. It's always on — I can message it from Telegram, and it has the context of everything in the vault.

## What Lives in the Shared Workspace

- **Daily notes** — timestamped log entries captured via voice or keyboard
- **Tasks** — GTD-style task list that Chipo reviews and nudges me on
- **Meeting transcripts** — audio recordings transcribed and turned into minutes
- **Calendar** — synced from iCloud, so Chipo knows my schedule
- **Bible study notes** — weekly study materials and reflections
- **Knowledge stats** — metrics tracking my writing and note-taking habits

## What the AI Can Do With It

Because Chipo has persistent access to this workspace, it can:

- **Morning briefing** — prayer focus, Bible study question, schedule, task nudges, knowledge stats
- **Standup prep** — summarise my Toggl time entries and daily logs before the 3:30 call
- **Evening review** — recap the day, flag carry-forward items
- **Meeting minutes** — transcribe audio recordings and produce formal documents
- **Calendar management** — add events from photos of appointment cards
- **Knowledge tracking** — gamify my note-taking with streaks and refinement ratios

## Key Principles

- **No credentials in the vault** — API keys, passwords, and tokens live in environment variables on the VPS, never in notes
- **Private network only** — the VPS API isn't exposed to the internet, just Tailscale
- **I stay in control** — Chipo always asks before sending emails, making calendar changes, or doing anything external
- **The vault is mine** — Chipo reads and writes to it, but I own the content. It's a collaboration, not a takeover

## Getting Started

The core setup:

1. **Provision a VPS** — any Linux box will do (I use a small Hetzner instance)
2. **Install Tailscale** — join the VPS, your Mac, and your phone to the same tailnet
3. **Install Syncthing** — set up two-way sync between your Mac's Obsidian vault and the VPS
4. **Install OpenClaw** — the AI assistant framework that gives your AI persistent context
5. **Connect a messaging channel** — Telegram, WhatsApp, Signal, or just the web UI

Once it's running, you have an AI assistant that knows your schedule, reads your notes, and can actually help — not just answer questions in a vacuum.

---
*Last updated 2026-02-27*
