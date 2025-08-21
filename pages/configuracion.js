import React, { useState } from 'react'
import EditPhaseModal from '../components/ui/EditPhaseModal'
import { Edit3 } from 'lucide-react'

export default function Configuracion() {
  const [phases, setPhases] = useState([
    { id: 1, name: 'PDTE. VISITAR', color: '#9333ea', bgColor: 'bg-purple-600' },
    { id: 2, name: 'VISITADO', color: '#f97316', bgColor: 'bg-orange-500' },
    { id: 3, name: 'IMPOSIBLE COTIZAR', color: '#334155', bgColor: 'bg-slate-700' },
    { id: 4, name: 'PDTE. COTIZAR', color: '#06b6d4', bgColor: 'bg-cyan-500' },
    { id: 5, name: 'COTIZADO', color: '#eab308', bgColor: 'bg-yellow-500' },
    { id: 6, name: 'ACEPTADO', color: '#ec4899', bgColor: 'bg-pink-500' },
    { id: 7, name: 'DENEGADO', color: '#334155', bgColor: 'bg-slate-700' }
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPhase, setEditingPhase] = useState(null)
  const [isAddingPhase, setIsAddingPhase] = useState(false)

  const handleEditPhase = (phase) => {
    setEditingPhase(phase)
    setIsModalOpen(true)
  }

  const handleSavePhase = (updatedPhase) => {
    setPhases(prevPhases => 
      prevPhases.map(phase => 
        phase.id === updatedPhase.id 
          ? { ...phase, name: updatedPhase.name, color: updatedPhase.color }
          : phase
      )
    )
  }

  const handleAddPhase = () => {
    const newPhase = {
      id: Math.max(...phases.map(p => p.id)) + 1,
      name: 'NUEVA FASE',
      color: '#6b7280',
      bgColor: 'bg-gray-500'
    }
    setPhases(prevPhases => [...prevPhases, newPhase])
    setEditingPhase(newPhase)
    setIsModalOpen(true)
  }

  return (
    <div>
      {/* Div personalizado de ancho completo x 48px - ENCIMA DE TODO */}
      <div className="w-full h-12 flex items-center justify-between pl-2 pr-6 mt-2">
        <h1 className="text-3xl font-normal text-yale-blue font-raleway uppercase tracking-wider">Configuración</h1>
        <span className="text-lg font-medium text-air-force-blue font-inter">Curso 2024/2025</span>
      </div>

      {/* Fases de Venta */}
      <div className="bg-white-custom rounded-lg shadow-md p-6 mt-6">
        <h2 className="text-xl font-semibold text-yale-blue mb-4">Fases de Venta</h2>
        <div className="grid grid-cols-8 gap-2">
          {phases.map((phase) => (
            <div key={phase.id} className={`${phase.bgColor} text-white p-2 rounded-lg text-center relative group`}>
              <span className="font-medium text-xs">{phase.name}</span>
              <button
                onClick={() => handleEditPhase(phase)}
                className="absolute -top-1 -right-1 bg-white text-gray-600 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100"
                title="Editar fase"
              >
                <Edit3 className="w-3 h-3" />
              </button>
            </div>
          ))}
          
          {/* Botón para añadir nueva fase */}
          <button
            onClick={() => handleAddPhase()}
            className="bg-gray-200 hover:bg-gray-300 text-gray-600 p-2 rounded-lg text-center transition-colors border-2 border-dashed border-gray-400 hover:border-gray-500"
            title="Añadir nueva fase"
          >
            <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center mx-auto">
              <span className="text-white text-lg font-bold">+</span>
            </div>
          </button>
        </div>
        <p className="text-air-force-blue text-sm mt-4 italic">
          Haz hover sobre cada fase y haz clic en el icono de editar para personalizar colores y nombres. 
          Usa el botón "+" para añadir nuevas fases al proceso de venta.
        </p>
      </div>

      {/* Modal de edición */}
      <EditPhaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        phase={editingPhase}
        onSave={handleSavePhase}
      />
    </div>
  )
}
