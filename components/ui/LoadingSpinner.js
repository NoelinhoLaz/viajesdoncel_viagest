export default function LoadingSpinner({ message = "Verificando autenticación..." }) {
  return (
    <div className="min-h-screen bg-content-bg flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yale-blue mx-auto mb-4"></div>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  )
}
