import { storageStatus, testStorageConnection } from '@/lib/riskIntelligenceServerStore'

export default async function handler(req, res) {
  if (req.method === 'POST' || req.query.test === '1') {
    try {
      const result = await testStorageConnection()
      return res.status(result.ok ? 200 : 503).json(result)
    } catch (error) {
      return res.status(500).json({
        ok: false,
        storage: storageStatus(),
        error: error.message || 'Ошибка проверки Redis'
      })
    }
  }

  return res.status(200).json({ ok: true, storage: storageStatus() })
}
