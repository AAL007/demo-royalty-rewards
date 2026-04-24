# Coffee Shop Loyalty Rewards — MVP

## Project Overview
A loyalty rewards web application for a coffee shop client demo. Built to be visually polished and interactive enough to win a real client, but scoped to mock data and localStorage for speed. No real backend or auth required.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Component Library**: shadcn/ui — use shadcn components wherever possible before building custom ones
- **State/Persistence**: React Context + localStorage
- **Deployment**: Vercel

## shadcn/ui Setup
Initialize with: `npx shadcn@latest init`
Install components as needed: `npx shadcn@latest add <component>`

Key components to install upfront:
```bash
npx shadcn@latest add button card badge sheet tabs avatar
npx shadcn@latest add dropdown-menu separator scroll-area
npx shadcn@latest add input label form toast progress
```

## Design Aesthetic
- Warm, premium coffee-shop feel — think specialty café, not fast food chain
- Color palette: deep espresso browns, warm creams, and a single accent (burnt amber or terracotta)
- Typography: a distinctive serif or slab-serif for headings, clean sans-serif for body
- Subtle micro-animations on interactions (stamp earning, reward unlock, notification badge)
- Dark sidebar for admin, warm light theme for customer side
- Enable darkmode toggle
- Make sure that all components fit in all display (movbile and desktop)
- Use montserrat as the main font

---

## Project Structure

```
/app
  /page.tsx                  ← Landing / sign-in page
  /(customer)
    /layout.tsx              ← Customer shell with header + notification bell
    /dashboard/page.tsx      ← Stamp card + points + quick rewards
    /rewards/page.tsx        ← Full rewards catalog + redemption
    /history/page.tsx        ← Visit & redemption history
  /(admin)
    /layout.tsx              ← Admin shell with sidebar nav
    /admin/page.tsx          ← Stats dashboard
    /admin/issue/page.tsx    ← Issue stamp flow (barista screen)
    /admin/rewards/page.tsx  ← Manage rewards catalog
/components
  /ui                        ← shadcn auto-generated, do not edit manually
  /custom
    StampCard.tsx            ← Visual stamp grid (10 stamps) — custom, no shadcn equivalent
    NotificationPanel.tsx    ← Built with shadcn <Sheet> (slide-in drawer)
    NotificationBell.tsx     ← Built with shadcn <DropdownMenu> + custom badge
    RewardCard.tsx           ← Built with shadcn <Card>, <Badge>, <Button>
    PointsBadge.tsx          ← Built with shadcn <Badge>
  /admin
    StatCard.tsx             ← Built with shadcn <Card>
    IssueStampForm.tsx       ← Built with shadcn <Form>, <Input>, <Button>
/lib
  store.ts                   ← localStorage read/write helpers
  mockData.ts                ← Seed data for demo
  notifications.ts           ← Notification creation helpers
/context
  AppContext.tsx             ← Global state (customer, stamps, points, notifications)
```

---

## Core Features

### Customer Side

#### 1. Digital Stamp Card
- 10-stamp grid displayed as coffee cup icons
- Earned stamps are filled, remaining are outlined
- Animate the newly earned stamp with a pop/scale effect
- At 10/10: trigger a "reward unlocked" state with confetti or pulse animation
- Wrap in shadcn `<Card>`

#### 2. Points Balance
- Separate from stamps — 1 visit = 10 points
- Displayed as a prominent balance on the dashboard using shadcn `<Badge>` or a styled `<Card>`
- Used to redeem items from the rewards catalog

#### 3. Rewards Catalog
- Use shadcn `<Card>` for each reward item
- "Redeem" button uses shadcn `<Button>`
- Show a `<Button disabled>` with tooltip via shadcn `<Tooltip>` when points are too low
- Use shadcn `<Badge>` to show point cost
- Redeemed rewards appear in history

#### 4. Visit History
- Use shadcn `<ScrollArea>` for the list container
- Use shadcn `<Separator>` between entries
- Use shadcn `<Badge>` with variant to differentiate stamp vs redemption events

#### 5. In-App Notifications
- Bell icon in header — use shadcn `<Sheet>` for the slide-in panel (side="right")
- Unread count shown as a custom absolute-positioned badge on the bell button
- Notification list inside `<ScrollArea>`
- Use shadcn `<Button variant="ghost">` for "Mark all as read"
- Use shadcn `<Toast>` to show a brief confirmation when a stamp is issued or reward is redeemed
- Notifications are generated automatically on these triggers:
  - Stamp issued → *"You earned a stamp! X/10 to your free drink"*
  - Reached 7 stamps → *"You're 3 stamps away from a free coffee!"*
  - Reached 9 stamps → *"One more stamp — your free drink is almost here!"*
  - Stamp card complete → *"Reward unlocked! You've earned a free drink"*
  - Reward redeemed → *"Your [reward name] has been redeemed. Enjoy!"*
  - New reward added by admin → *"New reward available: [reward name]"*
  - Points expiry nudge → *"Your points expire in 7 days — don't let them go to waste!"*
- Click a notification to mark it as read (badge count decreases)
- "Mark all as read" button in the panel header

### Admin Side

#### 6. Stats Dashboard
- Use shadcn `<Card>` for each metric (total customers, stamps today, redemptions)
- Use shadcn `<Tabs>` to toggle between daily / weekly / monthly views
- Simple bar chart using pure CSS bars or recharts (already compatible with shadcn projects)

#### 7. Issue Stamp Flow (Barista Screen)
- Large, simple UI — designed to be used quickly at a counter
- Use shadcn `<Input>` for customer name/phone search
- Use shadcn `<Command>` (combobox) for autocomplete from mock customer list
- Shows the selected customer's stamp progress with shadcn `<Progress>`
- Big "Issue Stamp" button using shadcn `<Button size="lg">`
- Success state: use shadcn `<Toast>` for confirmation

#### 8. Manage Rewards
- Use shadcn `<Table>` for the rewards list
- Use shadcn `<Switch>` for enable/disable toggle per reward
- "Add Reward" uses shadcn `<Dialog>` with a `<Form>` inside (name, point cost, description, emoji)
- Use shadcn `<AlertDialog>` for delete confirmation

---

## Data Models

```ts
// Customer
interface Customer {
  id: string
  name: string
  phone: string
  stamps: number          // current stamp count (resets after free drink)
  totalStamps: number     // all-time stamp count
  points: number
  joinedAt: string
}

// Notification
interface Notification {
  id: string
  customerId: string
  message: string
  type: 'stamp' | 'milestone' | 'reward_unlocked' | 'redeemed' | 'new_reward' | 'expiry'
  read: boolean
  createdAt: string
}

// Reward
interface Reward {
  id: string
  name: string
  description: string
  pointCost: number
  icon: string            // emoji or icon name
  active: boolean
}

// VisitEvent
interface VisitEvent {
  id: string
  customerId: string
  type: 'stamp' | 'redemption'
  detail: string
  stampsAfter: number
  pointsAfter: number
  createdAt: string
}
```

---

## Mock Data (Seed in `lib/mockData.ts`)

### Demo Customer (for customer-side preview)
```ts
{
  id: "cust_001",
  name: "Alex Rivera",
  phone: "555-0101",
  stamps: 7,
  totalStamps: 23,
  points: 140,
  joinedAt: "2024-11-01"
}
```

### Rewards Catalog (starter set)
| Name | Points | Icon |
|---|---|---|
| Free drip coffee | 100 | ☕ |
| Free pastry of choice | 150 | 🥐 |
| Size upgrade | 50 | 📏 |
| Extra espresso shot | 30 | ⚡ |
| Free cold brew | 120 | 🧊 |

### Seed Notifications (3–4 pre-loaded to make the bell feel active on first load)
- Milestone alert: *"You're 3 stamps away from a free coffee!"*
- New reward: *"New reward available: Free cold brew"*
- Points nudge: *"Your points expire in 7 days — don't let them go to waste!"*

---

## localStorage Keys
```
loyalty_customer      → Customer object (active demo user)
loyalty_customers     → Customer[] (admin list)
loyalty_rewards       → Reward[]
loyalty_notifications → Notification[]
loyalty_history       → VisitEvent[]
```

---

## Demo Flow (for client presentation)

Walk through in this order:
1. Land on sign-in page → click "Continue as Alex" (skip real auth)
2. Show dashboard: 7 stamps filled, 140 points balance, 3 unread notifications
3. Open notification bell → show the pre-seeded alerts
4. Browse rewards catalog → redeem "Size upgrade" (50 pts) → new notification appears
5. Switch to Admin view → issue a stamp to Alex
6. Switch back to Customer view → stamp count is now 8, new notification in bell
7. Keep issuing until 10 → show reward unlock animation
8. Show Admin dashboard stats updating in real time

---

## Implementation Notes
- Use `localStorage` for all persistence — wrap reads in try/catch for SSR safety
- Use `"use client"` on any component that touches localStorage or uses React hooks
- Seed localStorage with mock data on first load if keys don't exist
- No real authentication — landing page has two buttons: "Enter as Customer" and "Enter as Admin"
- Vercel deployment: `next build` should work with zero config, all data is client-side
- Keep animations performant: prefer `transform` and `opacity` over layout-affecting properties
- **shadcn rules**: never manually edit files inside `/components/ui` — re-run the CLI to update them. Always use the shadcn `<Button>`, `<Input>`, etc. from `@/components/ui` — don't create duplicate primitives
- Add `cn()` utility from `lib/utils.ts` (auto-generated by shadcn) for conditional class merging
- Use shadcn theming: customize `--primary`, `--accent`, and `--card` CSS variables in `globals.css` to match the warm coffee-shop palette instead of the default shadcn colors

---

## Out of Scope (Do Not Build)
- Real user authentication
- Backend API or database
- Payment or POS integration
- Push notifications (browser or mobile)
- Multi-location support
- QR code scanning
