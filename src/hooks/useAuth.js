import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import loginServices from "../services/loginServices";

// Crear un hook para usar el contexto de autenticación
export const useAuth = ()=> {
    return useContext(AuthContext)
}



 

export const useLogin = () =>{
    const {login:loginContext}= useAuth();// Obtener la función de login del contexto
    const loginMutation = useMutation({
        mutationFn:loginServices.login,
        onSuccess:(data) =>{
            const userData = {username:data.username, token: data.token, id: data.id};
            // Almacenar el token y los datos del usuario en localStorage
            localStorage.setItem('token',data.token);
            localStorage.setItem('loggedInUser', JSON.stringify(userData))

            loginContext(userData.username,userData.token,userData.id);// Guardar la información del usuario en el contexto
        },
        onError:(error)=>{
            console.error('Error al iniciar sesion', error)
        }
    })

    return loginMutation
}
