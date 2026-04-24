export interface Customer {
  id: string
  name: string
  phone: string
  stamps: number
  totalStamps: number
  points: number
  joinedAt: string
  favorites?: string[]
  referralCode?: string
  referrals?: number
}

export interface Notification {
  id: string
  customerId: string
  message: string
  type: 'stamp' | 'milestone' | 'reward_unlocked' | 'redeemed' | 'new_reward' | 'expiry' | 'order_placed'
  read: boolean
  createdAt: string
}

export interface Reward {
  id: string
  name: string
  description: string
  pointCost: number
  icon: string
  active: boolean
}

export interface VisitEvent {
  id: string
  customerId: string
  type: 'stamp' | 'redemption' | 'order'
  detail: string
  stampsAfter: number
  pointsAfter: number
  createdAt: string
  orderId?: string
}

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: 'espresso' | 'cold_brew' | 'tea' | 'food'
  icon: string
  popular?: boolean
}

export interface CartItem {
  menuItemId: string
  name: string
  price: number
  quantity: number
  icon: string
}

export interface Order {
  id: string
  customerId: string
  items: CartItem[]
  subtotal: number
  stampsEarned: number
  pointsEarned: number
  status: 'preparing' | 'ready' | 'completed'
  createdAt: string
}
