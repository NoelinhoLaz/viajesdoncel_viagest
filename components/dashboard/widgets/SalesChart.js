import React from 'react'
import { TrendingUp, Calendar, DollarSign, ArrowRight } from 'lucide-react'

const SalesChart = ({ widget }) => {
  // Datos de ejemplo - en una implementación real vendrían de una API
  const salesData = [
    { month: 'Ene', sales: 8500, target: 10000, color: 'bg-blue-500' },
    { month: 'Feb', sales: 9200, target: 10000, color: 'bg-blue-500' },
    { month: 'Mar', sales: 12450, target: 10000, color: 'bg-green-500' },
    { month: 'Abr', sales: 11800, target: 10000, color: 'bg-green-500' },
    { month: 'May', sales: 13200, target: 10000, color: 'bg-green-500' },
    { month: 'Jun', sales: 14100, target: 10000, color: 'bg-green-500' }
  ]

  const maxSales = Math.max(...salesData.map(d => d.sales))
  const maxTarget = Math.max(...salesData.map(d => d.target))
  const maxValue = Math.max(maxSales, maxTarget)

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(value)
  }

  const getBarHeight = (value) => {
    return (value / maxValue) * 100
  }

  const getBarColor = (sales, target) => {
    return sales >= target ? 'bg-green-500' : 'bg-blue-500'
  }

  return (
    <div className="space-y-4">
      {/* Header del widget */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-orange-600" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Ventas Mensuales</h4>
            <p className="text-sm text-gray-500">Tendencias y objetivos</p>
          </div>
        </div>
        <button className="text-sm text-orange-600 hover:text-orange-700 font-medium flex items-center space-x-1">
          <span>Ver reporte</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Resumen de métricas */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <DollarSign className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-blue-600 font-medium">Ventas Totales</span>
          </div>
          <div className="text-xl font-bold text-blue-900">
            {formatCurrency(salesData.reduce((sum, d) => sum + d.sales, 0))}
          </div>
        </div>
        <div className="bg-green-50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Calendar className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-600 font-medium">Promedio Mensual</span>
          </div>
          <div className="text-xl font-bold text-green-900">
            {formatCurrency(Math.round(salesData.reduce((sum, d) => sum + d.sales, 0) / salesData.length))}
          </div>
        </div>
      </div>

      {/* Gráfica de barras */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Comparativa mensual</span>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span>Ventas</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-300 rounded"></div>
              <span>Objetivo</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-end justify-between h-32">
          {salesData.map((data, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              {/* Barra de ventas */}
              <div className="relative">
                <div 
                  className={`w-8 ${getBarColor(data.sales, data.target)} rounded-t transition-all duration-300`}
                  style={{ height: `${getBarHeight(data.sales)}%` }}
                />
                {/* Barra de objetivo */}
                <div 
                  className="w-8 bg-gray-300 rounded-t absolute bottom-0 opacity-50"
                  style={{ height: `${getBarHeight(data.target)}%` }}
                />
              </div>
              
              {/* Mes */}
              <span className="text-xs text-gray-600 font-medium">{data.month}</span>
              
              {/* Valor */}
              <div className="text-xs text-gray-500 text-center">
                {formatCurrency(data.sales)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer con análisis */}
      <div className="pt-3 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">
            <span className="font-medium text-gray-900">Tendencia:</span> 
            <span className="text-green-600 ml-1">+18.2% vs año anterior</span>
          </span>
          <span className="text-green-600 font-medium">
            {salesData.filter(d => d.sales >= d.target).length}/{salesData.length} objetivos cumplidos
          </span>
        </div>
      </div>
    </div>
  )
}

export default SalesChart
