import { useRouter } from 'next/router'
import Link from 'next/link'
import { AnalystLayout } from '@/components/analyst/AnalystUI'
import AIDraftView from '@/components/analyst/AIDraftView'
import { ArrowLeft, FileText } from 'lucide-react'

export default function AIDraftPage() {
  const router = useRouter()
  const id = router.query.id || 'HMD-2026-001'

  return (
    <AnalystLayout title="AI Draft">
      <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <Link href={`/analyst/cases/${id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-sky-200">
            <ArrowLeft className="h-4 w-4" />
            Back to case
          </Link>
          <h1 className="mt-5 text-5xl font-semibold tracking-[-0.06em] md:text-7xl">AI Report Draft</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/60">
            Review the structured AI draft, then move it to Report Builder for analyst approval.
          </p>
        </div>

        <Link href={`/analyst/report/${id}`} className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#D6A84F] px-6 py-4 font-semibold text-[#050816]">
          <FileText className="h-4 w-4" />
          Open Report Builder
        </Link>
      </div>

      <AIDraftView caseId={id} />
    </AnalystLayout>
  )
}
