import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    check_type: 'Проверка контрагента',
    comment: ''
  })

  const update = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const sendLead = async () => {
    setMessage('')

    if (!form.name || !form.phone) {
      setStatus('error')
      setMessage('Заполните имя и телефон')
      return
    }

    setStatus('loading')
    setMessage('Отправляем...')

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })

      const data = await response.json()

      if (!response.ok || !data.ok) {
        throw new Error('Ошибка отправки')
      }

      setStatus('success')
      setMessage('Заявка отправлена')

    } catch (e) {
      setStatus('error')
      setMessage('Не удалось отправить заявку')
    }
  }

  return (
    <>
      <Head>
        <title>HEIMDALL</title>
      </Head>

      <main className="min-h-screen bg-[#050816] text-white px-6 py-20">
        <div className="mx-auto max-w-5xl">

          <h1 className="text-6xl font-bold mb-10">
            HEIMDALL
          </h1>

          <div className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.04] p-8">

            <input
              name="name"
              value={form.name}
              onChange={update}
              placeholder="Имя"
              className="w-full rounded-2xl bg-black/20 px-5 py-4"
            />

            <input
              name="company"
              value={form.company}
              onChange={update}
              placeholder="Компания"
              className="w-full rounded-2xl bg-black/20 px-5 py-4"
            />

            <input
              name="email"
              value={form.email}
              onChange={update}
              placeholder="Email"
              className="w-full rounded-2xl bg-black/20 px-5 py-4"
            />

            <input
              name="phone"
              value={form.phone}
              onChange={update}
              placeholder="Телефон"
              className="w-full rounded-2xl bg-black/20 px-5 py-4"
            />

            <textarea
              name="comment"
              value={form.comment}
              onChange={update}
              placeholder="Комментарий"
              rows="5"
              className="w-full rounded-2xl bg-black/20 px-5 py-4"
            />

            <button
              type="button"
              onClick={sendLead}
              disabled={status === 'loading'}
              className="w-full rounded-2xl bg-sky-500 px-6 py-4 text-lg font-semibold"
            >
              {status === 'loading'
                ? 'Отправляем...'
                : 'Отправить заявку v2.1'}
            </button>

            {message && (
              <div className="rounded-2xl bg-white/10 p-4">
                {message}
              </div>
            )}

          </div>
        </div>
      </main>
    </>
  )
}
