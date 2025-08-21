import React, { useState } from 'react'
import FechasModal from '../ui/FechasModal'
import { 
  calcularDuracion, 
  formatearFecha, 
  formatearFechaCorta,
  getDiaSemana,
  esFinDeSemana
} from '../../utils/fechas'

// Ejemplo de cómo usar el FechasModal en cualquier página
export default function FechasModalExample() {
  const [showModal, setShowModal] = useState(false)
  const [fechasSeleccionadas, setFechasSeleccionadas] = useState({
    fechaSalida: '',
    fechaRegreso: ''
  })

  const handleFechasSave = ({ fechaSalida, fechaRegreso }) => {
    setFechasSeleccionadas({ fechaSalida, fechaRegreso })
    console.log('Fechas seleccionadas:', { fechaSalida, fechaRegreso })
  }

  const duracion = calcularDuracion(fechasSeleccionadas.fechaSalida, fechasSeleccionadas.fechaRegreso)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Ejemplo de Uso del Modal de Fechas</h1>
      
      {/* Botón para abrir el modal */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-yale-blue text-white px-4 py-2 rounded-lg hover:bg-air-force-blue transition-colors mb-4"
      >
        Seleccionar Fechas
      </button>

      {/* Mostrar fechas seleccionadas */}
      {fechasSeleccionadas.fechaSalida && fechasSeleccionadas.fechaRegreso && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold mb-2">Fechas seleccionadas:</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Fecha de Salida:</p>
              <p className="font-medium">{formatearFecha(fechasSeleccionadas.fechaSalida)}</p>
              <p className="text-xs text-gray-500">
                {getDiaSemana(fechasSeleccionadas.fechaSalida)}
                {esFinDeSemana(fechasSeleccionadas.fechaSalida) && ' (Fin de semana)'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Fecha de Regreso:</p>
              <p className="font-medium">{formatearFecha(fechasSeleccionadas.fechaRegreso)}</p>
              <p className="text-xs text-gray-500">
                {getDiaSemana(fechasSeleccionadas.fechaRegreso)}
                {esFinDeSemana(fechasSeleccionadas.fechaRegreso) && ' (Fin de semana)'}
              </p>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-sm text-gray-600">Duración del viaje:</p>
            <p className="font-medium text-lg">{duracion} días</p>
            <p className="text-xs text-gray-500">
              {formatearFechaCorta(fechasSeleccionadas.fechaSalida)} - {formatearFechaCorta(fechasSeleccionadas.fechaRegreso)}
            </p>
          </div>
        </div>
      )}

      {/* Modal de fechas */}
      <FechasModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleFechasSave}
        fechaInicio={fechasSeleccionadas.fechaSalida}
        fechaFin={fechasSeleccionadas.fechaRegreso}
        title="Seleccionar Fechas de Vacaciones"
      />
    </div>
  )
}

// Ejemplo de uso en un formulario de reserva
export function FechasModalFormExample() {
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    fechaSalida: '',
    fechaRegreso: '',
    destino: ''
  })

  const handleFechasSave = ({ fechaSalida, fechaRegreso }) => {
    setFormData(prev => ({
      ...prev,
      fechaSalida,
      fechaRegreso
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Formulario enviado:', formData)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Formulario de Reserva con Modal de Fechas</h1>
      
      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre completo
          </label>
          <input
            type="text"
            value={formData.nombre}
            onChange={(e) => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yale-blue focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yale-blue focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fechas del viaje
          </label>
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-left text-gray-500 hover:border-yale-blue focus:ring-2 focus:ring-yale-blue focus:border-transparent"
          >
            {formData.fechaSalida && formData.fechaRegreso 
              ? `${formData.fechaSalida} - ${formData.fechaRegreso}`
              : 'Seleccionar fechas'
            }
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Destino
          </label>
          <input
            type="text"
            value={formData.destino}
            onChange={(e) => setFormData(prev => ({ ...prev, destino: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yale-blue focus:border-transparent"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yale-blue text-white px-4 py-2 rounded-lg hover:bg-air-force-blue transition-colors"
        >
          Enviar Reserva
        </button>
      </form>

      {/* Modal de fechas */}
      <FechasModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleFechasSave}
        fechaInicio={formData.fechaSalida}
        fechaFin={formData.fechaRegreso}
        title="Seleccionar Fechas del Viaje"
      />
    </div>
  )
}
