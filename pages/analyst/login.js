import { useRouter } from 'next/router'
import { useState } from 'react'

export default function AnalystLoginPage() {
  const router = useRouter()
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/analyst/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password }),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok || !data.ok) {
        throw new Error(data.error || 'Не удалось войти.')
      }
      const next = typeof router.query.next === 'string' && router.query.next.startsWith('/analyst')
        ? router.query.next
        : '/analyst/risk-intelligence'
      router.replace(next)
    } catch (err) {
      setError(err.message || 'Не удалось войти.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#07111f] px-4 py-10 text-white">
      <section className="mx-auto flex min-h-[80vh] max-w-md items-center justify-center">
        <div className="w-full rounded-[32px] border border-white/10 bg-white/[0.045] p-8 shadow-2xl shadow-black/40">
          <div className="mb-7">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-amber-300">HEIMDALL</p>
            <h1 className="text-3xl font-semibold">Вход в аналитическую зону</h1>
            <p className="mt-3 text-sm leading-6 text-white/60">
              Раздел закрыт. Без авторизации внутренние проверки и API риск-аналитики недоступны.
            </p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm text-white/70">Логин</span>
              <input
                value={login}
                onChange={(event) => setLogin(event.target.value)}
                autoComplete="username"
                className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white outline-none transition focus:border-amber-300/70"
                placeholder="Введите логин"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-white/70">Пароль</span>
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                autoComplete="current-password"
                className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white outline-none transition focus:border-amber-300/70"
                placeholder="Введите пароль"
              />
            </label>

            {error ? (
              <div className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-amber-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Проверяю доступ...' : 'Войти'}
            </button>
          </form>

          <p className="mt-5 text-xs leading-5 text-white/40">
            Сессия хранится в защищенной httpOnly cookie. Прямые ссылки на /analyst/* без входа будут перенаправлены сюда.
          </p>
        </div>
      </section>
    </main>
  )
}
