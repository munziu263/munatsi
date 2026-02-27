---
title: "Transcribe Audio with Whisper"
date: 2026-02-27
tags: ["audio", "transcription", "whisper", "cli"]
category: "chipo"
---

**What:** Convert audio files (voice notes, meetings, board calls) to text using OpenAI's Whisper model locally. No API key, no cloud.

**When I use it:** Meeting transcriptions, Tarcon board meetings, voice note processing.

## Quick Start

```bash
whisper recording.m4a --model tiny --output_format txt --output_dir /tmp/whisper_out
```

## Key Options

| Flag | Purpose |
|------|---------|
| `--model tiny` | Fast, low RAM (~1GB). Use on VPS |
| `--model base` | Better accuracy, still light |
| `--model small` | Good quality, needs ~2GB RAM |
| `--output_format txt` | Plain text. Also: `srt`, `vtt`, `json` |
| `--language en` | Force English (skips detection) |

## Tips

- **VPS:** Always use `--model tiny` — the box can't handle larger models
- **Zim accents:** Feed known vocabulary via `--initial_prompt "Tarcon, Tongogara, Chinhoyi, Ziumbe, Gudo"` to improve proper noun accuracy
- **Voice notes** land in `~/.moltbot/media/inbound/` as `.ogg` — sort by date: `ls -lt *.ogg | head -5`
- **Post-processing:** Keep a find-and-replace dictionary for known garbles (e.g. "Cito Faran" → "City of Harare")

## Real Example

Transcribing a Tarcon board meeting (1.5 hours, .m4a):
```bash
whisper ~/vault-munatsi/meetings/tarcon_board_20251023.m4a \
  --model tiny \
  --output_format txt \
  --output_dir ~/vault-munatsi/meetings/ \
  --initial_prompt "Tarcon, Tongogara, Chinhoyi, Nyamapanda, Zvamadzi, Ziumbe, Gudo, Rainsford"
```

## What Chipo Does With It

1. Transcribe the audio
2. Cross-reference against board pack documents for accuracy
3. Produce formal minutes in the company's house style
4. Generate PDF for distribution

---
*Built by Chipo · Last updated 2026-02-27*
