import type { WeekEntry } from './types';

export const CURRICULUM: WeekEntry[] = [

  // ─── PHASE 1 / FOUNDATIONS / WEEKS 1–7 ────────────────────────────────────

  {
    week: 1,
    phase: 1,
    title: 'ZTM Orientation + LLM Fundamentals',
    dateRange: 'Mar 16 – Mar 22',
    tasks: [
      { id: 'w1t1', label: 'ZTM Section 1: Introduction to Prompt Engineering — 30 min lunch session, log in Keep', completed: false },
      { id: 'w1t2', label: 'Set up workspace: Google Keep log, Google Tasks queue, Docs folders for each domain', completed: false },
      { id: 'w1t3', label: 'ZTM Section 2: How LLMs process language — 30 min lunch session, log in Keep', completed: false },
      { id: 'w1t4', label: 'Watch 3Blue1Brown neural network series — take Keep notes on anything that clicks', completed: false },
      { id: 'w1t5', label: 'First Collaboration Log entry: Airtable domain, document the tool setup and initial workflow', completed: false },
      { id: 'w1t6', label: 'ZTM week 1 log: confirm 5 sessions in Keep (~2h 30min)', completed: false },
    ],
  },

  {
    week: 2,
    phase: 1,
    title: 'Attention Mechanism + Transformer Architecture',
    dateRange: 'Mar 23 – Mar 29',
    tasks: [
      { id: 'w2t1', label: 'ZTM Section 3: Transformer architecture — 30 min lunch, log in Keep', completed: false },
      { id: 'w2t2', label: 'Watch Hinton Nobel lecture — log the 3 concepts that land hardest in Keep', completed: false },
      { id: 'w2t3', label: 'Tuesday block: Claude session — "Explain attention to a non-technical customer in under a minute." Iterate until it works.', completed: false },
      { id: 'w2t4', label: 'Seed Foundations NotebookLM: ZTM PE transcripts + Hinton lecture + 3Blue1Brown series', completed: false },
      { id: 'w2t5', label: 'Run first Cross-Model Eval: same explanation prompt across Claude, Gemini, DeepSeek — fill five-row template', completed: false },
      { id: 'w2t6', label: 'Collaboration Log: log the Cross-Model Eval as first Hey Rebel or Airtable domain entry', completed: false },
    ],
  },

  {
    week: 3,
    phase: 1,
    title: 'Core Prompt Engineering Techniques',
    dateRange: 'Mar 30 – Apr 5',
    tasks: [
      { id: 'w3t1', label: 'ZTM Section 4: Core prompting — zero-shot, few-shot, chain-of-thought — 30 min lunch, log in Keep', completed: false },
      { id: 'w3t2', label: 'Tuesday block: practice all three techniques on a real Airtable support case from the queue', completed: false },
      { id: 'w3t3', label: 'Live Support Playbook: write first 1–2 entries immediately after relevant cases — what the customer misunderstood, what framing resolved it', completed: false },
      { id: 'w3t4', label: 'Thursday block: Hey Rebel — Topic Brainstorm pattern. Gemini for 20 angles, Claude prioritises 3.', completed: false },
      { id: 'w3t5', label: 'Weekend: Hey Rebel Pattern Execution (rotation week 1) — run Deep Research pattern on winning angle', completed: false },
      { id: 'w3t6', label: 'Collaboration Log: Hey Rebel domain entry from Topic Brainstorm session', completed: false },
    ],
  },

  {
    week: 4,
    phase: 1,
    title: 'Advanced Prompting — Role, System, Temperature',
    dateRange: 'Apr 6 – Apr 12',
    tasks: [
      { id: 'w4t1', label: 'ZTM Section 4 continued: role prompting, system prompts, temperature — 30 min lunch, log in Keep', completed: false },
      { id: 'w4t2', label: 'Tuesday block: Claude synthesis — draft prompt design pattern cheat sheet for Airtable support domain', completed: false },
      { id: 'w4t3', label: 'Live Support Playbook: 1–2 new entries from week\'s cases — written immediately after the interaction', completed: false },
      { id: 'w4t4', label: 'Thursday block: PLA Lab — first Lesson Design session. Bring a real upcoming unit. Run Socratic scaffolding with Claude.', completed: false },
      { id: 'w4t5', label: 'Collaboration Log: PLA domain entry — log what the Socratic questioning surfaced that you hadn\'t considered', completed: false },
      { id: 'w4t6', label: 'Weekend: Prompt Testing / Cross-Model Eval (rotation week 2) — fill five-row template, note which model produced the most usable support framing', completed: false },
    ],
  },

  {
    week: 5,
    phase: 1,
    title: 'Multi-Model Collaboration + Workflow Design',
    dateRange: 'Apr 13 – Apr 19',
    tasks: [
      { id: 'w5t1', label: 'ZTM Section 5: Comparative model evaluation — 30 min lunch, log in Keep', completed: false },
      { id: 'w5t2', label: 'Tuesday block: map the tool constellation — Claude for synthesis and Socratic work, Gemini for in-Docs flow, NotebookLM for grounded research, DeepSeek for divergence testing', completed: false },
      { id: 'w5t3', label: 'Get into Gemini Docs integration — run one real Hey Rebel editing session inside Docs', completed: false },
      { id: 'w5t4', label: 'Thursday block: PLA Lab — Source Ingestion pattern. Seed a unit-specific NotebookLM. Generate one inquiry trail.', completed: false },
      { id: 'w5t5', label: 'Collaboration Log: PLA domain entry — log which NotebookLM queries produced genuine inquiry vs. summaries', completed: false },
      { id: 'w5t6', label: 'Weekend: PLA Lab Session (rotation week 3) — Voice and Values Check on any AI-generated educational content from the week', completed: false },
    ],
  },

  {
    week: 6,
    phase: 1,
    title: 'ZTM Section 6 + Hey Rebel Editorial Pipeline',
    dateRange: 'Apr 20 – Apr 26',
    tasks: [
      { id: 'w6t1', label: 'ZTM Section 6: Advanced prompting applications — 30 min lunch, log in Keep', completed: false },
      { id: 'w6t2', label: 'Tuesday block: NotebookLM multi-source research session — Foundations base query for Hey Rebel piece. Apply Research Ceiling protocol.', completed: false },
      { id: 'w6t3', label: 'Thursday block: Hey Rebel — Draft and Edit pattern. Human outline first, Claude for developmental edit, Gemini for line edits.', completed: false },
      { id: 'w6t4', label: 'Run Voice Check: Claude session — does this draft reflect the Hey Rebel declarative register?', completed: false },
      { id: 'w6t5', label: 'Live Support Playbook: 1–2 entries from week\'s cases', completed: false },
      { id: 'w6t6', label: 'Weekend: Hey Rebel Pattern Execution (rotation week 4) — Header Image pattern, Gemini/Imagen, 3 iterations, log prompt diffs', completed: false },
    ],
  },

  {
    week: 7,
    phase: 1,
    title: 'Phase 1 Synthesis + Checkpoint',
    dateRange: 'Apr 27 – May 3',
    tasks: [
      { id: 'w7t1', label: 'ZTM Section 6 completion — final lunch sessions, confirm Sections 1–6 fully logged in Keep', completed: false },
      { id: 'w7t2', label: 'Tuesday block: Phase 1 Checkpoint — can you explain attention to a non-technical customer in under a minute? Practice it aloud.', completed: false },
      { id: 'w7t3', label: 'Phase 1 Checkpoint: can you articulate the difference between prompt engineering and fine-tuning, and when each applies?', completed: false },
      { id: 'w7t4', label: 'Tally ZTM Phase 1 total — should be approximately 17–18 hrs. Confirm Keep log is current.', completed: false },
      { id: 'w7t5', label: 'Foundations NotebookLM: final seed pass — add anything from Phase 1 worth querying in Phase 2', completed: false },
      { id: 'w7t6', label: 'Collaboration Log: review all Phase 1 entries — what patterns are you already seeing? Write one sentence summary in Keep.', completed: false },
    ],
  },

  // ─── PHASE 2 / CUSTOMISATION / WEEKS 8–10 ──────────────────────────────────

  {
    week: 8,
    phase: 2,
    title: 'Fine-Tuning LLMs + Voice Calibration',
    dateRange: 'May 4 – May 10',
    tasks: [
      { id: 'w8t1', label: 'Tuesday block: ZTM Fine-Tuning LLMs course, 1hr 23min. Full session. Leave 7 min after for a Keep note: one sentence connecting fine-tuning to Airtable AI feature customisation.', completed: false },
      { id: 'w8t2', label: 'Live Support Playbook — first Phase 2 entry: how fine-tuning explains Airtable AI feature customisation. Written immediately after the course session.', completed: false },
      { id: 'w8t3', label: 'Thursday block: Hey Rebel — Voice Calibration Session, 30 min. Build the voice prompt with Claude. Test without vs. with. Iterate until the delta is obvious.', completed: false },
      { id: 'w8t4', label: 'Thursday block (remaining 60 min): Deep Research pattern. Seed Customisation NotebookLM with Scary Smart excerpts, Gawdat interviews, Hinton warnings. Query for Hey Rebel angles on fine-tuning and the humans whose work gets shaped by it.', completed: false },
      { id: 'w8t5', label: 'Reading: Scary Smart pp. 63–118 — first half from current position. 20 pages/session across daily reading slots. Target: complete by May 8.', completed: false },
      { id: 'w8t6', label: 'Weekend: Hey Rebel Pattern Execution (rotation 1). Deep Research pattern to generate source-grounded material for fine-tuning piece. Log Collaboration Log entry.', completed: false },
      { id: 'w8t7', label: 'ZTM Slow-Burn week 1 logged — 5 × 30 min = 2h 30min. Confirm sessions in Keep.', completed: false },
    ],
  },

  {
    week: 9,
    phase: 2,
    title: 'Fine-Tuning Synthesis + Airtable Product NotebookLM',
    dateRange: 'May 11 – May 17',
    tasks: [
      { id: 'w9t1', label: 'Tuesday block (first 30 min): set up fourth NotebookLM — Airtable Product base. Seed with Airtable AI product docs, release notes, internal TSS resources. Queryable from this point during live support work, not bootcamp.', completed: false },
      { id: 'w9t2', label: 'Tuesday block (remaining 60 min): Claude synthesis — how does fine-tuning explain Airtable\'s AI feature customisation for enterprise customers? What does proprietary data shaping mean for a customer conversation? Draft in Docs.', completed: false },
      { id: 'w9t3', label: 'Live Support Playbook: commit key framing from the synthesis immediately after the Tuesday session. 1–2 additional entries from week\'s cases.', completed: false },
      { id: 'w9t4', label: 'Thursday block: PLA Lab — Lesson Design pattern (rotation week 1). Bring a real upcoming PLA unit. Run the Socratic scaffolding session with Claude. Log what the questioning surfaced.', completed: false },
      { id: 'w9t5', label: 'Reading: Scary Smart pp. 119–236 — second half. Target: complete by May 17.', completed: false },
      { id: 'w9t6', label: 'Weekend: Prompt Testing / Cross-Model Eval (rotation 2). Same question about fine-tuning vs. in-context learning trade-offs across Claude, Gemini, DeepSeek. Fill the five-row template. Note which model produced an angle usable in a customer conversation.', completed: false },
      { id: 'w9t7', label: 'ZTM Slow-Burn week 2 logged — 5 × 30 min. Confirm sessions in Keep.', completed: false },
    ],
  },

  {
    week: 10,
    phase: 2,
    title: 'Scary Smart Synthesis + Publish Hey Rebel Piece 1',
    dateRange: 'May 18 – May 24',
    tasks: [
      { id: 'w10t1', label: 'Tuesday block: Scary Smart synthesis note with Claude in Docs — key arguments, where you agree and disagree with Gawdat, connection to Airtable\'s AI-first product bets.', completed: false },
      { id: 'w10t2', label: 'Thursday block: Hey Rebel — Draft and Edit pattern. Human outline first. Claude for developmental edit (pressure-test the structural argument, not just tighten prose). Gemini for line edits. Research Ceiling protocol in effect from session open.', completed: false },
      { id: 'w10t3', label: 'Hey Rebel Voice Calibration prompt loaded before every edit session — the voice prompt built in Week 8 is now standing protocol.', completed: false },
      { id: 'w10t4', label: 'Publish the fine-tuning Hey Rebel piece by May 24. Collaboration Log excerpt appended to published version.', completed: false },
      { id: 'w10t5', label: 'Weekend: PLA Lab Session (rotation 3). Source Ingestion pattern. Seed a unit-specific NotebookLM with student-appropriate sources. Generate one inquiry trail.', completed: false },
      { id: 'w10t6', label: 'Phase 2 Checkpoint — can you articulate when fine-tuning beats prompting, and when it doesn\'t? Is the Hey Rebel piece published? Are there ≥2 Playbook entries from Phase 2? Is ZTM log current at ~7–8hrs cumulative?', completed: false },
      { id: 'w10t7', label: 'ZTM Slow-Burn week 3 logged — 5 × 30 min. Confirm sessions in Keep.', completed: false },
    ],
  },

  // ─── PHASE 3 / AGENTIC SYSTEMS / WEEKS 11–14 ───────────────────────────────

  {
    week: 11,
    phase: 3,
    title: 'AI Agents Bootcamp Begins + Agentic NotebookLM',
    dateRange: 'May 25 – May 31',
    tasks: [
      { id: 'w11t1', label: 'Tuesday block: AI Agents Bootcamp — begin. Agent fundamentals, CrewAI intro. 6hr 54min total; distributes across ~4 lunch sessions + this Tuesday block. Do not compress.', completed: false },
      { id: 'w11t2', label: 'Tuesday block: Seed Agentic NotebookLM — Co-Intelligence + Mollick talks + Anthropic agent material + MCP spec. Queryable immediately.', completed: false },
      { id: 'w11t3', label: 'Thursday block: Hey Rebel — Topic Brainstorm pattern. Gemini for 20 angles on how multi-agent systems change support work at scale. Claude prioritises 3 and pressure-tests each. Log what got cut and why.', completed: false },
      { id: 'w11t4', label: 'Weekend: Hey Rebel Pattern Execution (rotation 4). Develop the winning angle further. Begin outlining the Phase 3 capstone piece.', completed: false },
      { id: 'w11t5', label: 'Reading: Co-Intelligence Part 1 — Mollick\'s four rules for working with AI.', completed: false },
      { id: 'w11t6', label: 'Live Support Playbook: capture any agent architecture concepts that reframe how you explain Airtable automation. Written at point of insight.', completed: false },
      { id: 'w11t7', label: 'ZTM Slow-Burn week 4 logged — 5 × 30 min. Confirm sessions in Keep.', completed: false },
    ],
  },

  {
    week: 12,
    phase: 3,
    title: 'LangGraph + Hyperagent Connection',
    dateRange: 'Jun 1 – Jun 7',
    tasks: [
      { id: 'w12t1', label: 'Continue AI Agents Bootcamp at lunch. LangGraph for stateful workflows, multi-agent orchestration. 30 min/day.', completed: false },
      { id: 'w12t2', label: 'Tuesday block: Claude synthesis — how does LangGraph\'s stateful workflow design compare to Airtable\'s automation architecture? What does that mean for Hyperagent? Draft the answer as if explaining to a customer who just opened a ticket.', completed: false },
      { id: 'w12t3', label: 'Thursday block: PLA Lab — Voice and Values Check pattern. Take any AI-generated educational content from the past two weeks and run it through the pedagogy mirror. Log what the check caught and what changed.', completed: false },
      { id: 'w12t4', label: 'Weekend: Prompt Testing — Header Image pattern for the Phase 3 capstone piece (rotation 5). Gemini/Imagen. Three iterations minimum. Document prompt diffs. The log entry is the deliverable, not the image.', completed: false },
      { id: 'w12t5', label: 'Reading: Co-Intelligence Part 2 — practical collaboration patterns.', completed: false },
      { id: 'w12t6', label: 'Live Support Playbook: 1–2 entries connecting LangGraph concepts to Airtable orchestration. Written at point of insight.', completed: false },
      { id: 'w12t7', label: 'ZTM Slow-Burn week 5 logged — 5 × 30 min. Confirm sessions in Keep.', completed: false },
    ],
  },

  {
    week: 13,
    phase: 3,
    title: 'AI Agents Bootcamp Complete + MCP Entry + Capstone Draft',
    dateRange: 'Jun 8 – Jun 14',
    tasks: [
      { id: 'w13t1', label: 'AI Agents Bootcamp — complete this week. MCP integration, deploying multi-agent systems, second agent project. Course done.', completed: false },
      { id: 'w13t2', label: 'Tuesday block: Co-Intelligence synthesis note with Claude in Docs — key arguments, practical patterns already in use, connection to Airtable\'s AI-first direction.', completed: false },
      { id: 'w13t3', label: 'Thursday block: Hey Rebel — Draft and Edit pattern on the Phase 3 capstone piece. Human outline first. Claude for developmental edit. Gemini for line edits. Log what Claude saw, what Gemini tightened, what you decided that neither model could.', completed: false },
      { id: 'w13t4', label: 'Weekend: PLA Lab Session (rotation 6). Lesson Design pattern on a real upcoming unit.', completed: false },
      { id: 'w13t5', label: 'Cross-Model Eval: MCP reasoning question — how does each model explain the protocol to a customer? Score against five-row template. The Airtable Applicability row is the one that matters.', completed: false },
      { id: 'w13t6', label: 'Live Support Playbook — MCP entry: what MCP solves for Airtable Hyperagent customers, written as a customer-facing explanation. Cite the spec. Cite a real case.', completed: false },
      { id: 'w13t7', label: 'ZTM Slow-Burn week 6 logged — 5 × 30 min. Cumulative should be approximately 25hrs.', completed: false },
    ],
  },

  {
    week: 14,
    phase: 3,
    title: 'Capstone — Exhibit A + Exhibit B + Graduation',
    dateRange: 'Jun 15 – Jun 21',
    tasks: [
      { id: 'w14t1', label: 'ZTM Bootcamp final sessions — approximately 3h 52min remaining after Week 13. Three to four lunch sessions closes it by Jun 17–19. When the final section ends: log date and cumulative hours in Keep. Write one sentence about what the Slow-Burn experiment taught you about pace. This sentence goes in Exhibit A.', completed: false },
      { id: 'w14t2', label: 'Tuesday block: Exhibit A — Personal Operating Manual. Draft with Claude in Docs. Sections: full tool stack + division of labor, stage-by-stage prompting workflow, Playbook synthesis (patterns observed, what changed in how you explain Airtable AI features), PLA Lab synthesis, Slow-Burn retrospective.', completed: false },
      { id: 'w14t3', label: 'Thursday block: Exhibit B — extract from Exhibit A the most publishable claim. Draft the Hey Rebel capstone piece as a distilled, voiced version of that argument — not a summary, but the insight most worth saying to a Hey Rebel reader. Curate the Collaboration Log excerpt for appending. Publish.', completed: false },
      { id: 'w14t4', label: 'Weekend: Social Post pattern (rotation 7). LinkedIn, X, Threads variants of the published capstone piece. Log where voice drifted per platform.', completed: false },
      { id: 'w14t5', label: 'Phase 3 Checkpoint — Exhibit A drafted and in Docs. Exhibit B published with Collaboration Log appended. Playbook has ≥6 entries across all three phases. Collab Log has ≥5 entries spanning all three domains. Cross-Model Eval run ≥2 times. ZTM complete or within 2 sessions.', completed: false },
      { id: 'w14t6', label: 'GRADUATED — June 21, 2026. Capstone delivered: Exhibit A (Personal Operating Manual) + Exhibit B (Published Hey Rebel piece).', completed: false },
    ],
  },
];
