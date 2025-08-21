import React from 'react'
import DashboardBuilder from '../components/dashboard/DashboardBuilder'
import { useRouteGuard } from '../hooks/useRouteGuard'
import LoadingSpinner from '../components/ui/LoadingSpinner'

export default function Home() {
  const { loading, authorized } = useRouteGuard()

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return <LoadingSpinner />
  }

  // Si no está autorizado, no mostrar nada (se redirigirá)
  if (!authorized) {
    return null
  }

  return (
    <div>
      {/* Div personalizado de ancho completo x 48px - ENCIMA DE TODO */}
      <div className="w-full h-12 flex items-center justify-between pl-2 pr-6 mt-2">
        <h1 className="text-3xl font-normal text-yale-blue font-raleway uppercase tracking-wider">Dashboard</h1>
        <span className="text-lg font-medium text-air-force-blue font-inter">Curso 2024/2025</span>
      </div>

      {/* Dashboard Personalizable */}
      <DashboardBuilder />
    </div>
  )
}