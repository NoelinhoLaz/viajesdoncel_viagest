import React, { useState } from 'react'
import TipTapEditor from '../components/ui/TipTapEditor'

export default function EditorTest() {
  const [content, setContent] = useState('')
  const [readOnlyContent, setReadOnlyContent] = useState('<h2>Presupuesto de Viaje</h2><p>Este es un ejemplo de <strong>presupuesto</strong> creado con el editor TipTap.</p><ul><li>Vuelos: €500</li><li>Hotel: €300</li><li>Actividades: €200</li></ul>')

  const handleContentChange = (newContent) => {
    setContent(newContent)
    console.log('Contenido actualizado:', newContent)
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="w-full h-12 flex items-center justify-between pl-2 pr-6 mt-2 mb-6">
        <h1 className="text-3xl font-normal text-yale-blue font-raleway uppercase tracking-wider">Editor TipTap - Pruebas</h1>
        <span className="text-lg font-medium text-air-force-blue font-inter">Curso 2024/2025</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Editor Activo */}
        <div className="bg-white-custom rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-yale-blue mb-4">Editor Activo</h2>
          <p className="text-gray-600 mb-4">Crea contenido rico con todas las herramientas disponibles:</p>
          
          <TipTapEditor
            content={content}
            onChange={handleContentChange}
            placeholder="Escribe tu presupuesto aquí..."
            className="mb-4"
          />

          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">HTML Generado:</h3>
            <pre className="text-xs text-gray-600 overflow-auto max-h-32">
              {content || '<p>Escribe algo para ver el HTML generado...</p>'}
            </pre>
          </div>
        </div>

        {/* Editor de Solo Lectura */}
        <div className="bg-white-custom rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-yale-blue mb-4">Vista Previa</h2>
          <p className="text-gray-600 mb-4">Visualización del contenido en modo solo lectura:</p>
          
          <TipTapEditor
            content={readOnlyContent}
            readOnly={true}
            className="mb-4"
          />

          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-700 mb-2">Características del Editor:</h3>
            <ul className="text-sm text-blue-600 space-y-1">
              <li>• <strong>Formato de texto:</strong> Negrita, cursiva, subrayado, tachado</li>
              <li>• <strong>Tamaños de fuente:</strong> Desde 12px hasta 30px</li>
              <li>• <strong>Alineación:</strong> Izquierda, centro, derecha, justificar</li>
              <li>• <strong>Listas:</strong> Con viñetas y numeradas</li>
              <li>• <strong>Colores:</strong> Texto y resaltado</li>
              <li>• <strong>Media:</strong> Imágenes y enlaces</li>
              <li>• <strong>Deshacer/Rehacer:</strong> Control total de cambios</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Ejemplos de Uso */}
      <div className="mt-8 bg-white-custom rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-yale-blue mb-4">Casos de Uso</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">📋 Presupuestos</h3>
            <p className="text-sm text-gray-600">Crear presupuestos detallados con tablas, listas y formato profesional.</p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">📄 Propuestas</h3>
            <p className="text-sm text-gray-600">Desarrollar propuestas comerciales con imágenes, enlaces y estructura clara.</p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">📝 Documentación</h3>
            <p className="text-sm text-gray-600">Generar documentación técnica con código, citas y formato avanzado.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
