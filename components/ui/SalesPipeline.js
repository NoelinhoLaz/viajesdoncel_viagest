import React, { useState } from 'react'

const SalesPipeline = () => {
  const [showMore, setShowMore] = useState(false)
  
  // Datos de ejemplo - en una implementación real vendrían de una API
  const estadosData = {
    'Pdte. Visitar': {
      importe: 1748000,
      centros: 68,
      p1: 35,
      p2: 26,
      p1Importe: 910000,
      p2Importe: 676000
    },
    'Visitado': {
      importe: 870300,
      centros: 38,
      p1: 17,
      p2: 8,
      p1Importe: 404300,
      p2Importe: 208000
    },
    'Pdte. Cotizar': {
      importe: 0,
      centros: 0,
      p1: 0,
      p2: 0,
      p1Importe: 0,
      p2Importe: 0
    },
    'Cotizado': {
      importe: 0,
      centros: 0,
      p1: 0,
      p2: 0,
      p1Importe: 0,
      p2Importe: 0
    },
    'Aceptado': {
      importe: 156740,
      centros: 5,
      p1: 2,
      p2: 2,
      p1Importe: 93665,
      p2Importe: 37075
    },
    'Imposible Cotizar': {
      importe: 0,
      centros: 0,
      p1: 0,
      p2: 0,
      p1Importe: 0,
      p2Importe: 0
    },
    'Denegado': {
      importe: 258000,
      centros: 11,
      p1: 9,
      p2: 0,
      p1Importe: 226000,
      p2Importe: 0
    }
  }

  const formatearImporte = (importe) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(importe)
  }

  return (
    <div className="bg-white-custom rounded-lg shadow-md p-6">
      <div className="grid grid-cols-6 gap-6 w-full">
        <div className="col-span-1">
          <div className="bg-transparent">
            <div className="rounded-2xl shadow-lg p-2 flex flex-col items-center justify-between h-24" style={{ backgroundColor: '#117469', border: '4px solid #063a34' }}>
              <div className="flex flex-col items-center w-full">
                <div className="text-sm font-bold uppercase text-white tracking-widest mb-0 text-center truncate w-full">
                  POTENCIAL
                </div>
                <div className="text-sm font-extrabold text-white text-center truncate w-full mb-0">
                  {formatearImporte(Object.values(estadosData).reduce((acc, estado) => acc + (estado.p1Importe || 0), 0) + Object.values(estadosData).reduce((acc, estado) => acc + (estado.p2Importe || 0), 0))} ({Object.values(estadosData).reduce((acc, estado) => acc + (estado.centros || 0), 0)})
                </div>
                <div className="flex flex-col gap-0 w-full mt-0 px-1">
                  <div className="flex justify-between text-[11px] text-white/90">
                    <span className="font-semibold">P1</span>
                    <span className="font-semibold">
                      {formatearImporte(Object.values(estadosData).reduce((acc, estado) => acc + (estado.p1Importe || 0), 0))} ({Object.values(estadosData).reduce((acc, estado) => acc + (estado.p1 || 0), 0)})
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] text-white/90">
                    <span className="font-semibold">P2</span>
                    <span className="font-semibold">
                      {formatearImporte(Object.values(estadosData).reduce((acc, estado) => acc + (estado.p2Importe || 0), 0))} ({Object.values(estadosData).reduce((acc, estado) => acc + (estado.p2 || 0), 0)})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-5">
          <div className="grid grid-cols-9 gap-0" style={{ gridTemplateColumns: '1fr 20px 1fr 20px 1fr 20px 1fr 20px 1fr' }}>
            {/* Card 1: PDTE. VISITAR */}
            <div className="rounded-2xl shadow-lg p-2 flex flex-col items-center justify-between h-24" style={{ backgroundColor: '#8b5cf6', border: '4px solid #7c3aed' }}>
              <div className="flex flex-col items-center w-full">
                <div className="text-sm font-bold uppercase text-white tracking-widest mb-0 text-center truncate w-full">
                  PDTE. VISITAR
                </div>
                <div className="text-sm font-extrabold text-white text-center truncate w-full mb-0">
                  {formatearImporte(estadosData['Pdte. Visitar']?.importe || 0)} ({estadosData['Pdte. Visitar']?.centros || 0})
                </div>
                <div className="flex flex-col gap-0 w-full mt-0 px-1">
                  <div className="flex justify-between text-[11px] text-white/90">
                    <span className="font-semibold">P1</span>
                    <span className="font-semibold">
                      {formatearImporte(estadosData['Pdte. Visitar']?.p1Importe || 0)} ({estadosData['Pdte. Visitar']?.p1 || 0})
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] text-white/90">
                    <span className="font-semibold">P2</span>
                    <span className="font-semibold">
                      {formatearImporte(estadosData['Pdte. Visitar']?.p2Importe || 0)} ({estadosData['Pdte. Visitar']?.p2 || 0})
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Icon 1 */}
            <div className="flex items-center justify-center">
              <span className="text-gray-400 text-lg m-2">→</span>
            </div>

            {/* Card 2: VISITADO */}
            <div className="rounded-2xl shadow-lg p-2 flex flex-col items-center justify-between h-24" style={{ backgroundColor: '#fb923c', border: '4px solid #ea580c' }}>
              <div className="flex flex-col items-center w-full">
                <div className="text-sm font-bold uppercase text-white tracking-widest mb-0 text-center truncate w-full">
                  VISITADO
                </div>
                <div className="text-sm font-extrabold text-white text-center truncate w-full mb-0">
                  {formatearImporte(estadosData['Visitado']?.importe || 0)} ({estadosData['Visitado']?.centros || 0})
                </div>
                <div className="flex flex-col gap-0 w-full mt-0 px-1">
                  <div className="flex justify-between text-[11px] text-white/90">
                    <span className="font-semibold">P1</span>
                    <span className="font-semibold">
                      {formatearImporte(estadosData['Visitado']?.p1Importe || 0)} ({estadosData['Visitado']?.p1 || 0})
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] text-white/90">
                    <span className="font-semibold">P2</span>
                    <span className="font-semibold">
                      {formatearImporte(estadosData['Visitado']?.p2Importe || 0)} ({estadosData['Visitado']?.p2 || 0})
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Icon 2 */}
            <div className="flex items-center justify-center">
              <span className="text-gray-400 text-lg m-2">→</span>
            </div>

            {/* Card 3: PDTE. COTIZAR */}
            <div className="rounded-2xl shadow-lg p-2 flex flex-col items-center justify-between h-24" style={{ backgroundColor: '#22d3ee', border: '4px solid #0891b2' }}>
              <div className="flex flex-col items-center w-full">
                <div className="text-sm font-bold uppercase text-white tracking-widest mb-0 text-center truncate w-full">
                  PDTE. COTIZAR
                </div>
                <div className="text-sm font-extrabold text-white text-center truncate w-full mb-0">
                  {formatearImporte(estadosData['Pdte. Cotizar']?.importe || 0)} ({estadosData['Pdte. Cotizar']?.centros || 0})
                </div>
                <div className="flex flex-col gap-0 w-full mt-0 px-1">
                  <div className="flex justify-between text-[11px] text-white/90">
                    <span className="font-semibold">P1</span>
                    <span className="font-semibold">
                      {formatearImporte(estadosData['Pdte. Cotizar']?.p1Importe || 0)} ({estadosData['Pdte. Cotizar']?.p1 || 0})
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] text-white/90">
                    <span className="font-semibold">P2</span>
                    <span className="font-semibold">
                      {formatearImporte(estadosData['Pdte. Cotizar']?.p2Importe || 0)} ({estadosData['Pdte. Cotizar']?.p2 || 0})
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Icon 3 */}
            <div className="flex items-center justify-center">
              <span className="text-gray-400 text-lg m-2">→</span>
            </div>

            {/* Card 4: EN SEGUIMIENTO */}
            <div className="rounded-2xl shadow-lg p-2 flex flex-col items-center justify-between h-24" style={{ backgroundColor: '#facc15', border: '4px solid #eab308' }}>
              <div className="flex flex-col items-center w-full">
                <div className="text-sm font-bold uppercase text-white tracking-widest mb-0 text-center truncate w-full">
                  EN SEGUIMIENTO
                </div>
                <div className="text-sm font-extrabold text-white text-center truncate w-full mb-0">
                  {formatearImporte(estadosData['Cotizado']?.importe || 0)} ({estadosData['Cotizado']?.centros || 0})
                </div>
                <div className="flex flex-col gap-0 w-full mt-0 px-1">
                  <div className="flex justify-between text-[11px] text-white/90">
                    <span className="font-semibold">P1</span>
                    <span className="font-semibold">
                      {formatearImporte(estadosData['Cotizado']?.p1Importe || 0)} ({estadosData['Cotizado']?.p1 || 0})
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] text-white/90">
                    <span className="font-semibold">P2</span>
                    <span className="font-semibold">
                      {formatearImporte(estadosData['Cotizado']?.p2Importe || 0)} ({estadosData['Cotizado']?.p2 || 0})
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Icon 4 */}
            <div className="flex items-center justify-center">
              <span className="text-gray-400 text-lg m-2">→</span>
            </div>

            {/* Card 5: ACEPTADO */}
            <div className="rounded-2xl shadow-lg p-2 flex flex-col items-center justify-between h-24" style={{ backgroundColor: '#f472b6', border: '4px solid #ec4899' }}>
              <div className="flex flex-col items-center w-full">
                <div className="text-sm font-bold uppercase text-white tracking-widest mb-0 text-center truncate w-full">
                  ACEPTADO
                </div>
                <div className="text-sm font-extrabold text-white text-center truncate w-full mb-0">
                  {formatearImporte(estadosData['Aceptado']?.importe || 0)} ({estadosData['Aceptado']?.centros || 0})
                </div>
                <div className="flex flex-col gap-0 w-full mt-0 px-1">
                  <div className="flex justify-between text-[11px] text-white/90">
                    <span className="font-semibold">P1</span>
                    <span className="font-semibold">
                      {formatearImporte(estadosData['Aceptado']?.p1Importe || 0)} ({estadosData['Aceptado']?.p1 || 0})
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] text-white/90">
                    <span className="font-semibold">P2</span>
                    <span className="font-semibold">
                      {formatearImporte(estadosData['Aceptado']?.p2Importe || 0)} ({estadosData['Aceptado']?.p2 || 0})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lower section with down arrows and additional cards - Solo visible cuando showMore es true */}
          {showMore && (
            <>
              <div className="grid grid-cols-9 gap-0 mt-1" style={{ gridTemplateColumns: '1fr 16px 1fr 16px 1fr 16px 1fr 16px 1fr' }}>
                {/* Empty div for column 1 */}
                <div></div>
                
                {/* Empty div for column 2 */}
                <div></div>
                
                {/* Down arrow in column 3 */}
                <div className="flex items-center justify-center h-[10px]">
                  <span className="text-gray-400 text-lg m-2">↓</span>
                </div>
                
                {/* Empty div for column 4 */}
                <div></div>
                
                {/* Empty div for column 5 */}
                <div></div>
                
                {/* Empty div for column 6 */}
                <div></div>
                
                {/* Down arrow in column 7 */}
                <div className="flex items-center justify-center h-[10px]">
                  <span className="text-gray-400 text-lg m-2">↓</span>
                </div>
                
                {/* Empty div for column 8 */}
                <div></div>
                
                {/* Empty div for column 9 */}
                <div></div>
              </div>

              {/* Additional cards row */}
              <div className="grid grid-cols-9 gap-0 mt-1" style={{ gridTemplateColumns: '1fr 16px 1fr 16px 1fr 16px 1fr 16px 1fr' }}>
                {/* Empty div for column 1 */}
                <div></div>
                
                {/* Empty div for column 2 */}
                <div></div>
                
                {/* IMPOSIBLE COTIZAR card in column 3 */}
                <div className="rounded-2xl shadow-lg p-2 flex flex-col items-center justify-between h-24" style={{ backgroundColor: '#475569', border: '4px solid #334155' }}>
                  <div className="flex flex-col items-center w-full">
                    <div className="text-sm font-bold uppercase text-white tracking-widest mb-0 text-center truncate w-full">
                      IMPOSIBLE COTIZAR
                    </div>
                    <div className="text-sm font-extrabold text-white text-center truncate w-full mb-0">
                      {formatearImporte(estadosData['Imposible Cotizar']?.importe || 0)} ({estadosData['Imposible Cotizar']?.centros || 0})
                    </div>
                    <div className="flex flex-col gap-0 w-full mt-0 px-1">
                      <div className="flex justify-between text-[11px] text-white/90">
                        <span className="font-semibold">P1</span>
                        <span className="font-semibold">
                          {formatearImporte(estadosData['Imposible Cotizar']?.p1Importe || 0)} ({estadosData['Imposible Cotizar']?.p1 || 0})
                        </span>
                      </div>
                      <div className="flex justify-between text-[11px] text-white/90">
                        <span className="font-semibold">P2</span>
                        <span className="font-semibold">
                          {formatearImporte(estadosData['Imposible Cotizar']?.p2Importe || 0)} ({estadosData['Imposible Cotizar']?.p2 || 0})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Empty div for column 4 */}
                <div></div>
                
                {/* Empty div for column 5 */}
                <div></div>
                
                {/* Empty div for column 6 */}
                <div></div>
                
                {/* DENEGADO card in column 7 */}
                <div className="rounded-2xl shadow-lg p-2 flex flex-col items-center justify-between h-24" style={{ backgroundColor: '#475569', border: '4px solid #334155' }}>
                  <div className="flex flex-col items-center w-full">
                    <div className="text-sm font-bold uppercase text-white tracking-widest mb-0 text-center truncate w-full">
                      DENEGADO
                    </div>
                    <div className="text-sm font-extrabold text-white text-center truncate w-full mb-0">
                      {formatearImporte(estadosData['Denegado']?.importe || 0)} ({estadosData['Denegado']?.centros || 0})
                    </div>
                    <div className="flex flex-col gap-0 w-full mt-0 px-1">
                      <div className="flex justify-between text-[11px] text-white/90">
                        <span className="font-semibold">P1</span>
                        <span className="font-semibold">
                          {formatearImporte(estadosData['Denegado']?.p1Importe || 0)} ({estadosData['Denegado']?.p1 || 0})
                        </span>
                      </div>
                      <div className="flex justify-between text-[11px] text-white/90">
                        <span className="font-semibold">P2</span>
                        <span className="font-semibold">
                          {formatearImporte(estadosData['Denegado']?.p2Importe || 0)} ({estadosData['Denegado']?.p2 || 0})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Empty div for column 8 */}
                <div></div>
                
                {/* Empty div for column 9 */}
                <div></div>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Botón Mostrar Más - Fuera del div del pipeline */}
      <div className="flex justify-end mt-4">
        <button
          onClick={() => setShowMore(!showMore)}
          className="text-gray-400 hover:text-yale-blue transition-colors text-xs font-normal"
        >
          {showMore ? 'Ocultar denegados' : 'Mostrar denegados'}
        </button>
      </div>
    </div>
  )
}

export default SalesPipeline
