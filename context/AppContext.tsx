'use client'

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import type { Customer, Notification, Reward, VisitEvent, CartItem, Order } from '@/lib/types'
import {
  initializeStore,
  getCustomer, setCustomer,
  getCustomers, setCustomers,
  getRewards, setRewards,
  getNotifications, setNotifications,
  getHistory, setHistory,
  getOrders, setOrders,
  getFavorites, setFavorites,
} from '@/lib/store'
import { notifyStampIssued, notifyRewardRedeemed, notifyNewReward, notifyOrderPlaced } from '@/lib/notifications'

interface AppContextValue {
  customer: Customer | null
  customers: Customer[]
  rewards: Reward[]
  notifications: Notification[]
  history: VisitEvent[]
  orders: Order[]
  favorites: string[]
  unreadCount: number
  issueStamp: (customerId: string) => void
  redeemReward: (rewardId: string) => void
  placeOrder: (items: CartItem[], subtotal: number) => Order
  toggleFavorite: (menuItemId: string) => void
  markRead: (notifId: string) => void
  markAllRead: () => void
  addReward: (data: Omit<Reward, 'id' | 'active'>) => void
  toggleReward: (rewardId: string) => void
  deleteReward: (rewardId: string) => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [customer, setCustomerState] = useState<Customer | null>(null)
  const [customers, setCustomersState] = useState<Customer[]>([])
  const [rewards, setRewardsState] = useState<Reward[]>([])
  const [notifications, setNotificationsState] = useState<Notification[]>([])
  const [history, setHistoryState] = useState<VisitEvent[]>([])
  const [orders, setOrdersState] = useState<Order[]>([])
  const [favorites, setFavoritesState] = useState<string[]>([])

  const refresh = useCallback(() => {
    setCustomerState(getCustomer())
    setCustomersState(getCustomers())
    setRewardsState(getRewards())
    setNotificationsState(getNotifications())
    setHistoryState(getHistory())
    setOrdersState(getOrders())
    setFavoritesState(getFavorites())
  }, [])

  useEffect(() => {
    initializeStore()
    refresh()
  }, [refresh])

  function issueStamp(customerId: string) {
    const all = getCustomers()
    const idx = all.findIndex((c) => c.id === customerId)
    if (idx === -1) return

    const prev = all[idx]
    const newStamps = prev.stamps >= 10 ? 1 : prev.stamps + 1
    const updated: Customer = {
      ...prev,
      stamps: newStamps,
      totalStamps: prev.totalStamps + 1,
      points: prev.points + 10,
    }
    all[idx] = updated
    setCustomers(all)

    if (customerId === 'cust_001') setCustomer(updated)

    notifyStampIssued(updated)

    const event: VisitEvent = {
      id: `evt_${Date.now()}`,
      customerId,
      type: 'stamp',
      detail: 'Stamp earned',
      stampsAfter: updated.stamps,
      pointsAfter: updated.points,
      createdAt: new Date().toISOString(),
    }
    setHistory([event, ...getHistory()])

    refresh()
  }

  function redeemReward(rewardId: string) {
    const cust = getCustomer()
    if (!cust) return
    const reward = getRewards().find((r) => r.id === rewardId)
    if (!reward || !reward.active || cust.points < reward.pointCost) return

    const updated: Customer = { ...cust, points: cust.points - reward.pointCost }
    setCustomer(updated)

    const all = getCustomers()
    const idx = all.findIndex((c) => c.id === cust.id)
    if (idx !== -1) {
      all[idx] = updated
      setCustomers(all)
    }

    const event: VisitEvent = {
      id: `evt_${Date.now()}`,
      customerId: cust.id,
      type: 'redemption',
      detail: `${reward.name} redeemed`,
      stampsAfter: updated.stamps,
      pointsAfter: updated.points,
      createdAt: new Date().toISOString(),
    }
    setHistory([event, ...getHistory()])
    notifyRewardRedeemed(cust.id, reward.name)
    refresh()
  }

  function markRead(notifId: string) {
    const updated = getNotifications().map((n) =>
      n.id === notifId ? { ...n, read: true } : n,
    )
    setNotifications(updated)
    refresh()
  }

  function markAllRead() {
    const updated = getNotifications().map((n) => ({ ...n, read: true }))
    setNotifications(updated)
    refresh()
  }

  function addReward(data: Omit<Reward, 'id' | 'active'>) {
    const reward: Reward = { ...data, id: `rwd_${Date.now()}`, active: true }
    setRewards([...getRewards(), reward])
    const cust = getCustomer()
    if (cust) notifyNewReward(cust.id, reward.name)
    refresh()
  }

  function toggleReward(rewardId: string) {
    const updated = getRewards().map((r) =>
      r.id === rewardId ? { ...r, active: !r.active } : r,
    )
    setRewards(updated)
    refresh()
  }

  function deleteReward(rewardId: string) {
    setRewards(getRewards().filter((r) => r.id !== rewardId))
    refresh()
  }

  function placeOrder(cartItems: CartItem[], subtotal: number): Order {
    const cust = getCustomer()
    if (!cust) throw new Error('No customer')

    const stampsEarned = Math.max(1, Math.floor(subtotal / 5))
    const pointsEarned = stampsEarned * 10

    let newStamps = cust.stamps
    for (let i = 0; i < stampsEarned; i++) {
      newStamps = newStamps >= 10 ? 1 : newStamps + 1
    }

    const updatedCust: Customer = {
      ...cust,
      stamps: newStamps,
      totalStamps: cust.totalStamps + stampsEarned,
      points: cust.points + pointsEarned,
    }
    setCustomer(updatedCust)

    const all = getCustomers()
    const idx = all.findIndex((c) => c.id === cust.id)
    if (idx !== -1) { all[idx] = updatedCust; setCustomers(all) }

    const order: Order = {
      id: `ord_${Date.now()}`,
      customerId: cust.id,
      items: cartItems,
      subtotal,
      stampsEarned,
      pointsEarned,
      status: 'preparing',
      createdAt: new Date().toISOString(),
    }
    setOrders([order, ...getOrders()])

    const event: VisitEvent = {
      id: `evt_${Date.now()}`,
      customerId: cust.id,
      type: 'order',
      detail: `Order placed — ${cartItems.length} item${cartItems.length > 1 ? 's' : ''}`,
      stampsAfter: updatedCust.stamps,
      pointsAfter: updatedCust.points,
      createdAt: new Date().toISOString(),
      orderId: order.id,
    }
    setHistory([event, ...getHistory()])

    notifyOrderPlaced(cust.id)
    notifyStampIssued(updatedCust)
    refresh()
    return order
  }

  function toggleFavorite(menuItemId: string) {
    const current = getFavorites()
    const next = current.includes(menuItemId)
      ? current.filter((id) => id !== menuItemId)
      : [...current, menuItemId]
    setFavorites(next)
    refresh()
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <AppContext.Provider
      value={{
        customer,
        customers,
        rewards,
        notifications,
        history,
        orders,
        favorites,
        unreadCount,
        issueStamp,
        redeemReward,
        placeOrder,
        toggleFavorite,
        markRead,
        markAllRead,
        addReward,
        toggleReward,
        deleteReward,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
