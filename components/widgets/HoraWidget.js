import React, { useState } from 'react'
import { Clock, Save, X, MoreVertical, Trash2 } from 'lucide-react'

export default function HoraWidget({ widget, isEditMode, onUpdate, onRemove, isEditing, setIsEditing }) {
  const [editContent, setEditContent] = useState(widget.content)

  const handleSave = () => {
    if (editContent.time && editContent.label.trim()) {
      onUpdate(widget.id, { content: editContent })
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditContent(widget.content)
    setIsEditing(false)
  }





  if (isEditMode && isEditing) {
    return (
      <div className="bg-white border-2 border-yale-blue rounded-xl p-5 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yale-blue rounded-lg">
              <Clock size={20} className="text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-900">Editar Hora</span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              disabled={!editContent.time || !editContent.label.trim()}
              className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
              Hora
            </label>
            <input
              type="time"
              value={editContent.time}
              onChange={(e) => setEditContent(prev => ({ ...prev, time: e.target.value }))}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-yale-blue focus:border-transparent text-lg font-medium transition-all"
            />
            {editContent.time && (
              <p className="text-sm text-gray-500 mt-1">
                Hora seleccionada: {editContent.time}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Etiqueta descriptiva
            </label>
            <input
              type="text"
              value={editContent.label}
              onChange={(e) => setEditContent(prev => ({ ...prev, label: e.target.value }))}
              placeholder="Ej: Hora de inicio, Hora de llegada, Check-in..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-yale-blue focus:border-transparent text-lg transition-all"
              maxLength={50}
            />
            <p className="text-sm text-gray-500 mt-1">
              {editContent.label.length}/50 caracteres
            </p>
          </div>


        </div>
      </div>
    )
  }

  if (isEditMode) {
    return (
      <div className="bg-white border-b border-gray-200 p-3 transition-all duration-300 hover:bg-gray-50">
        <div className="flex justify-end">
          <div className="flex items-center space-x-2">
            <div className="px-2 py-1 bg-blue-100 border border-blue-200 rounded-md">
              <span className="text-base font-semibold text-blue-800">
                {widget.content.time}
              </span>
            </div>

          </div>
        </div>
      </div>
    )
  }

  // Vista previa (no editable)
  return (
    <div className="bg-white border-b border-gray-200 p-3">
      <div className="flex justify-end">
        <div className="px-2 py-1 bg-blue-100 border border-blue-200 rounded-md">
          <span className="text-base font-semibold text-blue-800">
            {widget.content.time}
          </span>
        </div>
      </div>
    </div>
  )
}
