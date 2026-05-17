export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  const env = {
    NEXT_PUBLIC_SUPABASE_URL: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    SUPABASE_SERVICE_ROLE_KEY: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    TG_TOKEN: Boolean(process.env.TG_TOKEN),
    TG_CHAT_ID: Boolean(process.env.TG_CHAT_ID)
  }

  const ok = Object.values(env).every(Boolean)

  console.log('[HEIMDALL_API_HEALTH] check', env)

  return res.status(ok ? 200 : 500).json({
    ok,
    env,
    timestamp: new Date().toISOString()
  })
}
