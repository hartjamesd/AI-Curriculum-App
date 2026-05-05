'use client';
import type { CollabEntry, ZTMSession, PlaybookEntry } from './types';

const KEYS = {
  collab: 'cv2_collab',
  ztm: 'cv2_ztm',
  playbook: 'cv2_playbook',
  curriculum: 'cv2_curriculum',
};

function get<T>(key: string): T[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch {
    return [];
  }
}

function set<T>(key: string, data: T[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(data));
}

// Collab
export const getCollab = (): CollabEntry[] => get(KEYS.collab);
export const saveCollab = (entries: CollabEntry[]) => set(KEYS.collab, entries);
export const addCollab = (entry: CollabEntry) => saveCollab([...getCollab(), entry]);

// ZTM
export const getZTM = (): ZTMSession[] => get(KEYS.ztm);
export const saveZTM = (sessions: ZTMSession[]) => set(KEYS.ztm, sessions);
export const addZTM = (session: ZTMSession) => saveZTM([...getZTM(), session]);

// Playbook
export const getPlaybook = (): PlaybookEntry[] => get(KEYS.playbook);
export const savePlaybook = (entries: PlaybookEntry[]) => set(KEYS.playbook, entries);
export const addPlaybook = (entry: PlaybookEntry) => savePlaybook([...getPlaybook(), entry]);

// Curriculum task completion
export const getCurriculumCompleted = (): Record<string, boolean> => {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(KEYS.curriculum) || '{}');
  } catch {
    return {};
  }
};
export const toggleCurriculumTask = (taskId: string) => {
  const state = getCurriculumCompleted();
  state[taskId] = !state[taskId];
  localStorage.setItem(KEYS.curriculum, JSON.stringify(state));
  return state;
};

// ZTM helpers
export const getZTMWeeklyMinutes = (): number => {
  const sessions = getZTM();
  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay());
  weekStart.setHours(0, 0, 0, 0);
  return sessions
    .filter(s => s.timestamp >= weekStart.getTime())
    .reduce((sum, s) => sum + s.minutes, 0);
};
export const getZTMTotalMinutes = (): number =>
  getZTM().reduce((sum, s) => sum + s.minutes, 0);

export const ZTM_TARGET_MINUTES = 28 * 60 + 52; // 1732 minutes
