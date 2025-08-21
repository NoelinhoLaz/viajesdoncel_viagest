import React, { useState } from 'react'
import { X, Move, Maximize2, Minimize2, Settings } from 'lucide-react'
import ClientList from './widgets/ClientList'
import SalesChart from './widgets/SalesChart'
import StatusCards from './widgets/StatusCards'
import AgendaWidget from './widgets/AgendaWidget'
import MetricsCard from './widgets/MetricsCard'

const Widget = ({ widget, isEditMode, onRemove, onMove, onResize }) => {
  const [isResizing, setIsResizing] = useState(false)
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0 })

  const widgetTypes = {
    clientList: ClientList,
    salesChart: SalesChart,
    statusCards: StatusCards,
    agendaWidget: AgendaWidget,
    metricsCard: MetricsCard
  }

  const WidgetComponent = widgetTypes[widget.type]

  const handleMouseDown = (e) => {
    if (!isEditMode) return
    
    setResizeStart({ x: e.clientX, y: e.clientY })
    setIsResizing(true)
  }

  const handleMouseMove = (e) => {
    if (!isResizing || !isEditMode) return

    const deltaX = e.clientX - resizeStart.x
    const deltaY = e.clientY - resizeStart.y
    
    const newWidth = Math.max(1, Math.min(4, widget.size.w + Math.floor(deltaX / 50)))
    const newHeight = Math.max(1, Math.min(3, widget.size.h + Math.floor(deltaY / 50)))
    
    onResize(widget.id, { w: newWidth, h: newHeight })
  }

  const handleMouseUp = () => {
    setIsResizing(false)
  }

  const getGridClasses = () => {
    const widthClasses = {
      1: 'col-span-1',
      2: 'col-span-2',
      3: 'col-span-3',
      4: 'col-span-4'
    }
    
    const heightClasses = {
      1: 'row-span-1',
      2: 'row-span-2',
      3: 'row-span-3'
    }
    
    return `${widthClasses[widget.size.w]} ${heightClasses[widget.size.h]}`
  }

  if (!WidgetComponent) {
    return (
      <div className={`${getGridClasses()} bg-red-100 border border-red-300 rounded-lg p-4`}>
        <p className="text-red-600">Widget no encontrado: {widget.type}</p>
      </div>
    )
  }

  return (
    <div 
      className={`${getGridClasses()} relative bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Header del widget */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-gray-50">
        <h3 className="font-medium text-gray-700 capitalize">
          {widget.type.replace(/([A-Z])/g, ' $1').trim()}
        </h3>
        
        {isEditMode && (
          <div className="flex items-center space-x-1">
            <button
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              title="Configurar"
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              title="Eliminar"
              onClick={() => onRemove(widget.id)}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Contenido del widget */}
      <div className="p-4">
        <WidgetComponent widget={widget} />
      </div>

      {/* Controles de redimensionamiento */}
      {isEditMode && (
        <div 
          className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 cursor-se-resize rounded-tl"
          onMouseDown={handleMouseDown}
          title="Redimensionar"
        />
      )}
    </div>
  )
}

export default Widget
