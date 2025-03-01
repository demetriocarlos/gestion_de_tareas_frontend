import { useState } from "react"
import { useLogin } from "../hooks/useAuth";
import { IniciarSesionStyles } from "./Styles/IniciarSesionStyles";


export const LoginForm = () => {
  const [credentials,setCredentials] = useState({  gmail:'', password:''});
  const mutation = useLogin()

  const handleChange= (e) => {
    const {name, value} = e.target;
    setCredentials({...credentials, [name]:value})
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setCredentials({
      gmail:'',
      password:''
    })

    mutation.mutate(credentials) // Ejecutar la mutación con las credenciales del usuario
  }


  return (
    <div>
      <IniciarSesionStyles
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        credentials={credentials}
        login={true}
        texto={'Inicia Sesion Ahora'}
      />
    </div>
  )
}
