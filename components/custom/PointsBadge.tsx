interface PointsBadgeProps {
  points: number
}

export function PointsBadge({ points }: PointsBadgeProps) {
  return (
    <div
      style={{
        background: '#111111',
        border: '3px solid #111111',
        borderRadius: 4,
        padding: '20px 16px',
        boxShadow: '5px 5px 0 #111111',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 9, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>
        Points Balance
      </div>
      <div style={{ color: '#F2D648', fontWeight: 900, fontSize: 48, letterSpacing: -2, lineHeight: 1 }}>
        {points}
      </div>
      <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginTop: 6 }}>
        Available to redeem
      </div>
      <div style={{ marginTop: 'auto', paddingTop: 16 }}>
        <div style={{ height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${Math.min((points / 200) * 100, 100)}%`, background: '#F2D648', borderRadius: 2, transition: 'width 0.5s ease' }} />
        </div>
        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', fontWeight: 700, marginTop: 4, textTransform: 'uppercase', letterSpacing: 1 }}>
          {points < 200 ? `${200 - points} pts to next tier` : 'Max tier reached'}
        </div>
      </div>
    </div>
  )
}
