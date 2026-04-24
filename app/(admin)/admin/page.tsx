'use client'

import { useState } from 'react'
import { useApp } from '@/context/AppContext'
import { StatCard } from '@/components/admin/StatCard'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Users, Stamp, Gift } from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

const DAILY_DATA = [
  { period: 'Mon', stamps: 14, redemptions: 3 },
  { period: 'Tue', stamps: 22, redemptions: 6 },
  { period: 'Wed', stamps: 18, redemptions: 4 },
  { period: 'Thu', stamps: 27, redemptions: 8 },
  { period: 'Fri', stamps: 31, redemptions: 11 },
  { period: 'Sat', stamps: 42, redemptions: 14 },
  { period: 'Sun', stamps: 35, redemptions: 9 },
]

const WEEKLY_DATA = [
  { period: 'Week 1', stamps: 98, redemptions: 22 },
  { period: 'Week 2', stamps: 121, redemptions: 31 },
  { period: 'Week 3', stamps: 143, redemptions: 38 },
  { period: 'Week 4', stamps: 189, revenues: 55, redemptions: 55 },
]

const MONTHLY_DATA = [
  { period: 'Nov', stamps: 312, redemptions: 78 },
  { period: 'Dec', stamps: 445, redemptions: 121 },
  { period: 'Jan', stamps: 389, redemptions: 95 },
  { period: 'Feb', stamps: 421, redemptions: 110 },
  { period: 'Mar', stamps: 512, redemptions: 138 },
  { period: 'Apr', stamps: 551, redemptions: 145 },
]

const CHART_DATA: Record<string, typeof DAILY_DATA> = {
  daily: DAILY_DATA,
  weekly: WEEKLY_DATA,
  monthly: MONTHLY_DATA,
}

export default function AdminDashboard() {
  const { customers, history } = useApp()
  const [tab, setTab] = useState('daily')

  const stampsToday = history.filter(
    (e) =>
      e.type === 'stamp' &&
      new Date(e.createdAt).toDateString() === new Date().toDateString(),
  ).length

  const redemptionsToday = history.filter(
    (e) =>
      e.type === 'redemption' &&
      new Date(e.createdAt).toDateString() === new Date().toDateString(),
  ).length

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Overview of today&apos;s activity
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Total Customers"
          value={customers.length}
          trend={12}
          icon={<Users className="h-5 w-5" />}
          accent="#f59e0b"
        />
        <StatCard
          label="Stamps Today"
          value={stampsToday}
          trend={8}
          icon={<Stamp className="h-5 w-5" />}
          accent="#10b981"
        />
        <StatCard
          label="Redemptions Today"
          value={redemptionsToday}
          trend={-3}
          icon={<Gift className="h-5 w-5" />}
          accent="#6366f1"
        />
      </div>

      <div className="rounded-xl border bg-card p-5">
        <h2 className="font-semibold mb-4">Activity Overview</h2>
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>

          {Object.keys(CHART_DATA).map((key) => (
            <TabsContent key={key} value={key}>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={CHART_DATA[key]} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="period" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: '8px',
                      border: '1px solid hsl(var(--border))',
                      fontSize: '12px',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="stamps" name="Stamps" fill="#c2601f" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="redemptions" name="Redemptions" fill="#3b1f0a" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
