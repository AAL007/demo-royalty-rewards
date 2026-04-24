'use client'

import { useState } from 'react'
import { useApp } from '@/context/AppContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import type { Reward } from '@/lib/types'

const EMPTY_FORM = { name: '', description: '', pointCost: '', icon: '🎁' }

export default function ManageRewardsPage() {
  const { rewards, addReward, toggleReward, deleteReward } = useApp()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [deletingReward, setDeletingReward] = useState<Reward | null>(null)

  function handleAdd() {
    if (!form.name.trim() || !form.pointCost) return
    addReward({
      name: form.name.trim(),
      description: form.description.trim(),
      pointCost: parseInt(form.pointCost, 10),
      icon: form.icon || '🎁',
    })
    toast.success(`"${form.name}" added to rewards!`)
    setForm(EMPTY_FORM)
    setDialogOpen(false)
  }

  function handleConfirmDelete() {
    if (!deletingReward) return
    deleteReward(deletingReward.id)
    toast.success(`"${deletingReward.name}" removed.`)
    setDeletingReward(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Manage Rewards</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {rewards.length} reward{rewards.length !== 1 ? 's' : ''} in catalog
          </p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Reward
        </Button>
      </div>

      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Icon</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Points</TableHead>
              <TableHead className="text-center">Active</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {rewards.map((reward) => (
              <TableRow key={reward.id}>
                <TableCell className="text-xl">{reward.icon}</TableCell>
                <TableCell className="font-medium">{reward.name}</TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {reward.description}
                </TableCell>
                <TableCell className="text-right font-semibold">{reward.pointCost}</TableCell>
                <TableCell className="text-center">
                  <Switch
                    checked={reward.active}
                    onCheckedChange={() => toggleReward(reward.id)}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => setDeletingReward(reward)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Add Reward Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Reward</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-4 gap-3">
              <div className="col-span-1 space-y-1.5">
                <Label>Icon</Label>
                <Input
                  value={form.icon}
                  onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}
                  placeholder="🎁"
                  className="text-center text-xl"
                />
              </div>
              <div className="col-span-3 space-y-1.5">
                <Label>Name</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Free latte"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Description</Label>
              <Input
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="e.g. Any size, any milk alternative"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Point Cost</Label>
              <Input
                type="number"
                min={1}
                value={form.pointCost}
                onChange={(e) => setForm((f) => ({ ...f, pointCost: e.target.value }))}
                placeholder="e.g. 100"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAdd} disabled={!form.name.trim() || !form.pointCost}>
              Add Reward
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog
        open={deletingReward !== null}
        onOpenChange={(open) => !open && setDeletingReward(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete &ldquo;{deletingReward?.name}&rdquo;?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the reward from the catalog.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeletingReward(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
