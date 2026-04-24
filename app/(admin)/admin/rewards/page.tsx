'use client'

import { useState } from 'react'
import { useApp } from '@/context/AppContext'
import { toast } from 'sonner'
import type { Reward } from '@/lib/types'

const EMPTY_FORM = { name: '', description: '', pointCost: '', icon: '🎁' }

export default function ManageRewardsPage() {
  const { rewards, addReward, toggleReward, deleteReward } = useApp()
  const [showAdd, setShowAdd] = useState(false)
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
    setShowAdd(false)
  }

  function handleConfirmDelete() {
    if (!deletingReward) return
    deleteReward(deletingReward.id)
    toast.success(`"${deletingReward.name}" removed.`)
    setDeletingReward(null)
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between" style={{ marginBottom: 22 }}>
        <div>
          <div style={{ fontWeight: 900, fontSize: 20, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: -0.5 }}>
            Manage Rewards
          </div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', fontWeight: 700, marginTop: 2, textTransform: 'uppercase', letterSpacing: 1 }}>
            {rewards.length} in catalog
          </div>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2"
          style={{ background: '#F2D648', color: '#111111', padding: '10px 16px', fontWeight: 900, fontSize: 11, border: 'none', cursor: 'pointer', letterSpacing: 1, textTransform: 'uppercase', fontFamily: 'inherit' }}
        >
          + Add Reward
        </button>
      </div>

      {/* Rewards list */}
      <div className="flex flex-col gap-2">
        {rewards.map(r => (
          <div
            key={r.id}
            style={{ background: 'rgba(255,255,255,0.05)', border: '2px solid rgba(255,255,255,0.1)', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}
          >
            <div style={{ fontSize: 26, width: 44, textAlign: 'center', flexShrink: 0 }}>{r.icon}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 900, fontSize: 12, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: 0.3 }}>{r.name}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 2, fontWeight: 500 }}>{r.description}</div>
              <div style={{ fontSize: 10, fontWeight: 900, color: '#F2D648', marginTop: 3 }}>{r.pointCost} pts</div>
            </div>
            <div className="flex gap-2 items-center">
              {/* Toggle switch */}
              <button
                onClick={() => {
                  toggleReward(r.id)
                  toast.success(`${r.name} ${r.active ? 'disabled' : 'enabled'}`)
                }}
                style={{ width: 44, height: 24, background: r.active ? '#F2D648' : 'rgba(255,255,255,0.08)', border: '2px solid rgba(255,255,255,0.15)', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}
              >
                <div style={{ position: 'absolute', top: 2, left: r.active ? 20 : 2, width: 16, height: 16, background: r.active ? '#111111' : 'rgba(255,255,255,0.3)', transition: 'left 0.2s' }} />
              </button>
              {/* Delete */}
              <button
                onClick={() => setDeletingReward(r)}
                style={{ background: 'rgba(192,57,43,0.2)', border: '1px solid rgba(192,57,43,0.3)', padding: 7, cursor: 'pointer', display: 'flex' }}
              >
                <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#E74C3C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add reward modal */}
      {showAdd && (
        <>
          <div onClick={() => setShowAdd(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 800 }} />
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: '#1A1A1A', border: '3px solid #F2D648', padding: '26px', width: 360, maxWidth: '90vw', zIndex: 801, boxShadow: '8px 8px 0 rgba(0,0,0,0.5)' }}>
            <div style={{ fontWeight: 900, fontSize: 15, color: '#F2D648', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 20 }}>
              Add New Reward
            </div>
            {([
              ['Reward Name', 'name', 'text'],
              ['Description', 'description', 'text'],
              ['Point Cost', 'pointCost', 'number'],
              ['Icon (emoji)', 'icon', 'text'],
            ] as [string, keyof typeof form, string][]).map(([label, field, type]) => (
              <div key={field} style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 9, fontWeight: 900, color: 'rgba(255,255,255,0.4)', marginBottom: 5, textTransform: 'uppercase', letterSpacing: 1 }}>{label}</div>
                <input
                  type={type}
                  value={form[field]}
                  onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))}
                  style={{ width: '100%', padding: '10px 12px', background: 'rgba(255,255,255,0.06)', border: '2px solid rgba(255,255,255,0.12)', color: '#FFFFFF', fontSize: 13, fontWeight: 700, fontFamily: 'inherit', outline: 'none' }}
                />
              </div>
            ))}
            <div className="flex gap-2" style={{ marginTop: 18 }}>
              <button onClick={() => setShowAdd(false)} style={{ flex: 1, padding: '11px', background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)', fontWeight: 900, cursor: 'pointer', border: '2px solid rgba(255,255,255,0.1)', fontFamily: 'inherit', textTransform: 'uppercase', letterSpacing: 1, fontSize: 11 }}>
                Cancel
              </button>
              <button onClick={handleAdd} disabled={!form.name.trim() || !form.pointCost} style={{ flex: 1, padding: '11px', background: form.name.trim() && form.pointCost ? '#F2D648' : 'rgba(255,255,255,0.1)', color: form.name.trim() && form.pointCost ? '#111111' : 'rgba(255,255,255,0.3)', fontWeight: 900, cursor: form.name.trim() && form.pointCost ? 'pointer' : 'not-allowed', border: '2px solid rgba(255,255,255,0.1)', fontFamily: 'inherit', textTransform: 'uppercase', letterSpacing: 1, fontSize: 11 }}>
                Add
              </button>
            </div>
          </div>
        </>
      )}

      {/* Delete confirm modal */}
      {deletingReward && (
        <>
          <div onClick={() => setDeletingReward(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 800 }} />
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: '#1A1A1A', border: '3px solid #E74C3C', padding: '26px', width: 340, maxWidth: '90vw', zIndex: 801, boxShadow: '8px 8px 0 rgba(0,0,0,0.5)' }}>
            <div style={{ fontWeight: 900, fontSize: 15, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>Delete Reward?</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>
              This will permanently remove &ldquo;{deletingReward.name}&rdquo; from the catalog.
            </div>
            <div className="flex gap-2">
              <button onClick={() => setDeletingReward(null)} style={{ flex: 1, padding: '11px', background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)', fontWeight: 900, cursor: 'pointer', border: '2px solid rgba(255,255,255,0.1)', fontFamily: 'inherit', textTransform: 'uppercase', letterSpacing: 1, fontSize: 11 }}>
                Cancel
              </button>
              <button onClick={handleConfirmDelete} style={{ flex: 1, padding: '11px', background: '#C0392B', color: '#FFFFFF', fontWeight: 900, cursor: 'pointer', border: '2px solid #C0392B', fontFamily: 'inherit', textTransform: 'uppercase', letterSpacing: 1, fontSize: 11 }}>
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
