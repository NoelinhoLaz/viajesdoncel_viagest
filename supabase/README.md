# Migraciones de Supabase - Viajes Doncel

Este directorio contiene las migraciones SQL para configurar la base de datos de Supabase con máxima seguridad.

## 📋 Estructura de Archivos

- `001_create_itinerarios_table.sql` - Tabla principal de itinerarios con RLS (versión completa)
- `001_create_itinerarios_table_simple.sql` - Tabla principal de itinerarios con RLS (versión simplificada)
- `002_itinerarios_utilities.sql` - Funciones de utilidad y triggers
- `003_itinerarios_shared_functions.sql` - Funciones para itinerarios compartidos entre usuarios
- `README.md` - Este archivo

## 🚀 Cómo Ejecutar las Migraciones

### Opción 1: Desde el Dashboard de Supabase

1. Ve al [Dashboard de Supabase](https://supabase.com/dashboard)
2. Selecciona tu proyecto
3. Ve a **SQL Editor**
4. Ejecuta cada archivo SQL en orden:
   - Primero `001_create_itinerarios_table_simple.sql` (versión simplificada)
   - Luego `002_itinerarios_utilities.sql`
   - Finalmente `003_itinerarios_shared_functions.sql`

### Opción 2: Usando Supabase CLI

```bash
# Instalar Supabase CLI (si no lo tienes)
npm install -g supabase

# Inicializar Supabase en tu proyecto
supabase init

# Conectar a tu proyecto
supabase link --project-ref TU_PROJECT_REF

# Ejecutar migraciones
supabase db push
```

### Opción 3: Copiar y Pegar

1. Abre cada archivo `.sql`
2. Copia todo el contenido
3. Pégalo en el SQL Editor de Supabase
4. Ejecuta

## 🔒 Características de Seguridad Implementadas

### Row Level Security (RLS)
- ✅ **Activado** en la tabla `itinerarios`
- ✅ **Políticas específicas** para cada operación
- ✅ **Validación de usuario** en todas las consultas

### Políticas de Seguridad
1. **SELECT**: Todos los usuarios registrados pueden ver todos los itinerarios + públicos
2. **INSERT**: Usuarios solo pueden crear sus propios itinerarios
3. **UPDATE**: Usuarios solo pueden modificar sus propios itinerarios
4. **DELETE**: Usuarios solo pueden eliminar sus propios itinerarios (soft delete)

### Funciones de Seguridad
- `soft_delete_itinerario()` - Eliminación segura
- `make_itinerario_public()` - Hacer público con URL única
- `make_itinerario_private()` - Hacer privado
- `restore_itinerario()` - Restaurar eliminados

## 📊 Estructura de la Tabla

```sql
itinerarios (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    titulo TEXT NOT NULL,
    destino TEXT,
    fecha_inicio DATE,
    fecha_fin DATE,
    dias JSONB NOT NULL DEFAULT '[]',
    publico BOOLEAN DEFAULT false,
    url_publica TEXT UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE,
    deleted_at TIMESTAMP WITH TIME ZONE
)
```

## 🔧 Funciones de Utilidad

### Gestión de Itinerarios
- `get_user_itinerario_stats()` - Estadísticas del usuario
- `search_user_itinerarios()` - Búsqueda por texto
- `duplicate_itinerario()` - Duplicar itinerario
- `export_itinerario_json()` - Exportar a JSON
- `import_itinerario_json()` - Importar desde JSON

### Validación y Limpieza
- `validate_itinerario_dates()` - Validar fechas
- `cleanup_deleted_itinerarios()` - Limpiar eliminados antiguos
- `get_itinerarios_by_date_range()` - Filtrar por fechas

## 🎯 Casos de Uso

### Crear Itinerario
```sql
INSERT INTO itinerarios (user_id, titulo, destino, fecha_inicio, fecha_fin, dias)
VALUES (auth.uid(), 'Mi Viaje', 'Barcelona', '2024-06-01', '2024-06-05', '[]'::jsonb);
```

### Hacer Público
```sql
SELECT make_itinerario_public('itinerario-id');
```

### Buscar Itinerarios
```sql
SELECT * FROM search_user_itinerarios('Barcelona');
```

### Obtener Estadísticas
```sql
SELECT * FROM get_user_itinerario_stats();
```

### Obtener Todos los Itinerarios (para usuarios registrados)
```sql
SELECT * FROM get_all_itinerarios_for_registered_users();
```

### Buscar en Todos los Itinerarios
```sql
SELECT * FROM search_all_itinerarios('Barcelona');
```

### Obtener Estadísticas Globales
```sql
SELECT * FROM get_global_itinerario_stats();
```

## 🚨 Consideraciones Importantes

### Variables de Entorno
Asegúrate de tener configuradas estas variables en tu `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
```

### Permisos de Usuario
- Los usuarios deben estar autenticados para acceder a la tabla
- **Todos los usuarios registrados pueden ver todos los itinerarios**
- Solo pueden crear/modificar/eliminar sus propios itinerarios
- Los itinerarios públicos son accesibles sin autenticación

### JSONB Structure
El campo `dias` debe tener esta estructura:

```json
[
  {
    "fecha": "2024-06-01",
    "dia_index": 0,
    "titulo": "Día 1",
    "widgets": [
      {
        "id": "widget-1",
        "type": "hora",
        "content": {"time": "09:00"},
        "order": 1
      }
    ]
  }
]
```

## 🔍 Verificación

Después de ejecutar las migraciones, verifica que:

1. ✅ La tabla `itinerarios` existe
2. ✅ RLS está activado
3. ✅ Las políticas están creadas
4. ✅ Las funciones están disponibles
5. ✅ Los índices están creados

### Comandos de Verificación

```sql
-- Verificar tabla
SELECT * FROM information_schema.tables WHERE table_name = 'itinerarios';

-- Verificar RLS
SELECT schemaname, tablename, rowsecurity FROM pg_tables WHERE tablename = 'itinerarios';

-- Verificar políticas
SELECT * FROM pg_policies WHERE tablename = 'itinerarios';

-- Verificar funciones
SELECT routine_name FROM information_schema.routines WHERE routine_schema = 'public';
```

## 🆘 Solución de Problemas

### Error: "RLS policy violation"
- Verifica que el usuario esté autenticado
- Confirma que las políticas están correctamente aplicadas

### Error: "Function not found"
- Ejecuta nuevamente el archivo de funciones
- Verifica que no haya errores de sintaxis

### Error: "Permission denied"
- Confirma que el usuario tiene permisos en la tabla
- Verifica que las políticas de RLS están activas

## 📞 Soporte

Si encuentras problemas:
1. Revisa los logs de Supabase
2. Verifica la sintaxis SQL
3. Confirma que las migraciones se ejecutaron en orden
4. Contacta al equipo de desarrollo
