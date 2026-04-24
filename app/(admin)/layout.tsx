'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/admin',         label: 'Dashboard',      icon: ChartIcon,  exact: true },
  { href: '/admin/issue',   label: 'Issue Stamp',    icon: CoffeeIcon, exact: false },
  { href: '/admin/rewards', label: 'Manage Rewards', icon: GiftIcon,   exact: false },
]

function ChartIcon({ size = 15, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  )
}
function CoffeeIcon({ size = 15, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8h1a4 4 0 010 8h-1" /><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
      <line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  )
}
function GiftIcon({ size = 15, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 12 20 22 4 22 4 12" /><rect x="2" y="7" width="20" height="5" />
      <line x1="12" y1="22" x2="12" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" />
    </svg>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen" style={{ background: '#111111' }}>
      {/* Desktop sidebar */}
      <div className="hidden md:flex flex-col shrink-0" style={{ width: 220, background: '#0A0A0A', borderRight: '3px solid rgba(255,255,255,0.08)' }}>
        <div style={{ padding: '22px 18px 18px', borderBottom: '2px solid rgba(255,255,255,0.06)' }}>
          <div style={{ fontWeight: 900, fontSize: 20, color: '#F2D648', letterSpacing: -1, textTransform: 'uppercase' }}>KOPI XYZ</div>
          <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.25)', fontWeight: 800, letterSpacing: 3, marginTop: 3, textTransform: 'uppercase' }}>Admin Portal</div>
        </div>

        <div className="flex-1 flex flex-col gap-0.5" style={{ padding: '12px 8px' }}>
          {NAV.map(({ href, label, icon: Icon, exact }) => {
            const isActive = exact ? pathname === href : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-2.5"
                style={{
                  padding: '12px 13px',
                  background: isActive ? '#F2D648' : 'transparent',
                  color: isActive ? '#111111' : 'rgba(255,255,255,0.4)',
                  fontWeight: 900,
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: 1.5,
                  textDecoration: 'none',
                  transition: 'all 0.15s',
                }}
              >
                <Icon size={15} color={isActive ? '#111111' : 'rgba(255,255,255,0.35)'} />
                {label}
              </Link>
            )
          })}
        </div>

        <div style={{ padding: '12px 8px', borderTop: '2px solid rgba(255,255,255,0.05)' }}>
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5"
            style={{ padding: '11px 13px', color: 'rgba(255,255,255,0.3)', fontWeight: 800, fontSize: 10, textTransform: 'uppercase', letterSpacing: 1.5, textDecoration: 'none' }}
          >
            ← Customer View
          </Link>
        </div>
      </div>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <div
          className="md:hidden flex items-center justify-between"
          style={{ background: '#0A0A0A', padding: '12px 14px', borderBottom: '2px solid rgba(255,255,255,0.08)' }}
        >
          <div style={{ fontWeight: 900, fontSize: 16, color: '#F2D648', letterSpacing: -0.5, textTransform: 'uppercase' }}>Kopi XYZ Admin</div>
          <div className="flex gap-1">
            {NAV.map(({ href, label, exact }) => {
              const isActive = exact ? pathname === href : pathname.startsWith(href)
              return (
                <Link
                  key={href}
                  href={href}
                  style={{ padding: '6px 10px', background: isActive ? '#F2D648' : 'rgba(255,255,255,0.07)', color: isActive ? '#111111' : 'rgba(255,255,255,0.4)', fontSize: 9, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 0.5, textDecoration: 'none' }}
                >
                  {label}
                </Link>
              )
            })}
          </div>
        </div>

        <main className="flex-1 overflow-auto" style={{ background: '#111111' }}>
          <div className="max-w-4xl mx-auto px-6 py-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
