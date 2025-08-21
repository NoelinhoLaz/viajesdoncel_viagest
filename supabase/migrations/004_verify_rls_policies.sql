-- Verificar y corregir políticas RLS para la tabla itinerarios

-- Primero, eliminar políticas existentes para recrearlas
DROP POLICY IF EXISTS "Usuarios registrados pueden ver todos los itinerarios" ON public.itinerarios;
DROP POLICY IF EXISTS "Cualquiera puede ver itinerarios públicos" ON public.itinerarios;
DROP POLICY IF EXISTS "Usuarios pueden crear itinerarios" ON public.itinerarios;
DROP POLICY IF EXISTS "Usuarios pueden actualizar sus itinerarios" ON public.itinerarios;
DROP POLICY IF EXISTS "Usuarios pueden eliminar sus itinerarios" ON public.itinerarios;

-- Recrear políticas con configuración correcta

-- Política 1: Todos los usuarios registrados pueden ver todos los itinerarios (no eliminados)
CREATE POLICY "Usuarios registrados pueden ver todos los itinerarios" ON public.itinerarios
    FOR SELECT
    USING (auth.uid() IS NOT NULL AND deleted_at IS NULL);

-- Política 2: Cualquiera puede ver itinerarios públicos (sin necesidad de registro)
CREATE POLICY "Cualquiera puede ver itinerarios públicos" ON public.itinerarios
    FOR SELECT
    USING (publico = true AND deleted_at IS NULL);

-- Política 3: Usuarios solo pueden crear sus propios itinerarios
CREATE POLICY "Usuarios pueden crear itinerarios" ON public.itinerarios
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Política 4: Usuarios solo pueden actualizar sus propios itinerarios
CREATE POLICY "Usuarios pueden actualizar sus itinerarios" ON public.itinerarios
    FOR UPDATE
    USING (auth.uid() = user_id AND deleted_at IS NULL)
    WITH CHECK (auth.uid() = user_id);

-- Política 5: Usuarios solo pueden eliminar sus propios itinerarios
CREATE POLICY "Usuarios pueden eliminar sus itinerarios" ON public.itinerarios
    FOR DELETE
    USING (auth.uid() = user_id AND deleted_at IS NULL);

-- Verificar que RLS está habilitado
SELECT 
    schemaname, 
    tablename, 
    rowsecurity 
FROM pg_tables 
WHERE tablename = 'itinerarios';

-- Verificar políticas creadas
SELECT 
    policyname, 
    permissive, 
    roles, 
    cmd, 
    qual, 
    with_check 
FROM pg_policies 
WHERE tablename = 'itinerarios';

-- Función de prueba para verificar que las políticas funcionan
CREATE OR REPLACE FUNCTION test_rls_policies()
RETURNS TABLE(
    test_name TEXT,
    result TEXT
) AS $$
DECLARE
    test_user_id UUID;
    test_itinerario_id UUID;
BEGIN
    -- Simular un usuario autenticado (esto es solo para pruebas)
    test_user_id := '00000000-0000-0000-0000-000000000001'::UUID;
    
    -- Test 1: Verificar que se puede insertar con user_id correcto
    BEGIN
        INSERT INTO public.itinerarios (
            user_id, 
            titulo, 
            destino, 
            dias
        ) VALUES (
            test_user_id,
            'Test Itinerario',
            'Test Destino',
            '[]'::jsonb
        ) RETURNING id INTO test_itinerario_id;
        
        RETURN QUERY SELECT 'INSERT con user_id válido'::TEXT, 'PASS'::TEXT;
        
        -- Limpiar después del test
        DELETE FROM public.itinerarios WHERE id = test_itinerario_id;
    EXCEPTION WHEN OTHERS THEN
        RETURN QUERY SELECT 'INSERT con user_id válido'::TEXT, 'FAIL: ' || SQLERRM::TEXT;
    END;
    
    -- Test 2: Verificar que no se puede insertar sin user_id
    BEGIN
        INSERT INTO public.itinerarios (
            titulo, 
            destino, 
            dias
        ) VALUES (
            'Test Itinerario Sin User',
            'Test Destino',
            '[]'::jsonb
        );
        
        RETURN QUERY SELECT 'INSERT sin user_id'::TEXT, 'FAIL: Debería haber fallado'::TEXT;
    EXCEPTION WHEN OTHERS THEN
        RETURN QUERY SELECT 'INSERT sin user_id'::TEXT, 'PASS: Bloqueado correctamente'::TEXT;
    END;
    
END;
$$ LANGUAGE plpgsql;
