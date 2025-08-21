# FechasModal Component

Un componente modal reutilizable para selección de fechas de salida y regreso.

## Características

- ✅ **Reutilizable**: Puede usarse en cualquier página
- ✅ **UX optimizada**: Enfoque automático y sugerencias inteligentes
- ✅ **Validación automática**: Previene fechas inválidas
- ✅ **Responsive**: Se adapta a diferentes tamaños de pantalla
- ✅ **Accesible**: Navegación por teclado y screen readers

## Uso Básico

```jsx
import FechasModal from '../components/ui/FechasModal'

function MiPagina() {
  const [showModal, setShowModal] = useState(false)
  const [fechas, setFechas] = useState({
    fechaSalida: '',
    fechaRegreso: ''
  })

  const handleFechasSave = ({ fechaSalida, fechaRegreso }) => {
    setFechas({ fechaSalida, fechaRegreso })
    setShowModal(false)
  }

  return (
    <div>
      <button onClick={() => setShowModal(true)}>
        Seleccionar Fechas
      </button>

      <FechasModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleFechasSave}
        fechaInicio={fechas.fechaSalida}
        fechaFin={fechas.fechaRegreso}
      />
    </div>
  )
}
```

## Props

| Prop | Tipo | Requerido | Descripción |
|------|------|------------|-------------|
| `isOpen` | boolean | ✅ | Controla la visibilidad del modal |
| `onClose` | function | ✅ | Función llamada al cerrar el modal |
| `onSave` | function | ✅ | Función llamada al guardar las fechas |
| `fechaInicio` | string | ❌ | Fecha de salida inicial (formato YYYY-MM-DD) |
| `fechaFin` | string | ❌ | Fecha de regreso inicial (formato YYYY-MM-DD) |
| `title` | string | ❌ | Título personalizable del modal (default: "Seleccionar Fechas") |

## Funcionalidades UX

### Enfoque Automático
- Al seleccionar la fecha de salida, el campo de fecha de regreso se enfoca automáticamente
- Mejora la fluidez de la interacción

### Sugerencias Inteligentes
- Si no hay fecha de regreso, sugiere la misma fecha de salida
- Si se selecciona la misma fecha, automáticamente sugiere el día siguiente
- Previene errores comunes

### Validación Automática
- No permite fechas pasadas
- Fecha de regreso debe ser posterior a fecha de salida
- Limpia fechas inválidas automáticamente

## Ejemplos de Uso

### Uso Básico con Estado Local

```jsx
import React, { useState } from 'react'
import FechasModal from '../components/ui/FechasModal'

export default function EjemploBasico() {
  const [showModal, setShowModal] = useState(false)
  const [fechas, setFechas] = useState({
    fechaSalida: '',
    fechaRegreso: ''
  })

  const handleFechasSave = ({ fechaSalida, fechaRegreso }) => {
    setFechas({ fechaSalida, fechaRegreso })
    setShowModal(false)
    console.log('Fechas seleccionadas:', { fechaSalida, fechaRegreso })
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Seleccionar Fechas</h1>
      
      <button
        onClick={() => setShowModal(true)}
        className="bg-yale-blue text-white px-4 py-2 rounded-lg hover:bg-air-force-blue transition-colors"
      >
        Seleccionar Fechas
      </button>

      {fechas.fechaSalida && fechas.fechaRegreso && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold">Fechas seleccionadas:</h3>
          <p>Salida: {fechas.fechaSalida}</p>
          <p>Regreso: {fechas.fechaRegreso}</p>
        </div>
      )}

      <FechasModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleFechasSave}
        fechaInicio={fechas.fechaSalida}
        fechaFin={fechas.fechaRegreso}
        title="Seleccionar Fechas de Viaje"
      />
    </div>
  )
}
```

### Integración en Formulario

```jsx
import React, { useState } from 'react'
import FechasModal from '../components/ui/FechasModal'

export default function FormularioReserva() {
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    fechaSalida: '',
    fechaRegreso: ''
  })

  const handleFechasSave = ({ fechaSalida, fechaRegreso }) => {
    setFormData(prev => ({
      ...prev,
      fechaSalida,
      fechaRegreso
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Formulario enviado:', formData)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre
        </label>
        <input
          type="text"
          value={formData.nombre}
          onChange={(e) => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Fechas del viaje
        </label>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-left"
        >
          {formData.fechaSalida && formData.fechaRegreso 
            ? `${formData.fechaSalida} - ${formData.fechaRegreso}`
            : 'Seleccionar fechas'
          }
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-yale-blue text-white px-4 py-2 rounded-lg"
      >
        Enviar
      </button>

      <FechasModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleFechasSave}
        fechaInicio={formData.fechaSalida}
        fechaFin={formData.fechaRegreso}
      />
    </form>
  )
}
```

### Uso con Fechas Predefinidas

```jsx
import React, { useState } from 'react'
import FechasModal from '../components/ui/FechasModal'

export default function FechasPredefinidas() {
  const [showModal, setShowModal] = useState(false)
  
  // Fechas predefinidas (ejemplo: próximas vacaciones)
  const fechasIniciales = {
    fechaSalida: '2024-07-15',
    fechaRegreso: '2024-07-22'
  }

  const handleFechasSave = ({ fechaSalida, fechaRegreso }) => {
    console.log('Fechas actualizadas:', { fechaSalida, fechaRegreso })
    setShowModal(false)
  }

  return (
    <div>
      <button onClick={() => setShowModal(true)}>
        Modificar Fechas
      </button>

      <FechasModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleFechasSave}
        fechaInicio={fechasIniciales.fechaSalida}
        fechaFin={fechasIniciales.fechaRegreso}
        title="Modificar Fechas de Vacaciones"
      />
    </div>
  )
}
```

## Validaciones Incluidas

### Validaciones Automáticas
- ✅ **Fecha mínima**: No permite fechas pasadas
- ✅ **Relación entre fechas**: Regreso debe ser posterior a salida
- ✅ **Campos requeridos**: Ambas fechas son obligatorias
- ✅ **Formato de fecha**: Acepta formato YYYY-MM-DD

### Mensajes de Error
- "Por favor, selecciona ambas fechas"
- "La fecha de regreso debe ser posterior a la fecha de salida"

## Estilos

El componente usa Tailwind CSS y las siguientes clases personalizadas:

- `yale-blue`: Color principal de la marca
- `air-force-blue`: Color de hover
- `white-custom`: Fondo blanco personalizado

## Dependencias

- React 16.8+ (para hooks)
- Tailwind CSS
- Lucide React (para iconos)

## Compatibilidad

- ✅ Chrome/Edge (últimas versiones)
- ✅ Firefox (últimas versiones)
- ✅ Safari (últimas versiones)
- ✅ Dispositivos móviles
- ✅ Screen readers

## Funcionalidades Avanzadas

### Cálculo de Duración
```jsx
const calcularDuracion = (fechaSalida, fechaRegreso) => {
  if (fechaSalida && fechaRegreso) {
    const inicio = new Date(fechaSalida)
    const fin = new Date(fechaRegreso)
    const diferencia = fin - inicio
    return Math.ceil(diferencia / (1000 * 60 * 60 * 24))
  }
  return 0
}
```

### Formateo de Fechas
```jsx
const formatearFecha = (fecha) => {
  return new Date(fecha).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
```
