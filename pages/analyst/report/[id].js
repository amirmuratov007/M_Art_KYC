import { useRouter } from 'next/router'
import Link from 'next/link'
import { AnalystLayout } from '@/components/analyst/AnalystUI'
import ReportBuilder from '@/components/analyst/ReportBuilder'
import { ArrowLeft } from 'lucide-react'

export default function ReportBuilderPage() {
  const router = useRouter()
  const id = router.query.id || 'HMD-2026-001'

  return (
    <AnalystLayout title="Сборка отчета">
      <div className="mb-8">
        <Link href={`/analyst/ai/${id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-sky-200">
          <ArrowLeft className="h-4 w-4" />
          Назад к черновику ИИ
        </Link>

        <h1 className="mt-5 text-5xl font-semibold tracking-[-0.06em] md:text-7xl">Сборка отчета</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-white/60">
          Подготовка отчета под контролем аналитика: редактирование разделов, чек-лист, согласование и отметка готовности для клиента.
        </p>
      </div>

      <ReportBuilder caseId={id} />
    </AnalystLayout>
  )
}
