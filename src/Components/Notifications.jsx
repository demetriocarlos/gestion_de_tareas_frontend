
import { NotificationList } from "./Styles/NotificationList"
import { useGetNotification } from "../hooks/useTask"
import { Spinner } from "./Styles/Spinner"
import { ErrorMessage } from "./Styles/ErrorMessage"
import { useUpdateNotification } from "../hooks/useTask"
import { useState } from "react"


export const Notifications = () => {
  
  const {data:notification, isLoading, error} = useGetNotification()
  const updatedNotification = useUpdateNotification()


  const [openMenuId, setOpenMenuId] = useState(null); // Estado para rastrear el menú abierto

  if(isLoading){
    return <dir><Spinner/></dir>
  }

  if(error){
    <div><ErrorMessage message={'Error al cargar las notificaciones'} /></div>
  }

 


  
  const handleNotificationClick = (notification ) => {
     
    
    if (notification.isRead !== true){
      updatedNotification.mutate({
        id:notification.id,
        isRead: true
      })
    }
       

  }



  const handleOptionsClick = (id ) => {
    setOpenMenuId((prevId) => (prevId === id ? null : id));

  }

 //console.log('notification', notification)

 
 const sortedNotification = notification && notification.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const sinTonification = <div className="text-center text-white">No hay notificaciones</div>
  
  return (
    <div className="min-h-screen bg-gray-950 py-12">
    <div className="container mx-auto px-4">
    
      {
        notification.length == 0
        ? sinTonification 
        : 
        <NotificationList
        notifications={sortedNotification}
        onNotificationClick={handleNotificationClick}
        onOptionsClick={handleOptionsClick}
        openMenuId={openMenuId}
      />
      }
      
    </div>
  </div>
  )
}
