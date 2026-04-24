import type { Customer, Notification, Reward, VisitEvent, Order } from './types'
import { DEMO_CUSTOMER, ADMIN_CUSTOMERS, INITIAL_REWARDS, INITIAL_NOTIFICATIONS, INITIAL_HISTORY } from './mockData'

const KEYS = {
  customer: 'loyalty_customer',
  customers: 'loyalty_customers',
  rewards: 'loyalty_rewards',
  notifications: 'loyalty_notifications',
  history: 'loyalty_history',
  orders: 'loyalty_orders',
  favorites: 'loyalty_favorites',
} as const

function safeGet<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

function safeSet(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // silently fail in SSR or storage-full scenarios
  }
}

export function initializeStore(): void {
  if (!safeGet(KEYS.customer)) safeSet(KEYS.customer, DEMO_CUSTOMER)
  if (!safeGet(KEYS.customers)) safeSet(KEYS.customers, ADMIN_CUSTOMERS)
  if (!safeGet(KEYS.rewards)) safeSet(KEYS.rewards, INITIAL_REWARDS)
  if (!safeGet(KEYS.notifications)) safeSet(KEYS.notifications, INITIAL_NOTIFICATIONS)
  if (!safeGet(KEYS.history)) safeSet(KEYS.history, INITIAL_HISTORY)
  if (!safeGet(KEYS.orders)) safeSet(KEYS.orders, [])
  if (!safeGet(KEYS.favorites)) safeSet(KEYS.favorites, [])
}

export function resetStore(): void {
  safeSet(KEYS.customer, DEMO_CUSTOMER)
  safeSet(KEYS.customers, ADMIN_CUSTOMERS)
  safeSet(KEYS.rewards, INITIAL_REWARDS)
  safeSet(KEYS.notifications, INITIAL_NOTIFICATIONS)
  safeSet(KEYS.history, INITIAL_HISTORY)
  safeSet(KEYS.orders, [])
  safeSet(KEYS.favorites, [])
}

export const getCustomer = () => safeGet<Customer>(KEYS.customer)
export const setCustomer = (v: Customer) => safeSet(KEYS.customer, v)

export const getCustomers = () => safeGet<Customer[]>(KEYS.customers) ?? []
export const setCustomers = (v: Customer[]) => safeSet(KEYS.customers, v)

export const getRewards = () => safeGet<Reward[]>(KEYS.rewards) ?? []
export const setRewards = (v: Reward[]) => safeSet(KEYS.rewards, v)

export const getNotifications = () => safeGet<Notification[]>(KEYS.notifications) ?? []
export const setNotifications = (v: Notification[]) => safeSet(KEYS.notifications, v)

export const getHistory = () => safeGet<VisitEvent[]>(KEYS.history) ?? []
export const setHistory = (v: VisitEvent[]) => safeSet(KEYS.history, v)

export const getOrders = () => safeGet<Order[]>(KEYS.orders) ?? []
export const setOrders = (v: Order[]) => safeSet(KEYS.orders, v)

export const getFavorites = () => safeGet<string[]>(KEYS.favorites) ?? []
export const setFavorites = (v: string[]) => safeSet(KEYS.favorites, v)
