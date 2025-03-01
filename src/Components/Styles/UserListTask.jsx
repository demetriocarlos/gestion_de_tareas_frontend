 
import { User } from 'lucide-react';
import { useCreateAssignament } from '../../hooks/useTask';
 

// eslint-disable-next-line react/prop-types
export const UserListTask = ({  task, users, onSelectUser }) => {
  const createAssignament = useCreateAssignament()
   
  return (
    <ul className="space-y-2">
      {
      // eslint-disable-next-line react/prop-types
      users && users.map((user) => (
        <li key={user.id} className="flex items-center">   
          <button
            // eslint-disable-next-line react/prop-types
            onClick={() => onSelectUser(   createAssignament.mutate({taskId:task.id, assignedTo: user.id}))}
            className="flex items-center w-full p-2 hover:bg-gray-700/50 rounded-md transition-colors"
          >
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
              <User className="w-5 h-5 text-white" />
            </div>
            <span>{user.username}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};

