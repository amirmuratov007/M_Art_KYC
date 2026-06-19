import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function AnalystLogoutPage() {
  const router = useRouter()

  useEffect(() => {
    fetch('/api/analyst/logout', { method: 'POST' }).finally(() => {
      router.replace('/analyst/login')
    })
  }, [router])

  return (
    <main className="min-h-screen bg-[#07111f] px-4 py-10 text-white">
      <section className="mx-auto flex min-h-[70vh] max-w-md items-center justify-center">
        <div className="w-full rounded-[32px] border border-white/10 bg-white/[0.045] p-8 text-center shadow-2xl shadow-black/40">
          <p className="text-sm text-white/60">Выход из аналитической зоны...</p>
        </div>
      </section>
    </main>
  )
}
