import type { Customer, Notification } from './types'
import { getNotifications, setNotifications } from './store'

function createNotif(
  customerId: string,
  message: string,
  type: Notification['type'],
): Notification {
  return {
    id: `notif_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    customerId,
    message,
    type,
    read: false,
    createdAt: new Date().toISOString(),
  }
}

function appendNotif(notif: Notification): void {
  const existing = getNotifications()
  setNotifications([notif, ...existing])
}

export function notifyStampIssued(customer: Customer): void {
  const { id, stamps } = customer
  appendNotif(createNotif(id, `You earned a stamp! ${stamps}/10 to your free drink`, 'stamp'))

  if (stamps === 7) {
    appendNotif(createNotif(id, "You're 3 stamps away from a free coffee!", 'milestone'))
  } else if (stamps === 9) {
    appendNotif(createNotif(id, 'One more stamp — your free drink is almost here!', 'milestone'))
  } else if (stamps === 10) {
    appendNotif(createNotif(id, "Reward unlocked! You've earned a free drink", 'reward_unlocked'))
  }
}

export function notifyRewardRedeemed(customerId: string, rewardName: string): void {
  appendNotif(createNotif(customerId, `Your ${rewardName} has been redeemed. Enjoy!`, 'redeemed'))
}

export function notifyNewReward(customerId: string, rewardName: string): void {
  appendNotif(createNotif(customerId, `New reward available: ${rewardName}`, 'new_reward'))
}

export function notifyOrderPlaced(customerId: string): void {
  appendNotif(createNotif(customerId, 'Your order is being prepared! ☕', 'order_placed'))
}
