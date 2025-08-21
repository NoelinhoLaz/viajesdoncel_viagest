import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../../contexts/AuthContext'

// Rutas públicas que no requieren autenticación
const PUBLIC_ROUTES = ['/login', '/register', '/forgot-password']

export default function RouteGuard({ children }) {
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
      } else {
        // Usuario autorizado o ruta pública
        setAuthorized(true)
      }
    }
  }, [user, loading, router])

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return (
      <div className="min-h-screen bg-content-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yale-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando autenticación...</p>
        </div>
      </div>
    )
  }

  // Si no está autorizado, no renderizar nada (se redirigirá)
  if (!authorized) {
    return null
  }

  // Si está autorizado, renderizar el contenido
  return children
}
