 
import { useState } from 'react';
import { Calendar } from 'lucide-react';
 

// eslint-disable-next-line react/prop-types
export const CreateTaskStyle  = ({handleSubmit,handleChange, taskData , setTaskData, error}) => {
  const [showCalendar, setShowCalendar] = useState(false);
 
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };
 

  const priorityColors = {
    baja: 'text-green-500',
    media: 'text-yellow-500',
    alta: 'text-red-500',
  };



  //bg-white/30
  return (
      <>
  <div className="max-w-2xl mx-auto bg-gray-900 backdrop-blur-md p-8 rounded-lg shadow-xl border border-gray-700">
  {/* Gradiente decorativo superior */}
  <div className="w-full bg-gradient-to-r from-orange-500 via-blue-500 to-purple-500 h-1 rounded-md mb-6"></div>

  <h2 className="text-3xl font-bold text-orange-400 mb-6 text-center">Crear Nueva Tarea</h2>
  <form onSubmit={handleSubmit} className="space-y-6">
    {/* Campo Título */}
    <div>
      <label htmlFor="title" className="block text-sm font-medium text-gray-200 mb-1">
        Título de la Tarea
      </label>
      <input
         
        name="title"
        type="text"
        value={
          // eslint-disable-next-line react/prop-types
          taskData.title
        }
        onChange={handleChange}

        required
        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200"
        placeholder="Ingrese el título de la tarea"
      />
    </div>

    {/* Campo Descripción */}
    <div>
      <label htmlFor="description" className="block text-sm font-medium text-gray-100 mb-1">
        Descripción
      </label>
      <textarea
         
        name="description"
        rows={3}
        value={
          // eslint-disable-next-line react/prop-types
          taskData.description
        }
        onChange={handleChange}
        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200"
        placeholder="Ingrese la descripción de la tarea"
        required
      ></textarea>
    </div>

    {/* Prioridad */}
    <div>
      <label className="block text-sm font-medium text-gray-100 mb-2">Prioridad</label>
      <div className="flex space-x-4">
        { ['Baja', 'Media', 'Alta'].map((priority) => (
          <label key={priority} className="inline-flex items-center">
            <input
              type="radio"
              name="priority"
              value={priority.toLocaleLowerCase()}
              onChange={handleChange}
              className="form-radio accent-orange-500 focus:ring-orange-500"
            />
            {/**className="ml-2 text-gray-100" */}
            <span className={`ml-2 ${priorityColors[priority.toLowerCase()]}`}>{priority}</span>
          </label>
        ))}
      </div>
    </div>

    {/* Categoría */}
    <div>
      <label htmlFor="category" className="block text-sm font-medium text-gray-100 mb-1">
        Categoría
      </label>
      <input
        name="categories"
        type="text"
        value={
          // eslint-disable-next-line react/prop-types
          taskData.categories
        }

        onChange={handleChange}
        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200"
        placeholder="Ingrese la categoría"
      />
    </div>

    {/* Fecha límite */}
    <div>
      <button
        type="button"
        onClick={toggleCalendar}
        className= "flex items-center px-4 py-2 bg-orange-500 text-white rounded-md shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-orange-300 transition duration-200"
      >
        <Calendar className="mr-2 h-5 w-5" />
        {
        // eslint-disable-next-line react/prop-types
        taskData.expiration_date ?  `Fecha límite: ${
          // eslint-disable-next-line react/prop-types
          taskData.expiration_date
          } ${ 
            // eslint-disable-next-line react/prop-types
            taskData.expiration_time || ''}` : 'Agregar fecha límite'}
      </button>
      {showCalendar && (
        <div className="mt-2">
          <input
            type="date"
            name='expiration_date'
            value={
              // eslint-disable-next-line react/prop-types
              taskData.expiration_date
            }
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200"
          />

          {/* Selección de hora */}
          <input
            type="time"
            name='expiration_time'
            value={
              // eslint-disable-next-line react/prop-types
              taskData.expiration_time
            }
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200"
        />

        </div>
      )}
    </div>

      {/* Mostrar mensaje de error */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}


    {/* Checkbox */}
    <div className="flex items-center">
      <input
        name="isPublic"
        type="checkbox"
        checked={
          // eslint-disable-next-line react/prop-types
          taskData.isPublic || false
        }

        onChange={(e) =>
          setTaskData({ ...taskData, isPublic: e.target.checked })
        } // Actualizar el estado según el valor de la casilla
        className="h-4 w-4 accent-blue-500 focus:ring-orange-500 border-gray-700 rounded"
      />
      <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-100">
        Tarea pública
      </label>
    </div>

    {/* Botón Crear */}
    <div>
      <button
        type="submit"
        className= "w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-2 px-4 rounded-md shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-300"
      >
        Crear Tarea
      </button>
    </div>
  </form>
</div>
 
</>
  );
};
  
