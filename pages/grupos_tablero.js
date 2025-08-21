import React, { useState } from 'react'
import Select from 'react-select'
import { List, Kanban, X, LayoutDashboard, Users, MapPin, Filter, ArrowUpDown, Search, Edit, Settings, Layers, Star } from 'lucide-react'

export default function GruposTablero() {
  const [showFiltros, setShowFiltros] = useState(false)
  const [showOrdenacion, setShowOrdenacion] = useState(false)
  const [busqueda, setBusqueda] = useState('')
  const [editandoEstimacion, setEditandoEstimacion] = useState(null)
  const [vistaActiva, setVistaActiva] = useState('estados') // 'estados' o 'prioridad'
  const [selectedCursos, setSelectedCursos] = useState([])
  const [selectedPrioridades, setSelectedPrioridades] = useState([])
  const [selectedLocalidades, setSelectedLocalidades] = useState([])
  const [selectedEstados, setSelectedEstados] = useState([])
  const [estimacionMin, setEstimacionMin] = useState('')
  const [estimacionMax, setEstimacionMax] = useState('')
  const [paginasEstados, setPaginasEstados] = useState({
    'PDTE. VISITAR': 1,
    'VISITADO': 1,
    'PDTE. COTIZAR': 1,
    'EN SEGUIMIENTO': 1,
    'ACEPTADO': 1,
    'DENEGADO': 1,
    'IMPOSIBLE COTIZAR': 1
  })
  const [paginasPrioridad, setPaginasPrioridad] = useState({
    'Prioridad 1': 1,
    'Prioridad 2': 1,
    'Prioridad 3': 1,
    'Prioridad 4': 1,
    'Prioridad 5': 1
  })
  const gruposPorPagina = 5

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

  const [gruposPorEstado, setGruposPorEstado] = useState({
    'PDTE. VISITAR': [
      { id: 1, nombre: 'COLEGIO SAN AGUSTÍN - 4º ESO', localidad: 'Bilbao', estimacion: '€41,200', prioridad: 4 },
      { id: 2, nombre: 'IES LA LAGUNA - 3º ESO', localidad: 'Madrid', estimacion: '€38,500', prioridad: 2 },
      { id: 3, nombre: 'COLEGIO SANTA MARÍA - 2º BACH', localidad: 'Valencia', estimacion: '€45,300', prioridad: 1 }
    ],
    'VISITADO': [
      { id: 4, nombre: 'INSTITUTO MARÍA ZAMBRANO - 2º BACH', localidad: 'Barcelona', estimacion: '€32,500', prioridad: 3 },
      { id: 5, nombre: 'COLEGIO NUESTRA SEÑORA - 3º ESO', localidad: 'Valencia', estimacion: '€28,000', prioridad: 2 },
      { id: 6, nombre: 'IES FRANCISCO AYALA - 1º BACH', localidad: 'Sevilla', estimacion: '€38,750', prioridad: 5 },
      { id: 7, nombre: 'COLEGIO SAN JOSÉ - 4º ESO', localidad: 'Madrid', estimacion: '€45,000', prioridad: 1 },
      { id: 8, nombre: 'INSTITUTO CERVANTES - 3º ESO', localidad: 'Bilbao', estimacion: '€52,800', prioridad: 3 }
    ],
    'PDTE. COTIZAR': [
      { id: 9, nombre: 'COLEGIO SAN PABLO - 4º ESO', localidad: 'Madrid', estimacion: '€39,000', prioridad: 2 },
      { id: 10, nombre: 'IES GARCÍA LORCA - 2º BACH', localidad: 'Barcelona', estimacion: '€41,500', prioridad: 4 },
      { id: 11, nombre: 'COLEGIO SAN MIGUEL - 3º ESO', localidad: 'Valencia', estimacion: '€35,200', prioridad: 3 },
      { id: 12, nombre: 'INSTITUTO VELÁZQUEZ - 1º BACH', localidad: 'Sevilla', estimacion: '€40,300', prioridad: 1 }
    ],
    'EN SEGUIMIENTO': [
      { id: 13, nombre: 'COLEGIO SAN ANTONIO - 4º ESO', localidad: 'Madrid', estimacion: '€42,800', prioridad: 2 },
      { id: 14, nombre: 'IES PABLO PICASSO - 3º ESO', localidad: 'Barcelona', estimacion: '€38,900', prioridad: 3 },
      { id: 15, nombre: 'COLEGIO SAN FRANCISCO - 2º BACH', localidad: 'Valencia', estimacion: '€45,600', prioridad: 1 },
      { id: 16, nombre: 'INSTITUTO GOYA - 1º BACH', localidad: 'Sevilla', estimacion: '€41,200', prioridad: 4 },
      { id: 17, nombre: 'COLEGIO SAN LUIS - 4º ESO', localidad: 'Bilbao', estimacion: '€39,500', prioracion: 2 },
      { id: 18, nombre: 'IES DALÍ - 3º ESO', localidad: 'Madrid', estimacion: '€36,700', prioridad: 3 }
    ],
    'ACEPTADO': [
      { id: 19, nombre: 'COLEGIO SAN PEDRO - 4º ESO', localidad: 'Barcelona', estimacion: '€48,200', prioridad: 1 },
      { id: 20, nombre: 'INSTITUTO MIRÓ - 2º BACH', localidad: 'Valencia', estimacion: '€52,300', prioridad: 2 },
      { id: 21, nombre: 'COLEGIO SAN JUAN - 3º ESO', localidad: 'Sevilla', estimacion: '€87,000', prioridad: 3 }
    ],
    'DENEGADO': [
      { id: 22, nombre: 'IES TOLEDO - 1º BACH', localidad: 'Toledo', estimacion: '€32,500', prioridad: 4 }
    ],
    'IMPOSIBLE COTIZAR': [
      { id: 23, nombre: 'COLEGIO SAN MARCOS - 4º ESO', localidad: 'Zaragoza', estimacion: '€28,000', prioridad: 5 },
      { id: 24, nombre: 'INSTITUTO SEGOVIA - 3º ESO', localidad: 'Segovia', estimacion: '€17,000', prioridad: 5 }
    ]
  })

  // Datos organizados por prioridad
  const [gruposPorPrioridad, setGruposPorPrioridad] = useState({
    'Prioridad 1': [
      { id: 3, nombre: 'COLEGIO SANTA MARÍA - 2º BACH', localidad: 'Valencia', estimacion: '€45,300', prioridad: 1, estado: 'PDTE. VISITAR' },
      { id: 7, nombre: 'COLEGIO SAN JOSÉ - 4º ESO', localidad: 'Madrid', estimacion: '€45,000', prioridad: 1, estado: 'VISITADO' },
      { id: 12, nombre: 'INSTITUTO VELÁZQUEZ - 1º BACH', localidad: 'Sevilla', estimacion: '€40,300', prioridad: 1, estado: 'PDTE. COTIZAR' },
      { id: 15, nombre: 'COLEGIO SAN FRANCISCO - 2º BACH', localidad: 'Valencia', estimacion: '€45,600', prioridad: 1, estado: 'EN SEGUIMIENTO' },
      { id: 19, nombre: 'COLEGIO SAN PEDRO - 4º ESO', localidad: 'Barcelona', estimacion: '€48,200', prioridad: 1, estado: 'ACEPTADO' }
    ],
    'Prioridad 2': [
      { id: 2, nombre: 'IES LA LAGUNA - 3º ESO', localidad: 'Madrid', estimacion: '€38,500', prioridad: 2, estado: 'PDTE. VISITAR' },
      { id: 5, nombre: 'COLEGIO NUESTRA SEÑORA - 3º ESO', localidad: 'Valencia', estimacion: '€28,000', prioridad: 2, estado: 'VISITADO' },
      { id: 9, nombre: 'COLEGIO SAN PABLO - 4º ESO', localidad: 'Madrid', estimacion: '€39,000', prioridad: 2, estado: 'PDTE. COTIZAR' },
      { id: 13, nombre: 'COLEGIO SAN ANTONIO - 4º ESO', localidad: 'Madrid', estimacion: '€42,800', prioridad: 2, estado: 'EN SEGUIMIENTO' },
      { id: 20, nombre: 'INSTITUTO MIRÓ - 2º BACH', localidad: 'Valencia', estimacion: '€52,300', prioridad: 2, estado: 'ACEPTADO' }
    ],
    'Prioridad 3': [
      { id: 4, nombre: 'INSTITUTO MARÍA ZAMBRANO - 2º BACH', localidad: 'Barcelona', estimacion: '€32,500', prioridad: 3, estado: 'VISITADO' },
      { id: 8, nombre: 'INSTITUTO CERVANTES - 3º ESO', localidad: 'Bilbao', estimacion: '€52,800', prioridad: 3, estado: 'VISITADO' },
      { id: 11, nombre: 'COLEGIO SAN MIGUEL - 3º ESO', localidad: 'Valencia', estimacion: '€35,200', prioridad: 3, estado: 'PDTE. COTIZAR' },
      { id: 14, nombre: 'IES PABLO PICASSO - 3º ESO', localidad: 'Barcelona', estimacion: '€38,900', prioridad: 3, estado: 'EN SEGUIMIENTO' },
      { id: 21, nombre: 'COLEGIO SAN JUAN - 3º ESO', localidad: 'Sevilla', estimacion: '€87,000', prioridad: 3, estado: 'ACEPTADO' }
    ],
    'Prioridad 4': [
      { id: 1, nombre: 'COLEGIO SAN AGUSTÍN - 4º ESO', localidad: 'Bilbao', estimacion: '€41,200', prioridad: 4, estado: 'PDTE. VISITAR' },
      { id: 10, nombre: 'IES GARCÍA LORCA - 2º BACH', localidad: 'Barcelona', estimacion: '€41,500', prioridad: 4, estado: 'PDTE. COTIZAR' },
      { id: 16, nombre: 'INSTITUTO GOYA - 1º BACH', localidad: 'Sevilla', estimacion: '€41,200', prioridad: 4, estado: 'EN SEGUIMIENTO' },
      { id: 22, nombre: 'IES TOLEDO - 1º BACH', localidad: 'Toledo', estimacion: '€32,500', prioridad: 4, estado: 'DENEGADO' }
    ],
    'Prioridad 5': [
      { id: 6, nombre: 'IES FRANCISCO AYALA - 1º BACH', localidad: 'Sevilla', estimacion: '€38,750', prioridad: 5, estado: 'VISITADO' },
      { id: 23, nombre: 'COLEGIO SAN MARCOS - 4º ESO', localidad: 'Zaragoza', estimacion: '€28,000', prioridad: 5, estado: 'IMPOSIBLE COTIZAR' },
      { id: 24, nombre: 'INSTITUTO SEGOVIA - 3º ESO', localidad: 'Segovia', estimacion: '€17,000', prioridad: 5, estado: 'IMPOSIBLE COTIZAR' }
    ]
  })

  const handleDragStart = (e, grupo, estadoOrigen) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ grupo, estadoOrigen }))
  }

  const handleDrop = (e, estadoDestino) => {
    e.preventDefault()
    const data = e.dataTransfer.getData('text/plain')
    if (data) {
      const { grupo, estadoOrigen } = JSON.parse(data)
      
      if (vistaActiva === 'estados') {
        setGruposPorEstado(prev => ({
          ...prev,
          [estadoOrigen]: prev[estadoOrigen].filter(g => g.id !== grupo.id),
          [estadoDestino]: [...prev[estadoDestino], grupo]
        }))
      } else if (vistaActiva === 'prioridad') {
        setGruposPorPrioridad(prev => ({
          ...prev,
          [estadoOrigen]: prev[estadoOrigen].filter(g => g.id !== grupo.id),
          [estadoDestino]: [...prev[estadoDestino], grupo]
        }))
      }
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const calcularSumaEstimaciones = (grupos) => {
    return grupos.reduce((suma, grupo) => {
      const valor = parseInt(grupo.estimacion.replace(/[€,]/g, ''))
      return suma + valor
    }, 0)
  }

  const formatearEstimacion = (valor) => {
    return new Intl.NumberFormat('es-ES').format(valor) + '€'
  }

  const handleEditEstimacion = (grupo, estado) => {
    setEditandoEstimacion({ grupo, estado, vista: vistaActiva })
  }

  const handleSaveEstimacion = (nuevaEstimacion) => {
    if (editandoEstimacion) {
      if (editandoEstimacion.vista === 'estados') {
        setGruposPorEstado(prev => ({
          ...prev,
          [editandoEstimacion.estado]: prev[editandoEstimacion.estado].map(grupo =>
            grupo.id === editandoEstimacion.grupo.id
              ? { ...grupo, estimacion: nuevaEstimacion }
              : grupo
          )
        }))
      } else if (editandoEstimacion.vista === 'prioridad') {
        setGruposPorPrioridad(prev => ({
          ...prev,
          [editandoEstimacion.estado]: prev[editandoEstimacion.estado].map(grupo =>
            grupo.id === editandoEstimacion.grupo.id
              ? { ...grupo, estimacion: nuevaEstimacion }
              : grupo
          )
        }))
      }
      setEditandoEstimacion(null)
    }
  }

  const handleCancelEdit = () => {
    setEditandoEstimacion(null)
  }

  const limpiarFiltros = () => {
    setSelectedCursos([])
    setSelectedPrioridades([])
    setSelectedLocalidades([])
    setSelectedEstados([])
    setEstimacionMin('')
    setEstimacionMax('')
  }

  const cambiarPagina = (tipo, columna, nuevaPagina) => {
    if (tipo === 'estados') {
      setPaginasEstados(prev => ({
        ...prev,
        [columna]: nuevaPagina
      }))
    } else {
      setPaginasPrioridad(prev => ({
        ...prev,
        [columna]: nuevaPagina
      }))
    }
  }

  const obtenerGruposPaginados = (grupos, paginaActual) => {
    const inicio = (paginaActual - 1) * gruposPorPagina
    const fin = inicio + gruposPorPagina
    return grupos.slice(inicio, fin)
  }

  const calcularTotalPaginas = (grupos) => {
    return Math.ceil(grupos.length / gruposPorPagina)
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
    })
  }

  const ControlesPaginacion = ({ tipo, columna, paginaActual, totalPaginas, grupos }) => {
    if (totalPaginas <= 1) return null

    return (
      <div className="flex items-center justify-between mt-3 px-2">
        <div className="text-xs text-gray-500">
          {grupos.length} grupos
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => cambiarPagina(tipo, columna, Math.max(1, paginaActual - 1))}
            disabled={paginaActual === 1}
            className={`p-1 rounded text-xs ${
              paginaActual === 1 
                ? 'text-gray-300 cursor-not-allowed' 
                : 'text-gray-600 hover:text-yale-blue hover:bg-blue-50'
            }`}
          >
            ‹
          </button>
          <span className="text-xs text-gray-600 px-2">
            {paginaActual} / {totalPaginas}
          </span>
          <button
            onClick={() => cambiarPagina(tipo, columna, Math.min(totalPaginas, paginaActual + 1))}
            disabled={paginaActual === totalPaginas}
            className={`p-1 rounded text-xs ${
              paginaActual === totalPaginas 
                ? 'text-gray-300 cursor-not-allowed' 
                : 'text-gray-600 hover:text-yale-blue hover:bg-blue-50'
            }`}
          >
            ›
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Div personalizado de ancho completo x 48px - ENCIMA DE TODO */}
      <div className="w-full h-12 flex items-center justify-between pl-2 pr-6 mt-2 mb-4">
        <h1 className="text-3xl font-normal text-yale-blue font-raleway uppercase tracking-wider">Gestión de Grupos</h1>
        <span className="text-lg font-medium text-air-force-blue font-inter">Curso 2024/2025</span>
      </div>

      {/* Botón Nuevo Grupo y Vistas */}
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
            className="flex items-center space-x-2 p-2 text-gray-600 hover:text-yale-blue transition-colors"
            title="Listado"
          >
            <List size={18} />
            <span className="text-sm font-medium">Listado</span>
          </button>
                                <button
                        onClick={() => window.location.href = '/grupos_tablero'}
                        className="flex items-center space-x-2 p-2 text-yale-blue bg-blue-50 rounded-lg transition-colors"
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



      {/* Tablero Kanban */}
      <div className="bg-white-custom rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-6">
            <h2 className="text-xl font-semibold text-yale-blue">TABLERO KANBAN</h2>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setVistaActiva('estados')}
                className={`flex items-center space-x-2 text-sm font-medium transition-colors border-b-2 pb-1 ${
                  vistaActiva === 'estados' 
                    ? 'text-yale-blue border-yale-blue' 
                    : 'text-gray-600 hover:text-yale-blue border-transparent hover:border-yale-blue'
                }`}
              >
                <Layers size={16} />
                <span>Estados</span>
              </button>
              <button 
                onClick={() => setVistaActiva('prioridad')}
                className={`flex items-center space-x-2 text-sm font-medium transition-colors border-b-2 pb-1 ${
                  vistaActiva === 'prioridad' 
                    ? 'text-yale-blue border-yale-blue' 
                    : 'text-gray-600 hover:text-yale-blue border-transparent hover:border-yale-blue'
                }`}
              >
                <Star size={16} />
                <span>Prioridad</span>
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* Campo de Búsqueda */}
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar grupos..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yale-blue focus:border-transparent w-64"
              />
            </div>
            
            {/* Iconos de Filtro y Ordenación */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowFiltros(!showFiltros)}
                className={`p-2 transition-colors ${showFiltros ? 'text-yale-blue bg-blue-50 rounded-lg' : 'text-gray-600 hover:text-yale-blue'}`}
                title="Filtros"
              >
                <Filter size={18} />
              </button>
              <button
                onClick={() => setShowOrdenacion(!showOrdenacion)}
                className={`p-2 transition-colors ${showOrdenacion ? 'text-yale-blue bg-blue-50 rounded-lg' : 'text-gray-600 hover:text-yale-blue'}`}
                title="Ordenación"
              >
                <ArrowUpDown size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Menú de Filtros */}
        {showFiltros && (
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
        {showOrdenacion && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ordenar por</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg text-sm">
                  <option value="nombre">Nombre</option>
                  <option value="localidad">Localidad</option>
                  <option value="estimacion">Estimación</option>
                  <option value="prioridad">Prioridad</option>
                  <option value="estado">Estado</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg text-sm">
                  <option value="asc">Ascendente</option>
                  <option value="desc">Descendente</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Agrupar por</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg text-sm">
                  <option value="estado">Estado</option>
                  <option value="prioridad">Prioridad</option>
                  <option value="localidad">Localidad</option>
                  <option value="estimacion">Estimación</option>
                </select>
              </div>
            </div>
          </div>
        )}
        
        {/* Tablero por Estados */}
        {vistaActiva === 'estados' && (
          <div className="grid grid-cols-7 gap-4">
          {/* Columna: PDTE. VISITAR */}
          <div className="min-h-96">
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 mb-4">
              <h3 className="font-semibold text-purple-700 text-sm">PDTE. VISITAR</h3>
              <div className="text-xs text-purple-600 mb-2">
                {formatearEstimacion(calcularSumaEstimaciones(gruposPorEstado['PDTE. VISITAR']))} ({gruposPorEstado['PDTE. VISITAR'].length})
              </div>
              <div className="text-xs text-purple-600">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Contacto inicial</span>
                </div>
              </div>
            </div>
            <div 
              className="space-y-3 min-h-80"
              onDrop={(e) => handleDrop(e, 'PDTE. VISITAR')}
              onDragOver={handleDragOver}
            >
              {obtenerGruposPaginados(gruposPorEstado['PDTE. VISITAR'], paginasEstados['PDTE. VISITAR']).map((grupo) => (
                                            <div
                              key={grupo.id}
                              draggable
                              onDragStart={(e) => handleDragStart(e, grupo, 'PDTE. VISITAR')}
                              className="bg-white border border-purple-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-move"
                            >
                              <h4 className="font-medium text-gray-900 text-xs mb-1">{grupo.nombre}</h4>
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <MapPin size={12} className="mr-1" />
                    {grupo.localidad}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {editandoEstimacion && editandoEstimacion.grupo.id === grupo.id ? (
                        <div className="flex items-center space-x-1">
                          <input
                            type="text"
                            defaultValue={grupo.estimacion}
                            className="text-sm border border-gray-300 rounded px-2 py-1 w-20"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleSaveEstimacion(e.target.value)
                              }
                            }}
                            onBlur={(e) => handleSaveEstimacion(e.target.value)}
                            autoFocus
                          />
                          <button
                            onClick={() => handleCancelEdit()}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="text-sm font-semibold text-purple-600">{grupo.estimacion}</div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleEditEstimacion(grupo, 'PDTE. VISITAR')
                            }}
                            className="text-gray-400 hover:text-purple-600 transition-colors"
                            title="Editar estimación"
                          >
                            <Edit size={14} />
                          </button>
                        </>
                      )}
                    </div>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">P{grupo.prioridad}</span>
                  </div>
                </div>
              ))}
              <ControlesPaginacion
                tipo="estados"
                columna="PDTE. VISITAR"
                paginaActual={paginasEstados['PDTE. VISITAR']}
                totalPaginas={calcularTotalPaginas(gruposPorEstado['PDTE. VISITAR'])}
                grupos={gruposPorEstado['PDTE. VISITAR']}
              />
            </div>
          </div>

          {/* Columna: VISITADO */}
          <div className="min-h-96">
            <div className="bg-orange-50 border-l-4 border-orange-500 p-3 mb-4">
              <h3 className="font-semibold text-orange-700 text-sm">VISITADO</h3>
              <div className="text-xs text-orange-600 mb-2">
                {formatearEstimacion(calcularSumaEstimaciones(gruposPorEstado['VISITADO']))} ({gruposPorEstado['VISITADO'].length})
              </div>
              <div className="text-xs text-orange-600">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Análisis de necesidades</span>
                </div>
              </div>
            </div>
            <div 
              className="space-y-3 min-h-80"
              onDrop={(e) => handleDrop(e, 'VISITADO')}
              onDragOver={handleDragOver}
            >
              {obtenerGruposPaginados(gruposPorEstado['VISITADO'], paginasEstados['VISITADO']).map((grupo) => (
                                            <div
                              key={grupo.id}
                              draggable
                              onDragStart={(e) => handleDragStart(e, grupo, 'VISITADO')}
                              className="bg-white border border-orange-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-move"
                            >
                              <h4 className="font-medium text-gray-900 text-xs mb-1">{grupo.nombre}</h4>
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <MapPin size={12} className="mr-1" />
                    {grupo.localidad}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {editandoEstimacion && editandoEstimacion.grupo.id === grupo.id ? (
                        <div className="flex items-center space-x-1">
                          <input
                            type="text"
                            defaultValue={grupo.estimacion}
                            className="text-sm border border-gray-300 rounded px-2 py-1 w-20"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleSaveEstimacion(e.target.value)
                              }
                            }}
                            onBlur={(e) => handleSaveEstimacion(e.target.value)}
                            autoFocus
                          />
                          <button
                            onClick={() => handleCancelEdit()}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="text-sm font-semibold text-orange-600">{grupo.estimacion}</div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleEditEstimacion(grupo, 'VISITADO')
                            }}
                            className="text-gray-400 hover:text-orange-600 transition-colors"
                            title="Editar estimación"
                          >
                            <Edit size={14} />
                          </button>
                        </>
                      )}
                    </div>
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">P{grupo.prioridad}</span>
                  </div>
                </div>
              ))}
              <ControlesPaginacion
                tipo="estados"
                columna="VISITADO"
                paginaActual={paginasEstados['VISITADO']}
                totalPaginas={calcularTotalPaginas(gruposPorEstado['VISITADO'])}
                grupos={gruposPorEstado['VISITADO']}
              />
            </div>
          </div>

          {/* Columna: PDTE. COTIZAR */}
          <div className="min-h-96">
            <div className="bg-cyan-50 border-l-4 border-cyan-500 p-3 mb-4">
              <h3 className="font-semibold text-cyan-700 text-sm">PDTE. COTIZAR</h3>
              <div className="text-xs text-cyan-600 mb-2">
                {formatearEstimacion(calcularSumaEstimaciones(gruposPorEstado['PDTE. COTIZAR']))} ({gruposPorEstado['PDTE. COTIZAR'].length})
              </div>
              <div className="text-xs text-cyan-600 space-y-1">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>Desarrollo de propuesta...</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Presentación de la propuesta</span>
                </div>
              </div>
            </div>
            <div 
              className="space-y-3 min-h-80"
              onDrop={(e) => handleDrop(e, 'PDTE. COTIZAR')}
              onDragOver={handleDragOver}
            >
              {obtenerGruposPaginados(gruposPorEstado['PDTE. COTIZAR'], paginasEstados['PDTE. COTIZAR']).map((grupo) => (
                                            <div
                              key={grupo.id}
                              draggable
                              onDragStart={(e) => handleDragStart(e, grupo, 'PDTE. COTIZAR')}
                              className="bg-white border border-cyan-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-move"
                            >
                              <h4 className="font-medium text-gray-900 text-xs mb-1">{grupo.nombre}</h4>
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <MapPin size={12} className="mr-1" />
                    {grupo.localidad}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {editandoEstimacion && editandoEstimacion.grupo.id === grupo.id ? (
                        <div className="flex items-center space-x-1">
                          <input
                            type="text"
                            defaultValue={grupo.estimacion}
                            className="text-sm border border-gray-300 rounded px-2 py-1 w-20"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleSaveEstimacion(e.target.value)
                              }
                            }}
                            onBlur={(e) => handleSaveEstimacion(e.target.value)}
                            autoFocus
                          />
                          <button
                            onClick={() => handleCancelEdit()}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="text-sm font-semibold text-cyan-600">{grupo.estimacion}</div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleEditEstimacion(grupo, 'PDTE. COTIZAR')
                            }}
                            className="text-gray-400 hover:text-cyan-600 transition-colors"
                            title="Editar estimación"
                          >
                            <Edit size={14} />
                          </button>
                        </>
                      )}
                    </div>
                    <span className="text-xs bg-cyan-100 text-cyan-700 px-2 py-1 rounded-full">P{grupo.prioridad}</span>
                  </div>
                </div>
              ))}
              <ControlesPaginacion
                tipo="estados"
                columna="PDTE. COTIZAR"
                paginaActual={paginasEstados['PDTE. COTIZAR']}
                totalPaginas={calcularTotalPaginas(gruposPorEstado['PDTE. COTIZAR'])}
                grupos={gruposPorEstado['PDTE. COTIZAR']}
              />
            </div>
          </div>

          {/* Columna: EN SEGUIMIENTO */}
          <div className="min-h-96">
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 mb-4">
              <h3 className="font-semibold text-yellow-700 text-sm">EN SEGUIMIENTO</h3>
              <div className="text-xs text-yellow-600 mb-2">
                {formatearEstimacion(calcularSumaEstimaciones(gruposPorEstado['EN SEGUIMIENTO']))} ({gruposPorEstado['EN SEGUIMIENTO'].length})
              </div>
              <div className="text-xs text-yellow-600 space-y-1">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Negociación</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Cierre de la oportunidad</span>
                </div>
              </div>
            </div>
            <div 
              className="space-y-3 min-h-80"
              onDrop={(e) => handleDrop(e, 'EN SEGUIMIENTO')}
              onDragOver={handleDragOver}
            >
              {obtenerGruposPaginados(gruposPorEstado['EN SEGUIMIENTO'], paginasEstados['EN SEGUIMIENTO']).map((grupo) => (
                                            <div
                              key={grupo.id}
                              draggable
                              onDragStart={(e) => handleDragStart(e, grupo, 'EN SEGUIMIENTO')}
                              className="bg-white border border-yellow-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-move"
                            >
                              <h4 className="font-medium text-gray-900 text-xs mb-1">{grupo.nombre}</h4>
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <MapPin size={12} className="mr-1" />
                    {grupo.localidad}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {editandoEstimacion && editandoEstimacion.grupo.id === grupo.id ? (
                        <div className="flex items-center space-x-1">
                          <input
                            type="text"
                            defaultValue={grupo.estimacion}
                            className="text-sm border border-gray-300 rounded px-2 py-1 w-20"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleSaveEstimacion(e.target.value)
                              }
                            }}
                            onBlur={(e) => handleSaveEstimacion(e.target.value)}
                            autoFocus
                          />
                          <button
                            onClick={() => handleCancelEdit()}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="text-sm font-semibold text-yellow-600">{grupo.estimacion}</div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleEditEstimacion(grupo, 'EN SEGUIMIENTO')
                            }}
                            className="text-gray-400 hover:text-yellow-600 transition-colors"
                            title="Editar estimación"
                          >
                            <Edit size={14} />
                          </button>
                        </>
                      )}
                    </div>
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">P{grupo.prioridad}</span>
                  </div>
                </div>
              ))}
              <ControlesPaginacion
                tipo="estados"
                columna="EN SEGUIMIENTO"
                paginaActual={paginasEstados['EN SEGUIMIENTO']}
                totalPaginas={calcularTotalPaginas(gruposPorEstado['EN SEGUIMIENTO'])}
                grupos={gruposPorEstado['EN SEGUIMIENTO']}
              />
            </div>
          </div>

          {/* Columna: ACEPTADO */}
          <div className="min-h-96">
            <div className="bg-pink-50 border-l-4 border-pink-500 p-3 mb-4">
              <h3 className="font-semibold text-pink-700 text-sm">ACEPTADO</h3>
              <div className="text-xs text-pink-600 mb-2">
                {formatearEstimacion(calcularSumaEstimaciones(gruposPorEstado['ACEPTADO']))} ({gruposPorEstado['ACEPTADO'].length})
              </div>
              <div className="text-xs text-pink-600 space-y-1">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <span>Implementación inicial</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <span>Seguimiento y fidelización</span>
                </div>
              </div>
            </div>
            <div 
              className="space-y-3 min-h-80"
              onDrop={(e) => handleDrop(e, 'ACEPTADO')}
              onDragOver={handleDragOver}
            >
              {obtenerGruposPaginados(gruposPorEstado['ACEPTADO'], paginasEstados['ACEPTADO']).map((grupo) => (
                                            <div
                              key={grupo.id}
                              draggable
                              onDragStart={(e) => handleDragStart(e, grupo, 'ACEPTADO')}
                              className="bg-white border border-pink-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-move"
                            >
                              <h4 className="font-medium text-gray-900 text-xs mb-1">{grupo.nombre}</h4>
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <MapPin size={12} className="mr-1" />
                    {grupo.localidad}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {editandoEstimacion && editandoEstimacion.grupo.id === grupo.id ? (
                        <div className="flex items-center space-x-1">
                          <input
                            type="text"
                            defaultValue={grupo.estimacion}
                            className="text-sm border border-gray-300 rounded px-2 py-1 w-20"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleSaveEstimacion(e.target.value)
                              }
                            }}
                            onBlur={(e) => handleSaveEstimacion(e.target.value)}
                            autoFocus
                          />
                          <button
                            onClick={() => handleCancelEdit()}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="text-sm font-semibold text-pink-600">{grupo.estimacion}</div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleEditEstimacion(grupo, 'ACEPTADO')
                            }}
                            className="text-gray-400 hover:text-pink-600 transition-colors"
                            title="Editar estimación"
                          >
                            <Edit size={14} />
                          </button>
                        </>
                      )}
                    </div>
                    <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full">P{grupo.prioridad}</span>
                  </div>
                </div>
              ))}
              <ControlesPaginacion
                tipo="estados"
                columna="ACEPTADO"
                paginaActual={paginasEstados['ACEPTADO']}
                totalPaginas={calcularTotalPaginas(gruposPorEstado['ACEPTADO'])}
                grupos={gruposPorEstado['ACEPTADO']}
              />
            </div>
          </div>

          {/* Columna: DENEGADO */}
          <div className="min-h-96">
            <div className="bg-gray-50 border-l-4 border-gray-500 p-3 mb-4">
              <h3 className="font-semibold text-gray-700 text-sm">DENEGADO</h3>
              <div className="text-xs text-gray-600 mb-2">
                {formatearEstimacion(calcularSumaEstimaciones(gruposPorEstado['DENEGADO']))} ({gruposPorEstado['DENEGADO'].length})
              </div>
              <div className="text-xs text-gray-600">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  <span>Oportunidad cerrada</span>
                </div>
              </div>
            </div>
            <div 
              className="space-y-3 min-h-80"
              onDrop={(e) => handleDrop(e, 'DENEGADO')}
              onDragOver={handleDragOver}
            >
              {obtenerGruposPaginados(gruposPorEstado['DENEGADO'], paginasEstados['DENEGADO']).map((grupo) => (
                                            <div
                              key={grupo.id}
                              draggable
                              onDragStart={(e) => handleDragStart(e, grupo, 'DENEGADO')}
                              className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-move"
                            >
                              <h4 className="font-medium text-gray-900 text-xs mb-1">{grupo.nombre}</h4>
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <MapPin size={12} className="mr-1" />
                    {grupo.localidad}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {editandoEstimacion && editandoEstimacion.grupo.id === grupo.id ? (
                        <div className="flex items-center space-x-1">
                          <input
                            type="text"
                            defaultValue={grupo.estimacion}
                            className="text-sm border border-gray-300 rounded px-2 py-1 w-20"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleSaveEstimacion(e.target.value)
                              }
                            }}
                            onBlur={(e) => handleSaveEstimacion(e.target.value)}
                            autoFocus
                          />
                          <button
                            onClick={() => handleCancelEdit()}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="text-sm font-semibold text-gray-600">{grupo.estimacion}</div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleEditEstimacion(grupo, 'DENEGADO')
                            }}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                            title="Editar estimación"
                          >
                            <Edit size={14} />
                          </button>
                        </>
                      )}
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">P{grupo.prioridad}</span>
                  </div>
                </div>
              ))}
              <ControlesPaginacion
                tipo="estados"
                columna="DENEGADO"
                paginaActual={paginasEstados['DENEGADO']}
                totalPaginas={calcularTotalPaginas(gruposPorEstado['DENEGADO'])}
                grupos={gruposPorEstado['DENEGADO']}
              />
            </div>
          </div>

          {/* Columna: IMPOSIBLE COTIZAR */}
          <div className="min-h-96">
            <div className="bg-gray-50 border-l-4 border-gray-500 p-3 mb-4">
              <h3 className="font-semibold text-gray-700 text-sm">IMPOSIBLE COTIZAR</h3>
              <div className="text-xs text-gray-600 mb-2">
                {formatearEstimacion(calcularSumaEstimaciones(gruposPorEstado['IMPOSIBLE COTIZAR']))} ({gruposPorEstado['IMPOSIBLE COTIZAR'].length})
              </div>
              <div className="text-xs text-gray-600">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  <span>No viable</span>
                </div>
              </div>
            </div>
            <div 
              className="space-y-3 min-h-80"
              onDrop={(e) => handleDrop(e, 'IMPOSIBLE COTIZAR')}
              onDragOver={handleDragOver}
            >
              {obtenerGruposPaginados(gruposPorEstado['IMPOSIBLE COTIZAR'], paginasEstados['IMPOSIBLE COTIZAR']).map((grupo) => (
                                            <div
                              key={grupo.id}
                              draggable
                              onDragStart={(e) => handleDragStart(e, grupo, 'IMPOSIBLE COTIZAR')}
                              className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-move"
                            >
                              <h4 className="font-medium text-gray-900 text-xs mb-1">{grupo.nombre}</h4>
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <MapPin size={12} className="mr-1" />
                    {grupo.localidad}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {editandoEstimacion && editandoEstimacion.grupo.id === grupo.id ? (
                        <div className="flex items-center space-x-1">
                          <input
                            type="text"
                            defaultValue={grupo.estimacion}
                            className="text-sm border border-gray-300 rounded px-2 py-1 w-20"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleSaveEstimacion(e.target.value)
                              }
                            }}
                            onBlur={(e) => handleSaveEstimacion(e.target.value)}
                            autoFocus
                          />
                          <button
                            onClick={() => handleCancelEdit()}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="text-sm font-semibold text-gray-600">{grupo.estimacion}</div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleEditEstimacion(grupo, 'IMPOSIBLE COTIZAR')
                            }}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                            title="Editar estimación"
                          >
                            <Edit size={14} />
                          </button>
                        </>
                      )}
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">P{grupo.prioridad}</span>
                  </div>
                </div>
              ))}
              <ControlesPaginacion
                tipo="estados"
                columna="IMPOSIBLE COTIZAR"
                paginaActual={paginasEstados['IMPOSIBLE COTIZAR']}
                totalPaginas={calcularTotalPaginas(gruposPorEstado['IMPOSIBLE COTIZAR'])}
                grupos={gruposPorEstado['IMPOSIBLE COTIZAR']}
              />
            </div>
          </div>
        </div>
        )}

        {/* Tablero por Prioridad */}
        {vistaActiva === 'prioridad' && (
          <div className="grid grid-cols-5 gap-4">
            {/* Columna: Prioridad 1 */}
            <div className="min-h-96">
              <div className="bg-red-50 border-l-4 border-red-500 p-3 mb-4">
                <h3 className="font-semibold text-red-700 text-sm">Prioridad 1</h3>
                <div className="text-xs text-red-600">
                  {formatearEstimacion(calcularSumaEstimaciones(gruposPorPrioridad['Prioridad 1']))} ({gruposPorPrioridad['Prioridad 1'].length})
                </div>
              </div>
              <div 
                className="space-y-3 min-h-80"
                onDrop={(e) => handleDrop(e, 'Prioridad 1')}
                onDragOver={handleDragOver}
              >
                {obtenerGruposPaginados(gruposPorPrioridad['Prioridad 1'], paginasPrioridad['Prioridad 1']).map((grupo) => (
                  <div
                    key={grupo.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, grupo, 'Prioridad 1')}
                    className="bg-white border border-red-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-move"
                  >
                    <h4 className="font-medium text-gray-900 text-xs mb-1">{grupo.nombre}</h4>
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <MapPin size={12} className="mr-1" />
                      {grupo.localidad}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {editandoEstimacion && editandoEstimacion.grupo.id === grupo.id ? (
                          <div className="flex items-center space-x-1">
                            <input
                              type="text"
                              defaultValue={grupo.estimacion}
                              className="text-sm border border-gray-300 rounded px-2 py-1 w-20"
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  handleSaveEstimacion(e.target.value)
                                }
                              }}
                              onBlur={(e) => handleSaveEstimacion(e.target.value)}
                              autoFocus
                            />
                            <button
                              onClick={() => handleCancelEdit()}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <>
                            <div className="text-sm font-semibold text-gray-600">{grupo.estimacion}</div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleEditEstimacion(grupo, 'Prioridad 1')
                              }}
                              className="text-gray-400 hover:text-gray-600 transition-colors"
                              title="Editar estimación"
                            >
                              <Edit size={14} />
                            </button>
                          </>
                        )}
                      </div>
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">{grupo.estado}</span>
                    </div>
                  </div>
                ))}
                <ControlesPaginacion
                  tipo="prioridad"
                  columna="Prioridad 1"
                  paginaActual={paginasPrioridad['Prioridad 1']}
                  totalPaginas={calcularTotalPaginas(gruposPorPrioridad['Prioridad 1'])}
                  grupos={gruposPorPrioridad['Prioridad 1']}
                />
              </div>
            </div>

            {/* Columna: Prioridad 2 */}
            <div className="min-h-96">
              <div className="bg-orange-50 border-l-4 border-orange-500 p-3 mb-4">
                <h3 className="font-semibold text-orange-700 text-sm">Prioridad 2</h3>
                <div className="text-xs text-orange-600">
                  {formatearEstimacion(calcularSumaEstimaciones(gruposPorPrioridad['Prioridad 2']))} ({gruposPorPrioridad['Prioridad 2'].length})
                </div>
              </div>
              <div 
                className="space-y-3 min-h-80"
                onDrop={(e) => handleDrop(e, 'Prioridad 2')}
                onDragOver={handleDragOver}
              >
                {obtenerGruposPaginados(gruposPorPrioridad['Prioridad 2'], paginasPrioridad['Prioridad 2']).map((grupo) => (
                  <div
                    key={grupo.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, grupo, 'Prioridad 2')}
                    className="bg-white border border-orange-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-move"
                  >
                    <h4 className="font-medium text-gray-900 text-xs mb-1">{grupo.nombre}</h4>
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <MapPin size={12} className="mr-1" />
                      {grupo.localidad}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {editandoEstimacion && editandoEstimacion.grupo.id === grupo.id ? (
                          <div className="flex items-center space-x-1">
                            <input
                              type="text"
                              defaultValue={grupo.estimacion}
                              className="text-sm border border-gray-300 rounded px-2 py-1 w-20"
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  handleSaveEstimacion(e.target.value)
                                }
                              }}
                              onBlur={(e) => handleSaveEstimacion(e.target.value)}
                              autoFocus
                            />
                            <button
                              onClick={() => handleCancelEdit()}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <>
                            <div className="text-sm font-semibold text-gray-600">{grupo.estimacion}</div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleEditEstimacion(grupo, 'Prioridad 2')
                              }}
                              className="text-gray-400 hover:text-gray-600 transition-colors"
                              title="Editar estimación"
                            >
                              <Edit size={14} />
                            </button>
                          </>
                        )}
                      </div>
                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">{grupo.estado}</span>
                    </div>
                  </div>
                ))}
                <ControlesPaginacion
                  tipo="prioridad"
                  columna="Prioridad 2"
                  paginaActual={paginasPrioridad['Prioridad 2']}
                  totalPaginas={calcularTotalPaginas(gruposPorPrioridad['Prioridad 2'])}
                  grupos={gruposPorPrioridad['Prioridad 2']}
                />
              </div>
            </div>

            {/* Columna: Prioridad 3 */}
            <div className="min-h-96">
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 mb-4">
                <h3 className="font-semibold text-yellow-700 text-sm">Prioridad 3</h3>
                <div className="text-xs text-yellow-600">
                  {formatearEstimacion(calcularSumaEstimaciones(gruposPorPrioridad['Prioridad 3']))} ({gruposPorPrioridad['Prioridad 3'].length})
                </div>
              </div>
              <div 
                className="space-y-3 min-h-80"
                onDrop={(e) => handleDrop(e, 'Prioridad 3')}
                onDragOver={handleDragOver}
              >
                {obtenerGruposPaginados(gruposPorPrioridad['Prioridad 3'], paginasPrioridad['Prioridad 3']).map((grupo) => (
                  <div
                    key={grupo.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, grupo, 'Prioridad 3')}
                    className="bg-white border border-yellow-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-move"
                  >
                    <h4 className="font-medium text-gray-900 text-xs mb-1">{grupo.nombre}</h4>
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <MapPin size={12} className="mr-1" />
                      {grupo.localidad}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {editandoEstimacion && editandoEstimacion.grupo.id === grupo.id ? (
                          <div className="flex items-center space-x-1">
                            <input
                              type="text"
                              defaultValue={grupo.estimacion}
                              className="text-sm border border-gray-300 rounded px-2 py-1 w-20"
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  handleSaveEstimacion(e.target.value)
                                }
                              }}
                              onBlur={(e) => handleSaveEstimacion(e.target.value)}
                              autoFocus
                            />
                            <button
                              onClick={() => handleCancelEdit()}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <>
                            <div className="text-sm font-semibold text-gray-600">{grupo.estimacion}</div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleEditEstimacion(grupo, 'Prioridad 3')
                              }}
                              className="text-gray-400 hover:text-gray-600 transition-colors"
                              title="Editar estimación"
                            >
                              <Edit size={14} />
                            </button>
                          </>
                        )}
                      </div>
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">{grupo.estado}</span>
                    </div>
                  </div>
                ))}
                <ControlesPaginacion
                  tipo="prioridad"
                  columna="Prioridad 3"
                  paginaActual={paginasPrioridad['Prioridad 3']}
                  totalPaginas={calcularTotalPaginas(gruposPorPrioridad['Prioridad 3'])}
                  grupos={gruposPorPrioridad['Prioridad 3']}
                />
              </div>
            </div>

            {/* Columna: Prioridad 4 */}
            <div className="min-h-96">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mb-4">
                <h3 className="font-semibold text-blue-700 text-sm">Prioridad 4</h3>
                <div className="text-xs text-blue-600">
                  {formatearEstimacion(calcularSumaEstimaciones(gruposPorPrioridad['Prioridad 4']))} ({gruposPorPrioridad['Prioridad 4'].length})
                </div>
              </div>
              <div 
                className="space-y-3 min-h-80"
                onDrop={(e) => handleDrop(e, 'Prioridad 4')}
                onDragOver={handleDragOver}
              >
                {obtenerGruposPaginados(gruposPorPrioridad['Prioridad 4'], paginasPrioridad['Prioridad 4']).map((grupo) => (
                  <div
                    key={grupo.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, grupo, 'Prioridad 4')}
                    className="bg-white border border-blue-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-move"
                  >
                    <h4 className="font-medium text-gray-900 text-xs mb-1">{grupo.nombre}</h4>
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <MapPin size={12} className="mr-1" />
                      {grupo.localidad}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {editandoEstimacion && editandoEstimacion.grupo.id === grupo.id ? (
                          <div className="flex items-center space-x-1">
                            <input
                              type="text"
                              defaultValue={grupo.estimacion}
                              className="text-sm border border-gray-300 rounded px-2 py-1 w-20"
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  handleSaveEstimacion(e.target.value)
                                }
                              }}
                              onBlur={(e) => handleSaveEstimacion(e.target.value)}
                              autoFocus
                            />
                            <button
                              onClick={() => handleCancelEdit()}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <>
                            <div className="text-sm font-semibold text-gray-600">{grupo.estimacion}</div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleEditEstimacion(grupo, 'Prioridad 4')
                              }}
                              className="text-gray-400 hover:text-gray-600 transition-colors"
                              title="Editar estimación"
                            >
                              <Edit size={14} />
                            </button>
                          </>
                        )}
                      </div>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{grupo.estado}</span>
                    </div>
                  </div>
                ))}
                <ControlesPaginacion
                  tipo="prioridad"
                  columna="Prioridad 4"
                  paginaActual={paginasPrioridad['Prioridad 4']}
                  totalPaginas={calcularTotalPaginas(gruposPorPrioridad['Prioridad 4'])}
                  grupos={gruposPorPrioridad['Prioridad 4']}
                />
              </div>
            </div>

            {/* Columna: Prioridad 5 */}
            <div className="min-h-96">
              <div className="bg-gray-50 border-l-4 border-gray-500 p-3 mb-4">
                <h3 className="font-semibold text-gray-700 text-sm">Prioridad 5</h3>
                <div className="text-xs text-gray-600">
                  {formatearEstimacion(calcularSumaEstimaciones(gruposPorPrioridad['Prioridad 5']))} ({gruposPorPrioridad['Prioridad 5'].length})
                </div>
              </div>
              <div 
                className="space-y-3 min-h-80"
                onDrop={(e) => handleDrop(e, 'Prioridad 5')}
                onDragOver={handleDragOver}
              >
                {obtenerGruposPaginados(gruposPorPrioridad['Prioridad 5'], paginasPrioridad['Prioridad 5']).map((grupo) => (
                  <div
                    key={grupo.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, grupo, 'Prioridad 5')}
                    className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-move"
                  >
                    <h4 className="font-medium text-gray-900 text-xs mb-1">{grupo.nombre}</h4>
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <MapPin size={12} className="mr-1" />
                      {grupo.localidad}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {editandoEstimacion && editandoEstimacion.grupo.id === grupo.id ? (
                          <div className="flex items-center space-x-1">
                            <input
                              type="text"
                              defaultValue={grupo.estimacion}
                              className="text-sm border border-gray-300 rounded px-2 py-1 w-20"
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  handleSaveEstimacion(e.target.value)
                                }
                              }}
                              onBlur={(e) => handleSaveEstimacion(e.target.value)}
                              autoFocus
                            />
                            <button
                              onClick={() => handleCancelEdit()}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <>
                            <div className="text-sm font-semibold text-gray-600">{grupo.estimacion}</div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleEditEstimacion(grupo, 'Prioridad 5')
                              }}
                              className="text-gray-400 hover:text-gray-600 transition-colors"
                              title="Editar estimación"
                            >
                              <Edit size={14} />
                            </button>
                          </>
                        )}
                      </div>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">{grupo.estado}</span>
                    </div>
                  </div>
                ))}
                <ControlesPaginacion
                  tipo="prioridad"
                  columna="Prioridad 5"
                  paginaActual={paginasPrioridad['Prioridad 5']}
                  totalPaginas={calcularTotalPaginas(gruposPorPrioridad['Prioridad 5'])}
                  grupos={gruposPorPrioridad['Prioridad 5']}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
