import React, { useState } from 'react'
import { Minus, Save, X } from 'lucide-react'

export default function LineaWidget({ widget, isEditMode, onUpdate, onRemove, isEditing, setIsEditing }) {
  const [editContent, setEditContent] = useState(widget.content)

  const handleSave = () => {
    onUpdate(widget.id, { content: editContent })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditContent(widget.content)
    setIsEditing(false)
  }

  const getLineStyle = () => {
    const { style, color, thickness } = editContent
    let baseClasses = 'w-full'
    
    // Estilo de la línea
    switch (style) {
      case 'solid':
        baseClasses += ' border-t'
        break
      case 'dashed':
        baseClasses += ' border-t border-dashed'
        break
      case 'dotted':
        baseClasses += ' border-t border-dotted'
        break
      case 'gradient':
        baseClasses += ' bg-gradient-to-r'
        break
      default:
        baseClasses += ' border-t'
    }
    
    // Grosor de la línea
    switch (thickness) {
      case 'thin':
        baseClasses += ' border-t'
        break
      case 'medium':
        baseClasses += ' border-t-2'
        break
      case 'thick':
        baseClasses += ' border-t-4'
        break
      default:
        baseClasses += ' border-t'
    }
    
    // Color de la línea
    switch (color) {
      case 'gray':
        baseClasses += ' border-gray-300'
        break
      case 'blue':
        baseClasses += ' border-blue-400'
        break
      case 'green':
        baseClasses += ' border-green-400'
        break
      case 'red':
        baseClasses += ' border-red-400'
        break
      case 'purple':
        baseClasses += ' border-purple-400'
        break
      case 'orange':
        baseClasses += ' border-orange-400'
        break
      default:
        baseClasses += ' border-gray-300'
    }
    
    // Estilo especial para gradiente
    if (style === 'gradient') {
      baseClasses = baseClasses.replace(/border-t.*?$/, '')
      switch (color) {
        case 'blue':
          baseClasses += ' from-blue-400 to-blue-600'
          break
        case 'green':
          baseClasses += ' from-green-400 to-green-600'
          break
        case 'red':
          baseClasses += ' from-red-400 to-red-600'
          break
        case 'purple':
          baseClasses += ' from-purple-400 to-purple-600'
          break
        case 'orange':
          baseClasses += ' from-orange-400 to-orange-600'
          break
        default:
          baseClasses += ' from-gray-400 to-gray-600'
      }
    }
    
    return baseClasses
  }

  if (isEditMode && isEditing) {
    return (
      <div className="bg-white border-2 border-yale-blue rounded-xl p-5 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yale-blue rounded-lg">
              <Minus size={20} className="text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-900">Editar Línea Horizontal</span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-all"
            >
              <Save size={18} />
            </button>
            <button
              onClick={handleCancel}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-all"
            >
              <X size={18} />
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Estilo de la línea
            </label>
            <select
              value={editContent.style || 'solid'}
              onChange={(e) => setEditContent(prev => ({ ...prev, style: e.target.value }))}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-yale-blue focus:border-transparent text-lg transition-all"
            >
              <option value="solid">Línea sólida</option>
              <option value="dashed">Línea punteada</option>
              <option value="dotted">Línea de puntos</option>
              <option value="gradient">Gradiente</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Color
            </label>
            <select
              value={editContent.color || 'gray'}
              onChange={(e) => setEditContent(prev => ({ ...prev, color: e.target.value }))}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-yale-blue focus:border-transparent text-lg transition-all"
            >
              <option value="gray">Gris</option>
              <option value="blue">Azul</option>
              <option value="green">Verde</option>
              <option value="red">Rojo</option>
              <option value="purple">Púrpura</option>
              <option value="orange">Naranja</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Grosor
            </label>
            <select
              value={editContent.thickness || 'medium'}
              onChange={(e) => setEditContent(prev => ({ ...prev, thickness: e.target.value }))}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-yale-blue focus:border-transparent text-lg transition-all"
            >
              <option value="thin">Fino</option>
              <option value="medium">Medio</option>
              <option value="thick">Grueso</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Vista previa
            </label>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className={getLineStyle()}>
                {editContent.style === 'gradient' && (
                  <div className={`h-1 ${getLineStyle()}`}></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isEditMode) {
    return (
      <div className="bg-white border-b border-gray-200 p-3 transition-all duration-300 hover:bg-gray-50">
        <div className={getLineStyle()}>
          {editContent.style === 'gradient' && (
            <div className={`h-1 ${getLineStyle()}`}></div>
          )}
        </div>
      </div>
    )
  }

  // Vista previa (no editable)
  return (
    <div className="bg-white border-b border-gray-200 p-3">
      <div className={getLineStyle()}>
        {editContent.style === 'gradient' && (
          <div className={`h-1 ${getLineStyle()}`}></div>
        )}
      </div>
    </div>
  )
}
