import { useRouter } from 'next/router'
import RiskIntelligenceWorkspace from '@/components/analyst/RiskIntelligenceWorkspace'

export default function RiskIntelligenceObjectAliasPage() {
  const router = useRouter()
  const id = typeof router.query.id === 'string' ? router.query.id : null
  return <RiskIntelligenceWorkspace initialObjectId={id} />
}
