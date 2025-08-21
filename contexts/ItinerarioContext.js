import { createContext, useContext, useState, useCallback } from 'react'

const ItinerarioContext = createContext({})

export const useItinerario = () => {
  const context = useContext(ItinerarioContext)
  if (!context) {
    throw new Error('useItinerario debe ser usado dentro de un ItinerarioProvider')
  }
  return context
}

export function ItinerarioProvider({ children }) {
  const [widgets, setWidgets] = useState([])
  const [isEditMode, setIsEditMode] = useState(true)
  const [draggedWidget, setDraggedWidget] = useState(null)

  // Añadir nuevo widget
  const addWidget = useCallback((type, dayId) => {
    const newWidget = {
      id: `widget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      dayId,
      order: widgets.filter(w => w.dayId === dayId).length,
      content: getDefaultContent(type),
      isEditing: true
    }
    
    setWidgets(prev => [...prev, newWidget])
    return newWidget
  }, [widgets])

  // Obtener contenido por defecto según el tipo de widget
  const getDefaultContent = (type) => {
    switch (type) {
                    case 'hora':
                return { time: '09:00', label: 'Hora de inicio' }
      case 'titulo':
        return { text: 'Nuevo título', size: 'h2', color: 'text-gray-900' }
                    case 'descripcion':
                return { 
                  text: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>',
                  style: 'default'
                }
              case 'columnas':
          return { 
            columns: [
              {
                id: Date.now(),
                type: 'texto',
                content: '',
                title: ''
              },
              {
                id: Date.now() + 1,
                type: 'texto',
                content: '',
                title: ''
              }
            ]
          }
      case 'carrusel':
        return { items: [], autoplay: false, interval: 5000 }
      case 'acordeon':
        return { items: [{ title: 'Nuevo elemento', content: 'Contenido...' }] }
      case 'mapa':
        return { location: '', zoom: 12, type: 'roadmap' }
      case 'imagen':
        return { src: '', alt: 'Descripción de la imagen', caption: '' }
      case 'video':
        return { src: '', title: 'Título del video', description: '' }
      default:
        return {}
    }
  }

  // Actualizar widget
  const updateWidget = useCallback((widgetId, updates) => {
    setWidgets(prev => prev.map(widget => 
      widget.id === widgetId ? { ...widget, ...updates } : widget
    ))
  }, [])

  // Eliminar widget
  const removeWidget = useCallback((widgetId) => {
    setWidgets(prev => prev.filter(widget => widget.id !== widgetId))
  }, [])

  // Reordenar widgets
  const reorderWidgets = useCallback((dayId, newOrder) => {
    setWidgets(prev => {
      const dayWidgets = prev.filter(w => w.dayId === dayId)
      const otherWidgets = prev.filter(w => w.dayId !== dayId)
      
      // Reordenar widgets del día
      const reorderedDayWidgets = newOrder.map((widgetId, index) => {
        const widget = dayWidgets.find(w => w.id === widgetId)
        return widget ? { ...widget, order: index } : null
      }).filter(Boolean)
      
      return [...otherWidgets, ...reorderedDayWidgets]
    })
  }, [])

  // Mover widget entre días
  const moveWidgetToDay = useCallback((widgetId, newDayId) => {
    setWidgets(prev => prev.map(widget => 
      widget.id === widgetId 
        ? { ...widget, dayId: newDayId, order: prev.filter(w => w.dayId === newDayId).length }
        : widget
    ))
  }, [])

  // Cambiar modo de vista
  const toggleEditMode = useCallback(() => {
    setIsEditMode(prev => !prev)
  }, [])

  // Drag & Drop handlers
  const handleDragStart = useCallback((widget) => {
    setDraggedWidget(widget)
  }, [])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
  }, [])

  const handleDrop = useCallback((e, targetDayId, targetOrder) => {
    e.preventDefault()
    
    if (draggedWidget) {
      if (draggedWidget.dayId === targetDayId) {
        // Reordenar en el mismo día
        const dayWidgets = widgets.filter(w => w.dayId === targetDayId)
        const newOrder = dayWidgets
          .filter(w => w.id !== draggedWidget.id)
          .map(w => w.id)
        
        // Insertar en la posición correcta
        newOrder.splice(targetOrder, 0, draggedWidget.id)
        reorderWidgets(targetDayId, newOrder)
      } else {
        // Mover a otro día
        moveWidgetToDay(draggedWidget.id, targetDayId)
      }
      
      setDraggedWidget(null)
    }
  }, [draggedWidget, widgets, reorderWidgets, moveWidgetToDay])

  const value = {
    widgets,
    isEditMode,
    draggedWidget,
    addWidget,
    updateWidget,
    removeWidget,
    reorderWidgets,
    moveWidgetToDay,
    toggleEditMode,
    handleDragStart,
    handleDragOver,
    handleDrop
  }

  return (
    <ItinerarioContext.Provider value={value}>
      {children}
    </ItinerarioContext.Provider>
  )
}
