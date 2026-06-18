import { getRiskObjectBundle, updateRiskObjectStatus } from '@/lib/riskIntelligenceStore'

export default async function handler(req, res) {
  try {
    const { id } = req.query

    if (req.method === 'GET') {
      const result = await getRiskObjectBundle(id)
      return res.status(200).json(result)
    }

    if (req.method === 'PATCH') {
      const { status } = req.body || {}
      if (!status) return res.status(400).json({ error: 'Нужно указать статус.' })

      const result = await updateRiskObjectStatus(id, status)
      return res.status(200).json(result)
    }

    res.setHeader('Allow', 'GET, PATCH')
    return res.status(405).json({ error: 'Метод не поддерживается.' })
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Ошибка сервера.' })
  }
}
