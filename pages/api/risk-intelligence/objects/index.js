import { listObjects, saveObject, storageStatus } from '@/lib/riskIntelligenceServerStore'

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const objects = await listObjects()
      return res.status(200).json({ ok: true, objects, storage: storageStatus() })
    }

    if (req.method === 'POST') {
      const item = await saveObject({ item: req.body?.object || req.body?.item, rawText: req.body?.rawText })
      return res.status(200).json({ ok: true, object: item, storage: storageStatus() })
    }

    res.setHeader('Allow', ['GET', 'POST'])
    return res.status(405).json({ ok: false, error: 'Метод не поддерживается' })
  } catch (error) {
    const status = error.code === 'KV_NOT_CONFIGURED' ? 503 : 500
    return res.status(status).json({ ok: false, error: error.message || 'Ошибка серверного хранилища', storage: storageStatus() })
  }
}
