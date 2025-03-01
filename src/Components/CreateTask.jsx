
 import { CreateTaskStyle } from "./Styles/CreateTaskStyle"
 import { useState } from "react";
 import { useCreateTask } from "../hooks/useTask";
//import { data } from "autoprefixer";
     
export const CreateTask = () => {
  const newTaskMutation = useCreateTask()
  const [taskData, setTaskData] = useState({
    title:'',
    description:'',
    priority:'', 
    categories:'',
    expiration_date:'', 
    expiration_time:'', 
    isPublic:false 
  })
  const [error, setError] = useState(''); // Para manejar errores
      const fechaActual = new Date();
      const año = fechaActual.getFullYear();
      let mes = fechaActual.getMonth() + 1; // Los meses en JavaScript son de 0 a 11
      let dia = fechaActual.getDate();
      let horas =fechaActual.getHours()
      let minutos = fechaActual.getMinutes()

         if (dia <= 9){
          dia =`${0}${dia}`
      }

      if (mes <= 9){
          mes =`${0}${mes}`
      }

       const  fechaFormateada = `${año}-${mes}-${dia}`;
       const tiempoFormateado = `${horas}:${minutos}`;

 
         // Actualiza ` priority` cuando  este vacio
  if (   taskData.priority === "") {
    setTaskData((prev) => ({ ...prev, priority: 'media' }));
  }



  const handleChange = (e) =>{   
    const {name,value}= e.target;
    setTaskData({...taskData, [name]:value})
  }     


  // Función para convertir DD/MM/AAAA a YYYY-MM-DD
  function convertDateToISO(dateString) {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  }

   
  // Ejemplo en el formulario:
  const handleSubmit = (e) => {
    e.preventDefault();
 
    if(taskData.expiration_date && !taskData.expiration_time){
      setError('Por favor, selecciona una hora si has elegido una fecha.');
      return;
    }
 
  
    if(taskData.expiration_date && taskData.expiration_date < fechaFormateada){
      setError('La fecha de expiración no puede ser anterior a la fecha actual.')
      return;
    }


    if(taskData.expiration_date === fechaFormateada && taskData.expiration_time  < tiempoFormateado){
      setError('La hora de expiración no puede ser anterior a la hora actual.')
      return;
    } 

    setError(''); // Limpiar error si todo está bien

    // Supongamos que dueDate tiene el valor en formato DD/MM/AAAA
    const formattedDate = convertDateToISO(taskData.expiration_date);

   
    setTaskData({expiration_date:formattedDate})
      
     
    setTaskData({
      title:'',
      description:'',
      priority:'',
      categories:'',
      expiration_date:'',
      expiration_time:''
    })
  
    newTaskMutation.mutate(taskData)
 
  };
 
  
  //bg-gray-900
  return (
    <div className="min-h-screen     py-12 relative">
                                                      {/**'/placeholder.svg?height=1080&width=1920&text=✓' */}
    <div className={`absolute inset-0  bg-[ url('https://via.placeholder.com/1920x1080')]  bg-repeat bg-center opacity-50`}>  </div>
   
    <div className="relative z-10">
      <CreateTaskStyle 
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        taskData ={taskData}
        setTaskData={setTaskData}
        error={error}
      />
    </div>

  </div>
  )
}
