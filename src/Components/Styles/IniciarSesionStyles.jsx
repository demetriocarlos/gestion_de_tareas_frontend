
 
import { ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export const  IniciarSesionStyles = ({handleChange,handleSubmit,credentials, login, texto}) => {
   

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-md border border-white/30 rounded-lg shadow-xl text-white p-8">
        <div className="text-center mb-8">
          <ClipboardList className="h-12 w-12 text-orange-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-orange-400">TaskMaster</h2>
          <p className="text-gray-300 mt-2">{texto}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          { 
           
          login == true ? '' :
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-yellow-100 mb-1">
              Nombre de usuario
            </label>
            <input
              type="text"
              name="username"
              value={
                // eslint-disable-next-line react/prop-types
                credentials.username
             }
             onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="usuario123"
              required
            />
          </div>
           
           }
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-yellow-100 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              name="gmail"
              value={
                // eslint-disable-next-line react/prop-types
                credentials.gmail
             }
             onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="tu@correo.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-yellow-100 mb-1">
              Contraseña
            </label>
            <input
              name="password"
              type="password"
              value={
                // eslint-disable-next-line react/prop-types
                credentials.password
             }
             onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          {  login == false ? '' :
          <div>
            ¿No tienes cuenta?                                    
          <Link className="rounded-md px-3 py-2 text-sm font-medium  text-blue-500 hover:text-blue-600"  
                  to="/CreateAccount"
                >
                    Registrarse
                </Link>
          </div>
          }

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-opacity-50"
          >
            Crear cuenta
          </button>
        </form>
      </div>
    </div>
  );
};
 
