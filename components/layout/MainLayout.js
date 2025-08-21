import React, { useState } from 'react'
import { 
  Home, 
  Zap, 
  Users, 
  FileText, 
  Target, 
  RefreshCw, 
  CheckSquare, 
  Plus, 
  BookOpen, 
  FileSpreadsheet, 
  Search, 
  Building2,
  Calendar, 
  ClipboardList, 
  CalendarDays, 
  BarChart, 
  File, 
  Map, 
  Plane, 
  MapPin, 
  AlertTriangle, 
  Hotel, 
  ShoppingBag, 
  DollarSign, 
  FileCheck, 
  CheckCircle, 
  CreditCard, 
  Receipt, 
  Megaphone, 
  Gift, 
  Mail, 
  TrendingUp, 
  PieChart, 
  User, 
  Shield, 
  FileEdit, 
  Settings, 
  Ticket, 
  Video,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Globe,
  Bell,
  Palette,
  LogOut,
  Link,
  MessageCircle,
  Inbox,
  Paperclip,
  PanelLeftClose,
  UserPlus,
  Activity
} from 'lucide-react'

export default function MainLayout({ children }) {
  const [expandedSections, setExpandedSections] = useState({
    dashboard: false,
    agenda: false,
    mensajeria: false,
    contactos: false,
    clientes: false,
    viajeros: false,
    oportunidades: false,
    presupuestos: false,
    reservas: false,
    operativa: false,
    proveedores: false,
    finanzas: false,
    marketing: false,
    informes: false,
    admin: false
  })
  
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [userMenuExpanded, setUserMenuExpanded] = useState(false)

  const toggleSection = (section) => {
    setExpandedSections(prev => {
      // Si la sección ya está expandida, la colapsamos
      if (prev[section]) {
        return {
          ...prev,
          [section]: false
        }
      }
      // Si se está expandiendo, colapsamos todas las demás
      const newState = {}
      Object.keys(prev).forEach(key => {
        newState[key] = key === section
      })
      return newState
    })
  }

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const toggleUserMenu = () => {
    setUserMenuExpanded(!userMenuExpanded)
  }

  const MenuItem = ({ icon: Icon, children, href, className = "" }) => (
    <a 
      href={href} 
      className={`flex items-center px-2 py-1.5 text-blue-100 hover:bg-cambridge-blue hover:text-white rounded-lg transition-all duration-200 text-xs font-inter ${className}`}
    >
      <Icon className="w-3 h-3 mr-2" />
      {children}
    </a>
  )

  const MenuSection = ({ title, section, icon: Icon, children }) => (
    <div>
      <button
        onClick={() => toggleSection(section)}
        className="flex items-center justify-between w-full px-2 py-1.5 text-blue-100 hover:text-white transition-colors duration-200 text-xs font-normal uppercase tracking-wider mb-2 font-raleway"
      >
        <div className="flex items-center">
          <Icon className="w-3 h-3 mr-2" />
          {title}
        </div>
        {expandedSections[section] ? (
          <ChevronDown className="w-3 h-3" />
        ) : (
          <ChevronRight className="w-3 h-3" />
        )}
      </button>
      
      {expandedSections[section] && (
        <div className="space-y-0.5 ml-3">
          {children}
        </div>
      )}
    </div>
  )

  return (
    <div className="flex h-screen bg-content-bg">
      {/* Sidebar izquierdo - 240px fijo con Yale Blue original */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-60'} bg-yale-blue shadow-xl overflow-y-auto transition-all duration-300 relative`}>
        <div className="p-4">
          {/* Logo de la aplicación */}
          <div className={`flex mb-8 justify-center`}>
            <img 
              src={sidebarCollapsed 
                ? "https://cnffwrprgtbwofmxinmr.supabase.co/storage/v1/object/public/corporativa/logo_vertical.png"
                : "https://cnffwrprgtbwofmxinmr.supabase.co/storage/v1/object/public/corporativa/logoDoncel.png"
              }
              alt="Logo Doncel" 
              className={`${sidebarCollapsed ? 'w-8 h-8' : 'w-40'} object-contain`}
            />
          </div>
          
          {/* Menú de navegación organizado por categorías */}
          <nav className={`space-y-4 ${sidebarCollapsed ? 'hidden' : ''}`}>
            {/* Inicio */}
            <MenuSection title="Inicio" section="dashboard" icon={Home}>
              <MenuItem icon={Home} href="/">Resumen</MenuItem>
              <MenuItem icon={BarChart} href="/hoy">Hoy</MenuItem>
            </MenuSection>

            {/* Agenda */}
            <MenuSection title="Agenda" section="agenda" icon={Calendar}>
              <MenuItem icon={Calendar} href="/calendario">Calendario</MenuItem>
              <MenuItem icon={CheckSquare} href="/tareas">Tareas</MenuItem>
            </MenuSection>

            {/* Chat */}
            <MenuSection title="Chat" section="mensajeria" icon={MessageCircle}>
              <MenuItem icon={MessageCircle} href="/conversaciones">Conversaciones</MenuItem>
            </MenuSection>

            {/* Contactos */}
            <MenuSection title="Contactos" section="contactos" icon={UserPlus}>
              <MenuItem icon={UserPlus} href="/contactos">Listado completo</MenuItem>
              <MenuItem icon={Target} href="/segmentacion">Segmentación</MenuItem>
              <MenuItem icon={RefreshCw} href="/interacciones">Interacciones</MenuItem>
            </MenuSection>

            {/* Clientes */}
            <MenuSection title="Clientes" section="clientes" icon={CreditCard}>
              <MenuItem icon={CreditCard} href="/clientes">Listado</MenuItem>
              <MenuItem icon={Target} href="/segmentos">Segmentos</MenuItem>
              <MenuItem icon={RefreshCw} href="/historial">Historial</MenuItem>
              <MenuItem icon={DollarSign} href="/pagos">Pagos</MenuItem>
            </MenuSection>

            {/* Oportunidades */}
            <MenuSection title="Oportunidades" section="oportunidades" icon={Target}>
              <MenuItem icon={User} href="/oportunidades/particulares">Particulares</MenuItem>
              <MenuItem icon={Users} href="/grupos">Grupos</MenuItem>
              <MenuItem icon={Users} href="/oportunidades/familias">Familias</MenuItem>
            </MenuSection>

            {/* Presupuestos */}
            <MenuSection title="Presupuestos" section="presupuestos" icon={FileText}>
              <MenuItem icon={Plus} href="/presupuesto">Nuevo Presupuesto</MenuItem>
              <MenuItem icon={FileText} href="/presupuestos">Listado</MenuItem>
              <MenuItem icon={FileSpreadsheet} href="/cotizaciones">Cotizaciones</MenuItem>
              <MenuItem icon={Map} href="/itinerarios">Itinerarios</MenuItem>
              <MenuItem icon={FileSpreadsheet} href="/plantillas">Plantillas</MenuItem>
              <MenuItem icon={Globe} href="/propuestas-online">Propuestas online</MenuItem>
            </MenuSection>

            {/* Reservas */}
            <MenuSection title="Reservas" section="reservas" icon={Calendar}>
              <MenuItem icon={Calendar} href="/reservas">Listado</MenuItem>
              <MenuItem icon={CalendarDays} href="/calendario">Calendario</MenuItem>
              <MenuItem icon={BarChart} href="/estados">Estados</MenuItem>
            </MenuSection>

            {/* Viajes */}
            <MenuSection title="Viajes" section="operativa" icon={Map}>
              <MenuItem icon={Plane} href="/en-curso">En curso</MenuItem>
              <MenuItem icon={AlertTriangle} href="/incidencias">Incidencias</MenuItem>
              <MenuItem icon={Users} href="/viajeros">Viajeros</MenuItem>
              <MenuItem icon={Users} href="/grupos_listado">Grupos</MenuItem>
              <MenuItem icon={MapPin} href="/destinos">Destinos</MenuItem>
              <MenuItem icon={FileCheck} href="/documentos">Documentos</MenuItem>
            </MenuSection>

            {/* Proveedores */}
            <MenuSection title="Proveedores" section="proveedores" icon={Building2}>
              <MenuItem icon={Building2} href="/proveedores">Listado</MenuItem>
              <MenuItem icon={ShoppingBag} href="/servicios">Servicios</MenuItem>
              <MenuItem icon={FileText} href="/contratos">Contratos</MenuItem>
            </MenuSection>

            {/* Finanzas */}
            <MenuSection title="Finanzas" section="finanzas" icon={CreditCard}>
              <MenuItem icon={CreditCard} href="/cobros">Cobros</MenuItem>
              <MenuItem icon={Receipt} href="/transacciones">Transacciones</MenuItem>
              <MenuItem icon={Receipt} href="/facturas">Facturas</MenuItem>
            </MenuSection>

            {/* Marketing */}
            <MenuSection title="Marketing" section="marketing" icon={Megaphone}>
              <MenuItem icon={Megaphone} href="/campanas">Campañas</MenuItem>
              <MenuItem icon={Gift} href="/ofertas">Ofertas</MenuItem>
              <MenuItem icon={Mail} href="/emails">Emails</MenuItem>
            </MenuSection>

            {/* Reportes */}
            <MenuSection title="Reportes" section="informes" icon={TrendingUp}>
              <MenuItem icon={TrendingUp} href="/ventas">Ventas</MenuItem>
              <MenuItem icon={BarChart} href="/reservas">Reservas</MenuItem>
              <MenuItem icon={Target} href="/kpis">KPIs</MenuItem>
            </MenuSection>

            {/* Ajustes */}
            <MenuSection title="Ajustes" section="admin" icon={Settings}>
              <MenuItem icon={User} href="/usuarios">Usuarios</MenuItem>
              <MenuItem icon={Settings} href="/configuracion">Configuración</MenuItem>
              <MenuItem icon={Ticket} href="/soporte">Soporte</MenuItem>
            </MenuSection>




          </nav>

          {/* Card de usuario expandible - debajo de todas las opciones */}
          {!sidebarCollapsed ? (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-1 mb-6 border border-white/20 mt-6">
              <button 
                onClick={toggleUserMenu}
                className="w-full flex items-center space-x-3 hover:bg-white/5 rounded-lg p-2 transition-colors"
              >
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full flex items-center justify-center text-yale-blue font-normal text-sm shadow-lg">
                    NL
                  </div>
                  {/* Badge de notificaciones */}
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center border-2 border-yale-blue">
                    <span className="text-white text-xs font-normal">3</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <h3 className="text-white font-normal text-sm truncate font-inter">Noel Lazúen</h3>
                  <p className="text-blue-100 text-xs truncate font-inter">noel@gmail.com</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-blue-100 transition-transform ${userMenuExpanded ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Menú expandido del usuario */}
              {userMenuExpanded && (
                <div className="mt-3 space-y-1">
                  <a href="/perfil" className="flex items-center space-x-2 px-2 py-2 text-blue-100 hover:bg-white/10 rounded-lg transition-colors text-xs font-inter">
                    <User className="w-3 h-3" />
                    <span>Mi Perfil</span>
                  </a>
                  <a href="/configuracion" className="flex items-center space-x-2 px-2 py-2 text-blue-100 hover:bg-white/10 rounded-lg transition-colors text-xs font-inter">
                    <Settings className="w-3 h-3" />
                    <span>Configuración</span>
                  </a>
                  <a href="/seleccion-curso" className="flex items-center space-x-2 px-2 py-2 text-blue-100 hover:bg-white/10 rounded-lg transition-colors text-xs font-inter">
                    <BookOpen className="w-3 h-3" />
                    <span>Selección de Curso</span>
                  </a>
                  <div className="border-t border-white/20 my-2"></div>
                  <button className="w-full flex items-center space-x-2 px-2 py-2 text-red-300 hover:bg-red-500/20 rounded-lg transition-colors text-xs font-inter">
                    <LogOut className="w-3 h-3" />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              )}
            </div>
          ) : null}

          {/* Botón para colapsar/expandir el sidebar */}
          <div className="flex justify-end mb-4">
            <button
              onClick={toggleSidebar}
              className="text-blue-200 hover:text-blue-100 transition-colors duration-200 p-2 rounded-lg hover:bg-white/10"
              title={sidebarCollapsed ? 'Expandir menú' : 'Colapsar menú'}
            >
              <PanelLeftClose className="w-5 h-5" />
            </button>
          </div>

          {/* Menú colapsado - solo iconos */}
          {sidebarCollapsed && (
            <nav className="space-y-1">
              <a href="/" className="flex items-center justify-center w-10 h-10 ml-auto text-blue-100 hover:bg-air-force-blue hover:text-white rounded-lg transition-all duration-200" title="Dashboard">
                <Home className="w-4 h-4" />
              </a>
              <a href="/agenda" className="flex items-center justify-center w-10 h-10 ml-auto text-blue-100 hover:bg-air-force-blue hover:text-white rounded-lg transition-all duration-200" title="Agenda & Tareas">
                <Calendar className="w-4 h-4" />
              </a>
              <a href="/mensajeria" className="flex items-center justify-center w-10 h-10 ml-auto text-blue-100 hover:bg-air-force-blue hover:text-white rounded-lg transition-all duration-200" title="Mensajería">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="/contactos" className="flex items-center justify-center w-10 h-10 ml-auto text-blue-100 hover:bg-air-force-blue hover:text-white rounded-lg transition-all duration-200" title="Contactos">
                <UserPlus className="w-4 h-4" />
              </a>
              <a href="/clientes" className="flex items-center justify-center w-10 h-10 ml-auto text-blue-100 hover:bg-air-force-blue hover:text-white rounded-lg transition-all duration-200" title="Clientes">
                <CreditCard className="w-4 h-4" />
              </a>
              <a href="/viajeros" className="flex items-center justify-center w-10 h-10 ml-auto text-blue-100 hover:bg-air-force-blue hover:text-white rounded-lg transition-all duration-200" title="Viajeros">
                <Users className="w-4 h-4" />
              </a>
              <a href="/presupuestos" className="flex items-center justify-center w-10 h-10 ml-auto text-blue-100 hover:bg-air-force-blue hover:text-white rounded-lg transition-all duration-200" title="Presupuestos">
                <FileText className="w-4 h-4" />
              </a>
              <a href="/reservas" className="flex items-center justify-center w-10 h-10 ml-auto text-blue-100 hover:bg-air-force-blue hover:text-white rounded-lg transition-all duration-200" title="Reservas">
                <Calendar className="w-4 h-4" />
              </a>
                          <a href="/grupos" className="flex items-center justify-center w-10 h-10 ml-auto text-blue-100 hover:bg-air-force-blue hover:text-white rounded-lg transition-all duration-200" title="Grupos">
              <Users className="w-4 h-4" />
            </a>
              <a href="/operativa" className="flex items-center justify-center w-10 h-10 ml-auto text-blue-100 hover:bg-air-force-blue hover:text-white rounded-lg transition-all duration-200" title="Operativa">
                <Map className="w-4 h-4" />
              </a>
              <a href="/proveedores" className="flex items-center justify-center w-10 h-10 ml-auto text-blue-100 hover:bg-air-force-blue hover:text-white rounded-lg transition-all duration-200" title="Proveedores">
                <Building2 className="w-4 h-4" />
              </a>
              <a href="/finanzas" className="flex items-center justify-center w-10 h-10 ml-auto text-blue-100 hover:bg-air-force-blue hover:text-white rounded-lg transition-all duration-200" title="Finanzas">
                <CreditCard className="w-4 h-4" />
              </a>
              <a href="/marketing" className="flex items-center justify-center w-10 h-10 ml-auto text-blue-100 hover:bg-air-force-blue hover:text-white rounded-lg transition-all duration-200" title="Marketing">
                <Megaphone className="w-4 h-4" />
              </a>
              <a href="/informes" className="flex items-center justify-center w-10 h-10 ml-auto text-blue-100 hover:bg-air-force-blue hover:text-white rounded-lg transition-all duration-200" title="Informes">
                <TrendingUp className="w-4 h-4" />
              </a>
              <a href="/admin" className="flex items-center justify-center w-10 h-10 ml-auto text-blue-100 hover:bg-air-force-blue hover:text-white rounded-lg transition-all duration-200" title="Admin">
                <User className="w-4 h-4" />
              </a>


          </nav>
          )}

          {/* Avatar colapsado - debajo de las opciones del menú colapsado */}
          {sidebarCollapsed && (
            <div className="flex justify-center mt-6">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full flex items-center justify-center text-yale-blue font-normal text-sm shadow-lg">
                  NL
                </div>
                {/* Badge de notificaciones */}
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center border-2 border-yale-blue">
                  <span className="text-white text-xs font-normal">3</span>
                </div>
              </div>
            </div>
          )}

          {/* Botón para colapsar/expandir el sidebar - también visible cuando está colapsado */}
          {sidebarCollapsed && (
            <div className="flex justify-center mt-4">
              <button
                onClick={toggleSidebar}
                className="text-blue-200 hover:text-blue-100 transition-colors duration-200 p-2 rounded-lg hover:bg-white/10"
                title="Expandir menú"
              >
                <PanelLeftClose className="w-5 h-5" />
              </button>
            </div>
          )}
          

        </div>
      </div>

      {/* Contenido principal - resto del ancho */}
      <div className="flex-1 overflow-auto">
        <div className="pt-0 px-8 pb-8">
          {children}
        </div>
      </div>
    </div>
  )
}
