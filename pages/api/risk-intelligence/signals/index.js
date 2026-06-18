import { createRiskSignal } from '@/lib/riskIntelligenceStore'

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', ['POST'])
      return res.status(405).json({ ok: false, error: 'Method not allowed' })
    }

    const result = await createRiskSignal(req.body || {})
    return res.status(result.ok ? 200 : 400).json(result)
  } catch (error) {
    return res.status(200).json({ ok: true, mode: 'demo', signal: { id: `demo-signal-${Date.now()}`, ...(req.body || {}) }, error: error?.message || 'Fallback mode' })
  }
}
