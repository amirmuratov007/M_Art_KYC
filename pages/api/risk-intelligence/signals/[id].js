import { deleteRiskSignal } from '@/lib/riskIntelligenceStore'

export default async function handler(req, res) {
  try {
    if (req.method !== 'DELETE') {
      res.setHeader('Allow', 'DELETE')
      return res.status(405).json({ error: 'Метод не поддерживается.' })
    }

    const { id, object_id } = req.query
    const result = await deleteRiskSignal(id, object_id)
    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Ошибка сервера.' })
  }
}
