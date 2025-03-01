

 
/*import { useAuth } from "../hooks/useAuth"
import { UserIcon, LogOutIcon } from 'lucide-react';

export  const LogoutButton = () => {
    const {logout} = useAuth();
       
    const handleLogout=() =>{                  
        if(window.confirm('¿Desea cerrar sesion?')){
            logout()
        }
        
    }
  return (
    <div> 
        <button 
            onClick={handleLogout} 
            className="flex items-center px-3 py-2 text-sm font-medium text-orange-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition duration-150 ease-in-out">
            <LogOutIcon className="w-4 h-4 mr-2" />
            Cerrar sesión
        </button>
    </div>
  )
}


// eslint-disable-next-line react/prop-types
export default function LogoutSection({ username,}) {
    return (
      <div className="flex items-center space-x-4">
        <div className="flex items-center text-sm font-medium text-gray-700">
          <UserIcon className="w-4 h-4 mr-2 text-indigo-600" />
          <span>{username}</span>
        </div>
        <LogoutButton  />
      </div>
    );
  }

*/



import { useAuth } from "../hooks/useAuth"
import { UserIcon, LogOutIcon } from 'lucide-react';

export const LogoutButton = () => {
    const { logout } = useAuth();
    
    const handleLogout = () => {                  
        if (window.confirm('¿Desea cerrar sesión?')) {
            logout();
        }
    };

    //bg-gray-700 
    return (
        <button 
            onClick={handleLogout}                                             
            className="flex items-center px-3 py-2 text-sm font-medium text-white   rounded-md     hover:bg-gray-600  transition duration-150 ease-in-out"
        >
            <LogOutIcon className="w-4 h-4 mr-2 text-orange-500" />
            Cerrar sesión
        </button>
    );
};

// eslint-disable-next-line react/prop-types
export default function LogoutSection({ username }) {
    return (
        <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm font-medium text-white">
                <UserIcon className="w-4 h-4 mr-2 text-orange-500" />
                <span>{username}</span>
            </div>
            <LogoutButton />
        </div>
    );
}
                      
