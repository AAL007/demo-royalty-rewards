'use client'

import { useState, useMemo } from 'react'
import { useApp } from '@/context/AppContext'
import { RewardCard } from '@/components/custom/RewardCard'

export default function RewardsPage() {
  const { customer, rewards } = useApp()
  const [search, setSearch] = useState('')

  const activeRewards = useMemo(() => {
    const q = search.toLowerCase()
    return [...rewards]
      .filter(r => r.active)
      .filter(r => !q || r.name.toLowerCase().includes(q) || r.description.toLowerCase().includes(q))
      .sort((a, b) => a.pointCost - b.pointCost)
  }, [rewards, search])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {/* Header */}
      <div>
        <div style={{ fontWeight: 900, fontSize: 18, textTransform: 'uppercase', letterSpacing: -0.5, marginBottom: 3, color: '#111111' }}>
          Rewards Catalog
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#6B6B6B' }}>
          You have <strong style={{ color: '#111111' }}>{customer?.points ?? 0} points</strong> to spend
        </div>
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
          placeholder="Search rewards…"
          style={{ width: '100%', padding: '11px 12px 11px 38px', border: '2px solid #111111', background: '#FFFFFF', fontSize: 13, fontWeight: 600, fontFamily: 'inherit', outline: 'none', color: '#111111', boxShadow: '3px 3px 0 #111111' }}
        />
      </div>

      {/* Grid */}
      {activeRewards.length === 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 24px', border: '2px dashed #111111', color: '#6B6B6B', gap: 10 }}>
          <span style={{ fontSize: 48 }}>🎁</span>
          <p style={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, fontSize: 12 }}>
            {search ? 'No rewards match your search' : 'No rewards available right now.'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {activeRewards.map(reward => (
            <RewardCard key={reward.id} reward={reward} />
          ))}
        </div>
      )}
    </div>
  )
}
