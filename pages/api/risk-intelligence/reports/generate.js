import { generateRiskReport } from '@/lib/riskIntelligenceStore'

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', ['POST'])
      return res.status(405).json({ ok: false, error: 'Method not allowed' })
    }

    const objectId = req.body?.object_id || req.body?.id
    if (!objectId) return res.status(400).json({ ok: false, error: 'Missing object_id' })

    const result = await generateRiskReport(objectId)
    return res.status(result.ok ? 200 : 400).json(result)
  } catch (error) {
    return res.status(200).json({ ok: true, mode: 'demo', report: { id: `demo-report-${Date.now()}`, report_text: 'Демо-отчет. Supabase временно недоступен.' }, error: error?.message || 'Fallback mode' })
  }
}
