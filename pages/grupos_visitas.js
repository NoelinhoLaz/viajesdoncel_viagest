import React, { useState } from 'react'
import { List, Kanban, LayoutDashboard, Settings, MapPin, Search, Filter, ArrowUpDown, Calendar, Clock, MapPin as MapPinIcon, Users, Phone, Mail, Edit, Trash2, Plus, Eye, X, Target } from 'lucide-react'
import Select from 'react-select'
// import TaskProgressModal from '../components/ui/TaskProgressModal'

export default function GruposVisitas() {
  const [showFilters, setShowFilters] = useState(false)
  const [showSortMenu, setShowSortMenu] = useState(false)
  const [selectedCursos, setSelectedCursos] = useState([])
  const [selectedEstados, setSelectedEstados] = useState([])
  const [selectedLocalidades, setSelectedLocalidades] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [visitasPorDia, setVisitasPorDia] = useState({})
  const [horasVisitas, setHorasVisitas] = useState({})

  // Opciones para los dropdowns
  const cursoOptions = [
    { value: '4eso', label: '4º ESO' },
    { value: '3eso', label: '3º ESO' },
    { value: '2bach', label: '2º Bachillerato' },
    { value: '1bach', label: '1º Bachillerato' }
  ]

  const estadoOptions = [
    { value: 'programada', label: 'Programada' },
    { value: 'en-progreso', label: 'En Progreso' },
    { value: 'completada', label: 'Completada' },
    { value: 'cancelada', label: 'Cancelada' },
    { value: 'reprogramada', label: 'Reprogramada' }
  ]

  const localidadOptions = [
    { value: 'madrid', label: 'Madrid' },
    { value: 'barcelona', label: 'Barcelona' },
    { value: 'valencia', label: 'Valencia' },
    { value: 'sevilla', label: 'Sevilla' },
    { value: 'bilbao', label: 'Bilbao' }
  ]

  // Generar opciones de hora (8:00 a 18:00)
  const horaOptions = Array.from({ length: 11 }, (_, i) => {
    const hora = i + 8
    return {
      value: `${hora.toString().padStart(2, '0')}:00`,
      label: `${hora.toString().padStart(2, '0')}:00`
    }
  })

  // Datos de ejemplo para el listado de grupos
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
      contacto: 'D. Antonio López',
      email: 'administracion@sanpablo.edu',
      historial: ['Pdte. Visitar', 'Visitado', 'Pdte. Cotizar'],
      estado: 'En Seguimiento',
      estimacion: '39.500 €',
      colorEstado: '#facc15'
    }
  ]

  // Datos de ejemplo para las visitas
  const visitasData = [
    {
      id: 1,
      grupo: 'COLEGIO SAN JOSÉ - 4º ESO',
      localidad: 'Madrid',
      fecha: '2024-09-15',
      hora: '10:00',
      estado: 'Programada',
      tipo: 'Primera visita',
      contacto: 'D. Carlos Rodríguez',
      telefono: '91 123 45 67',
      email: 'director@colegiosanjose.es',
      direccion: 'Calle Mayor, 123',
      observaciones: 'Centro interesado en viajes culturales',
      colorEstado: '#3b82f6'
    },
    {
      id: 2,
      grupo: 'INSTITUTO MARÍA ZAMBRANO - 2º BACHILLERATO',
      localidad: 'Barcelona',
      fecha: '2024-09-12',
      hora: '15:30',
      estado: 'Completada',
      tipo: 'Seguimiento',
      contacto: 'Sra. Ana Martínez',
      telefono: '93 456 78 90',
      email: 'secretaria@mariazambrano.edu',
      direccion: 'Avenida Diagonal, 456',
      observaciones: 'Visita exitosa, presupuesto aprobado',
      colorEstado: '#10b981'
    },
    {
      id: 3,
      grupo: 'COLEGIO NUESTRA SEÑORA - 3º ESO',
      localidad: 'Valencia',
      fecha: '2024-09-18',
      hora: '11:00',
      estado: 'En Progreso',
      tipo: 'Presentación propuesta',
      contacto: 'D. Miguel López',
      telefono: '96 789 01 23',
      email: 'administracion@nuestrasenora.com',
      direccion: 'Carrer de la Pau, 789',
      observaciones: 'Reunión con dirección y coordinadores',
      colorEstado: '#f59e0b'
    },
    {
      id: 4,
      grupo: 'IES FRANCISCO AYALA - 1º BACHILLERATO',
      localidad: 'Sevilla',
      fecha: '2024-09-10',
      hora: '16:00',
      estado: 'Cancelada',
      tipo: 'Primera visita',
      contacto: 'Dña. Carmen García',
      telefono: '95 123 45 67',
      email: 'secretaria@iesfranciscoayala.es',
      direccion: 'Calle San Fernando, 45',
      observaciones: 'Cancelada por enfermedad del director',
      colorEstado: '#ef4444'
    },
    {
      id: 5,
      grupo: 'COLEGIO SAN AGUSTÍN - 4º ESO',
      localidad: 'Bilbao',
      fecha: '2024-09-20',
      hora: '09:30',
      estado: 'Programada',
      tipo: 'Seguimiento',
      contacto: 'D. Javier Pérez',
      telefono: '94 456 78 90',
      email: 'javier.perez@sanagustin.edu',
      direccion: 'Gran Vía, 78',
      observaciones: 'Segunda visita para cerrar detalles',
      colorEstado: '#3b82f6'
    }
  ]

  // Calcular datos paginados para visitas
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentVisitas = visitasData.slice(startIndex, endIndex)
  const totalPages = Math.ceil(visitasData.length / itemsPerPage)

  // Lógica de filtrado para grupos
  const gruposFiltrados = gruposData.filter(grupo => {
    const cumpleCurso = selectedCursos.length === 0 || selectedCursos.some(curso => grupo.nombre.includes(curso.label))
    const cumplePrioridad = selectedEstados.length === 0 || selectedEstados.some(estado => grupo.estado === estado.label)
    const cumpleLocalidad = selectedLocalidades.length === 0 || selectedLocalidades.some(localidad => grupo.localidad === localidad.label)
    
    return cumpleCurso && cumplePrioridad && cumpleLocalidad
  })

  const currentGrupos = gruposFiltrados.slice(startIndex, endIndex)
  const totalPagesGrupos = Math.ceil(gruposFiltrados.length / itemsPerPage)

  // Funciones auxiliares para grupos
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

  const getVisitaEstadoColor = (estado) => {
    switch (estado) {
      case 'Programada':
        return 'bg-blue-100 text-blue-800'
      case 'En Progreso':
        return 'bg-yellow-100 text-yellow-800'
      case 'Completada':
        return 'bg-green-100 text-green-800'
      case 'Cancelada':
        return 'bg-red-100 text-red-800'
      case 'Reprogramada':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
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

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }



  // Funciones para drag and drop
  const handleDragStart = (e, grupo) => {
    e.dataTransfer.setData('application/json', JSON.stringify(grupo))
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e, diaIndex) => {
    e.preventDefault()
    const grupo = JSON.parse(e.dataTransfer.getData('application/json'))
    
    setVisitasPorDia(prev => ({
      ...prev,
      [diaIndex]: [...(prev[diaIndex] || []), grupo]
    }))
  }

  const handleHoraChange = (diaIndex, visitaIndex, hora) => {
    setHorasVisitas(prev => ({
      ...prev,
      [`${diaIndex}-${visitaIndex}`]: hora
    }))
  }

  return (
    <div>
      {/* Div personalizado de ancho completo x 48px - ENCIMA DE TODO */}
      <div className="w-full h-12 flex items-center justify-between pl-2 pr-6 mt-2 mb-4">
        <h1 className="text-3xl font-normal text-yale-blue font-raleway uppercase tracking-wider">Gestión de Visitas</h1>
        <span className="text-lg font-medium text-air-force-blue font-inter">Curso 2024/2025</span>
      </div>

      {/* Navegación y Botón Nueva Visita */}
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
            className="flex items-center space-x-2 p-2 text-gray-600 hover:text-yale-blue transition-colors"
            title="Tablero"
          >
            <Kanban size={18} />
            <span className="text-sm font-medium">Tablero</span>
          </button>

          <button
            onClick={() => window.location.href = '/grupos_visitas'}
            className="flex items-center space-x-2 p-2 text-yale-blue bg-blue-50 rounded-lg transition-colors"
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
        <button className="bg-yale-blue text-white px-4 py-1 rounded-lg hover:bg-air-force-blue transition-colors text-sm flex items-center space-x-2">
          <Plus size={16} />
          <span>Nueva Visita</span>
        </button>
      </div>

      {/* Contenedor principal con grid */}
      <div className="mt-4 grid grid-cols-2 gap-6 h-[calc(100vh-200px)]">
        {/* Listado de Grupos */}
        <div className="bg-white-custom rounded-lg shadow-md p-6 flex flex-col h-full">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-yale-blue">LISTADO DE GRUPOS</h2>
            <div className="flex items-center space-x-3">
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
            </div>
          </div>

          {/* Filtros */}
          {showFilters && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                  />
                </div>

                {/* Botón Limpiar */}
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSelectedCursos([])
                      setSelectedEstados([])
                      setSelectedLocalidades([])
                      setCurrentPage(1)
                    }}
                    className="w-full bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-xs hover:bg-gray-300 transition-colors"
                  >
                    Limpiar Filtros
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tabla */}
          <div className="overflow-x-auto flex-1 overflow-y-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                                     <th className="text-center py-1 px-2 font-semibold text-gray-700 w-12 text-xs uppercase">P</th>
                   <th className="text-left py-1 px-4 font-semibold text-gray-700 text-xs uppercase">Nombre</th>
                   <th className="text-left py-1 px-4 font-semibold text-gray-700 text-xs uppercase">Historial</th>
                   <th className="text-left py-1 px-4 font-semibold text-gray-700 text-xs uppercase">Estado</th>
                </tr>
              </thead>
              <tbody>
                                 {currentGrupos.map((grupo) => (
                   <tr 
                     key={grupo.id} 
                     className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-grab active:cursor-grabbing"
                     draggable
                     onDragStart={(e) => handleDragStart(e, grupo)}
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
                                         <td className="py-1 px-4">
                       <div 
                         className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white"
                         style={{ backgroundColor: grupo.colorEstado }}
                       >
                         {grupo.estado}
                       </div>
                     </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          {totalPagesGrupos > 1 && (
            <div className="mt-6 flex justify-between items-center flex-shrink-0">
              <div className="text-sm text-gray-700">
                Mostrando {startIndex + 1} a {Math.min(endIndex, gruposFiltrados.length)} de {gruposFiltrados.length} grupos
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Anterior
                </button>
                <span className="px-3 py-1 text-sm text-gray-700">
                  Página {currentPage} de {totalPagesGrupos}
                </span>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPagesGrupos, currentPage + 1))}
                  disabled={currentPage === totalPagesGrupos}
                  className="px-3 py-1 text-sm border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}


        </div>

        {/* Segunda Columna - Calendario de Días */}
        <div className="space-y-4 h-full overflow-y-auto">
          {/* Generar 10 días empezando por hoy */}
          {Array.from({ length: 10 }, (_, index) => {
            const date = new Date()
            date.setDate(date.getDate() + index)
            const dayName = date.toLocaleDateString('es-ES', { weekday: 'long' })
            const dayNumber = date.getDate()
            const monthName = date.toLocaleDateString('es-ES', { month: 'long' })
            
                         return (
               <div 
                 key={index} 
                 className="bg-white-custom rounded-lg shadow-md p-4 min-h-[120px]"
                 onDragOver={handleDragOver}
                 onDrop={(e) => handleDrop(e, index)}
               >
                 <div className="flex items-center justify-between mb-3">
                   <div>
                     <h3 className="text-lg font-semibold text-yale-blue capitalize">{dayName}</h3>
                     <p className="text-sm text-gray-600">{dayNumber} de {monthName}</p>
                   </div>
                   <div className="text-right">
                     <div className="text-xs text-gray-500">Día {index + 1}</div>
                   </div>
                 </div>
                                    <div className="border-t border-gray-200 pt-3">
                     {visitasPorDia[index] && visitasPorDia[index].length > 0 ? (
                       <div className="space-y-2">
                         {visitasPorDia[index].map((visita, visitaIndex) => (
                           <div 
                             key={`${visita.id}-${visitaIndex}`} 
                             className="border-b border-gray-100 hover:bg-gray-50 transition-colors p-2 rounded"
                           >
                             <div className="flex items-center space-x-2">
                               {/* Prioridad */}
                               <div className="flex-shrink-0">
                                 <div className={`inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-medium ${getPrioridadColor(visita.prioridad)}`}>
                                   {visita.prioridad}
                                 </div>
                               </div>
                               
                               {/* Nombre y Localidad */}
                               <div className="flex-1 min-w-0">
                                 <div className="font-medium text-gray-900 text-xs">{visita.nombre}</div>
                                 <div className="text-xs text-gray-500">{visita.localidad}</div>
                               </div>
                               
                               {/* Historial */}
                               <div className="flex-shrink-0">
                                 <div className="flex items-center">
                                   {visita.historial.length > 0 ? (
                                     visita.historial.map((estado, histIndex) => (
                                       <div 
                                         key={histIndex}
                                         className="inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold text-white border-2 border-white shadow-sm"
                                         style={{ 
                                           backgroundColor: getEstadoColor(estado),
                                           marginLeft: histIndex > 0 ? '-6px' : '0px',
                                           zIndex: histIndex + 1
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
                               </div>
                               
                               {/* Estado */}
                               <div className="flex-shrink-0">
                                 <div 
                                   className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white"
                                   style={{ backgroundColor: visita.colorEstado }}
                                 >
                                   {visita.estado}
                                 </div>
                               </div>
                               
                               {/* Selector de Hora */}
                               <div className="flex-shrink-0">
                                 <select
                                   className="text-xs border border-gray-300 rounded px-1 py-0.5 bg-white focus:outline-none focus:ring-1 focus:ring-yale-blue focus:border-yale-blue"
                                   value={horasVisitas[`${index}-${visitaIndex}`] || '09:00'}
                                   onChange={(e) => handleHoraChange(index, visitaIndex, e.target.value)}
                                 >
                                   {horaOptions.map((option) => (
                                     <option key={option.value} value={option.value}>
                                       {option.label}
                                     </option>
                                   ))}
                                 </select>
                               </div>
                             </div>
                           </div>
                         ))}
                       </div>
                     ) : (
                       <div className="text-sm text-gray-500 italic">
                         Arrastra un centro aquí
                       </div>
                     )}
                   </div>
               </div>
             )
          })}
        </div>
      </div>


    </div>
  )
}
