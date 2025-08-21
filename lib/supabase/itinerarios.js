import { supabase } from './client'

// Función para crear un nuevo itinerario
export async function createItinerario(itinerarioData) {
  try {
    // Obtener el usuario actual
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError
    if (!user) throw new Error('Usuario no autenticado')

    const { data, error } = await supabase
      .from('itinerarios')
      .insert({
        user_id: user.id,
        titulo: itinerarioData.titulo || 'Mi Itinerario',
        destino: itinerarioData.destino,
        fecha_inicio: itinerarioData.fechaInicio,
        fecha_fin: itinerarioData.fechaFin,
        dias: itinerarioData.dias || []
      })
      .select()
      .single()

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error creando itinerario:', error)
    return { success: false, error: error.message }
  }
}

// Función para actualizar un itinerario existente
export async function updateItinerario(id, itinerarioData) {
  try {
    // Obtener el usuario actual
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError
    if (!user) throw new Error('Usuario no autenticado')

    const { data, error } = await supabase
      .from('itinerarios')
      .update({
        titulo: itinerarioData.titulo,
        destino: itinerarioData.destino,
        fecha_inicio: itinerarioData.fechaInicio,
        fecha_fin: itinerarioData.fechaFin,
        dias: itinerarioData.dias
      })
      .eq('id', id)
      .eq('user_id', user.id) // Asegurar que solo actualiza sus propios itinerarios
      .select()
      .single()

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error actualizando itinerario:', error)
    return { success: false, error: error.message }
  }
}

// Función para obtener todos los itinerarios del usuario
export async function getUserItinerarios() {
  try {
    const { data, error } = await supabase
      .from('itinerarios')
      .select('*')
      .order('updated_at', { ascending: false })

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error obteniendo itinerarios:', error)
    return { success: false, error: error.message }
  }
}

// Función para obtener todos los itinerarios (para usuarios registrados)
export async function getAllItinerarios() {
  try {
    // Obtener el usuario actual
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError
    if (!user) throw new Error('Usuario no autenticado')

    // Usar la vista directamente en lugar de la función RPC
    const { data, error } = await supabase
      .from('shared_itinerarios')
      .select('*')
      .order('updated_at', { ascending: false })

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error obteniendo todos los itinerarios:', error)
    return { success: false, error: error.message }
  }
}

// Función para buscar itinerarios
export async function searchItinerarios(searchTerm) {
  try {
    const { data, error } = await supabase
      .rpc('search_all_itinerarios', { search_term: searchTerm })

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error buscando itinerarios:', error)
    return { success: false, error: error.message }
  }
}

// Función para obtener un itinerario específico
export async function getItinerario(id) {
  try {
    const { data, error } = await supabase
      .from('itinerarios')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error obteniendo itinerario:', error)
    return { success: false, error: error.message }
  }
}

// Función para hacer público un itinerario
export async function makeItinerarioPublic(id) {
  try {
    // Obtener el usuario actual
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError
    if (!user) throw new Error('Usuario no autenticado')

    // Generar URL pública única
    const urlSuffix = Math.random().toString(36).substring(2, 10)
    const publicUrl = `publico/itinerario/itinerario-${urlSuffix}`

    // Actualizar el itinerario para hacerlo público
    const { data, error } = await supabase
      .from('itinerarios')
      .update({
        publico: true,
        url_publica: publicUrl
      })
      .eq('id', id)
      .eq('user_id', user.id) // Asegurar que solo actualiza sus propios itinerarios
      .select()
      .single()

    if (error) throw error
    return { success: true, data: publicUrl }
  } catch (error) {
    console.error('Error haciendo público el itinerario:', error)
    return { success: false, error: error.message }
  }
}

// Función para hacer privado un itinerario
export async function makeItinerarioPrivate(id) {
  try {
    const { data, error } = await supabase
      .rpc('make_itinerario_private', { itinerario_id: id })

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error haciendo privado el itinerario:', error)
    return { success: false, error: error.message }
  }
}

// Función para eliminar un itinerario (soft delete)
export async function deleteItinerario(id) {
  try {
    const { data, error } = await supabase
      .rpc('soft_delete_itinerario', { itinerario_id: id })

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error eliminando itinerario:', error)
    return { success: false, error: error.message }
  }
}

// Función para duplicar un itinerario
export async function duplicateItinerario(id) {
  try {
    const { data, error } = await supabase
      .rpc('duplicate_itinerario', { itinerario_id: id })

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error duplicando itinerario:', error)
    return { success: false, error: error.message }
  }
}

// Función para obtener estadísticas del usuario
export async function getUserStats() {
  try {
    const { data, error } = await supabase
      .rpc('get_user_itinerario_stats')

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error obteniendo estadísticas:', error)
    return { success: false, error: error.message }
  }
}

// Función para obtener estadísticas globales
export async function getGlobalStats() {
  try {
    const { data, error } = await supabase
      .rpc('get_global_itinerario_stats')

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error obteniendo estadísticas globales:', error)
    return { success: false, error: error.message }
  }
}

// Función para obtener itinerarios por destino
export async function getItinerariosByDestination(destino) {
  try {
    const { data, error } = await supabase
      .rpc('get_itinerarios_by_destination', { destino_busqueda: destino })

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error obteniendo itinerarios por destino:', error)
    return { success: false, error: error.message }
  }
}

// Función para obtener itinerarios recientes
export async function getRecentItinerarios(limit = 20) {
  try {
    const { data, error } = await supabase
      .rpc('get_recent_itinerarios', { limit_count: limit })

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error obteniendo itinerarios recientes:', error)
    return { success: false, error: error.message }
  }
}

// Función para exportar itinerario a JSON
export async function exportItinerario(id) {
  try {
    const { data, error } = await supabase
      .rpc('export_itinerario_json', { itinerario_id: id })

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error exportando itinerario:', error)
    return { success: false, error: error.message }
  }
}

// Función para importar itinerario desde JSON
export async function importItinerario(itinerarioJson) {
  try {
    const { data, error } = await supabase
      .rpc('import_itinerario_json', { itinerario_json: itinerarioJson })

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error importando itinerario:', error)
    return { success: false, error: error.message }
  }
}
