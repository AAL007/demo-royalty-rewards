'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Coffee, BarChart2, Stamp, Gift, ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: BarChart2, exact: true },
  { href: '/admin/issue', label: 'Issue Stamp', icon: Stamp, exact: false },
  { href: '/admin/rewards', label: 'Manage Rewards', icon: Gift, exact: false },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen flex">
      <aside className="w-56 shrink-0 flex flex-col"
        style={{ background: 'linear-gradient(180deg, #0d0502 0%, #140804 100%)' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 h-16 border-b border-white/5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-400/10">
            <Coffee className="h-3.5 w-3.5 text-amber-400" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm leading-none">Brew &amp; Earn</p>
            <p className="text-white/30 text-[10px] mt-0.5">Admin Panel</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-0.5">
          {NAV.map(({ href, label, icon: Icon, exact }) => {
            const isActive = exact
              ? pathname === href
              : pathname.startsWith(href) && href !== '/admin'
            const isAdminRoot = exact && pathname === '/admin'
            const active = isActive || isAdminRoot

            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                  active
                    ? 'bg-amber-400/15 text-amber-400'
                    : 'text-white/40 hover:text-white/80 hover:bg-white/5',
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="px-3 pb-6">
          <div className="h-px bg-white/5 mb-3" />
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-white/30 hover:text-white/70 hover:bg-white/5 transition-all"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" />
            Customer View
          </Link>
        </div>
      </aside>

      <main className="flex-1 bg-background overflow-auto">
        <div className="max-w-4xl mx-auto px-8 py-8">{children}</div>
      </main>
    </div>
  )
}
