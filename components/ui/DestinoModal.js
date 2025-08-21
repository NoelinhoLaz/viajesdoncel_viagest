import React from 'react'

const DestinoModal = ({ 
  isOpen, 
  onClose, 
  onSelect, 
  destinos = [],
  title = "Seleccionar Destino"
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header del Modal */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Lista de Destinos */}
        <div className="p-4">
          <div className="grid gap-4">
            {destinos.map((destino) => (
              <div
                key={destino.id}
                onClick={() => onSelect(destino)}
                className="border border-gray-200 rounded-lg p-3 hover:border-yale-blue hover:shadow-md transition-all cursor-pointer group"
              >
                {/* Primera fila: Título del Destino */}
                <div className="mb-2">
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-yale-blue transition-colors">
                    {destino.titulo}
                  </h3>
                </div>

                {/* Segunda fila: Dos columnas con distribución 1/3 */}
                <div className="grid grid-cols-12 gap-3">
                  {/* Columna izquierda: Ciudades separadas por comas (1/3) */}
                  <div className="col-span-4">
                    <h4 className="text-xs font-semibold text-gray-700 mb-1 uppercase tracking-wide">
                      Ciudades Incluidas
                    </h4>
                    <p className="text-gray-600 text-xs leading-tight">
                      {destino.ciudades}
                    </p>
                  </div>

                  {/* Columna derecha: Descripción del Destino (2/3) */}
                  <div className="col-span-8">
                    <h4 className="text-xs font-semibold text-gray-700 mb-1 uppercase tracking-wide">
                      Descripción del Destino
                    </h4>
                    <p className="text-gray-600 text-xs leading-tight">
                      {destino.descripcion}
                    </p>
                  </div>
                </div>

                {/* Indicador de selección */}
                <div className="mt-2 flex justify-end">
                  <div className="text-yale-blue opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DestinoModal
