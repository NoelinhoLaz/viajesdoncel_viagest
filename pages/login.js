import React, { useState, useEffect } from 'react'
import { Eye, EyeOff, Mail, Lock, User, Building2 } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/router'

// Layout específico para login sin menú
Login.getLayout = function getLayout(page) {
  return page
}

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const { signIn, loading: isLoading, error: authError, user } = useAuth()
  const router = useRouter()

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (user) {
      router.push('/grupos_listado')
    }
  }, [user, router])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validaciones básicas
    if (!formData.email || !formData.password) {
      return
    }

    if (!formData.email.includes('@')) {
      return
    }

    // Usar la función de autenticación de Supabase
    const result = await signIn(formData.email, formData.password)
    
    if (!result.success) {
      console.error('Error de login:', result.error)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="min-h-screen bg-yale-blue flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Logo y título */}
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-white-custom rounded-full flex items-center justify-center shadow-lg mb-6">
            <Building2 size={40} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Viajes Doncel
          </h2>
          <p className="text-blue-100 text-lg">
            Inicia sesión en tu cuenta
          </p>
        </div>

        {/* Formulario de login */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Campo Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Correo electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={20} className="text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yale-blue focus:border-transparent transition-colors"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            {/* Campo Contraseña */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={20} className="text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yale-blue focus:border-transparent transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Opciones adicionales */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-yale-blue focus:ring-yale-blue border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Recordarme
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-yale-blue hover:text-air-force-blue transition-colors">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>

            {/* Mensaje de error */}
            {authError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{authError}</p>
              </div>
            )}

            {/* Botón de login */}
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-yale-blue hover:bg-air-force-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yale-blue disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Iniciando sesión...
                </div>
              ) : (
                <>
                  <User size={18} className="mr-2" />
                  Iniciar sesión
                </>
              )}
            </button>
          </form>


        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-blue-100 text-sm">
            © 2024 Viajes Doncel. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  )
}
