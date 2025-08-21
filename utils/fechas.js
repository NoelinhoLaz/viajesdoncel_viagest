// Utilidades para manejo de fechas

/**
 * Calcula la duración en días entre dos fechas
 * @param {string} fechaInicio - Fecha de inicio (YYYY-MM-DD)
 * @param {string} fechaFin - Fecha de fin (YYYY-MM-DD)
 * @returns {number} - Número de días
 */
export const calcularDuracion = (fechaInicio, fechaFin) => {
  if (!fechaInicio || !fechaFin) return 0
  
  const inicio = new Date(fechaInicio)
  const fin = new Date(fechaFin)
  const diferencia = fin - inicio
  return Math.ceil(diferencia / (1000 * 60 * 60 * 24))
}

/**
 * Formatea una fecha en formato legible
 * @param {string} fecha - Fecha en formato YYYY-MM-DD
 * @param {string} locale - Locale para formateo (default: 'es-ES')
 * @returns {string} - Fecha formateada
 */
export const formatearFecha = (fecha, locale = 'es-ES') => {
  if (!fecha) return ''
  
  return new Date(fecha).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

/**
 * Formatea una fecha en formato corto
 * @param {string} fecha - Fecha en formato YYYY-MM-DD
 * @param {string} locale - Locale para formateo (default: 'es-ES')
 * @returns {string} - Fecha formateada en formato corto
 */
export const formatearFechaCorta = (fecha, locale = 'es-ES') => {
  if (!fecha) return ''
  
  return new Date(fecha).toLocaleDateString(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

/**
 * Obtiene la fecha actual en formato YYYY-MM-DD
 * @returns {string} - Fecha actual
 */
export const getFechaActual = () => {
  return new Date().toISOString().split('T')[0]
}

/**
 * Obtiene la fecha de mañana en formato YYYY-MM-DD
 * @returns {string} - Fecha de mañana
 */
export const getFechaManana = () => {
  const manana = new Date()
  manana.setDate(manana.getDate() + 1)
  return manana.toISOString().split('T')[0]
}

/**
 * Obtiene la fecha de la próxima semana en formato YYYY-MM-DD
 * @returns {string} - Fecha de la próxima semana
 */
export const getFechaProximaSemana = () => {
  const proximaSemana = new Date()
  proximaSemana.setDate(proximaSemana.getDate() + 7)
  return proximaSemana.toISOString().split('T')[0]
}

/**
 * Valida si una fecha es válida
 * @param {string} fecha - Fecha en formato YYYY-MM-DD
 * @returns {boolean} - true si la fecha es válida
 */
export const esFechaValida = (fecha) => {
  if (!fecha) return false
  
  const fechaObj = new Date(fecha)
  return fechaObj instanceof Date && !isNaN(fechaObj)
}

/**
 * Valida si una fecha es posterior a otra
 * @param {string} fecha1 - Primera fecha (YYYY-MM-DD)
 * @param {string} fecha2 - Segunda fecha (YYYY-MM-DD)
 * @returns {boolean} - true si fecha1 es posterior a fecha2
 */
export const esFechaPosterior = (fecha1, fecha2) => {
  if (!fecha1 || !fecha2) return false
  
  const fecha1Obj = new Date(fecha1)
  const fecha2Obj = new Date(fecha2)
  return fecha1Obj > fecha2Obj
}

/**
 * Obtiene el día de la semana de una fecha
 * @param {string} fecha - Fecha en formato YYYY-MM-DD
 * @param {string} locale - Locale para formateo (default: 'es-ES')
 * @returns {string} - Nombre del día de la semana
 */
export const getDiaSemana = (fecha, locale = 'es-ES') => {
  if (!fecha) return ''
  
  return new Date(fecha).toLocaleDateString(locale, {
    weekday: 'long'
  })
}

/**
 * Obtiene el mes de una fecha
 * @param {string} fecha - Fecha en formato YYYY-MM-DD
 * @param {string} locale - Locale para formateo (default: 'es-ES')
 * @returns {string} - Nombre del mes
 */
export const getMes = (fecha, locale = 'es-ES') => {
  if (!fecha) return ''
  
  return new Date(fecha).toLocaleDateString(locale, {
    month: 'long'
  })
}

/**
 * Genera un rango de fechas entre dos fechas
 * @param {string} fechaInicio - Fecha de inicio (YYYY-MM-DD)
 * @param {string} fechaFin - Fecha de fin (YYYY-MM-DD)
 * @returns {Array} - Array de fechas en formato YYYY-MM-DD
 */
export const generarRangoFechas = (fechaInicio, fechaFin) => {
  if (!fechaInicio || !fechaFin) return []
  
  const fechas = []
  const inicio = new Date(fechaInicio)
  const fin = new Date(fechaFin)
  
  for (let fecha = new Date(inicio); fecha <= fin; fecha.setDate(fecha.getDate() + 1)) {
    fechas.push(fecha.toISOString().split('T')[0])
  }
  
  return fechas
}

/**
 * Calcula la edad basada en una fecha de nacimiento
 * @param {string} fechaNacimiento - Fecha de nacimiento (YYYY-MM-DD)
 * @returns {number} - Edad en años
 */
export const calcularEdad = (fechaNacimiento) => {
  if (!fechaNacimiento) return 0
  
  const hoy = new Date()
  const nacimiento = new Date(fechaNacimiento)
  let edad = hoy.getFullYear() - nacimiento.getFullYear()
  const mes = hoy.getMonth() - nacimiento.getMonth()
  
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--
  }
  
  return edad
}

/**
 * Verifica si una fecha es fin de semana
 * @param {string} fecha - Fecha en formato YYYY-MM-DD
 * @returns {boolean} - true si es fin de semana
 */
export const esFinDeSemana = (fecha) => {
  if (!fecha) return false
  
  const dia = new Date(fecha).getDay()
  return dia === 0 || dia === 6 // 0 = domingo, 6 = sábado
}

/**
 * Obtiene el primer día del mes de una fecha
 * @param {string} fecha - Fecha en formato YYYY-MM-DD
 * @returns {string} - Primer día del mes en formato YYYY-MM-DD
 */
export const getPrimerDiaMes = (fecha) => {
  if (!fecha) return ''
  
  const fechaObj = new Date(fecha)
  fechaObj.setDate(1)
  return fechaObj.toISOString().split('T')[0]
}

/**
 * Obtiene el último día del mes de una fecha
 * @param {string} fecha - Fecha en formato YYYY-MM-DD
 * @returns {string} - Último día del mes en formato YYYY-MM-DD
 */
export const getUltimoDiaMes = (fecha) => {
  if (!fecha) return ''
  
  const fechaObj = new Date(fecha)
  fechaObj.setMonth(fechaObj.getMonth() + 1, 0)
  return fechaObj.toISOString().split('T')[0]
}
