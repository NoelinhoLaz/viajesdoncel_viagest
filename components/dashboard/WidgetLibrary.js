import React from 'react'
import { X, Users, BarChart3, TrendingUp, Calendar, Activity } from 'lucide-react'

const WidgetLibrary = ({ onClose, onAddWidget, onDragStart }) => {
  const widgetCategories = [
    {
      name: 'Métricas',
      widgets: [
        {
          type: 'metricsCard',
          name: 'Métricas Generales',
          description: 'KPIs principales del negocio',
          icon: Activity,
          color: 'bg-blue-500'
        },
        {
          type: 'statusCards',
          name: 'Cards de Estados',
          description: 'Resumen de estados importantes',
          icon: BarChart3,
          color: 'bg-green-500'
        }
      ]
    },
    {
      name: 'Clientes',
      widgets: [
        {
          type: 'clientList',
          name: 'Listado de Clientes',
          description: 'Últimos clientes y actividad',
          icon: Users,
          color: 'bg-purple-500'
        }
      ]
    },
    {
      name: 'Ventas',
      widgets: [
        {
          type: 'salesChart',
          name: 'Gráfica de Ventas',
          description: 'Tendencias y métricas de ventas',
          icon: TrendingUp,
          color: 'bg-orange-500'
        }
      ]
    },
    {
      name: 'Agenda',
      widgets: [
        {
          type: 'agendaWidget',
          name: 'Agenda y Tareas',
          description: 'Próximas citas y tareas pendientes',
          icon: Calendar,
          color: 'bg-indigo-500'
        }
      ]
    }
  ]

  const handleDragStart = (e, widgetType) => {
    onDragStart(e, widgetType)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-4/5 max-w-4xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-yale-blue">Biblioteca de Widgets</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
          <div className="space-y-8">
            {widgetCategories.map((category) => (
              <div key={category.name}>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{category.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.widgets.map((widget) => (
                    <div
                      key={widget.type}
                      className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                      draggable
                      onDragStart={(e) => handleDragStart(e, widget.type)}
                      onClick={() => onAddWidget(widget.type)}
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <div className={`w-10 h-10 ${widget.color} rounded-lg flex items-center justify-center`}>
                          <widget.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">{widget.name}</h4>
                          <p className="text-sm text-gray-500">{widget.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">Arrastra o haz clic para agregar</span>
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-600 text-center">
            Arrastra los widgets al dashboard o haz clic para agregarlos automáticamente
          </p>
        </div>
      </div>
    </div>
  )
}

export default WidgetLibrary
