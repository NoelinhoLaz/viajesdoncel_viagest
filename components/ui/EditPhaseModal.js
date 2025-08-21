import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const EditPhaseModal = ({ isOpen, onClose, phase, onSave }) => {
  const [phaseName, setPhaseName] = useState('')
  const [phaseColor, setPhaseColor] = useState('#000000')

  // Actualizar valores cuando cambia la fase
  useEffect(() => {
    if (phase) {
      setPhaseName(phase.name || '')
      setPhaseColor(phase.color || '#000000')
    }
  }, [phase])

  // Limpiar campos cuando se cierra el modal
  useEffect(() => {
    if (!isOpen) {
      setPhaseName('')
      setPhaseColor('#000000')
    }
  }, [isOpen])

  const handleSave = () => {
    onSave({
      id: phase.id,
      name: phaseName,
      color: phaseColor
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-yale-blue">Editar Fase</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de la Fase
            </label>
            <input
              type="text"
              value={phaseName}
              onChange={(e) => setPhaseName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yale-blue focus:border-transparent"
              placeholder="Nombre de la fase"
            />
          </div>

          {/* Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color de la Fase
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={phaseColor}
                onChange={(e) => setPhaseColor(e.target.value)}
                className="w-12 h-12 border border-gray-300 rounded-md cursor-pointer"
              />
              <span className="text-sm text-gray-500">{phaseColor}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-yale-blue text-white rounded-md hover:bg-air-force-blue transition-colors"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditPhaseModal
