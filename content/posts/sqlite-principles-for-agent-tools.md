---
title: "The SQLite Principles for Agent-Ready APIs"
date: 2026-03-17
draft: false
tags: ["ai", "tools", "design", "agents"]
---

*This manifesto emerged from a conversation I had with an AI about what makes tools work well for agents. We started from SQLite's design philosophy and worked out what it teaches about building tools that AI can actually use reliably.*

---

> What embedded database design teaches us about building tools that AI can actually use.

## Preamble

SQLite is one of the most widely deployed pieces of software in existence. Its secret is not the database engine — it is the API. Eight functions. Two files. No ceremony. A developer can read the entire documentation and hold a complete mental model in their head by the end of an afternoon.

When a model calls a tool, it is in the same position as that developer: it must form a correct mental model from a description, pick the right function, pass the right arguments, and handle what comes back. The failure modes are identical — confusion, wrong assumptions, silent misuse.

These principles are derived from SQLite's design philosophy and applied to the problem of building tools, plugins, and SKILL.md files that AI agents can actually use reliably.

---

## Principle 01 — Zero-friction invocation

SQLite ships as two files. You copy them in and compile. There is no ceremony before you can begin. Your tool must work the same way: invocable with the minimum possible inputs, with sane defaults for everything else.

If a model must gather six pieces of context before it can call your tool, it will avoid calling it, call it wrong, or hallucinate the missing fields. Required parameters should be genuinely required. Everything else should have a default.

**The law:** A tool that is hard to invoke correctly will not be invoked correctly.

---

## Principle 02 — One tool, one responsibility

SQLite's core is eight functions, each doing exactly one thing. A model reasons about a tool through its description. If a single tool does different things depending on a `mode` parameter, the model must reason through a tree of possibilities before calling it. That is cognitive load that compounds into errors.

Resist the god tool. A single `run_query(type, params, mode, flags)` is secretly four tools wearing a coat. Split it.

**The law:** If you cannot describe what your tool does in one sentence without the word "and", it is two tools.

---

## Principle 03 — Shape teaches mental model

SQLite's `prepare → bind → step → finalize` cycle mirrors exactly how SQL execution works. Using the API correctly requires thinking correctly. The shape of the interface is the shape of the task.

For agent tools, the granularity of your API is the granularity of the model's agency. If your tool bundles retrieval, ranking, and synthesis into one call, the model cannot intervene when retrieval goes wrong. Separate tools for separate stages give the model something to reason about and act on.

**The law:** The shape of a tool call should be isomorphic to the shape of the task.

---

## Principle 04 — Errors must be informative and un-ignorable

Every SQLite function returns a status code. There is no hidden error state. The companion `errmsg()` always gives a human-readable explanation. It is tedious, but completely predictable.

A model that receives `{"results": []}` does not know whether nothing matched, the query was malformed, or the service is down. It will proceed as if nothing matched. A response like `{"error": "no_results", "reason": "date filter excluded all rows", "suggestion": "retry without date constraint"}` gives the model something to act on.

Specify what failure looks like, not just what success looks like. Empty results and errors are different things. Treat them differently.

**The law:** A silent failure is indistinguishable from an empty success. Your tool must know the difference, and say so.

---

## Principle 05 — Simple path first, complexity opt-in

SQLite offers `sqlite3_exec()` for the common case and the full low-level API for when you need control. The easy path is genuinely easy. The complex path is genuinely possible.

A model will almost always attempt the simplest possible invocation. If the simple invocation does not work for the common case, you have already lost. Design the 80% case to require 20% of the parameters. Let the rest be opt-in.

**The law:** Make the common case require the fewest inputs. Let power users opt into complexity — do not make everyone pay for it.

---

## Principle 06 — Stable interfaces are a contract

SQLite has never broken backwards compatibility. Code written against version 3.0 compiles against the latest release. This makes it safe to embed without fear. The developers treat this as a serious contractual obligation, not a courtesy.

A model that has learned to call your tool a certain way — through prompting, examples, or fine-tuning — will break silently if you change the schema. Treat your tool interface as a public API. Version it when you must change it. Never mutate what it does without saying so.

**The law:** If your tool changes what it does without changing its name, you have created a lying interface.

---

## Principle 07 — Descriptions must be completeable

Because SQLite's API is small, you can read all its documentation and hold a complete picture in your head. The docs are completeable. For an agent tool, the equivalent is a description the model can fully parse in one reading.

A model does not re-read documentation. It forms a mental model at context-load time and acts on it. Ambiguity in your description will be resolved by assumption, and those assumptions will be wrong in exactly the cases that matter.

Write your tool description as if you are explaining it to someone who will never ask a follow-up question. Because they will not.

**The law:** Every ambiguity in a tool description is a bug that will manifest at the worst possible moment.

---

## Principle 08 — Restraint is a feature

SQLite has no network stack, no authentication, no server process, no configuration file by default. Every feature that was left out is one less thing that can go wrong, and one less thing anyone needs to understand. That restraint is as important as everything that was included.

A tool that also logs, also sends a notification, also updates a cache — has side effects the model does not know about and cannot predict. It will call the tool in contexts where those side effects are wrong. Scope your tools to what they genuinely need. The blast radius of a narrow tool is small.

**The law:** Every side effect your tool has that is not in its description is a trap.

---

## Coda — The underlying principle

SQLite succeeds because its designer had a very clear model of who the user is and what they are trying to do. Every decision flows from that picture.

For agent tools, your user is a model that is:

- Good at following clear patterns
- Bad at resolving ambiguity
- Unable to ask for clarification mid-call
- Always taking the path of least resistance in your schema

Design everything from that picture — and you will build tools that actually get used.

---

*Derived from D. Richard Hipp's SQLite design philosophy. Applied to agent tool design, 2026.*
