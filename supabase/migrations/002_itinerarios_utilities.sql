-- Funciones de utilidad para itinerarios

-- Función para obtener estadísticas de itinerarios del usuario
CREATE OR REPLACE FUNCTION get_user_itinerario_stats()
RETURNS TABLE(
    total_itinerarios BIGINT,
    itinerarios_publicos BIGINT,
    itinerarios_privados BIGINT,
    itinerarios_eliminados BIGINT,
    ultimo_creado TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*) FILTER (WHERE deleted_at IS NULL) as total_itinerarios,
        COUNT(*) FILTER (WHERE publico = true AND deleted_at IS NULL) as itinerarios_publicos,
        COUNT(*) FILTER (WHERE publico = false AND deleted_at IS NULL) as itinerarios_privados,
        COUNT(*) FILTER (WHERE deleted_at IS NOT NULL) as itinerarios_eliminados,
        MAX(created_at) FILTER (WHERE deleted_at IS NULL) as ultimo_creado
    FROM public.itinerarios
    WHERE user_id = auth.uid();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para buscar itinerarios por texto
CREATE OR REPLACE FUNCTION search_user_itinerarios(search_term TEXT)
RETURNS TABLE(
    id UUID,
    titulo TEXT,
    destino TEXT,
    fecha_inicio DATE,
    fecha_fin DATE,
    publico BOOLEAN,
    url_publica TEXT,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE,
    relevance_score REAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        i.id,
        i.titulo,
        i.destino,
        i.fecha_inicio,
        i.fecha_fin,
        i.publico,
        i.url_publica,
        i.created_at,
        i.updated_at,
        CASE 
            WHEN i.titulo ILIKE '%' || search_term || '%' THEN 3.0
            WHEN i.destino ILIKE '%' || search_term || '%' THEN 2.0
            WHEN i.dias::text ILIKE '%' || search_term || '%' THEN 1.0
            ELSE 0.0
        END as relevance_score
    FROM public.itinerarios i
    WHERE i.user_id = auth.uid()
    AND i.deleted_at IS NULL
    AND (
        i.titulo ILIKE '%' || search_term || '%'
        OR i.destino ILIKE '%' || search_term || '%'
        OR i.dias::text ILIKE '%' || search_term || '%'
    )
    ORDER BY relevance_score DESC, i.updated_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para duplicar un itinerario
CREATE OR REPLACE FUNCTION duplicate_itinerario(itinerario_id UUID)
RETURNS UUID AS $$
DECLARE
    new_id UUID;
    original_itinerario RECORD;
BEGIN
    -- Obtener el itinerario original
    SELECT * INTO original_itinerario
    FROM public.itinerarios
    WHERE id = itinerario_id 
    AND user_id = auth.uid()
    AND deleted_at IS NULL;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Itinerario no encontrado o no tienes permisos';
    END IF;
    
    -- Crear copia
    INSERT INTO public.itinerarios (
        user_id,
        titulo,
        destino,
        fecha_inicio,
        fecha_fin,
        dias,
        publico
    ) VALUES (
        auth.uid(),
        original_itinerario.titulo || ' (Copia)',
        original_itinerario.destino,
        original_itinerario.fecha_inicio,
        original_itinerario.fecha_fin,
        original_itinerario.dias,
        false
    ) RETURNING id INTO new_id;
    
    RETURN new_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para exportar itinerario a JSON
CREATE OR REPLACE FUNCTION export_itinerario_json(itinerario_id UUID)
RETURNS JSON AS $$
DECLARE
    itinerario_data JSON;
BEGIN
    SELECT json_build_object(
        'id', id,
        'titulo', titulo,
        'destino', destino,
        'fecha_inicio', fecha_inicio,
        'fecha_fin', fecha_fin,
        'dias', dias,
        'publico', publico,
        'created_at', created_at,
        'updated_at', updated_at
    ) INTO itinerario_data
    FROM public.itinerarios
    WHERE id = itinerario_id 
    AND user_id = auth.uid()
    AND deleted_at IS NULL;
    
    IF itinerario_data IS NULL THEN
        RAISE EXCEPTION 'Itinerario no encontrado o no tienes permisos';
    END IF;
    
    RETURN itinerario_data;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para importar itinerario desde JSON
CREATE OR REPLACE FUNCTION import_itinerario_json(itinerario_json JSON)
RETURNS UUID AS $$
DECLARE
    new_id UUID;
BEGIN
    INSERT INTO public.itinerarios (
        user_id,
        titulo,
        destino,
        fecha_inicio,
        fecha_fin,
        dias,
        publico
    ) VALUES (
        auth.uid(),
        COALESCE(itinerario_json->>'titulo', 'Itinerario Importado'),
        itinerario_json->>'destino',
        (itinerario_json->>'fecha_inicio')::DATE,
        (itinerario_json->>'fecha_fin')::DATE,
        COALESCE(itinerario_json->'dias', '[]'::jsonb),
        COALESCE((itinerario_json->>'publico')::BOOLEAN, false)
    ) RETURNING id INTO new_id;
    
    RETURN new_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para limpiar itinerarios eliminados antiguos (más de 30 días)
CREATE OR REPLACE FUNCTION cleanup_deleted_itinerarios()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM public.itinerarios
    WHERE deleted_at IS NOT NULL
    AND deleted_at < NOW() - INTERVAL '30 days';
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para obtener itinerarios por rango de fechas
CREATE OR REPLACE FUNCTION get_itinerarios_by_date_range(
    start_date DATE,
    end_date DATE
)
RETURNS TABLE(
    id UUID,
    titulo TEXT,
    destino TEXT,
    fecha_inicio DATE,
    fecha_fin DATE,
    publico BOOLEAN,
    url_publica TEXT,
    created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        i.id,
        i.titulo,
        i.destino,
        i.fecha_inicio,
        i.fecha_fin,
        i.publico,
        i.url_publica,
        i.created_at
    FROM public.itinerarios i
    WHERE i.user_id = auth.uid()
    AND i.deleted_at IS NULL
    AND (
        (i.fecha_inicio BETWEEN start_date AND end_date)
        OR (i.fecha_fin BETWEEN start_date AND end_date)
        OR (i.fecha_inicio <= start_date AND i.fecha_fin >= end_date)
    )
    ORDER BY i.fecha_inicio ASC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para validar fechas del itinerario
CREATE OR REPLACE FUNCTION validate_itinerario_dates()
RETURNS TRIGGER AS $$
BEGIN
    -- Validar que fecha_fin no sea anterior a fecha_inicio
    IF NEW.fecha_inicio IS NOT NULL AND NEW.fecha_fin IS NOT NULL THEN
        IF NEW.fecha_fin < NEW.fecha_inicio THEN
            RAISE EXCEPTION 'La fecha de fin no puede ser anterior a la fecha de inicio';
        END IF;
    END IF;
    
    -- Validar que las fechas no sean en el pasado (opcional)
    IF NEW.fecha_inicio IS NOT NULL AND NEW.fecha_inicio < CURRENT_DATE THEN
        RAISE WARNING 'La fecha de inicio está en el pasado';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear trigger para validación de fechas
CREATE TRIGGER validate_itinerario_dates_trigger
    BEFORE INSERT OR UPDATE ON public.itinerarios
    FOR EACH ROW
    EXECUTE FUNCTION validate_itinerario_dates();

-- Función para obtener itinerarios públicos recientes (para página de inicio)
CREATE OR REPLACE FUNCTION get_recent_public_itinerarios(limit_count INTEGER DEFAULT 10)
RETURNS TABLE(
    id UUID,
    titulo TEXT,
    destino TEXT,
    fecha_inicio DATE,
    fecha_fin DATE,
    url_publica TEXT,
    created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        i.id,
        i.titulo,
        i.destino,
        i.fecha_inicio,
        i.fecha_fin,
        i.url_publica,
        i.created_at
    FROM public.itinerarios i
    WHERE i.publico = true
    AND i.deleted_at IS NULL
    ORDER BY i.created_at DESC
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
