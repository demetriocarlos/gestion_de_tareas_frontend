import axios from "axios";
const baseUrl = import.meta.env.VITE_API_URL;
const logins = 'login'
import { toast } from "react-toastify";

// Función para hacer la solicitud de inicio de sesión
const login = async (credentials) => {
    try{
        const response = await axios.post(`${baseUrl}${logins}`, credentials)
        toast.success("¡Bienvenido a tus Tareas!")
        return response.data
    }catch(error){
        toast.error(error.response?.data?.error || 'Error desconocido')
        console.error('error al iniciar sesion', error)
    }
    
}
     

export default {login}