export type Domain = 'Airtable' | 'Hey Rebel' | 'PLA';

export interface CollabEntry {
  id: string;
  timestamp: number;
  domain: Domain;
  pattern_used: string;
  tools_deployed: string;
  what_claude_did_well: string;
  what_gemini_did_well: string;
  what_i_did: string;
  insight: string;
}

export interface ZTMSession {
  id: string;
  timestamp: number;
  section: string;
  minutes: number;
}

export interface PlaybookEntry {
  id: string;
  timestamp: number;
  misunderstood: string;
  framing: string;
  tool_helped: string;
  notes: string;
}

export interface CurriculumTask {
  id: string;
  label: string;
  completed: boolean;
}

export interface WeekEntry {
  week: number;
  phase: 1 | 2 | 3;
  title: string;
  dateRange: string;
  tasks: CurriculumTask[];
}
