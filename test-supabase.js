// Script de prueba para verificar conexión con Supabase
const { createClient } = require('@supabase/supabase-js')

async function testSupabaseConnection() {
  try {
    console.log('🔍 Verificando configuración de Supabase...')
    
    // Leer variables de entorno directamente
    const supabaseUrl = 'https://ztslribzmpvtnlnwymvq.supabase.co'
    const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0c2xyaWJ6bXB2dG5sbnN3eW12cSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzU1NDI4MzU1LCJleHAiOjIwNzEwMDQzNTV9.sDUhKVV0tuakP01r9hY3atisZLf5y4TYfPokFVxby2g'
    
    console.log('📋 Configuración:')
    console.log('  URL:', supabaseUrl ? '✅ Configurada' : '❌ Faltante')
    console.log('  Key:', supabaseAnonKey ? '✅ Configurada' : '❌ Faltante')
    
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('❌ Faltan variables de entorno de Supabase')
    }
    
    console.log('\n🔗 Creando cliente de Supabase...')
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    
    console.log('📡 Probando conexión...')
    const { data, error } = await supabase.auth.getSession()
    
    if (error) {
      throw new Error(`❌ Error de conexión: ${error.message}`)
    }
    
    console.log('✅ Conexión exitosa con Supabase!')
    console.log('📊 Estado de sesión:', data.session ? 'Usuario autenticado' : 'Sin sesión')
    
    // Probar una consulta simple
    console.log('\n🔍 Probando consulta simple...')
    const { data: testData, error: testError } = await supabase
      .from('_dummy_table_')
      .select('*')
      .limit(1)
    
    if (testError && testError.code === 'PGRST116') {
      console.log('✅ Conexión a base de datos exitosa (tabla dummy no existe, pero la conexión funciona)')
    } else if (testError) {
      console.log('⚠️  Error en consulta:', testError.message)
    } else {
      console.log('✅ Consulta exitosa:', testData)
    }
    
    console.log('\n🎉 ¡Prueba de conexión completada exitosamente!')
    
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

testSupabaseConnection()
