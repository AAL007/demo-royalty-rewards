'use client'

import { useState, useMemo } from 'react'
import { useApp } from '@/context/AppContext'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Coffee, Gift, ShoppingCart, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { VisitEvent } from '@/lib/types'

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const EVENT_CONFIG = {
  stamp: {
    icon: Coffee,
    bg: 'bg-amber-100',
    iconColor: 'text-amber-700',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-200',
    label: 'Stamp',
  },
  redemption: {
    icon: Gift,
    bg: 'bg-violet-100',
    iconColor: 'text-violet-700',
    badgeClass: 'bg-violet-100 text-violet-800 border-violet-200',
    label: 'Redemption',
  },
  order: {
    icon: ShoppingCart,
    bg: 'bg-emerald-100',
    iconColor: 'text-emerald-700',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    label: 'Order',
  },
} as const

function EventRow({ event }: { event: VisitEvent }) {
  const config = EVENT_CONFIG[event.type]
  const Icon = config.icon

  return (
    <div className="flex items-center gap-4 py-4">
      <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-xl', config.bg)}>
        <Icon className={cn('h-5 w-5', config.iconColor)} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm">{event.detail}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{formatDate(event.createdAt)}</p>
      </div>
      <div className="flex flex-col items-end gap-1 shrink-0">
        <Badge variant="outline" className={cn('text-xs', config.badgeClass)}>
          {config.label}
        </Badge>
        <span className="text-xs text-muted-foreground">
          {event.stampsAfter}/10 · {event.pointsAfter} pts
        </span>
      </div>
    </div>
  )
}

export default function HistoryPage() {
  const { history } = useApp()
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    if (!search) return history
    const q = search.toLowerCase()
    return history.filter((e) => e.detail.toLowerCase().includes(q) || e.type.includes(q))
  }, [history, search])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Visit History</h1>
        <p className="text-muted-foreground text-sm mt-1">Your stamps, orders, and redemptions</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search history…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 h-11 bg-white"
        />
      </div>

      {history.length === 0 ? (
        <div className="flex flex-col items-center py-24 text-muted-foreground gap-3 rounded-2xl border border-dashed">
          <Coffee className="h-10 w-10 opacity-30" />
          <p className="font-medium">No visits yet.</p>
          <p className="text-sm">Come in for your first stamp!</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center py-24 text-muted-foreground gap-3 rounded-2xl border border-dashed">
          <Search className="h-10 w-10 opacity-30" />
          <p className="font-medium">No events match your search</p>
        </div>
      ) : (
        <ScrollArea className="h-[560px] rounded-2xl border bg-card shadow-card">
          <div className="px-5">
            {filtered.map((event, idx) => (
              <div key={event.id}>
                <EventRow event={event} />
                {idx < filtered.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  )
}
