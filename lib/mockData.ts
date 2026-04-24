import type { Customer, Notification, Reward, VisitEvent } from './types'

export const DEMO_CUSTOMER: Customer = {
  id: 'cust_001',
  name: 'Alex Rivera',
  phone: '555-0101',
  stamps: 7,
  totalStamps: 23,
  points: 140,
  joinedAt: '2024-11-01',
  favorites: [],
  referralCode: 'BREW-ALEX',
  referrals: 2,
}

export const ADMIN_CUSTOMERS: Customer[] = [
  DEMO_CUSTOMER,
  { id: 'cust_002', name: 'Jordan Lee', phone: '555-0102', stamps: 3, totalStamps: 8, points: 80, joinedAt: '2024-12-10' },
  { id: 'cust_003', name: 'Sam Chen', phone: '555-0103', stamps: 9, totalStamps: 41, points: 210, joinedAt: '2024-09-15' },
  { id: 'cust_004', name: 'Maya Patel', phone: '555-0104', stamps: 1, totalStamps: 5, points: 50, joinedAt: '2025-01-03' },
  { id: 'cust_005', name: 'Chris Wilson', phone: '555-0105', stamps: 6, totalStamps: 18, points: 120, joinedAt: '2024-10-22' },
]

export const INITIAL_REWARDS: Reward[] = [
  { id: 'rwd_001', name: 'Free drip coffee', description: 'Any size, any roast', pointCost: 100, icon: '☕', active: true },
  { id: 'rwd_002', name: 'Free pastry of choice', description: 'Choose from our daily selection', pointCost: 150, icon: '🥐', active: true },
  { id: 'rwd_003', name: 'Size upgrade', description: 'Upgrade any drink to the next size', pointCost: 50, icon: '📏', active: true },
  { id: 'rwd_004', name: 'Extra espresso shot', description: 'Add an extra shot to any drink', pointCost: 30, icon: '⚡', active: true },
  { id: 'rwd_005', name: 'Free cold brew', description: 'House cold brew, 12oz', pointCost: 120, icon: '🧊', active: true },
]

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif_001',
    customerId: 'cust_001',
    message: "You're 3 stamps away from a free coffee!",
    type: 'milestone',
    read: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif_002',
    customerId: 'cust_001',
    message: 'New reward available: Free cold brew',
    type: 'new_reward',
    read: false,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif_003',
    customerId: 'cust_001',
    message: "Your points expire in 7 days — don't let them go to waste!",
    type: 'expiry',
    read: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

export const INITIAL_HISTORY: VisitEvent[] = [
  {
    id: 'evt_001',
    customerId: 'cust_001',
    type: 'stamp',
    detail: 'Stamp earned',
    stampsAfter: 7,
    pointsAfter: 140,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'evt_002',
    customerId: 'cust_001',
    type: 'redemption',
    detail: 'Extra espresso shot redeemed',
    stampsAfter: 6,
    pointsAfter: 110,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'evt_003',
    customerId: 'cust_001',
    type: 'stamp',
    detail: 'Stamp earned',
    stampsAfter: 6,
    pointsAfter: 110,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 - 3600000).toISOString(),
  },
  {
    id: 'evt_004',
    customerId: 'cust_001',
    type: 'stamp',
    detail: 'Stamp earned',
    stampsAfter: 5,
    pointsAfter: 100,
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'evt_005',
    customerId: 'cust_001',
    type: 'stamp',
    detail: 'Stamp earned',
    stampsAfter: 4,
    pointsAfter: 90,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
]
