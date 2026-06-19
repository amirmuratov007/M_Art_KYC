import { useEffect } from 'react'
import { useRouter } from 'next/router'
import RiskIntelligenceWorkspace from '@/components/analyst/RiskIntelligenceWorkspace'

export default function NewRiskIntelligenceObjectPage() {
  const router = useRouter()
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', '/analyst/risk-intelligence')
    }
  }, [router])
  return <RiskIntelligenceWorkspace />
}
