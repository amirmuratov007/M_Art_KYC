import { storageStatus } from '@/lib/riskIntelligenceServerStore'

export default function handler(req, res) {
  res.status(200).json({ ok: true, storage: storageStatus() })
}
