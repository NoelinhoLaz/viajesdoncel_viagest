import React, { useState } from 'react'
import { 
  Home, 
  Users, 
  FileText, 
  Calendar, 
  Map, 
  Building2, 
  FileCheck, 
  CreditCard, 
  Megaphone, 
  TrendingUp, 
  User, 
  Settings, 
  Ticket,
  ChevronRight,
  ChevronDown,
  MessageCircle,
  Link
} from 'lucide-react'

const UserManual = () => {
  const [selectedSection, setSelectedSection] = useState('dashboard')
  const [expandedSections, setExpandedSections] = useState({
    dashboard: true,
    agenda: false,
    mensajeria: false,
    clientes: false,
    cotizaciones: false,
    reservas: false,
    grupos: false,
    operativa: false,
    proveedores: false,
    documentacion: false,
    finanzas: false,
    marketing: false,
    informes: false,
    admin: false,
    ayuda: false
  })

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const selectSection = (section) => {
    setSelectedSection(section)
  }

  const menuItems = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: Home,
      description: 'Vista general y métricas del sistema',
      content: {
        title: 'Dashboard - Vista General',
        sections: [
          {
            subtitle: '¿Qué es el Dashboard?',
            content: 'El Dashboard es la pantalla principal que te muestra una vista general de toda la actividad de Viajes Doncel. Aquí podrás ver métricas importantes, estadísticas y acceder rápidamente a las funciones más utilizadas.'
          },
          {
            subtitle: 'Métricas Principales',
            content: '• Reservas del día\n• Cotizaciones pendientes\n• Ingresos del mes\n• Clientes activos\n• Próximos viajes'
          },
          {
            subtitle: 'Resumen del Día',
            content: '• Tareas pendientes\n• Avisos importantes\n• KPIs del día\n• Alertas del sistema\n• Recordatorios'
          },
          {
            subtitle: 'Widgets Personalizables',
            content: 'Puedes personalizar tu Dashboard arrastrando y soltando widgets, ocultando los que no uses y agregando nuevos según tus necesidades.'
          }
        ]
      }
    },
    {
      id: 'agenda',
      title: 'Agenda & Tareas',
      icon: Calendar,
      description: 'Gestión de citas, tareas y recordatorios',
      content: {
        title: 'Agenda & Tareas - Organización Completa',
        sections: [
          {
            subtitle: 'Calendario de Citas',
            content: '• Programar citas con clientes\n• Reuniones con proveedores\n• Coordinación de grupos\n• Vista de calendario integrada\n• Recordatorios automáticos'
          },
          {
            subtitle: 'Gestión de Tareas',
            content: '• Tareas asignadas por agente\n• Prioridades y fechas límite\n• Seguimiento del progreso\n• Delegación entre equipos\n• Reportes de productividad'
          },
          {
            subtitle: 'Recordatorios Automáticos',
            content: '• Pagos pendientes de cobro\n• Vencimientos de facturas\n• Salidas de viajeros\n• Documentación próxima a vencer\n• Alertas personalizables'
          },
          {
            subtitle: 'Integración con Sistema',
            content: '• Click directo a reservas\n• Acceso rápido a grupos\n• Navegación a cotizaciones\n• Contexto completo de cada tarea\n• Trazabilidad de acciones'
          }
        ]
      }
    },
    {
      id: 'mensajeria',
      title: 'Mensajería',
      icon: MessageCircle,
      description: 'Comunicación interna y con clientes',
      content: {
        title: 'Sistema de Mensajería Integrado',
        sections: [
          {
            subtitle: 'Chat Cliente ↔ Agente',
            content: '• Conversaciones en tiempo real\n• Historial vinculado a ficha de cliente\n• Contexto completo de la conversación\n• Respuestas automáticas\n• Transferencia entre agentes'
          },
          {
            subtitle: 'Comunicación Interna',
            content: '• Chat entre agentes\n• Mensajería de equipo\n• Notificaciones de sistema\n• Coordinación de tareas\n• Compartir información'
          },
          {
            subtitle: 'Bandeja Unificada',
            content: '• Todas las conversaciones en un lugar\n• Buscador avanzado\n• Filtros por tipo y estado\n• Priorización de mensajes\n• Gestión de colas'
          },
          {
            subtitle: 'Funcionalidades Avanzadas',
            content: '• Adjuntar documentos\n• Enviar cotizaciones\n• Compartir propuestas\n• Notificaciones push\n• Badges de mensajes no leídos'
          }
        ]
      }
    },
    {
      id: 'clientes',
      title: 'Clientes',
      icon: Users,
      description: 'Gestión de clientes y perfiles',
      content: {
        title: 'Gestión de Clientes',
        sections: [
          {
            subtitle: 'Crear Nuevo Cliente',
            content: '1. Haz click en "Nuevo Cliente"\n2. Completa el formulario con los datos básicos\n3. Agrega información de contacto\n4. Selecciona la categoría del cliente\n5. Guarda la información'
          },
          {
            subtitle: 'Gestionar Cliente Existente',
            content: '• Ver historial de reservas\n• Actualizar información de contacto\n• Agregar notas y preferencias\n• Gestionar documentos'
          }
        ]
      }
    },
    {
      id: 'cotizaciones',
      title: 'Cotizaciones',
      icon: FileText,
      description: 'Crear y gestionar cotizaciones',
      content: {
        title: 'Sistema de Cotizaciones',
        sections: [
          {
            subtitle: 'Crear y Editar',
            content: '1. Selecciona el cliente\n2. Define el tipo de viaje\n3. Agrega servicios (hotel, transporte, etc.)\n4. Establece precios y descuentos\n5. Guarda y edita según necesites'
          },
          {
            subtitle: 'Nueva Cotización',
            content: '1. Selecciona el cliente\n2. Define el tipo de viaje\n3. Agrega servicios (hotel, transporte, etc.)\n4. Establece precios y descuentos\n5. Genera la cotización PDF'
          },
          {
            subtitle: 'Generar Propuesta Online',
            content: '1. Crea la cotización base\n2. Activa la opción "Propuesta online"\n3. Personaliza la landing page\n4. Genera el link público\n5. Comparte con el cliente'
          },
          {
            subtitle: 'Seguimiento de Propuestas',
            content: '• Estado de envío\n• Visto por el cliente\n• Abierto y revisado\n• Aceptado o rechazado\n• Conversión a reserva'
          },
          {
            subtitle: 'Plantillas y Reutilización',
            content: '• Usa plantillas predefinidas\n• Reutiliza cotizaciones anteriores\n• Modifica servicios y precios\n• Ahorra tiempo en creación'
          }
        ]
      }
    },
    {
      id: 'reservas',
      title: 'Reservas',
      icon: Calendar,
      description: 'Sistema de reservas y confirmaciones',
      content: {
        title: 'Gestión de Reservas',
        sections: [
          {
            subtitle: 'Crear Reserva',
            content: '1. Desde cotización o nueva reserva\n2. Selecciona fechas y servicios\n3. Confirma disponibilidad\n4. Gestiona pagos\n5. Emite confirmación'
          },
          {
            subtitle: 'Modificaciones',
            content: '• Cambiar fechas\n• Agregar/quitar servicios\n• Modificar participantes\n• Cancelaciones'
          }
        ]
      }
    },
    {
      id: 'grupos',
      title: 'Grupos',
      icon: Users,
      description: 'Gestión de viajes grupales',
      content: {
        title: 'Viajes Grupales',
        sections: [
          {
            subtitle: 'Crear Grupo',
            content: '1. Define el tipo de grupo\n2. Establece fechas y destino\n3. Agrega participantes\n4. Gestiona pagos grupales\n5. Coordina logística'
          }
        ]
      }
    },
    {
      id: 'operativa',
      title: 'Operativa',
      icon: Map,
      description: 'Logística e itinerarios',
      content: {
        title: 'Operativa y Logística',
        sections: [
          {
            subtitle: 'Crear Itinerario',
            content: '1. Planifica día a día\n2. Agrega servicios incluidos\n3. Coordina con proveedores\n4. Gestiona tiempos y traslados'
          }
        ]
      }
    },
    {
      id: 'proveedores',
      title: 'Proveedores',
      icon: Building2,
      description: 'Gestión de hoteles, transportes, guías',
      content: {
        title: 'Gestión de Proveedores',
        sections: [
          {
            subtitle: 'Alta de Proveedor',
            content: '1. Datos de la empresa\n2. Servicios que ofrece\n3. Condiciones comerciales\n4. Documentación legal\n5. Evaluación inicial'
          }
        ]
      }
    },
    {
      id: 'documentacion',
      title: 'Documentación',
      icon: FileCheck,
      description: 'Contratos, facturas y documentos legales',
      content: {
        title: 'Documentación Legal',
        sections: [
          {
            subtitle: 'Generar Contrato',
            content: '1. Selecciona el tipo de contrato\n2. Completa datos del cliente\n3. Define términos y condiciones\n4. Genera PDF\n5. Firma digital'
          }
        ]
      }
    },
    {
      id: 'finanzas',
      title: 'Finanzas',
      icon: CreditCard,
      description: 'Facturación, pagos y reportes financieros',
      content: {
        title: 'Gestión Financiera',
        sections: [
          {
            subtitle: 'Generar Factura',
            content: '1. Selecciona la reserva\n2. Verifica servicios incluidos\n3. Aplica impuestos\n4. Genera factura PDF\n5. Envía al cliente'
          }
        ]
      }
    },
    {
      id: 'marketing',
      title: 'Marketing',
      icon: Megaphone,
      description: 'Campañas, promociones y redes sociales',
      content: {
        title: 'Marketing y Promociones',
        sections: [
          {
            subtitle: 'Crear Campaña',
            content: '1. Define el objetivo\n2. Selecciona público objetivo\n3. Crea contenido\n4. Programa envío\n5. Analiza resultados'
          }
        ]
      }
    },
    {
      id: 'informes',
      title: 'Informes',
      icon: TrendingUp,
      description: 'Reportes y análisis de datos',
      content: {
        title: 'Reportes y Análisis',
        sections: [
          {
            subtitle: 'Generar Informe',
            content: '1. Selecciona tipo de reporte\n2. Define filtros y fechas\n3. Agrega métricas\n4. Genera gráficos\n5. Exporta en diferentes formatos'
          }
        ]
      }
    },
    {
      id: 'admin',
      title: 'Admin',
      icon: User,
      description: 'Usuarios, roles y configuración del sistema',
      content: {
        title: 'Administración del Sistema',
        sections: [
          {
            subtitle: 'Gestionar Usuarios',
            content: '1. Crear nuevos usuarios\n2. Asignar roles y permisos\n3. Configurar accesos\n4. Monitorear actividad\n5. Gestionar contraseñas'
          }
        ]
      }
    },
    {
      id: 'ayuda',
      title: 'Ayuda y Soporte',
      icon: Ticket,
      description: 'Soporte técnico y base de conocimientos',
      content: {
        title: 'Ayuda y Soporte',
        sections: [
          {
            subtitle: 'Crear Ticket',
            content: '1. Describe el problema\n2. Selecciona categoría\n3. Adjunta capturas si es necesario\n4. Envía ticket\n5. Recibe seguimiento por email'
          }
        ]
      }
    }
  ]

  const selectedContent = menuItems.find(item => item.id === selectedSection)?.content

  return (
    <div className="flex h-full bg-gray-50">
      {/* Columna Izquierda - Navegación */}
      <div className="w-96 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-yale-blue mb-4 font-raleway">Navegación del Manual</h2>
          
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isExpanded = expandedSections[item.id]
              const isSelected = selectedSection === item.id
              
              return (
                <div key={item.id}>
                  <button
                    onClick={() => {
                      toggleSection(item.id)
                      selectSection(item.id)
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-lg transition-all duration-200 text-left ${
                      isSelected 
                        ? 'bg-yale-blue text-white' 
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-yale-blue'}`} />
                      <div>
                        <div className={`font-medium ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                          {item.title}
                        </div>
                        <div className={`text-xs ${isSelected ? 'text-blue-100' : 'text-gray-500'}`}>
                          {item.description}
                        </div>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronDown className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-gray-500'}`} />
                    ) : (
                      <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-gray-500'}`} />
                    )}
                  </button>
                  

                </div>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Columna Derecha - Contenido */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          {selectedContent ? (
            <div>
              <h1 className="text-3xl font-bold text-yale-blue mb-6 font-raleway">
                {selectedContent.title}
              </h1>
              
              <div className="space-y-6">
                {selectedContent.sections.map((section, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-xl font-semibold text-yale-blue mb-3 font-raleway">
                      {section.subtitle}
                    </h3>
                    <div className="text-gray-700 leading-relaxed font-inter whitespace-pre-line">
                      {section.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-20">
              <h2 className="text-2xl font-semibold mb-2">Selecciona una opción</h2>
              <p>Elige una sección del menú izquierdo para ver su operativa detallada</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserManual
