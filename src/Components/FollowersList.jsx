 
import { UserListStyle } from './Styles/UserListStyle';
import { useGetFollowersId} from '../hooks/useTask';
import { useAuth } from '../hooks/useAuth';
import { useParams } from 'react-router-dom';
import { useGetUser } from '../hooks/useUsers';
 
 
export const FollowersList = () => {
const {state} = useAuth()
const id = useParams().id
 
//cargar los datos por la ruta o por usuario autentificado
const userIdentifier = id || state.id

  const {data: users} = useGetUser(userIdentifier)
  const { data: followers } = useGetFollowersId(userIdentifier);
        
  const  title = `Usuarios que siguen a ${users.username}`
   
  const usersFollowers = followers?.map((follow) => follow.follower) || [];
  

  return (
    <div className="min-h-screen bg-gray-950 py-12">
      <UserListStyle
        users={usersFollowers}
        title={ title}
      />
    </div>
  );
};
