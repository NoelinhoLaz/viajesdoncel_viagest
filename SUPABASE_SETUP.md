# Configuración de Supabase

## Pasos para conectar la aplicación con Supabase

### 1. Obtener credenciales de Supabase

1. Ve a tu [Dashboard de Supabase](https://supabase.com/dashboard)
2. Selecciona tu proyecto
3. Ve a **Settings** → **API**
4. Copia la **URL del proyecto** y la **anon public key**

### 2. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto con:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://ztslribzmpvtnlnwymvq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_aqui
```

### 3. Estructura de archivos creada

```
├── lib/
│   └── supabase.js          # Cliente de Supabase
├── contexts/
│   └── AuthContext.js       # Contexto de autenticación
├── hooks/
│   ├── useAuth.js           # Hook de autenticación
│   └── useProtectedRoute.js # Hook de protección de rutas
├── components/auth/
│   └── ProtectedRoute.js    # Componente de protección
└── config/
    └── supabase.example.js  # Archivo de ejemplo
```

### 4. Funcionalidades implementadas

- ✅ **Autenticación completa** con Supabase
- ✅ **Login/Logout** automático
- ✅ **Protección de rutas** para usuarios autenticados
- ✅ **Manejo de sesiones** persistente
- ✅ **Redirección automática** según estado de auth
- ✅ **Contexto global** para estado de autenticación

### 5. Uso en componentes

#### Para páginas protegidas:
```javascript
import { useProtectedRoute } from '../hooks/useProtectedRoute'

export default function MiPagina() {
  const { user, loading } = useProtectedRoute()
  
  if (loading) return <div>Cargando...</div>
  if (!user) return null // Se redirigirá automáticamente
  
  return <div>Contenido protegido</div>
}
```

#### Para usar autenticación:
```javascript
import { useAuth } from '../contexts/AuthContext'

export default function MiComponente() {
  const { user, signIn, signOut } = useAuth()
  
  return (
    <div>
      {user ? (
        <button onClick={signOut}>Cerrar sesión</button>
      ) : (
        <button onClick={() => signIn('email', 'password')}>Login</button>
      )}
    </div>
  )
}
```

### 6. Próximos pasos

1. **Reemplazar la clave anónima** en `.env.local`
2. **Crear tablas en Supabase** según necesidades
3. **Implementar funciones de base de datos** específicas
4. **Añadir validaciones** adicionales si es necesario

### 7. Comandos útiles

```bash
# Instalar dependencias
npm install @supabase/supabase-js

# Verificar variables de entorno
cat .env.local

# Reiniciar servidor después de cambios
npm run dev
```

### 8. Notas importantes

- Las variables de entorno deben empezar con `NEXT_PUBLIC_` para ser accesibles en el frontend
- La clave anónima es segura para usar en el frontend
- La clave de servicio (service_role) NO debe usarse en el frontend
- Reinicia el servidor después de crear/modificar `.env.local`
