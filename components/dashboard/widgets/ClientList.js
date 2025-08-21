import React from 'react'
import { Users, Phone, Mail, Calendar, ArrowRight } from 'lucide-react'

const ClientList = ({ widget }) => {
  // Datos de ejemplo - en una implementación real vendrían de una API
  const clients = [
    {
      id: 1,
      name: 'María García',
      email: 'maria.garcia@email.com',
      phone: '+34 600 123 456',
      lastContact: '2024-01-15',
      status: 'Activo',
      totalReservas: 3
    },
    {
      id: 2,
      name: 'Carlos López',
      email: 'carlos.lopez@email.com',
      phone: '+34 600 234 567',
      lastContact: '2024-01-10',
      status: 'Prospecto',
      totalReservas: 0
    },
    {
      id: 3,
      name: 'Ana Martínez',
      email: 'ana.martinez@email.com',
      phone: '+34 600 345 678',
      lastContact: '2024-01-12',
      status: 'Activo',
      totalReservas: 5
    },
    {
      id: 4,
      name: 'Luis Rodríguez',
      email: 'luis.rodriguez@email.com',
      phone: '+34 600 456 789',
      lastContact: '2024-01-08',
      status: 'Inactivo',
      totalReservas: 2
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Activo':
        return 'bg-green-100 text-green-800'
      case 'Prospecto':
        return 'bg-blue-100 text-blue-800'
      case 'Inactivo':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-4">
      {/* Header del widget */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
            <Users className="w-4 h-4 text-purple-600" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Clientes Recientes</h4>
            <p className="text-sm text-gray-500">{clients.length} clientes</p>
          </div>
        </div>
        <button className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center space-x-1">
          <span>Ver todos</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Lista de clientes */}
      <div className="space-y-3">
        {clients.map((client) => (
          <div key={client.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-purple-600">
                  {client.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h5 className="font-medium text-gray-900">{client.name}</h5>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span className="flex items-center space-x-1">
                    <Mail className="w-3 h-3" />
                    <span>{client.email}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Phone className="w-3 h-3" />
                    <span>{client.phone}</span>
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                {client.status}
              </span>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">{client.totalReservas} reservas</div>
                <div className="text-xs text-gray-500 flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(client.lastContact).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer con estadísticas */}
      <div className="pt-3 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-gray-900">
              {clients.filter(c => c.status === 'Activo').length}
            </div>
            <div className="text-xs text-gray-500">Activos</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-900">
              {clients.filter(c => c.status === 'Prospecto').length}
            </div>
            <div className="text-xs text-gray-500">Prospectos</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-900">
              {clients.reduce((sum, c) => sum + c.totalReservas, 0)}
            </div>
            <div className="text-xs text-gray-500">Total Reservas</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientList
