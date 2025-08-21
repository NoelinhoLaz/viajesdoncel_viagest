import React, { useState, useEffect } from 'react'
import { Settings, Plus, X, Move, Maximize2, Minimize2 } from 'lucide-react'
import Widget from './Widget'
import WidgetLibrary from './WidgetLibrary'

const DashboardBuilder = () => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [widgets, setWidgets] = useState([])
  const [showLibrary, setShowLibrary] = useState(false)
  const [draggedWidget, setDraggedWidget] = useState(null)

  // Cargar configuración guardada al iniciar
  useEffect(() => {
    const savedConfig = localStorage.getItem('dashboardConfig')
    if (savedConfig) {
      setWidgets(JSON.parse(savedConfig))
    }
  }, [])

  // Guardar configuración cuando cambie
  useEffect(() => {
    localStorage.setItem('dashboardConfig', JSON.stringify(widgets))
  }, [widgets])

  const handleAddWidget = (widgetType) => {
    const newWidget = {
      id: Date.now().toString(),
      type: widgetType,
      position: { x: 0, y: 0 },
      size: { w: 2, h: 2 },
      config: {}
    }
    setWidgets(prev => [...prev, newWidget])
    setShowLibrary(false)
  }

  const handleRemoveWidget = (widgetId) => {
    setWidgets(prev => prev.filter(w => w.id !== widgetId))
  }

  const handleWidgetMove = (widgetId, newPosition) => {
    setWidgets(prev => prev.map(w => 
      w.id === widgetId ? { ...w, position: newPosition } : w
    ))
  }

  const handleWidgetResize = (widgetId, newSize) => {
    setWidgets(prev => prev.map(w => 
      w.id === widgetId ? { ...w, size: newSize } : w
    ))
  }

  const handleDragStart = (e, widgetType) => {
    setDraggedWidget(widgetType)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    if (draggedWidget) {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = Math.floor((e.clientX - rect.left) / 200) // 200px por columna
      const y = Math.floor((e.clientY - rect.top) / 200)  // 200px por fila
      
      handleAddWidget(draggedWidget)
      setDraggedWidget(null)
    }
  }

  return (
    <div className="relative">
      {/* Header con controles */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-yale-blue">Dashboard Personalizable</h2>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowLibrary(!showLibrary)}
            className="px-4 py-2 bg-cambridge-blue text-white rounded-lg hover:bg-air-force-blue transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Agregar Widget</span>
          </button>
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
              isEditMode 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-yale-blue text-white hover:bg-air-force-blue'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>{isEditMode ? 'Salir Edición' : 'Editar Dashboard'}</span>
          </button>
        </div>
      </div>

      {/* Área de trabajo del dashboard */}
      <div 
        className="min-h-[600px] relative"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="grid grid-cols-4 gap-4">
          {widgets.map((widget) => (
            <Widget
              key={widget.id}
              widget={widget}
              isEditMode={isEditMode}
              onRemove={handleRemoveWidget}
              onMove={handleWidgetMove}
              onResize={handleWidgetResize}
            />
          ))}
        </div>
      </div>

      {/* Biblioteca de widgets */}
      {showLibrary && (
        <WidgetLibrary 
          onClose={() => setShowLibrary(false)}
          onAddWidget={handleAddWidget}
          onDragStart={handleDragStart}
        />
      )}
    </div>
  )
}

export default DashboardBuilder
