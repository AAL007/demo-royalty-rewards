'use client'

import { useState, useMemo } from 'react'
import { useApp } from '@/context/AppContext'
import type { VisitEvent } from '@/lib/types'

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
  })
}

function CoffeeBean({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 44" fill="none">
      <g transform="rotate(-8, 20, 22)">
        <ellipse cx="20" cy="22" rx="14" ry="18" fill="#111111" />
        <path d="M15 7 Q25 22 15 37" stroke="white" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  )
}

const TYPE_CONFIG: Record<string, { bg: string; color: string; label: string; icon: React.ReactNode }> = {
  stamp:      { bg: '#F2D648', color: '#111111', label: 'Stamp',      icon: <CoffeeBean size={22} /> },
  redemption: { bg: '#111111', color: '#F2D648', label: 'Redemption', icon: <span style={{ color: '#F2D648', fontSize: 14 }}>🎁</span> },
  order:      { bg: '#111111', color: '#F2D648', label: 'Order',      icon: <span style={{ color: '#F2D648', fontSize: 14 }}>🛍️</span> },
}

function EventRow({ event, idx }: { event: VisitEvent; idx: number }) {
  const cfg = TYPE_CONFIG[event.type] ?? TYPE_CONFIG.stamp
  return (
    <div
      className="slide-up"
      style={{
        background: '#FFFFFF',
        border: '2px solid #111111',
        padding: '12px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        boxShadow: '3px 3px 0 #111111',
        animationDelay: `${idx * 0.04}s`,
      }}
    >
      <div style={{ width: 38, height: 38, background: cfg.bg, border: '2px solid #111111', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {cfg.icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 800, fontSize: 12, color: '#111111', textTransform: 'uppercase', letterSpacing: 0.3 }}>{event.detail}</div>
        <div style={{ fontSize: 10, color: '#6B6B6B', marginTop: 2, fontWeight: 600 }}>{formatDate(event.createdAt)}</div>
      </div>
      <span style={{ fontSize: 10, fontWeight: 900, padding: '3px 9px', background: cfg.bg, color: cfg.color, border: '2px solid #111111', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
        {event.type === 'stamp' ? `${event.stampsAfter}/10` : `${event.pointsAfter} pts`}
      </span>
    </div>
  )
}

export default function HistoryPage() {
  const { history } = useApp()
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const sorted = [...history].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    if (!search) return sorted
    const q = search.toLowerCase()
    return sorted.filter(e => e.detail.toLowerCase().includes(q) || e.type.includes(q))
  }, [history, search])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {/* Header */}
      <div>
        <div style={{ fontWeight: 900, fontSize: 18, textTransform: 'uppercase', letterSpacing: -0.5, marginBottom: 3, color: '#111111' }}>
          Visit History
        </div>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#6B6B6B' }}>Your stamps, orders &amp; redemptions</div>
      </div>

      {/* Search */}
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}>
          <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="#6B6B6B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search history…"
          style={{ width: '100%', padding: '11px 12px 11px 38px', border: '2px solid #111111', background: '#FFFFFF', fontSize: 13, fontWeight: 600, fontFamily: 'inherit', outline: 'none', color: '#111111', boxShadow: '3px 3px 0 #111111' }}
        />
      </div>

      {/* Events */}
      {history.length === 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 24px', border: '2px dashed #111111', color: '#6B6B6B', gap: 10 }}>
          <span style={{ fontSize: 48 }}>☕</span>
          <p style={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, fontSize: 12 }}>No visits yet.</p>
          <p style={{ fontSize: 11 }}>Come in for your first stamp!</p>
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 24px', border: '2px dashed #111111', color: '#6B6B6B', gap: 10 }}>
          <span style={{ fontSize: 48 }}>🔍</span>
          <p style={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, fontSize: 12 }}>No events match your search</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filtered.map((event, i) => <EventRow key={event.id} event={event} idx={i} />)}
        </div>
      )}
    </div>
  )
}
