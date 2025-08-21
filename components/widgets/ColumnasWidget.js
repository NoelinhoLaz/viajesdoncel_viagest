import React, { useState } from 'react'
import { Columns3, Save, X, Plus, Trash2, Type, Image, Map, Video, Edit } from 'lucide-react'

export default function ColumnasWidget({ widget, isEditMode, onUpdate, onRemove, isEditing, setIsEditing }) {
  // Asegurar que columns sea siempre un array
  const initialContent = {
    columns: Array.isArray(widget.content?.columns) ? widget.content.columns : []
  }
  const [editContent, setEditContent] = useState(initialContent)

  const handleSave = () => {
    if (editContent.columns && editContent.columns.length > 0) {
      onUpdate(widget.id, { content: editContent })
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditContent(widget.content)
    setIsEditing(false)
  }

  const addColumn = () => {
    if (editContent.columns.length < 3) {
              setEditContent(prev => ({
          ...prev,
          columns: [...prev.columns, {
            id: Date.now(),
            type: 'texto',
            content: '',
            title: ''
          }]
        }))
    }
  }

  const removeColumn = (columnId) => {
    setEditContent(prev => ({
      ...prev,
      columns: prev.columns.filter(col => col.id !== columnId)
    }))
  }

  const updateColumn = (columnId, updates) => {
    setEditContent(prev => ({
      ...prev,
      columns: prev.columns.map(col => 
        col.id === columnId ? { ...col, ...updates } : col
      )
    }))
  }

  const getColumnIcon = (type) => {
    switch (type) {
      case 'texto':
        return <Type size={16} className="text-gray-600" />
      case 'imagen':
        return <Image size={16} className="text-gray-600" />
      case 'mapa':
        return <Map size={16} className="text-gray-600" />
      case 'video':
        return <Video size={16} className="text-gray-600" />
      default:
        return <Type size={16} className="text-gray-600" />
    }
  }

  const renderColumnContent = (column) => {
    switch (column.type) {
      case 'texto':
        return (
          <textarea
            value={column.content}
            onChange={(e) => updateColumn(column.id, { content: e.target.value })}
            placeholder="Escribe el texto de la columna..."
            className="w-full h-24 p-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-yale-blue focus:border-transparent"
          />
        )
              case 'imagen':
          return (
            <div className="space-y-2">
              <input
                type="text"
                value={column.content}
                onChange={(e) => updateColumn(column.id, { content: e.target.value })}
                placeholder="URL de la imagen..."
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yale-blue focus:border-transparent"
              />
              {column.content && (
                <div className="w-full aspect-video bg-gray-100 rounded-lg border overflow-hidden">
                  <img 
                    src={column.content} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                    onError={(e) => e.target.style.display = 'none'}
                  />
                </div>
              )}
            </div>
          )
              case 'mapa':
          return (
            <div className="space-y-2">
              <input
                type="text"
                value={column.content}
                onChange={(e) => updateColumn(column.id, { content: e.target.value })}
                placeholder="URL del mapa o coordenadas..."
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yale-blue focus:border-transparent"
              />
              {column.content && (
                <div className="w-full aspect-video bg-gray-100 rounded-lg border flex items-center justify-center">
                  <Map size={24} className="text-gray-400" />
                  <span className="text-sm text-gray-500 ml-2">Mapa</span>
                </div>
              )}
            </div>
          )
              case 'video':
          return (
            <div className="space-y-2">
              <input
                type="text"
                value={column.content}
                onChange={(e) => updateColumn(column.id, { content: e.target.value })}
                placeholder="URL del video..."
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yale-blue focus:border-transparent"
              />
              {column.content && (
                <div className="w-full aspect-video bg-gray-100 rounded-lg border flex items-center justify-center">
                  <Video size={24} className="text-gray-400" />
                  <span className="text-sm text-gray-500 ml-2">Video</span>
                </div>
              )}
            </div>
          )
      default:
        return null
    }
  }

  if (isEditMode && isEditing) {
    return (
      <div className="bg-white border-2 border-yale-blue rounded-xl p-5 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yale-blue rounded-lg">
              <Columns3 size={20} className="text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-900">Editar Columnas</span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              disabled={editContent.columns.length === 0}
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
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-md font-semibold text-gray-700">Columnas</h4>
              <p className="text-xs text-gray-500">Máximo 3 columnas</p>
            </div>
            <button
              onClick={addColumn}
              disabled={editContent.columns.length >= 3}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                editContent.columns.length >= 3
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-yale-blue text-white hover:bg-air-force-blue'
              }`}
            >
              <Plus size={16} />
              <span>Añadir Columna</span>
            </button>
          </div>

          {editContent.columns.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Columns3 size={32} className="mx-auto mb-2 text-gray-300" />
              <p className="text-sm">No hay columnas. Haz clic en "Añadir Columna" para comenzar.</p>
            </div>
          ) : (
            <div className={`grid gap-4 ${editContent.columns.length === 2 ? 'grid-cols-2' : editContent.columns.length === 3 ? 'grid-cols-3' : 'grid-cols-1'}`}>
              {(editContent.columns || []).map((column, index) => (
                <div key={column.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50 w-full">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {getColumnIcon(column.type)}
                      <span className="text-sm font-medium text-gray-700">Columna {index + 1}</span>
                    </div>
                    <button
                      onClick={() => removeColumn(column.id)}
                      className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-all"
                      title="Eliminar columna"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <select
                      value={column.type}
                      onChange={(e) => updateColumn(column.id, { type: e.target.value, content: '' })}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-yale-blue focus:border-transparent"
                    >
                      <option value="texto">Texto</option>
                      <option value="imagen">Imagen</option>
                      <option value="mapa">Mapa</option>
                      <option value="video">Video</option>
                    </select>

                    {renderColumnContent(column)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  if (isEditMode) {
    return (
      <div className="bg-white border-b border-gray-200 p-4 transition-all duration-300 hover:bg-gray-50">
        <div className={`grid gap-4 ${editContent.columns.length === 2 ? 'grid-cols-2' : editContent.columns.length === 3 ? 'grid-cols-3' : 'grid-cols-1'}`}>
          {(editContent.columns || []).map((column, index) => (
            <div key={column.id} className="border border-gray-200 rounded-lg p-3 bg-gray-50 w-full">
              <div className="text-sm text-gray-700">
                {column.type === 'texto' && column.content && (
                  <p className="line-clamp-3">{column.content}</p>
                )}
                {column.type === 'imagen' && column.content && (
                  <div className="w-full aspect-video bg-gray-100 rounded overflow-hidden">
                    <img src={column.content} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
                {column.type === 'mapa' && column.content && (
                  <div className="w-full aspect-video bg-gray-200 rounded flex items-center justify-center">
                    <Map size={20} className="text-gray-400" />
                  </div>
                )}
                {column.type === 'video' && column.content && (
                  <div className="w-full aspect-video bg-gray-100 rounded flex items-center justify-center">
                    <Video size={20} className="text-gray-400" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Vista previa (no editable)
  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className={`grid gap-4 ${editContent.columns.length === 2 ? 'grid-cols-2' : editContent.columns.length === 3 ? 'grid-cols-3' : 'grid-cols-1'}`}>
        {(editContent.columns || []).map((column, index) => (
          <div key={column.id} className="border border-gray-200 rounded-lg p-3 bg-gray-50 w-full">
            <div className="text-sm text-gray-700">
              {column.type === 'texto' && column.content && (
                <p className="line-clamp-3">{column.content}</p>
              )}
              {column.type === 'imagen' && column.content && (
                <div className="w-full aspect-video bg-gray-100 rounded overflow-hidden">
                  <img src={column.content} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
              {column.type === 'mapa' && column.content && (
                <div className="w-full aspect-video bg-gray-200 rounded flex items-center justify-center">
                  <Map size={20} className="text-gray-400" />
                </div>
              )}
              {column.type === 'video' && column.content && (
                <div className="w-full aspect-video bg-gray-100 rounded flex items-center justify-center">
                  <Video size={20} className="text-gray-400" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
