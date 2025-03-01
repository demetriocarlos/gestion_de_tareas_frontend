 

import { User, Calendar, Clock, CheckCircle, XCircle, MessageSquare, Plus,  MoreVertical , Send} from 'lucide-react';
import { TaskMenuStyles } from './TaskMenuStyles';
import { CommentListStyles } from './CommentListStyles';
import { UserListTask } from './UserListTask';
import { getStatusConfig } from '../../utils/taskUtils';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useUpdateTaskCompleted} from '../../hooks/useTask';
import { useUpdateTaskIsPublic } from '../../hooks/useTask';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import { useGetFollowers } from '../../hooks/useTask';
import { useUpdateAssignament } from '../../hooks/useTask';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useCallback } from 'react';
import { Temporal } from '@js-temporal/polyfill';
 

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
export const TaskDetailStyles  = ({ task, assigned,handleDeleteTask, comments, handleNewSubTask,handleSubTask,newSubTask,subTask, handleSubmit,handleChange, newComment }) => {
  
  const updateTaskCompleted = useUpdateTaskCompleted()
  const updateTaskIsPublic = useUpdateTaskIsPublic()
  const updateAssignament = useUpdateAssignament()
  const {state} = useAuth()
  const {data:followers} = useGetFollowers()


  const [remainingTimes, setRemainingTime] = useState("");

    //const [showComments2, setShowComments] = useState(false);
   
    const [searchParams] = useSearchParams();
     
    const showComments = searchParams.get("showComments") === "true";
    


    const commentId = searchParams.get("commentId"); // ID del comentario a resaltar

    const [commentsVisible, setCommentsVisible] = useState(showComments);
  
    useEffect(() => {
      if (showComments) {
        setCommentsVisible(true);
      }
    }, [showComments]);
  

    useEffect(() => {
      if (commentsVisible && commentId) {
        setTimeout(() => {
          const commentElement = document.getElementById(commentId);
          if (commentElement) {
            commentElement.scrollIntoView({ behavior: "smooth", block: "center" });
            commentElement.classList.add("bg-yellow-100"); // Resalta el comentario
            setTimeout(() => {
              commentElement.classList.remove("bg-yellow-100");
            }, 3000);
          }
        }, 500);
      }
    }, [commentsVisible, commentId]);



    //codigo para el tiempo restante
const getRemainingTime = useCallback (() => {
  if (task && !task?.expiration_date) return 'Fecha no definida';

  try {
    // Obtener la fecha y hora actual en la zona horaria local
    const now = Temporal.Now.plainDateTimeISO();

    // Convertir la fecha de expiración a Temporal.PlainDateTime
    const expiration = Temporal.PlainDateTime.from(task.expiration_date.replace('Z', ''));

    // Calcular la diferencia en unidades más grandes
    const duration = expiration.since(now, { largestUnit: 'years' });

    const years = duration.years;
    const months = duration.months;
    const weeks = Math.floor(duration.days / 7);
    const days = duration.days % 7;
    const hours = duration.hours;
    const minutes = duration.minutes;

    if (years < 0 || months < 0 || weeks < 0 || days < 0 || hours < 0 || minutes < 0) {
      return 'Expirada';
    }

    // Construcción del mensaje
    let timeMessage = [];

    


    if (years > 0) {
      timeMessage.push(`${years} año${years > 1 ? 's' : ''}`);
      if (months > 0) timeMessage.push(`${months} mes${months > 1 ? 'es' : ''}`);
    } else if (months > 0) {
      timeMessage.push(`${months} mes${months > 1 ? 'es' : ''}`);
      if (weeks > 0) timeMessage.push(`${weeks} semana${weeks > 1 ? 's' : ''}`);
    } else if (weeks > 0) {
      timeMessage.push(`${weeks} semana${weeks > 1 ? 's' : ''}`);
      if (days > 0) timeMessage.push(`${days} día${days > 1 ? 's' : ''}`);
    } else if (days > 0) {
      timeMessage.push(`${days} día${days > 1 ? 's' : ''}`);
      if (hours > 0) timeMessage.push(`${hours} hora${hours > 1 ? 's' : ''}`);
    } else {
      timeMessage.push(`${hours} hora${hours > 1 ? 's' : ''}`);
      if (minutes > 0) timeMessage.push(`${minutes} minuto${minutes > 1 ? 's' : ''}`);
    }

    return timeMessage.length > 0 ? timeMessage.join(', ') : 'Menos de un minuto restante';
  } catch (error) {
    console.error('Error al procesar la fecha de expiración:', error);
    return 'Error en la fecha';
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [task?.expiration_date]); // Solo cambia si `task.expiration_date` cambia


const remainingTime = getRemainingTime();


    
useEffect(() => {
  // Función que obtiene el tiempo restante
  const updateRemainingTime = () => {
    setRemainingTime(getRemainingTime());
  };

  // Ejecutar una vez al montar el componente
  updateRemainingTime();

  // Configurar intervalo cada 60 segundos
  const interval = setInterval(updateRemainingTime, 60000);

  // Limpiar el intervalo al desmontar el componente
  return () => clearInterval(interval);

}, [getRemainingTime]); // Se actualiza si cambia la fecha de expiración

  

 
    const toggleComments = () => {
      setCommentsVisible((prev) => !prev);
    };


   
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAssigning, setIsAssigning] = useState(false);
  //const [showComments, setShowComments] = useState(false);
  const [loading, setLoading] = useState(false);
   
  const [showSubtaskInput, setShowSubtaskInput] = useState(false);
  const [showSubtaskList, setShowSubtaskList] = useState(false);

   

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleAssigning = () => setIsAssigning(!isAssigning);
  //const toggleComments = () => setShowComments(!showComments);

  const toggleSubTask = () =>  setShowSubtaskInput(!showSubtaskInput)
  const toggleSubTaskList = () =>  setShowSubtaskList(!showSubtaskList)

  if (!task) {
    return <div>No se encontró la tarea o fue eliminada.</div>;
  }
 
  //completar tarea
  const handleComplete = () => {
    // Lógica para marcar la tarea como completada
    /*setLoading(true);
    updateTaskCompleted.mutate(
      {
        id:task.id, 
        //utiliza el operador lógico de negación (!) para invertir el valor booleano 
        completed:!task.completed // Cambiar el estado de "completed"
      },
      {
      onSettled: () => setLoading(false),
    },
  )*/

  
  if(assigned){
       // Lógica para marcar la tarea como completada    
    setLoading(true);
    updateAssignament.mutate(
      {
        id:task.task.id, 
        //utiliza el operador lógico de negación (!) para invertir el valor booleano 
        completed:!task.task.completed // Cambiar el estado de "completed"
      },
      {
      onSettled: () => setLoading(false),
    },
  )
  }else{
     // Lógica para marcar la tarea como completada
     setLoading(true);
     updateTaskCompleted.mutate(
       {
         id:task.id, 
         //utiliza el operador lógico de negación (!) para invertir el valor booleano 
         completed:!task.completed // Cambiar el estado de "completed"
       },
       {
       onSettled: () => setLoading(false),
     },
   )
  }

  };

  //publicar tarea
  const handleIsPublic = () =>{
    if(window.confirm(`${task.isPublic ? '¿desea hacer privada la tarea' : '¿deseas publicar la tarea'}`)){

    
    return  updateTaskIsPublic.mutate({
        id:task.id,
        //utiliza el operador lógico de negación (!) para invertir el valor booleano 
        isPublic:!task.isPublic
      })
    }

  }
   
   
 
  const notComment = <div><p className='mt-8 text-center'>No hay comentarios aun</p></div>

  const status = getStatusConfig(assigned ? task.task: task  ,statusConfig)
 
  const userFollowers = followers?.map((follow) => follow.follower) || [];

 
     
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900/50 backdrop-blur-md rounded-lg shadow-xl text-white">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold text-orange-400">{assigned ? task.task.title: task.title}</h2>
        {/**menu  vertical desplegable  */}
        
        { 
        task.user.id !== state.id ? '' :
        <div className="relative">
          
          <button onClick={toggleMenu} className="p-2 hover:bg-gray-700/50 rounded-full transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
          {isMenuOpen && (
            <TaskMenuStyles
              onAddSubtask={/*() => console.log('Agregar subtarea')*/ toggleSubTask} 
              onAssign={toggleAssigning}
              deleteTask={handleDeleteTask}
              isPublic ={handleIsPublic}
              task={task}
            />
          )}

        </div>
        }
      </div>

        {/**datos del usuario */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mr-3">
            <Link to={`/users/${task.user.id}`}>
              <User className="w-6 h-6 text-white" />
            </Link>
          </div>

          <span className="font-medium">{task.user.username}</span>
        </div>
        <div className="flex items-center justify-end">
          <span className={`text-sm px-3 py-1 rounded-full ${status.bgColor} ${status.textColor}`}>
            <status.icon className="w-4 h-4 inline mr-2" />
            {status.label} 
          </span>
          <div className={`w-3 h-3 rounded-full ${priorityColors[assigned ? task.task.priority : task.priority]} ml-3`} title={`Prioridad: ${assigned ? task.task.priority : task.priority}`}></div>
        </div>
      </div>

      <p className="text-gray-300 mb-4">{assigned ? task.task.description : task.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex items-center text-gray-400">
          <Calendar className="w-5 h-5 mr-2" />
          <span>Creada: {new Date(assigned ? task.task.createdAt : task.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center text-gray-400">

          {//tareas normales
            !task.expiration_date || !task.expiration_time ? ''
            :
            <> 
            <Clock className=" w-5 h-5 mr-2" />
          <span>Expira: {new Date(assigned ? task.task.expiration_date :  task.expiration_date).toLocaleDateString()}  </span>
          <p className='ml-4 text-center text-yellow-400 font-semibold'>{assigned ? task.task.expiration_time : task.expiration_time}</p>
          </>
          }

          {//expiracion de  tareas asignadas
           !assigned ? '' : !task.task.expiration_date || !task.task.expiration_time ? ''
            :
            <> 
            <Clock className=" w-5 h-5 mr-2" />
          <span>Expira: {new Date(assigned ? task.task.expiration_date : task.task.expiration_date  ).toLocaleDateString()}  </span>
          <p className='ml-4 text-center text-yellow-400 font-semibold'>{assigned ? task.task.expiration_time : task.task.expiration_time }</p>
          </>
          }
           
        </div>
      </div> 
      {/* codigo de tiempo restante */}
       {  task && task.completed == true ? '' :
          <div className=" flex space-x-2 mb-6 text-yellow-400 font-semibold">
           
            {remainingTime !== 'Expirada' && <p className="text-white">Expirará En:</p>}
            <div>{remainingTime}</div>

          </div>
        }

         {/**mostrar y crear subTareas */} 
      <div className="mb-6">
        
        {
          // eslint-disable-next-line react/prop-types
        assigned ? '' : subTask && subTask.length === 0 ?
          '':
          <button  className="text-lg font-semibold mb-2" onClick={toggleSubTaskList}  >
             Subtareas:    
        </button>

        }

        
        <ul className="space-y-2">
          { showSubtaskList &&
          // eslint-disable-next-line react/prop-types
          subTask && subTask.map((subtask) => (
            <li key={subtask.id} className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-gray-400" />
             
              <span>{subtask.subTasks}</span>
            </li>
          ))}
        </ul>
        {/**mostrar el input para agregar una subTarea */}
        {showSubtaskInput && (
          <div className="mt-2 flex">
            <input
              type="text"
              name='subTasks'
              // eslint-disable-next-line react/prop-types
              value={newSubTask.subTasks}
              onChange={handleSubTask}
              placeholder="Nueva subtarea..."
              className="flex-grow bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              onClick={handleNewSubTask}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-r-md transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>



        {/**mostrar publico  y mostrar el boton de completar*/}
      <div className="flex items-center justify-between mb-6">
        { assigned ?
        //para las tareas asignadas
        <div className="flex items-center">
        <input
            type="checkbox"
            id="isPublic"
            checked={ task.task.isPublic }
            onChange={() => console.log('Cambiar visibilidad')}
             
            className={`mr-2 ${  task.task.isPublic  ? 'accent-blue-500' : 'accent-red-500'}`}
          />
          <label htmlFor="isPublic"> { task.task.isPublic ? 'Tarea Publica' : 'Tarea Privada'}
          </label>

        </div>
          :
          //no asignadas
        <div className="flex items-center">
           <input
               type="checkbox"
               id="isPublic"
               checked={  task.isPublic}
               onChange={() => console.log('Cambiar visibilidad')}
                
               className={`mr-2 ${  task.isPublic ? 'accent-blue-500' : 'accent-red-500'}`}
             />
             <label htmlFor="isPublic"> { task.isPublic ? 'Tarea Publica' : 'Tarea Privada'}
             </label>

        </div>
      }
        {/**mostrar el boton de completar */}
        { 
        assigned ?
        <div> 
          { 
              // el usuario al que le asignaron la tarea puede actualizarla
              task.assignedTo !== state.id   ? '' :
              <button     
                onClick={handleComplete}
                disabled={loading}
                className={` px-4 py-2 rounded-md transition-colors  duration-300  ${  
                  loading
                  ? 'opacity-50 py-1 px-2 cursor-not-allowed'
                    //el balor de completed es boleano de pendiendo si es true o false cambiara los estilos
                  : task && task.task.completed    
                  ?  'bg-gray-600 text-white hover:bg-gray-700' 
                  : "bg-green-500 hover:bg-green-600 text-white" }   `}
              >
                  {
                    task && task.task.completed   ? 'Completado' : 'Completar'
                  }
              </button>

          
            }
        </div>
          :
        <div> 
          { 
          //solo el usuario que creo la tarea puede completar la tarea
            task.user.id !== state.id   ? '' :
            <button     
              onClick={handleComplete}
              disabled={loading}
              className={` px-4 py-2 rounded-md transition-colors  duration-300  ${  
                loading
                ? 'opacity-50 py-1 px-2 cursor-not-allowed'
                  //el balor de completed es boleano de pendiendo si es true o false cambiara los estilos
                :task.completed    
                ?  'bg-gray-600 text-white hover:bg-gray-700' 
                : "bg-green-500 hover:bg-green-600 text-white" }   `}
            >
                {
                  task.completed   ? 'Completado' : 'Completar'
                }
            </button>

            
          }
        </div>
        }
      </div>


      {isAssigning && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Asignar tarea a:</h3>
          <UserListTask 
            users={userFollowers}
            task={task}
            onSelectUser={(userId) => {
              console.log(`Asignar tarea a usuario con ID: ${userId}`);
              setIsAssigning(false);
            }}
          />
        </div>
      )}


      <div>
        { 
        //si la tarea es asignada no mostrar el icono de comentarios ni los comentarios
        assigned ? '' :
        <button
          onClick={toggleComments}
          className="flex items-center text-gray-400 hover:text-white transition-colors"
        >

          <MessageSquare className="w-5 h-5 mr-2" />
          <span>{
          // eslint-disable-next-line react/prop-types
          comments &&  comments.length} comentarios</span>
        </button>
        }
        
         

          {
            
            
            commentsVisible && (
              <>
              
              <div className="mt-4 flex">
              <input
                type="text"
                // eslint-disable-next-line react/prop-types
                value={newComment.comment}
                name='comment'
                onChange={handleChange}
                required
                placeholder="Escribe un comentario..."
                className="flex-grow bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                
              />
              <button
                onClick={handleSubmit}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-r-md transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>

              {
              // eslint-disable-next-line react/prop-types
              comments && comments.length === 0 ? notComment : <CommentListStyles comments={comments} />}
            
              </>
            
            )
            
          }
            
      </div>
    </div>
  );
};


TaskDetailStyles.propTypes = {
  task: PropTypes.shape({
    id:PropTypes.string.isRequired,
    title:PropTypes.string,
    description:PropTypes.string,
    priority:PropTypes.string ,
    createdAt:PropTypes.string ,
    expiration_date:PropTypes.string,
    expiration_time:PropTypes.string ,
    isPublic:PropTypes.bool ,
    completed:PropTypes.bool ,
    assignedTo:PropTypes.string ,
    task: PropTypes.shape({
      id:PropTypes.string.isRequired,
      title:PropTypes.string,
      description:PropTypes.string,
      priority:PropTypes.string ,
      createdAt:PropTypes.string ,
      expiration_date:PropTypes.string,
      expiration_time:PropTypes.string ,
      isPublic:PropTypes.bool ,
      completed:PropTypes.bool ,
    }),
    user:PropTypes.shape({
      username:PropTypes.string.isRequired,
      id:PropTypes.string.isRequired
    })
  }),

  handleChange: PropTypes.func, 
  handleSubmit: PropTypes.func 
}
