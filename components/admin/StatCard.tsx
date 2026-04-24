import type { ReactNode } from 'react'

interface StatCardProps {
  label: string
  value: string | number
  trend?: number
  icon?: ReactNode
  accent?: string
}

export function StatCard({ label, value, trend, icon }: StatCardProps) {
  return (
    <div
      style={{
        background: '#F2D648',
        border: '2px solid rgba(255,255,255,0.15)',
        padding: '18px 18px',
        boxShadow: '0 0 0 2px rgba(255,255,255,0.05)',
      }}
    >
      <div className="flex justify-between items-start" style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 9, fontWeight: 900, color: 'rgba(0,0,0,0.5)', letterSpacing: 2, textTransform: 'uppercase' }}>{label}</div>
        <div style={{ fontSize: 20 }}>{icon}</div>
      </div>
      <div style={{ fontSize: 34, fontWeight: 900, color: '#111111', letterSpacing: -1, lineHeight: 1 }}>{value}</div>
      {trend !== undefined && (
        <div style={{ fontSize: 10, fontWeight: 700, color: trend >= 0 ? '#27AE60' : '#C0392B', marginTop: 4 }}>
          {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% from last period
        </div>
      )}
    </div>
  )
}
