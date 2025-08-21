import React, { useState } from 'react'
import DestinoModal from '../ui/DestinoModal'
import { destinos } from '../../data/destinos'

// Ejemplo de cómo usar el DestinoModal en cualquier página
export default function ModalUsageExample() {
  const [showModal, setShowModal] = useState(false)
  const [destinoSeleccionado, setDestinoSeleccionado] = useState(null)

  const handleDestinoSelect = (destino) => {
    setDestinoSeleccionado(destino)
    setShowModal(false)
    console.log('Destino seleccionado:', destino)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Ejemplo de Uso del Modal</h1>
      
      {/* Botón para abrir el modal */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-yale-blue text-white px-4 py-2 rounded-lg hover:bg-air-force-blue transition-colors"
      >
        Seleccionar Destino
      </button>

      {/* Mostrar destino seleccionado */}
      {destinoSeleccionado && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold">Destino seleccionado:</h3>
          <p className="text-gray-700">{destinoSeleccionado.titulo}</p>
        </div>
      )}

      {/* Modal reutilizable */}
      <DestinoModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSelect={handleDestinoSelect}
        destinos={destinos}
        title="Elegir Destino de Viaje" // Título personalizable
      />
    </div>
  )
}

// Ejemplo de uso en otra página con filtros personalizados
export function ModalWithCustomFilters() {
  const [showModal, setShowModal] = useState(false)
  const [destinosFiltrados, setDestinosFiltrados] = useState(destinos)

  // Filtrar destinos por región
  const filtrarPorRegion = (region) => {
    const filtrados = destinos.filter(destino => 
      destino.titulo.toLowerCase().includes(region.toLowerCase())
    )
    setDestinosFiltrados(filtrados)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Modal con Filtros</h1>
      
      {/* Filtros personalizados */}
      <div className="mb-4 space-x-2">
        <button
          onClick={() => setDestinosFiltrados(destinos)}
          className="bg-gray-500 text-white px-3 py-1 rounded text-sm"
        >
          Todos
        </button>
        <button
          onClick={() => filtrarPorRegion('andalucía')}
          className="bg-green-500 text-white px-3 py-1 rounded text-sm"
        >
          Andalucía
        </button>
        <button
          onClick={() => filtrarPorRegion('madrid')}
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
        >
          Madrid
        </button>
      </div>

      <button
        onClick={() => setShowModal(true)}
        className="bg-yale-blue text-white px-4 py-2 rounded-lg hover:bg-air-force-blue transition-colors"
      >
        Ver Destinos Filtrados
      </button>

      {/* Modal con destinos filtrados */}
      <DestinoModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSelect={(destino) => {
          console.log('Destino seleccionado:', destino)
          setShowModal(false)
        }}
        destinos={destinosFiltrados}
        title="Destinos Disponibles"
      />
    </div>
  )
}
