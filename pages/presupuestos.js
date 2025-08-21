import React, { useState } from 'react'
import { List, Kanban, LayoutDashboard, Settings, MapPin, Search, Filter, ArrowUpDown, Calendar, Clock, Users, Phone, Mail, Edit, Trash2, Plus, Eye, X, Target, FileText, Globe, DollarSign, TrendingUp, CheckCircle, AlertCircle, Clock as ClockIcon } from 'lucide-react'
import Select from 'react-select'

export default function Presupuestos() {
  const [showFilters, setShowFilters] = useState(false)
  const [showSortMenu, setShowSortMenu] = useState(false)
  const [selectedEstados, setSelectedEstados] = useState([])
  const [selectedClientes, setSelectedClientes] = useState([])
  const [selectedTipos, setSelectedTipos] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  // Datos de ejemplo para presupuestos
  const presupuestosData = [
    {
      id: 1,
      numero: "PRES-2024-001",
      cliente: "IES San Isidro",
      tipo: "Grupo Escolar",
      destino: "Andalucía",
      fechaCreacion: "15/01/2024",
      fechaVencimiento: "15/02/2024",
      estado: "Pendiente",
      colorEstado: "#F59E0B",
      importe: "€12,500",
      personas: 45,
      duracion: "5 días",
      responsable: "María García",
      prioridad: "Alta",
      descripcion: "Viaje cultural por Andalucía para estudiantes de 4º ESO"
    },
    {
      id: 2,
      numero: "PRES-2024-002",
      cliente: "Colegio Santa María",
      tipo: "Grupo Escolar",
      destino: "Madrid",
      fechaCreacion: "20/01/2024",
      fechaVencimiento: "20/02/2024",
      estado: "Aprobado",
      colorEstado: "#10B981",
      importe: "€8,200",
      personas: 32,
      duracion: "3 días",
      responsable: "Carlos López",
      prioridad: "Media",
      descripcion: "Visita cultural a Madrid con museos y palacios"
    },
    {
      id: 3,
      numero: "PRES-2024-003",
      cliente: "Universidad Complutense",
      tipo: "Universidad",
      destino: "Barcelona",
      fechaCreacion: "25/01/2024",
      fechaVencimiento: "25/02/2024",
      estado: "Rechazado",
      colorEstado: "#EF4444",
      importe: "€15,800",
      personas: 60,
      duracion: "4 días",
      responsable: "Ana Martínez",
      prioridad: "Baja",
      descripcion: "Viaje de estudios a Barcelona para arquitectura"
    },
    {
      id: 4,
      numero: "PRES-2024-004",
      cliente: "IES Miguel Hernández",
      tipo: "Grupo Escolar",
      destino: "Valencia",
      fechaCreacion: "30/01/2024",
      fechaVencimiento: "30/02/2024",
      estado: "En Revisión",
      colorEstado: "#3B82F6",
      importe: "€9,600",
      personas: 38,
      duracion: "3 días",
      responsable: "Pedro Sánchez",
      prioridad: "Alta",
      descripcion: "Viaje a Valencia con visita a la Ciudad de las Artes"
    },
    {
      id: 5,
      numero: "PRES-2024-005",
      cliente: "Colegio San José",
      tipo: "Grupo Escolar",
      destino: "Galicia",
      fechaCreacion: "05/02/2024",
      fechaVencimiento: "05/03/2024",
      estado: "Pendiente",
      colorEstado: "#F59E0B",
      importe: "€11,200",
      personas: 42,
      duracion: "4 días",
      responsable: "Laura Fernández",
      prioridad: "Media",
      descripcion: "Ruta por Galicia con Santiago de Compostela"
    },
    {
      id: 6,
      numero: "PRES-2024-006",
      cliente: "Universidad de Sevilla",
      tipo: "Universidad",
      destino: "País Vasco",
      fechaCreacion: "10/02/2024",
      fechaVencimiento: "10/03/2024",
      estado: "Aprobado",
      colorEstado: "#10B981",
      importe: "€18,400",
      personas: 55,
      duracion: "5 días",
      responsable: "Miguel Ruiz",
      prioridad: "Alta",
      descripcion: "Viaje de estudios al País Vasco"
    }
  ]

  // Opciones para filtros
  const estadoOptions = [
    { value: 'pendiente', label: 'Pendiente' },
    { value: 'aprobado', label: 'Aprobado' },
    { value: 'rechazado', label: 'Rechazado' },
    { value: 'en revision', label: 'En Revisión' }
  ]

  const clienteOptions = [
    { value: 'ies san isidro', label: 'IES San Isidro' },
    { value: 'colegio santa maria', label: 'Colegio Santa María' },
    { value: 'universidad complutense', label: 'Universidad Complutense' },
    { value: 'ies miguel hernandez', label: 'IES Miguel Hernández' },
    { value: 'colegio san jose', label: 'Colegio San José' },
    { value: 'universidad de sevilla', label: 'Universidad de Sevilla' }
  ]

  const tipoOptions = [
    { value: 'grupo escolar', label: 'Grupo Escolar' },
    { value: 'universidad', label: 'Universidad' },
    { value: 'particular', label: 'Particular' },
    { value: 'empresa', label: 'Empresa' }
  ]

  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: '32px',
      fontSize: '12px'
    }),
    option: (provided) => ({
      ...provided,
      fontSize: '12px'
    }),
    singleValue: (provided) => ({
      ...provided,
      fontSize: '12px'
    }),
    multiValue: (provided) => ({
      ...provided,
      fontSize: '12px'
    })
  }

  // Funciones de filtrado y paginación
  const presupuestosFiltrados = presupuestosData.filter(presupuesto => {
    const cumpleEstado = selectedEstados.length === 0 || selectedEstados.some(estado => 
      presupuesto.estado.toLowerCase() === estado.value
    )
    const cumpleCliente = selectedClientes.length === 0 || selectedClientes.some(cliente => 
      presupuesto.cliente.toLowerCase().includes(cliente.value)
    )
    const cumpleTipo = selectedTipos.length === 0 || selectedTipos.some(tipo => 
      presupuesto.tipo.toLowerCase() === tipo.value
    )
    
    return cumpleEstado && cumpleCliente && cumpleTipo
  })

  const totalPages = Math.ceil(presupuestosFiltrados.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPresupuestos = presupuestosFiltrados.slice(startIndex, endIndex)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const getEstadoColor = (estado) => {
    switch (estado.toLowerCase()) {
      case 'aprobado': return '#10B981'
      case 'pendiente': return '#F59E0B'
      case 'rechazado': return '#EF4444'
      case 'en revisión':
      case 'en revision': return '#3B82F6'
      default: return '#6B7280'
    }
  }

  const getEstadoIcon = (estado) => {
    switch (estado.toLowerCase()) {
      case 'aprobado': return <CheckCircle size={14} />
      case 'pendiente': return <ClockIcon size={14} />
      case 'rechazado': return <X size={14} />
      case 'en revisión':
      case 'en revision': return <AlertCircle size={14} />
      default: return <ClockIcon size={14} />
    }
  }

  const getPrioridadColor = (prioridad) => {
    switch (prioridad.toLowerCase()) {
      case 'alta': return 'bg-red-100 text-red-800'
      case 'media': return 'bg-yellow-100 text-yellow-800'
      case 'baja': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // Calcular estadísticas
  const totalPresupuestos = presupuestosData.length
  const presupuestosAprobados = presupuestosData.filter(p => p.estado === 'Aprobado').length
  const presupuestosPendientes = presupuestosData.filter(p => p.estado === 'Pendiente').length
  const valorTotal = presupuestosData.reduce((sum, p) => {
    const valor = parseFloat(p.importe.replace('€', '').replace(',', ''))
    return sum + valor
  }, 0)

  return (
    <div className="min-h-screen bg-content-bg">
      {/* Header */}
      <div className="bg-white-custom shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-yale-blue">PRESUPUESTOS</h1>
              <p className="text-sm text-gray-600 mt-1">Gestión de presupuestos y cotizaciones</p>
            </div>
            <button 
              onClick={() => window.location.href = '/presupuesto'}
              className="bg-yale-blue text-white px-4 py-2 rounded-lg hover:bg-air-force-blue transition-colors text-sm font-medium flex items-center"
            >
              <Plus size={16} className="mr-2" />
              Nuevo Presupuesto
            </button>
          </div>
        </div>
      </div>

      {/* Navegación superior */}
      <div className="bg-white-custom border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 py-2">
            <button
              onClick={() => window.location.href = '/presupuestos'}
              className="flex items-center space-x-2 p-2 text-yale-blue bg-blue-50 rounded-lg transition-colors"
              title="Listado"
            >
              <List size={18} />
              <span className="text-sm font-medium">Listado</span>
            </button>
            <button
              onClick={() => window.location.href = '/cotizaciones'}
              className="flex items-center space-x-2 p-2 text-gray-600 hover:text-yale-blue transition-colors"
              title="Cotizaciones"
            >
              <FileText size={18} />
              <span className="text-sm font-medium">Cotizaciones</span>
            </button>
            <button
              onClick={() => window.location.href = '/itinerarios'}
              className="flex items-center space-x-2 p-2 text-gray-600 hover:text-yale-blue transition-colors"
              title="Itinerarios"
            >
              <Globe size={18} />
              <span className="text-sm font-medium">Itinerarios</span>
            </button>
            <button
              onClick={() => window.location.href = '/plantillas'}
              className="flex items-center space-x-2 p-2 text-gray-600 hover:text-yale-blue transition-colors"
              title="Plantillas"
            >
              <FileText size={18} />
              <span className="text-sm font-medium">Plantillas</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white-custom rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Presupuestos</p>
                <p className="text-2xl font-bold text-gray-900">{totalPresupuestos}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white-custom rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Aprobados</p>
                <p className="text-2xl font-bold text-gray-900">{presupuestosAprobados}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white-custom rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <ClockIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pendientes</p>
                <p className="text-2xl font-bold text-gray-900">{presupuestosPendientes}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white-custom rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Valor Total</p>
                <p className="text-2xl font-bold text-gray-900">€{valorTotal.toLocaleString('en-US')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Listado de presupuestos */}
        <div className="bg-white-custom rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">LISTADO DE PRESUPUESTOS</h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 p-2 text-gray-600 hover:text-yale-blue transition-colors"
                >
                  <Filter size={16} />
                  <span className="text-sm">Filtros</span>
                </button>
                <button
                  onClick={() => setShowSortMenu(!showSortMenu)}
                  className="flex items-center space-x-2 p-2 text-gray-600 hover:text-yale-blue transition-colors"
                >
                  <ArrowUpDown size={16} />
                  <span className="text-sm">Ordenar</span>
                </button>
              </div>
            </div>
          </div>

          {/* Filtros */}
          {showFilters && (
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                  <Select
                    isMulti
                    options={estadoOptions}
                    value={selectedEstados}
                    onChange={setSelectedEstados}
                    styles={customSelectStyles}
                    placeholder="Seleccionar estados..."
                    isSearchable
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cliente</label>
                  <Select
                    isMulti
                    options={clienteOptions}
                    value={selectedClientes}
                    onChange={setSelectedClientes}
                    styles={customSelectStyles}
                    placeholder="Seleccionar clientes..."
                    isSearchable
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
                  <Select
                    isMulti
                    options={tipoOptions}
                    value={selectedTipos}
                    onChange={setSelectedTipos}
                    styles={customSelectStyles}
                    placeholder="Seleccionar tipos..."
                    isSearchable
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tabla */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Número</th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Destino</th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Importe</th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Vencimiento</th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Responsable</th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentPresupuestos.map((presupuesto) => (
                  <tr key={presupuesto.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{presupuesto.numero}</div>
                        <div className="text-sm text-gray-500">{presupuesto.tipo}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{presupuesto.cliente}</div>
                      <div className="text-sm text-gray-500">{presupuesto.personas} personas</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{presupuesto.destino}</div>
                      <div className="text-sm text-gray-500">{presupuesto.duracion}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{presupuesto.importe}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getEstadoIcon(presupuesto.estado)}
                        <span
                          className="ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full text-white"
                          style={{ backgroundColor: getEstadoColor(presupuesto.estado) }}
                        >
                          {presupuesto.estado}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{presupuesto.fechaVencimiento}</div>
                      <div className={`text-xs px-2 py-1 rounded-full inline-block ${getPrioridadColor(presupuesto.prioridad)}`}>
                        {presupuesto.prioridad}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{presupuesto.responsable}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-900" title="Ver detalles">
                          <Eye size={16} />
                        </button>
                                                 <button 
                           onClick={() => window.location.href = '/presupuesto'}
                           className="text-green-600 hover:text-green-900" 
                           title="Editar"
                         >
                           <Edit size={16} />
                         </button>
                        <button className="text-purple-600 hover:text-purple-900" title="Duplicar">
                          <FileText size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-900" title="Eliminar">
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
            <div className="px-6 py-3 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Mostrando {startIndex + 1} a {Math.min(endIndex, presupuestosFiltrados.length)} de {presupuestosFiltrados.length} resultados
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Anterior
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-1 text-sm border rounded-md ${
                        currentPage === page
                          ? 'bg-yale-blue text-white border-yale-blue'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
