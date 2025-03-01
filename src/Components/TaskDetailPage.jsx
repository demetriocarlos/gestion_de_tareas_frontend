
import { TaskDetailStyles } from "./Styles/TaskDetailStyles";
import { useParams } from "react-router-dom";
import { useGetTaskId } from "../hooks/useTask";
import { Spinner } from "./Styles/Spinner";
import { ErrorMessage } from "./Styles/ErrorMessage";
import { useState } from "react";
import { useCreateComment } from "../hooks/useTask"; 
import { useGetComments } from "../hooks/useTask"; 
import { useCreateSubTask } from "../hooks/useTask";
import { useGetSubTask } from "../hooks/useTask";
import { useDeleteTask } from "../hooks/useTask";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
 
import { useNavigate } from "react-router-dom";

export const TaskDetailPage  = () => {

const id = useParams().id
const newCommentMutation = useCreateComment()
const newSubTaskMutation = useCreateSubTask()
const deleteTaskMutation = useDeleteTask()
const location = useLocation();

const {data: task, isLoading, error} =useGetTaskId(id)
const {data:comment} = useGetComments(id)
const {data:subTask} = useGetSubTask(id)

const [newComment, setNewComment] = useState({comment:'', taskId: ''});
const [newSubTask, setNewSubTask] = useState({subTasks:'', taskId:''})
const navigate = useNavigate()



useEffect(() => {
  if (location.hash) {
      const commentId = location.hash.replace('#comment-', '');
      const commentElement = document.getElementById(`comment-${commentId}`);
      if (commentElement) {
          commentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          commentElement.style.backgroundColor = '#f0f8ff'; // Resaltar comentario
          setTimeout(() => {
              commentElement.style.backgroundColor = 'transparent';
          }, 2000);
      }
  }
}, [location]);


/*
useEffect(() => {
  if (location.hash.startsWith("#comment-")) {
    const commentId = location.hash.substring(1); // Quita el `#`
    const commentElement = document.getElementById(commentId);
    if (commentElement) {
      commentElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
}, [location]);
*/

     // Actualiza `taskId` cuando `task` esté disponible
  if (task && newComment.taskId === "") {
    setNewComment((prev) => ({ ...prev, taskId: task.id }));
  }
  
  // Actualiza `taskId` cuando `task` esté disponible
  if(task && newSubTask.taskId ===""){
    setNewSubTask((prev)=> ({...prev, taskId:task.id}))
  }


if(isLoading){
  return <div><Spinner/></div>
}

if(error){
  return <div><ErrorMessage text={'Error al cargar la Tarea'} message={error.message} /></div>
}




 
const handleChange = (e) => {
  const {name, value} = e.target;
  setNewComment({...newComment, [name]:value})
}



//agregar un nuevo comentario
const handleAddComment = (e) => {
   e.preventDefault()
 
    
      // Verifica si el `taskId` está presente antes de mutar
    if (!newComment.taskId) {
      console.error("El ID de la tarea no está disponible.");
      return;
    }
    
   setNewComment({
    comment:'',
    taskId:''
   })
   newCommentMutation.mutate(newComment) 
    
   /*newCommentMutation.mutate(newComment, {
    onSuccess: () => {
      // Limpia el comentario solo después de un envío exitoso
      setNewComment((prev) => ({ ...prev, comment: "" }));
    },
    onError: (error) => {
      console.error("Error al agregar comentario:", error);
    },
  });  */  
   

};


const handleSubTask = (e) => {
  const {name, value} = e.target;
  setNewSubTask({...newSubTask, [name]: value})
}

//agregar una nueva subtask
const handleNewSubTask = (e) => {
  e.preventDefault()

   // Verifica si el `taskId` está presente antes de mutar
   if (!newSubTask.taskId) {
    console.error("El ID de la tarea no está disponible.");
    return;
  }

  setNewSubTask({
    subTasks:'',
    taskId:''
  })

  newSubTaskMutation.mutate(newSubTask)

}

//eliminar tarea
const handleDeleteTask = ()  =>{
  if(window.confirm(`¿Eestas seguro que quieres eliminar la Tarea ${task.title}`)){
    return deleteTaskMutation.mutate(task.id, {
      onSuccess: () => {
         
        navigate('/myTasks'); // Redirige al usuario a la lista de tareas
      },
    })
  }  
  
}




 //console.log('task', task)
  
  return (
    <div className="min-h-screen bg-gray-950 py-12">
      <TaskDetailStyles 
        task={task} 
        handleDeleteTask={handleDeleteTask}
        comments={comment} 
        handleSubmit={handleAddComment}
        handleChange={handleChange}
        newComment={newComment}

        handleSubTask={handleSubTask}
        handleNewSubTask= {handleNewSubTask}
        newSubTask={newSubTask}
        subTask={subTask}
      />
    </div>
  );
};
 
