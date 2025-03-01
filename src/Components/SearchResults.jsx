
 
import { UserListStyle } from './Styles/UserListStyle';
import { useState } from 'react';
import { useGetSearchUsers } from '../hooks/useUsers';
import {X} from 'lucide-react'
import { Spinner } from './Styles/Spinner';


// eslint-disable-next-line react/prop-types
export const SearchResults = ( {isSearchOpen, toggleSearch}) => {
   
  const [query, setQuery] = useState('');

  const {data:users, isLoading } = useGetSearchUsers(query)
 
    const handleSubmit = (event) => {
      event.preventDefault();
    }
    const notResult = <div className='mb-2 text-center text-white'>No se encontraron resultados.</div>

  return (
    <div className={`${isSearchOpen ? 'block' : 'hidden'}   bg-gray-800 py-2 px-4`}>
    <div className=" mb-7 max-w-7xl mx-auto flex items-center">
     <form onSubmit={handleSubmit} className='  w-full bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500'>
      
      <input
        type="text"
        placeholder="Buscar..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
    </form> 
      <button
          onClick={toggleSearch}
          className="ml-2 p-2 rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
        >
          <X className="h-5 w-5" />
      </button>
    </div>
     
      {isLoading &&   <div><Spinner/></div>}
      <div className='mt-5 max-h-96  overflow-auto  z-50   scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800 ' >
        {
          users && users.length == 0
          ? notResult
          :<UserListStyle users={users} />
        }
        
      </div>    
  </div>
  );
};
