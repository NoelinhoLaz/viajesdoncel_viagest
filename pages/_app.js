import '../styles/globals.css'
import MainLayout from '../components/layout/MainLayout'
import Head from 'next/head'
import { AuthProvider } from '../contexts/AuthContext'
import { ItinerarioProvider } from '../contexts/ItinerarioContext'
import RouteGuard from '../components/auth/RouteGuard'

export default function App({ Component, pageProps }) {
  // Si el componente tiene un layout personalizado, usarlo
  if (Component.getLayout) {
    return Component.getLayout(
      <AuthProvider>
        <ItinerarioProvider>
          <RouteGuard>
            <Component {...pageProps} />
          </RouteGuard>
        </ItinerarioProvider>
      </AuthProvider>
    )
  }

  // Por defecto, usar MainLayout
  return (
    <AuthProvider>
      <ItinerarioProvider>
        <Head>
          <title>Viajes Doncel - Gestión Comercial</title>
          <meta name="description" content="Sistema de gestión comercial integral para agencia de viajes" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/favicon.ico" />
          <link rel="manifest" href="/site.webmanifest" />
          <meta name="theme-color" content="#0f4c75" />
        </Head>
        <RouteGuard>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </RouteGuard>
      </ItinerarioProvider>
    </AuthProvider>
  )
}
