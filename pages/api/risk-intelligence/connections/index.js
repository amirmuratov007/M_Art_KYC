import { createRiskConnection } from '@/lib/riskIntelligenceStore'

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST')
      return res.status(405).json({ error: 'Метод не поддерживается.' })
    }

    const { object_id, target_name } = req.body || {}
    if (!object_id) return res.status(400).json({ error: 'Не найден объект проверки.' })
    if (!target_name?.trim()) return res.status(400).json({ error: 'Нужно указать связанный объект.' })

    const result = await createRiskConnection({ ...req.body, target_name: target_name.trim() })
    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Ошибка сервера.' })
  }
}
