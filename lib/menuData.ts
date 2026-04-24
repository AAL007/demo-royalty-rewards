import type { MenuItem } from './types'

export const MENU_ITEMS: MenuItem[] = [
  // Espresso
  { id: 'item_001', name: 'Espresso', description: 'Double shot, intense and aromatic', price: 3.50, category: 'espresso', icon: '☕', popular: false },
  { id: 'item_002', name: 'Americano', description: 'Espresso with hot water, smooth and bold', price: 4.00, category: 'espresso', icon: '☕' },
  { id: 'item_003', name: 'Cappuccino', description: 'Equal parts espresso, steamed milk, and foam', price: 5.00, category: 'espresso', icon: '☕', popular: true },
  { id: 'item_004', name: 'Latte', description: 'Espresso with creamy steamed milk', price: 5.50, category: 'espresso', icon: '☕', popular: true },
  { id: 'item_005', name: 'Flat White', description: 'Ristretto shots with velvety microfoam', price: 5.50, category: 'espresso', icon: '☕' },
  { id: 'item_006', name: 'Cortado', description: 'Equal parts espresso and warm milk', price: 4.50, category: 'espresso', icon: '☕' },
  // Cold Brew
  { id: 'item_007', name: 'Cold Brew', description: '24-hour slow-steeped, smooth finish', price: 5.50, category: 'cold_brew', icon: '🧊', popular: true },
  { id: 'item_008', name: 'Iced Latte', description: 'Espresso poured over ice with cold milk', price: 5.50, category: 'cold_brew', icon: '🧊' },
  { id: 'item_009', name: 'Nitro Cold Brew', description: 'Cold brew on nitro tap, silky and rich', price: 6.50, category: 'cold_brew', icon: '🧊', popular: true },
  { id: 'item_010', name: 'Cold Brew Tonic', description: 'Cold brew over sparkling tonic water', price: 6.00, category: 'cold_brew', icon: '🧊' },
  // Tea
  { id: 'item_011', name: 'Matcha Latte', description: 'Ceremonial grade matcha with oat milk', price: 6.00, category: 'tea', icon: '🍵', popular: true },
  { id: 'item_012', name: 'Chai Latte', description: 'House-spiced chai with steamed milk', price: 5.50, category: 'tea', icon: '🍵' },
  { id: 'item_013', name: 'Earl Grey', description: 'Classic bergamot loose-leaf brew', price: 4.00, category: 'tea', icon: '🍵' },
  { id: 'item_014', name: 'Hojicha Latte', description: 'Roasted Japanese green tea, nutty finish', price: 6.00, category: 'tea', icon: '🍵' },
  // Food
  { id: 'item_015', name: 'Butter Croissant', description: 'Flaky, golden, baked fresh daily', price: 4.50, category: 'food', icon: '🥐', popular: true },
  { id: 'item_016', name: 'Avocado Toast', description: 'Sourdough, smashed avocado, chili flakes', price: 9.00, category: 'food', icon: '🥑', popular: true },
  { id: 'item_017', name: 'Banana Bread', description: 'Moist house-baked slice with walnuts', price: 4.00, category: 'food', icon: '🍞' },
  { id: 'item_018', name: 'Granola Bowl', description: 'House granola, Greek yogurt, seasonal fruit', price: 7.50, category: 'food', icon: '🥣' },
]
