import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ArrowLeft, Plus, Search, Filter, Calendar, MapPin, Users, DollarSign, Clock, CheckCircle, XCircle, AlertCircle, Edit, Trash2, Eye, Download, Share2, Plane, Bus, Train, Car, Ship, Globe, Lock } from 'lucide-react'
import Select from 'react-select'
import { getAllItinerarios, deleteItinerario } from '../lib/supabase/itinerarios'

export default function Itinerarios() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedEstado, setSelectedEstado] = useState(null)
  const [selectedDestino, setSelectedDestino] = useState(null)
  const [selectedDuracion, setSelectedDuracion] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  // Estado para datos reales
  const [itinerariosData, setItinerariosData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Cargar itinerarios desde Supabase
  useEffect(() => {
    const cargarItinerarios = async () => {
      try {
        setLoading(true)
        const result = await getAllItinerarios()
        if (result.success) {
          setItinerariosData(result.data || [])
        } else {
          setError(result.error || 'Error al cargar itinerarios')
        }
      } catch (error) {
        setError('Error al conectar con la base de datos')
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    cargarItinerarios()
  }, [])

  // Función para eliminar itinerario
  const handleDeleteItinerario = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este itinerario?')) {
      try {
        const result = await deleteItinerario(id)
        if (result.success) {
          // Recargar itinerarios
          const resultReload = await getAllItinerarios()
          if (resultReload.success) {
            setItinerariosData(resultReload.data || [])
          }
        } else {
          alert(`Error al eliminar: ${result.error}`)
        }
      } catch (error) {
        alert('Error al eliminar el itinerario')
        console.error('Error:', error)
      }
    }
  }

  // Función para ver itinerario
  const handleViewItinerario = (itinerario) => {
    if (itinerario.publico && itinerario.url_publica) {
      window.open(`/${itinerario.url_publica}`, '_blank')
    } else {
      alert('Este itinerario no está disponible públicamente')
    }
  }

  // Función para editar itinerario
  const handleEditItinerario = (id) => {
    router.push(`/itinerario?id=${id}`)
  }

  // Opciones para filtros
  const estadoOptions = [
    { value: 'publico', label: 'Público' },
    { value: 'privado', label: 'Privado' }
  ]

  // Generar opciones de destino dinámicamente
  const destinoOptions = React.useMemo(() => {
    const destinosUnicos = [...new Set(itinerariosData.map(item => item.destino))]
    return destinosUnicos.map(destino => ({
      value: destino.toLowerCase().replace(/\s+/g, '-'),
      label: destino
    }))
  }, [itinerariosData])

  // Generar opciones de duración dinámicamente
  const duracionOptions = React.useMemo(() => {
    const duraciones = itinerariosData.map(item => {
      const dias = item.dias ? item.dias.length : 0
      if (dias <= 2) return '1-2'
      if (dias <= 4) return '3-4'
      if (dias <= 7) return '5-7'
      return '8+'
    })
    const duracionesUnicas = [...new Set(duraciones)]
    return duracionesUnicas.map(duracion => ({
      value: duracion,
      label: duracion === '1-2' ? '1-2 días' : 
             duracion === '3-4' ? '3-4 días' : 
             duracion === '5-7' ? '5-7 días' : '8+ días'
    }))
  }, [itinerariosData])

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



  // Filtrado de datos
  const filteredData = itinerariosData.filter(item => {
    const matchesSearch = (item.titulo && item.titulo.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (item.destino && item.destino.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesEstado = !selectedEstado || 
                         (selectedEstado.value === 'publico' && item.publico) ||
                         (selectedEstado.value === 'privado' && !item.publico)
    
    const matchesDestino = !selectedDestino || 
                          (item.destino && item.destino.toLowerCase().includes(selectedDestino.label.toLowerCase()))
    
    const matchesDuracion = !selectedDuracion || (() => {
      const dias = item.dias ? item.dias.length : 0
      if (selectedDuracion.value === '1-2') return dias <= 2
      if (selectedDuracion.value === '3-4') return dias > 2 && dias <= 4
      if (selectedDuracion.value === '5-7') return dias > 4 && dias <= 7
      if (selectedDuracion.value === '8+') return dias > 7
      return true
    })()

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
  const itinerariosPublicos = itinerariosData.filter(item => item.publico).length
  const itinerariosPrivados = itinerariosData.filter(item => !item.publico).length
  const totalDias = itinerariosData.reduce((sum, item) => sum + (item.dias ? item.dias.length : 0), 0)

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
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Itinerarios Públicos</p>
                <p className="text-2xl font-bold text-gray-900">{itinerariosPublicos}</p>
              </div>
            </div>
          </div>

          <div className="bg-white-custom rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Lock className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Itinerarios Privados</p>
                <p className="text-2xl font-bold text-gray-900">{itinerariosPrivados}</p>
              </div>
            </div>
          </div>

          <div className="bg-white-custom rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total de Días</p>
                <p className="text-2xl font-bold text-gray-900">{totalDias}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Estado de carga y errores */}
        {loading && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-blue-800">Cargando itinerarios desde la base de datos...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="ml-3 text-red-800">{error}</span>
            </div>
          </div>
        )}

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
                    Fechas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Días
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yale-blue"></div>
                        <span className="ml-3 text-gray-600">Cargando itinerarios...</span>
                      </div>
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="text-red-600">
                        <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                        <p>{error}</p>
                      </div>
                    </td>
                  </tr>
                ) : currentData.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="text-gray-500">
                        <MapPin className="w-8 h-8 mx-auto mb-2" />
                        <p>No se encontraron itinerarios</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentData.map((itinerario) => (
                    <tr key={itinerario.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{itinerario.titulo || 'Sin título'}</div>
                          <div className="text-sm text-gray-500">ID: {itinerario.id}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{itinerario.destino || 'Sin destino'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {itinerario.fecha_inicio && itinerario.fecha_fin ? (
                            <>
                              <div>{new Date(itinerario.fecha_inicio).toLocaleDateString('es-ES')}</div>
                              <div className="text-xs text-gray-500">a {new Date(itinerario.fecha_fin).toLocaleDateString('es-ES')}</div>
                            </>
                          ) : (
                            'Sin fechas'
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {itinerario.dias ? itinerario.dias.length : 0} días
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          itinerario.publico 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {itinerario.publico ? 'Público' : 'Privado'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleViewItinerario(itinerario)}
                            className="text-yale-blue hover:text-air-force-blue"
                            title="Ver público"
                          >
                            <Eye size={16} />
                          </button>
                          <button 
                            onClick={() => handleEditItinerario(itinerario.id)}
                            className="text-green-600 hover:text-green-800"
                            title="Editar"
                          >
                            <Edit size={16} />
                          </button>
                          <button 
                            onClick={() => handleDeleteItinerario(itinerario.id)}
                            className="text-red-600 hover:text-red-800"
                            title="Eliminar"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
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
