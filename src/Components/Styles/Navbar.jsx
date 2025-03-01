
 
import   { useState , useEffect} from 'react';
import { Search, Menu, X, HomeIcon,   PlusIcon, BellIcon,  ClipboardList,  CircleUser} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SearchResults } from '../SearchResults';
import { useLocation } from 'react-router-dom';
import { LogoutButton } from '../LogoutButton';

export const Navbar  = () => {

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation(); // Obtiene la ruta actual

  // Cierra la barra de búsqueda cuando la ruta cambie
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 640);
   
   // Cierra la barra de búsqueda cuando la ruta cambie
   useEffect(() => {
    setIsSearchOpen(false);
  }, [location.pathname]); // Se ejecuta cada vez que la ruta cambia

 

  // Estado para almacenar la posición anterior del scroll
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)
  
 
  const updateMedia = () => {
                                  //777
    setIsDesktop(window.innerWidth >= 640);
  };


  
// Efecto para manejar el cambio de tamaño de la ventana
useEffect(() => {
  window.addEventListener('resize', updateMedia);
  return () => window.removeEventListener('resize', updateMedia);
});


// Efecto para manejar el scroll
useEffect(() => {
  const handleScroll = () => {
    // Obtener la posición actual del scroll
    const currentScrollPos = window.pageYOffset

    // Determinar si el navbar debe ser visible
    // Será visible si se está scrolleando hacia arriba o si estamos cerca del top de la página
    const visible = prevScrollPos > currentScrollPos || currentScrollPos < 10

    // Actualizar la posición anterior del scroll
    setPrevScrollPos(currentScrollPos)
    // Actualizar la visibilidad del navbar
    setVisible(visible)
  }

  // Agregar el event listener para el scroll
  window.addEventListener('scroll', handleScroll)
  // Limpiar el event listener cuando el componente se desmonte
  return () => window.removeEventListener('scroll', handleScroll)
}, [prevScrollPos])// Este efecto se ejecutará cada vez que prevScrollPos cambie



  const toggleSearch = () => {

    setIsSearchOpen(!isSearchOpen);
    
   
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    

  };

  

  const navItems = [
    {id:'taskList', to:'/' , icon:<HomeIcon />},
    {id:'taskNavigationPage', to:'/taskNavigationPage' ,  icon:< ClipboardList/>},
    {id:'createTask', to:'/createTask' , icon:<PlusIcon />},
    {id:'notifications', to:'/notifications' , icon:<BellIcon />},
    {id:'user', to:'/user' , icon:<CircleUser />},
    {id:'logout',  icon:<LogoutButton  />}

  ]


  //${/*visible ? 'translate-y-0' : '-translate-y-full'*/} 

  return (
    <nav className={`   bg-gray-900   shadow-md border-b border-gray-700   shadow-lg  w-full overflow-hidden   ${!visible && !isSearchOpen  ?  '-translate-y-full' : 'translate-y-0'}    transition-transform duration-300   `}>                     
      <div className="  max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8 "> 

        <div className='  flex  items-center  w-full'>
          <div className="flex-shrink-0  z-10">
            {/**logo */}
              <span className="text-orange-400 text-xl font-bold">TaskMaster</span>
          </div>
                         {/**icono de buscar */}
          <div className=" z-10    ">
            <div className="ml-4 flex items-center md:ml-6">
              <button
                onClick={toggleSearch}
                className="p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <Search className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

                          
        <div className="flex items-center justify-between h-14">
        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex flex-shrink-0 items-center ">
         
          { isDesktop ? (
            //pantallas grandes 
            <div className="px-8  flex justify-between w-full">                   
               <div className="flex items-center justify-center flex-1 space-x-4  ">
                 {navItems.map((item) => (
                   <Link key={item.id} to={item.to} className="flex items-center space-x-2 text-gray-300 hover:bg-gray-700 hover:text-white px-7 py-3 rounded-md font-medium ">
                     {item.icon}
                   </Link>
                    
                 ))}
                
               </div>        
            </div>

          ):(
             // Si no es un escritorio (es decir, en pantallas pequeñas)
                   
            <div className="flex justify-center items-center h-screen">
                {/**iconos con sus respectivas rutas */}
              <div className="flex gap-6 sm:gap-4 md:gap-8 lg:gap-10 rounded-lg shadow-md flex-wrap sm:flex-nowrap">
                {navItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`
                      text-gray-300
                      ${index > 3 ? 'hidden sm:block' : ''}
                    `}
                  >
                     
                    <Link
                       to={item.to && item.to}
                        className={ `flex items-center justify-center w-10 h-10   sm:w-12 sm:h-12 rounded-md hover:bg-gray-700    text-gray-300`}
                    >

                      {item.icon}
                    </Link>
                  </div>
                ))}
              </div>
            </div>

          )
        
        }
          </div>
        </div>
          
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
 
              
      {/* Mobile menu, show/hide based on menu state menu desplegable */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
           <Link className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" to='/user' >Usuario</Link>
           <LogoutButton  />
        </div>
      </div>

 
      {isSearchOpen && (
        <div className='bg-gray-800'>
          { 
            <SearchResults 
            isSearchOpen={isSearchOpen}
            toggleSearch={toggleSearch}
            />
          }
        </div>
        )}
      


    </nav>
  );
};
 