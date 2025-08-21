import React, { useState } from 'react'
import { ArrowLeft, Save, Plus, Trash2, Calendar, Users, MapPin, DollarSign, FileText, Globe, Building2, User, Mail, Phone, Clock, CheckCircle, Type, AlignLeft, Image, List, Quote, ArrowLeftRight, Grid3X3, Map, Euro, Bus, ChevronDown, Video, Menu, Gift, Eye, Edit } from 'lucide-react'
import Select from 'react-select'

export default function Presupuesto() {
  const [formData, setFormData] = useState({})

  return (
    <div className="min-h-screen bg-content-bg">
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center mb-6">
              <div>
            <h1 className="text-3xl font-bold text-gray-900">PRESUPUESTO</h1>
            </div>
            <div className="flex space-x-3">
            <button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium flex items-center">
              <Eye size={16} className="mr-2" />
              Vista previa
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center">
              <Edit size={16} className="mr-2" />
              Editar
            </button>
            <button className="bg-yale-blue text-white px-6 py-2 rounded-lg hover:bg-air-force-blue transition-colors text-sm font-medium flex items-center">
                <Save size={16} className="mr-2" />
              Guardar
              </button>
            </div>
          </div>

        {/* Opciones de seleccionar */}
        <div className="grid grid-cols-4 gap-4 w-full max-w-4xl">
          <button className="flex flex-col items-center py-3 px-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-yale-blue hover:bg-blue-50 transition-colors group">
            <User size={20} className="mb-2 text-gray-600 group-hover:text-yale-blue transition-colors" />
            <span className="text-xs font-medium text-gray-700 text-center">Seleccionar Cliente</span>
          </button>
          <button className="flex flex-col items-center py-3 px-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-yale-blue hover:bg-blue-50 transition-colors group">
            <MapPin size={20} className="mb-2 text-gray-600 group-hover:text-yale-blue transition-colors" />
            <span className="text-xs font-medium text-gray-700 text-center">Seleccionar Destino</span>
          </button>
          <button className="flex flex-col items-center py-3 px-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-yale-blue hover:bg-blue-50 transition-colors group">
            <Calendar size={20} className="mb-2 text-gray-600 group-hover:text-yale-blue transition-colors" />
            <span className="text-xs font-medium text-gray-700 text-center">Seleccionar Fechas</span>
          </button>
          <button className="flex flex-col items-center py-3 px-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-yale-blue hover:bg-blue-50 transition-colors group">
            <Euro size={20} className="mb-2 text-gray-600 group-hover:text-yale-blue transition-colors" />
            <span className="text-xs font-medium text-gray-700 text-center">Seleccionar Cotización</span>
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="py-6">
        <div className="grid grid-cols-12 gap-6 w-full">
          {/* Columna izquierda */}
          <div className="col-span-3 bg-white-custom p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Herramientas de Creación</h2>
            
            <div className="grid grid-cols-3 gap-3">
              {/* Menú */}
              <button className="flex flex-col items-center py-3 px-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-yale-blue hover:bg-blue-50 transition-colors group">
                <Menu size={20} className="mb-2 text-gray-600 group-hover:text-yale-blue transition-colors" />
                <span className="text-xs font-medium text-gray-700 text-center">Menú</span>
              </button>

              {/* Título */}
              <button className="flex flex-col items-center py-3 px-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-yale-blue hover:bg-blue-50 transition-colors group">
                <Type size={20} className="mb-2 text-gray-600 group-hover:text-yale-blue transition-colors" />
                <span className="text-xs font-medium text-gray-700 text-center">Título</span>
              </button>

              {/* Texto */}
              <button className="flex flex-col items-center py-3 px-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-yale-blue hover:bg-blue-50 transition-colors group">
                <AlignLeft size={20} className="mb-2 text-gray-600 group-hover:text-yale-blue transition-colors" />
                <span className="text-xs font-medium text-gray-700 text-center">Texto</span>
              </button>

              {/* Acordeón */}
              <button className="flex flex-col items-center py-3 px-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-yale-blue hover:bg-blue-50 transition-colors group">
                <ChevronDown size={20} className="mb-2 text-gray-600 group-hover:text-yale-blue transition-colors" />
                <span className="text-xs font-medium text-gray-700 text-center">Acordeón</span>
              </button>

              {/* Imagen */}
              <button className="flex flex-col items-center py-3 px-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-yale-blue hover:bg-blue-50 transition-colors group">
                <Image size={20} className="mb-2 text-gray-600 group-hover:text-yale-blue transition-colors" />
                <span className="text-xs font-medium text-gray-700 text-center">Imagen</span>
              </button>

              {/* Video */}
              <button className="flex flex-col items-center py-3 px-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-yale-blue hover:bg-blue-50 transition-colors group">
                <Video size={20} className="mb-2 text-gray-600 group-hover:text-yale-blue transition-colors" />
                <span className="text-xs font-medium text-gray-700 text-center">Video</span>
              </button>

              {/* Listado */}
              <button className="flex flex-col items-center py-3 px-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-yale-blue hover:bg-blue-50 transition-colors group">
                <List size={20} className="mb-2 text-gray-600 group-hover:text-yale-blue transition-colors" />
                <span className="text-xs font-medium text-gray-700 text-center">Listado</span>
              </button>

              {/* Cita */}
              <button className="flex flex-col items-center py-3 px-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-yale-blue hover:bg-blue-50 transition-colors group">
                <Quote size={20} className="mb-2 text-gray-600 group-hover:text-yale-blue transition-colors" />
                <span className="text-xs font-medium text-gray-700 text-center">Cita</span>
              </button>

              {/* Carrusel */}
              <button className="flex flex-col items-center py-3 px-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-yale-blue hover:bg-blue-50 transition-colors group">
                <ArrowLeftRight size={20} className="mb-2 text-gray-600 group-hover:text-yale-blue transition-colors" />
                <span className="text-xs font-medium text-gray-700 text-center">Carrusel</span>
              </button>

              {/* Cuadrícula */}
              <button className="flex flex-col items-center py-3 px-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-yale-blue hover:bg-blue-50 transition-colors group">
                <Grid3X3 size={20} className="mb-2 text-gray-600 group-hover:text-yale-blue transition-colors" />
                <span className="text-xs font-medium text-gray-700 text-center">Cuadrícula</span>
              </button>

              {/* Itinerario */}
              <button className="flex flex-col items-center py-3 px-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-yale-blue hover:bg-blue-50 transition-colors group">
                <Map size={20} className="mb-2 text-gray-600 group-hover:text-yale-blue transition-colors" />
                <span className="text-xs font-medium text-gray-700 text-center">Itinerario</span>
              </button>

              {/* Alojamiento */}
              <button className="flex flex-col items-center py-3 px-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-yale-blue hover:bg-blue-50 transition-colors group">
                <Building2 size={20} className="mb-2 text-gray-600 group-hover:text-yale-blue transition-colors" />
                <span className="text-xs font-medium text-gray-700 text-center">Alojamiento</span>
              </button>

              {/* Transporte */}
              <button className="flex flex-col items-center py-3 px-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-yale-blue hover:bg-blue-50 transition-colors group">
                <Bus size={20} className="mb-2 text-gray-600 group-hover:text-yale-blue transition-colors" />
                <span className="text-xs font-medium text-gray-700 text-center">Transporte</span>
              </button>

              {/* Extras */}
              <button className="flex flex-col items-center py-3 px-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-yale-blue hover:bg-blue-50 transition-colors group">
                <Gift size={20} className="mb-2 text-gray-600 group-hover:text-yale-blue transition-colors" />
                <span className="text-xs font-medium text-gray-700 text-center">Extras</span>
                </button>

              {/* Precio */}
              <button className="flex flex-col items-center py-3 px-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-yale-blue hover:bg-blue-50 transition-colors group">
                <Euro size={20} className="mb-2 text-gray-600 group-hover:text-yale-blue transition-colors" />
                <span className="text-xs font-medium text-gray-700 text-center">Precio</span>
                        </button>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Instrucciones</h3>
              <p className="text-xs text-gray-600">
                Haz clic en cualquier herramienta para añadir contenido a tu presupuesto. 
                Arrastra y suelta para reorganizar los elementos.
              </p>
            </div>
          </div>

          {/* Columna derecha */}
          <div className="col-span-9 bg-white-custom p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Área de Trabajo</h2>
            <p className="text-gray-600">Aquí aparecerá el contenido del presupuesto...</p>
          </div>
        </div>
      </div>
    </div>
  )
}
