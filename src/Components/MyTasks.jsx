
import { useGetMyTask } from "../hooks/useTask"
import { Spinner } from "./Styles/Spinner"
import { ErrorMessage } from "./Styles/ErrorMessage"
import { TaskListStyles } from "./Styles/TaskListStyles"
 
 
 export const MyTasks = () => {
  const {data : task, isLoading, error} = useGetMyTask()
   
  
  
    if(isLoading){
     return <div><Spinner/></div>
    }

    if(error){
      return <div><ErrorMessage text={'Error al cargar la Tarea'} message={error.message} /></div>
    }
 
    /**
     * bg-gray-950
     */
    const sortedTask = task.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (  
     <div className=" bg-gray-950 backdrop-blur-sm rounded-lg p-4 mb-4  "> 
          <TaskListStyles 
            tasks={sortedTask}
            title={'Mis Tareas'}
            ispublic={false}
          />
       
     </div>
   )
 }
 