'use client'

import { useState, useMemo } from 'react'
import { useApp } from '@/context/AppContext'
import { RewardCard } from '@/components/custom/RewardCard'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export default function RewardsPage() {
  const { customer, rewards } = useApp()
  const [search, setSearch] = useState('')

  const activeRewards = useMemo(() => {
    const q = search.toLowerCase()
    return [...rewards]
      .filter((r) => r.active)
      .filter((r) => !q || r.name.toLowerCase().includes(q) || r.description.toLowerCase().includes(q))
      .sort((a, b) => a.pointCost - b.pointCost)
  }, [rewards, search])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Rewards Catalog</h1>
        <p className="text-muted-foreground text-sm mt-1">
          You have{' '}
          <span className="font-semibold text-amber-600">{customer?.points ?? 0} points</span>{' '}
          to spend
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search rewards…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 h-11 bg-white"
        />
      </div>

      {activeRewards.length === 0 ? (
        <div className="flex flex-col items-center py-24 text-muted-foreground gap-3 rounded-2xl border border-dashed">
          <span className="text-5xl">🎁</span>
          <p className="font-medium">{search ? 'No rewards match your search' : 'No rewards available right now.'}</p>
          {!search && <p className="text-sm">Check back soon!</p>}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {activeRewards.map((reward) => (
            <RewardCard key={reward.id} reward={reward} />
          ))}
        </div>
      )}
    </div>
  )
}
