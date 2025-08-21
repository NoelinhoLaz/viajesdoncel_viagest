import React from 'react'
import { TrendingUp, TrendingDown, Users, Calendar, DollarSign, Target } from 'lucide-react'

const MetricsCard = ({ widget }) => {
  // Datos de ejemplo - en una implementación real vendrían de una API
  const metrics = [
    {
      id: 1,
      name: 'Reservas del Mes',
      value: '24',
      change: '+12%',
      changeType: 'increase',
      icon: Calendar,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      id: 2,
      name: 'Ingresos del Mes',
      value: '€12,450',
      change: '+8.5%',
      changeType: 'increase',
      icon: DollarSign,
      color: 'bg-green-500',
      bgColor: 'bg-green-50'
    },
    {
      id: 3,
      name: 'Clientes Activos',
      value: '156',
      change: '+5%',
      changeType: 'increase',
      icon: Users,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      id: 4,
      name: 'Objetivo Mensual',
      value: '78%',
      change: '-2%',
      changeType: 'decrease',
      icon: Target,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50'
    }
  ]

  const getChangeIcon = (changeType) => {
    if (changeType === 'increase') {
      return <TrendingUp className="w-4 h-4 text-green-500" />
    } else {
      return <TrendingDown className="w-4 h-4 text-red-500" />
    }
  }

  const getChangeColor = (changeType) => {
    if (changeType === 'increase') {
      return 'text-green-600'
    } else {
      return 'text-red-600'
    }
  }

  return (
    <div className="space-y-4">
      {/* Header del widget */}
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
          <Target className="w-4 h-4 text-blue-600" />
        </div>
        <div>
          <h4 className="font-medium text-gray-900">Métricas del Mes</h4>
          <p className="text-sm text-gray-500">Resumen de KPIs principales</p>
        </div>
      </div>

      {/* Grid de métricas */}
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric) => (
          <div key={metric.id} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${metric.bgColor} rounded-lg flex items-center justify-center`}>
                <metric.icon className={`w-5 h-5 ${metric.color.replace('bg-', 'text-')}`} />
              </div>
              <div className="flex items-center space-x-1">
                {getChangeIcon(metric.changeType)}
                <span className={`text-sm font-medium ${getChangeColor(metric.changeType)}`}>
                  {metric.change}
                </span>
              </div>
            </div>
            
            <div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {metric.value}
              </div>
              <div className="text-sm text-gray-600">
                {metric.name}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Resumen general */}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <span className="font-medium text-gray-900">Tendencia general:</span> 
            <span className="text-green-600 ml-1">+6.4%</span>
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Ver reporte completo
          </button>
        </div>
      </div>
    </div>
  )
}

export default MetricsCard
