'use client'

import { useEffect, useRef, useState } from 'react'

interface StampCardProps {
  stamps: number
  name: string
}

function CoffeeBean({ filled, size = 38, animNew = false }: { filled: boolean; size?: number; animNew?: boolean }) {
  return (
    <div className={animNew ? 'stamp-pop' : ''} style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} viewBox="0 0 40 44" fill="none">
        {filled ? (
          <g transform="rotate(-8, 20, 22)">
            <ellipse cx="20" cy="22" rx="14" ry="18" fill="#111111" />
            <path d="M15 7 Q25 22 15 37" stroke="white" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          </g>
        ) : (
          <g transform="rotate(-8, 20, 22)">
            <ellipse cx="20" cy="22" rx="14" ry="18" fill="none" stroke="#111111" strokeWidth="2" strokeDasharray="4 3" />
          </g>
        )}
      </svg>
    </div>
  )
}

export function StampCard({ stamps, name }: StampCardProps) {
  const prevRef = useRef(stamps)
  const [animatingSlots, setAnimatingSlots] = useState<Set<number>>(new Set())

  useEffect(() => {
    const prev = prevRef.current
    if (stamps > prev) {
      const newSlots = new Set<number>()
      for (let i = prev; i < Math.min(stamps, 10); i++) newSlots.add(i)
      setAnimatingSlots(newSlots)
      const t = setTimeout(() => setAnimatingSlots(new Set()), 700)
      prevRef.current = stamps
      return () => clearTimeout(t)
    }
    prevRef.current = stamps
  }, [stamps])

  const isComplete = stamps >= 10
  const displayStamps = Math.min(stamps, 10)

  return (
    <div
      className={isComplete ? 'reward-glow' : ''}
      style={{
        background: '#FFFFFF',
        border: '3px solid #111111',
        borderRadius: 4,
        overflow: 'hidden',
        boxShadow: '5px 5px 0 #111111',
      }}
    >
      {/* Card header */}
      <div
        style={{
          background: isComplete ? '#111111' : '#F2D648',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '3px solid #111111',
        }}
      >
        <div>
          <div style={{ fontWeight: 900, fontSize: 15, letterSpacing: -0.5, color: isComplete ? '#F2D648' : '#111111', lineHeight: 1, textTransform: 'uppercase' }}>
            KOPI XYZ
          </div>
          <div style={{ fontWeight: 700, fontSize: 9, letterSpacing: 2, color: isComplete ? 'rgba(242,214,72,0.7)' : '#111111', opacity: 0.7, textTransform: 'uppercase', marginTop: 1 }}>
            Loyalty Card
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontWeight: 900, fontSize: 11, color: isComplete ? '#F2D648' : '#111111', textTransform: 'uppercase', letterSpacing: 0.5 }}>
            1 drink, 1 stamp.
          </div>
          <div style={{ fontWeight: 700, fontSize: 10, color: isComplete ? 'rgba(242,214,72,0.7)' : '#111111', opacity: 0.8, textTransform: 'uppercase' }}>
            10 stamps, 1 free drink.
          </div>
        </div>
      </div>

      {/* Bean grid */}
      <div style={{ padding: '14px 16px 10px', background: isComplete ? '#F7F5E8' : '#FFFFFF' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, justifyItems: 'center' }}>
          {Array.from({ length: 10 }, (_, i) => (
            <CoffeeBean key={i} filled={i < displayStamps} animNew={animatingSlots.has(i)} size={38} />
          ))}
        </div>

        {/* Progress bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
          <div style={{ flex: 1, height: 3, background: '#E8E4D4', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${displayStamps * 10}%`, background: '#111111', borderRadius: 2, transition: 'width 0.5s ease' }} />
          </div>
          <div style={{ fontSize: 10, fontWeight: 800, color: '#111111', whiteSpace: 'nowrap' }}>{displayStamps}/10</div>
        </div>

        {isComplete && (
          <div style={{ marginTop: 10, background: '#F2D648', border: '2px solid #111111', borderRadius: 3, padding: '8px 12px', textAlign: 'center', fontWeight: 900, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, color: '#111111' }}>
            FREE DRINK UNLOCKED — CLAIM NOW
          </div>
        )}

        <div style={{ marginTop: 8, fontSize: 8.5, color: '#6B6B6B', fontWeight: 500, lineHeight: 1.5 }}>
          <strong style={{ fontWeight: 700 }}>Terms &amp; Conditions:</strong> We&apos;ll stamp your card once anytime you buy a drink from us. At 10 stamps you earn one free drink of your choice.
        </div>
      </div>
    </div>
  )
}
