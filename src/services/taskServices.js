
import api from "./api";
import { toast } from "react-toastify";

const createTask  = async (taskData) => {
    try{
        const response = await api.post('task', taskData)
        toast.success('Tarea Creada Exitosamente')
        return response.data
    } catch (error) {
        toast.error(error.response?.data?.error || 'Error desconocido')
        console.error('error al crear tarea', error)
    }
}

//cargar tareas publicas
const getTaskIsPublic = async () => {
    try{
        const response = await api.get('task/isPublic')
        return response.data
    }catch(error){
        toast.error(error.response?.data?.error || 'Error desconocido')
        console.error('Error al cargar las tareas', error)
    }
}

//cargar tareas por id
const getTaskId = async (id) => {
    try{
        const response = await api.get(`task/${id}/taskId`)
        return response.data
    }catch(error){
        toast.error(error.response?.data?.error || 'Error desconocido')
        console.error(('Error al cargar las tareas por id', error))
    }
}

const getMyTasks = async () => {
    try{
        const response = await api.get('task/myTasks')
        return response.data
    }catch(error){
        toast.error(error.response?.data?.error || 'Error desconocido')
        console.error('Error al cargar mis tareas', error)

    }
}


const getUserTaskPublic = async (id) =>{
    try{
        const response = await api.get(`task/${id}/userIsPublic`)
        return response.data;
    }catch(error){
        toast.error(error.response?.data?.error || 'Error desconocido')
        console.error('Error al cargar las tareas publicas del usuario',error)
    }
}

 //actulizar tarea con la propiedad completed
const updateTaskCompleted = async(id, completed) =>{
    try{
        const response = await api.put(`task/${id}/completed`,completed )
        return response.data
    }catch(error){
        toast.error(error.response?.data?.error || 'Error desconocido')
        console.error("Error al actualizar  la propiedad completed", error)
    }
}

//actulizar tarea con la propiedad  isPublic
const updateTaskIsPublic = async(id,isPublic) =>{
    try{
        const response = await api.put(`task/${id}/isPublic`,isPublic )
        return response.data
    }catch(error){
        toast.error(error.response?.data?.error || 'Error desconocido')
        console.error("Error al actualizar  la propiedad isPublic", error)
    }
}


//eliminar tarea
const deleteTask = async(taskId) =>{
    try{
        const response = await api.delete(`task/${taskId}`)
        return response.data
    }catch(error){
        toast.error(error.response?.data?.error || 'Error desconocido')
        console.error("Error al eliminar la tarea",error)
        throw error;
    }
}





//crear subtarea
const  createSubTask = async  (subTarea) =>{
    try{
        const response= await api.post(`subtask`,subTarea)
        response.data

    }catch(error){
        toast.error(error.response?.data?.error || 'Error desconocido')
        console.error('Error al crear una subTarea', error)
    }
}
//cargar subTareas
const getSubtask = async (taskId) => {
    try{
        const response = await api.get(`subtask/${taskId}`)
        return response.data
    }catch (error){
        toast.error(error.response?.data?.error || 'Error desconocido')
        console.error('Error al cargar las subtareas', error)
    }
}






//crear asignacion a un usuario
const createAssignament = async(assign)=> {
    try{
         
        const response = await api.post('taskAssignament/assign',assign)
        toast.success('Tarea asignada correctamente')
        return response.data
    }catch(error){
        toast.error(error.response?.data?.error || 'Error desconocido')
        console.error('Error al asignar una tarea a un usuario',error)
    }
}
//gargar tareas asignadas al usuario
const getAssignament = async () => {
    try{
        const response = await api.get('taskAssignament/assigned' )
        return response.data
    }catch(error){
        toast.error(error.response?.data?.error || 'Error desconocido')
        console.error("Error al cargar la tarea asignada", error)
    }
} 

const getAssignamentId = async (id) => {
    try{
        const response = await api.get(`taskAssignament/assigned/${id}`)
        return response.data
    }catch(error){
        toast.error(error.response?.data?.error || 'Error desconocido')
        console.error("Error al cargar la tarea asignada por id", error)
    }
}


//actualizar tarea asinada
const updateAssignament = async (Id, newObject) => {
    try{
        const response = await api.put(`taskAssignament/${Id}`, newObject)
        return response.data;
    }catch (error){
        toast.error(error.response?.data?.error || 'Error desconocido')
        console.error('Error al actualizar la tarea asignada', error)
        throw error;
    }
}
//eliminar tarea asignada
const deleteAssignament = async (taskId)=> {
    try{
        const response = await api.delete(`taskAssignament/${taskId}/assigned`)
        return response.data
    }catch(error){
        toast.error(error.response?.data?.error || 'Error desconocido')
        console.error('Error al eliminar la tarea asignada', error)
    }
}





//crear comentarios
const createComments = async (comment) => {
    try{
         
        const response = await api.post('comments', comment)
        return response.data
    }catch(error){
        console.error('Error al crear un comentario', error)
        toast.error(error.response?.data?.error || 'Error desconocido')
    }
}
//cargar comentarios por id de la tarea
const getComments = async (taskId) => {
    try{
        const response = await api.get(`comments/${taskId}`)
        return response.data
    }catch(error){
        toast.error(error.response?.data?.error || 'Error desconocido')
        console.error('Error al carga lista de comentarios',error)
    }
}
//actualizar like de comentarios
const updateLIkeComment = async (commentId, newObject) => {
    
    try{
       const response = await api.put(`comments/${commentId}/likes`, newObject)
       return response.data
    }catch(error){
        toast.error(error.response?.data?.error || 'Error desconocido')
        console.error('Error al actualizar los likes', error)
    }
}
//eliminar comentario
const deleteComment = async (commentId) => {
    try{
        const response = await api.delete(`comments/${commentId} `)
        return response.data
    }catch(error){
        toast.error(error.response?.data?.error || 'Error desconocido')
        console.error('Error al eliminar el comentario',error)
    }
}





const createFollow = async (userId) =>{
    
    try{
        
        const response = await api.post('follows', {followingId: userId})
        return response.data
    }catch(error){
        toast.error(error.response?.data?.error || 'Error desconocido')
        console.error('Error al realizar el seguimiento', error)
    }
}

// Obtener la lista de seguidores
const getFollowers =  async () =>{
    try{
        const response = await api.get('follows?type=followers')
        return response.data
    }catch (error){
        toast.error(error.response?.data?.error || 'Error desconocido')
        console.error('Error al cargar la lista de seguidores', error)
    }
}


// Obtener la lista de usuarios seguidos
const getFollowing = async () => {
    try{
        const response= await api.get('follows?type=following')
        return response.data
    }catch (error){
        toast.error(error.response?.data?.error || 'Error desconocido')
        console.error('Error al cargar la lista de usuarios seguidos', error)
    }
}

const deleteFollowing = async (followingId) => {
    try{
         
        const response = await api.delete(`follows/${followingId}`)
        return response.data
    }catch (error){
        toast.error(error.response?.data?.error || 'Error desconocido')
        console.error('Error al eliminar el siguimiento', error)
    }
}

// Obtener la lista de usuarios seguidos
const getFollowingId = async (userId) => {
    try{
        const response= await api.get(`follows/${userId}/following`)
        return response.data
    }catch (error){
        toast.error(error.response?.data?.error || 'Error desconocido')
        console.error('Error al cargar la lista de usuarios seguidos', error)
    }
}

const  getFollowersId = async (userId) => {
    try{
        const response= await api.get(`follows/${userId}/followers`)
        return response.data
    }catch (error){
        toast.error(error.response?.data?.error || 'Error desconocido')
        console.error('Error al cargar la lista de seguidores', error)
    }
}



//notificaciones
//cargar lista de notificaciones
const getNotification = async () =>{
    try{
        const response = await api.get('notification')
        return response.data
    }catch(error){
        console.error('Error al obtener las notificaciones', error)
        toast.error(error.response?.data?.error || 'Error desconocido')
    }
}

//actualizar la propiedad isRead
const updateNotification = async (id, newObject) => {
    try{
        const response = await api.put(`notification/${id}/read`, newObject)
        return response.data
    }catch(error){
        console.error('Error al actualizar el campo isRead de las notificaciones', error)
        toast.error(error.response?.data?.error || 'Error desconocido')
    }
}

const deleteNotification = async (id) => {
    try{
        const response = await api.delete(`notification/${id}`)
        return response.data;
    }catch(error){
        console.error('Error al eliminar la notificacion')
        toast.error(error.response?.data?.error || 'Error desconocido')
    }
}

const deleteAllNotification = async () => {
    try{
        const response = await api.delete(`notification/all`)
        toast.success('Has Eliminado todas las notificaciones')
        return response.data;
    }catch(error){
        console.error('Error al eliminar todas las notificaciones', error)
        toast.error(error.response?.data?.error || 'Error desconocido')
    }
}



export default {
     createTask,
     getTaskIsPublic, 
     getTaskId, 
     getMyTasks,
     getUserTaskPublic,
     updateTaskCompleted,
     updateTaskIsPublic,
     deleteTask,
     createSubTask,
     getSubtask,
     createFollow,  
     getFollowing, 
     getFollowers,
     deleteFollowing, 
     getFollowingId, 
     getFollowersId,
     createComments,
     getComments,
     updateLIkeComment,
     deleteComment,
     getAssignament,
     getAssignamentId,
     createAssignament,
     updateAssignament,
     deleteAssignament,
     getNotification,
     updateNotification,
     deleteNotification,
     deleteAllNotification
    }