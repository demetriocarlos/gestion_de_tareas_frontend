
import { UserListStyle } from "./Styles/UserListStyle"
import { useGetFollowingId } from "../hooks/useTask"
import { useParams } from "react-router-dom"
import { useAuth } from "../hooks/useAuth";
import { useGetUser } from "../hooks/useUsers";
 
export const FollowingList = () => {
  const id = useParams().id;
  const {state}= useAuth()
   
  //cargar los datos por la ruta o por usuario autentificado
  const userIdentifier = id || state.id;

  const {data: users} = useGetUser(userIdentifier)
    const {data:following} = useGetFollowingId(userIdentifier)
     
    const userFollowing = following?.map((follow) => follow.following) || [];
     
 
    const  title = `Usuarios que sigue ${users && users.username}`

  return (
    <div className="min-h-screen bg-gray-950 py-12"> 
        <UserListStyle
        users={userFollowing}
        title={title}
        />
    </div>
  )
}
 