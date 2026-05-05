'use client';
import { useEffect, useState, useCallback } from 'react';
import Card from '../components/Card';
import Tag from '../components/Tag';
import { CURRICULUM } from '../../lib/curriculum-data';
import { getCurriculumCompleted, toggleCurriculumTask } from '../../lib/storage';
import { PHASES } from '../../lib/schedule';
import type { WeekEntry } from '../../lib/types';

const PHASE_COLORS: Record<number, string> = { 1: '#00d4aa', 2: '#9b59b6', 3: '#e91e8c' };

export default function CurriculumPage() {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);
  const [activePhase, setActivePhase] = useState<1 | 2 | 3 | 'all'>('all');

  useEffect(() => {
    setCompleted(getCurriculumCompleted());
    setMounted(true);
  }, []);

  const handleToggle = useCallback((taskId: string) => {
    const next = toggleCurriculumTask(taskId);
    setCompleted({ ...next });
  }, []);

  const weeks: WeekEntry[] = activePhase === 'all'
    ? CURRICULUM
    : CURRICULUM.filter(w => w.phase === activePhase);

  const totalTasks = CURRICULUM.reduce((s, w) => s + w.tasks.length, 0);
  const completedTasks = mounted ? Object.values(completed).filter(Boolean).length : 0;
  const pct = Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div style={{ fontFamily: 'monospace', fontSize: 10, color: '#6b7280', letterSpacing: 2, marginBottom: 8 }}>
          FULL CURRICULUM
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#f9fafb', margin: 0 }}>12-Week AI Mastery</h1>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'monospace', fontSize: 18, fontWeight: 700, color: '#00d4aa' }}>
              {mounted ? completedTasks : 0}/{totalTasks}
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: 10, color: '#6b7280', letterSpacing: 1 }}>TASKS DONE</div>
          </div>
        </div>

        {/* Overall progress */}
        <div style={{ marginTop: 12, background: '#1f2937', borderRadius: 4, height: 6, overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${mounted ? pct : 0}%`,
            background: 'linear-gradient(90deg, #00d4aa, #9b59b6, #e91e8c)',
            borderRadius: 4,
            transition: 'width 0.5s',
          }} />
        </div>
        <div style={{ fontFamily: 'monospace', fontSize: 10, color: '#6b7280', textAlign: 'right', marginTop: 4 }}>
          {mounted ? pct : 0}% COMPLETE
        </div>
      </div>

      {/* Phase filter */}
      <div style={{ display: 'flex', gap: 8 }}>
        {(['all', 1, 2, 3] as const).map(p => {
          const isActive = activePhase === p;
          const color = p === 'all' ? '#6b7280' : PHASE_COLORS[p];
          return (
            <button
              key={p}
              onClick={() => setActivePhase(p)}
              style={{
                fontFamily: 'monospace',
                fontSize: 11,
                letterSpacing: 1.5,
                padding: '4px 14px',
                borderRadius: 6,
                border: `1px solid ${isActive ? color : '#374151'}`,
                background: isActive ? `${color}22` : 'transparent',
                color: isActive ? color : '#6b7280',
                cursor: 'pointer',
                fontWeight: isActive ? 700 : 400,
              }}
            >
              {p === 'all' ? 'ALL PHASES' : `PHASE ${p}`}
            </button>
          );
        })}
      </div>

      {/* Phase sections */}
      {PHASES.filter(ph => activePhase === 'all' || ph.number === activePhase).map(phase => {
        const phaseWeeks = weeks.filter(w => w.phase === phase.number);
        return (
          <div key={phase.number}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div style={{ height: 1, background: `${phase.color}44`, flex: 1 }} />
              <div style={{ fontFamily: 'monospace', fontSize: 11, color: phase.color, letterSpacing: 2, fontWeight: 700 }}>
                PHASE {phase.number} — {phase.name.toUpperCase()}
              </div>
              <Tag label={phase.weeks} color={phase.color} />
              <div style={{ height: 1, background: `${phase.color}44`, flex: 1 }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {phaseWeeks.map(week => {
                const wCompleted = week.tasks.filter(t => completed[t.id]).length;
                const wPct = Math.round((wCompleted / week.tasks.length) * 100);
                return (
                  <Card key={week.week} accent={`${phase.color}44`}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 12 }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                          <Tag label={`WK ${week.week}`} color={phase.color} />
                          <span style={{ fontSize: 15, fontWeight: 600, color: '#f9fafb' }}>{week.title}</span>
                        </div>
                        <div style={{ fontFamily: 'monospace', fontSize: 10, color: '#6b7280', letterSpacing: 1 }}>
                          {week.dateRange}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div style={{ fontFamily: 'monospace', fontSize: 12, color: phase.color, fontWeight: 700 }}>
                          {mounted ? wCompleted : 0}/{week.tasks.length}
                        </div>
                        <div style={{ fontFamily: 'monospace', fontSize: 9, color: '#6b7280' }}>
                          {mounted ? wPct : 0}%
                        </div>
                      </div>
                    </div>

                    {/* Mini progress */}
                    <div style={{ background: '#1f2937', borderRadius: 3, height: 3, overflow: 'hidden', marginBottom: 12 }}>
                      <div style={{
                        height: '100%',
                        width: `${mounted ? wPct : 0}%`,
                        background: phase.color,
                        borderRadius: 3,
                        transition: 'width 0.3s',
                      }} />
                    </div>

                    {/* Tasks */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {week.tasks.map(task => {
                        const done = mounted && !!completed[task.id];
                        return (
                          <label
                            key={task.id}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 10,
                              cursor: 'pointer',
                              padding: '6px 8px',
                              borderRadius: 6,
                              background: done ? `${phase.color}0d` : 'transparent',
                              transition: 'background 0.15s',
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={done}
                              onChange={() => handleToggle(task.id)}
                              style={{ display: 'none' }}
                            />
                            <div style={{
                              width: 16,
                              height: 16,
                              borderRadius: 4,
                              border: `2px solid ${done ? phase.color : '#374151'}`,
                              background: done ? phase.color : 'transparent',
                              flexShrink: 0,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.15s',
                            }}>
                              {done && <span style={{ color: '#0a0e1a', fontSize: 10, fontWeight: 700 }}>✓</span>}
                            </div>
                            <span style={{
                              fontSize: 13,
                              color: done ? '#6b7280' : '#d1d5db',
                              textDecoration: done ? 'line-through' : 'none',
                              textDecorationColor: '#4b5563',
                            }}>
                              {task.label}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
