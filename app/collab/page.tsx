'use client';
import { useEffect, useState } from 'react';
import Card from '../components/Card';
import Tag from '../components/Tag';
import { getCollab, addCollab } from '../../lib/storage';
import type { CollabEntry, Domain } from '../../lib/types';

const DOMAINS: Domain[] = ['Airtable', 'Hey Rebel', 'PLA'];
const DOMAIN_COLORS: Record<Domain, string> = {
  Airtable: '#00d4aa',
  'Hey Rebel': '#9b59b6',
  PLA: '#e91e8c',
};

function newEntry(): Omit<CollabEntry, 'id' | 'timestamp'> {
  return {
    domain: 'Airtable',
    pattern_used: '',
    tools_deployed: '',
    what_claude_did_well: '',
    what_gemini_did_well: '',
    what_i_did: '',
    insight: '',
  };
}

function genId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export default function CollabPage() {
  const [entries, setEntries] = useState<CollabEntry[]>([]);
  const [form, setForm] = useState(newEntry());
  const [filter, setFilter] = useState<Domain | 'all'>('all');
  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    (async () => {
      const all = await getCollab();
      setEntries([...all].reverse());
      setMounted(true);
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const entry: CollabEntry = { ...form, id: genId(), timestamp: Date.now() };
    await addCollab(entry);
    const all = await getCollab();
    setEntries([...all].reverse());
    setForm(newEntry());
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
  };

  const filtered = filter === 'all' ? entries : entries.filter(e => e.domain === filter);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: 24, alignItems: 'start' }}>
      {/* Form */}
      <div className="space-y-4" style={{ position: 'sticky', top: 80 }}>
        <div>
          <div style={{ fontFamily: 'monospace', fontSize: 10, color: '#6b7280', letterSpacing: 2, marginBottom: 6 }}>
            COLLABORATION LOG
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#f9fafb', margin: 0 }}>New Entry</h1>
        </div>

        <Card accent="#00d4aa">
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Domain */}
            <div>
              <label style={{ fontFamily: 'monospace', fontSize: 10, color: '#6b7280', letterSpacing: 1.5, display: 'block', marginBottom: 6 }}>
                DOMAIN
              </label>
              <div style={{ display: 'flex', gap: 6 }}>
                {DOMAINS.map(d => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setForm(f => ({ ...f, domain: d }))}
                    style={{
                      flex: 1,
                      padding: '6px 4px',
                      borderRadius: 6,
                      border: `1px solid ${form.domain === d ? DOMAIN_COLORS[d] : '#374151'}`,
                      background: form.domain === d ? `${DOMAIN_COLORS[d]}22` : '#0d1321',
                      color: form.domain === d ? DOMAIN_COLORS[d] : '#6b7280',
                      fontFamily: 'monospace',
                      fontSize: 10,
                      letterSpacing: 1,
                      cursor: 'pointer',
                      fontWeight: form.domain === d ? 700 : 400,
                    }}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {[
              { key: 'pattern_used', label: 'PATTERN USED' },
              { key: 'tools_deployed', label: 'TOOLS DEPLOYED' },
              { key: 'what_claude_did_well', label: 'WHAT CLAUDE DID WELL' },
              { key: 'what_gemini_did_well', label: 'WHAT GEMINI DID WELL' },
              { key: 'what_i_did', label: 'WHAT I DID THAT NEITHER MODEL COULD' },
              { key: 'insight', label: 'INSIGHT WORTH KEEPING' },
            ].map(field => (
              <div key={field.key}>
                <label style={{ fontFamily: 'monospace', fontSize: 10, color: '#6b7280', letterSpacing: 1.5, display: 'block', marginBottom: 6 }}>
                  {field.label}
                </label>
                <textarea
                  value={form[field.key as keyof typeof form] as string}
                  onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                  rows={2}
                  style={{
                    width: '100%',
                    background: '#0d1321',
                    border: '1px solid #1f2937',
                    borderRadius: 6,
                    color: '#e5e7eb',
                    padding: '8px 10px',
                    fontSize: 13,
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    outline: 'none',
                  }}
                  onFocus={e => { e.target.style.borderColor = '#00d4aa44'; }}
                  onBlur={e => { e.target.style.borderColor = '#1f2937'; }}
                />
              </div>
            ))}

            <button
              type="submit"
              style={{
                padding: '10px',
                borderRadius: 8,
                background: submitted ? '#374151' : '#00d4aa',
                color: submitted ? '#9ca3af' : '#0a0e1a',
                fontFamily: 'monospace',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 1.5,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {submitted ? '✓ SAVED' : 'SAVE ENTRY →'}
            </button>
          </form>
        </Card>
      </div>

      {/* Log */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ fontFamily: 'monospace', fontSize: 11, color: '#6b7280', letterSpacing: 2 }}>
            {mounted ? entries.length : 0} ENTRIES
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {(['all', ...DOMAINS] as const).map(d => {
              const isActive = filter === d;
              const color = d === 'all' ? '#6b7280' : DOMAIN_COLORS[d as Domain];
              return (
                <button
                  key={d}
                  onClick={() => setFilter(d as Domain | 'all')}
                  style={{
                    fontFamily: 'monospace',
                    fontSize: 10,
                    letterSpacing: 1,
                    padding: '3px 10px',
                    borderRadius: 5,
                    border: `1px solid ${isActive ? color : '#374151'}`,
                    background: isActive ? `${color}22` : 'transparent',
                    color: isActive ? color : '#6b7280',
                    cursor: 'pointer',
                  }}
                >
                  {d === 'all' ? 'ALL' : d.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>

        {!mounted ? null : filtered.length === 0 ? (
          <Card>
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#4b5563' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📋</div>
              <div style={{ fontFamily: 'monospace', fontSize: 12, letterSpacing: 1 }}>NO ENTRIES YET</div>
            </div>
          </Card>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filtered.map(entry => {
              const color = DOMAIN_COLORS[entry.domain];
              return (
                <Card key={entry.id} accent={`${color}44`}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <Tag label={entry.domain} color={color} />
                    <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#4b5563', letterSpacing: 1 }}>
                      {new Date(entry.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    {[
                      { label: 'PATTERN USED', value: entry.pattern_used },
                      { label: 'TOOLS DEPLOYED', value: entry.tools_deployed },
                      { label: 'CLAUDE DID WELL', value: entry.what_claude_did_well },
                      { label: 'GEMINI DID WELL', value: entry.what_gemini_did_well },
                    ].map(f => f.value ? (
                      <div key={f.label}>
                        <div style={{ fontFamily: 'monospace', fontSize: 9, color: '#4b5563', letterSpacing: 1.5, marginBottom: 3 }}>{f.label}</div>
                        <div style={{ fontSize: 12, color: '#d1d5db' }}>{f.value}</div>
                      </div>
                    ) : null)}
                  </div>

                  {entry.what_i_did && (
                    <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid #1f2937' }}>
                      <div style={{ fontFamily: 'monospace', fontSize: 9, color: '#4b5563', letterSpacing: 1.5, marginBottom: 3 }}>WHAT I DID THAT NEITHER MODEL COULD</div>
                      <div style={{ fontSize: 12, color: '#d1d5db' }}>{entry.what_i_did}</div>
                    </div>
                  )}

                  {entry.insight && (
                    <div style={{ marginTop: 10, padding: '8px 10px', background: `${color}11`, borderRadius: 6, borderLeft: `3px solid ${color}` }}>
                      <div style={{ fontFamily: 'monospace', fontSize: 9, color: color, letterSpacing: 1.5, marginBottom: 3 }}>INSIGHT</div>
                      <div style={{ fontSize: 12, color: '#d1d5db' }}>{entry.insight}</div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
