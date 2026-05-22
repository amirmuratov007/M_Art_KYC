import { useRouter } from 'next/router'
import Link from 'next/link'
import { AnalystLayout } from '@/components/analyst/AnalystUI'
import ReportBuilder from '@/components/analyst/ReportBuilder'
import { ArrowLeft } from 'lucide-react'

export default function ReportBuilderPage() {
  const router = useRouter()
  const id = router.query.id || 'HMD-2026-001'

  return (
    <AnalystLayout title="Report Builder">
      <div className="mb-8">
        <Link href={`/analyst/ai/${id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-sky-200">
          <ArrowLeft className="h-4 w-4" />
          Back to AI Draft
        </Link>

        <h1 className="mt-5 text-5xl font-semibold tracking-[-0.06em] md:text-7xl">Report Builder</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-white/60">
          Analyst-controlled report preparation. Edit sections, complete checklist, approve and mark as client-ready.
        </p>
      </div>

      <ReportBuilder caseId={id} />
    </AnalystLayout>
  )
}
