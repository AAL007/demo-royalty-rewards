import Link from 'next/link'

export default function LandingPage() {
  return (
    <main
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
      style={{ background: '#F2D648' }}
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(0,0,0,0.06) 39px, rgba(0,0,0,0.06) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(0,0,0,0.06) 39px, rgba(0,0,0,0.06) 40px)',
        }}
      />

      <div className="relative z-10 w-full max-w-sm slide-up">
        {/* Logo block */}
        <div
          className="mb-4"
          style={{ background: '#111111', padding: '28px 28px 22px', boxShadow: '8px 8px 0 rgba(0,0,0,0.25)' }}
        >
          <div className="flex items-center gap-4 mb-4">
            <svg width={52} height={52} viewBox="0 0 40 44" fill="none">
              <g transform="rotate(-8, 20, 22)">
                <ellipse cx="20" cy="22" rx="14" ry="18" fill="#F2D648" />
                <path d="M15 7 Q25 22 15 37" stroke="#111111" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </g>
            </svg>
            <div>
              <div style={{ fontWeight: 900, fontSize: 26, color: '#F2D648', letterSpacing: -1, lineHeight: 1, textTransform: 'uppercase' }}>
                KOPI XYZ
              </div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', fontWeight: 800, letterSpacing: 3, marginTop: 3, textTransform: 'uppercase' }}>
                Loyalty Rewards
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 14 }}>
            <div style={{ fontWeight: 700, fontSize: 11, color: 'rgba(255,255,255,0.45)', marginBottom: 3, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              1 drink, 1 stamp.
            </div>
            <div style={{ fontWeight: 900, fontSize: 11, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
              10 stamps, 1 free drink.
            </div>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col gap-3">
          <Link
            href="/dashboard"
            className="block w-full text-center"
            style={{
              padding: '17px 20px',
              background: '#111111',
              color: '#F2D648',
              fontWeight: 900,
              fontSize: 14,
              textTransform: 'uppercase',
              letterSpacing: 2,
              border: '3px solid #111111',
              boxShadow: '5px 5px 0 rgba(0,0,0,0.3)',
              textDecoration: 'none',
            }}
          >
            Enter as Alex Rivera
          </Link>
          <Link
            href="/admin"
            className="block w-full text-center"
            style={{
              padding: '17px 20px',
              background: 'transparent',
              color: '#111111',
              fontWeight: 900,
              fontSize: 14,
              textTransform: 'uppercase',
              letterSpacing: 2,
              border: '3px solid #111111',
              boxShadow: '5px 5px 0 rgba(0,0,0,0.2)',
              textDecoration: 'none',
            }}
          >
            Enter as Admin
          </Link>
        </div>

        <p className="text-center mt-4" style={{ fontSize: 9, color: 'rgba(0,0,0,0.35)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>
          Demo — no real data stored
        </p>
      </div>
    </main>
  )
}
