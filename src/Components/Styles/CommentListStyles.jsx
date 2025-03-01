
 
import { User, ThumbsUp } from 'lucide-react';
import { useUpdateLikeComment } from '../../hooks/useTask';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import { useDeleteComment } from '../../hooks/useTask';
import { MoreVertical } from 'lucide-react';
import { useState } from 'react';

// eslint-disable-next-line react/prop-types
export const CommentListStyles  = ({ comments }) => {
  const {state} = useAuth()
  const [openMenuId, setOpenMenuId] = useState(null); // Estado para rastrear el menú abierto
   
  const updateLikeComment = useUpdateLikeComment();
  const deleteComment = useDeleteComment()

   

  // eslint-disable-next-line react/prop-types
  const sortedComment = comments && comments.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  const toggleMenu = (commentId) => {
    // Alterna el estado del menú según el ID del comentario
    setOpenMenuId((prevId) => (prevId === commentId ? null : commentId));
  };


  return (
    <div className="mt-6 space-y-4">
      {
      
     sortedComment &&  sortedComment.map((comment) => (
        <div key={comment.id } id={`comment-${comment.id}`} className="bg-gray-800/50 p-4 rounded-md">

          <div className="flex justify-between items-start mb-4">

            <div className="flex items-center mb-2">

              <Link to={`/users/${comment.user.id}`}>
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                  <User className="w-5 h-5 text-white" />
                </div>
              </Link>

             

          
              <span className="font-medium mr-2">{comment.user.username}</span>
              <span className="text-sm text-gray-400">{new Date(comment.date).toLocaleDateString()}</span>  
            </div>

 
            <div className="relative">
                { 
                 
                comment.user.id !== state.id ? '' : 
                   
                <button onClick={() => toggleMenu(comment.id)} 
                className="p-2 hover:bg-gray-700/50 rounded-full transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
                  
                }
                { openMenuId === comment.id  && (
                    <div className="absolute right-0 mt-2 w-24 bg-gray-800 rounded-md shadow-lg z-10">
                        <button 
                          onClick={() => deleteComment.mutate(comment.id)}
                          className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-700 hover:text-red"
                        >
                          eliminar
                        </button>
                  </div>
                )}

              
            </div>
          </div>


          <p className="text-gray-300 mb-2">{comment.comment}</p>
 
          {<button onClick={() =>   {     updateLikeComment.mutate({id:comment.id  ,likes:state.id, taskId :comment.task})} } 
            className={`flex items-center ${
              comment.likes.includes(state.id)  ? "text-blue-500" : "text-gray-400"
            } sm:hover:text-white sm:transition-colors`}
            >
            <ThumbsUp   className="  w-4 h-4 mr-1 sm:w-5 sm:h-5" />
            <span className='text-gray-400'>{comment.likes.length}</span>
          </button>}

          
        </div>
      ))}

      
    </div>
  );
};








