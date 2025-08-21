import React, { useState } from 'react'
import { List, Kanban, LayoutDashboard, Settings, Plus, Edit, Trash2, Save, X, Target, Star, MapPin, Users, FileText, Calendar, Bell, Shield, Globe, Database, Key, Eye, EyeOff, Mail } from 'lucide-react'

export default function GruposAjustes() {
  const [showFasesVenta, setShowFasesVenta] = useState(true)
  const [showPrioridades, setShowPrioridades] = useState(true)
  const [showEstados, setShowEstados] = useState(true)
  const [showConfiguracion, setShowConfiguracion] = useState(true)
  const [showIntegraciones, setShowIntegraciones] = useState(true)
  const [showSeguridad, setShowSeguridad] = useState(true)

  // Estados para edición
  const [editandoFase, setEditandoFase] = useState(null)
  const [editandoPrioridad, setEditandoPrioridad] = useState(null)
  const [editandoEstado, setEditandoEstado] = useState(null)

  // Datos de ejemplo
  const [fasesVenta, setFasesVenta] = useState([
    { id: 1, nombre: 'Contacto Inicial', color: '#8b5cf6', orden: 1, activa: true },
    { id: 2, nombre: 'Análisis de Necesidades', color: '#fb923c', orden: 2, activa: true },
    { id: 3, nombre: 'Desarrollo de Propuesta', color: '#22d3ee', orden: 3, activa: true },
    { id: 4, nombre: 'Presentación', color: '#facc15', orden: 4, activa: true },
    { id: 5, nombre: 'Negociación', color: '#f472b6', orden: 5, activa: true },
    { id: 6, nombre: 'Cierre', color: '#10b981', orden: 6, activa: true },
    { id: 7, nombre: 'Implementación', color: '#3b82f6', orden: 7, activa: true }
  ])

  const [prioridades, setPrioridades] = useState([
    { id: 1, nombre: 'Prioridad 1', color: '#ef4444', descripcion: 'Máxima urgencia', activa: true },
    { id: 2, nombre: 'Prioridad 2', color: '#f97316', descripcion: 'Alta urgencia', activa: true },
    { id: 3, nombre: 'Prioridad 3', color: '#eab308', descripcion: 'Media urgencia', activa: true },
    { id: 4, nombre: 'Prioridad 4', color: '#22c55e', descripcion: 'Baja urgencia', activa: true },
    { id: 5, nombre: 'Prioridad 5', color: '#3b82f6', descripcion: 'Mínima urgencia', activa: true }
  ])

  const [estados, setEstados] = useState([
    { id: 1, nombre: 'Pdte. Visitar', color: '#8b5cf6', descripcion: 'Grupo pendiente de visita', activa: true },
    { id: 2, nombre: 'Visitado', color: '#fb923c', descripcion: 'Grupo ya visitado', activa: true },
    { id: 3, nombre: 'Pdte. Cotizar', color: '#22d3ee', descripcion: 'Pendiente de cotización', activa: true },
    { id: 4, nombre: 'En Seguimiento', color: '#facc15', descripcion: 'En proceso de seguimiento', activa: true },
    { id: 5, nombre: 'Aceptado', color: '#f472b6', descripcion: 'Propuesta aceptada', activa: true },
    { id: 6, nombre: 'Denegado', color: '#6b7280', descripcion: 'Propuesta rechazada', activa: true }
  ])

  const [configuracion, setConfiguracion] = useState({
    notificacionesEmail: true,
    notificacionesPush: false,
    recordatoriosAutomaticos: true,
    backupAutomatico: true,
    sincronizacionTiempoReal: false,
    modoOscuro: false,
    idioma: 'es',
    zonaHoraria: 'Europe/Madrid'
  })

  const [integraciones, setIntegraciones] = useState({
    calendarioGoogle: false,
    calendarioOutlook: false,
    emailGmail: false,
    emailOutlook: false,
    crmSalesforce: false,
    crmHubspot: false,
    contabilidadSage: false,
    contabilidadContaplus: false
  })

  const [seguridad, setSeguridad] = useState({
    autenticacionDosFactores: false,
    sesionesSimultaneas: 3,
    tiempoExpiracionSesion: 8,
    registroActividad: true,
    backupEncriptado: true,
    sincronizacionSegura: true
  })

  const handleToggleConfiguracion = (key) => {
    setConfiguracion(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handleToggleIntegracion = (key) => {
    setIntegraciones(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handleToggleSeguridad = (key) => {
    setSeguridad(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handleEditarFase = (fase) => {
    setEditandoFase({ ...fase })
  }

  const handleGuardarFase = () => {
    if (editandoFase) {
      setFasesVenta(prev => prev.map(f => f.id === editandoFase.id ? editandoFase : f))
      setEditandoFase(null)
    }
  }

  const handleCancelarEdicion = () => {
    setEditandoFase(null)
    setEditandoPrioridad(null)
    setEditandoEstado(null)
  }

  const handleCambiarColor = (tipo, id, nuevoColor) => {
    if (tipo === 'fase') {
      setFasesVenta(prev => prev.map(f => f.id === id ? { ...f, color: nuevoColor } : f))
    } else if (tipo === 'prioridad') {
      setPrioridades(prev => prev.map(p => p.id === id ? { ...p, color: nuevoColor } : p))
    } else if (tipo === 'estado') {
      setEstados(prev => prev.map(e => e.id === id ? { ...e, color: nuevoColor } : e))
    }
  }

  return (
    <div>
      {/* Div personalizado de ancho completo x 48px - ENCIMA DE TODO */}
      <div className="w-full h-12 flex items-center justify-between pl-2 pr-6 mt-2 mb-4">
        <h1 className="text-3xl font-normal text-yale-blue font-raleway uppercase tracking-wider">Ajustes de Grupos</h1>
        <span className="text-lg font-medium text-air-force-blue font-inter">Configuración del Sistema</span>
      </div>

      {/* Navegación */}
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
            className="flex items-center space-x-2 p-2 text-gray-600 hover:text-yale-blue transition-colors"
            title="Visitas"
          >
            <MapPin size={18} />
            <span className="text-sm font-medium">Visitas</span>
          </button>
          <button
            onClick={() => window.location.href = '/grupos_ajustes'}
            className="flex items-center space-x-2 p-2 text-yale-blue bg-blue-50 rounded-lg transition-colors"
            title="Ajustes"
          >
            <Settings size={18} />
            <span className="text-sm font-medium">Ajustes</span>
          </button>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="space-y-6">
        {/* Fases de Venta */}
        <div className="bg-white-custom rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-yale-blue flex items-center">
              <Target size={20} className="mr-2" />
              Fases de Venta
            </h2>
            <button
              onClick={() => setShowFasesVenta(!showFasesVenta)}
              className="text-gray-500 hover:text-yale-blue transition-colors"
            >
              {showFasesVenta ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          {showFasesVenta && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {fasesVenta.map((fase) => (
                <div key={fase.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: fase.color }}
                      ></div>
                      <span className="font-medium text-gray-900">{fase.nombre}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleEditarFase(fase)}
                        className="p-1 text-gray-400 hover:text-yale-blue transition-colors"
                        title="Editar"
                      >
                        <Edit size={14} />
                      </button>
                    </div>
                  </div>
                  
                  {editandoFase && editandoFase.id === fase.id ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editandoFase.nombre}
                        onChange={(e) => setEditandoFase({ ...editandoFase, nombre: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yale-blue"
                      />
                      <input
                        type="color"
                        value={editandoFase.color}
                        onChange={(e) => handleCambiarColor('fase', fase.id, e.target.value)}
                        className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={handleGuardarFase}
                          className="flex-1 bg-yale-blue text-white px-3 py-2 rounded-lg text-sm hover:bg-air-force-blue transition-colors"
                        >
                          <Save size={14} className="inline mr-1" />
                          Guardar
                        </button>
                        <button
                          onClick={handleCancelarEdicion}
                          className="flex-1 bg-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm hover:bg-gray-400 transition-colors"
                        >
                          <X size={14} className="inline mr-1" />
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-600">
                      <div className="flex justify-between items-center">
                        <span>Orden:</span>
                        <span className="font-medium">{fase.orden}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Estado:</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${fase.activa ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {fase.activa ? 'Activa' : 'Inactiva'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Prioridades */}
        <div className="bg-white-custom rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-yale-blue flex items-center">
              <Star size={20} className="mr-2" />
              Prioridades
            </h2>
            <button
              onClick={() => setShowPrioridades(!showPrioridades)}
              className="text-gray-500 hover:text-yale-blue transition-colors"
            >
              {showPrioridades ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          {showPrioridades && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {prioridades.map((prioridad) => (
                <div key={prioridad.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: prioridad.color }}
                      ></div>
                      <span className="font-medium text-gray-900">{prioridad.nombre}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => setEditandoPrioridad(prioridad)}
                        className="p-1 text-gray-400 hover:text-yale-blue transition-colors"
                        title="Editar"
                      >
                        <Edit size={14} />
                      </button>
                    </div>
                  </div>
                  
                  {editandoPrioridad && editandoPrioridad.id === prioridad.id ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editandoPrioridad.nombre}
                        onChange={(e) => setEditandoPrioridad({ ...editandoPrioridad, nombre: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yale-blue"
                      />
                      <textarea
                        value={editandoPrioridad.descripcion}
                        onChange={(e) => setEditandoPrioridad({ ...editandoPrioridad, descripcion: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yale-blue"
                        rows="2"
                        placeholder="Descripción"
                      />
                      <input
                        type="color"
                        value={editandoPrioridad.color}
                        onChange={(e) => handleCambiarColor('prioridad', prioridad.id, e.target.value)}
                        className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setPrioridades(prev => prev.map(p => p.id === prioridad.id ? editandoPrioridad : p))
                            setEditandoPrioridad(null)
                          }}
                          className="flex-1 bg-yale-blue text-white px-3 py-2 rounded-lg text-sm hover:bg-air-force-blue transition-colors"
                        >
                          <Save size={14} className="inline mr-1" />
                          Guardar
                        </button>
                        <button
                          onClick={handleCancelarEdicion}
                          className="flex-1 bg-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm hover:bg-gray-400 transition-colors"
                        >
                          <X size={14} className="inline mr-1" />
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-600">
                      <p className="mb-2">{prioridad.descripcion}</p>
                      <div className="flex justify-between items-center">
                        <span>Estado:</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${prioridad.activa ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {prioridad.activa ? 'Activa' : 'Inactiva'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Estados */}
        <div className="bg-white-custom rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-yale-blue flex items-center">
              <MapPin size={20} className="mr-2" />
              Estados de Grupos
            </h2>
            <button
              onClick={() => setShowEstados(!showEstados)}
              className="text-gray-500 hover:text-yale-blue transition-colors"
            >
              {showEstados ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          {showEstados && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {estados.map((estado) => (
                <div key={estado.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: estado.color }}
                      ></div>
                      <span className="font-medium text-gray-900">{estado.nombre}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => setEditandoEstado(estado)}
                        className="p-1 text-gray-400 hover:text-yale-blue transition-colors"
                        title="Editar"
                      >
                        <Edit size={14} />
                      </button>
                    </div>
                  </div>
                  
                  {editandoEstado && editandoEstado.id === estado.id ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editandoEstado.nombre}
                        onChange={(e) => setEditandoEstado({ ...editandoEstado, nombre: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yale-blue"
                      />
                      <textarea
                        value={editandoEstado.descripcion}
                        onChange={(e) => setEditandoEstado({ ...editandoEstado, descripcion: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yale-blue"
                        rows="2"
                        placeholder="Descripción"
                      />
                                             <input
                         type="color"
                         value={editandoEstado.color}
                         onChange={(e) => handleCambiarColor('estado', estado.id, e.target.value)}
                         className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                       />
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setEstados(prev => prev.map(e => e.id === estado.id ? editandoEstado : e))
                            setEditandoEstado(null)
                          }}
                          className="flex-1 bg-yale-blue text-white px-3 py-2 rounded-lg text-sm hover:bg-air-force-blue transition-colors"
                        >
                          <Save size={14} className="inline mr-1" />
                          Guardar
                        </button>
                        <button
                          onClick={handleCancelarEdicion}
                          className="flex-1 bg-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm hover:bg-gray-400 transition-colors"
                        >
                          <X size={14} className="inline mr-1" />
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-600">
                      <p className="mb-2">{estado.descripcion}</p>
                      <div className="flex justify-between items-center">
                        <span>Estado:</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${estado.activa ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {estado.activa ? 'Activa' : 'Inactiva'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Configuración General */}
        <div className="bg-white-custom rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-yale-blue flex items-center">
              <Settings size={20} className="mr-2" />
              Configuración General
            </h2>
            <button
              onClick={() => setShowConfiguracion(!showConfiguracion)}
              className="text-gray-500 hover:text-yale-blue transition-colors"
            >
              {showConfiguracion ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          {showConfiguracion && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Bell size={18} className="mr-2 text-gray-500" />
                  Notificaciones
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={configuracion.notificacionesEmail}
                      onChange={() => handleToggleConfiguracion('notificacionesEmail')}
                      className="w-4 h-4 text-yale-blue border-gray-300 rounded focus:ring-yale-blue"
                    />
                    <span className="text-sm text-gray-700">Notificaciones por email</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={configuracion.notificacionesPush}
                      onChange={() => handleToggleConfiguracion('notificacionesPush')}
                      className="w-4 h-4 text-yale-blue border-gray-300 rounded focus:ring-yale-blue"
                    />
                    <span className="text-sm text-gray-700">Notificaciones push</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={configuracion.recordatoriosAutomaticos}
                      onChange={() => handleToggleConfiguracion('recordatoriosAutomaticos')}
                      className="w-4 h-4 text-yale-blue border-gray-300 rounded focus:ring-yale-blue"
                    />
                    <span className="text-sm text-gray-700">Recordatorios automáticos</span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Database size={18} className="mr-2 text-gray-500" />
                  Sistema
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={configuracion.backupAutomatico}
                      onChange={() => handleToggleConfiguracion('backupAutomatico')}
                      className="w-4 h-4 text-yale-blue border-gray-300 rounded focus:ring-yale-blue"
                    />
                    <span className="text-sm text-gray-700">Backup automático</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={configuracion.sincronizacionTiempoReal}
                      onChange={() => handleToggleConfiguracion('sincronizacionTiempoReal')}
                      className="w-4 h-4 text-yale-blue border-gray-300 rounded focus:ring-yale-blue"
                    />
                    <span className="text-sm text-gray-700">Sincronización en tiempo real</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={configuracion.modoOscuro}
                      onChange={() => handleToggleConfiguracion('modoOscuro')}
                      className="w-4 h-4 text-yale-blue border-gray-300 rounded focus:ring-yale-blue"
                    />
                    <span className="text-sm text-gray-700">Modo oscuro</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Integraciones */}
        <div className="bg-white-custom rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-yale-blue flex items-center">
              <Globe size={20} className="mr-2" />
              Integraciones
            </h2>
            <button
              onClick={() => setShowIntegraciones(!showIntegraciones)}
              className="text-gray-500 hover:text-yale-blue transition-colors"
            >
              {showIntegraciones ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          {showIntegraciones && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                  <Calendar size={16} className="mr-2 text-gray-500" />
                  Calendario
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={integraciones.calendarioGoogle}
                      onChange={() => handleToggleIntegracion('calendarioGoogle')}
                      className="w-4 h-4 text-yale-blue border-gray-300 rounded focus:ring-yale-blue"
                    />
                    <span className="text-xs text-gray-700">Google Calendar</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={integraciones.calendarioOutlook}
                      onChange={() => handleToggleIntegracion('calendarioOutlook')}
                      className="w-4 h-4 text-yale-blue border-gray-300 rounded focus:ring-yale-blue"
                    />
                    <span className="text-xs text-gray-700">Outlook</span>
                  </label>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                  <Mail size={16} className="mr-2 text-gray-500" />
                  Email
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={integraciones.emailGmail}
                      onChange={() => handleToggleIntegracion('emailGmail')}
                      className="w-4 h-4 text-yale-blue border-gray-300 rounded focus:ring-yale-blue"
                    />
                    <span className="text-xs text-gray-700">Gmail</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={integraciones.emailOutlook}
                      onChange={() => handleToggleIntegracion('emailOutlook')}
                      className="w-4 h-4 text-yale-blue border-gray-300 rounded focus:ring-yale-blue"
                    />
                    <span className="text-xs text-gray-700">Outlook</span>
                  </label>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                  <Users size={16} className="mr-2 text-gray-500" />
                  CRM
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={integraciones.crmSalesforce}
                      onChange={() => handleToggleIntegracion('crmSalesforce')}
                      className="w-4 h-4 text-yale-blue border-gray-300 rounded focus:ring-yale-blue"
                    />
                    <span className="text-xs text-gray-700">Salesforce</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={integraciones.crmHubspot}
                      onChange={() => handleToggleIntegracion('crmHubspot')}
                      className="w-4 h-4 text-yale-blue border-gray-300 rounded focus:ring-yale-blue"
                    />
                    <span className="text-xs text-gray-700">HubSpot</span>
                  </label>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                  <FileText size={16} className="mr-2 text-gray-500" />
                  Contabilidad
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={integraciones.contabilidadSage}
                      onChange={() => handleToggleIntegracion('contabilidadSage')}
                      className="w-4 h-4 text-yale-blue border-gray-300 rounded focus:ring-yale-blue"
                    />
                    <span className="text-xs text-gray-700">Sage</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={integraciones.contabilidadContaplus}
                      onChange={() => handleToggleIntegracion('contabilidadContaplus')}
                      className="w-4 h-4 text-yale-blue border-gray-300 rounded focus:ring-yale-blue"
                    />
                    <span className="text-xs text-gray-700">ContaPlus</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Seguridad */}
        <div className="bg-white-custom rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-yale-blue flex items-center">
              <Shield size={20} className="mr-2" />
              Seguridad
            </h2>
            <button
              onClick={() => setShowSeguridad(!showSeguridad)}
              className="text-gray-500 hover:text-yale-blue transition-colors"
            >
              {showSeguridad ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          {showSeguridad && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Key size={18} className="mr-2 text-gray-500" />
                  Autenticación
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={seguridad.autenticacionDosFactores}
                      onChange={() => handleToggleSeguridad('autenticacionDosFactores')}
                      className="w-4 h-4 text-yale-blue border-gray-300 rounded focus:ring-yale-blue"
                    />
                    <span className="text-sm text-gray-700">Autenticación de dos factores</span>
                  </label>
                  <div className="space-y-2">
                    <label className="block text-sm text-gray-700">
                      Sesiones simultáneas máximas
                    </label>
                    <select
                      value={seguridad.sesionesSimultaneas}
                      onChange={(e) => setSeguridad(prev => ({ ...prev, sesionesSimultaneas: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yale-blue"
                    >
                      <option value={1}>1 sesión</option>
                      <option value={2}>2 sesiones</option>
                      <option value={3}>3 sesiones</option>
                      <option value={5}>5 sesiones</option>
                      <option value={10}>10 sesiones</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm text-gray-700">
                      Tiempo de expiración de sesión (horas)
                    </label>
                    <select
                      value={seguridad.tiempoExpiracionSesion}
                      onChange={(e) => setSeguridad(prev => ({ ...prev, tiempoExpiracionSesion: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yale-blue"
                    >
                      <option value={1}>1 hora</option>
                      <option value={4}>4 horas</option>
                      <option value={8}>8 horas</option>
                      <option value={12}>12 horas</option>
                      <option value={24}>24 horas</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Database size={18} className="mr-2 text-gray-500" />
                  Datos
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={seguridad.registroActividad}
                      onChange={() => handleToggleSeguridad('registroActividad')}
                      className="w-4 h-4 text-yale-blue border-gray-300 rounded focus:ring-yale-blue"
                    />
                    <span className="text-sm text-gray-700">Registro de actividad</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={seguridad.backupEncriptado}
                      onChange={() => handleToggleSeguridad('backupEncriptado')}
                      className="w-4 h-4 text-yale-blue border-gray-300 rounded focus:ring-yale-blue"
                    />
                    <span className="text-sm text-gray-700">Backup encriptado</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={seguridad.sincronizacionSegura}
                      onChange={() => handleToggleSeguridad('sincronizacionSegura')}
                      className="w-4 h-4 text-yale-blue border-gray-300 rounded focus:ring-yale-blue"
                    />
                    <span className="text-sm text-gray-700">Sincronización segura</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
