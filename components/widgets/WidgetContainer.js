import React, { useState } from 'react'
import HoraWidget from './HoraWidget'
import TituloWidget from './TituloWidget'
import DescripcionWidget from './DescripcionWidget'
import ColumnasWidget from './ColumnasWidget'
import LineaWidget from './LineaWidget'
import { Clock, Type, AlignLeft, Columns3, ArrowLeftRight, ChevronDown, Map, Image, Video, Edit, Move, Trash2, Minus } from 'lucide-react'

export default function WidgetContainer({ 
  widget, 
  isEditMode, 
  onUpdate, 
  onRemove
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [isEditing, setIsEditing] = useState(false)


  const getWidgetIcon = (type) => {
    switch (type) {
      case 'hora':
        return <Clock size={16} className="text-gray-600" />
      case 'titulo':
        return <Type size={16} className="text-gray-600" />
      case 'descripcion':
        return <AlignLeft size={16} className="text-gray-600" />
      case 'columnas':
        return <Columns3 size={16} className="text-gray-600" />
      case 'carrusel':
        return <ArrowLeftRight size={16} className="text-gray-600" />
      case 'acordeon':
        return <ChevronDown size={16} className="text-gray-600" />
      case 'mapa':
        return <Map size={16} className="text-gray-600" />
      case 'imagen':
        return <Image size={16} className="text-gray-600" />
      case 'video':
        return <Video size={16} className="text-gray-600" />
      case 'linea':
        return <Minus size={16} className="text-gray-600" />
      default:
        return <div className="w-4 h-4 bg-gray-300 rounded" />
    }
  }

  const renderWidget = () => {
    switch (widget.type) {
      case 'hora':
        return (
          <HoraWidget
            widget={widget}
            isEditMode={isEditMode}
            onUpdate={onUpdate}
            onRemove={onRemove}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        )
                        case 'titulo':
                    return (
                      <TituloWidget
                        widget={widget}
                        isEditMode={isEditMode}
                        onUpdate={onUpdate}
                        onRemove={onRemove}
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                      />
                    )
                  case 'descripcion':
                    return (
                      <DescripcionWidget
                        widget={widget}
                        isEditMode={isEditMode}
                        onUpdate={onUpdate}
                        onRemove={onRemove}
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                      />
                    )
                  case 'columnas':
                    return (
                      <ColumnasWidget
                        widget={widget}
                        isEditMode={isEditMode}
                        onUpdate={onUpdate}
                        onRemove={onRemove}
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                      />
                    )
                  default:
        return (
          <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 text-center text-gray-500">
            Widget tipo "{widget.type}" no implementado
          </div>
        )
    }
  }

  return (
    <div 
      className="flex items-start space-x-3 transition-all duration-200 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Iconos del widget */}
      <div className="flex flex-col items-center space-y-2 pt-2">
        <div className="p-1 bg-gray-100 rounded-md">
          {getWidgetIcon(widget.type)}
        </div>
      </div>
      
      {/* Contenido del widget */}
      <div className="flex-1 relative">
        {renderWidget()}
        
        {/* Iconos de acción que aparecen al hacer hover */}
        {isHovered && isEditMode && !isEditing && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-all duration-200">
            <div className="flex space-x-4">
              <button
                onClick={() => setIsEditing(true)}
                className="p-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-all shadow-lg"
                title="Editar widget"
              >
                <Edit size={20} />
              </button>
              <button
                onClick={() => {}} // Función para mover (implementar después)
                className="p-3 bg-white text-green-600 rounded-lg hover:bg-green-50 transition-all shadow-lg"
                title="Mover widget"
              >
                <Move size={20} />
              </button>
              <button
                onClick={() => onRemove(widget.id)}
                className="p-3 bg-white text-red-600 rounded-lg hover:bg-red-50 transition-all shadow-lg"
                title="Eliminar widget"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
