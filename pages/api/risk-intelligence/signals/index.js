import { createRiskSignal } from '@/lib/riskIntelligenceStore'

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST')
      return res.status(405).json({ error: 'Метод не поддерживается.' })
    }

    const { object_id, title } = req.body || {}
    if (!object_id) return res.status(400).json({ error: 'Не найден объект проверки.' })
    if (!title?.trim()) return res.status(400).json({ error: 'Нужно указать название сигнала.' })

    const result = await createRiskSignal({ ...req.body, title: title.trim() })
    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Ошибка сервера.' })
  }
}
