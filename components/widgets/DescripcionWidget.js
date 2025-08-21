import React, { useState } from 'react'
import { AlignLeft, Save, X, MoreVertical, Trash2 } from 'lucide-react'
import dynamic from 'next/dynamic'

// Importar ReactQuill de forma dinámica para evitar problemas de SSR
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <div className="h-32 bg-gray-100 rounded-lg animate-pulse"></div>
})

// Importar estilos de Quill
import 'react-quill/dist/quill.snow.css'

export default function DescripcionWidget({ widget, isEditMode, onUpdate, onRemove, isEditing, setIsEditing }) {
  const [editContent, setEditContent] = useState(widget.content)

  const handleSave = () => {
    if (editContent.text.trim()) {
      onUpdate(widget.id, { content: editContent })
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditContent(widget.content)
    setIsEditing(false)
  }

  // Configuración del editor Quill
  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean']
    ],
  }

  const quillFormats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'list', 'bullet',
    'align',
    'link', 'image'
  ]

  if (isEditMode && isEditing) {
    return (
      <div className="bg-white border-2 border-yale-blue rounded-xl p-5 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yale-blue rounded-lg">
              <AlignLeft size={20} className="text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-900">Editar Descripción</span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              disabled={!editContent.text.trim()}
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
              Contenido de la descripción
            </label>
            <div className="border-2 border-gray-200 rounded-lg focus-within:border-yale-blue transition-all">
              <ReactQuill
                value={editContent.text}
                onChange={(value) => setEditContent(prev => ({ ...prev, text: value }))}
                modules={quillModules}
                formats={quillFormats}
                placeholder="Escribe aquí la descripción detallada..."
                className="min-h-[200px]"
                theme="snow"
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {editContent.text.replace(/<[^>]*>/g, '').length} caracteres
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Estilo de visualización
            </label>
            <select
              value={editContent.style || 'default'}
              onChange={(e) => setEditContent(prev => ({ ...prev, style: e.target.value }))}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-yale-blue focus:border-transparent text-lg transition-all"
            >
              <option value="default">Estilo por defecto</option>
              <option value="card">Estilo tarjeta</option>
              <option value="minimal">Estilo minimalista</option>
              <option value="highlighted">Estilo destacado</option>
            </select>
          </div>
        </div>
      </div>
    )
  }

  if (isEditMode) {
    return (
      <div className="bg-white border-b border-gray-200 p-3 transition-all duration-300 hover:bg-gray-50">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <div 
              className={`prose prose-sm max-w-none ${
                editContent.style === 'card' ? 'bg-gray-50 p-3 rounded-lg border' :
                editContent.style === 'minimal' ? 'text-gray-700' :
                editContent.style === 'highlighted' ? 'bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-400' :
                'text-gray-800'
              }`}
              dangerouslySetInnerHTML={{ __html: editContent.text }}
            />
          </div>

        </div>
      </div>
    )
  }

  // Vista previa (no editable)
  return (
          <div className="bg-white border-b border-gray-200 p-3">
        <div className="flex-1">
          <div 
          className={`prose prose-sm max-w-none ${
            editContent.style === 'card' ? 'bg-gray-50 p-3 rounded-lg border' :
            editContent.style === 'minimal' ? 'text-gray-700' :
            editContent.style === 'highlighted' ? 'bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-400' :
            'text-gray-800'
          }`}
          dangerouslySetInnerHTML={{ __html: editContent.text }}
        />
      </div>
    </div>
  )
}
