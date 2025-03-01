import taskServices from "../services/taskServices";

import {  useQueryClient, useMutation,   useQuery,      } from "@tanstack/react-query";
import { toast } from "react-toastify";


//crear tarea
export const useCreateTask = () => {
    const queryClient = useQueryClient()// Obtener el cliente de consultas de React Query
    const createTaskMutation =  useMutation({
        mutationFn:taskServices.createTask,
        onSuccess:(/**newTask */) => { 
            
            // Invalidar y refetch las consultas relacionadas
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
            //const task = queryClient.getQueryData(["tasks"])
            //queryClient.setQueryData(["tasks"], task.concat(newTask))

            //toast.success('Tarea creada correctamente')
        },
        onError:(error) => {
            toast.error('Error al crear una nueva tarea')
            console.error('Error al crear una nueva tarea',error)

        }
    })

    return createTaskMutation
}

export const useGetTaskIsPublic = () => {
    return useQuery({
        queryKey: ["tasks"],
        queryFn:taskServices.getTaskIsPublic,
        onSuccess: () =>{},
        onError:(error) =>{
            toast.error('Error al obtener las tareas')
            console.error('Error al obtener las tareas', error)
        }

    })
}


export const useGetTaskId = (id) => {
    return useQuery({
        queryKey:["tasks",id ],
        queryFn: () => taskServices.getTaskId(id),
        enabled: !! id ,//solo ejecutar si el id es valido
        onError:(error) =>{
            toast.error('Error al obtener las tareas por id')
            console.error('Error al obtener las tareas por id',error)
        }
    })
}

export const useGetMyTask = () => {
    return useQuery({
        queryKey: ["my-tasks"],
        queryFn:taskServices.getMyTasks,
        onSuccess:() =>{},
        onError:(error) =>{
            toast.error('Error al obtener las tareas')
            console.error('Error al obtener mis tareas', error)
        },
    })
}

export const useGetUserTaskPublic = (id) => {
    return useQuery({
        queryKey: ["tasks",id ],
        queryFn:() => taskServices.getUserTaskPublic(id),
        enabled: !! id ,//solo ejecutar si el id es valido
        onError:(error) =>{
           // toast.error('Error al obtener las tareas publicas de')
            console.error('Error al obtener las tareas publicas del usuario',error)
        }

    })
}


//actualizar tarea con la propiedad completed
export const useUpdateTaskCompleted = () =>  {
    const queryClient = useQueryClient()
        
    const createMutation = useMutation ({
        mutationFn :({id,  completed}) => taskServices.updateTaskCompleted(id, {completed}),
        onSuccess:(updatedTask ) => {
             

            //console.log('updatedTask',updatedTask)
                queryClient.setQueryData(["tasks", updatedTask.id], (oldTask) => {
                    if (!oldTask) return null;
                    // Actualizar solo la propiedad "completed" de la tarea.
                    return { ...oldTask, completed: updatedTask.completed };
                });

            // Invalidar todas las tareas para garantizar la consistencia.
            queryClient.invalidateQueries(["tasks"])     
        },
        onError:() =>{
            console.error('Error al actualizar la propiedad de task')
        }
    })

    return  createMutation
}

//actualizar tarea con la propiedad isPublic
export const useUpdateTaskIsPublic = () =>  {
    const queryClient = useQueryClient()
        
    const createMutation = useMutation ({
        mutationFn :({id, isPublic}) => taskServices.updateTaskIsPublic(id, {isPublic}),
        onSuccess:(updatedTask ) => {
             

                queryClient.setQueryData(["tasks", updatedTask.id], (oldTask) => {
                    if (!oldTask) return null;
                    // Actualizar solo la propiedad "completed" de la tarea.
                    return { ...oldTask, isPublic: updatedTask.isPublic};
                });

            // Invalidar todas las tareas para garantizar la consistencia.
            queryClient.invalidateQueries(["tasks"])     
        },
        onError:() =>{
            console.error('Error al actualizar la propiedad de task')
        }
    })

    return  createMutation
}
       
//eliminar tarea
export const useDeleteTask = () => {
    const queryClient = useQueryClient()
    const createMutation = useMutation({
        mutationFn: taskServices.deleteTask,
        onSuccess:() =>{
            queryClient.invalidateQueries(["my-tasks"])
        },
        onError:(error) =>{
            console.error('Error al eliminar la tarea',error)
        }
    })

    return createMutation
}




export const useCreateSubTask = () => {
    const queryClient = useQueryClient()
    const createMutation = useMutation({
        mutationFn: taskServices.createSubTask,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:["subTask"]})
        },
        onError: (error) => {
            toast('Error al crear una subtarea')
            console.error('Error al crear una subtarea', error)
        }
    })

    return createMutation
}

export const useGetSubTask = (id) =>{
     return useQuery({
        queryKey:["subTask", id],
        queryFn: () => taskServices.getSubtask(id),
        enabled: !! id,//solo ejecutar si el id es valido
        onError:(error) => {
            toast("Error al cargar la lista de subtareas")
            console.error("Error al cargar la lista de subtareas", error)
        }
     })
}


    
//crear comentario
export const useCreateComment = () => {
    const queryClient = useQueryClient()
    const createkMutation= useMutation({
        mutationFn: taskServices.createComments,
        onSuccess:() =>{
            queryClient.invalidateQueries({queryKey:["comments"]})
        },onError:(error) =>{
            toast.error('Error al crear un nuevo comentario')
            console.error('Error al crear un nuevo comentario', error)
        }
    })

    return createkMutation
}

export const useGetComments = (id) => {
    return  useQuery({
        queryKey:["comments", id],
        queryFn:() => taskServices.getComments(id),
        enabled: !! id, //solo ejecutar si el id es valido
        onError:(error) => {
            toast.error('Error al cargar los comentarios')
            console.error('Error al cargar los comentarios', error)
        }
    })
}

 export const  useUpdateLikeComment = () => {
    const queryClient = useQueryClient()
    
    const createMutation = useMutation ({
        // La función que ejecutará la mutación, recibe un objeto con `id` (del comentario) y `likes` (los datos que se quieren actualizar).
        mutationFn:   ({ id, likes }) => taskServices.updateLIkeComment(id, { likes }),
         // Se ejecuta cuando la mutación es exitosa.
        onSuccess: (updatedComment, variables) => {

            // `updatedComment` contiene los datos actualizados devueltos por el servidor.
            // `variables` contiene los parámetros pasados a la función `mutate`.

             
             const { taskId } = variables; // Obtener el ID de la tarea relacionado con los comentarios.

             // Actualizar los datos de la caché en React Query para que reflejen los cambios.
             queryClient.setQueryData(["comments", taskId], (oldComments = []) => {
                 
                 return oldComments.map((comment) =>
                    // Buscar el comentario actualizado por su ID y reemplazar sus datos en la caché.
                     comment.id === updatedComment.id ? 
                        { ...comment, likes: updatedComment.likes } // Actualizar los "likes" del comentario.
                        : comment // Dejar los demás comentarios sin cambios.
                 );
             });
              
            // Invalida las consultas para forzar una nueva actualización
            queryClient.invalidateQueries(["comments", taskId]);
        }, onError:(error) => {
            toast.error('Error al actualizar los likes de los comentarios')
            console.error('Error al actualizar los likes de los comentarios', error)
        }
    })

    return createMutation;
}

export const useDeleteComment = () =>{
    const queryClient = useQueryClient()

    const createMutation = useMutation({
        mutationFn:taskServices.deleteComment,
        onSuccess: () =>{
            queryClient.invalidateQueries(["comments"])
        },onError:(error) =>{
            console.log('Error al eliminar este comentario', error)
        }
    })
    
    return createMutation
}



 



//crear seguimiento de un usuario
export const useCreateFollow= () =>{
    const queryClient = useQueryClient()
    //(userId) => taskServices.createFollow(userId),
    const newMutation = useMutation({
        mutationFn: taskServices.createFollow , // Recibe el `userId`,
        onSuccess: () =>{
             
            queryClient.invalidateQueries({ queryKey: ['followers'] }); // Actualiza la lista de seguidores
            queryClient.invalidateQueries({ queryKey: ['following'] }); // Actualiza la lista de usuarios seguidos
 
        },
        onError:(error) =>{
            console.error('Error al seguir', error)
        }
    })

    return newMutation
}
 

export const useGetFollowers = () => {
    return useQuery({
        queryKey:['followers'], // Clave de caché
        queryFn:taskServices.getFollowers, // Llama al servicio correspondiente
        onSuccess:() => {

        },
        onError:(error) =>{
            console.error('Error al cargar los usuarios seguidos', error)
        }
    })
}


// Obtener la lista de usuarios seguidos del usuario autentificado
export const useGetFollowing = () => {
    return useQuery({
        queryKey:['following'], // Clave de caché
        queryFn:taskServices.getFollowing, // Llama al servicio correspondiente
        onSuccess:() => {

        },
        onError:(error) =>{
            console.error('Error al cargar los usuarios seguidos', error)
        }
    })
}

export const useDeleteFollwing = () => {
    const queryClient = useQueryClient()
    const deliteFollwen = useMutation({
        mutationFn:taskServices.deleteFollowing,
        onSuccess: () => {
            queryClient.invalidateQueries(["following"])
        },
        onError: (error) => {
            console.log('Error al dejar de seguir al usuario',error)
        }
    })
    return deliteFollwen;
}

export const useGetFollowingId = (userIdentifier) => {
    return useQuery({
      queryKey: ['following', userIdentifier], // Clave única para identificar la consulta
      queryFn: () => taskServices.getFollowingId(userIdentifier), // Función que obtiene los datos
      enabled: !!userIdentifier, // Solo ejecuta si userIdentifier es válido
      onError: (error) => {
        console.error('Error al cargar los usuarios seguidos', error.message);
      },
    });
  };


  export const useGetFollowersId = (userIdentifier) => {
    return useQuery({
      queryKey: ['followers', userIdentifier], // Clave única para identificar la consulta
      queryFn: () => taskServices.getFollowersId (userIdentifier), // Función que obtiene los datos
      enabled: !!userIdentifier, // Solo ejecuta si userIdentifier es válido
      onError: (error) => {
        console.error('Error al cargar los seguidores', error.message);
      },
    });
  };



//crear asignamiento de una tarea
export const useCreateAssignament = () => {
    const queryClient = useQueryClient ()
    const createMutation =  useMutation({
        mutationFn: taskServices.createAssignament,
        onSuccess:() =>{
            queryClient.invalidateQueries({queryKey:["taskAssignament"]})
        },
        onError:() =>{
            console.error('Error al asignar la tarea')
        }
    })

    return createMutation
}
//cargar tareas asignadas
export const useGetAssignament = () => {
    return useQuery({
        queryKey:["taskAssignament"],
        queryFn:taskServices.getAssignament,
        onError:() => {
            console.error('Error al cargar las tareas asignadas')
        }
    })
}

//cargar tarea asignada por id
export const useGetAssignamentId = (id) => {
    return useQuery({
        queryKey:["taskAssignament",id],
        queryFn: () => taskServices.getAssignamentId(id),
        enabled: !! id ,//solo ejecutar si el id es valido
        onError:() =>{
            console.error('Error al cargar las tareas asignadas')
        }
    })
}

//actualizar tareas asignadas
export const  useUpdateAssignament = () =>  {
    const queryClient = useQueryClient()
        
    const createMutation = useMutation ({
        mutationFn :({id,  completed}) => taskServices.updateAssignament(id, {completed}),
        onSuccess:(updatedTask ) => {
             

            //console.log('updatedTask',updatedTask)
                queryClient.setQueryData(["taskAssignament", updatedTask.id], (oldTask) => {
                    if (!oldTask) return null;
                    // Actualizar solo la propiedad "completed" de la tarea.
                    return { ...oldTask, completed: updatedTask.completed };
                });

            // Invalidar todas las tareas para garantizar la consistencia.
            queryClient.invalidateQueries(["taskAssignament"])     
        },
        onError:() =>{
            console.error('Error al actualizar la propiedad de task')
        }
    })

    return  createMutation
}
   
//eliminar la tarea asignada
export const useDeleteAssignament = () => {
    const queryClient = useQueryClient()
    const createMutation = useMutation({
        mutationFn : taskServices.deleteAssignament,
        onSuccess: ()=> {
            queryClient.invalidateQueries(['taskAssignament'])
        },
        onError:(error)=> {
            console.error('Error al eliminar la subtarea',error)
        }
    })

    return createMutation
}



//obtener las notificaciones
export const useGetNotification = () => {
    return useQuery({
        queryKey:["notification"],
        queryFn:taskServices.getNotification,
        onError: () => {
            console.error("Error al cargar las notificaciones")
        }
    })
}

//actualizar el campo isRead
export const useUpdateNotification =  () =>  {
    const queryClient = useQueryClient()
    const createMutation = useMutation({
        mutationFn:({id,isRead}) => taskServices.updateNotification(id, {isRead}),
        onSuccess:(updateNotification, variables) => {

            const {id} =variables

            queryClient.setQueryData(["notification", id], (oldNotification = []) => {
                 
                return oldNotification.map((notification) =>
                   // Buscar la notificacion actualizado por su ID y reemplazar sus datos en la caché.
                    notification.id === updateNotification.id ? 
                       { ...notification, isRead: updateNotification.isRead } // Actualizar  isRead de las notificaciones
                       : notification // Dejar las demás  notificaciones sin cambios.
                );
            });

            queryClient.invalidateQueries(["comments"])
        }
    })

    return createMutation;
}

//eliminar notificacion
export const useDeleteNotification = () => {
    const queryClient = useQueryClient()
    const createMutation = useMutation({
        mutationFn:taskServices.deleteNotification,
        onSuccess:() => {
            queryClient.invalidateQueries(["notification"])
        },
        onError:(error) => {
            console.error('Error al eliminar la notificacion', error)
        }
    })

    return createMutation;
}


export const useDeleteAllNotification = () => {
    const queryClient = useQueryClient()
    const createMutation = useMutation({
        mutationFn: taskServices.deleteAllNotification,
        onSuccess:() => {
            queryClient.invalidateQueries(["notification"])
        },
        onError:(error) =>{
            console.error('Error al eliminar las notificaciones', error)
        }
    })
    return createMutation;
}


