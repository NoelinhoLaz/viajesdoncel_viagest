import React from 'react'

import WidgetContainer from './WidgetContainer'

export default function DayDropZone({ 
  day, 
  dayIndex, 
  widgets, 
  isEditMode, 
  onUpdateWidget, 
  onRemoveWidget
}) {
  const dayWidgets = widgets
    .filter(w => w.dayId === day)
    .sort((a, b) => a.order - b.order)



  return (
    <div
      className={`min-h-[200px] p-4 rounded-lg border-2 border-dashed transition-all duration-200 ${
        dayWidgets.length > 0
          ? 'border-gray-300 bg-gray-50'
          : 'border-gray-300 bg-gray-50'
      }`}
    >
      {/* Header del día */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <h4 className="text-lg font-semibold text-gray-900">
            Día {dayIndex + 1}
          </h4>
          <span className="text-sm text-gray-600 bg-white px-2 py-1 rounded-md border">
            {day}
          </span>
        </div>

      </div>

      {/* Widgets del día */}
      {dayWidgets.length > 0 ? (
        <div>
          {dayWidgets.map((widget, index) => (
            <WidgetContainer
              key={widget.id}
              widget={widget}
              isEditMode={isEditMode}
              onUpdate={onUpdateWidget}
              onRemove={onRemoveWidget}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto mb-2 flex items-center justify-center">
            <span className="text-white text-xs font-bold">+</span>
          </div>
          <p className="text-sm">
            {isEditMode 
              ? 'Haz clic en las herramientas de la izquierda para añadir contenido al día'
              : 'No hay contenido programado para este día'
            }
          </p>
        </div>
      )}
    </div>
  )
}
