import { getSupabaseAdmin } from '@/lib/supabaseAdmin'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    const supabase = getSupabaseAdmin()
    const { user_id, contact } = req.query || {}

    let checksQuery = supabase
      .from('client_checks')
      .select('*')
      .order('created_at', { ascending: false })

    if (user_id) {
      checksQuery = checksQuery.eq('user_id', user_id)
    }

    const { data: checks, error: checksError } = await checksQuery

    let leadsQuery = supabase
      .from('heimdall_leads')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20)

    if (contact) {
      leadsQuery = leadsQuery.ilike('contact', `%${contact}%`)
    }

    const { data: leads, error: leadsError } = await leadsQuery

    const safeChecks = checksError ? [] : checks || []
    const safeLeads = leadsError ? [] : leads || []

    return res.status(200).json({
      ok: true,
      source: 'heimdall-client-dashboard',
      updated_at: new Date().toISOString(),
      checks: safeChecks,
      leads: safeLeads,
      errors: {
        checks: checksError ? checksError.message : null,
        leads: leadsError ? leadsError.message : null
      },
      summary: {
        checks_total: safeChecks.length,
        leads_total: safeLeads.length,
        active_checks: safeChecks.filter((item) => ['new', 'in_progress', 'review'].includes(item.status)).length,
        completed_checks: safeChecks.filter((item) => item.status === 'completed').length
      }
    })
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error.message || 'Dashboard API failed'
    })
  }
}
