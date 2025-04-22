import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '@/supabaseClient'

interface ProtectedRouteProps {
  children: JSX.Element
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      setIsAuthenticated(!!data.session)
    }
    getSession()
  }, [])

  if (isAuthenticated === null) {
    return <div className="text-center mt-10">Checking authentication...</div>
  }

  return isAuthenticated ? children : <Navigate to="/login" />
}