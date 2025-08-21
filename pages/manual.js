import React from 'react'
import UserManual from '../components/ui/UserManual'

export default function Manual() {
  return (
    <div className="h-screen flex flex-col">
      {/* Div personalizado de ancho completo x 48px - ENCIMA DE TODO */}
      <div className="w-full h-12 flex items-center justify-between pl-2 pr-6 mt-2 bg-white border-b border-gray-200">
        <h1 className="text-3xl font-normal text-yale-blue font-raleway uppercase tracking-wider">Manual de Usuario</h1>
        <span className="text-lg font-medium text-air-force-blue font-inter">Curso 2024/2025</span>
      </div>

      {/* Componente del Manual */}
      <div className="flex-1">
        <UserManual />
      </div>
    </div>
  )
}
