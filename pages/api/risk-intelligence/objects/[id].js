import { deleteObject, getObject, saveObject, storageStatus } from '@/lib/riskIntelligenceServerStore'

export default async function handler(req, res) {
  const id = String(req.query.id || '')

  try {
    if (!id) return res.status(400).json({ ok: false, error: 'Не указан id объекта' })

    if (req.method === 'GET') {
      const data = await getObject(id)
      if (!data.item) return res.status(404).json({ ok: false, error: 'Объект не найден', storage: storageStatus() })
      return res.status(200).json({ ok: true, ...data, storage: storageStatus() })
    }

    if (req.method === 'PUT') {
      const object = req.body?.object || req.body?.item || {}
      const item = await saveObject({ item: { ...object, id }, rawText: req.body?.rawText })
      return res.status(200).json({ ok: true, object: item, storage: storageStatus() })
    }

    if (req.method === 'DELETE') {
      await deleteObject(id)
      return res.status(200).json({ ok: true, storage: storageStatus() })
    }

    res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
    return res.status(405).json({ ok: false, error: 'Метод не поддерживается' })
  } catch (error) {
    const status = error.code === 'KV_NOT_CONFIGURED' ? 503 : 500
    return res.status(status).json({ ok: false, error: error.message || 'Ошибка серверного хранилища', storage: storageStatus() })
  }
}
