-- Crear tabla de itinerarios con máxima seguridad
CREATE TABLE public.itinerarios (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    titulo TEXT NOT NULL,
    destino TEXT,
    fecha_inicio DATE,
    fecha_fin DATE,
    dias JSONB NOT NULL DEFAULT '[]'::jsonb,
    publico BOOLEAN DEFAULT false,
    url_publica TEXT UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- Crear índices para optimizar consultas
CREATE INDEX idx_itinerarios_user_id ON public.itinerarios(user_id);
CREATE INDEX idx_itinerarios_publico ON public.itinerarios(publico) WHERE publico = true;
CREATE INDEX idx_itinerarios_url_publica ON public.itinerarios(url_publica) WHERE url_publica IS NOT NULL;
CREATE INDEX idx_itinerarios_created_at ON public.itinerarios(created_at);
CREATE INDEX idx_itinerarios_deleted_at ON public.itinerarios(deleted_at) WHERE deleted_at IS NULL;

-- Crear función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Crear trigger para actualizar updated_at
CREATE TRIGGER update_itinerarios_updated_at 
    BEFORE UPDATE ON public.itinerarios 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Crear función para generar URL pública única
CREATE OR REPLACE FUNCTION generate_public_url()
RETURNS TEXT AS $$
DECLARE
    url_suffix TEXT;
    full_url TEXT;
    counter INTEGER := 0;
BEGIN
    LOOP
        -- Generar sufijo aleatorio de 8 caracteres
        url_suffix := substr(md5(random()::text), 1, 8);
        full_url := 'itinerario-' || url_suffix;
        
        -- Verificar si la URL ya existe
        IF NOT EXISTS (SELECT 1 FROM public.itinerarios WHERE url_publica = full_url) THEN
            RETURN full_url;
        END IF;
        
        counter := counter + 1;
        -- Evitar bucle infinito
        IF counter > 100 THEN
            RAISE EXCEPTION 'No se pudo generar una URL única después de 100 intentos';
        END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Habilitar RLS (Row Level Security)
ALTER TABLE public.itinerarios ENABLE ROW LEVEL SECURITY;

-- Política 1: Todos los usuarios registrados pueden ver todos los itinerarios (no eliminados)
CREATE POLICY "Usuarios registrados pueden ver todos los itinerarios" ON public.itinerarios
    FOR SELECT
    USING (
        auth.uid() IS NOT NULL 
        AND deleted_at IS NULL
    );

-- Política 2: Usuarios pueden ver itinerarios públicos (no eliminados)
CREATE POLICY "Cualquiera puede ver itinerarios públicos" ON public.itinerarios
    FOR SELECT
    USING (
        publico = true 
        AND deleted_at IS NULL
    );

-- Política 3: Usuarios pueden crear sus propios itinerarios
CREATE POLICY "Usuarios pueden crear itinerarios" ON public.itinerarios
    FOR INSERT
    WITH CHECK (
        auth.uid() = user_id
    );

-- Política 4: Usuarios pueden actualizar sus propios itinerarios (no eliminados)
CREATE POLICY "Usuarios pueden actualizar sus itinerarios" ON public.itinerarios
    FOR UPDATE
    USING (
        auth.uid() = user_id 
        AND deleted_at IS NULL
    )
    WITH CHECK (
        auth.uid() = user_id
    );

-- Política 5: Usuarios pueden eliminar (soft delete) sus propios itinerarios
CREATE POLICY "Usuarios pueden eliminar sus itinerarios" ON public.itinerarios
    FOR UPDATE
    USING (
        auth.uid() = user_id 
        AND deleted_at IS NULL
    )
    WITH CHECK (
        auth.uid() = user_id
    );

-- Función para soft delete
CREATE OR REPLACE FUNCTION soft_delete_itinerario(itinerario_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE public.itinerarios 
    SET deleted_at = NOW() 
    WHERE id = itinerario_id 
    AND user_id = auth.uid()
    AND deleted_at IS NULL;
    
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para restaurar itinerario eliminado
CREATE OR REPLACE FUNCTION restore_itinerario(itinerario_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE public.itinerarios 
    SET deleted_at = NULL 
    WHERE id = itinerario_id 
    AND user_id = auth.uid()
    AND deleted_at IS NOT NULL;
    
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para hacer público un itinerario
CREATE OR REPLACE FUNCTION make_itinerario_public(itinerario_id UUID)
RETURNS TEXT AS $$
DECLARE
    public_url TEXT;
BEGIN
    -- Generar URL pública única
    public_url := generate_public_url();
    
    UPDATE public.itinerarios 
    SET publico = true, url_publica = public_url
    WHERE id = itinerario_id 
    AND user_id = auth.uid()
    AND deleted_at IS NULL;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Itinerario no encontrado o no tienes permisos';
    END IF;
    
    RETURN public_url;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para hacer privado un itinerario
CREATE OR REPLACE FUNCTION make_itinerario_private(itinerario_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE public.itinerarios 
    SET publico = false, url_publica = NULL
    WHERE id = itinerario_id 
    AND user_id = auth.uid()
    AND deleted_at IS NULL;
    
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Crear vista para itinerarios activos del usuario
CREATE VIEW user_active_itinerarios AS
SELECT 
    id,
    titulo,
    destino,
    fecha_inicio,
    fecha_fin,
    publico,
    url_publica,
    created_at,
    updated_at
FROM public.itinerarios
WHERE user_id = auth.uid() 
AND deleted_at IS NULL
ORDER BY updated_at DESC;

-- Política para la vista
CREATE POLICY "Usuarios pueden ver sus itinerarios activos" ON user_active_itinerarios
    FOR SELECT
    USING (true);

-- Comentarios para documentación
COMMENT ON TABLE public.itinerarios IS 'Tabla principal de itinerarios de viajes';
COMMENT ON COLUMN public.itinerarios.id IS 'Identificador único del itinerario';
COMMENT ON COLUMN public.itinerarios.user_id IS 'ID del usuario propietario del itinerario';
COMMENT ON COLUMN public.itinerarios.titulo IS 'Título del itinerario';
COMMENT ON COLUMN public.itinerarios.destino IS 'Destino del viaje';
COMMENT ON COLUMN public.itinerarios.fecha_inicio IS 'Fecha de inicio del viaje';
COMMENT ON COLUMN public.itinerarios.fecha_fin IS 'Fecha de fin del viaje';
COMMENT ON COLUMN public.itinerarios.dias IS 'JSONB con la estructura de días y widgets del itinerario';
COMMENT ON COLUMN public.itinerarios.publico IS 'Indica si el itinerario es público';
COMMENT ON COLUMN public.itinerarios.url_publica IS 'URL única para acceso público';
COMMENT ON COLUMN public.itinerarios.deleted_at IS 'Fecha de eliminación (soft delete)';
