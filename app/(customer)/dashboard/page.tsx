'use client'

import { useState, useEffect } from 'react'
import { useApp } from '@/context/AppContext'
import { StampCard } from '@/components/custom/StampCard'
import { PointsBadge } from '@/components/custom/PointsBadge'
import Link from 'next/link'

const BANNERS = [
  { title: 'EARN DOUBLE POINTS', sub: 'This weekend only — 2× on all cold drinks', tag: 'WEEKEND OFFER' },
  { title: 'NEW PASTRY ALERT',   sub: 'Try our almond croissant. Earn a stamp!',   tag: 'NEW ARRIVAL'  },
  { title: 'REFER A FRIEND',     sub: 'Get 50 bonus points for every referral',     tag: 'BONUS'        },
]

function PromoBanner() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % BANNERS.length), 4000)
    return () => clearInterval(t)
  }, [])
  const b = BANNERS[idx]
  return (
    <div style={{ background: '#F2D648', border: '3px solid #111111', padding: '18px 20px', position: 'relative', boxShadow: '4px 4px 0 #111111' }}>
      <div style={{ fontSize: 9, fontWeight: 900, letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 6, color: '#111111', opacity: 0.6 }}>{b.tag}</div>
      <div style={{ fontWeight: 900, fontSize: 20, color: '#111111', letterSpacing: -0.5, lineHeight: 1.1, marginBottom: 6 }}>{b.title}</div>
      <div style={{ fontSize: 12, color: '#111111', fontWeight: 600, opacity: 0.75 }}>{b.sub}</div>
      <div style={{ display: 'flex', gap: 5, marginTop: 14 }}>
        {BANNERS.map((_, i) => (
          <div key={i} onClick={() => setIdx(i)} style={{ width: i === idx ? 20 : 6, height: 4, background: '#111111', opacity: i === idx ? 1 : 0.25, cursor: 'pointer', transition: 'width 0.3s, opacity 0.3s' }} />
        ))}
      </div>
    </div>
  )
}

function ReferralCard({ code, referrals }: { code: string; referrals: number }) {
  const [copied, setCopied] = useState(false)
  function handleCopy() {
    navigator.clipboard.writeText(code).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) })
  }
  return (
    <div style={{ background: '#FFFFFF', border: '2px solid #111111', padding: '18px 16px', boxShadow: '4px 4px 0 #111111' }}>
      <div style={{ fontWeight: 900, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4, color: '#111111' }}>Refer a Friend</div>
      <div style={{ fontSize: 11, color: '#6B6B6B', fontWeight: 600, marginBottom: 14 }}>
        {referrals} friend{referrals !== 1 ? 's' : ''} referred · Both earn 20 bonus points
      </div>
      <div className="flex items-center gap-2">
        <div style={{ flex: 1, background: '#F9F7EE', border: '2px solid #111111', padding: '10px 14px', fontFamily: 'monospace', fontSize: 14, fontWeight: 900, letterSpacing: 4, textAlign: 'center', color: '#111111' }}>
          {code}
        </div>
        <button onClick={handleCopy} style={{ background: copied ? '#27AE60' : '#111111', color: '#F2D648', padding: '10px 14px', border: '2px solid #111111', cursor: 'pointer', fontWeight: 900, fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, fontFamily: 'inherit', transition: 'background 0.2s' }}>
          {copied ? '✓' : 'Copy'}
        </button>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const { customer, rewards } = useApp()

  if (!customer) {
    return (
      <div className="flex items-center justify-center py-20" style={{ color: '#6B6B6B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, fontSize: 12 }}>
        Loading…
      </div>
    )
  }

  const quickRewards = [...rewards].filter(r => r.active).sort((a, b) => a.pointCost - b.pointCost).slice(0, 4)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <PromoBanner />

      {/* Stamp card + points badge */}
      <div className="grid gap-4 sm:grid-cols-5">
        <div className="sm:col-span-3">
          <StampCard stamps={customer.stamps} name={customer.name} />
        </div>
        <div className="sm:col-span-2">
          <PointsBadge points={customer.points} />
        </div>
      </div>

      {/* Quick Redeem */}
      {quickRewards.length > 0 && (
        <div>
          <div className="flex items-center justify-between" style={{ marginBottom: 10 }}>
            <div style={{ fontWeight: 900, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1.5, color: '#111111' }}>Quick Redeem</div>
            <Link href="/rewards" style={{ fontSize: 10, fontWeight: 900, color: '#111111', textTransform: 'uppercase', letterSpacing: 1, textDecoration: 'none', borderBottom: '2px solid #111111' }}>
              View all →
            </Link>
          </div>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
            {quickRewards.map(r => {
              const can = customer.points >= r.pointCost
              return (
                <div key={r.id} style={{ flexShrink: 0, background: can ? '#F2D648' : '#FFFFFF', border: '2px solid #111111', padding: '10px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, minWidth: 80, boxShadow: can ? '3px 3px 0 #111111' : 'none' }}>
                  <span style={{ fontSize: 22 }}>{r.icon}</span>
                  <span style={{ fontSize: 9, fontWeight: 900, color: '#111111', textAlign: 'center', lineHeight: 1.2, textTransform: 'uppercase' }}>{r.name}</span>
                  <span style={{ fontSize: 9, fontWeight: 900, background: can ? '#111111' : '#EEE', color: can ? '#F2D648' : '#6B6B6B', padding: '2px 7px', border: '1px solid #111111' }}>{r.pointCost}pts</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Referral card */}
      {(customer as { referralCode?: string }).referralCode && (
        <ReferralCard
          code={(customer as { referralCode: string }).referralCode}
          referrals={(customer as { referrals?: number }).referrals ?? 0}
        />
      )}
    </div>
  )
}
