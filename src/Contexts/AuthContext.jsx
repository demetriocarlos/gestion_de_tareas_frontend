
import { createContext,useReducer } from "react";

const initialState ={
    username: null,
    token:null,
    id:null
}



//Definir el reducer
const authReducer =  (state,action) => {
    switch (action.type){
        case 'LOGIN':
            return {
                ...state,
                username: action.payload.username, // Guardar el usuario en el estado
                token: action.payload.token,
                id: action.payload.id
            };
        case  'LOGOUT':
            return {
                ...state,
                username:null,// Eliminar el usuario del estado
                token:null,
                id : null
            };

        default:
            return state;
    }
}



// Crear el contexto de autenticación
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext()


// Crear el proveedor de contexto

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({children}) => {
    const [state,dispatch] = useReducer(authReducer, initialState);

    const login = (username,token,id) =>{
        const userData = {username,token, id};
        dispatch({type:'LOGIN', payload:userData}) // Establecer el usuario en el estado
    }


    // Función para manejar el cierre de sesión
    const logout = () => {
        localStorage.removeItem('loggedInUser'); // Eliminar usuario de localStorage
        localStorage.removeItem('token'); // Eliminar token de localStorage
        dispatch({type: 'LOGOUT'});
    }

    return (
        <AuthContext.Provider value={({state, login,logout,dispatch})}>
            {children}
        </AuthContext.Provider>
    )

}



