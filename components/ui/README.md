# DestinoModal Component

Un componente modal reutilizable para selección de destinos de viaje.

## Características

- ✅ **Reutilizable**: Puede usarse en cualquier página
- ✅ **Personalizable**: Título y datos configurables
- ✅ **Responsive**: Se adapta a diferentes tamaños de pantalla
- ✅ **Accesible**: Navegación por teclado y screen readers
- ✅ **Optimizado**: Alto mínimo para mostrar más destinos

## Uso Básico

```jsx
import DestinoModal from '../components/ui/DestinoModal'
import { destinos } from '../data/destinos'

function MiPagina() {
  const [showModal, setShowModal] = useState(false)
  const [destinoSeleccionado, setDestinoSeleccionado] = useState(null)

  const handleDestinoSelect = (destino) => {
    setDestinoSeleccionado(destino)
    setShowModal(false)
  }

  return (
    <div>
      <button onClick={() => setShowModal(true)}>
        Seleccionar Destino
      </button>

      <DestinoModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSelect={handleDestinoSelect}
        destinos={destinos}
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
| `onSelect` | function | ✅ | Función llamada al seleccionar un destino |
| `destinos` | array | ✅ | Array de destinos a mostrar |
| `title` | string | ❌ | Título personalizable del modal (default: "Seleccionar Destino") |

## Estructura de Datos

Cada destino debe tener esta estructura:

```javascript
{
  id: 'identificador-unico',
  titulo: 'Nombre del Destino',
  ciudades: 'Ciudad1, Ciudad2, Ciudad3',
  descripcion: 'Descripción detallada del destino...'
}
```

## Datos Compartidos

Los destinos están disponibles en `data/destinos.js`:

```javascript
import { destinos, getDestinoById, filtrarDestinos } from '../data/destinos'

// Obtener todos los destinos
const todosLosDestinos = destinos

// Buscar por ID
const destino = getDestinoById('dali')

// Filtrar por texto
const resultados = filtrarDestinos('andalucía')
```

## Personalización

### Título Personalizado

```jsx
<DestinoModal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  onSelect={handleDestinoSelect}
  destinos={destinos}
  title="Elegir Destino de Vacaciones"
/>
```

### Destinos Filtrados

```jsx
const destinosFiltrados = destinos.filter(destino => 
  destino.titulo.includes('España')
)

<DestinoModal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  onSelect={handleDestinoSelect}
  destinos={destinosFiltrados}
  title="Destinos en España"
/>
```

## Estilos

El componente usa Tailwind CSS y las siguientes clases personalizadas:

- `yale-blue`: Color principal de la marca
- `air-force-blue`: Color de hover
- `white-custom`: Fondo blanco personalizado

## Ejemplos de Uso

Ver `components/examples/ModalUsageExample.js` para ejemplos completos:

- Uso básico del modal
- Modal con filtros personalizados
- Manejo de estado y selección

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
