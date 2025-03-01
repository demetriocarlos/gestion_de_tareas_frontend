
import { TaskListStyles } from "./Styles/TaskListStyles"
import { useGetTaskIsPublic } from "../hooks/useTask";
import { Spinner } from "./Styles/Spinner";
import { ErrorMessage } from "./Styles/ErrorMessage";
 
export const TaskList = () => {
  const {data :task, isLoading, error} = useGetTaskIsPublic()


   
  //console.log('task', task)

  if (isLoading){
    return <div><Spinner /></div>
}


if(error)  {
    return <div><ErrorMessage text={'Error al cargar los usuarios:'} message={error.message} /></div>
}
 
const sortedTask = task.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

 
  return (
    <div>
      <TaskListStyles 
        tasks={sortedTask}
        ispublic={true} 
      />
    </div>
  )
}
