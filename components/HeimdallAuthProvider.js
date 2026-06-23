import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getSupabaseBrowserClient } from '@/lib/supabaseClient'

const HeimdallAuthContext = createContext({
  supabase: null,
  user: null,
  session: null,
  loading: true,
  authError: '',
  refreshSession: async () => null,
  signOut: async () => {}
})

export function HeimdallAuthProvider({ children }) {
  const supabase = useMemo(() => {
    try {
      return getSupabaseBrowserClient()
    } catch (error) {
      return null
    }
  }, [])

  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authError, setAuthError] = useState('')

  useEffect(() => {
    if (!supabase) {
      setAuthError('Кабинет временно недоступен. Мы настраиваем защищенный доступ для клиентов HEIMDALL.')
      setLoading(false)
      return undefined
    }

    let mounted = true

    async function initSession() {
      const { data, error } = await supabase.auth.getSession()

      if (!mounted) return

      if (error) {
        setAuthError(error.message || 'Не удалось получить сессию')
      } else {
        setAuthError('')
      }

      setSession(data?.session || null)
      setUser(data?.session?.user || null)
      setLoading(false)
    }

    initSession()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession || null)
      setUser(nextSession?.user || null)
      setLoading(false)
      setAuthError('')
    })

    return () => {
      mounted = false
      listener?.subscription?.unsubscribe()
    }
  }, [supabase])

  const value = useMemo(() => ({
    supabase,
    user,
    session,
    loading,
    authError,
    refreshSession: async () => {
      if (!supabase) return null

      const { data, error } = await supabase.auth.getSession()

      if (error) {
        setAuthError(error.message || 'Не удалось обновить сессию')
        return null
      }

      setSession(data?.session || null)
      setUser(data?.session?.user || null)
      setAuthError('')
      return data?.session || null
    },
    signOut: async () => {
      if (!supabase) return
      await supabase.auth.signOut()
      setSession(null)
      setUser(null)
    }
  }), [supabase, user, session, loading, authError])

  return (
    <HeimdallAuthContext.Provider value={value}>
      {children}
    </HeimdallAuthContext.Provider>
  )
}

export function useHeimdallAuth() {
  return useContext(HeimdallAuthContext)
}
