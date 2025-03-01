 
import { User, MoreVertical, Bell, Trash2} from "lucide-react"
import { Link } from "react-router-dom"; 
import { useDeleteNotification } from "../../hooks/useTask";
import { useDeleteAllNotification } from "../../hooks/useTask";


/*interface Notification {
  id: string
  username: string
  content: string
  createdAt: Date
  isRead: boolean
}

interface NotificationListProps {
  notifications: Notification[]
  onNotificationClick: (id: string) => void
  onOptionsClick: (id: string) => void
}*/



// eslint-disable-next-line react/prop-types
export const NotificationList  = ({ notifications, onNotificationClick, onOptionsClick, openMenuId }) => {

  const deleteNotification = useDeleteNotification()
  const deleteAllNotification = useDeleteAllNotification()

  const formatTimeAgo = (date ) => {

    
    // Fecha dada en formato ISO 8601
    const givenDate = new Date(date);

    // Fecha actual
    const currentDate = new Date();

    // Diferencia en milisegundos
    const diffInMillis = currentDate - givenDate;

    // Conversión de milisegundos a unidades de tiempo
    const diffInSeconds = Math.floor(diffInMillis / 1000)
    const diffInMinutes = Math.floor(diffInMillis / (1000 * 60));
    const diffInHours = Math.floor(diffInMillis / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMillis / (1000 * 60 * 60 * 24));
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30.44); // Aproximación




    if (diffInSeconds < 60) return `${diffInSeconds} segundos`
    if (diffInMinutes < 60) return `${diffInMinutes} minutos`

    if (diffInHours < 24) return `${diffInHours} horas`
    if(diffInDays < 7 ) return `${diffInDays} días`
    if(diffInWeeks  < 4) return `${diffInWeeks} semanas`
    if(diffInMonths < 12) return `${diffInMonths} meses`
    return 'Más de un año'
  }


  const toLink = (notification) => {
    if(notification.type === 'TASK_ASSIGNED'){
      return `/assignedDetailPage/${notification.resourceId}`
    }else if(notification.type === 'TASK_COMPLETED'){  
      return `/assignedDetailPage/${notification.resourceId}`
    }else if (notification.type === 'FOLLOWED') {
      return `/users/${notification.resourceId}`
    }else if (notification.type === 'TASK_EXPIRATION'){
      return `/taskDetailPage/${notification.resourceId}`
    }else if (notification.type === 'COMMENTS' /*&& notification.commentId*/ ) {
      return `/taskDetailPage/${notification.resourceId}?showComments=true#comment-${notification.commentId}`;
    }else if (notification.type === 'LIKES_COMMENT' ) {
      return `/taskDetailPage/${notification.resourceId}?showComments=true#comment-${notification.commentId}`;
    }


    return '/';// Ruta por defecto en caso de que el tipo no coincida
  }


  const deleteAll = () => {
    console.log('Eliminar Notification')
    if(window.confirm('¿Quieres Eliminar Todas Las Notificaciones ')){
      return deleteAllNotification.mutate()
    }   
  }
    
//#comment-${notification.commentId}
  return (
    <div className="max-w-2xl mx-auto bg-gray-900/50 backdrop-blur-md rounded-lg shadow-xl p-4">
      <div className="flex items-center justify-between p-3 rounded-lg transition-colors">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
          <Bell className="mr-2" /> Notificaciones
        </h2>
         
        
        <button onClick={deleteAll} className=" hover:bg-gray-600/50 rounded-md transition-colors  relative" >
          <Trash2 
            className="m-1"
            color="white"
          />
        </button>
      </div>
      


      <ul className="space-y-2">
        {
        // eslint-disable-next-line react/prop-types
        notifications.map((notification) => (
          <div key={notification.id} >


            {
              openMenuId === notification.id &&(
                <div className="absolute right-12   ml-3    w-24 bg-gray-800 rounded-md shadow-lg z-10 ">
                  <button
                    onClick={() => deleteNotification.mutate(notification.id)}
                    className=" block w-full px-1 py-1 text-sm text-red-500 hover:bg-gray-700 hover:text-red"
                  >
                    Eliminar
                  </button>
                </div>
              )
            }
          

          <li
            
            className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
              notification.isRead ? "bg-gray-800/50 text-gray-400" : "bg-gray-700/50 text-white"
            }`}
          >

             <Link to={ toLink(notification)}>

            <div
              className="flex items-center flex-grow cursor-pointer overflow-hidden"
                
                 onClick={  () => notification.isRead !== true ? onNotificationClick(notification):''}
            >

              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0  mr-3">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex-grow">
                <p className="font-medium">{notification.sourceUser.username}</p>
                <p className="text-sm ">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-1">{formatTimeAgo(notification.createdAt) /*notification.createdAt*/} atrás</p>
              </div>
            </div>

            </Link>

           <div>
           <button
              onClick={() => onOptionsClick(notification.id)}
              className="p-1 hover:bg-gray-600/50 rounded-full transition-colors  relative"
            >
              <MoreVertical className="w-5 h-5" />
            </button>
           </div>

             

            
            
          </li>

          
          </div>
        ))}
      </ul>
    </div>
  )
}
 










