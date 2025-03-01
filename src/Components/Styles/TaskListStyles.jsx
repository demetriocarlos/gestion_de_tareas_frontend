
//import React from 'react';
import { User, CheckCircle, Clock, XCircle } from 'lucide-react';
import { getStatusConfig } from '../../utils/taskUtils';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {  X} from 'lucide-react';
import { useDeleteTask } from '../../hooks/useTask';
import { useDeleteAssignament } from '../../hooks/useTask';
 
const priorityColors = {
  baja: 'bg-green-500',
  media: 'bg-yellow-500',
  alta: 'bg-red-500',
};

const statusConfig = {
  completed: { bgColor: 'bg-green-500/20', textColor: 'text-green-300', icon: CheckCircle, label: 'Completada' },
  'in-progress': { bgColor: 'bg-yellow-500/20', textColor: 'text-yellow-300', icon: Clock, label: 'En progreso' },
  'not-completed': { bgColor: 'bg-red-500/20', textColor: 'text-red-300', icon: XCircle, label: 'No completada' },
};

  
  // eslint-disable-next-line react/prop-types
  const TaskItem  = ({ task, ispublic, assigned   }) => {

    const {state} = useAuth()
    const deleteTaskMutation = useDeleteTask()
    const deleteAssignament = useDeleteAssignament()

     
    
   const tasky = task.task

  const status = getStatusConfig(assigned ?tasky: task , statusConfig);

  //eliminar tarea
const handleDeleteTask = ()  =>{       

  if(!assigned){
    if(window.confirm(`¿Eestas seguro que quieres eliminar la Tarea: ${task.title}`)){
      return deleteTaskMutation.mutate(task.id)
    }
  }else{
    if(window.confirm(`¿Eestas seguro que quieres eliminar la Tarea asignada: ${task.task.title}`)){
       
      // eslint-disable-next-line react/prop-types
      return deleteAssignament.mutate(task.task.id)
    }
  }      
  
}
 
  
//${statusInfo.bgColor} ${statusInfo.textColor}
  return (
    <div className=" bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 mb-4 transition-all hover:bg-gray-700/50">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
            <Link to={`/users/${ task.user.id}`}>
            <User className="w-5 h-5 text-white" />
            </Link>
          </div>
          
          <span className="text-white   sm:font-medium mr-3">{ 
           
           task.user.username}
           
          </span>

          <span className={` text-sm  px-2 py-1 rounded-full ${status.bgColor} ${status.textColor}   `}>
            <status.icon className="  w-4 h-4 inline mr-1" />
            {status.label} 
          </span>
        </div>
 

         {/**boton para eliminar una tarea  */}
        <div>
        {     //elliminar tarea asignada
            // eslint-disable-next-line react/prop-types
            !assigned ? ''  :  task.assignedTo !==state.id ? '' :

              <button 
                onClick={handleDeleteTask}
                className='mb-5   hover:bg-gray-700/50 rounded-full transition-colors'
              >
                <X color='white' size={19} />
              </button>
          }

          { 
          //eliminar la tarea si eres el creador de ella
            
             
            task.user.id !==state.id ||   ispublic ? 
            // o si la tarea es publica devolver task.priority en lugar del icono de x
            <div className={`w-3 h-3 rounded-full ${priorityColors[ task.priority]}`} title={`Prioridad: ${task.priority}`}></div>
             
             :
              <button 
                onClick={handleDeleteTask}
                className='mb-5  hover:bg-gray-700/50 rounded-full transition-colors'
              >
                <X color='white' size={19} />
              </button>
          }              
        </div>
 
      </div>
 
      <Link to={ !assigned ? `/taskDetailPage/${task.id}` :`/assignedDetailPage/${task.id}`}>
        
        {/**mostrar titulo y priopridar en lugares opestos horizontalmente */}
      <div className="flex justify-between items-start  ">
          
        <h3 className="text-lg font-semibold text-white mb-2">{assigned ? task.task.title: task.title}</h3>
        {
          //si la tarea es publica no devolver task.priority en esta posicion,, ispublic tiene un valor boleno
          ispublic ? '':
            <div className={`w-3 h-3 rounded-full ${priorityColors[assigned ? task.task.priority : task.priority]}`} title={`Prioridad: ${assigned ? task.task.priority: task.priority}`}></div>
        }
        

      </div>


      <div className="text-sm text-gray-400">
        Creada el: {new Date(assigned ? task.task.createdAt: task.createdAt).toLocaleDateString()}
      </div>
      </Link>

    </div>
  );
}; 

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    user: PropTypes.shape({
      username:PropTypes.string.isRequired,
      id:PropTypes.string.isRequired,
    }),
    task: PropTypes.shape({
      title: PropTypes.string, // Para tareas asignadas
      priority:PropTypes.string,
      createdAt:PropTypes.string
    }),
    status: PropTypes.oneOf([ 'pendiente', 'not-completed', 'completed',]),
    createdAt: PropTypes.string.isRequired, // Se espera que sea una fecha en formato ISO
    priority: PropTypes.oneOf(['baja', 'media', 'alta']),
  }).isRequired,
};


     


 
// eslint-disable-next-line react/prop-types
export const TaskListStyles  = ({ tasks, title, ispublic, assigned}) => {
  //p-6
  return (
    <div className={ `max-w-3xl mx-auto  ${ispublic ==true ? ' p-5 bg-gray-900/50' : ' bg-gray-950'}  backdrop-blur-md rounded-lg shadow-xl`}>
      <h2 className="text-center  text-2xl font-bold text-white mb-6">{title}</h2>
      <div>
        {
        tasks && tasks.map((task) => (
          <TaskItem 
            key={task.id} 
            task={task} 
            ispublic={ispublic}
            assigned={assigned}
          />
        ))}
      </div>
    </div>
  );
};
 


TaskListStyles.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string,
      status: PropTypes.oneOf(['pendiente', 'not-completed', 'completed',]),
      createdAt: PropTypes.string.isRequired,
      priority: PropTypes.oneOf(['baja', 'media', 'alta']),
    }),
  ).isRequired,

   
};