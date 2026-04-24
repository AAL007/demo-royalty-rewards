'use client'

import { useState } from 'react'
import { useApp } from '@/context/AppContext'
import { StatCard } from '@/components/admin/StatCard'

const DAILY_DATA = [
  { period: 'Mon', stamps: 14 }, { period: 'Tue', stamps: 22 },
  { period: 'Wed', stamps: 18 }, { period: 'Thu', stamps: 27 },
  { period: 'Fri', stamps: 31 }, { period: 'Sat', stamps: 42 }, { period: 'Sun', stamps: 35 },
]
const WEEKLY_DATA = [
  { period: 'Wk 1', stamps: 98 }, { period: 'Wk 2', stamps: 121 },
  { period: 'Wk 3', stamps: 143 }, { period: 'Wk 4', stamps: 189 },
]
const MONTHLY_DATA = [
  { period: 'Nov', stamps: 312 }, { period: 'Dec', stamps: 445 },
  { period: 'Jan', stamps: 389 }, { period: 'Feb', stamps: 421 },
  { period: 'Mar', stamps: 512 }, { period: 'Apr', stamps: 551 },
]
const CHART_DATA: Record<string, { period: string; stamps: number }[]> = {
  daily: DAILY_DATA, weekly: WEEKLY_DATA, monthly: MONTHLY_DATA,
}

export default function AdminDashboard() {
  const { customers, history, rewards } = useApp()
  const [period, setPeriod] = useState('weekly')

  const stampsToday = history.filter(e =>
    e.type === 'stamp' && new Date(e.createdAt).toDateString() === new Date().toDateString()
  ).length
  const redemptionsToday = history.filter(e =>
    e.type === 'redemption' && new Date(e.createdAt).toDateString() === new Date().toDateString()
  ).length
  const activeRewards = rewards.filter(r => r.active).length

  const bars = CHART_DATA[period]
  const maxVal = Math.max(...bars.map(b => b.stamps), 1)

  return (
    <div>
      <div style={{ marginBottom: 22 }}>
        <div style={{ fontWeight: 900, fontSize: 20, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: -0.5, marginBottom: 3 }}>Dashboard</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>Admin Portal</div>
      </div>

      {/* Stat cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" style={{ marginBottom: 24 }}>
        <StatCard label="Total Members"  value={customers.length} trend={12} icon="👥" />
        <StatCard label="Stamps Today"   value={stampsToday}      trend={8}  icon="☕" />
        <StatCard label="Redemptions"    value={redemptionsToday} trend={-3} icon="🎁" />
        <StatCard label="Active Rewards" value={activeRewards}               icon="⭐" />
      </div>

      {/* Bar chart */}
      <div style={{ background: 'rgba(255,255,255,0.05)', border: '2px solid rgba(255,255,255,0.1)', padding: '20px', marginBottom: 20 }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 20 }}>
          <div style={{ fontWeight: 900, fontSize: 13, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: 1 }}>Stamps Issued</div>
          <div className="flex gap-1">
            {['daily', 'weekly', 'monthly'].map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                style={{ padding: '5px 10px', fontSize: 9, fontWeight: 900, border: 'none', cursor: 'pointer', fontFamily: 'inherit', textTransform: 'uppercase', letterSpacing: 1, background: period === p ? '#F2D648' : 'rgba(255,255,255,0.07)', color: period === p ? '#111111' : 'rgba(255,255,255,0.4)' }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 100 }}>
          {bars.map(b => (
            <div key={b.period} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
              <div style={{ width: '100%', background: '#F2D648', height: `${(b.stamps / maxVal) * 100}%`, minHeight: 4, transition: 'height 0.4s ease' }} />
              <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.35)', fontWeight: 800 }}>{b.period}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent members */}
      <div style={{ background: 'rgba(255,255,255,0.05)', border: '2px solid rgba(255,255,255,0.1)', padding: '18px' }}>
        <div style={{ fontWeight: 900, fontSize: 12, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 14 }}>Recent Members</div>
        {customers.slice(0, 5).map((c, i) => (
          <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
            <div style={{ width: 34, height: 34, background: '#F2D648', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: '#111111', fontSize: 14, flexShrink: 0 }}>
              {c.name.charAt(0)}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 12, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: 0.3 }}>{c.name}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>{c.phone}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', fontWeight: 700 }}>{c.stamps}/10 stamps · {c.points} pts</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
