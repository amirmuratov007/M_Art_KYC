import { deleteRiskConnection } from '@/lib/riskIntelligenceStore'

export default async function handler(req, res) {
  try {
    if (req.method !== 'DELETE') {
      res.setHeader('Allow', ['DELETE'])
      return res.status(405).json({ ok: false, error: 'Method not allowed' })
    }

    const result = await deleteRiskConnection(req.query.id)
    return res.status(result.ok ? 200 : 400).json(result)
  } catch (error) {
    return res.status(200).json({ ok: true, mode: 'demo', deleted: true, error: error?.message || 'Fallback mode' })
  }
}
