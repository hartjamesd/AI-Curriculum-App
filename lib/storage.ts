import type { CollabEntry, ZTMSession, PlaybookEntry } from './types';

const KEYS = {
  collab: 'cv2_collab',
  ztm: 'cv2_ztm',
  playbook: 'cv2_playbook',
  curriculum: 'cv2_curriculum',
  daily_tasks: 'cv2_daily_tasks',
  book_page: 'cv2_book_page',
};

async function get<T>(key: string): Promise<T | null> {
  const res = await fetch(`/api/kv?key=${encodeURIComponent(key)}`);
  if (!res.ok) return null;
  return res.json();
}

async function set<T>(key: string, value: T): Promise<void> {
  await fetch('/api/kv', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key, value }),
  });
}

// Collab
export const getCollab = async (): Promise<CollabEntry[]> =>
  (await get<CollabEntry[]>(KEYS.collab)) ?? [];
export const saveCollab = async (entries: CollabEntry[]) => set(KEYS.collab, entries);
export const addCollab = async (entry: CollabEntry) =>
  saveCollab([...(await getCollab()), entry]);

// ZTM
export const getZTM = async (): Promise<ZTMSession[]> =>
  (await get<ZTMSession[]>(KEYS.ztm)) ?? [];
export const saveZTM = async (sessions: ZTMSession[]) => set(KEYS.ztm, sessions);
export const addZTM = async (session: ZTMSession) =>
  saveZTM([...(await getZTM()), session]);

// Playbook
export const getPlaybook = async (): Promise<PlaybookEntry[]> =>
  (await get<PlaybookEntry[]>(KEYS.playbook)) ?? [];
export const savePlaybook = async (entries: PlaybookEntry[]) => set(KEYS.playbook, entries);
export const addPlaybook = async (entry: PlaybookEntry) =>
  savePlaybook([...(await getPlaybook()), entry]);

// Curriculum task completion
export const getCurriculumCompleted = async (): Promise<Record<string, boolean>> =>
  (await get<Record<string, boolean>>(KEYS.curriculum)) ?? {};
export const toggleCurriculumTask = async (taskId: string) => {
  const state = await getCurriculumCompleted();
  state[taskId] = !state[taskId];
  await set(KEYS.curriculum, state);
  return state;
};

// Daily tasks — auto-resets each calendar day
export const getDailyTasks = async (taskCount: number): Promise<boolean[]> => {
  const today = new Date().toISOString().slice(0, 10);
  const stored = await get<{ date: string; completed: boolean[] }>(KEYS.daily_tasks);
  if (stored?.date === today && stored.completed.length === taskCount) {
    return stored.completed;
  }
  return Array<boolean>(taskCount).fill(false);
};
export const saveDailyTasks = async (completed: boolean[]) => {
  const today = new Date().toISOString().slice(0, 10);
  await set(KEYS.daily_tasks, { date: today, completed });
};

// Book page
export const getBookPage = async (defaultPage: number): Promise<number> =>
  (await get<number>(KEYS.book_page)) ?? defaultPage;
export const saveBookPage = async (page: number) => set(KEYS.book_page, page);

// ZTM helpers — pure computation, take sessions as arg to avoid double-fetching
export const ZTM_TARGET_MINUTES = 28 * 60 + 52;

export const getZTMWeeklyMinutes = (sessions: ZTMSession[]): number => {
  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay());
  weekStart.setHours(0, 0, 0, 0);
  return sessions
    .filter(s => s.timestamp >= weekStart.getTime())
    .reduce((sum, s) => sum + s.minutes, 0);
};

export const getZTMTotalMinutes = (sessions: ZTMSession[]): number =>
  sessions.reduce((sum, s) => sum + s.minutes, 0);
