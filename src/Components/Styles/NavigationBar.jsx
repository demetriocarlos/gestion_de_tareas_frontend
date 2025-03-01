
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
 

// eslint-disable-next-line react/prop-types
export const NavigationBar  = ({ items, onNavigate}) => {
  // Estado que guarda el índice del elemento activo actualmente.
  const [activeIndex, setActiveIndex] = useState(0)

  // Función para manejar el botón "Anterior".
  const handlePrev = () => {
    // Si el índice actual es mayor a 0, se retrocede uno.
    // Si está en el primer elemento, se pasa al último.
    // eslint-disable-next-line react/prop-types
    setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : items.length - 1))

  }

   // Función para manejar el botón "Siguiente".
  const handleNext = () => {
    // Si el índice actual es menor que el último, se avanza uno.
    // Si está en el último elemento, se regresa al primero.
    // eslint-disable-next-line react/prop-types
    setActiveIndex((prevIndex) => (prevIndex < items.length - 1 ? prevIndex + 1 : 0))
  }

  // Función que maneja el clic en un elemento de la barra de navegación.
  const handleItemClick = (index ) => {
    // Actualiza el índice activo con el índice del elemento clicado.
    setActiveIndex(index)
    // Llama a la función `onNavigate` con el `id` del elemento seleccionado.
    // eslint-disable-next-line react/prop-types
    onNavigate(items[index].id)
  }
  
  return (
    <nav className="w-full max-w-md mx-auto my-4 px-4">
    {/* Contenedor principal de la barra de navegación */}
      <div className="relative flex items-center justify-center bg-gray-800/50 backdrop-blur-sm rounded-full p-1">
       {/* Botón "Anterior" */}
        <button
          onClick={handlePrev}
          className="absolute left-2 text-gray-400 hover:text-white transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        {/* Contenedor de los elementos de navegación */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            // La propiedad `transform` ajusta la posición de los elementos, desplazando el índice activo al centro.
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {
            // eslint-disable-next-line react/prop-types
            items.map((item, index) => (
              <button
                key={item.id}// Clave única para cada elemento
                onClick={() => handleItemClick(index)}// Maneja el clic en un elemento
                className={`flex-shrink-0 w-full px-6   py-2 text-sm    font-medium rounded-full transition-colors ${
                  index === activeIndex 
                    ? "bg-orange-500 text-white" // Estilo para el elemento activo
                    : "text-gray-300 hover:text-white" // Estilo para elementos no activos
                   
                }`}
              >
              
                {item.label}
              </button>
            ))}

            {
                
              }
          </div>
        </div>
         {/* Botón "Siguiente" */}
        <button
          onClick={handleNext}
          className="absolute right-2 text-gray-400 hover:text-white transition-colors"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </nav>
  )
}
 