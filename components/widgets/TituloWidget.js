import React, { useState } from 'react'
import { Type, Save, X, MoreVertical, Trash2 } from 'lucide-react'

export default function TituloWidget({ widget, isEditMode, onUpdate, onRemove, isEditing, setIsEditing }) {
  const [editContent, setEditContent] = useState(widget.content)

  const handleSave = () => {
    onUpdate(widget.id, { content: editContent })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditContent(widget.content)
    setIsEditing(false)
  }

  const getTitleSize = (size) => {
    switch (size) {
      case 'h1': return 'text-4xl font-bold'
      case 'h2': return 'text-3xl font-bold'
      case 'h3': return 'text-2xl font-semibold'
      case 'h4': return 'text-xl font-semibold'
      case 'h5': return 'text-lg font-medium'
      case 'h6': return 'text-base font-medium'
      default: return 'text-2xl font-semibold'
    }
  }

  if (isEditMode && isEditing) {
    return (
      <div className="bg-white border-2 border-yale-blue rounded-xl p-5 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yale-blue rounded-lg">
              <Type size={20} className="text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-900">Editar Título</span>
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
              Texto del título
            </label>
            <input
              type="text"
              value={editContent.text}
              onChange={(e) => setEditContent(prev => ({ ...prev, text: e.target.value }))}
              placeholder="Escribe el título aquí..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-yale-blue focus:border-transparent text-lg transition-all"
              maxLength={100}
            />
            <p className="text-sm text-gray-500 mt-1">
              {editContent.text.length}/100 caracteres
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tamaño
            </label>
            <select
              value={editContent.size}
              onChange={(e) => setEditContent(prev => ({ ...prev, size: e.target.value }))}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-yale-blue focus:border-transparent text-lg transition-all"
            >
              <option value="h1">H1 - Muy grande</option>
              <option value="h2">H2 - Grande</option>
              <option value="h3">H3 - Mediano</option>
              <option value="h4">H4 - Pequeño</option>
              <option value="h5">H5 - Muy pequeño</option>
              <option value="h6">H6 - Extra pequeño</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Color
            </label>
            <select
              value={editContent.color}
              onChange={(e) => setEditContent(prev => ({ ...prev, color: e.target.value }))}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-yale-blue focus:border-transparent text-lg transition-all"
            >
              <option value="text-gray-900">Negro</option>
              <option value="text-yale-blue">Azul Yale</option>
              <option value="text-green-600">Verde</option>
              <option value="text-red-600">Rojo</option>
              <option value="text-purple-600">Púrpura</option>
              <option value="text-orange-600">Naranja</option>
            </select>
          </div>
        </div>
      </div>
    )
  }

  if (isEditMode) {
    return (
      <div className="bg-white border-b border-gray-200 p-4 transition-all duration-300 hover:bg-gray-50">

        
        <div className="flex items-center justify-between">
          <div className={`${getTitleSize(editContent.size)} ${editContent.color}`}>
            {editContent.text}
          </div>

        </div>
      </div>
    )
  }

  // Vista previa (no editable)
  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className={`${getTitleSize(editContent.size)} ${editContent.color}`}>
        {editContent.text}
      </div>
    </div>
  )
}
