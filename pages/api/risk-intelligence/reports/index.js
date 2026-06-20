import { listReports, saveReport, storageStatus } from '@/lib/riskIntelligenceServerStore'

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const reports = await listReports(String(req.query.objectId || ''))
      return res.status(200).json({ ok: true, reports, storage: storageStatus() })
    }

    if (req.method === 'POST') {
      const report = await saveReport({
        objectId: req.body?.objectId,
        objectName: req.body?.objectName,
        report: req.body?.report,
        riskScore: req.body?.riskScore,
        riskLevel: req.body?.riskLevel
      })
      return res.status(200).json({ ok: true, report, storage: storageStatus() })
    }

    res.setHeader('Allow', ['GET', 'POST'])
    return res.status(405).json({ ok: false, error: 'Метод не поддерживается' })
  } catch (error) {
    const status = error.code === 'KV_NOT_CONFIGURED' ? 503 : 500
    return res.status(status).json({ ok: false, error: error.message || 'Ошибка серверного хранилища', storage: storageStatus() })
  }
}
