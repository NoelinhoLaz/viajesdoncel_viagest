import React, { useState, useEffect, useRef } from 'react'
import { Calendar, X } from 'lucide-react'

const FechasModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  fechaInicio = '',
  fechaFin = '',
  title = "Seleccionar Fechas"
}) => {
  const [fechaSalida, setFechaSalida] = useState(fechaInicio)
  const [fechaRegreso, setFechaRegreso] = useState(fechaFin)
  const [error, setError] = useState('')
  const [fechaRegresoFocused, setFechaRegresoFocused] = useState(false)
  const fechaRegresoRef = useRef(null)

  const handleFechaSalidaChange = (e) => {
    const nuevaFecha = e.target.value
    setFechaSalida(nuevaFecha)
    
    // Validar que fecha regreso sea posterior a fecha salida
    if (fechaRegreso && nuevaFecha >= fechaRegreso) {
      setError('La fecha de regreso debe ser posterior a la fecha de salida')
      setFechaRegreso('') // Limpiar fecha regreso si es inválida
    } else {
      setError('')
    }

    // Si no hay fecha de regreso, sugerir la misma fecha de salida
    if (!fechaRegreso && nuevaFecha) {
      setFechaRegreso(nuevaFecha)
    }

    // Enfocar automáticamente el campo de fecha de regreso
    setTimeout(() => {
      if (fechaRegresoRef.current) {
        fechaRegresoRef.current.focus()
      }
    }, 100)
  }

  const handleFechaRegresoChange = (e) => {
    const nuevaFecha = e.target.value
    setFechaRegreso(nuevaFecha)
    
    // Validar que fecha regreso sea posterior a fecha salida
    if (fechaSalida && nuevaFecha <= fechaSalida) {
      setError('La fecha de regreso debe ser posterior a la fecha de salida')
    } else {
      setError('')
    }

    // Si la fecha de regreso es igual a la de salida, sugerir el día siguiente
    if (fechaSalida && nuevaFecha === fechaSalida) {
      const fechaSalidaObj = new Date(fechaSalida)
      const siguienteDia = new Date(fechaSalidaObj)
      siguienteDia.setDate(siguienteDia.getDate() + 1)
      const siguienteDiaStr = siguienteDia.toISOString().split('T')[0]
      setFechaRegreso(siguienteDiaStr)
    }
  }

  const handleSave = () => {
    if (!fechaSalida || !fechaRegreso) {
      setError('Por favor, selecciona ambas fechas')
      return
    }
    
    if (fechaSalida >= fechaRegreso) {
      setError('La fecha de regreso debe ser posterior a la fecha de salida')
      return
    }

    onSave({
      fechaSalida,
      fechaRegreso
    })
    onClose()
  }

  const handleClose = () => {
    // Resetear fechas al cerrar
    setFechaSalida(fechaInicio)
    setFechaRegreso(fechaFin)
    setError('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header del Modal */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Contenido del Modal */}
        <div className="p-6">
          {/* Fecha de Salida */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar size={16} className="inline mr-2 text-gray-500" />
              Fecha de Salida
            </label>
            <input
              type="date"
              value={fechaSalida}
              onChange={handleFechaSalidaChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yale-blue focus:border-transparent text-sm"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* Fecha de Regreso */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar size={16} className="inline mr-2 text-gray-500" />
              Fecha de Regreso
            </label>
            <input
              ref={fechaRegresoRef}
              type="date"
              value={fechaRegreso}
              onChange={handleFechaRegresoChange}
              min={fechaSalida || new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yale-blue focus:border-transparent text-sm"
            />
            {fechaSalida && (
              <p className="text-xs text-gray-500 mt-1">
                Selecciona una fecha posterior al {fechaSalida}
              </p>
            )}
          </div>

          {/* Mensaje de error */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Botones de acción */}
          <div className="flex space-x-3">
            <button
              onClick={handleClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-yale-blue text-white rounded-lg hover:bg-air-force-blue transition-colors text-sm font-medium"
            >
              Guardar Fechas
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FechasModal
