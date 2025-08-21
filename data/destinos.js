// Lista de destinos disponibles para reutilizar en diferentes páginas
export const destinos = [
  {
    id: 'dali',
    titulo: 'Tras las Huellas de Dalí',
    ciudades: 'Figueres, Cadaqués, Gerona, Barcelona, Salou y el Delta del Ebro',
    descripcion: 'Este viaje es una inmersión en la vida y obra del genio surrealista Salvador Dalí, explorando los lugares que marcaron su legado: desde el icónico Teatro-Museo de Figueres hasta su íntima casa en Cadaqués. Además, el itinerario se enriquece con visitas a la vibrante Barcelona, la histórica Gerona, la animada Salou y el singular entorno natural del Delta del Ebro, ofreciendo una experiencia completa que combina arte, historia y aventura.'
  },
  {
    id: 'andalucia',
    titulo: 'Andalucía Mágica',
    ciudades: 'Sevilla, Córdoba, Granada, Málaga, Ronda y Cádiz',
    descripcion: 'Descubre la esencia de Andalucía a través de sus ciudades más emblemáticas. Desde la majestuosidad de la Alhambra en Granada hasta la elegancia de la Giralda en Sevilla, pasando por la Mezquita de Córdoba y los pueblos blancos de la serranía. Una ruta que combina arquitectura árabe, flamenco, gastronomía y la calidez del sur español.'
  },
  {
    id: 'norte',
    titulo: 'El Norte Verde',
    ciudades: 'Bilbao, San Sebastián, Santander, Oviedo, Santiago de Compostela y Vigo',
    descripcion: 'Explora la belleza natural del norte de España, desde el País Vasco hasta Galicia. Disfruta de la gastronomía vasca en San Sebastián, el arte contemporáneo en el Guggenheim de Bilbao, las playas de Cantabria, la arquitectura prerrománica de Asturias y la espiritualidad del Camino de Santiago.'
  },
  {
    id: 'madrid',
    titulo: 'Madrid y Alrededores',
    ciudades: 'Madrid, Toledo, Segovia, Ávila, El Escorial y Aranjuez',
    descripcion: 'Sumérgete en la capital española y sus alrededores históricos. Descubre los tesoros del Museo del Prado, la elegancia de la Plaza Mayor, la majestuosidad del Palacio Real, y las joyas patrimoniales de las ciudades cercanas como Toledo, Segovia y Ávila, declaradas Patrimonio de la Humanidad.'
  },
  {
    id: 'mediterraneo',
    titulo: 'Costa Mediterránea',
    ciudades: 'Valencia, Alicante, Murcia, Cartagena, Almería y las Islas Baleares',
    descripcion: 'Recorre la costa mediterránea española con su clima privilegiado, playas paradisíacas y ciudades llenas de historia. Desde la modernidad de Valencia y su Ciudad de las Artes hasta la antigüedad de Cartagena, pasando por la belleza natural de las Islas Baleares, este viaje ofrece sol, mar y cultura en perfecta armonía.'
  }
]

// Función helper para obtener un destino por ID
export const getDestinoById = (id) => {
  return destinos.find(destino => destino.id === id)
}

// Función helper para filtrar destinos por texto
export const filtrarDestinos = (texto) => {
  const textoLower = texto.toLowerCase()
  return destinos.filter(destino => 
    destino.titulo.toLowerCase().includes(textoLower) ||
    destino.ciudades.toLowerCase().includes(textoLower) ||
    destino.descripcion.toLowerCase().includes(textoLower)
  )
}
