import { generateAndSaveReport } from '@/lib/riskIntelligenceStore'

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST')
      return res.status(405).json({ error: 'Метод не поддерживается.' })
    }

    const { riskObject, signals = [], connections = [], notes = '' } = req.body || {}
    if (!riskObject?.id) return res.status(400).json({ error: 'Не найден объект проверки.' })

    const result = await generateAndSaveReport({ riskObject, signals, connections, notes })
    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Ошибка сервера.' })
  }
}
