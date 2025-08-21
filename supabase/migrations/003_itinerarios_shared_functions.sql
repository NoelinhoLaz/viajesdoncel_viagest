-- Funciones para itinerarios compartidos entre usuarios registrados

-- Función para obtener todos los itinerarios de todos los usuarios (para usuarios registrados)
CREATE OR REPLACE FUNCTION get_all_itinerarios_for_registered_users()
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
    owner_name TEXT,
    is_owner BOOLEAN
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
        COALESCE(u.raw_user_meta_data->>'full_name', u.email) as owner_name,
        (i.user_id = auth.uid()) as is_owner
    FROM public.itinerarios i
    LEFT JOIN auth.users u ON i.user_id = u.id
    WHERE i.deleted_at IS NULL
    AND auth.uid() IS NOT NULL
    ORDER BY i.updated_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para buscar itinerarios de todos los usuarios
CREATE OR REPLACE FUNCTION search_all_itinerarios(search_term TEXT)
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
    owner_name TEXT,
    is_owner BOOLEAN,
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
        COALESCE(u.raw_user_meta_data->>'full_name', u.email) as owner_name,
        (i.user_id = auth.uid()) as is_owner,
        CASE 
            WHEN i.titulo ILIKE '%' || search_term || '%' THEN 3.0
            WHEN i.destino ILIKE '%' || search_term || '%' THEN 2.0
            WHEN i.dias::text ILIKE '%' || search_term || '%' THEN 1.0
            ELSE 0.0
        END as relevance_score
    FROM public.itinerarios i
    LEFT JOIN auth.users u ON i.user_id = u.id
    WHERE i.deleted_at IS NULL
    AND auth.uid() IS NOT NULL
    AND (
        i.titulo ILIKE '%' || search_term || '%'
        OR i.destino ILIKE '%' || search_term || '%'
        OR i.dias::text ILIKE '%' || search_term || '%'
    )
    ORDER BY relevance_score DESC, i.updated_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para obtener itinerarios por usuario específico
CREATE OR REPLACE FUNCTION get_itinerarios_by_user(user_email TEXT)
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
    owner_name TEXT,
    is_owner BOOLEAN
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
        COALESCE(u.raw_user_meta_data->>'full_name', u.email) as owner_name,
        (i.user_id = auth.uid()) as is_owner
    FROM public.itinerarios i
    LEFT JOIN auth.users u ON i.user_id = u.id
    WHERE i.deleted_at IS NULL
    AND auth.uid() IS NOT NULL
    AND u.email = user_email
    ORDER BY i.updated_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para obtener estadísticas globales (solo para usuarios registrados)
CREATE OR REPLACE FUNCTION get_global_itinerario_stats()
RETURNS TABLE(
    total_itinerarios BIGINT,
    itinerarios_publicos BIGINT,
    itinerarios_privados BIGINT,
    usuarios_activos BIGINT,
    ultimo_creado TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*) FILTER (WHERE deleted_at IS NULL) as total_itinerarios,
        COUNT(*) FILTER (WHERE publico = true AND deleted_at IS NULL) as itinerarios_publicos,
        COUNT(*) FILTER (WHERE publico = false AND deleted_at IS NULL) as itinerarios_privados,
        COUNT(DISTINCT user_id) FILTER (WHERE deleted_at IS NULL) as usuarios_activos,
        MAX(created_at) FILTER (WHERE deleted_at IS NULL) as ultimo_creado
    FROM public.itinerarios
    WHERE auth.uid() IS NOT NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para obtener itinerarios más populares (por número de vistas)
CREATE OR REPLACE FUNCTION get_popular_itinerarios(limit_count INTEGER DEFAULT 10)
RETURNS TABLE(
    id UUID,
    titulo TEXT,
    destino TEXT,
    fecha_inicio DATE,
    fecha_fin DATE,
    publico BOOLEAN,
    url_publica TEXT,
    created_at TIMESTAMP WITH TIME ZONE,
    owner_name TEXT,
    is_owner BOOLEAN
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
        COALESCE(u.raw_user_meta_data->>'full_name', u.email) as owner_name,
        (i.user_id = auth.uid()) as is_owner
    FROM public.itinerarios i
    LEFT JOIN auth.users u ON i.user_id = u.id
    WHERE i.deleted_at IS NULL
    AND auth.uid() IS NOT NULL
    AND i.publico = true
    ORDER BY i.created_at DESC
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para obtener itinerarios recientes de todos los usuarios
CREATE OR REPLACE FUNCTION get_recent_itinerarios(limit_count INTEGER DEFAULT 20)
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
    owner_name TEXT,
    is_owner BOOLEAN
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
        COALESCE(u.raw_user_meta_data->>'full_name', u.email) as owner_name,
        (i.user_id = auth.uid()) as is_owner
    FROM public.itinerarios i
    LEFT JOIN auth.users u ON i.user_id = u.id
    WHERE i.deleted_at IS NULL
    AND auth.uid() IS NOT NULL
    ORDER BY i.updated_at DESC
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para obtener itinerarios por destino
CREATE OR REPLACE FUNCTION get_itinerarios_by_destination(destino_busqueda TEXT)
RETURNS TABLE(
    id UUID,
    titulo TEXT,
    destino TEXT,
    fecha_inicio DATE,
    fecha_fin DATE,
    publico BOOLEAN,
    url_publica TEXT,
    created_at TIMESTAMP WITH TIME ZONE,
    owner_name TEXT,
    is_owner BOOLEAN
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
        COALESCE(u.raw_user_meta_data->>'full_name', u.email) as owner_name,
        (i.user_id = auth.uid()) as is_owner
    FROM public.itinerarios i
    LEFT JOIN auth.users u ON i.user_id = u.id
    WHERE i.deleted_at IS NULL
    AND auth.uid() IS NOT NULL
    AND i.destino ILIKE '%' || destino_busqueda || '%'
    ORDER BY i.updated_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Vista para itinerarios compartidos
CREATE VIEW shared_itinerarios AS
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
    COALESCE(u.raw_user_meta_data->>'full_name', u.email) as owner_name,
    (i.user_id = auth.uid()) as is_owner
FROM public.itinerarios i
LEFT JOIN auth.users u ON i.user_id = u.id
WHERE i.deleted_at IS NULL
AND auth.uid() IS NOT NULL;
