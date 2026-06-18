import { createRiskObject, listRiskObjects } from '@/lib/riskIntelligenceStore'

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const result = await listRiskObjects()
      return res.status(200).json(result)
    }

    if (req.method === 'POST') {
      const result = await createRiskObject(req.body || {})
      return res.status(result.ok ? 200 : 400).json(result)
    }

    res.setHeader('Allow', ['GET', 'POST'])
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  } catch (error) {
    return res.status(200).json({ ok: true, mode: 'demo', objects: [], error: error?.message || 'Fallback mode' })
  }
}
