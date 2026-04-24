'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingCart } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { useCart } from '@/context/CartContext'
import { NotificationBell } from '@/components/custom/NotificationBell'

const NAV_LINKS = [
  { href: '/dashboard', label: 'Home',    icon: HomeIcon },
  { href: '/rewards',   label: 'Rewards', icon: GiftIcon },
  { href: '/history',   label: 'History', icon: ClockIcon },
  { href: '/menu',      label: 'Menu',    icon: MenuIconSvg },
  { href: '/orders',    label: 'Orders',  icon: OrdersIcon },
]

function HomeIcon({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12L12 3l9 9" /><path d="M9 21V12h6v9" />
    </svg>
  )
}
function GiftIcon({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 12 20 22 4 22 4 12" /><rect x="2" y="7" width="20" height="5" />
      <line x1="12" y1="22" x2="12" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" />
    </svg>
  )
}
function ClockIcon({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  )
}
function MenuIconSvg({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}
function OrdersIcon({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  )
}

function PointsStrip() {
  const { customer } = useApp()
  if (!customer) return null
  const cols: [string, string, string][] = [
    ['POINTS',   String(customer.points),        '#F2D648'],
    ['STAMPS',   `${customer.stamps}/10`,         '#FFFFFF'],
    ['ALL-TIME', String(customer.totalStamps),    '#FFFFFF'],
  ]
  return (
    <div style={{ background: '#111111', display: 'flex', borderBottom: '3px solid #111111', flexShrink: 0 }}>
      {cols.map(([label, val, color], i) => (
        <div key={label} style={{ flex: 1, borderRight: i < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none', padding: '10px 14px', textAlign: 'center' }}>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 9, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase' }}>{label}</div>
          <div style={{ color, fontWeight: 900, fontSize: 17, letterSpacing: -0.5, marginTop: 1 }}>{val}</div>
        </div>
      ))}
    </div>
  )
}

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { customer, unreadCount } = useApp()
  const { totalItems } = useCart()

  return (
    <div className="flex h-screen" style={{ background: '#F9F7EE' }}>

      {/* Desktop sidebar */}
      <div className="hidden md:flex flex-col shrink-0" style={{ width: 210, background: '#111111', borderRight: '3px solid #111111' }}>
        <div style={{ padding: '24px 18px 20px', borderBottom: '2px solid rgba(255,255,255,0.08)' }}>
          <div style={{ fontWeight: 900, fontSize: 21, color: '#F2D648', letterSpacing: -1, lineHeight: 1 }}>KOPI XYZ</div>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', fontWeight: 800, letterSpacing: 2.5, marginTop: 3, textTransform: 'uppercase' }}>Loyalty Rewards</div>
        </div>
        <div className="flex-1 flex flex-col gap-0.5" style={{ padding: '14px 10px' }}>
          {NAV_LINKS.map(({ href, label, icon: Icon }) => {
            const active = href === '/dashboard' ? pathname === href : pathname.startsWith(href)
            return (
              <Link key={href} href={href} className="flex items-center gap-2.5" style={{ padding: '11px 13px', background: active ? '#F2D648' : 'transparent', color: active ? '#111111' : 'rgba(255,255,255,0.45)', fontWeight: 900, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, textDecoration: 'none', transition: 'background 0.15s' }}>
                <Icon size={16} color={active ? '#111111' : 'rgba(255,255,255,0.4)'} />
                {label}
              </Link>
            )
          })}
        </div>
        <div style={{ padding: '10px', borderTop: '2px solid rgba(255,255,255,0.06)' }}>
          <Link href="/admin" className="flex items-center gap-2" style={{ padding: '10px 13px', color: 'rgba(255,255,255,0.3)', fontWeight: 800, fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, textDecoration: 'none' }}>
            ↗ Admin View
          </Link>
        </div>
      </div>

      {/* Main column */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Header */}
        <div style={{ background: '#111111', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '3px solid #111111', flexShrink: 0 }}>
          <div className="flex items-center gap-3">
            <div style={{ width: 40, height: 40, background: '#F2D648', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 17, color: '#111111', flexShrink: 0 }}>
              {customer?.name?.charAt(0) ?? 'A'}
            </div>
            <div>
              <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>Welcome back</div>
              <div style={{ color: '#FFFFFF', fontSize: 15, fontWeight: 900, letterSpacing: -0.3 }}>{customer?.name ?? 'Alex Rivera'}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/cart" style={{ position: 'relative', display: 'flex' }}>
              <div style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', padding: 8, display: 'flex', cursor: 'pointer' }}>
                <ShoppingCart size={17} color="#FFFFFF" />
                {totalItems > 0 && (
                  <span style={{ position: 'absolute', top: -2, right: -2, width: 16, height: 16, background: '#F2D648', color: '#111111', fontSize: 8, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </div>
            </Link>
            <NotificationBell />
          </div>
        </div>

        {/* Points strip */}
        <PointsStrip />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto" style={{ background: '#F9F7EE' }}>
          <div className="mx-auto max-w-3xl px-4 py-6 pb-24 md:pb-8">{children}</div>
        </main>

        {/* Mobile bottom nav */}
        <div className="md:hidden flex shrink-0" style={{ background: '#FFFFFF', borderTop: '3px solid #111111' }}>
          {NAV_LINKS.map(({ href, label, icon: Icon }) => {
            const active = href === '/dashboard' ? pathname === href : pathname.startsWith(href)
            return (
              <Link key={href} href={href} className="flex-1 flex flex-col items-center gap-1" style={{ padding: '9px 0 7px', background: active ? '#F2D648' : '#FFFFFF', color: '#111111', fontSize: 7, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 0.5, borderTop: active ? '3px solid #111111' : '3px solid transparent', textDecoration: 'none', transition: 'background 0.15s' }}>
                <Icon size={18} color="#111111" />
                {label}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
