// Day-by-day schedule from spec Section 8
export const DAILY_TASKS: Record<number, string[]> = {
  0: [ // Sunday — deep work day
    'Weekend deep work block, 1h 40min (rotation: Hey Rebel → PLA Lab → Prompt Testing)',
    'Assign Tuesday and Thursday tasks for the coming week — open both days with zero planning',
    'Optional reading session',
  ],
  1: [ // Monday — workout day
    'ZTM Slow-Burn, 30 min lunch break — log section + time in Keep immediately after',
    'Post-workout: reading only, 20–30 min — one task, do not add to it',
  ],
  2: [ // Tuesday — non-workout, Phase Work Day 1
    'ZTM Slow-Burn, 30 min lunch break — log section + time in Keep immediately after',
    'Phase work block, 4:30–6:00pm (90 min) — pre-assigned analytical task',
    'Pre-NBA: reading only, 20–30 min',
  ],
  3: [ // Wednesday — workout day
    'ZTM Slow-Burn, 30 min lunch break — log section + time in Keep immediately after',
    'Post-workout: reading only, 20–30 min',
    'Assign Thursday task — open Thursday with zero planning overhead',
  ],
  4: [ // Thursday — non-workout, Phase Work Day 2
    'ZTM Slow-Burn, 30 min lunch break — log section + time in Keep immediately after',
    'Hey Rebel or PLA block, 4:30–6:00pm (90 min) — alternates on fixed weekly rotation',
    'Pre-NBA: reading only, 20–30 min',
  ],
  5: [ // Friday — workout day
    'ZTM Slow-Burn, 30 min lunch break — log section + time in Keep immediately after',
    'Post-workout: reading only, 20–30 min',
  ],
  6: [ // Saturday — rest
    'Rest or optional light reading',
    "Check in on week's ZTM log — ensure 5 sessions logged",
  ],
};

export const CURRENT_BOOK = {
  title: 'Scary Smart',
  author: 'Mo Gawdat',
  currentPage: 63,
  totalPages: 321,
};

export interface Phase {
  number: 1 | 2 | 3;
  name: string;
  color: string;
  weeks: string;
}

// Phase 1: Weeks 1–7 (Foundations)   Mar 16 – May 3
// Phase 2: Weeks 8–10 (Customisation) May 4 – May 24
// Phase 3: Weeks 11–14 (Agentic Systems) May 25 – Jun 21
export const PHASES: Phase[] = [
  { number: 1, name: 'Foundations', color: '#00d4aa', weeks: 'Weeks 1–7' },
  { number: 2, name: 'Customisation', color: '#9b59b6', weeks: 'Weeks 8–10' },
  { number: 3, name: 'Agentic Systems', color: '#e91e8c', weeks: 'Weeks 11–14' },
];

export function getCurrentWeekInfo(): { week: number; phase: 1 | 2 | 3; phaseName: string; color: string; dateRange: string } {
  // Week 1 started Monday, March 16, 2026 — use local time to avoid UTC midnight shift
  const START = new Date(2026, 2, 16); // month is 0-indexed
  const now = new Date();
  const diffMs = now.getTime() - START.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const week = Math.max(1, Math.min(14, Math.floor(diffDays / 7) + 1));

  const phase: 1 | 2 | 3 = week <= 7 ? 1 : week <= 10 ? 2 : 3;
  const phaseInfo = PHASES[phase - 1];

  const weekStart = new Date(START);
  weekStart.setDate(START.getDate() + (week - 1) * 7);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  const fmt = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const dateRange = `${fmt(weekStart)} – ${fmt(weekEnd)}`;

  return { week, phase, phaseName: phaseInfo.name, color: phaseInfo.color, dateRange };
}
