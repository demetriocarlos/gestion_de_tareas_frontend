 
import { useGetAssignament } from "../hooks/useTask"
import { Spinner } from "./Styles/Spinner"
import { ErrorMessage } from "./Styles/ErrorMessage"
import { TaskListStyles } from "./Styles/TaskListStyles"

export const TaskListAssignament = () => {
  const {data:taskAssignament, isLoading, error}= useGetAssignament()

  if(isLoading){
    return <div><Spinner /></div>
  }

  if(error){
    return <div><ErrorMessage /></div>
  }
 
   
  const sortedTask = taskAssignament.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));


  return (
    <div className="   text-orange-400 ">TaskListAssignament
        <TaskListStyles
          tasks={sortedTask}
          assigned = {true}
          ispublic={false}
          //user= {users}
        />
    </div>
  )
}
          