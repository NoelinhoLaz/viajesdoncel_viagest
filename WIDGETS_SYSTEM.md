# Sistema de Widgets del Itinerario

## Descripción General

El sistema de widgets permite crear itinerarios interactivos arrastrando y soltando diferentes tipos de contenido en los días del viaje. Cada widget tiene dos vistas: **edición** y **vista previa**.

## Características Principales

### 🎯 Drag & Drop
- **Herramientas arrastrables**: Las herramientas de la columna izquierda se pueden arrastrar a los días
- **Reordenamiento**: Los widgets se pueden reordenar dentro del mismo día
- **Movimiento entre días**: Los widgets se pueden mover de un día a otro

### 👁️ Dos Vistas
- **Modo Edición**: Permite editar, eliminar y reorganizar widgets
- **Modo Vista Previa**: Muestra el itinerario final sin opciones de edición

### 🔧 Widgets Disponibles

#### 1. **Hora Widget**
- **Funcionalidad**: Mostrar horarios específicos del día
- **Campos editables**: Hora, etiqueta descriptiva
- **Vista**: Reloj grande con etiqueta

#### 2. **Título Widget**
- **Funcionalidad**: Encabezados para secciones del día
- **Campos editables**: Texto, tamaño (H1-H6), color
- **Vista**: Título formateado según configuración

#### 3. **Descripción Widget** (Pendiente)
- **Funcionalidad**: Texto descriptivo largo
- **Campos editables**: Contenido, longitud máxima

#### 4. **Cuadrícula Widget** (Pendiente)
- **Funcionalidad**: Organizar contenido en filas y columnas
- **Campos editables**: Número de columnas, filas, elementos

#### 5. **Carrusel Widget** (Pendiente)
- **Funcionalidad**: Galería de imágenes con navegación
- **Campos editables**: Imágenes, autoplay, intervalo

#### 6. **Acordeón Widget** (Pendiente)
- **Funcionalidad**: Contenido expandible/colapsable
- **Campos editables**: Títulos, contenido de cada sección

#### 7. **Mapa Widget** (Pendiente)
- **Funcionalidad**: Ubicaciones geográficas
- **Campos editables**: Dirección, zoom, tipo de mapa

#### 8. **Imagen Widget** (Pendiente)
- **Funcionalidad**: Imágenes con descripción
- **Campos editables**: URL, alt text, caption

#### 9. **Video Widget** (Pendiente)
- **Funcionalidad**: Videos embebidos
- **Campos editables**: URL, título, descripción

## Uso del Sistema

### 1. **Seleccionar Fechas**
- Usar el modal de fechas para definir el rango del viaje
- Los días se generan automáticamente

### 2. **Añadir Widgets**
- **Arrastrar**: Desde la columna izquierda a un día específico
- **Botones rápidos**: Usar los botones "+" en cada día para widgets comunes

### 3. **Editar Widgets**
- Hacer clic en el botón de edición (lápiz)
- Modificar los campos disponibles
- Guardar o cancelar cambios

### 4. **Reorganizar**
- Arrastrar widgets dentro del mismo día para cambiar orden
- Arrastrar entre días para mover contenido

### 5. **Cambiar Vista**
- Botón "Vista previa" para ver el resultado final
- Botón "Editar" para volver al modo de edición

## Estructura Técnica

### Contexto (`ItinerarioContext`)
```javascript
const {
  widgets,           // Lista de todos los widgets
  isEditMode,        // Estado del modo de edición
  addWidget,         // Añadir nuevo widget
  updateWidget,      // Actualizar widget existente
  removeWidget,      // Eliminar widget
  toggleEditMode,    // Cambiar entre modos
  handleDragStart,   // Iniciar drag
  handleDragOver,    // Sobre zona de drop
  handleDrop         // Soltar widget
} = useItinerario()
```

### Estructura de Widget
```javascript
{
  id: "widget-1234567890-abc123",
  type: "hora",                    // Tipo de widget
  dayId: "2024-03-19",            // Día al que pertenece
  order: 0,                        // Orden dentro del día
  content: {                       // Contenido específico del tipo
    time: "09:00",
    label: "Hora de inicio"
  },
  isEditing: false                 // Estado de edición
}
```

## Archivos del Sistema

- `contexts/ItinerarioContext.js` - Estado global y lógica
- `components/widgets/` - Componentes de widgets individuales
- `components/widgets/WidgetContainer.js` - Contenedor con drag & drop
- `components/widgets/DayDropZone.js` - Zona de drop para cada día
- `pages/itinerario.js` - Página principal integrada

## Próximos Pasos

1. **Implementar widgets faltantes** (Descripción, Cuadrícula, etc.)
2. **Añadir validaciones** de contenido
3. **Implementar persistencia** en base de datos
4. **Añadir plantillas** predefinidas
5. **Exportar itinerarios** en diferentes formatos
6. **Compartir itinerarios** entre usuarios

## Notas de Desarrollo

- Los widgets usan Tailwind CSS para estilos
- El sistema es completamente responsive
- Soporte para temas de color personalizables
- Arquitectura modular para fácil extensión
