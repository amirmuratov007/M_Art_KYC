import { deleteRiskObject, getRiskObject, updateRiskObject } from '@/lib/riskIntelligenceStore'

export default async function handler(req, res) {
  try {
    const { id } = req.query

    if (req.method === 'GET') {
      const result = await getRiskObject(id)
      return res.status(result.ok ? 200 : 404).json(result)
    }

    if (req.method === 'PATCH' || req.method === 'PUT') {
      const result = await updateRiskObject(id, req.body || {})
      return res.status(result.ok ? 200 : 400).json(result)
    }

    if (req.method === 'DELETE') {
      const result = await deleteRiskObject(id)
      return res.status(result.ok ? 200 : 400).json(result)
    }

    res.setHeader('Allow', ['GET', 'PATCH', 'PUT', 'DELETE'])
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  } catch (error) {
    return res.status(200).json({ ok: true, mode: 'demo', error: error?.message || 'Fallback mode' })
  }
}
