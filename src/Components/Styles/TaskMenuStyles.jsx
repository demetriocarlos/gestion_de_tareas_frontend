
 

/*interface TaskMenuProps {
  onAddSubtask: () => void;
  onAssign: () => void;
}
  */

// eslint-disable-next-line react/prop-types
export const TaskMenuStyles = ({ onAddSubtask, onAssign ,deleteTask, isPublic, task}) => {
  

  
  return (
    <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-10">
      <ul className="py-1">
        <li>
          <button
            onClick={onAddSubtask}
            className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Agregar subtarea
          </button>
        </li>
        <li>
          <button
            onClick={onAssign}
            className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Asignar tarea
          </button>
        </li>
        <li>
          <button
            onClick={isPublic}
            className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
          >
             {
              // eslint-disable-next-line react/prop-types
              task.isPublic ? 'Privar Tarea' :'Publicar Tarea'
             }
          </button>
        </li>
        <li>
          { 
          // eslint-disable-next-line react/prop-types
          task.isPublic == true ? '' :
          <button
            onClick={deleteTask}
            className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
          >
             Eliminar
          </button>
          }
        </li>
      </ul>
    </div>
  );
};






