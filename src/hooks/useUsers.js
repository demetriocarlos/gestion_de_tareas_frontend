//import { useQuery } from "@tanstack/react-query";
import 'react-toastify/dist/ReactToastify.css'
import userServices from "../services/userServices";
//import { useQuery } from 'react-query';
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
       

export const useCreateUser = () => {
    const navigate = useNavigate()

    const newUserMutation = useMutation({
        mutationFn:userServices.createUser,
        onSuccess:(data) => {

             
            // Redirige al componente de inicio de sesión
            if(data !== undefined){
                navigate('/login')
                toast.success("Ya puedes iniciar sesion", {
                    autoClose: 10000
                })
            }
            
        },
        onError:(error) => {
            console.error('Error al crear una cuenta', error)
            toast.error(error.response?.data?.error || 'Error desconocido')
            
        }
    })
    return newUserMutation
}


 

export const useGetUser = (userIdentifier) => {
    return useQuery({
      queryKey: ['user', userIdentifier], // Clave única para identificar la consulta
      queryFn: () => userServices.getUsers(userIdentifier), // Función que obtiene los datos
      enabled: !!userIdentifier, // Solo ejecuta si userIdentifier es válido
      onError: (error) => {
        console.error('Error al obtener el usuario:', error.message);
      },
    });
  };



export const useGetSearchUsers = (query) => {
    return useQuery({
        queryKey: ['searchUsers', query],
        queryFn: () => userServices.getSearchUsers(query),
        enabled: !!query, // Solo ejecuta la búsqueda si hay un término
    })
}



