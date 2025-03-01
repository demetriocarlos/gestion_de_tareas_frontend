 
import { User, } from 'lucide-react';
import { useCreateFollow } from '../../hooks/useTask';
import { useAuth } from '../../hooks/useAuth';
import { useDeleteFollwing } from '../../hooks/useTask';
import { useGetFollowing } from '../../hooks/useTask';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
 
import { useGetUserTaskPublic } from '../../hooks/useTask';
import { TaskListStyles } from './TaskListStyles';
import { Spinner } from './Spinner';
import { ErrorMessage } from './ErrorMessage';
 
export const UserStyle =  ({username, userId,  followersCount,followingCount, }) => {
  const {state} = useAuth()
  const {data: following} = useGetFollowing()
  const {data: task, isLoading, error} = useGetUserTaskPublic(userId)
  const createFollow = useCreateFollow()
  const deleteFollowing = useDeleteFollwing()
  const [loading, setLoading] = useState(false);

  const userFollowing = following?.map((follow) => follow.following) || [];

  //verifica si  el usuario autentificado esta siguiendo algun usuario
  const isFollowing = (id) => userFollowing.some((usuario) => usuario.id === id);
   

  const handleFollow = async () => {
    setLoading(true);
    //createFollow.mutate(userId) // Llama al hook para crear el seguimiento
      await createFollow.mutate(userId, {
      onSettled: () => setLoading(false),
    });
  }

  const handleDelete = async () => {
    setLoading(true);
    await deleteFollowing.mutate(userId, {
      onSettled: () => setLoading(false),
    });
  };

  const sortedTask = task && task.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

   
  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-900/50 backdrop-blur-md rounded-lg shadow-xl p-6 md:p-8">
          <div className="flex flex-col items-center md:flex-row md:items-start mb-6">
            <div className="mb-4 md:mb-0 md:mr-6">
              <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center">
                <User className="w-16 h-16 text-white" />
              </div>
            </div>
            <div className="text-center md:text-left flex-grow">
              <h1 className="text-2xl font-bold mb-4">{username}</h1>
              <div className="flex justify-center md:justify-start space-x-4 mb-4">
                <div className="text-center">
                  
                    <p className="font-bold">{task && task.length}</p>
                    <p className="text-sm text-gray-400">Publicaciones</p>
                  
                </div>
                <div className="text-center">
                  <Link to={`/followersList/${userId}`}>
                    <p className="font-bold">{followersCount}</p>
                    <p className="text-sm text-gray-400 px-1  rounded-lg hover:bg-gray-800/50  transition duration-300">Seguidores</p>
                  </Link>
                </div>
                <div className="text-center">
                <Link to={`/followingList/${userId}`}>
                  <p className="font-bold">{followingCount}</p>
                  <p className="text-sm text-gray-400 px-1  rounded-lg hover:bg-gray-800/50  transition duration-300">Seguidos</p>
                  </Link>
                </div>
              </div>
 

                { 
                state && state.id === userId ?  '' :    
              <button 
                onClick={isFollowing(userId) ? handleDelete : handleFollow} 
                disabled={loading}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                  loading
                  ? 'opacity-50 py-1 px-2 cursor-not-allowed'
        
                  : isFollowing(userId)
                  ?  'bg-gray-600 text-white px-5 hover:bg-gray-700'
        
                  :'bg-orange-500 text-white px-9 hover:bg-orange-600'
        
                }`}
                
              >
                {isFollowing(userId) ?  "Siguiendo" : "Seguir"}
              </button>
              }
       
    
            </div>
          </div>
          

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Tareas Públicas</h2>

            {error && <div><ErrorMessage text={'Error al cargar las publicaciones del usuario'}/></div>}
             
            {isLoading &&   <div><Spinner/></div>}

            {

            task &&  task.length > 0 ?
              <div>
                <TaskListStyles 
                  tasks={sortedTask}
                  ispublic={true}
                />
              </div>
              :
              <p className="text-gray-400 text-center py-4">No hay publicaciones aún</p>
            }
              
              
        

          </div>
        </div>
      </div>
    </div>
  );
};
 

UserStyle.propTypes = {
  username: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  publicationsCount: PropTypes.number.isRequired,
  followersCount: PropTypes.number,
  followingCount: PropTypes.number,
   
  publicTasks: PropTypes.arrayOf(PropTypes.string),
};


 

{ /*
export const UserStyle = () => {
  return (
    <div className="max-w-2x1 mx-auto  bg-gray-900 backdrop-blur-md p-8    rounded-lg shadow-xl border border-gray-700 "> 

        <div className="flex flex-wrap gap-4">
             <div className= "w-full sm:w-1/2 md:w-1/4 p-4 bg-gray-200" >
                icono
             </div>
             <div className= "w-full sm:w-1/2 md:w-1/4 p-4 bg-gray-300">
                publicaciones
                <p>1</p>
             </div>
             <div className= "w-full sm:w-1/2 md:w-1/4 p-4 bg-gray-400">
                seguidores
             </div>
             <div className= "w-full sm:w-1/2 md:w-1/4 p-4 bg-gray-500">
                seguidos
             </div>
        </div>
    </div>
  )
}
*/}



