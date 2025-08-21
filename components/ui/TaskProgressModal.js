import React, { useState, useEffect } from 'react'
import { X, MessageCircle, Paperclip, User, Star, MoreVertical, CheckCircle, Target } from 'lucide-react'

export default function TaskProgressModal({ isOpen, onClose, grupo }) {
  const [activeTab, setActiveTab] = useState('timeline')
  const [expandedPhases, setExpandedPhases] = useState({})
  const [barStates, setBarStates] = useState({})
  const [dragging, setDragging] = useState(null)
  const [resizing, setResizing] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  
  // Estados para edición de métricas
  const [editingField, setEditingField] = useState(null)
  const [editValues, setEditValues] = useState({
    estimacion: grupo?.estimacion || '45.000',
    probabilidad: '75',
    tiempo: '12 días',
    fechaInicio: '',
    fechaFin: ''
  })
  const [validationError, setValidationError] = useState('')

  // Generar columnas del timeline basándose en las fechas seleccionadas
  const generateTimelineColumns = () => {
    if (!editValues.fechaInicio || !editValues.fechaFin) {
      // Si no hay fechas seleccionadas, usar fechas por defecto para 12 días
      return [
        { day: 1, month: 9 },
        { day: 2, month: 9 },
        { day: 3, month: 9 },
        { day: 4, month: 9 },
        { day: 5, month: 9 },
        { day: 6, month: 9 },
        { day: 7, month: 9 },
        { day: 8, month: 9 },
        { day: 9, month: 9 },
        { day: 10, month: 9 },
        { day: 11, month: 9 },
        { day: 12, month: 9 }
      ]
    }

    const startDate = new Date(editValues.fechaInicio)
    const endDate = new Date(editValues.fechaFin)
    const columns = []
    
    // Generar una columna por cada día entre las fechas
    const currentDate = new Date(startDate)
    while (currentDate <= endDate) {
      columns.push({
        day: currentDate.getDate(),
        month: currentDate.getMonth() + 1
      })
      currentDate.setDate(currentDate.getDate() + 1)
    }
    
    return columns
  }

  // Generar las columnas del timeline
  const dates = generateTimelineColumns()

  // Inicializar estados de las barras
  useEffect(() => {
    if (isOpen && grupo) {
      const initialBarStates = {}
      planAccion.forEach(phase => {
        const position = calculateBarPosition(phase)
        initialBarStates[phase.id] = {
          left: position.left,
          width: position.width,
          progress: getProgressForPhase(phase.id)
        }
      })
      setBarStates(initialBarStates)
    }
  }, [isOpen, grupo])
  
  // Recalcular posiciones de las barras cuando cambien las fechas
  useEffect(() => {
    if (isOpen && grupo && dates && dates.length > 0) {
      const updatedBarStates = {}
      planAccion.forEach(phase => {
        const position = calculateBarPosition(phase)
        updatedBarStates[phase.id] = {
          left: position.left,
          width: position.width,
          progress: getProgressForPhase(phase.id)
        }
      })
      setBarStates(updatedBarStates)
    }
  }, [editValues.fechaInicio, editValues.fechaFin, dates])
  
  // Funciones para edición de métricas
  const handleEditField = (field) => {
    setEditingField(field)
    setValidationError('')
  }
  
  const handleSaveField = (field) => {
    if (field === 'tiempo') {
      if (!editValues.fechaInicio || !editValues.fechaFin) {
        setValidationError('Por favor selecciona ambas fechas')
        return
      }
      
      if (editValues.fechaInicio > editValues.fechaFin) {
        setValidationError('La fecha de inicio no puede ser posterior a la fecha de fin')
        return
      }
      
      // Calcular tiempo estimado basado en las fechas
      const inicio = new Date(editValues.fechaInicio)
      const fin = new Date(editValues.fechaFin)
      const diffTime = Math.abs(fin - inicio)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      
      let tiempoCalculado = ''
      if (diffDays <= 30) {
        tiempoCalculado = `${diffDays} días`
      } else if (diffDays <= 365) {
        const meses = Math.ceil(diffDays / 30)
        tiempoCalculado = `${meses} mes${meses > 1 ? 'es' : ''}`
      } else {
        const años = Math.ceil(diffDays / 365)
        tiempoCalculado = `${años} año${años > 1 ? 's' : ''}`
      }
      
      setEditValues(prev => ({
        ...prev,
        tiempo: tiempoCalculado
      }))
      
      setValidationError('')
    }
    
    setEditingField(null)
    // Aquí se podría guardar en base de datos
  }
  
  const handleCancelEdit = () => {
    setEditingField(null)
    setValidationError('')
    // Restaurar valores originales
    setEditValues({
      estimacion: grupo?.estimacion || '45.000',
      probabilidad: '75',
      tiempo: '12 días',
      fechaInicio: '',
      fechaFin: ''
    })
  }
  
  const handleInputChange = (field, value) => {
    setEditValues(prev => {
      const newValues = {
        ...prev,
        [field]: value
      }
      
      // Si se cambia la fecha de inicio y hay fecha de fin, ajustar fecha de fin si es necesario
      if (field === 'fechaInicio' && prev.fechaFin && value > prev.fechaFin) {
        newValues.fechaFin = value
      }
      
      // Si se cambia la fecha de fin y hay fecha de inicio, ajustar fecha de inicio si es necesario
      if (field === 'fechaFin' && prev.fechaInicio && value < prev.fechaInicio) {
        newValues.fechaInicio = value
      }
      
      return newValues
    })
    
    // Limpiar error de validación cuando se cambian las fechas
    if (field === 'fechaInicio' || field === 'fechaFin') {
      setValidationError('')
    }
  }
  
  const handleKeyPress = (e, field) => {
    if (e.key === 'Enter') {
      handleSaveField(field)
    } else if (e.key === 'Escape') {
      handleCancelEdit()
    }
  }

  if (!isOpen) return null

  const togglePhase = (phaseId) => {
    setExpandedPhases(prev => ({
      ...prev,
      [phaseId]: !prev[phaseId]
    }))
  }

  const handleMouseDown = (e, phaseId, action) => {
    e.preventDefault()
    if (action === 'drag') {
      setDragging(phaseId)
    } else if (action === 'resize') {
      setResizing(phaseId)
    }
  }

  const handleMouseMove = (e) => {
    if (dragging || resizing) {
      const timelineRect = e.currentTarget.getBoundingClientRect()
      const mouseX = e.clientX - timelineRect.left
      const percentage = (mouseX / timelineRect.width) * 100

      setBarStates(prev => {
        const current = prev[dragging || resizing]
        if (!current) return prev

        if (dragging) {
          // Arrastrar la barra
          const newLeft = Math.max(0, Math.min(100 - current.width, percentage))
          return {
            ...prev,
            [dragging]: { ...current, left: newLeft }
          }
        } else if (resizing) {
          // Redimensionar la barra - permitir reducir y aumentar
          const newWidth = Math.max(5, percentage - current.left)
          console.log('Resizing:', { phaseId: resizing, currentLeft: current.left, percentage, newWidth })
          return {
            ...prev,
            [resizing]: { ...current, width: newWidth }
          }
        }
        return prev
      })
    }
  }

  const handleMouseUp = () => {
    setDragging(null)
    setResizing(null)
  }

  // Datos del Plan de Acción del grupo
  const planAccion = [
    {
      id: '1',
      name: 'Pdte. Visitar',
      color: 'bg-purple-500',
      startDate: 28,
      endDate: 29,
      progress: 0,
      label: '1. Pdte. Visitar',
      actions: ['Contacto inicial']
    },
    {
      id: '2',
      name: 'Visitado',
      color: 'bg-orange-500',
      startDate: 30,
      endDate: 31,
      progress: 0,
      label: '2. Visitado',
      actions: ['Análisis de necesidades']
    },
    {
      id: '3',
      name: 'Pdte. Cotizar',
      color: 'bg-cyan-500',
      startDate: 1,
      endDate: 2,
      progress: 0,
      label: '3. Pdte. Cotizar',
      actions: ['Desarrollo de propuesta...', 'Presentación de la propuesta']
    },
    {
      id: '4',
      name: 'En Seguimiento',
      color: 'bg-yellow-500',
      startDate: 3,
      endDate: 4,
      progress: 0,
      label: '4. En Seguimiento',
      actions: ['Negociación', 'Cierre de la oportunidad']
    },
    {
      id: '5',
      name: 'Aceptado',
      color: 'bg-pink-500',
      startDate: 5,
      endDate: 6,
      progress: 0,
      label: '5. Aceptado',
      actions: ['Implementación inicial', 'Seguimiento y fidelización']
    }
  ]

  // Determinar el progreso basado en el estado actual del grupo
  const getProgressForPhase = (phaseId) => {
    if (!grupo) return 0
    
    const estadoActual = grupo.estado
    const phaseIndex = parseInt(phaseId) - 1
    
    if (estadoActual === 'Pdte. Visitar' && phaseIndex === 0) return 100
    if (estadoActual === 'Visitado' && phaseIndex <= 1) return 100
    if (estadoActual === 'Pdte. Cotizar' && phaseIndex <= 2) return 100
    if (estadoActual === 'En Seguimiento' && phaseIndex <= 3) return 100
    if (estadoActual === 'Aceptado' && phaseIndex <= 4) return 100
    
    return 0
  }

  // Calcular posición y ancho de las barras basándose en las fechas del timeline
  const calculateBarPosition = (phase) => {
    if (!dates || dates.length === 0) return { left: 0, width: 100 }
    
    const totalDays = dates.length
    const startDay = phase.startDate
    const endDay = phase.endDate
    
    // Calcular posición y ancho basándose en los días del timeline
    const left = (startDay / totalDays) * 100
    const width = ((endDay - startDay + 1) / totalDays) * 100
    
    return { left, width }
  }

  // Crear tareas individuales para cada acción con fechas específicas
  const tasks = [
    {
      id: '1',
      name: 'Contacto inicial',
      color: 'bg-purple-500',
      startDate: 28,
      endDate: 29,
      progress: getProgressForPhase('1'),
      actions: ['Contacto inicial']
    },
    {
      id: '2',
      name: 'Análisis de necesidades',
      color: 'bg-orange-500',
      startDate: 29,
      endDate: 30,
      progress: getProgressForPhase('2'),
      actions: ['Análisis de necesidades']
    },
    {
      id: '3',
      name: 'Desarrollo de propuesta...',
      color: 'bg-cyan-500',
      startDate: 31,
      endDate: 1,
      progress: getProgressForPhase('3'),
      actions: ['Desarrollo de propuesta...']
    },
    {
      id: '4',
      name: 'Presentación de la propuesta',
      color: 'bg-cyan-500',
      startDate: 1,
      endDate: 2,
      progress: getProgressForPhase('3'),
      actions: ['Presentación de la propuesta']
    },
    {
      id: '5',
      name: 'Negociación',
      color: 'bg-yellow-500',
      startDate: 2,
      endDate: 3,
      progress: getProgressForPhase('4'),
      actions: ['Negociación']
    },
    {
      id: '6',
      name: 'Cierre de la oportunidad',
      color: 'bg-yellow-500',
      startDate: 3,
      endDate: 4,
      progress: getProgressForPhase('4'),
      actions: ['Cierre de la oportunidad']
    },
    {
      id: '7',
      name: 'Implementación inicial',
      color: 'bg-pink-500',
      startDate: 4,
      endDate: 5,
      progress: getProgressForPhase('5'),
      actions: ['Implementación inicial']
    },
    {
      id: '8',
      name: 'Seguimiento y fidelización',
      color: 'bg-pink-500',
      startDate: 5,
      endDate: 6,
      progress: getProgressForPhase('5'),
      actions: ['Seguimiento y fidelización']
    }
  ]





  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-11/12 max-w-7xl h-5/6 overflow-hidden">
        {/* Header */}
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 flex justify-between items-center">
                      <div className="flex items-center space-x-3">
              <Target className="w-8 h-8 text-yale-blue" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">ESTRATEGIA</h2>
              <p className="text-sm text-gray-600">{grupo?.nombre}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>



        {/* Content */}
        <div className="p-6 overflow-auto h-full">
          <div className="space-y-4">
            {/* Métricas del proyecto */}
            <div className="grid grid-cols-3 gap-4">
              {/* Card de Estimación */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-blue-800">Estimación</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {editingField === 'estimacion' ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={editValues.estimacion}
                          onChange={(e) => handleInputChange('estimacion', e.target.value)}
                          onKeyDown={(e) => handleKeyPress(e, 'estimacion')}
                          className="text-2xl font-bold text-blue-600 bg-transparent border-b-2 border-blue-300 focus:outline-none focus:border-blue-500 w-32"
                          autoFocus
                        />
                        <button 
                          onClick={() => handleSaveField('estimacion')}
                          className="p-1 text-green-600 hover:text-green-800 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                        <button 
                          onClick={handleCancelEdit}
                          className="p-1 text-red-600 hover:text-red-800 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="text-2xl font-bold text-blue-600">
                          €{editValues.estimacion}
                        </div>
                        {isEditing && (
                          <button 
                            onClick={() => handleEditField('estimacion')}
                            className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Card de Probabilidad de éxito */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-800">Probabilidad de éxito</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {editingField === 'probabilidad' ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={editValues.probabilidad}
                          onChange={(e) => handleInputChange('probabilidad', e.target.value)}
                          onKeyDown={(e) => handleKeyPress(e, 'probabilidad')}
                          className="text-2xl font-bold text-green-600 bg-transparent border-b-2 border-green-300 focus:outline-none focus:border-green-500 w-16"
                          autoFocus
                        />
                        <span className="text-2xl font-bold text-green-600">%</span>
                        <button 
                          onClick={() => handleSaveField('probabilidad')}
                          className="p-1 text-green-600 hover:text-green-800 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                        <button 
                          onClick={handleCancelEdit}
                          className="p-1 text-red-600 hover:text-red-800 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="text-2xl font-bold text-green-600">{editValues.probabilidad}%</div>
                        {isEditing && (
                          <button 
                            onClick={() => handleEditField('probabilidad')}
                            className="p-1 text-green-600 hover:text-green-800 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Card de Tiempo estimado */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-3 shadow-sm">
                <div className="flex flex-col space-y-3">
                  {/* Fila del título y valor */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="text-sm font-medium text-orange-800">Tiempo estimado</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {editingField === 'tiempo' ? (
                        <>
                          <div className="text-2xl font-bold text-orange-600">{editValues.tiempo}</div>
                          <button 
                            onClick={() => handleSaveField('tiempo')}
                            className="p-1 text-green-600 hover:text-green-800 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                          <button 
                            onClick={handleCancelEdit}
                            className="p-1 text-red-600 hover:text-red-800 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="text-2xl font-bold text-orange-600">{editValues.tiempo}</div>
                          {isEditing && (
                            <button 
                              onClick={() => handleEditField('tiempo')}
                              className="p-1 text-orange-600 hover:text-orange-800 transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* Fila de fechas (solo visible en modo edición) */}
                  {editingField === 'tiempo' && (
                    <div className="flex items-center space-x-2">
                      <input
                        type="date"
                        value={editValues.fechaInicio || ''}
                        max={editValues.fechaFin || ''}
                        onChange={(e) => handleInputChange('fechaInicio', e.target.value)}
                        className="text-sm font-medium text-orange-600 bg-white border border-orange-300 rounded px-2 py-1 focus:outline-none focus:border-orange-500"
                      />
                      <span className="text-sm text-orange-600">a</span>
                      <input
                        type="date"
                        value={editValues.fechaFin || ''}
                        min={editValues.fechaInicio || ''}
                        onChange={(e) => handleInputChange('fechaFin', e.target.value)}
                        className="text-sm font-medium text-orange-600 bg-white border border-orange-300 rounded px-2 py-1 focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  )}
                  
                  {/* Mensaje de error (solo visible en modo edición) */}
                  {editingField === 'tiempo' && validationError && (
                    <div className="text-xs text-red-600 font-medium">
                      {validationError}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Timeline Header */}
            <div className="flex">
              <div className="w-80 flex-shrink-0"></div>
              <div className="flex-1 flex">
                {dates.map((date, index) => (
                  <div key={index} className="flex-1 text-center text-xs font-medium text-gray-500 border-l border-gray-200 py-1">
                    {date.day.toString().padStart(2, '0')}/{date.month.toString().padStart(2, '0')}
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline Grid */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              {planAccion.map((phase, phaseIndex) => (
                <div key={phaseIndex} className="flex items-center border-b border-gray-200 last:border-b-0">
                  {/* Phase Info con acciones */}
                  <div className="w-80 flex-shrink-0 p-3">
                    <div className="flex items-center justify-between mb-0.5">
                      <div className="flex items-center space-x-3">
                        <div className={`w-6 h-6 rounded-full ${phase.color} flex items-center justify-center text-white font-bold text-xs`}>
                          {phase.id}
                        </div>
                        <span className="text-sm font-medium text-gray-900">{phase.name.toUpperCase()}</span>
                      </div>
                      
                      {/* Icono de flecha expandible */}
                      <button
                        onClick={() => togglePhase(phase.id)}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                      >
                        <svg 
                          className={`w-4 h-4 transition-transform ${expandedPhases[phase.id] ? 'rotate-180' : ''}`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                    
                                          {/* Acciones de esta fase (expandibles) */}
                      {expandedPhases[phase.id] && (
                                                <div className="ml-11 space-y-0.5 mt-1">
                          {phase.actions.map((action, actionIndex) => (
                            <div key={actionIndex} className="text-xs text-gray-600 flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${phase.color}`}></div>
                            <span>{action}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Timeline Bar con acciones de esta fase específica */}
                  <div 
                    className="flex-1 flex relative h-12"
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                  >
                    {dates.map((date, dateIndex) => (
                      <div key={dateIndex} className="flex-1 border-l border-gray-200"></div>
                    ))}
                    
                                            {/* Barra de progreso interactiva */}
                        {barStates[phase.id] && (
                          <div 
                            className={`absolute h-6 ${phase.color} rounded-r-lg cursor-move`}
                            style={{
                              left: `${barStates[phase.id].left}%`,
                              width: `${barStates[phase.id].width}%`,
                              top: '50%',
                              transform: 'translateY(-50%)'
                            }}
                            onMouseDown={(e) => handleMouseDown(e, phase.id, 'drag')}
                          >
                            {/* Indicador de días */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-white text-xs font-bold bg-black bg-opacity-30 px-2 py-1 rounded">
                                {Math.round(barStates[phase.id].width / (100 / dates.length))} días
                              </span>
                            </div>
                            
                            {/* Handle de redimensionado */}
                            <div 
                              className="absolute right-0 top-0 w-3 h-full bg-black bg-opacity-50 cursor-ew-resize hover:bg-opacity-80"
                              onMouseDown={(e) => {
                                e.stopPropagation()
                                handleMouseDown(e, phase.id, 'resize')
                              }}
                            ></div>
                          </div>
                        )}
                  </div>
                </div>
              ))}
            </div>

            {/* Sección de información adicional */}
            <div className="grid grid-cols-4 gap-4">
              {/* Riesgos identificados */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-5 h-5 bg-gray-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-gray-800">Riesgos identificados</span>
                </div>
                <div className="space-y-2">
                  <div className="text-xs text-gray-700 px-2 py-1">
                    Presupuesto limitado del centro
                  </div>
                  <div className="text-xs text-gray-700 px-2 py-1">
                    Competencia de otras agencias
                  </div>
                  <div className="text-xs text-gray-700 px-2 py-1">
                    Cambios en la normativa educativa
                  </div>
                </div>
              </div>
              
              {/* Histórico de interacciones */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-5 h-5 bg-gray-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-gray-800">Histórico de interacciones</span>
                </div>
                <div className="space-y-2">
                  <div className="text-xs text-gray-700 px-2 py-1">
                    15/08 - Llamada inicial
                  </div>
                  <div className="text-xs text-gray-700 px-2 py-1">
                    22/08 - Reunión presencial
                  </div>
                  <div className="text-xs text-gray-700 px-2 py-1">
                    29/08 - Envío de propuesta
                  </div>
                </div>
              </div>
              
              {/* Documentación vinculada */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-5 h-5 bg-gray-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-gray-800">Documentación vinculada</span>
                </div>
                <div className="space-y-2">
                  <div className="text-xs text-gray-700 px-2 py-1">
                    Propuesta comercial.pdf
                  </div>
                  <div className="text-xs text-gray-700 px-2 py-1">
                    Catálogo de viajes.pdf
                  </div>
                  <div className="text-xs text-gray-700 px-2 py-1">
                    Condiciones generales.pdf
                  </div>
                </div>
              </div>
              
              {/* Observaciones */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-5 h-5 bg-gray-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-gray-800">Observaciones</span>
                </div>
                <div className="space-y-2">
                  <div className="text-xs text-gray-700 px-2 py-1">
                    Centro interesado en viajes culturales
                  </div>
                  <div className="text-xs text-gray-700 px-2 py-1">
                    Presupuesto aprobado por dirección
                  </div>
                  <div className="text-xs text-gray-700 px-2 py-1">
                    Contacto principal: María García
                  </div>
                </div>
              </div>
            </div>

            {/* Botón Editar */}
            <div className="flex justify-center pt-4">
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className={`px-6 py-2 rounded-lg transition-colors text-sm font-medium flex items-center space-x-2 ${
                  isEditing 
                    ? 'bg-green-600 text-white hover:bg-green-700' 
                    : 'bg-yale-blue text-white hover:bg-air-force-blue'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span>{isEditing ? 'Guardar' : 'Editar'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
