import React, { useState } from 'react'
import { List, Kanban, LayoutDashboard, Settings, MapPin } from 'lucide-react'

export default function Grupos() {
  return (
    <div>
      {/* Div personalizado de ancho completo x 48px - ENCIMA DE TODO */}
      <div className="w-full h-12 flex items-center justify-between pl-2 pr-6 mt-2 mb-4">
        <h1 className="text-3xl font-normal text-yale-blue font-raleway uppercase tracking-wider">Dashboard de Grupos</h1>
        <span className="text-lg font-medium text-air-force-blue font-inter">Curso 2024/2025</span>
      </div>

                        {/* Navegación y Botón Nuevo Grupo */}
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <button
            onClick={() => window.location.href = '/'}
            className="flex items-center space-x-2 p-2 text-yale-blue bg-blue-50 rounded-lg transition-colors"
            title="Dashboard"
          >
            <LayoutDashboard size={18} />
            <span className="text-sm font-medium">Dashboard</span>
          </button>

          <button
            onClick={() => window.location.href = '/grupos_listado'}
            className="flex items-center space-x-2 p-2 text-gray-600 hover:text-yale-blue transition-colors"
            title="Listado"
          >
            <List size={18} />
            <span className="text-sm font-medium">Listado</span>
          </button>
                                <button
                        onClick={() => window.location.href = '/grupos_tablero'}
                        className="flex items-center space-x-2 p-2 text-gray-600 hover:text-yale-blue transition-colors"
                        title="Tablero"
                      >
                        <Kanban size={18} />
                        <span className="text-sm font-medium">Tablero</span>
                      </button>
                                <button
                        onClick={() => window.location.href = '/grupos_visitas'}
                        className="flex items-center space-x-2 p-2 text-gray-600 hover:text-yale-blue transition-colors"
                        title="Visitas"
                      >
                        <MapPin size={18} />
                        <span className="text-sm font-medium">Visitas</span>
                      </button>
                                <button
            onClick={() => window.location.href = '/grupos_ajustes'}
            className="flex items-center space-x-2 p-2 text-gray-600 hover:text-yale-blue transition-colors"
            title="Ajustes"
          >
            <Settings size={18} />
            <span className="text-sm font-medium">Ajustes</span>
          </button>
        </div>
                            <button className="bg-yale-blue text-white px-4 py-1 rounded-lg hover:bg-air-force-blue transition-colors text-sm">
                      + Nuevo Grupo
                    </button>
      </div>

      {/* Dashboard de Centros */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Tarjeta de Resumen */}
        <div className="bg-white-custom rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-yale-blue mb-4">Resumen General</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Centros:</span>
              <span className="text-2xl font-bold text-yale-blue">156</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Activos:</span>
              <span className="text-xl font-semibold text-green-600">142</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">En Seguimiento:</span>
              <span className="text-xl font-semibold text-orange-600">28</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Nuevos este mes:</span>
              <span className="text-xl font-semibold text-blue-600">12</span>
            </div>
          </div>
        </div>

        {/* Tarjeta de Rendimiento */}
        <div className="bg-white-custom rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-yale-blue mb-4">Rendimiento</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tasa de Conversión:</span>
              <span className="text-2xl font-bold text-green-600">68%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tiempo Promedio:</span>
              <span className="text-xl font-semibold text-blue-600">45 días</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Valor Promedio:</span>
              <span className="text-xl font-semibold text-purple-600">€32,450</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Satisfacción:</span>
              <span className="text-xl font-semibold text-yellow-600">4.8/5</span>
            </div>
          </div>
        </div>

        {/* Tarjeta de Actividad Reciente */}
        <div className="bg-white-custom rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-yale-blue mb-4">Actividad Reciente</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                      <span className="text-sm text-gray-700">Nuevo grupo registrado: IES La Laguna</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Reunión programada: Colegio San José</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Propuesta enviada: Instituto María Zambrano</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Contrato firmado: Colegio Nuestra Señora</span>
            </div>
          </div>
        </div>

        {/* Tarjeta de Distribución Geográfica */}
        <div className="bg-white-custom rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-yale-blue mb-4">Distribución Geográfica</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Madrid:</span>
              <span className="font-semibold text-gray-800">45 centros</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Barcelona:</span>
              <span className="font-semibold text-gray-800">32 centros</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Valencia:</span>
              <span className="font-semibold text-gray-800">28 centros</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Sevilla:</span>
              <span className="font-semibold text-gray-800">25 centros</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Otros:</span>
              <span className="font-semibold text-gray-800">26 centros</span>
            </div>
          </div>
        </div>

        {/* Tarjeta de Tipos de Centro */}
        <div className="bg-white-custom rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-yale-blue mb-4">Tipos de Centro</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Colegios Privados:</span>
              <span className="font-semibold text-gray-800">67</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Institutos Públicos:</span>
              <span className="font-semibold text-gray-800">52</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Colegios Concertados:</span>
              <span className="font-semibold text-gray-800">31</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Centros Internacionales:</span>
              <span className="font-semibold text-gray-800">6</span>
            </div>
          </div>
        </div>

        {/* Tarjeta de Próximas Acciones */}
        <div className="bg-white-custom rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-yale-blue mb-4">Próximas Acciones</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Hoy: Llamada de seguimiento - IES Francisco Ayala</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Mañana: Reunión - Colegio San Agustín</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Esta semana: Envío propuesta - Instituto María Zambrano</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Próximo mes: Evaluación trimestral</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
