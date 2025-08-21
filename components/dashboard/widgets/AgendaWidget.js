import React from 'react'
import { Calendar, Clock, MapPin, User, CheckSquare, ArrowRight } from 'lucide-react'

const AgendaWidget = ({ widget }) => {
  // Datos de ejemplo - en una implementación real vendrían de una API
  const agendaItems = [
    {
      id: 1,
      type: 'meeting',
      title: 'Reunión con Cliente García',
      time: '10:00',
      duration: '1h',
      location: 'Oficina Principal',
      client: 'María García',
      status: 'confirmed'
    },
    {
      id: 2,
      type: 'task',
      title: 'Preparar cotización París',
      time: '14:00',
      duration: '2h',
      priority: 'high',
      status: 'pending'
    },
    {
      id: 3,
      type: 'meeting',
      title: 'Llamada con Proveedor Hotel',
      time: '16:30',
      duration: '30min',
      location: 'Remoto',
      client: 'Hotel Plaza',
      status: 'confirmed'
    },
    {
      id: 4,
      type: 'task',
      title: 'Revisar reservas del mes',
      time: '17:00',
      duration: '1h',
      priority: 'medium',
      status: 'pending'
    }
  ]

  const getTypeIcon = (type) => {
    if (type === 'meeting') {
      return <Calendar className="w-4 h-4 text-blue-600" />
    } else {
      return <CheckSquare className="w-4 h-4 text-green-600" />
    }
  }

  const getTypeColor = (type) => {
    if (type === 'meeting') {
      return 'bg-blue-50 border-blue-200'
    } else {
      return 'bg-green-50 border-green-200'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status) => {
    if (status === 'confirmed') {
      return 'bg-green-100 text-green-800'
    } else {
      return 'bg-yellow-100 text-yellow-800'
    }
  }

  return (
    <div className="space-y-4">
      {/* Header del widget */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
            <Calendar className="w-4 h-4 text-indigo-600" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Agenda del Día</h4>
            <p className="text-sm text-gray-500">Próximas citas y tareas</p>
          </div>
        </div>
        <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center space-x-1">
          <span>Ver agenda completa</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Lista de agenda */}
      <div className="space-y-3">
        {agendaItems.map((item) => (
          <div key={item.id} className={`border rounded-lg p-3 ${getTypeColor(item.type)}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="mt-1">
                  {getTypeIcon(item.type)}
                </div>
                <div className="flex-1">
                  <h5 className="font-medium text-gray-900 mb-1">{item.title}</h5>
                  
                  <div className="flex items-center space-x-4 text-xs text-gray-600 mb-2">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{item.time} ({item.duration})</span>
                    </span>
                    
                    {item.type === 'meeting' && (
                      <>
                        <span className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{item.location}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <User className="w-3 h-3" />
                          <span>{item.client}</span>
                        </span>
                      </>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status === 'confirmed' ? 'Confirmado' : 'Pendiente'}
                    </span>
                    
                    {item.type === 'task' && (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                        {item.priority === 'high' ? 'Alta' : item.priority === 'medium' ? 'Media' : 'Baja'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer con resumen */}
      <div className="pt-3 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <div>
            <div className="text-lg font-semibold text-gray-900">
              {agendaItems.filter(i => i.type === 'meeting').length}
            </div>
            <div className="text-gray-500">Reuniones</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-900">
              {agendaItems.filter(i => i.type === 'task').length}
            </div>
            <div className="text-gray-500">Tareas</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-900">
              {agendaItems.filter(i => i.status === 'confirmed').length}
            </div>
            <div className="text-gray-500">Confirmados</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgendaWidget
