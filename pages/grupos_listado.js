import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import SalesPipeline from '../components/ui/SalesPipeline'
import TaskProgressModal from '../components/ui/TaskProgressModal'
import { MoreHorizontal, Eye, Edit, Trash2, Mail, Filter, Search, ArrowUpDown, List, Kanban, X, User, MapPin, Phone, LayoutDashboard, Info, Settings, Target, ClipboardList, Calendar, DollarSign } from 'lucide-react'
import { LuFileUp } from "react-icons/lu";

export default function GruposListado() {
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCursos, setSelectedCursos] = useState([])
  const [selectedPrioridades, setSelectedPrioridades] = useState([])
  const [selectedLocalidades, setSelectedLocalidades] = useState([])
  const [selectedEstados, setSelectedEstados] = useState([])
  const [estimacionMin, setEstimacionMin] = useState('')
  const [estimacionMax, setEstimacionMax] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [showSortMenu, setShowSortMenu] = useState(false)
  const [selectedGrupo, setSelectedGrupo] = useState(null)
  const [showEstrategia, setShowEstrategia] = useState(false)
  const [showMore, setShowMore] = useState(null)
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [selectedColumns, setSelectedColumns] = useState([
    { key: 'nombre', label: 'Nombre', selected: true, customName: 'Nombre del Grupo' },
    { key: 'localidad', label: 'Localidad', selected: true, customName: 'Localidad' },
    { key: 'contacto', label: 'Contacto', selected: true, customName: 'Contacto' },
    { key: 'email', label: 'Email', selected: true, customName: 'Email' },
    { key: 'telefono', label: 'Teléfono', selected: true, customName: 'Teléfono' },
    { key: 'estado', label: 'Estado', selected: true, customName: 'Estado' },
    { key: 'estimacion', label: 'Estimación', selected: true, customName: 'Estimación (€)' },
    { key: 'prioridad', label: 'Prioridad', selected: true, customName: 'Prioridad' }
  ])

  // Resetear página cuando cambien los filtros
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCursos, selectedPrioridades, selectedLocalidades, selectedEstados, estimacionMin, estimacionMax])

  // Cerrar menú desplegable cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showMore && !event.target.closest('.relative')) {
        setShowMore(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showMore])

  // Opciones para los dropdowns
  const cursoOptions = [
    { value: '4eso', label: '4º ESO' },
    { value: '3eso', label: '3º ESO' },
    { value: '2bach', label: '2º Bachillerato' },
    { value: '1bach', label: '1º Bachillerato' }
  ]

  const prioridadOptions = [
    { value: 1, label: 'Prioridad 1' },
    { value: 2, label: 'Prioridad 2' },
    { value: 3, label: 'Prioridad 3' },
    { value: 4, label: 'Prioridad 4' },
    { value: 5, label: 'Prioridad 5' }
  ]

  const localidadOptions = [
    { value: 'madrid', label: 'Madrid' },
    { value: 'barcelona', label: 'Barcelona' },
    { value: 'valencia', label: 'Valencia' },
    { value: 'sevilla', label: 'Sevilla' },
    { value: 'bilbao', label: 'Bilbao' }
  ]

  const estadoOptions = [
    { value: 'pdte-visitar', label: 'Pdte. Visitar' },
    { value: 'visitado', label: 'Visitado' },
    { value: 'pdte-cotizar', label: 'Pdte. Cotizar' },
    { value: 'en-seguimiento', label: 'En Seguimiento' },
    { value: 'aceptado', label: 'Aceptado' },
    { value: 'denegado', label: 'Denegado' }
  ]

  // Funciones para exportación
  const handleColumnToggle = (key) => {
    setSelectedColumns(prev => 
      prev.map(col => 
        col.key === key ? { ...col, selected: !col.selected } : col
      )
    )
  }

  const handleColumnRename = (key, newName) => {
    setSelectedColumns(prev => 
      prev.map(col => 
        col.key === key ? { ...col, customName: newName } : col
      )
    )
  }

  const handleExportCSV = () => {
    const selectedCols = selectedColumns.filter(col => col.selected)
    const headers = selectedCols.map(col => col.customName)
    
    const csvData = gruposFiltrados.map(grupo => {
      return selectedCols.map(col => {
        let value = grupo[col.key]
        // Limpiar el valor para CSV
        if (typeof value === 'string') {
          value = value.replace(/"/g, '""') // Escapar comillas
          if (value.includes(',') || value.includes('"') || value.includes('\n')) {
            value = `"${value}"` // Encerrar en comillas si es necesario
          }
        }
        return value || ''
      }).join(',')
    })

    const csvContent = [headers.join(','), ...csvData].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `grupos_export_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    setShowExportModal(false)
  }

  // Datos de ejemplo para el listado
  const gruposData = [
    {
      id: 1,
      prioridad: 1,
      nombre: 'COLEGIO SAN JOSÉ - 4º ESO',
      localidad: 'Madrid',
      provincia: 'Madrid',
      contacto: 'D. Carlos Rodríguez',
      email: 'director@colegiosanjose.es',
      telefono: '91 123 45 67',
      direccion: 'Calle Mayor, 123',
      codigoPostal: '28001',
      historial: ['Pdte. Visitar', 'Visitado', 'Pdte. Cotizar'],
      estado: 'En Seguimiento',
      estimacion: '45.000 €',
      colorEstado: '#facc15'
    },
    {
      id: 2,
      prioridad: 3,
      nombre: 'INSTITUTO MARÍA ZAMBRANO - 2º BACHILLERATO',
      localidad: 'Barcelona',
      provincia: 'Barcelona',
      contacto: 'Sra. Ana Martínez',
      email: 'secretaria@mariazambrano.edu',
      telefono: '93 456 78 90',
      direccion: 'Avenida Diagonal, 456',
      codigoPostal: '08013',
      historial: ['Pdte. Visitar'],
      estado: 'Visitado',
      estimacion: '32.500 €',
      colorEstado: '#fb923c'
    },
    {
      id: 3,
      prioridad: 2,
      nombre: 'COLEGIO NUESTRA SEÑORA - 3º ESO',
      localidad: 'Valencia',
      provincia: 'Valencia',
      contacto: 'D. Miguel López',
      email: 'administracion@nuestrasenora.com',
      telefono: '96 789 01 23',
      direccion: 'Carrer de la Pau, 789',
      codigoPostal: '46001',
      historial: ['Pdte. Visitar', 'Visitado'],
      estado: 'Pdte. Cotizar',
      estimacion: '28.000 €',
      colorEstado: '#22d3ee'
    },
    {
      id: 4,
      prioridad: 5,
      nombre: 'IES FRANCISCO AYALA - 1º BACHILLERATO',
      localidad: 'Sevilla',
      contacto: 'Dña. Carmen García',
      email: 'jefatura@iesayala.org',
      historial: ['Pdte. Visitar', 'Visitado', 'Pdte. Cotizar', 'En Seguimiento'],
      estado: 'Aceptado',
      estimacion: '38.750 €',
      colorEstado: '#f472b6'
    },
    {
      id: 5,
      prioridad: 4,
      nombre: 'COLEGIO SAN AGUSTÍN - 4º ESO',
      localidad: 'Bilbao',
      contacto: 'D. Javier Fernández',
      email: 'info@sanagustin.edu',
      historial: [],
      estado: 'Pdte. Visitar',
      estimacion: '41.200 €',
      colorEstado: '#8b5cf6'
    },
    {
      id: 6,
      prioridad: 1,
      nombre: 'COLEGIO SANTA MARÍA - 3º ESO',
      localidad: 'Madrid',
      contacto: 'D. Francisco Ruiz',
      email: 'direccion@santamaria.edu',
      historial: ['Pdte. Visitar', 'Visitado'],
      estado: 'Pdte. Cotizar',
      estimacion: '35.800 €',
      colorEstado: '#22d3ee'
    },
    {
      id: 7,
      prioridad: 2,
      nombre: 'IES VICENTE ALEIXANDRE - 4º ESO',
      localidad: 'Barcelona',
      contacto: 'Sra. Isabel Moreno',
      email: 'secretaria@iesvicente.edu',
      historial: ['Pdte. Visitar'],
      estado: 'Visitado',
      estimacion: '42.300 €',
      colorEstado: '#fb923c'
    },
    {
      id: 8,
      prioridad: 3,
      nombre: 'COLEGIO SAN PABLO - 2º BACHILLERATO',
      localidad: 'Valencia',
      contacto: 'D. Antonio Jiménez',
      email: 'admin@sanpablo.edu',
      historial: ['Pdte. Visitar', 'Visitado', 'Pdte. Cotizar', 'En Seguimiento'],
      estado: 'Aceptado',
      estimacion: '39.500 €',
      colorEstado: '#f472b6'
    },
    {
      id: 9,
      prioridad: 4,
      nombre: 'IES FEDERICO GARCÍA LORCA - 1º BACHILLERATO',
      localidad: 'Sevilla',
      contacto: 'Dña. María López',
      email: 'jefatura@iesfederico.org',
      historial: ['Pdte. Visitar'],
      estado: 'Pdte. Visitar',
      estimacion: '31.750 €',
      colorEstado: '#8b5cf6'
    },
    {
      id: 10,
      prioridad: 5,
      nombre: 'COLEGIO SAN IGNACIO - 3º ESO',
      localidad: 'Bilbao',
      contacto: 'D. Pedro Sánchez',
      email: 'info@sanignacio.edu',
      historial: ['Pdte. Visitar', 'Visitado'],
      estado: 'Pdte. Cotizar',
      estimacion: '36.900 €',
      colorEstado: '#22d3ee'
    },
    {
      id: 11,
      prioridad: 1,
      nombre: 'IES MIGUEL HERNÁNDEZ - 4º ESO',
      localidad: 'Madrid',
      contacto: 'Sra. Elena Castro',
      email: 'secretaria@iesmiguel.edu',
      historial: ['Pdte. Visitar', 'Visitado', 'Pdte. Cotizar'],
      estado: 'En Seguimiento',
      estimacion: '33.400 €',
      colorEstado: '#facc15'
    },
    {
      id: 12,
      prioridad: 2,
      nombre: 'COLEGIO SANTA TERESA - 2º BACHILLERATO',
      localidad: 'Barcelona',
      contacto: 'D. Manuel Torres',
      email: 'direccion@santateresa.edu',
      historial: ['Pdte. Visitar', 'Visitado', 'Pdte. Cotizar', 'En Seguimiento'],
      estado: 'Aceptado',
      estimacion: '44.600 €',
      colorEstado: '#f472b6'
    }
  ]

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Pdte. Visitar':
        return '#8b5cf6'
      case 'Visitado':
        return '#fb923c'
      case 'Pdte. Cotizar':
        return '#22d3ee'
      case 'Imposible Cotizar':
        return '#475569'
      case 'En Seguimiento':
        return '#facc15'
      case 'Aceptado':
        return '#f472b6'
      case 'Denegado':
        return '#475569'
      default:
        return '#6b7280'
    }
  }

  const getEstadoIniciales = (estado) => {
    switch (estado) {
      case 'Pdte. Visitar':
        return 'PV'
      case 'Visitado':
        return 'V'
      case 'Pdte. Cotizar':
        return 'C'
      case 'Imposible Cotizar':
        return 'IC'
      case 'En Seguimiento':
        return 'ES'
      case 'Aceptado':
        return 'A'
      case 'Denegado':
        return 'D'
      default:
        return '?'
    }
  }





  const limpiarFiltros = () => {
    setSelectedCursos([])
    setSelectedPrioridades([])
    setSelectedLocalidades([])
    setSelectedEstados([])
    setEstimacionMin('')
    setEstimacionMax('')
    setCurrentPage(1) // Resetear a la primera página
  }

  // Estilos personalizados para react-select
  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: '32px',
      fontSize: '12px',
      borderColor: state.isFocused ? '#0f4c75' : '#d1d5db',
      boxShadow: state.isFocused ? '0 0 0 1px #0f4c75' : 'none',
      '&:hover': {
        borderColor: '#0f4c75'
      }
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: '12px',
      backgroundColor: state.isSelected ? '#0f4c75' : state.isFocused ? '#e6f3ff' : 'white',
      color: state.isSelected ? 'white' : '#374151',
      '&:hover': {
        backgroundColor: state.isSelected ? '#0f4c75' : '#e6f3ff'
      }
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#e6f3ff',
      borderRadius: '4px'
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#0f4c75',
      fontSize: '11px'
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: '#0f4c75',
      '&:hover': {
        backgroundColor: '#0f4c75',
        color: 'white'
      }
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: '12px',
      color: '#9ca3af'
    }),
    input: (provided) => ({
      ...provided,
      fontSize: '12px'
    })
  }

  // Lógica de filtrado
  const gruposFiltrados = gruposData.filter(grupo => {
    // Filtro por curso (si hay cursos seleccionados)
    if (selectedCursos.length > 0) {
      const cursoGrupo = grupo.nombre.toLowerCase()
      const tieneCursoSeleccionado = selectedCursos.some(curso => 
        cursoGrupo.includes(curso.value.toLowerCase())
      )
      if (!tieneCursoSeleccionado) return false
    }

    // Filtro por prioridad (si hay prioridades seleccionadas)
    if (selectedPrioridades.length > 0) {
      const tienePrioridadSeleccionada = selectedPrioridades.some(prioridad => 
        prioridad.value === grupo.prioridad
      )
      if (!tienePrioridadSeleccionada) return false
    }

    // Filtro por localidad (si hay localidades seleccionadas)
    if (selectedLocalidades.length > 0) {
      const tieneLocalidadSeleccionada = selectedLocalidades.some(localidad => 
        localidad.value.toLowerCase() === grupo.localidad.toLowerCase()
      )
      if (!tieneLocalidadSeleccionada) return false
    }

    // Filtro por estado (si hay estados seleccionados)
    if (selectedEstados.length > 0) {
      const tieneEstadoSeleccionado = selectedEstados.some(estado => 
        estado.value.toLowerCase() === grupo.estado.toLowerCase().replace(' ', '-')
      )
      if (!tieneEstadoSeleccionado) return false
    }

    // Filtro por rango de estimación
    if (estimacionMin || estimacionMax) {
      const estimacionNumerica = parseInt(grupo.estimacion.replace(/[€,\s]/g, ''))
      
      if (estimacionMin && estimacionNumerica < parseInt(estimacionMin)) {
        return false
      }
      
      if (estimacionMax && estimacionNumerica > parseInt(estimacionMax)) {
        return false
      }
    }

    return true
  })

  // Lógica de paginación
  const totalPages = Math.ceil(gruposFiltrados.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentGrupos = gruposFiltrados.slice(startIndex, endIndex)

  const getPrioridadColor = (prioridad) => {
    switch (prioridad) {
      case 1:
        return 'text-red-600 bg-red-100'
      case 2:
        return 'text-orange-600 bg-orange-100'
      case 3:
        return 'text-yellow-600 bg-yellow-100'
      case 4:
        return 'text-blue-600 bg-blue-100'
      case 5:
        return 'text-green-600 bg-green-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div>
      {/* Div personalizado de ancho completo x 48px - ENCIMA DE TODO */}
      <div className="w-full h-12 flex items-center justify-between pl-2 pr-6 mt-2 mb-4">
        <h1 className="text-3xl font-normal text-yale-blue font-raleway uppercase tracking-wider">Gestión de Grupos</h1>
        <span className="text-lg font-medium text-air-force-blue font-inter">Curso 2024/2025</span>
      </div>

      {/* Botón Nuevo Grupo */}
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <button
            onClick={() => window.location.href = '/grupos'}
            className="flex items-center space-x-2 p-2 text-gray-600 hover:text-yale-blue transition-colors"
            title="Dashboard"
          >
            <LayoutDashboard size={18} />
            <span className="text-sm font-medium">Dashboard</span>
          </button>

          <button
            onClick={() => window.location.href = '/grupos_listado'}
            className="flex items-center space-x-2 p-2 text-yale-blue bg-blue-50 rounded-lg transition-colors"
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

      {/* Pipeline de Ventas Visual */}
      <SalesPipeline />

      {/* Contenedor principal con grid */}
      <div className={`mt-4 ${selectedGrupo ? 'grid grid-cols-2 gap-6' : ''}`}>
        {/* Listado de Grupos */}
        <div className="bg-white-custom rounded-lg shadow-md p-6">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-yale-blue">LISTADO DE GRUPOS</h2>
            <div className="flex items-center space-x-1">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar grupos..."
                  className="pl-10 pr-4 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yale-blue focus:border-transparent w-64"
                />
              </div>
              <button 
                className={`p-2 transition-colors ${showFilters ? 'text-yale-blue bg-blue-50 rounded-lg' : 'text-gray-600 hover:text-yale-blue'}`} 
                title="Filtros"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={18} />
              </button>
              <button 
                className={`p-2 transition-colors ${showSortMenu ? 'text-yale-blue bg-blue-50 rounded-lg' : 'text-gray-600 hover:text-yale-blue'}`} 
                title="Ordenar"
                onClick={() => setShowSortMenu(!showSortMenu)}
              >
                <ArrowUpDown size={18} />
              </button>
              <button 
                className="p-2 transition-colors text-gray-600 hover:text-yale-blue" 
                title="Exportar"
                onClick={() => setShowExportModal(true)}
              >
                <LuFileUp size={18} />
              </button>
            </div>
          </div>

          {/* Filtros */}
          {showFilters && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {/* Filtro Curso */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Curso</label>
                  <Select
                    isMulti
                    options={cursoOptions}
                    value={selectedCursos}
                    onChange={setSelectedCursos}
                    placeholder="Seleccionar cursos..."
                    styles={customSelectStyles}
                    isClearable={false}
                    closeMenuOnSelect={false}
                  />
                </div>

                {/* Filtro Prioridad */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Prioridad</label>
                  <Select
                    isMulti
                    options={prioridadOptions}
                    value={selectedPrioridades}
                    onChange={setSelectedPrioridades}
                    placeholder="Seleccionar prioridades..."
                    styles={customSelectStyles}
                    isClearable={false}
                    closeMenuOnSelect={false}
                  />
                </div>

                {/* Filtro Localidad */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Localidad</label>
                  <Select
                    isMulti
                    options={localidadOptions}
                    value={selectedLocalidades}
                    onChange={setSelectedLocalidades}
                    placeholder="Seleccionar localidades..."
                    styles={customSelectStyles}
                    isClearable={false}
                    closeMenuOnSelect={false}
                    isSearchable={true}
                    filterOption={(option, inputValue) =>
                      option.label.toLowerCase().includes(inputValue.toLowerCase())
                    }
                  />
                </div>

                {/* Filtro Estado */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Estado</label>
                  <Select
                    isMulti
                    options={estadoOptions}
                    value={selectedEstados}
                    onChange={setSelectedEstados}
                    placeholder="Seleccionar estados..."
                    styles={customSelectStyles}
                    isClearable={false}
                    closeMenuOnSelect={false}
                  />
                </div>

                {/* Filtro Rango de Estimación */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Rango Estimación (€)</label>
                  <div className="flex items-center space-x-1">
                    <div className="flex-1">
                      <input
                        type="number"
                        placeholder="Min"
                        value={estimacionMin}
                        onChange={(e) => setEstimacionMin(e.target.value)}
                        className="w-full text-xs border border-gray-300 rounded px-2 py-2 focus:outline-none focus:ring-1 focus:ring-yale-blue"
                        min="0"
                        step="1000"
                        style={{ minHeight: '32px' }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">-</span>
                    <div className="flex-1">
                      <input
                        type="number"
                        placeholder="Max"
                        value={estimacionMax}
                        onChange={(e) => setEstimacionMax(e.target.value)}
                        className="w-full text-xs border border-gray-300 rounded px-2 py-2 focus:outline-none focus:ring-1 focus:ring-yale-blue"
                        min="0"
                        step="1000"
                        style={{ minHeight: '32px' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Botón Limpiar Filtros */}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={limpiarFiltros}
                  className="px-3 py-1.5 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                >
                  Limpiar Filtros
                </button>
              </div>
            </div>
          )}

          {/* Menú de Ordenación */}
          {showSortMenu && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Ordenar por</label>
                  <select className="w-full text-xs border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-yale-blue">
                    <option value="nombre">Nombre</option>
                    <option value="prioridad">Prioridad</option>
                    <option value="localidad">Localidad</option>
                    <option value="estado">Estado</option>
                    <option value="estimacion">Estimación</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Dirección</label>
                  <select className="w-full text-xs border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-yale-blue">
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Tabla */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-center py-1 px-2 font-semibold text-gray-700 w-12 text-xs uppercase">P</th>
                  <th className={`text-left py-1 px-4 font-semibold text-gray-700 text-xs uppercase ${selectedGrupo ? 'w-1/3' : ''}`}>Nombre</th>
                  {!selectedGrupo && (
                    <th className="text-left py-1 px-4 font-semibold text-gray-700 text-xs uppercase">Contacto</th>
                  )}
                  {!selectedGrupo && (
                    <th className="text-left py-1 px-4 font-semibold text-gray-700 text-xs uppercase">Historial</th>
                  )}
                  <th className="text-left py-1 px-4 font-semibold text-gray-700 text-xs uppercase">Estado</th>
                  <th className="text-left py-1 px-4 font-semibold text-gray-700 text-xs uppercase">Estimación</th>
                  <th className="text-left py-1 px-4 font-semibold text-gray-700 text-xs uppercase">Acc</th>
                </tr>
              </thead>
              <tbody>
                {currentGrupos.map((grupo) => (
                  <tr 
                    key={grupo.id} 
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${selectedGrupo?.id === grupo.id ? 'bg-blue-50 border-blue-200' : ''}`}
                  >
                    <td className="py-1 px-2 text-center">
                      <div className={`inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-medium ${getPrioridadColor(grupo.prioridad)}`}>
                        {grupo.prioridad}
                      </div>
                    </td>
                    <td className="py-1 px-4">
                      <div className="font-medium text-gray-900 text-xs">{grupo.nombre}</div>
                      <div className="text-xs text-gray-500">{grupo.localidad}</div>
                    </td>
                    {!selectedGrupo && (
                      <td className="py-1 px-4">
                        <div className="text-xs font-medium text-gray-900 mb-0.5">
                          {grupo.contacto}
                        </div>
                        <div className="flex items-center text-xs text-gray-700">
                          <Mail size={12} className="mr-2 text-gray-500" />
                          {grupo.email}
                        </div>
                      </td>
                    )}
                    {!selectedGrupo && (
                      <td className="py-1 px-4">
                        <div className="flex items-center">
                          {grupo.historial.length > 0 ? (
                            grupo.historial.map((estado, index) => (
                              <div 
                                key={index}
                                className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white border-2 border-white shadow-sm"
                                style={{ 
                                  backgroundColor: getEstadoColor(estado),
                                  marginLeft: index > 0 ? '-8px' : '0px',
                                  zIndex: index + 1
                                }}
                                title={estado}
                              >
                                {getEstadoIniciales(estado)}
                              </div>
                            ))
                          ) : (
                            <div className="text-xs text-gray-400 italic">
                              Sin historial
                            </div>
                          )}
                        </div>
                      </td>
                    )}
                    <td className="py-1 px-4">
                      <div 
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: grupo.colorEstado }}
                      >
                        {grupo.estado}
                      </div>
                    </td>
                    <td className="py-1 px-4">
                      <div className="font-semibold text-gray-900 text-xs">{grupo.estimacion}</div>
                    </td>
                    <td className="py-1 px-4">
                      <div className="flex items-center space-x-1">
                        {!selectedGrupo ? (
                          <>
                            <button
                              className="p-0.5 text-gray-500 hover:text-blue-600 transition-colors"
                              title="Ver detalles"
                              onClick={() => setSelectedGrupo(grupo)}
                            >
                              <Eye size={14} />
                            </button>
                            <button
                              className="p-0.5 text-gray-500 hover:text-green-600 transition-colors"
                              title="Editar"
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              className="p-0.5 text-gray-500 hover:text-purple-600 transition-colors"
                              title="Estrategia"
                              onClick={() => {
                                setSelectedGrupo(grupo)
                                setShowTaskModal(true)
                              }}
                            >
                              <Target size={14} />
                            </button>
                            <button
                              className="p-0.5 text-gray-500 hover:text-red-600 transition-colors"
                              title="Eliminar"
                            >
                              <Trash2 size={14} />
                            </button>
                          </>
                        ) : (
                          <div className="relative">
                            <button
                              onClick={() => setShowMore(grupo.id === showMore ? null : grupo.id)}
                              className="p-0.5 text-gray-500 hover:text-gray-700 transition-colors"
                              title="Más opciones"
                            >
                              <MoreHorizontal size={14} />
                            </button>
                            
                            {/* Menú desplegable de acciones */}
                            {showMore === grupo.id && (
                              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[140px]">
                                <div className="py-1">
                                  <button 
                                    onClick={() => setSelectedGrupo(grupo)}
                                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                                  >
                                    <Eye size={14} />
                                    <span>Ver detalles</span>
                                  </button>
                                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                                    <Edit size={14} />
                                    <span>Editar</span>
                                  </button>
                                  <button 
                                    onClick={() => { setSelectedGrupo(grupo); setShowTaskModal(true); }}
                                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                                  >
                                    <Target size={14} />
                                    <span>Ver estrategia</span>
                                  </button>
                                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                                    <Trash2 size={14} />
                                    <span>Eliminar</span>
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-600">
                              Mostrando {startIndex + 1}-{Math.min(endIndex, gruposFiltrados.length)} de {gruposFiltrados.length} grupos
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>
              
              {/* Números de página */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 text-sm rounded ${
                    currentPage === page
                      ? 'bg-yale-blue text-white'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button 
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>

        {/* Panel de Detalles del Grupo */}
        {selectedGrupo && !showEstrategia && (
          <div className="bg-white-custom rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-yale-blue">DETALLES DEL GRUPO</h2>
              <button 
                onClick={() => setSelectedGrupo(null)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                title="Cerrar detalles"
              >
                <X size={20} />
              </button>
            </div>

            {/* Información Principal */}
            <div className="space-y-6">
              {/* Nombre */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{selectedGrupo.nombre}</h3>
              </div>

              {/* Datos de Estimación y Estado */}
              <div className="bg-gray-50 rounded-lg">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-center py-1 px-3 font-semibold text-gray-700 text-xs uppercase">P</th>
                        <th className="text-center py-1 px-3 font-semibold text-gray-700 text-xs uppercase">Estado</th>
                        <th className="text-center py-1 px-3 font-semibold text-gray-700 text-xs uppercase">Historial</th>
                        <th className="text-center py-1 px-3 font-semibold text-gray-700 text-xs uppercase">Estimación</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-center py-1 px-3">
                          <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getPrioridadColor(selectedGrupo.prioridad)}`}>
                            {selectedGrupo.prioridad}
                          </div>
                        </td>
                        <td className="text-center py-1 px-3">
                          <div 
                            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white"
                            style={{ backgroundColor: selectedGrupo.colorEstado }}
                          >
                            {selectedGrupo.estado}
                          </div>
                        </td>
                        <td className="text-center py-1 px-3">
                          <div className="flex items-center justify-center">
                            {selectedGrupo.historial.length > 0 ? (
                              selectedGrupo.historial.map((estado, index) => (
                                <div 
                                  key={index}
                                  className="inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold text-white border-2 border-white shadow-sm"
                                  style={{ 
                                    backgroundColor: getEstadoColor(estado),
                                    marginLeft: index > 0 ? '-3px' : '0px',
                                    zIndex: index + 1
                                  }}
                                  title={estado}
                                >
                                  {getEstadoIniciales(estado)}
                                </div>
                              ))
                            ) : (
                              <div className="text-xs text-gray-500 italic">Sin historial</div>
                            )}
                          </div>
                        </td>
                        <td className="text-center py-1 px-3">
                          <span className="text-sm font-bold text-green-600">{selectedGrupo.estimacion}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Datos del Centro */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Datos del Centro</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-2 text-gray-500" />
                    <span className="text-sm text-gray-700">{selectedGrupo.direccion}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail size={16} className="mr-2 text-gray-500" />
                    <span className="text-sm text-gray-700">{selectedGrupo.codigoPostal} - {selectedGrupo.localidad}, {selectedGrupo.provincia}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone size={16} className="mr-2 text-gray-500" />
                    <span className="text-sm text-gray-700">{selectedGrupo.telefono}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail size={16} className="mr-2 text-gray-500" />
                    <span className="text-sm text-gray-700">{selectedGrupo.email}</span>
                  </div>
                </div>
              </div>

              {/* Información de Contacto */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Información de Contacto</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <User size={16} className="mr-2 text-gray-500" />
                    <span className="text-sm text-gray-700">{selectedGrupo.contacto}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail size={16} className="mr-2 text-gray-500" />
                    <span className="text-sm text-gray-700">{selectedGrupo.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone size={16} className="mr-2 text-gray-500" />
                    <span className="text-sm text-gray-700">{selectedGrupo.telefono}</span>
                  </div>
                </div>
              </div>



              {/* Acciones */}
              <div className="flex space-x-3">
                <button className="flex-1 bg-yale-blue text-white px-4 py-2 rounded-lg hover:bg-air-force-blue transition-colors text-sm font-medium">
                  Editar Grupo
                </button>
                <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                  Crear Presupuesto
                </button>
                <button 
                  onClick={() => setShowTaskModal(true)}
                  className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                >
                  <Target size={16} className="inline mr-2" />
                  Ver Estrategia
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Panel de Estrategia */}
        {selectedGrupo && showEstrategia && (
          <div className="bg-white-custom rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-yale-blue">ESTRATEGIA CON EL CENTRO</h2>
              <button 
                onClick={() => setShowEstrategia(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                title="Volver a detalles"
              >
                <X size={20} />
              </button>
            </div>

            {/* Información del Centro */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{selectedGrupo.nombre}</h3>
              <div className="flex items-center space-x-3">
                <div 
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white"
                  style={{ backgroundColor: selectedGrupo.colorEstado }}
                >
                  {selectedGrupo.estado}
                </div>
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPrioridadColor(selectedGrupo.prioridad)}`}>
                  Prioridad {selectedGrupo.prioridad}
                </div>
              </div>
            </div>

            {/* Contenido de Estrategia */}
            <div className="space-y-6">
              {/* Análisis de Oportunidad */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Análisis de Oportunidad</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Estimación:</span>
                    <span className="text-sm font-bold text-blue-600">{selectedGrupo.estimacion}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Probabilidad de éxito:</span>
                    <span className="text-sm font-bold text-green-600">75%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Tiempo estimado:</span>
                    <span className="text-sm font-bold text-orange-600">3-4 meses</span>
                  </div>
                </div>
              </div>

              {/* Plan de Acción y Próximos Pasos en dos columnas */}
              <div className="grid grid-cols-2 gap-4">
                {/* Columna Izquierda: Plan de Acción */}
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Plan de Acción</h4>
                  <div className="space-y-3">
                    {/* 1. Pdte. Visitar */}
                    <div className="border-l-4 border-purple-500 pl-3">
                      <div className={`text-xs font-semibold text-purple-700 mb-1 ${selectedGrupo.estado === 'Visitado' || selectedGrupo.estado === 'Pdte. Cotizar' || selectedGrupo.estado === 'En Seguimiento' || selectedGrupo.estado === 'Aceptado' ? 'line-through' : ''}`}>
                        1. Pdte. Visitar
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className={`text-sm text-gray-700 ${selectedGrupo.estado === 'Visitado' || selectedGrupo.estado === 'Pdte. Cotizar' || selectedGrupo.estado === 'En Seguimiento' || selectedGrupo.estado === 'Aceptado' ? 'line-through' : ''}`}>
                            Contacto inicial
                          </span>
                        </div>
                        <div className="relative group">
                          <Info size={14} className="text-gray-400 hover:text-gray-600 cursor-help" />
                          <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                            Primer acercamiento con el cliente mediante llamada, correo o reunión para generar interés.
                            <div className="absolute top-full right-2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 2. Visitado */}
                    <div className="border-l-4 border-orange-500 pl-3">
                      <div className={`text-xs font-semibold text-orange-700 mb-1 ${selectedGrupo.estado === 'Pdte. Cotizar' || selectedGrupo.estado === 'En Seguimiento' || selectedGrupo.estado === 'Aceptado' ? 'line-through' : ''}`}>
                        2. Visitado
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className={`text-sm text-gray-700 ${selectedGrupo.estado === 'Pdte. Cotizar' || selectedGrupo.estado === 'En Seguimiento' || selectedGrupo.estado === 'Aceptado' ? 'line-through' : ''}`}>
                            Análisis de necesidades
                          </span>
                        </div>
                        <div className="relative group">
                          <Info size={14} className="text-gray-400 hover:text-gray-600 cursor-help" />
                          <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                            Recoger información clave del cliente para entender sus objetivos, problemas y expectativas.
                            <div className="absolute top-full right-2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 3. Pdte. Cotizar */}
                    <div className="border-l-4 border-cyan-500 pl-3">
                      <div className={`text-xs font-semibold text-cyan-700 mb-1 ${selectedGrupo.estado === 'En Seguimiento' || selectedGrupo.estado === 'Aceptado' ? 'line-through' : ''}`}>
                        3. Pdte. Cotizar
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            <span className={`text-sm text-gray-700 ${selectedGrupo.estado === 'En Seguimiento' || selectedGrupo.estado === 'Aceptado' ? 'line-through' : ''}`}>
                              Desarrollo de propuesta...
                            </span>
                          </div>
                          <div className="relative group">
                            <Info size={14} className="text-gray-400 hover:text-gray-600 cursor-help" />
                            <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                              Crear una solución adaptada a las necesidades detectadas, con enfoque en valor y diferenciación.
                              <div className="absolute top-full right-2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            <span className={`text-sm text-gray-700 ${selectedGrupo.estado === 'En Seguimiento' || selectedGrupo.estado === 'Aceptado' ? 'line-through' : ''}`}>
                              Presentación de la propuesta
                            </span>
                          </div>
                          <div className="relative group">
                            <Info size={14} className="text-gray-400 hover:text-gray-600 cursor-help" />
                            <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                              Mostrar la propuesta al cliente, explicar beneficios y resolver dudas.
                              <div className="absolute top-full right-2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 4. En Seguimiento */}
                    <div className="border-l-4 border-yellow-500 pl-3">
                      <div className={`text-xs font-semibold text-yellow-700 mb-1 ${selectedGrupo.estado === 'Aceptado' ? 'line-through' : ''}`}>
                        4. En Seguimiento
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span className={`text-sm text-gray-700 ${selectedGrupo.estado === 'Aceptado' ? 'line-through' : ''}`}>
                              Negociación
                            </span>
                          </div>
                          <div className="relative group">
                            <Info size={14} className="text-gray-400 hover:text-gray-600 cursor-help" />
                            <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                              Ajustar condiciones técnicas, económicas o de plazos según el feedback del cliente.
                              <div className="absolute top-full right-2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <span className={`text-sm text-gray-700 ${selectedGrupo.estado === 'Aceptado' ? 'line-through' : ''}`}>
                              Cierre de la oportunidad
                            </span>
                          </div>
                          <div className="relative group">
                            <Info size={14} className="text-gray-400 hover:text-gray-600 cursor-help" />
                            <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                              Asegurar el compromiso formal mediante acuerdo, contrato o pedido.
                              <div className="absolute top-full right-2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 5. Aceptado */}
                    <div className="border-l-4 border-pink-500 pl-3">
                      <div className="text-xs font-semibold text-pink-700 mb-1">
                        5. Aceptado
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                            <span className="text-sm text-gray-700">
                              Implementación inicial
                            </span>
                          </div>
                          <div className="relative group">
                            <Info size={14} className="text-gray-400 hover:text-gray-600 cursor-help" />
                            <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                              Iniciar la entrega del servicio o producto, gestionar onboarding y primeras acciones.
                              <div className="absolute top-full right-2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                            <span className="text-sm text-gray-700">
                              Seguimiento y fidelización
                            </span>
                          </div>
                          <div className="relative group">
                            <Info size={14} className="text-gray-400 hover:text-gray-600 cursor-help" />
                            <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                              Mantener contacto, medir satisfacción, resolver incidencias y abrir puertas a futuras oportunidades.
                              <div className="absolute top-full right-2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Columna Derecha: Próximos Pasos y Acciones */}
                <div className="space-y-4">
                  {/* Tareas */}
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Tareas</h4>
                    <div className="space-y-2">
                      <div className="text-sm text-gray-700">
                        <strong>Inmediato:</strong> Programar reunión de presentación
                      </div>
                      <div className="text-sm text-gray-700">
                        <strong>Esta semana:</strong> Preparar propuesta inicial
                      </div>
                      <div className="text-sm text-gray-700">
                        <strong>Próximo mes:</strong> Seguimiento y ajustes
                      </div>
                    </div>
                  </div>

                  {/* Acciones */}
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Acciones</h4>
                    <div className="space-y-2">
                      <button 
                        onClick={() => setShowTaskModal(true)}
                        className="w-full text-left text-sm text-gray-700 hover:text-yale-blue transition-colors p-2 rounded hover:bg-yellow-100 flex items-center space-x-2"
                      >
                        <ClipboardList size={16} />
                        <span>Crear tarea</span>
                      </button>
                      <button className="w-full text-left text-sm text-gray-700 hover:text-yale-blue transition-colors p-2 rounded hover:bg-yellow-100 flex items-center space-x-2">
                        <Calendar size={16} />
                        <span>Programar cita</span>
                      </button>
                      <button className="w-full text-left text-sm text-gray-700 hover:text-yale-blue transition-colors p-2 rounded hover:bg-yellow-100 flex items-center space-x-2">
                        <DollarSign size={16} />
                        <span>Crear presupuesto</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>




            </div>
          </div>
        )}

        {/* Modal de Progreso de Tareas */}
        {selectedGrupo && (
          <TaskProgressModal 
            isOpen={showTaskModal}
            onClose={() => {
              setShowTaskModal(false)
              // Mantener el grupo seleccionado para que se siga mostrando el panel lateral
            }}
            grupo={selectedGrupo}
          />
        )}

        {/* Modal de Exportación CSV */}
        {showExportModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Exportar a CSV</h3>
                  <button
                    onClick={() => setShowExportModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Selecciona las columnas que quieres exportar y personaliza sus nombres
                </p>
              </div>

              <div className="p-6">
                <div className="space-y-2">
                  {selectedColumns.map((column) => (
                    <div key={column.key} className="flex items-center space-x-3 p-2 border border-gray-200 rounded-lg">
                      <input
                        type="checkbox"
                        checked={column.selected}
                        onChange={() => handleColumnToggle(column.key)}
                        className="w-4 h-4 text-yale-blue border-gray-300 rounded focus:ring-yale-blue"
                      />
                      <span className="text-sm font-medium text-gray-700 min-w-[100px]">
                        {column.label}
                      </span>
                                              <input
                          type="text"
                          value={column.customName}
                          onChange={(e) => handleColumnRename(column.key, e.target.value)}
                          className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yale-blue focus:border-transparent"
                          placeholder="Nombre personalizado para la columna"
                        />
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setShowExportModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleExportCSV}
                    className="px-4 py-2 text-sm font-medium text-white bg-yale-blue border border-transparent rounded-md hover:bg-air-force-blue transition-colors"
                  >
                    Exportar CSV
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

