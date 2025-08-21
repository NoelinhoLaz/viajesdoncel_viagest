import React from 'react'
import { CheckCircle, Clock, AlertTriangle, XCircle, ArrowRight } from 'lucide-react'

const StatusCards = ({ widget }) => {
  // Datos de ejemplo - en una implementación real vendrían de una API
  const statuses = [
    {
      id: 1,
      name: 'Reservas Confirmadas',
      value: '18',
      total: '24',
      percentage: 75,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      id: 2,
      name: 'Pendientes de Confirmación',
      value: '4',
      total: '24',
      percentage: 17,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    {
      id: 3,
      name: 'Cotizaciones Pendientes',
      value: '12',
      total: '20',
      percentage: 60,
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      id: 4,
      name: 'Cancelaciones',
      value: '2',
      total: '24',
      percentage: 8,
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    }
  ]

  const getStatusIcon = (status) => {
    const IconComponent = status.icon
    return <IconComponent className={`w-5 h-5 ${status.color}`} />
  }

  return (
    <div className="space-y-4">
      {/* Header del widget */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-green-600" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Estados del Sistema</h4>
            <p className="text-sm text-gray-500">Resumen de estados actuales</p>
          </div>
        </div>
        <button className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center space-x-1">
          <span>Ver detalles</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Grid de estados */}
      <div className="grid grid-cols-4 gap-3">
        {statuses.map((status) => (
          <div key={status.id} className={`border ${status.borderColor} rounded-lg p-3 ${status.bgColor}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                {getStatusIcon(status)}
                <span className="text-sm font-medium text-gray-700">{status.name}</span>
              </div>
            </div>
            
            <div className="flex items-end justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {status.value}
                </div>
                <div className="text-xs text-gray-500">
                  de {status.total}
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-semibold text-gray-900">
                  {status.percentage}%
                </div>
                <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${status.color.replace('text-', 'bg-')} rounded-full`}
                    style={{ width: `${status.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Resumen general */}
      <div className="pt-3 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">
            <span className="font-medium text-gray-900">Total de elementos:</span> 
            <span className="ml-1 text-gray-900">68</span>
          </span>
          <span className="text-green-600 font-medium">
            +15% vs mes anterior
          </span>
        </div>
      </div>
    </div>
  )
}

export default StatusCards
