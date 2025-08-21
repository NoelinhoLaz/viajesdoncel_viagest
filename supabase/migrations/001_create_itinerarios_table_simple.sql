-- PASO 1: Crear tabla básica
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

-- PASO 2: Crear índices básicos
CREATE INDEX idx_itinerarios_user_id ON public.itinerarios(user_id);
CREATE INDEX idx_itinerarios_publico ON public.itinerarios(publico) WHERE publico = true;
CREATE INDEX idx_itinerarios_url_publica ON public.itinerarios(url_publica) WHERE url_publica IS NOT NULL;

-- PASO 3: Habilitar RLS
ALTER TABLE public.itinerarios ENABLE ROW LEVEL SECURITY;

-- PASO 4: Crear políticas básicas
-- Todos los usuarios registrados pueden ver todos los itinerarios (no eliminados)
CREATE POLICY "Usuarios registrados pueden ver todos los itinerarios" ON public.itinerarios
    FOR SELECT
    USING (auth.uid() IS NOT NULL AND deleted_at IS NULL);

-- Cualquiera puede ver itinerarios públicos (sin necesidad de registro)
CREATE POLICY "Cualquiera puede ver itinerarios públicos" ON public.itinerarios
    FOR SELECT
    USING (publico = true AND deleted_at IS NULL);

-- Usuarios solo pueden crear sus propios itinerarios
CREATE POLICY "Usuarios pueden crear itinerarios" ON public.itinerarios
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Usuarios solo pueden actualizar sus propios itinerarios
CREATE POLICY "Usuarios pueden actualizar sus itinerarios" ON public.itinerarios
    FOR UPDATE
    USING (auth.uid() = user_id AND deleted_at IS NULL)
    WITH CHECK (auth.uid() = user_id);

-- Usuarios solo pueden eliminar sus propios itinerarios
CREATE POLICY "Usuarios pueden eliminar sus itinerarios" ON public.itinerarios
    FOR DELETE
    USING (auth.uid() = user_id AND deleted_at IS NULL);

-- PASO 5: Función para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- PASO 6: Trigger para updated_at
CREATE TRIGGER update_itinerarios_updated_at 
    BEFORE UPDATE ON public.itinerarios 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- PASO 7: Función para generar URL pública
CREATE OR REPLACE FUNCTION generate_public_url()
RETURNS TEXT AS $$
DECLARE
    url_suffix TEXT;
    full_url TEXT;
    counter INTEGER := 0;
BEGIN
    LOOP
        url_suffix := substr(md5(random()::text), 1, 8);
        full_url := 'itinerario-' || url_suffix;
        
        IF NOT EXISTS (SELECT 1 FROM public.itinerarios WHERE url_publica = full_url) THEN
            RETURN full_url;
        END IF;
        
        counter := counter + 1;
        IF counter > 100 THEN
            RAISE EXCEPTION 'No se pudo generar una URL única después de 100 intentos';
        END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- PASO 8: Funciones básicas de gestión
CREATE OR REPLACE FUNCTION make_itinerario_public(itinerario_id UUID)
RETURNS TEXT AS $$
DECLARE
    public_url TEXT;
BEGIN
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
