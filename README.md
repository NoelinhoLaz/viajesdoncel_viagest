# 🚀 Viajes Doncel - Sistema de Gestión de Viajes

## 📋 Descripción

**Viajes Doncel** es una aplicación web completa desarrollada en Next.js para la gestión integral de viajes, presupuestos e itinerarios. La aplicación incluye un sistema de widgets personalizables, integración con Supabase para la base de datos, y funcionalidades avanzadas de gestión de clientes y grupos.

## ✨ Características Principales

### 🎯 **Gestión de Itinerarios**
- **Sistema de Widgets**: Hora, Título, Descripción, Columnas, Línea Horizontal
- **Editor WYSIWYG**: Para descripciones ricas con React Quill
- **Vista Previa**: Generación de URLs públicas para compartir
- **Organización por Días**: Gestión temporal de actividades

### 💰 **Sistema de Presupuestos**
- **Herramientas de Creación**: Texto, imagen, video, mapa, acordeón
- **Plantillas Personalizables**: Estructura flexible para cotizaciones
- **Gestión de Clientes**: Sistema completo de clientes y grupos

### 👥 **Gestión de Grupos**
- **Tablero de Control**: Dashboard personalizable con widgets
- **Pipeline de Ventas**: Seguimiento de oportunidades comerciales
- **Estadísticas Avanzadas**: Métricas y reportes en tiempo real

### 🔐 **Autenticación y Seguridad**
- **Supabase Auth**: Sistema de autenticación robusto
- **RLS (Row Level Security)**: Políticas de seguridad a nivel de fila
- **Rutas Protegidas**: Control de acceso basado en roles

## 🛠️ Tecnologías Utilizadas

### **Frontend**
- **Next.js 14**: Framework de React con SSR y SSG
- **Tailwind CSS**: Framework de CSS utilitario
- **React Hooks**: Estado y efectos del lado del cliente
- **Lucide React**: Iconografía moderna y consistente

### **Backend**
- **Supabase**: Backend-as-a-Service con PostgreSQL
- **PostgreSQL**: Base de datos relacional robusta
- **JSONB**: Almacenamiento flexible de datos de itinerarios
- **SQL Functions**: Funciones personalizadas para lógica de negocio

### **Herramientas de Desarrollo**
- **ESLint**: Linting de código JavaScript
- **PostCSS**: Procesamiento de CSS
- **Autoprefixer**: Compatibilidad entre navegadores

## 🚀 Instalación y Configuración

### **Prerrequisitos**
- Node.js 18+ 
- npm o yarn
- Cuenta de Supabase

### **1. Clonar el Repositorio**
```bash
git clone https://github.com/noellazueng/viajesdoncel_viagest.git
cd viajesdoncel_viagest
```

### **2. Instalar Dependencias**
```bash
npm install
```

### **3. Configurar Variables de Entorno**
Crea un archivo `.env.local` en la raíz del proyecto:
```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
```

### **4. Configurar Supabase**
Ejecuta las migraciones en orden:
```bash
# 1. Tabla principal de itinerarios
psql -h tu_host -U tu_usuario -d tu_base -f supabase/migrations/001_create_itinerarios_table_simple.sql

# 2. Funciones de utilidad
psql -h tu_host -U tu_usuario -d tu_base -f supabase/migrations/002_itinerarios_utilities.sql

# 3. Funciones compartidas y vistas
psql -h tu_host -U tu_usuario -d tu_base -f supabase/migrations/003_itinerarios_shared_functions.sql

# 4. Verificación de políticas RLS
psql -h tu_host -U tu_usuario -d tu_base -f supabase/migrations/004_verify_rls_policies.sql
```

### **5. Ejecutar la Aplicación**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
viajesdoncel_viagest/
├── components/           # Componentes reutilizables
│   ├── auth/            # Componentes de autenticación
│   ├── dashboard/       # Widgets del dashboard
│   ├── layout/          # Layouts de la aplicación
│   ├── ui/              # Componentes de interfaz
│   └── widgets/         # Widgets del sistema de itinerarios
├── contexts/            # Contextos de React
├── hooks/               # Hooks personalizados
├── lib/                 # Librerías y utilidades
│   └── supabase/        # Cliente y funciones de Supabase
├── pages/               # Páginas de Next.js
│   └── publico/         # Páginas públicas de itinerarios
├── styles/              # Estilos globales
├── supabase/            # Migraciones y configuración de BD
└── utils/               # Funciones utilitarias
```

## 🔧 Configuración de Supabase

### **Tabla Principal: `itinerarios`**
- **id**: UUID único del itinerario
- **user_id**: ID del usuario propietario
- **titulo**: Título del itinerario
- **destino**: Destino del viaje
- **fecha_inicio/fecha_fin**: Rango de fechas
- **dias**: JSONB con estructura de días y widgets
- **publico**: Boolean para itinerarios públicos
- **url_publica**: URL única para acceso público

### **Políticas RLS**
- **SELECT**: Usuarios registrados pueden ver todos los itinerarios
- **INSERT**: Usuarios pueden crear sus propios itinerarios
- **UPDATE**: Usuarios pueden actualizar sus itinerarios
- **DELETE**: Usuarios pueden eliminar sus itinerarios

## 📱 Funcionalidades del Sistema de Widgets

### **Widgets Disponibles**
1. **HoraWidget**: Indicador de tiempo con formato personalizable
2. **TituloWidget**: Títulos con diferentes niveles (H1-H6)
3. **DescripcionWidget**: Editor WYSIWYG para contenido rico
4. **ColumnasWidget**: Sistema de columnas (2-3) con contenido mixto
5. **LineaWidget**: Separadores horizontales con estilos

### **Sistema de Edición**
- **Modo Edición**: Interfaz completa para configurar widgets
- **Modo Vista**: Visualización limpia del contenido
- **Acciones**: Editar, mover y eliminar widgets
- **Responsive**: Adaptación automática a diferentes dispositivos

## 🌐 Páginas Públicas

### **URLs Públicas**
- **Formato**: `/publico/itinerario/itinerario-{id}`
- **Acceso**: Sin autenticación requerida
- **Contenido**: Solo el itinerario específico
- **Navegación**: Menú de días integrado

### **Características**
- **Sin Menú Principal**: Interfaz limpia y enfocada
- **Menú de Días**: Navegación entre días del viaje
- **Responsive**: Optimizado para móviles y tablets
- **SEO**: URLs amigables y metadatos optimizados

## 🔒 Seguridad

### **Autenticación**
- **Supabase Auth**: Sistema robusto de autenticación
- **JWT Tokens**: Manejo seguro de sesiones
- **Protección de Rutas**: Middleware de autenticación

### **Base de Datos**
- **RLS Activado**: Políticas de seguridad a nivel de fila
- **Validación**: Triggers para validar datos
- **Soft Delete**: Eliminación lógica con recuperación

## 📊 Dashboard y Analytics

### **Widgets del Dashboard**
- **Métricas**: Tarjetas con KPIs principales
- **Gráficos**: Visualizaciones de ventas y rendimiento
- **Listas**: Clientes, tareas y actividades
- **Agenda**: Calendario de eventos y reuniones

### **Pipeline de Ventas**
- **Fases**: Seguimiento de oportunidades
- **Estados**: Indicadores de progreso
- **Métricas**: Conversión y rendimiento

## 🚀 Despliegue

### **Vercel (Recomendado)**
```bash
npm install -g vercel
vercel
```

### **Netlify**
```bash
npm run build
# Subir la carpeta .next a Netlify
```

### **Docker**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contribución

### **Flujo de Trabajo**
1. Fork del repositorio
2. Crear rama feature: `git checkout -b feature/nueva-funcionalidad`
3. Commit de cambios: `git commit -m 'Añadir nueva funcionalidad'`
4. Push a la rama: `git push origin feature/nueva-funcionalidad`
5. Crear Pull Request

### **Estándares de Código**
- **ESLint**: Configuración estricta de JavaScript
- **Prettier**: Formateo automático de código
- **Conventional Commits**: Formato estándar de commits

## 📝 Licencia

Este proyecto es propiedad de **Viajes Doncel** y está destinado para uso interno y comercial.

## 📞 Soporte

Para soporte técnico o consultas sobre el proyecto:
- **Email**: soporte@viajesdoncel.com
- **Documentación**: [Wiki del proyecto](link-al-wiki)
- **Issues**: [GitHub Issues](link-a-issues)

---

**Desarrollado con ❤️ para Viajes Doncel**
