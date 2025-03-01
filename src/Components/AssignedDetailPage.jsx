
import { TaskDetailStyles } from "./Styles/TaskDetailStyles"
import { useGetAssignamentId } from "../hooks/useTask"
import { useParams } from "react-router-dom"
import { Spinner } from "./Styles/Spinner"
import { ErrorMessage } from "./Styles/ErrorMessage"


export const AssignedDetailPage = () => {
  const id = useParams().id

  const {data:taskAssignament, isLoading, error} = useGetAssignamentId(id)

  if(isLoading){
    return <div><Spinner /></div>
  }

  if(error){
    return <div><ErrorMessage text={'Error al cargar la tarea asignada'} /></div>
  }

  //console.log('taskAssignament', taskAssignament)

  return (
    <div className="min-h-screen bg-gray-950 py-12">
      <TaskDetailStyles
      task={ taskAssignament}
      assigned ={true}
      />
    </div>
    
  )
}
