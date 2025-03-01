 
//import { useAuth } from "../../hooks/useAuth";
//import NavigationBar from "../components/NavigationBar"
import { NavigationBar } from "./NavigationBar"
import { MyTasks } from "../MyTasks";
import { TaskListAssignament } from "../TaskListAssignament";
import { useState } from "react";
 
export  const TaskNavigationPage = () => {
  //const {state} = useAuth()
  const [navigate,setNavigate] = useState('')
  const navigationItems = [
    { id: "myTasks", label: "Mis Tareas" , to:"myTasks" },
    { id: "assigned-tasks", label: "Tareas Asignadas", to:"assigned-tasks" },
  ]

  const handleNavigate = (id ) => {
     
    setNavigate(id)
    // Aquí puedes agregar la lógica para cambiar la vista o cargar diferentes datos
  }

   

  return (
    <div className="min-h-screen bg-gray-950 py-12">
      <div className=" ">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Gestión de Tareas</h1>
        <NavigationBar items={navigationItems} onNavigate={handleNavigate} setNavigate={setNavigate} />
        {/* Aquí iría el contenido de la página seleccionada */}
        <div className="">

          { 
            navigate == 'assigned-tasks' ? <TaskListAssignament /> :<MyTasks/>
          }
           
              
        </div>
      </div>
    </div>
  )
}

 

