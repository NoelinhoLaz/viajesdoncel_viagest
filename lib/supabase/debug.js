import { supabase } from './client'

// Función para debug: verificar itinerarios del usuario
export async function debugUserItinerarios() {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError
    if (!user) throw new Error('Usuario no autenticado')

    console.log('Usuario actual:', user.id)

    // Obtener itinerarios del usuario
    const { data: userItinerarios, error: userError2 } = await supabase
      .from('itinerarios')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (userError2) throw userError2

    console.log('Itinerarios del usuario:', userItinerarios)
    return { success: true, data: userItinerarios }
  } catch (error) {
    console.error('Error en debug:', error)
    return { success: false, error: error.message }
  }
}

// Función para debug: verificar todos los itinerarios
export async function debugAllItinerarios() {
  try {
    const { data, error } = await supabase
      .from('itinerarios')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    console.log('Todos los itinerarios:', data)
    return { success: true, data }
  } catch (error) {
    console.error('Error en debug:', error)
    return { success: false, error: error.message }
  }
}

// Función para debug: verificar vista shared_itinerarios
export async function debugSharedItinerarios() {
  try {
    const { data, error } = await supabase
      .from('shared_itinerarios')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    console.log('Vista shared_itinerarios:', data)
    return { success: true, data }
  } catch (error) {
    console.error('Error en debug:', error)
    return { success: false, error: error.message }
  }
}

// Función para debug: verificar políticas RLS
export async function debugRLSPolicies() {
  try {
    // Intentar insertar un itinerario de prueba
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError
    if (!user) throw new Error('Usuario no autenticado')

    const testData = {
      user_id: user.id,
      titulo: 'Test Debug',
      destino: 'Test',
      dias: []
    }

    const { data, error } = await supabase
      .from('itinerarios')
      .insert(testData)
      .select()
      .single()

    if (error) {
      console.log('Error al insertar (RLS):', error)
      return { success: false, error: error.message }
    }

    console.log('Inserción exitosa:', data)
    
    // Limpiar el test
    await supabase
      .from('itinerarios')
      .delete()
      .eq('id', data.id)

    return { success: true, data }
  } catch (error) {
    console.error('Error en debug RLS:', error)
    return { success: false, error: error.message }
  }
}
