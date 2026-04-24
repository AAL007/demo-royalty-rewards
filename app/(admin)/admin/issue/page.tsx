import { IssueStampForm } from '@/components/admin/IssueStampForm'

export default function IssueStampPage() {
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontWeight: 900, fontSize: 20, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: -0.5, marginBottom: 3 }}>
          Issue Stamp
        </div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
          Barista screen
        </div>
      </div>
      <IssueStampForm />
    </div>
  )
}
