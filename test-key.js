// Script para probar la clave de Supabase
const { createClient } = require('@supabase/supabase-js')

async function testSupabaseKey() {
  try {
    console.log('🔍 Probando clave de Supabase...')
    
    // Configuración
    const supabaseUrl = 'https://ztslribzmpvtnlnwymvq.supabase.co'
    const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0c2xyaWJ6bXB2dG5sbnN3eW12cSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzU1NDI4MzU1LCJleHAiOjIwNzEwMDQzNTV9.sDUhKVV0tuakP01r9hY3atisZLf5y4TYfPokFVxby2g'
    
    console.log('📋 Configuración:')
    console.log('  URL:', supabaseUrl)
    console.log('  Key (primeros 50 chars):', supabaseAnonKey.substring(0, 50) + '...')
    console.log('  Key (últimos 50 chars):', '...' + supabaseAnonKey.substring(supabaseAnonKey.length - 50))
    
    // Crear cliente
    console.log('\n🔗 Creando cliente de Supabase...')
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    
    // Probar conexión básica
    console.log('📡 Probando conexión básica...')
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
    
    if (sessionError) {
      console.error('❌ Error en getSession:', sessionError.message)
      console.error('   Código:', sessionError.code)
      console.error('   Detalles:', sessionError.details)
    } else {
      console.log('✅ getSession exitoso')
      console.log('   Sesión:', sessionData.session ? 'Activa' : 'Inactiva')
    }
    
    // Probar autenticación con credenciales inválidas (debería fallar pero no por API key)
    console.log('\n🔍 Probando autenticación...')
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: 'test@example.com',
      password: 'wrongpassword'
    })
    
    if (authError) {
      if (authError.message.includes('Invalid API key')) {
        console.error('❌ ERROR CRÍTICO: Clave API inválida')
        console.error('   Esto significa que la clave anónima no es correcta')
        console.error('   Necesitas regenerar la clave en Supabase Dashboard')
      } else if (authError.message.includes('Invalid login credentials')) {
        console.log('✅ Clave API válida (error esperado: credenciales inválidas)')
      } else {
        console.log('⚠️  Error de autenticación:', authError.message)
      }
    } else {
      console.log('✅ Autenticación exitosa (inesperado con credenciales falsas)')
    }
    
  } catch (error) {
    console.error('❌ Error general:', error.message)
  }
}

testSupabaseKey()
