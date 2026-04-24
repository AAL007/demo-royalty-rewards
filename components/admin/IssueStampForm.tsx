'use client'

import { useState } from 'react'
import { useApp } from '@/context/AppContext'
import { toast } from 'sonner'
import type { Customer } from '@/lib/types'

function CoffeeBean({ filled, size = 28 }: { filled: boolean; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 44" fill="none">
      {filled ? (
        <g transform="rotate(-8, 20, 22)">
          <ellipse cx="20" cy="22" rx="14" ry="18" fill="#F2D648" />
          <path d="M15 7 Q25 22 15 37" stroke="#111111" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        </g>
      ) : (
        <g transform="rotate(-8, 20, 22)">
          <ellipse cx="20" cy="22" rx="14" ry="18" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeDasharray="4 3" />
        </g>
      )}
    </svg>
  )
}

export function IssueStampForm() {
  const { customers, issueStamp } = useApp()
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Customer | null>(null)
  const [success, setSuccess] = useState(false)

  const filtered = query.length > 0
    ? customers.filter(c =>
        c.name.toLowerCase().includes(query.toLowerCase()) || c.phone.includes(query)
      )
    : []

  function handleIssue() {
    if (!selected) return
    issueStamp(selected.id)
    const newStamps = selected.stamps >= 10 ? 1 : selected.stamps + 1
    toast.success(`Stamp issued to ${selected.name}!`, {
      description: `They now have ${Math.min(newStamps, 10)}/10 stamps.`,
    })
    setSuccess(true)
    setSelected(prev => prev
      ? { ...prev, stamps: prev.stamps >= 10 ? 1 : prev.stamps + 1, points: prev.points + 10 }
      : null
    )
    setTimeout(() => setSuccess(false), 2500)
  }

  const displayStamps = selected ? Math.min(selected.stamps, 10) : 0

  return (
    <div style={{ maxWidth: 460 }}>
      {/* Search input */}
      <div style={{ position: 'relative', marginBottom: 8 }}>
        <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}>
          <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <input
          value={query}
          onChange={e => { setQuery(e.target.value); setSelected(null); setSuccess(false) }}
          placeholder="Search by name or phone…"
          style={{
            width: '100%',
            padding: '13px 13px 13px 40px',
            background: 'rgba(255,255,255,0.07)',
            border: '2px solid rgba(255,255,255,0.15)',
            color: '#FFFFFF',
            fontSize: 13,
            fontWeight: 700,
            fontFamily: 'inherit',
            outline: 'none',
          }}
        />
      </div>

      {/* Dropdown results */}
      {filtered.length > 0 && !selected && (
        <div style={{ background: 'rgba(255,255,255,0.06)', border: '2px solid rgba(255,255,255,0.1)', overflow: 'hidden', marginBottom: 20 }}>
          {filtered.map((c, i) => (
            <div
              key={c.id}
              onClick={() => { setSelected(c); setQuery(c.name) }}
              style={{ padding: '11px 14px', cursor: 'pointer', borderBottom: i < filtered.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none', display: 'flex', alignItems: 'center', gap: 10 }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
              onMouseLeave={e => (e.currentTarget.style.background = '')}
            >
              <div style={{ width: 32, height: 32, background: '#F2D648', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: '#111111', fontSize: 13 }}>
                {c.name.charAt(0)}
              </div>
              <div>
                <div style={{ color: '#FFFFFF', fontWeight: 800, fontSize: 12, textTransform: 'uppercase' }}>{c.name}</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 600 }}>{c.phone} · {c.stamps}/10 stamps</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Selected customer card */}
      {selected && (
        <div style={{ background: 'rgba(255,255,255,0.05)', border: '2px solid rgba(255,255,255,0.15)', padding: '20px', marginBottom: 20 }} className="slide-up">
          {/* Customer info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
            <div style={{ width: 48, height: 48, background: '#F2D648', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: '#111111', fontSize: 20 }}>
              {selected.name.charAt(0)}
            </div>
            <div>
              <div style={{ fontWeight: 900, fontSize: 15, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: -0.3 }}>{selected.name}</div>
              <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11, fontWeight: 600, marginTop: 2 }}>{selected.phone}</div>
            </div>
            <div style={{ marginLeft: 'auto', background: '#F2D648', color: '#111111', fontSize: 10, fontWeight: 900, padding: '3px 10px', border: '2px solid #111111', letterSpacing: 1, textTransform: 'uppercase' }}>
              {selected.points} PTS
            </div>
          </div>

          {/* Stamp progress */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>Stamp progress</span>
              <span style={{ fontSize: 10, color: '#F2D648', fontWeight: 900 }}>{displayStamps}/10</span>
            </div>
            <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${displayStamps * 10}%`, background: '#F2D648', transition: 'width 0.5s ease' }} />
            </div>
            {/* Bean grid */}
            <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
              {Array.from({ length: 10 }, (_, i) => (
                <CoffeeBean key={i} filled={i < displayStamps} size={28} />
              ))}
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 18 }}>
            {([['Points', selected.points], ['All-time', selected.totalStamps]] as [string, number][]).map(([l, v]) => (
              <div key={l} style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: 20, fontWeight: 900, color: '#F2D648' }}>{v}</div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1 }}>{l}</div>
              </div>
            ))}
          </div>

          {/* Issue button */}
          <button
            onClick={handleIssue}
            style={{
              width: '100%',
              padding: '17px',
              background: success ? '#27AE60' : '#F2D648',
              color: '#111111',
              fontWeight: 900,
              fontSize: 15,
              textTransform: 'uppercase',
              letterSpacing: 2,
              cursor: 'pointer',
              border: '2px solid #111111',
              fontFamily: 'inherit',
              transition: 'background 0.2s',
            }}
          >
            {success ? '✓ STAMP ISSUED!' : 'ISSUE STAMP'}
          </button>
        </div>
      )}

      {/* Empty state button */}
      {!selected && (
        <button
          disabled
          style={{
            width: '100%',
            padding: '17px',
            background: 'rgba(255,255,255,0.05)',
            color: 'rgba(255,255,255,0.25)',
            fontWeight: 900,
            fontSize: 15,
            textTransform: 'uppercase',
            letterSpacing: 2,
            cursor: 'not-allowed',
            border: '2px solid rgba(255,255,255,0.1)',
            fontFamily: 'inherit',
          }}
        >
          Issue Stamp
        </button>
      )}
    </div>
  )
}
