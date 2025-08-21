import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { createClient } from '@supabase/supabase-js'

// Crear cliente Supabase para acceso público
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// Componente para renderizar widgets en modo público
function PublicWidget({ widget }) {
  switch (widget.type) {
    case 'hora':
      return (
        <div className="flex justify-end mb-4">
          <div className="px-3 py-2 bg-blue-100 border border-blue-200 rounded-md">
            <span className="text-lg font-semibold text-blue-800">
              {widget.content.time}
            </span>
          </div>
        </div>
      )
    
    case 'titulo':
      const getTitleSize = (size) => {
        switch (size) {
          case 'h1': return 'text-4xl'
          case 'h2': return 'text-3xl'
          case 'h3': return 'text-2xl'
          case 'h4': return 'text-xl'
          case 'h5': return 'text-lg'
          case 'h6': return 'text-base'
          default: return 'text-2xl'
        }
      }
      return (
        <div className={`${getTitleSize(widget.content.size)} ${widget.content.color} font-bold mb-4`}>
          {widget.content.text}
        </div>
      )
    
    case 'descripcion':
      return (
        <div className="prose prose-lg max-w-none mb-6">
          <div dangerouslySetInnerHTML={{ __html: widget.content.text }} />
        </div>
      )
    
    case 'columnas':
      return (
        <div className="mb-6">
          <div className={`grid gap-4 ${widget.content.columns.length === 2 ? 'grid-cols-2' : widget.content.columns.length === 3 ? 'grid-cols-3' : 'grid-cols-1'}`}>
            {widget.content.columns.map((column, index) => (
              <div key={column.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="text-sm text-gray-700">
                  {column.type === 'texto' && column.content && (
                    <p className="line-clamp-3">{column.content}</p>
                  )}
                  {column.type === 'imagen' && column.content && (
                    <div className="w-full aspect-video bg-gray-100 rounded overflow-hidden">
                      <img src={column.content} alt="Imagen" className="w-full h-full object-cover" />
                    </div>
                  )}
                  {column.type === 'mapa' && column.content && (
                    <div className="w-full aspect-video bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-gray-500">🗺️ Mapa</span>
                    </div>
                  )}
                  {column.type === 'video' && column.content && (
                    <div className="w-full aspect-video bg-gray-100 rounded flex items-center justify-center">
                      <span className="text-gray-500">🎥 Video</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    
    case 'linea':
      const getLineStyle = () => {
        const { style, color, thickness } = widget.content
        let baseClasses = 'w-full'
        
        switch (style) {
          case 'solid':
            baseClasses += ' border-t'
            break
          case 'dashed':
            baseClasses += ' border-t border-dashed'
            break
          case 'dotted':
            baseClasses += ' border-t border-dotted'
            break
          case 'gradient':
            baseClasses += ' bg-gradient-to-r'
            break
          default:
            baseClasses += ' border-t'
        }
        
        switch (thickness) {
          case 'thin':
            baseClasses += ' border-t'
            break
          case 'medium':
            baseClasses += ' border-t-2'
            break
          case 'thick':
            baseClasses += ' border-t-4'
            break
          default:
            baseClasses += ' border-t'
        }
        
        switch (color) {
          case 'gray':
            baseClasses += ' border-gray-300'
            break
          case 'blue':
            baseClasses += ' border-blue-400'
            break
          case 'green':
            baseClasses += ' border-green-400'
            break
          case 'red':
            baseClasses += ' border-red-400'
            break
          case 'purple':
            baseClasses += ' border-purple-400'
            break
          case 'orange':
            baseClasses += ' border-orange-400'
            break
          default:
            baseClasses += ' border-gray-300'
        }
        
        if (style === 'gradient') {
          baseClasses = baseClasses.replace(/border-t.*?$/, '')
          switch (color) {
            case 'blue':
              baseClasses += ' from-blue-400 to-blue-600'
              break
            case 'green':
              baseClasses += ' from-green-400 to-green-600'
              break
            case 'red':
              baseClasses += ' from-red-400 to-red-600'
              break
            case 'purple':
              baseClasses += ' from-purple-400 to-purple-600'
              break
            case 'orange':
              baseClasses += ' from-orange-400 to-orange-600'
              break
            default:
              baseClasses += ' from-gray-400 to-gray-600'
          }
        }
        
        return baseClasses
      }
      return (
        <div className="my-6">
          <div className={getLineStyle()}>
            {widget.content.style === 'gradient' && (
              <div className={`h-1 ${getLineStyle()}`}></div>
            )}
          </div>
        </div>
      )
    
    default:
      return (
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 text-center text-gray-500 mb-4">
          Widget tipo "{widget.type}" no disponible
        </div>
      )
  }
}

export default function ItinerarioPublico({ itinerario }) {
  const router = useRouter()

  if (router.isFallback) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yale-blue mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando itinerario...</p>
        </div>
      </div>
    )
  }

  if (!itinerario) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Itinerario no encontrado</h1>
          <p className="text-gray-600">El itinerario que buscas no existe o no está disponible públicamente.</p>
        </div>
      </div>
    )
  }

  // Agrupar widgets por día
  const diasAgrupados = itinerario.dias.reduce((acc, dia) => {
    acc[dia.fecha] = {
      ...dia,
      widgets: dia.widgets.sort((a, b) => a.order - b.order)
    }
    return acc
  }, {})

  // Estado para el día seleccionado
  const [selectedDay, setSelectedDay] = useState(Object.keys(diasAgrupados)[0] || null)

  // Función para seleccionar día
  const handleDaySelect = (fecha) => {
    setSelectedDay(fecha)
  }

  return (
    <>
      {/* Menú de días */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2">
            {Object.entries(diasAgrupados).map(([fecha, dia], index) => (
              <button
                key={fecha}
                onClick={() => handleDaySelect(fecha)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedDay === fecha
                    ? 'bg-yale-blue text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="text-center">
                  <div className="font-bold">Día {index + 1}</div>
                  <div className="text-xs opacity-75">
                    {new Date(fecha).toLocaleDateString('es-ES', { 
                      day: '2-digit',
                      month: '2-digit'
                    })}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contenido */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {selectedDay && diasAgrupados[selectedDay] && (() => {
          const dia = diasAgrupados[selectedDay]
          const diaIndex = Object.keys(diasAgrupados).indexOf(selectedDay)
          
          return (
            <div key={selectedDay} className="bg-white rounded-lg shadow-sm border mb-8 overflow-hidden">
              {/* Header del día */}
              <div className="bg-gradient-to-r from-yale-blue to-air-force-blue px-6 py-4">
                <h2 className="text-xl font-bold text-white">
                  {dia.titulo || `Día ${diaIndex + 1}`}
                </h2>
                <p className="text-blue-100 text-sm">
                  {new Date(selectedDay).toLocaleDateString('es-ES', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>

              {/* Widgets del día */}
              <div className="p-6">
                {dia.widgets.length > 0 ? (
                  <div className="space-y-6">
                    {dia.widgets.map((widget) => (
                      <PublicWidget key={widget.id} widget={widget} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No hay contenido programado para este día.</p>
                  </div>
                )}
              </div>
            </div>
          )
        })()}
      </main>
    </>
  )
}

// Usar layout público sin menú principal
ItinerarioPublico.getLayout = function getLayout(page) {
  return page
}

// Generar rutas estáticas
export async function getStaticPaths() {
  const { data: itinerarios } = await supabase
    .from('itinerarios')
    .select('url_publica')
    .eq('publico', true)
    .not('url_publica', 'is', null)

  const paths = itinerarios?.map(it => {
    // Extraer solo la parte final de la URL (después de publico/itinerario/)
    const urlParts = it.url_publica.split('/')
    const finalId = urlParts[urlParts.length - 1]
    
    return {
      params: { id: finalId }
    }
  }) || []

  return {
    paths,
    fallback: 'blocking'
  }
}

// Obtener datos del itinerario
export async function getStaticProps({ params }) {
  try {
    // Buscar itinerarios que contengan el ID en su url_publica
    const { data: itinerarios, error } = await supabase
      .from('itinerarios')
      .select('*')
      .eq('publico', true)
      .like('url_publica', `%${params.id}`)

    if (error || !itinerarios || itinerarios.length === 0) {
      return {
        notFound: true
      }
    }

    // Tomar el primer itinerario que coincida
    const itinerario = itinerarios[0]

    return {
      props: {
        itinerario
      },
      revalidate: 3600 // Revalidar cada hora
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}
