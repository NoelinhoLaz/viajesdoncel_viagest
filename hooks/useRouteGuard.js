import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../contexts/AuthContext'

// Rutas públicas que no requieren autenticación
const PUBLIC_ROUTES = ['/login', '/register', '/forgot-password']

export function useRouteGuard() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    // Verificar si la ruta actual es pública
    const isPublicRoute = PUBLIC_ROUTES.includes(router.pathname)
    
    if (!loading) {
      if (!user && !isPublicRoute) {
        // Usuario no autenticado en ruta protegida
        setAuthorized(false)
        router.push('/login')
      } else if (user && router.pathname === '/login') {
        // Usuario autenticado en login, redirigir al dashboard
        router.push('/grupos_listado')
      } else {
        // Usuario autorizado o ruta pública
        setAuthorized(true)
      }
    }
  }, [user, loading, router])

  return {
    user,
    loading,
    authorized,
    isAuthenticated: !!user
  }
}
