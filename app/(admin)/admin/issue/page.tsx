import { IssueStampForm } from '@/components/admin/IssueStampForm'

export default function IssueStampPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Issue Stamp</h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Search for a customer and issue their loyalty stamp
        </p>
      </div>

      <IssueStampForm />
    </div>
  )
}
