 import { useState } from "react"
import { useCreateUser } from "../hooks/useUsers"
import { IniciarSesionStyles } from "./Styles/IniciarSesionStyles"

export const CreateAccount = () => {
    const newUserMutation = useCreateUser()
    const [credentials, setCredentials] = useState({username:'', gmail:'', password:''})

    const handleChange = (e) =>{
      const {name,value}= e.target;
      setCredentials({...credentials, [name]:value})
    }

    const handleSubmit = (event) => {
      event.preventDefault()
      setCredentials({
        username:'', 
        gmail:'',
        password:''
      })
      newUserMutation.mutate(credentials)
    }

//let login = null
  return (
    <div>
      <IniciarSesionStyles
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        credentials={credentials}
        login={false}
        texto={'Crea tu cuenta para empezar a organizar tus tareas'}
      />
    </div>
  )
}
