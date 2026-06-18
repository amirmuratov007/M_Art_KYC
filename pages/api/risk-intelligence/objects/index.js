import { createRiskObject, listRiskObjects } from '@/lib/riskIntelligenceStore'

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const result = await listRiskObjects()
      return res.status(200).json(result)
    }

    if (req.method === 'POST') {
      const { name, object_type, description, source_request_id } = req.body || {}
      if (!name?.trim()) return res.status(400).json({ error: 'Нужно указать название объекта.' })

      const result = await createRiskObject({ name: name.trim(), object_type, description, source_request_id })
      return res.status(200).json(result)
    }

    res.setHeader('Allow', 'GET, POST')
    return res.status(405).json({ error: 'Метод не поддерживается.' })
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Ошибка сервера.' })
  }
}
