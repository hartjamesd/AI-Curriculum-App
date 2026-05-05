'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Card from './components/Card';
import Tag from './components/Tag';
import { getCurrentWeekInfo, DAILY_TASKS, CURRENT_BOOK } from '../lib/schedule';
import {
  getZTMWeeklyMinutes,
  getZTMTotalMinutes,
  getCollab,
  getZTM,
  ZTM_TARGET_MINUTES,
} from '../lib/storage';

function fmtHours(mins: number) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [weeklyMins, setWeeklyMins] = useState(0);
  const [totalMins, setTotalMins] = useState(0);
  const [collabCount, setCollabCount] = useState(0);
  const [ztmSessionCount, setZtmSessionCount] = useState(0);

  useEffect(() => {
    setMounted(true);
    setWeeklyMins(getZTMWeeklyMinutes());
    setTotalMins(getZTMTotalMinutes());
    setCollabCount(getCollab().length);
    setZtmSessionCount(getZTM().length);
  }, []);

  const weekInfo = getCurrentWeekInfo();
  const today = new Date().getDay();
  const todayTasks = DAILY_TASKS[today] || [];
  const ztmPct = Math.min(100, Math.round((totalMins / ZTM_TARGET_MINUTES) * 100));
  const bookPct = Math.round((CURRENT_BOOK.currentPage / CURRENT_BOOK.totalPages) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span style={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: 2, color: weekInfo.color, textTransform: 'uppercase' }}>
              PHASE {weekInfo.phase} — {weekInfo.phaseName}
            </span>
            <Tag label={`WEEK ${weekInfo.week}`} color={weekInfo.color} />
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#f9fafb', margin: 0 }}>
            AI Curriculum Tracker
          </h1>
          <p style={{ color: '#6b7280', fontSize: 13, marginTop: 4 }}>{weekInfo.dateRange}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'monospace', fontSize: 11, color: '#6b7280', letterSpacing: 1 }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </div>

      {/* Top row: 3 cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
        {/* Today's Tasks */}
        <Card accent={weekInfo.color}>
          <div style={{ fontFamily: 'monospace', fontSize: 10, color: weekInfo.color, letterSpacing: 2, marginBottom: 12 }}>
            TODAY'S TASKS
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {todayTasks.map((task, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: '#d1d5db' }}>
                <span style={{ color: weekInfo.color, marginTop: 1, flexShrink: 0 }}>▸</span>
                {task}
              </li>
            ))}
          </ul>
        </Card>

        {/* ZTM Progress */}
        <Card accent="#9b59b6">
          <div style={{ fontFamily: 'monospace', fontSize: 10, color: '#9b59b6', letterSpacing: 2, marginBottom: 12 }}>
            ZTM SLOW-BURN
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
              <span style={{ color: '#9b7db5' }}>This week</span>
              <span style={{ color: '#e5e7eb', fontFamily: 'monospace' }}>
                {mounted ? fmtHours(weeklyMins) : '—'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
              <span style={{ color: '#9b7db5' }}>Cumulative</span>
              <span style={{ color: '#e5e7eb', fontFamily: 'monospace' }}>
                {mounted ? fmtHours(totalMins) : '—'} / {fmtHours(ZTM_TARGET_MINUTES)}
              </span>
            </div>
            <div style={{ background: '#1f2937', borderRadius: 4, height: 6, overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${mounted ? ztmPct : 0}%`,
                background: 'linear-gradient(90deg, #9b59b6, #c084fc)',
                borderRadius: 4,
                transition: 'width 0.5s ease',
              }} />
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: 10, color: '#6b7280', textAlign: 'right' }}>
              {mounted ? ztmPct : 0}% COMPLETE
            </div>
          </div>
        </Card>

        {/* Current Book */}
        <Card accent="#e91e8c">
          <div style={{ fontFamily: 'monospace', fontSize: 10, color: '#e91e8c', letterSpacing: 2, marginBottom: 12 }}>
            CURRENT READING
          </div>
          <div style={{ fontSize: 14, color: '#f9fafb', fontWeight: 600, marginBottom: 4 }}>
            {CURRENT_BOOK.title}
          </div>
          <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 14 }}>{CURRENT_BOOK.author}</div>
          <div style={{ background: '#1f2937', borderRadius: 4, height: 6, overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${bookPct}%`,
              background: 'linear-gradient(90deg, #e91e8c, #f472b6)',
              borderRadius: 4,
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
            <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#6b7280' }}>p.{CURRENT_BOOK.currentPage}</span>
            <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#6b7280' }}>p.{CURRENT_BOOK.totalPages} ({bookPct}%)</span>
          </div>
        </Card>
      </div>

      {/* Stats + Navigation */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Stats */}
        <Card>
          <div style={{ fontFamily: 'monospace', fontSize: 10, color: '#6b7280', letterSpacing: 2, marginBottom: 14 }}>
            QUICK STATS
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { label: 'COLLAB ENTRIES', value: mounted ? collabCount : '—', color: '#00d4aa' },
              { label: 'ZTM SESSIONS', value: mounted ? ztmSessionCount : '—', color: '#9b59b6' },
              { label: 'CURRENT WEEK', value: `W${weekInfo.week}`, color: weekInfo.color },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: 'monospace', fontSize: 9, color: '#6b7280', letterSpacing: 1.5, marginBottom: 4 }}>
                  {s.label}
                </div>
                <div style={{ fontSize: 26, fontWeight: 700, color: s.color, fontFamily: 'monospace' }}>
                  {String(s.value)}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Navigation */}
        <Card>
          <div style={{ fontFamily: 'monospace', fontSize: 10, color: '#6b7280', letterSpacing: 2, marginBottom: 14 }}>
            NAVIGATE
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[
              { href: '/curriculum', label: 'Full Curriculum', color: '#00d4aa', desc: 'Week-by-week tasks' },
              { href: '/collab', label: 'Collab Log', color: '#00d4aa', desc: 'Log AI collaboration' },
              { href: '/ztm', label: 'ZTM Tracker', color: '#9b59b6', desc: 'Course progress' },
            ].map(n => (
              <Link
                key={n.href}
                href={n.href}
                style={{
                  display: 'block',
                  padding: '10px 12px',
                  borderRadius: 8,
                  background: '#0d1321',
                  border: `1px solid ${n.color}33`,
                  textDecoration: 'none',
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 600, color: n.color }}>{n.label}</div>
                <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>{n.desc}</div>
              </Link>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Log CTA */}
      <Card accent="#00d4aa">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <div>
            <div style={{ fontFamily: 'monospace', fontSize: 10, color: '#00d4aa', letterSpacing: 2, marginBottom: 6 }}>
              QUICK LOG
            </div>
            <div style={{ fontSize: 14, color: '#d1d5db' }}>
              Had a great AI collaboration moment? Log it before you forget.
            </div>
          </div>
          <Link
            href="/collab"
            style={{
              padding: '10px 24px',
              borderRadius: 8,
              background: '#00d4aa',
              color: '#0a0e1a',
              fontFamily: 'monospace',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 1,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            LOG ENTRY →
          </Link>
        </div>
      </Card>
    </div>
  );
}
