'use client';
import { useEffect, useState } from 'react';
import Card from '../components/Card';
import Tag from '../components/Tag';
import { getZTM, addZTM, ZTM_TARGET_MINUTES } from '../../lib/storage';
import type { ZTMSession } from '../../lib/types';

function genId() { return Math.random().toString(36).slice(2) + Date.now().toString(36); }

function fmtHours(mins: number) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export default function ZTMPage() {
  const [sessions, setSessions] = useState<ZTMSession[]>([]);
  const [section, setSection] = useState('');
  const [minutes, setMinutes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setSessions(getZTM().reverse());
    setMounted(true);
  }, []);

  const weeklyMins = (() => {
    if (!mounted) return 0;
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());
    weekStart.setHours(0, 0, 0, 0);
    return sessions.filter(s => s.timestamp >= weekStart.getTime()).reduce((sum, s) => sum + s.minutes, 0);
  })();

  const totalMins = sessions.reduce((sum, s) => sum + s.minutes, 0);
  const pct = Math.min(100, Math.round((totalMins / ZTM_TARGET_MINUTES) * 100));
  const remaining = Math.max(0, ZTM_TARGET_MINUTES - totalMins);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const m = parseInt(minutes, 10);
    if (!section.trim() || isNaN(m) || m <= 0) return;
    const session: ZTMSession = { id: genId(), timestamp: Date.now(), section: section.trim(), minutes: m };
    addZTM(session);
    setSessions(getZTM().reverse());
    setSection('');
    setMinutes('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <div style={{ fontFamily: 'monospace', fontSize: 10, color: '#6b7280', letterSpacing: 2, marginBottom: 6 }}>
          ZTM TRACKER
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#f9fafb', margin: 0 }}>Zero to Mastery Slow-Burn</h1>
        <p style={{ color: '#6b7280', fontSize: 13, marginTop: 4 }}>Target: 28h 52m of focused course time</p>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12 }}>
        {[
          { label: 'THIS WEEK', value: mounted ? fmtHours(weeklyMins) : '—', color: '#9b59b6' },
          { label: 'TOTAL', value: mounted ? fmtHours(totalMins) : '—', color: '#9b59b6' },
          { label: 'REMAINING', value: mounted ? fmtHours(remaining) : '—', color: '#6b7280' },
          { label: 'SESSIONS', value: mounted ? String(sessions.length) : '—', color: '#9b59b6' },
        ].map(s => (
          <Card key={s.label} accent="#9b59b633">
            <div style={{ fontFamily: 'monospace', fontSize: 9, color: '#6b7280', letterSpacing: 1.5, marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: s.color, fontFamily: 'monospace' }}>{s.value}</div>
          </Card>
        ))}
      </div>

      {/* Progress bar */}
      <Card accent="#9b59b6">
        <div style={{ fontFamily: 'monospace', fontSize: 10, color: '#9b59b6', letterSpacing: 2, marginBottom: 12 }}>
          COURSE COMPLETION
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#9b7db5', marginBottom: 8 }}>
          <span>{mounted ? fmtHours(totalMins) : '—'} completed</span>
          <span>{fmtHours(ZTM_TARGET_MINUTES)} target</span>
        </div>
        <div style={{ background: '#1f2937', borderRadius: 8, height: 16, overflow: 'hidden', position: 'relative' }}>
          <div style={{
            height: '100%',
            width: `${mounted ? pct : 0}%`,
            background: 'linear-gradient(90deg, #9b59b6, #c084fc)',
            borderRadius: 8,
            transition: 'width 0.5s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingRight: 8,
          }}>
            {(mounted ? pct : 0) > 10 && (
              <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#fff', fontWeight: 700 }}>
                {pct}%
              </span>
            )}
          </div>
        </div>
        <div style={{ fontFamily: 'monospace', fontSize: 10, color: '#6b7280', marginTop: 8 }}>
          {mounted && remaining > 0 ? `${fmtHours(remaining)} remaining to reach target` : mounted ? '🎉 TARGET REACHED!' : ''}
        </div>
      </Card>

      {/* Log form + Session list */}
      <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 20, alignItems: 'start' }}>
        {/* Form */}
        <div style={{ position: 'sticky', top: 80 }}>
        <Card accent="#9b59b6">
          <div style={{ fontFamily: 'monospace', fontSize: 10, color: '#9b59b6', letterSpacing: 2, marginBottom: 14 }}>
            LOG SESSION
          </div>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <label style={{ fontFamily: 'monospace', fontSize: 10, color: '#6b7280', letterSpacing: 1.5, display: 'block', marginBottom: 6 }}>
                SECTION TITLE
              </label>
              <input
                value={section}
                onChange={e => setSection(e.target.value)}
                placeholder="e.g. Section 3: Machine Learning Basics"
                style={{
                  width: '100%',
                  background: '#0d1321',
                  border: '1px solid #1f2937',
                  borderRadius: 6,
                  color: '#e5e7eb',
                  padding: '8px 10px',
                  fontSize: 13,
                  fontFamily: 'inherit',
                  outline: 'none',
                }}
                onFocus={e => { e.target.style.borderColor = '#9b59b644'; }}
                onBlur={e => { e.target.style.borderColor = '#1f2937'; }}
              />
            </div>
            <div>
              <label style={{ fontFamily: 'monospace', fontSize: 10, color: '#6b7280', letterSpacing: 1.5, display: 'block', marginBottom: 6 }}>
                DURATION (MINUTES)
              </label>
              <input
                type="number"
                value={minutes}
                onChange={e => setMinutes(e.target.value)}
                placeholder="30"
                min={1}
                max={480}
                style={{
                  width: '100%',
                  background: '#0d1321',
                  border: '1px solid #1f2937',
                  borderRadius: 6,
                  color: '#e5e7eb',
                  padding: '8px 10px',
                  fontSize: 13,
                  fontFamily: 'monospace',
                  outline: 'none',
                }}
                onFocus={e => { e.target.style.borderColor = '#9b59b644'; }}
                onBlur={e => { e.target.style.borderColor = '#1f2937'; }}
              />
            </div>
            <button
              type="submit"
              style={{
                padding: '10px',
                borderRadius: 8,
                background: submitted ? '#374151' : '#9b59b6',
                color: submitted ? '#9ca3af' : '#fff',
                fontFamily: 'monospace',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 1.5,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {submitted ? '✓ LOGGED' : 'LOG SESSION →'}
            </button>
          </form>
        </Card>
        </div>

        {/* Sessions list */}
        <div>
          <div style={{ fontFamily: 'monospace', fontSize: 10, color: '#6b7280', letterSpacing: 2, marginBottom: 12 }}>
            SESSION HISTORY ({mounted ? sessions.length : 0})
          </div>
          {!mounted ? null : sessions.length === 0 ? (
            <Card>
              <div style={{ textAlign: 'center', padding: '40px 0', color: '#4b5563' }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>⏱</div>
                <div style={{ fontFamily: 'monospace', fontSize: 12, letterSpacing: 1 }}>NO SESSIONS LOGGED</div>
              </div>
            </Card>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {sessions.map((s, i) => (
                <div
                  key={s.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: 8,
                    background: '#111827',
                    border: '1px solid #1f2937',
                    gap: 12,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
                    <div style={{ fontFamily: 'monospace', fontSize: 10, color: '#4b5563', minWidth: 24, textAlign: 'right' }}>
                      #{sessions.length - i}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, color: '#d1d5db', fontWeight: 500 }}>{s.section}</div>
                      <div style={{ fontFamily: 'monospace', fontSize: 10, color: '#4b5563', marginTop: 2 }}>
                        {new Date(s.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                  </div>
                  <Tag label={fmtHours(s.minutes)} color="#9b59b6" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
