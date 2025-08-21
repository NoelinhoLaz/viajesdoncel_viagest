import React, { useState } from 'react'
import { ArrowLeft, Save, Plus, Edit, Trash2, Eye, Download, Share2, Calendar, MapPin, User, Type, AlignLeft, Image, List, Quote, ArrowLeftRight, Columns3, Map, Euro, Bus, ChevronDown, Video, Menu, Gift, Building2, Clock, FileText, Minus } from 'lucide-react'
import DestinoModal from '../components/ui/DestinoModal'
import FechasModal from '../components/ui/FechasModal'
import { DayDropZone } from '../components/widgets'
import { destinos } from '../data/destinos'
import { 
  calcularDuracion, 
  formatearFecha, 
  formatearFechaCorta,
  getDiaSemana,
  esFinDeSemana,
  generarRangoFechas
} from '../utils/fechas'
import { useItinerario } from '../contexts/ItinerarioContext'
import { createItinerario, updateItinerario, makeItinerarioPublic } from '../lib/supabase/itinerarios'
import { debugUserItinerarios, debugAllItinerarios, debugSharedItinerarios } from '../lib/supabase/debug'

export default function Itinerario() {
  const {
    widgets,
    isEditMode,
    addWidget,
    updateWidget,
    removeWidget,
    toggleEditMode,
    handleDragStart,
    handleDragOver,
    handleDrop
  } = useItinerario()
  
  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')
  const [errorFecha, setErrorFecha] = useState('')
  const [showDestinoModal, setShowDestinoModal] = useState(false)
  const [selectedDestino, setSelectedDestino] = useState('')
  const [showFechasModal, setShowFechasModal] = useState(false)
  const [selectedDay, setSelectedDay] = useState('')
  const [savedItinerario, setSavedItinerario] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  const [debugInfo, setDebugInfo] = useState('')

  const handleFechaInicioChange = (e) => {
    const nuevaFechaInicio = e.target.value
    setFechaInicio(nuevaFechaInicio)
    
    // Validar que fecha fin sea posterior a fecha inicio
    if (fechaFin && nuevaFechaInicio >= fechaFin) {
      setErrorFecha('La fecha de fin debe ser posterior a la fecha de inicio')
    } else {
      setErrorFecha('')
    }
  }

  const handleFechaFinChange = (e) => {
    const nuevaFechaFin = e.target.value
    setFechaFin(nuevaFechaFin)
    
    // Validar que fecha fin sea posterior a fecha inicio
    if (fechaInicio && nuevaFechaFin <= fechaInicio) {
      setErrorFecha('La fecha de fin debe ser posterior a la fecha de inicio')
    } else {
      setErrorFecha('')
    }
  }

  const handleDestinoSelect = (destino) => {
    setSelectedDestino(destino.titulo)
    setShowDestinoModal(false)
  }

  const openDestinoModal = () => {
    setShowDestinoModal(true)
  }

  const openFechasModal = () => {
    setShowFechasModal(true)
  }

  const handleFechasSave = ({ fechaSalida, fechaRegreso }) => {
    setFechaInicio(fechaSalida)
    setFechaFin(fechaRegreso)
    setErrorFecha('')
    setSelectedDay('') // Resetear día seleccionado al cambiar fechas
  }

  // Generar rango de días entre las fechas seleccionadas
  const diasDelViaje = fechaInicio && fechaFin ? generarRangoFechas(fechaInicio, fechaFin) : []

  const handleDaySelect = (fecha) => {
    setSelectedDay(fecha)
  }

  // Función para guardar el itinerario
  const handleSaveItinerario = async () => {
    if (!selectedDestino || !fechaInicio || !fechaFin) {
      setSaveMessage('Por favor, selecciona destino y fechas antes de guardar')
      return
    }

    setIsSaving(true)
    setSaveMessage('')

    try {
      // Preparar datos del itinerario
      const itinerarioData = {
        titulo: `Itinerario ${selectedDestino}`,
        destino: selectedDestino,
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
        dias: diasDelViaje.map((fecha, index) => ({
          fecha: fecha,
          dia_index: index,
          titulo: `Día ${index + 1}`,
          widgets: widgets
            .filter(w => w.dayId === fecha)
            .sort((a, b) => a.order - b.order)
        }))
      }

      let result
      if (savedItinerario) {
        // Actualizar itinerario existente
        result = await updateItinerario(savedItinerario.id, itinerarioData)
      } else {
        // Crear nuevo itinerario
        result = await createItinerario(itinerarioData)
      }

      if (result.success) {
        setSavedItinerario(result.data)
        setSaveMessage('Itinerario guardado correctamente')
        setTimeout(() => setSaveMessage(''), 3000)
      } else {
        setSaveMessage(`Error al guardar: ${result.error}`)
      }
    } catch (error) {
      setSaveMessage(`Error al guardar: ${error.message}`)
    } finally {
      setIsSaving(false)
    }
  }

  // Función para hacer público el itinerario
  const handleMakePublic = async () => {
    if (!savedItinerario) {
      setSaveMessage('Primero debes guardar el itinerario')
      return
    }

    setIsSaving(true)
    setSaveMessage('')

    try {
      const result = await makeItinerarioPublic(savedItinerario.id)
      if (result.success) {
        setSavedItinerario(prev => ({ ...prev, publico: true, url_publica: result.data }))
        setSaveMessage('Itinerario hecho público correctamente')
        setTimeout(() => setSaveMessage(''), 3000)
      } else {
        setSaveMessage(`Error al hacer público: ${result.error}`)
      }
    } catch (error) {
      setSaveMessage(`Error al hacer público: ${error.message}`)
    } finally {
      setIsSaving(false)
    }
  }

  // Función para debug
  const handleDebug = async () => {
    try {
      setDebugInfo('Ejecutando debug...')
      
      // Debug itinerarios del usuario
      const userResult = await debugUserItinerarios()
      console.log('Debug usuario:', userResult)
      
      // Debug todos los itinerarios
      const allResult = await debugAllItinerarios()
      console.log('Debug todos:', allResult)
      
      // Debug vista compartida
      const sharedResult = await debugSharedItinerarios()
      console.log('Debug compartidos:', sharedResult)
      
      setDebugInfo(`Debug completado. Usuario: ${userResult.data?.length || 0}, Todos: ${allResult.data?.length || 0}, Compartidos: ${sharedResult.data?.length || 0}`)
    } catch (error) {
      setDebugInfo(`Error en debug: ${error.message}`)
    }
  }

  return (
    <div className="min-h-screen bg-content-bg">
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">ITINERARIO</h1>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={toggleEditMode}
              className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium flex items-center ${
                isEditMode 
                  ? 'bg-gray-500 text-white hover:bg-gray-600' 
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {isEditMode ? (
                <>
                  <Eye size={16} className="mr-2" />
                  Vista previa
                </>
              ) : (
                <>
                  <Edit size={16} className="mr-2" />
                  Editar
                </>
              )}
            </button>
            <button 
              onClick={handleSaveItinerario}
              disabled={isSaving}
              className="bg-yale-blue text-white px-6 py-2 rounded-lg hover:bg-air-force-blue transition-colors text-sm font-medium flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={16} className="mr-2" />
              {isSaving ? 'Guardando...' : 'Guardar'}
            </button>
            <button 
              onClick={() => {
                if (savedItinerario && savedItinerario.publico && savedItinerario.url_publica) {
                  // Si está guardado y es público, usar la URL pública
                  const publicUrl = `${window.location.origin}/${savedItinerario.url_publica}`
                  window.open(publicUrl, '_blank')
                } else {
                  // Si no está guardado o no es público, usar vista previa temporal
                  const itinerarioData = {
                    titulo: 'Mi Itinerario',
                    destino: selectedDestino,
                    fechaInicio: fechaInicio,
                    fechaFin: fechaFin,
                    dias: diasDelViaje.map((fecha, index) => ({
                      fecha: fecha,
                      dia_index: index,
                      titulo: `Día ${index + 1}`,
                      widgets: widgets
                        .filter(w => w.dayId === fecha)
                        .sort((a, b) => a.order - b.order)
                    }))
                  }
                  
                  // Guardar en sessionStorage
                  sessionStorage.setItem('itinerarioPreview', JSON.stringify(itinerarioData))
                  
                  // Abrir vista previa
                  const previewUrl = `${window.location.origin}/publico/itinerario/preview-${Date.now()}`
                  window.open(previewUrl, '_blank')
                }
              }}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center"
            >
              <Eye size={16} className="mr-2" />
              {savedItinerario && savedItinerario.publico ? 'Ver Público' : 'Vista Previa'}
            </button>
            <button 
              onClick={handleDebug}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium flex items-center"
            >
              Debug
            </button>
          </div>
        </div>

        {/* Opciones de seleccionar */}
        <div className="grid grid-cols-4 gap-4 w-full max-w-4xl">
          <button className="flex flex-col items-center py-3 px-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-yale-blue hover:bg-blue-50 transition-colors group">
            <User size={20} className="mb-2 text-gray-600 group-hover:text-yale-blue transition-colors" />
            <span className="text-xs font-medium text-gray-700 text-center">Seleccionar Cliente</span>
          </button>
          <button 
            onClick={openDestinoModal}
            className={`flex flex-col items-center py-3 px-2 border-2 border-dashed rounded-lg transition-colors group ${
              selectedDestino 
                ? 'border-yale-blue bg-blue-50' 
                : 'border-gray-300 hover:border-yale-blue hover:bg-blue-50'
            }`}
          >
            <MapPin size={20} className={`mb-2 transition-colors ${
              selectedDestino 
                ? 'text-yale-blue' 
                : 'text-gray-600 group-hover:text-yale-blue'
            }`} />
            <span className={`text-xs font-medium text-center ${
              selectedDestino 
                ? 'text-yale-blue' 
                : 'text-gray-700'
            }`}>
              {selectedDestino || 'Seleccionar Destino'}
            </span>
          </button>
          <button 
            onClick={openFechasModal}
            className={`flex flex-col items-center py-3 px-2 border-2 border-dashed rounded-lg transition-colors group ${
              fechaInicio && fechaFin 
                ? 'border-yale-blue bg-blue-50' 
                : 'border-gray-300 hover:border-yale-blue hover:bg-blue-50'
            }`}
          >
            <Calendar size={20} className={`mb-2 transition-colors ${
              fechaInicio && fechaFin 
                ? 'text-yale-blue' 
                : 'text-gray-600 group-hover:text-yale-blue'
            }`} />
            <span className={`text-xs font-medium text-center ${
              fechaInicio && fechaFin 
                ? 'text-yale-blue' 
                : 'text-gray-700'
            }`}>
              {fechaInicio && fechaFin ? `${fechaInicio} - ${fechaFin}` : 'Seleccionar Fechas'}
            </span>
          </button>
          <button className="flex flex-col items-center py-3 px-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-yale-blue hover:bg-blue-50 transition-colors group">
            <Euro size={20} className="mb-2 text-gray-600 group-hover:text-yale-blue transition-colors" />
            <span className="text-xs font-medium text-gray-700 text-center">Seleccionar Cotización</span>
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="py-6">
        {/* Estructura principal */}
        <div className="grid grid-cols-12 gap-6 w-full">
          {/* Columna izquierda */}
          <div className="col-span-3 bg-white-custom p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Herramientas de Creación</h2>
            
            <div className="grid grid-cols-3 gap-3">
              {/* Hora */}
              <button 
                onClick={() => selectedDay && addWidget('hora', selectedDay)}
                disabled={!selectedDay}
                className="flex flex-col items-center py-3 px-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-yale-blue hover:bg-blue-50 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed enabled:cursor-pointer"
              >
                <Clock size={20} className="mb-2 text-gray-600 group-hover:text-yale-blue transition-colors" />
                <span className="text-xs font-medium text-gray-700 text-center">Hora</span>
              </button>

              {/* Título */}
              <button 
                onClick={() => selectedDay && addWidget('titulo', selectedDay)}
                disabled={!selectedDay}
                className="flex flex-col items-center py-3 px-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-yale-blue hover:bg-blue-50 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed enabled:cursor-pointer"
              >
                <Type size={20} className="mb-2 text-gray-600 group-hover:text-yale-blue transition-colors" />
                <span className="text-xs font-medium text-gray-700 text-center">Título</span>
              </button>

              {/* Descripción */}
              <button 
                onClick={() => selectedDay && addWidget('descripcion', selectedDay)}
                disabled={!selectedDay}
                className="flex flex-col items-center py-3 px-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-yale-blue hover:bg-blue-50 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed enabled:cursor-pointer"
              >
                <AlignLeft size={20} className="mb-2 text-gray-600 group-hover:text-yale-blue transition-colors" />
                <span className="text-xs font-medium text-gray-700 text-center">Descripción</span>
              </button>

              {/* Columnas */}
              <button 
                onClick={() => selectedDay && addWidget('columnas', selectedDay)}
                disabled={!selectedDay}
                className="flex flex-col items-center py-3 px-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-yale-blue hover:bg-blue-50 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed enabled:cursor-pointer"
              >
                <Columns3 size={20} className="mb-2 text-gray-600 group-hover:text-yale-blue transition-colors" />
                <span className="text-xs font-medium text-gray-700 text-center">Columnas</span>
              </button>

              {/* Carrusel */}
              <button 
                onClick={() => selectedDay && addWidget('carrusel', selectedDay)}
                disabled={!selectedDay}
                className="flex flex-col items-center py-3 px-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-yale-blue hover:bg-blue-50 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed enabled:cursor-pointer"
              >
                <ArrowLeftRight size={20} className="mb-2 text-gray-600 group-hover:text-yale-blue transition-colors" />
                <span className="text-xs font-medium text-gray-700 text-center">Carrusel</span>
              </button>

              {/* Acordeón */}
              <button 
                onClick={() => selectedDay && addWidget('acordeon', selectedDay)}
                disabled={!selectedDay}
                className="flex flex-col items-center py-3 px-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-yale-blue hover:bg-blue-50 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed enabled:cursor-pointer"
              >
                <ChevronDown size={20} className="mb-2 text-gray-600 group-hover:text-yale-blue transition-colors" />
                <span className="text-xs font-medium text-gray-700 text-center">Acordeón</span>
              </button>

              {/* Mapa */}
              <button 
                onClick={() => selectedDay && addWidget('mapa', selectedDay)}
                disabled={!selectedDay}
                className="flex flex-col items-center py-3 px-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-yale-blue hover:bg-blue-50 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed enabled:cursor-pointer"
              >
                <Map size={20} className="mb-2 text-gray-600 group-hover:text-yale-blue transition-colors" />
                <span className="text-xs font-medium text-gray-700 text-center">Mapa</span>
              </button>

              {/* Imagen */}
              <button 
                onClick={() => selectedDay && addWidget('imagen', selectedDay)}
                disabled={!selectedDay}
                className="flex flex-col items-center py-3 px-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-yale-blue hover:bg-blue-50 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed enabled:cursor-pointer"
              >
                <Image size={20} className="mb-2 text-gray-600 group-hover:text-yale-blue transition-colors" />
                <span className="text-xs font-medium text-gray-700 text-center">Imagen</span>
              </button>

              {/* Video */}
              <button 
                onClick={() => selectedDay && addWidget('video', selectedDay)}
                disabled={!selectedDay}
                className="flex flex-col items-center py-3 px-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-yale-blue hover:bg-blue-50 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed enabled:cursor-pointer"
              >
                <Video size={20} className="mb-2 text-gray-600 group-hover:text-yale-blue transition-colors" />
                <span className="text-xs font-medium text-gray-700 text-center">Video</span>
              </button>

              {/* Línea Horizontal */}
              <button 
                onClick={() => selectedDay && addWidget('linea', selectedDay)}
                disabled={!selectedDay}
                className="flex flex-col items-center py-3 px-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-yale-blue hover:bg-blue-50 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed enabled:cursor-pointer"
              >
                <Minus size={20} className="mb-2 text-gray-600 group-hover:text-yale-blue transition-colors" />
                <span className="text-xs font-medium text-gray-700 text-center">Línea</span>
              </button>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Instrucciones</h3>
              <p className="text-xs text-gray-600">
                {isEditMode 
                  ? selectedDay 
                    ? 'Haz clic en las herramientas para añadir contenido al día seleccionado.'
                    : 'Primero selecciona un día del viaje para poder añadir contenido.'
                  : 'Vista previa del itinerario. Cambia a modo edición para modificar el contenido.'
                }
              </p>
              {isEditMode && !selectedDay && (
                <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-xs text-yellow-700 font-medium">
                    ⚠️ Selecciona un día del viaje para habilitar las herramientas de creación
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Columna derecha */}
          <div className="col-span-9 bg-white-custom p-6 rounded-lg shadow-md">
            
            {/* Menú de selección de día */}
            {diasDelViaje.length > 0 ? (
              <div className="mb-6">
                <h3 className="text-md font-medium text-gray-800 mb-3">Seleccionar Día</h3>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {diasDelViaje.map((fecha, index) => (
                    <button
                      key={fecha}
                      onClick={() => handleDaySelect(fecha)}
                      className={`flex-shrink-0 p-3 border rounded-lg text-left transition-all min-w-[120px] ${
                        selectedDay === fecha
                          ? 'border-yale-blue bg-blue-50 shadow-md'
                          : 'border-gray-200 hover:border-yale-blue hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-gray-900">
                          Día {index + 1}
                        </span>
                        <span className={`text-xs text-gray-600 ${
                          getDiaSemana(fecha).substring(0, 1).toUpperCase() === 'S' || 
                          getDiaSemana(fecha).substring(0, 1).toUpperCase() === 'D' 
                            ? 'font-semibold' 
                            : 'font-medium'
                        }`}>
                          {getDiaSemana(fecha).substring(0, 1).toUpperCase() === 'M' && getDiaSemana(fecha).includes('miércoles') 
                            ? 'X' 
                            : getDiaSemana(fecha).substring(0, 1).toUpperCase()}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600">
                        {formatearFechaCorta(fecha)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calendar size={48} className="mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium mb-2">No hay fechas seleccionadas</p>
                <p className="text-sm">Selecciona las fechas de tu viaje para ver los días disponibles</p>
              </div>
            )}

            {/* Contenido del día seleccionado */}
            {selectedDay ? (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Planificación del {formatearFecha(selectedDay)}
                </h3>
                <DayDropZone
                  day={selectedDay}
                  dayIndex={diasDelViaje.findIndex(fecha => fecha === selectedDay)}
                  widgets={widgets}
                  isEditMode={isEditMode}
                  onUpdateWidget={updateWidget}
                  onRemoveWidget={removeWidget}
                />
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calendar size={48} className="mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium mb-2">Selecciona un día</p>
                <p className="text-sm">Elige un día del viaje para ver y editar su itinerario</p>
              </div>
            )}


          </div>
        </div>
        
        {/* Mensajes de estado */}
        {saveMessage && (
          <div className={`mt-4 p-3 rounded-lg text-sm ${
            saveMessage.includes('Error') 
              ? 'bg-red-100 text-red-700 border border-red-200' 
              : 'bg-green-100 text-green-700 border border-green-200'
          }`}>
            {saveMessage}
          </div>
        )}
        
        {/* Estado del itinerario guardado */}
        {savedItinerario && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-blue-900">Itinerario Guardado</h3>
                <p className="text-sm text-blue-700">ID: {savedItinerario.id}</p>
                {savedItinerario.publico && savedItinerario.url_publica && (
                  <p className="text-sm text-blue-700">
                    URL Pública: <span className="font-mono">{savedItinerario.url_publica}</span>
                  </p>
                )}
              </div>
              {!savedItinerario.publico && (
                <button
                  onClick={handleMakePublic}
                  disabled={isSaving}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium disabled:opacity-50"
                >
                  Hacer Público
                </button>
              )}
            </div>
          </div>
        )}

        {/* Información de debug */}
        {debugInfo && (
          <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
            <h3 className="font-medium text-purple-900 mb-2">Debug Info</h3>
            <p className="text-sm text-purple-700">{debugInfo}</p>
          </div>
        )}
      </div>

      {/* Modal de Selección de Destino */}
      <DestinoModal
        isOpen={showDestinoModal}
        onClose={() => setShowDestinoModal(false)}
        onSelect={handleDestinoSelect}
        destinos={destinos}
      />

      <FechasModal
        isOpen={showFechasModal}
        onClose={() => setShowFechasModal(false)}
        onSave={handleFechasSave}
        fechaInicio={fechaInicio}
        fechaFin={fechaFin}
        title="Seleccionar Fechas del Viaje"
      />
    </div>
  )
}
