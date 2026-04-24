'use client'

import { useState } from 'react'
import { useApp } from '@/context/AppContext'
import { StampCard } from '@/components/custom/StampCard'
import { PointsBadge } from '@/components/custom/PointsBadge'
import { RewardCard } from '@/components/custom/RewardCard'
import Link from 'next/link'
import { Copy, Check, Users } from 'lucide-react'

function ReferralCard({ code, referrals }: { code: string; referrals: number }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="rounded-2xl border bg-card shadow-card p-5 space-y-4">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100">
          <Users className="h-4 w-4 text-violet-700" />
        </div>
        <div>
          <h3 className="font-semibold text-sm">Refer a Friend</h3>
          <p className="text-xs text-muted-foreground">{referrals} friend{referrals !== 1 ? 's' : ''} referred so far</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1 rounded-xl bg-muted px-4 py-2.5 font-mono text-sm font-semibold tracking-widest text-center">
          {code}
        </div>
        <button
          onClick={handleCopy}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-foreground text-background hover:opacity-90 transition-all"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
      <p className="text-xs text-muted-foreground">Share your code — both of you earn 20 bonus points when they join</p>
    </div>
  )
}

export default function DashboardPage() {
  const { customer, rewards } = useApp()

  if (!customer) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        Loading...
      </div>
    )
  }

  const quickRewards = [...rewards]
    .filter((r) => r.active)
    .sort((a, b) => a.pointCost - b.pointCost)
    .slice(0, 3)

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, <span className="text-amber-600">{customer.name.split(' ')[0]}</span> 👋
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          {customer.totalStamps} total stamps earned since you joined
        </p>
      </div>

      {/* Hero cards */}
      <div className="grid gap-4 sm:grid-cols-5">
        <div className="sm:col-span-3">
          <StampCard stamps={customer.stamps} name={customer.name} />
        </div>
        <div className="sm:col-span-2">
          <PointsBadge points={customer.points} />
        </div>
      </div>

      {/* Quick Rewards */}
      {quickRewards.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight">Quick Rewards</h2>
            <Link
              href="/rewards"
              className="text-sm font-medium text-amber-600 hover:text-amber-500 transition-colors"
            >
              View all →
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {quickRewards.map((reward) => (
              <RewardCard key={reward.id} reward={reward} />
            ))}
          </div>
        </div>
      )}

      {/* Referral */}
      {customer.referralCode && (
        <ReferralCard
          code={customer.referralCode}
          referrals={customer.referrals ?? 0}
        />
      )}
    </div>
  )
}
