'use client'

import { useState, useMemo } from 'react'
import { useApp } from '@/context/AppContext'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Search, Package } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Order } from '@/lib/types'

function getDisplayStatus(order: Order): 'preparing' | 'ready' | 'completed' {
  const elapsed = Date.now() - new Date(order.createdAt).getTime()
  if (elapsed < 60_000) return 'preparing'
  if (elapsed < 5 * 60_000) return 'ready'
  return 'completed'
}

const STATUS_CONFIG = {
  preparing: { label: 'Preparing', class: 'bg-amber-100 text-amber-800 border-amber-200' },
  ready: { label: 'Ready', class: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  completed: { label: 'Completed', class: 'bg-muted text-muted-foreground border-border' },
} as const

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function OrderCard({ order }: { order: Order }) {
  const status = getDisplayStatus(order)
  const config = STATUS_CONFIG[status]

  return (
    <div className="bg-card rounded-2xl border border-border/60 shadow-card overflow-hidden">
      <div className="px-5 py-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs text-muted-foreground font-mono">{order.id}</p>
          <p className="text-sm text-muted-foreground mt-0.5">{formatDate(order.createdAt)}</p>
        </div>
        <Badge variant="outline" className={cn('shrink-0 text-xs', config.class)}>
          {config.label}
        </Badge>
      </div>

      <Separator />

      <div className="px-5 py-3 space-y-2">
        {order.items.map((item) => (
          <div key={item.menuItemId} className="flex items-center gap-2 text-sm">
            <span className="text-base">{item.icon}</span>
            <span className="flex-1 min-w-0 truncate">{item.name}</span>
            <span className="text-muted-foreground shrink-0">×{item.quantity}</span>
            <span className="font-medium shrink-0">${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <Separator />

      <div className="px-5 py-3 flex items-center justify-between">
        <div className="flex gap-3 text-xs text-muted-foreground">
          <span>+{order.stampsEarned} stamp{order.stampsEarned > 1 ? 's' : ''}</span>
          <span>+{order.pointsEarned} pts</span>
        </div>
        <span className="font-bold">${order.subtotal.toFixed(2)}</span>
      </div>
    </div>
  )
}

export default function OrdersPage() {
  const { orders } = useApp()
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    if (!search) return orders
    const q = search.toLowerCase()
    return orders.filter(
      (o) =>
        o.id.toLowerCase().includes(q) ||
        o.items.some((i) => i.name.toLowerCase().includes(q)),
    )
  }, [orders, search])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground text-sm mt-1">Track your recent orders</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by order ID or item…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 h-11 bg-white"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center py-24 text-muted-foreground gap-4 rounded-2xl border border-dashed">
          <Package className="h-10 w-10 opacity-20" />
          <div className="text-center">
            <p className="font-medium">{search ? 'No orders match your search' : 'No orders yet'}</p>
            {!search && <p className="text-sm mt-1">Place your first order from the menu</p>}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  )
}
