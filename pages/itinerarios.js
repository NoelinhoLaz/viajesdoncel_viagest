import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { ArrowLeft, Plus, Search, Filter, Calendar, MapPin, Users, DollarSign, Clock, CheckCircle, XCircle, AlertCircle, Edit, Trash2, Eye, Download, Share2, Plane, Bus, Train, Car, Ship } from 'lucide-react'
import Select from 'react-select'

export default function Itinerarios() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedEstado, setSelectedEstado] = useState(null)
  const [selectedDestino, setSelectedDestino] = useState(null)
  const [selectedDuracion, setSelectedDuracion] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  // Datos de ejemplo
  const itinerariosData = [
    {
      id: 1,
      nombre: 'Ruta del Vino en La Rioja',
      destino: 'La Rioja, España',
      duracion: '3 días',
      precio: 450,
      estado: 'Activo',
      capacidad: 25,
      proximaSalida: '2024-02-15',
      transporte: 'Bus',
      reservas: 18
    },
    {
      id: 2,
      nombre: 'Costa Brava Completa',
      destino: 'Girona, España',
      duracion: '5 días',
      precio: 780,
      estado: 'Activo',
      capacidad: 30,
      proximaSalida: '2024-02-20',
      transporte: 'Bus',
      reservas: 25
    },
    {
      id: 3,
      nombre: 'Madrid Cultural',
      destino: 'Madrid, España',
      duracion: '2 días',
      precio: 320,
      estado: 'Borrador',
      capacidad: 20,
      proximaSalida: '2024-03-01',
      transporte: 'Tren',
      reservas: 0
    },
    {
      id: 4,
      nombre: 'Barcelona Modernista',
      destino: 'Barcelona, España',
      duracion: '4 días',
      precio: 650,
      estado: 'Activo',
      capacidad: 28,
      proximaSalida: '2024-02-25',
      transporte: 'Avión',
      reservas: 22
    },
    {
      id: 5,
      nombre: 'Andalucía Clásica',
      destino: 'Sevilla, España',
      duracion: '6 días',
      precio: 890,
      estado: 'Inactivo',
      capacidad: 35,
      proximaSalida: '2024-04-10',
      transporte: 'Bus',
      reservas: 15
    }
  ]

  // Opciones para filtros
  const estadoOptions = [
    { value: 'activo', label: 'Activo' },
    { value: 'borrador', label: 'Borrador' },
    { value: 'inactivo', label: 'Inactivo' }
  ]

  const destinoOptions = [
    { value: 'la-rioja', label: 'La Rioja, España' },
    { value: 'girona', label: 'Girona, España' },
    { value: 'madrid', label: 'Madrid, España' },
    { value: 'barcelona', label: 'Barcelona, España' },
    { value: 'sevilla', label: 'Sevilla, España' }
  ]

  const duracionOptions = [
    { value: '1-2', label: '1-2 días' },
    { value: '3-4', label: '3-4 días' },
    { value: '5-7', label: '5-7 días' },
    { value: '8+', label: '8+ días' }
  ]

  // Estilos para react-select
  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'white',
      borderColor: '#d1d5db',
      borderRadius: '0.5rem',
      minHeight: '40px',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#1e40af'
      }
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#1e40af' : state.isFocused ? '#dbeafe' : 'white',
      color: state.isSelected ? 'white' : '#374151',
      '&:hover': {
        backgroundColor: state.isSelected ? '#1e40af' : '#dbeafe'
      }
    })
  }

  // Funciones helper
  const getEstadoColor = (estado) => {
    switch (estado.toLowerCase()) {
      case 'activo':
        return 'bg-green-100 text-green-800'
      case 'borrador':
        return 'bg-yellow-100 text-yellow-800'
      case 'inactivo':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTransporteIcon = (transporte) => {
    switch (transporte.toLowerCase()) {
      case 'avión':
        return <Plane size={16} />
      case 'bus':
        return <Bus size={16} />
      case 'tren':
        return <Train size={16} />
      case 'coche':
        return <Car size={16} />
      case 'barco':
        return <Ship size={16} />
      default:
        return <Bus size={16} />
    }
  }

  // Filtrado de datos
  const filteredData = itinerariosData.filter(item => {
    const matchesSearch = item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.destino.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesEstado = !selectedEstado || item.estado.toLowerCase() === selectedEstado.value
    const matchesDestino = !selectedDestino || item.destino.toLowerCase().includes(selectedDestino.label.toLowerCase())
    const matchesDuracion = !selectedDuracion || item.duracion.includes(selectedDuracion.label.split(' ')[0])

    return matchesSearch && matchesEstado && matchesDestino && matchesDuracion
  })

  // Navegación
  const handleNuevoItinerario = () => {
    router.push('/itinerario')
  }

  // Paginación
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = filteredData.slice(startIndex, endIndex)

  // Estadísticas
  const totalItinerarios = itinerariosData.length
  const itinerariosActivos = itinerariosData.filter(item => item.estado === 'Activo').length
  const capacidadTotal = itinerariosData.reduce((sum, item) => sum + item.capacidad, 0)
  const proximasSalidas = itinerariosData.filter(item => item.estado === 'Activo').length

  return (
    <div className="min-h-screen bg-content-bg">
      {/* Header */}
      <div className="bg-white-custom shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.history.back()}
                className="text-gray-600 hover:text-yale-blue transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-yale-blue">ITINERARIOS</h1>
                <p className="text-sm text-gray-600 mt-1">Gestión de itinerarios de viaje</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={handleNuevoItinerario}
                className="bg-yale-blue text-white px-6 py-2 rounded-lg hover:bg-air-force-blue transition-colors text-sm font-medium flex items-center"
              >
                <Plus size={16} className="mr-2" />
                Nuevo Itinerario
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navegación superior */}
      <div className="bg-white-custom border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 py-3">
            <a href="/itinerarios" className="text-yale-blue border-b-2 border-yale-blue px-1 py-2 text-sm font-medium">
              Itinerarios
            </a>
            <a href="/itinerarios_listado" className="text-gray-500 hover:text-gray-700 px-1 py-2 text-sm font-medium">
              Listado
            </a>
            <a href="/itinerarios_calendario" className="text-gray-500 hover:text-gray-700 px-1 py-2 text-sm font-medium">
              Calendario
            </a>
            <a href="/itinerarios_ajustes" className="text-gray-500 hover:text-gray-700 px-1 py-2 text-sm font-medium">
              Ajustes
            </a>
          </nav>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white-custom rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MapPin className="w-6 h-6 text-yale-blue" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Itinerarios</p>
                <p className="text-2xl font-bold text-gray-900">{totalItinerarios}</p>
              </div>
            </div>
          </div>

          <div className="bg-white-custom rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Destinos Activos</p>
                <p className="text-2xl font-bold text-gray-900">{itinerariosActivos}</p>
              </div>
            </div>
          </div>

          <div className="bg-white-custom rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Capacidad Total</p>
                <p className="text-2xl font-bold text-gray-900">{capacidadTotal}</p>
              </div>
            </div>
          </div>

          <div className="bg-white-custom rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Próximas Salidas</p>
                <p className="text-2xl font-bold text-gray-900">{proximasSalidas}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros y búsqueda */}
        <div className="bg-white-custom rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Búsqueda</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar itinerarios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yale-blue focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
              <Select
                value={selectedEstado}
                onChange={setSelectedEstado}
                options={estadoOptions}
                placeholder="Todos los estados"
                styles={customSelectStyles}
                isClearable
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Destino</label>
              <Select
                value={selectedDestino}
                onChange={setSelectedDestino}
                options={destinoOptions}
                placeholder="Todos los destinos"
                styles={customSelectStyles}
                isClearable
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duración</label>
              <Select
                value={selectedDuracion}
                onChange={setSelectedDuracion}
                options={duracionOptions}
                placeholder="Todas las duraciones"
                styles={customSelectStyles}
                isClearable
              />
            </div>
          </div>
        </div>

        {/* Tabla de itinerarios */}
        <div className="bg-white-custom rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Itinerario
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Destino
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duración
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Precio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transporte
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentData.map((itinerario) => (
                  <tr key={itinerario.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{itinerario.nombre}</div>
                        <div className="text-sm text-gray-500">ID: {itinerario.id}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{itinerario.destino}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{itinerario.duracion}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">€{itinerario.precio}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getEstadoColor(itinerario.estado)}`}>
                        {itinerario.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        {getTransporteIcon(itinerario.transporte)}
                        <span className="ml-2">{itinerario.transporte}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-yale-blue hover:text-air-force-blue">
                          <Eye size={16} />
                        </button>
                        <button className="text-green-600 hover:text-green-800">
                          <Edit size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Anterior
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Siguiente
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Mostrando <span className="font-medium">{startIndex + 1}</span> a{' '}
                    <span className="font-medium">{Math.min(endIndex, filteredData.length)}</span> de{' '}
                    <span className="font-medium">{filteredData.length}</span> resultados
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Anterior
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === page
                            ? 'z-10 bg-yale-blue border-yale-blue text-white'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Siguiente
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
