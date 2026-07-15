import Link from 'next/link'
import { AnalystLayout } from '@/components/analyst/AnalystUI'
import { ArrowRight, BarChart3, Building2, ShieldCheck, UsersRound } from 'lucide-react'

const workspaces = [
  {
    title: 'Проверка Heimdall-SA',
    description: 'Сформировать справку по человеку, компании, документам и открытым источникам.',
    href: '/analyst/heimdall-sa',
    action: 'Начать проверку',
    icon: ShieldCheck,
    tone: 'border-sky-300/25 bg-sky-300/8 text-sky-200'
  },
  {
    title: 'CRM компаний',
    description: 'Карточки заказчиков, проверяемые люди и контрагенты, история работы по каждой компании.',
    href: '/admin-crm',
    action: 'Открыть CRM',
    icon: Building2,
    tone: 'border-emerald-300/20 bg-emerald-300/8 text-emerald-200'
  },
  {
    title: 'Клиентские кабинеты',
    description: 'Создание доступа клиентам, публикация статусов проверок и защищенных отчетов.',
    href: '/admin-client-checks',
    action: 'Управлять кабинетами',
    icon: UsersRound,
    tone: 'border-[#D6A84F]/25 bg-[#D6A84F]/8 text-[#F7D784]'
  },
  {
    title: 'Статистика сайта',
    description: 'Посещения, уникальные пользователи, популярные страницы и источники переходов.',
    href: '/analyst/analytics',
    action: 'Смотреть статистику',
    icon: BarChart3,
    tone: 'border-violet-300/20 bg-violet-300/8 text-violet-200'
  }
]

export default function AnalystDashboard() {
  return (
    <AnalystLayout title="Панель аналитика">
      <div className="mb-8">
        <div className="text-sm uppercase tracking-[0.22em] text-[#F7D784]/80">Рабочая зона HEIMDALL</div>
        <h1 className="mt-3 text-4xl font-semibold md:text-5xl">Панель аналитика</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-white/58">
          Только действующие инструменты и реальные данные. Демонстрационные кейсы и фиктивные показатели удалены.
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {workspaces.map(({ title, description, href, action, icon: Icon, tone }) => (
          <Link key={href} href={href} className="group border border-white/10 bg-white/[0.045] p-6 transition hover:border-white/25">
            <div className={`inline-flex h-11 w-11 items-center justify-center border ${tone}`}>
              <Icon className="h-5 w-5" />
            </div>
            <h2 className="mt-5 text-2xl font-semibold">{title}</h2>
            <p className="mt-3 min-h-[56px] text-sm leading-7 text-white/55">{description}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-200">
              {action}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </AnalystLayout>
  )
}
