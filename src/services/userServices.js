import axios from "axios";
const baseUrl = import.meta.env.VITE_API_URL;
const url = 'users'
import { toast } from "react-toastify";
import api from "./api";
//import { useNavigate } from "react-router-dom";

const createUser = async (credentials) => {
    //const navigate = useNavigate()
    try{
        
        const response = await axios.post(`${baseUrl}${url}`, credentials)
       // navigate('/login')
       toast.success("cuenta creada exitosamente!")
        return response.data;
    }catch(error){
        //console.error('Hola', error.response?.data?.error)
        toast.error(error.response?.data?.error || 'Error desconocido', {
            autoClose: 10000
        })
        console.error('Error al crear un usuario', error)
    }
}


const getUsers = async (userIdentifier) =>  {
    try{
        const response = await api.get(`${baseUrl}${url}/${userIdentifier}`)
        //console.log('responseUser', response.data)
        return response.data;
    }catch(error){
        console.error('Error al cargar los usuarios', error)
    }
}


const getSearchUsers = async (query) => {
   try{
        //if (!query) return []; // Si no hay búsqueda, devuelve un array vacío
        
        const response = await api.get(`${baseUrl}${url}/search?query=${query}`)
        return response.data;
   } catch (error){
    toast.error(error.response?.data?.error || 'Error desconocido',)
    console.error('Error en la buqueda de usuarios', error)
   }
   
   
   
}



export default {createUser, getUsers, getSearchUsers}