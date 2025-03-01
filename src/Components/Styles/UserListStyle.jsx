
import { User } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetFollowing , useCreateFollow, useDeleteFollwing} from '../../hooks/useTask';
import { useAuth } from '../../hooks/useAuth';
 

// eslint-disable-next-line react/prop-types
const UserItem  = ({ username,   userId, /*onFollowToggle,*/ }) => { 
  const {state} = useAuth()
  const [loading, setLoading] = useState(false);
  const {data: following} = useGetFollowing()
  const createFollow = useCreateFollow()
  const deleteFollowing = useDeleteFollwing()

  const userFollowing = following?.map((follow) => follow.following) || [];

    //verifica si  el usuario autentificado esta siguiendo algun usuario
  const isFollowing = (id) => userFollowing.some((usuario) => usuario.id === id);
  
  //seguir a un usuario
  const handleFollow = async () => {
    setLoading(true);
      // Llama al hook para crear el seguimiento
      await createFollow.mutate(userId, {
      onSettled: () => setLoading(false),
    });
  }

  //eliminar seguimiento
  const handleDelete = async () => {
    setLoading(true);
    await deleteFollowing.mutate(userId, {
      onSettled: () => setLoading(false),
    });
  };
 
return ( 
  <div className="flex items-center justify-between p-4 bg-gray-800/50 backdrop-blur-sm rounded-lg mb-2 transition-all hover:bg-gray-700/50">
     
    <div className="flex items-center">
    <Link to={`/users/${userId}`}>
      <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mr-4 hover:bg-orange-600">
        
        <User className="w-6 h-6 text-white" />
        
      </div>
      </Link>
      <span className="text-white font-medium">{username}</span>
    </div>


     
     
    { 
      
    state && state.id === userId ? '' :  
    <button
      onClick={ isFollowing(userId) ? handleDelete : handleFollow}
      disabled={loading}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
        loading
          ? 'opacity-50 py-1 px-2 cursor-not-allowed'
          : isFollowing(userId)
          ?  'bg-gray-600 text-white hover:bg-gray-700'

          :'bg-orange-500 text-white hover:bg-orange-600'

      }`}
    >
      {isFollowing(userId) ? 'Siguiendo' : 'Seguir'}
    </button>

    }

  </div>

    )
  };
 

// eslint-disable-next-line react/prop-types
export const UserListStyle  = ({ users, title,  }) => {
  
  return (
    <div className="max-w-2xl mx-auto p-4 bg-gray-900/50 backdrop-blur-md rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-6">{ title}</h2>
      <div className="space-y-2">


        {
        // eslint-disable-next-line react/prop-types
        users && users.map((user) => (
          <UserItem
            key={user.id}
            username={user.username}
            userId={user.id}
            user={user}
          />
        ))}
      </div>
    </div>
  );
};
