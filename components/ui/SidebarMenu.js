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
  BookOpen as BookOpenIcon, 
  Video,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Globe,
  Bell,
  Palette
} from 'lucide-react'

export default function SidebarMenu({ sidebarCollapsed }) {
  const [expandedSections, setExpandedSections] = useState({
    dashboard: false,
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
    ayuda: false,
    ajustes: false
  })

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const MenuItem = ({ icon: Icon, children, href, className = "" }) => (
    <a 
      href={href} 
      className={`flex items-center px-2 py-1.5 text-blue-100 hover:bg-cambridge-blue hover:text-white rounded-lg transition-all duration-200 text-xs ${className}`}
    >
      <Icon className="w-3 h-3 mr-2" />
      {children}
    </a>
  )

  const MenuSection = ({ title, section, icon: Icon, children }) => (
    <div>
      <button
        onClick={() => toggleSection(section)}
        className="flex items-center justify-between w-full px-2 py-1.5 text-blue-100 hover:text-white transition-colors duration-200 text-xs font-normal uppercase tracking-wider mb-2"
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
    <>
      {/* Menú de navegación organizado por categorías */}
      <nav className={`space-y-4 ${sidebarCollapsed ? 'hidden' : ''}`}>
        {/* Dashboard */}
        <MenuSection title="Dashboard" section="dashboard" icon={Home}>
          <MenuItem icon={Home} href="/">Visión general</MenuItem>
          <MenuItem icon={Zap} href="/accesos-rapidos">Accesos rápidos</MenuItem>
        </MenuSection>

        {/* Clientes */}
        <MenuSection title="Clientes" section="clientes" icon={Users}>
          <MenuItem icon={Users} href="/clientes">Listado clientes</MenuItem>
          <MenuItem icon={FileText} href="/ficha-cliente">Ficha cliente</MenuItem>
          <MenuItem icon={Target} href="/segmentacion">Segmentación</MenuItem>
          <MenuItem icon={RefreshCw} href="/interacciones">Interacciones / Historial</MenuItem>
          <MenuItem icon={CheckSquare} href="/tareas">Tareas / Seguimiento</MenuItem>
        </MenuSection>

        {/* Cotizaciones */}
        <MenuSection title="Cotizaciones" section="cotizaciones" icon={FileText}>
          <MenuItem icon={Plus} href="/nueva-cotizacion">Nueva cotización</MenuItem>
          <MenuItem icon={BookOpen} href="/historial-cotizaciones">Historial de cotizaciones</MenuItem>
          <MenuItem icon={FileSpreadsheet} href="/plantillas">Plantillas</MenuItem>
          <MenuItem icon={Search} href="/reutilizar-cotizacion">Reutilizar cotización</MenuItem>
          <MenuItem icon={Building2} href="/proveedores-acceso">Proveedores (acceso rápido)</MenuItem>
        </MenuSection>

        {/* Reservas */}
        <MenuSection title="Reservas" section="reservas" icon={Calendar}>
          <MenuItem icon={Calendar} href="/nueva-reserva">Nueva reserva</MenuItem>
          <MenuItem icon={ClipboardList} href="/listado-reservas">Listado reservas</MenuItem>
          <MenuItem icon={CalendarDays} href="/calendario">Calendario / Vista calendario</MenuItem>
          <MenuItem icon={BarChart} href="/estados">Estados (pendientes, confirmadas, canceladas)</MenuItem>
          <MenuItem icon={File} href="/documentos">Documentos (contratos / facturas)</MenuItem>
        </MenuSection>

        {/* Grupos */}
        <MenuSection title="Grupos" section="grupos" icon={Users}>
          <MenuItem icon={Users} href="/listado-grupos">Listado grupos</MenuItem>
          <MenuItem icon={Plus} href="/crear-grupo">Crear grupo / Publicar inscripción</MenuItem>
          <MenuItem icon={User} href="/control-inscritos">Control de inscritos (rooming, pagos)</MenuItem>
          <MenuItem icon={Globe} href="/pagina-grupo">Página pública del grupo</MenuItem>
        </MenuSection>

        {/* Operativa / Viajes */}
        <MenuSection title="Operativa / Viajes" section="operativa" icon={Map}>
          <MenuItem icon={Map} href="/itinerarios">Itinerarios</MenuItem>
          <MenuItem icon={Plane} href="/viajes-curso">Viajes en curso</MenuItem>
          <MenuItem icon={MapPin} href="/viajeros-destino">Viajeros en destino</MenuItem>
          <MenuItem icon={AlertTriangle} href="/incidencias">Incidencias</MenuItem>
          <MenuItem icon={Hotel} href="/proveedores-locales">Proveedores locales</MenuItem>
        </MenuSection>

        {/* Proveedores */}
        <MenuSection title="Proveedores" section="proveedores" icon={Building2}>
          <MenuItem icon={Building2} href="/listado-proveedores">Listado proveedores</MenuItem>
          <MenuItem icon={ShoppingBag} href="/servicios">Servicios / Productos</MenuItem>
          <MenuItem icon={DollarSign} href="/tarifas">Tarifas y condiciones</MenuItem>
          <MenuItem icon={FileText} href="/contratos">Contratos con proveedores</MenuItem>
        </MenuSection>

        {/* Documentación */}
        <MenuSection title="Documentación" section="documentacion" icon={FileCheck}>
          <MenuItem icon={FileCheck} href="/documentos-viajar">Documentos por viajar / expiraciones</MenuItem>
          <MenuItem icon={CheckCircle} href="/validador">Validador masivo</MenuItem>
          <MenuItem icon={FileSpreadsheet} href="/plantillas-contrato">Plantillas de contrato</MenuItem>
        </MenuSection>

        {/* Pagos & Finanzas */}
        <MenuSection title="Pagos & Finanzas" section="finanzas" icon={CreditCard}>
          <MenuItem icon={CreditCard} href="/panel-cobros">Panel de cobros</MenuItem>
          <MenuItem icon={Receipt} href="/transacciones">Transacciones</MenuItem>
          <MenuItem icon={Receipt} href="/facturacion">Facturación</MenuItem>
          <MenuItem icon={FileText} href="/politicas-pago">Políticas de pago</MenuItem>
        </MenuSection>

        {/* Marketing */}
        <MenuSection title="Marketing" section="marketing" icon={Megaphone}>
          <MenuItem icon={Megaphone} href="/campanas">Campañas</MenuItem>
          <MenuItem icon={Gift} href="/ofertas">Ofertas y promociones</MenuItem>
          <MenuItem icon={Mail} href="/emails">Emails / Plantillas</MenuItem>
          <MenuItem icon={Target} href="/fidelizacion">Programas de fidelización</MenuItem>
        </MenuSection>

        {/* Informes */}
        <MenuSection title="Informes" section="informes" icon={TrendingUp}>
          <MenuItem icon={TrendingUp} href="/ventas">Ventas</MenuItem>
          <MenuItem icon={BarChart} href="/reservas-informe">Reservas</MenuItem>
          <MenuItem icon={Target} href="/kpis">KPIs</MenuItem>
          <MenuItem icon={PieChart} href="/reportes">Reportes personalizables</MenuItem>
        </MenuSection>

        {/* Usuarios & Admin */}
        <MenuSection title="Usuarios & Admin" section="admin" icon={User}>
          <MenuItem icon={User} href="/usuarios">Usuarios del sistema</MenuItem>
          <MenuItem icon={Shield} href="/roles">Roles y permisos</MenuItem>
          <MenuItem icon={FileEdit} href="/logs">Logs de actividad</MenuItem>
          <MenuItem icon={Settings} href="/configuracion">Configuración global</MenuItem>
        </MenuSection>

        {/* Ayuda / Soporte */}
        <MenuSection title="Ayuda / Soporte" section="ayuda" icon={Ticket}>
          <MenuItem icon={Ticket} href="/tickets">Tickets de soporte</MenuItem>
          <MenuItem icon={BookOpenIcon} href="/base-conocimientos">Base de conocimientos</MenuItem>
          <MenuItem icon={Video} href="/webinars">Webinars / Formación</MenuItem>
        </MenuSection>

        {/* Ajustes */}
        <MenuSection title="Ajustes" section="ajustes" icon={Settings}>
          <MenuItem icon={Settings} href="/perfil">Perfil de usuario</MenuItem>
          <MenuItem icon={Shield} href="/seguridad">Seguridad</MenuItem>
          <MenuItem icon={Bell} href="/notificaciones">Notificaciones</MenuItem>
          <MenuItem icon={Palette} href="/apariencia">Apariencia</MenuItem>
          <MenuItem icon={Globe} href="/idioma">Idioma</MenuItem>
        </MenuSection>
      </nav>

      {/* Menú colapsado - solo iconos */}
      {sidebarCollapsed && (
        <nav className="space-y-2">
          <a href="/" className="flex items-center justify-center w-10 h-10 ml-auto text-blue-100 hover:bg-air-force-blue hover:text-white rounded-lg transition-all duration-200" title="Dashboard">
            <Home className="w-4 h-4" />
          </a>
          <a href="/clientes" className="flex items-center justify-center w-10 h-10 ml-auto text-blue-100 hover:bg-air-force-blue hover:text-white rounded-lg transition-all duration-200" title="Clientes">
            <Users className="w-4 h-4" />
          </a>
          <a href="/cotizaciones" className="flex items-center justify-center w-10 h-10 ml-auto text-blue-100 hover:bg-air-force-blue hover:text-white rounded-lg transition-all duration-200" title="Cotizaciones">
            <FileText className="w-4 h-4" />
          </a>
          <a href="/reservas" className="flex items-center justify-center w-10 h-10 ml-auto text-blue-100 hover:bg-air-force-blue hover:text-white rounded-lg transition-all duration-200" title="Reservas">
            <Calendar className="w-4 h-4" />
          </a>
          <a href="/grupos_listado" className="flex items-center justify-center w-10 h-10 ml-auto text-blue-100 hover:bg-air-force-blue hover:text-white rounded-lg transition-all duration-200" title="Grupos">
            <Users className="w-4 h-4" />
          </a>
          <a href="/operativa" className="flex items-center justify-center w-10 h-10 ml-auto text-blue-100 hover:bg-air-force-blue hover:text-white rounded-lg transition-all duration-200" title="Operativa">
            <Map className="w-4 h-4" />
          </a>
          <a href="/proveedores" className="flex items-center justify-center w-10 h-10 ml-auto text-blue-100 hover:bg-air-force-blue hover:text-white rounded-lg transition-all duration-200" title="Proveedores">
            <Building2 className="w-4 h-4" />
          </a>
          <a href="/documentacion" className="flex items-center justify-center w-10 h-10 ml-auto text-blue-100 hover:bg-air-force-blue hover:text-white rounded-lg transition-all duration-200" title="Documentación">
            <FileCheck className="w-4 h-4" />
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
          <a href="/ayuda" className="flex items-center justify-center w-10 h-10 ml-auto text-blue-100 hover:bg-air-force-blue hover:text-white rounded-lg transition-all duration-200" title="Ayuda">
            <Ticket className="w-4 h-4" />
          </a>
          <a href="/ajustes" className="flex items-center justify-center w-10 h-10 ml-auto text-blue-100 hover:bg-air-force-blue hover:text-white rounded-lg transition-all duration-200" title="Ajustes">
            <Settings className="w-4 h-4" />
          </a>
        </nav>
      )}
    </>
  )
}
