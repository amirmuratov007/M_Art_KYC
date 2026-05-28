
import Link from 'next/link'

const articles = [
  {
    title: 'Закупочное мошенничество и red flags',
    href: '/procurement-fraud-risks',
  },
  {
    title: 'Скрытые бенефициары компаний',
    href: '/hidden-beneficiaries',
  },
  {
    title: 'Проверка сотрудников и executive screening',
    href: '/employee-screening-risks',
  },
  {
    title: 'Due diligence перед сделкой',
    href: '/due-diligence-before-deal',
  },
]

export default function HeimdallRelatedArticles() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-5">
      <div className="max-w-4xl">
        <div className="text-sm uppercase tracking-[0.24em] text-[#F7D784]/80">
          Intelligence Journal
        </div>

        <h2 className="mt-5 text-5xl font-semibold tracking-[-0.06em] md:text-7xl">
          Аналитические материалы
        </h2>

        <p className="mt-7 max-w-3xl text-lg leading-8 text-white/64">
          Корпоративная разведка, due diligence,
          проверка контрагентов и intelligence research.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {articles.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-[36px] border border-white/10 bg-white/[0.045] p-8 backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:border-[#D6A84F]/35"
          >
            <div className="text-3xl font-semibold tracking-[-0.04em]">
              {item.title}
            </div>

            <div className="mt-8 text-sm uppercase tracking-[0.22em] text-sky-200">
              Читать материал
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
