import React from 'react'

const FloatingButton = ({ 
  onClick, 
  icon: Icon, 
  title, 
  className = "", 
  size = "default",
  color = "primary",
  position = "bottom-right"
}) => {
  // Configuración de tamaños
  const sizeClasses = {
    small: "w-12 h-12",
    default: "w-14 h-14", 
    large: "w-16 h-16"
  }

  // Configuración de colores
  const colorClasses = {
    primary: "bg-yale-blue hover:bg-air-force-blue text-white",
    secondary: "bg-cambridge-blue hover:bg-sage-green text-white",
    success: "bg-green-500 hover:bg-green-600 text-white",
    warning: "bg-yellow-500 hover:bg-yellow-600 text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    info: "bg-blue-500 hover:bg-blue-600 text-white"
  }

  // Configuración de posiciones
  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "top-right": "top-6 right-6",
    "top-left": "top-6 left-6"
  }

  // Tamaño del icono según el tamaño del botón
  const iconSizes = {
    small: "w-5 h-5",
    default: "w-6 h-6",
    large: "w-7 h-7"
  }

  return (
    <button
      onClick={onClick}
      title={title}
      className={`
        fixed z-50
        ${sizeClasses[size]}
        ${colorClasses[color]}
        ${positionClasses[position]}
        rounded-full
        shadow-lg
        hover:shadow-xl
        transition-all
        duration-300
        transform hover:scale-105
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        focus:ring-blue-500
        ${className}
      `}
    >
      <Icon className={`${iconSizes[size]} mx-auto`} />
    </button>
  )
}

export default FloatingButton
