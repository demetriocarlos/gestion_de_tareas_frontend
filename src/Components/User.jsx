
import { UserStyle } from "./Styles/UserStyle"
import { useGetUser } from "../hooks/useUsers"; // Hook para obtener datos del usuario
import { Spinner } from "./Styles/Spinner";
import { ErrorMessage } from "./Styles/ErrorMessage";
import { useAuth } from "../hooks/useAuth";
import { useParams } from "react-router-dom"; // Para capturar parámetros de la URL
import { useGetFollowersId } from "../hooks/useTask";//seguidores
import { useGetFollowingId } from "../hooks/useTask";//seguidos
import { useUserData } from "../hooks/helper";
 

export const User = () => {
  const id = useParams().id; // Captura el username de la URL si está disponible
  const { state } = useAuth(); // Contexto de autenticación para datos del usuario autenticado

  // Decide si mostrar datos del usuario autenticado o de otro usuario
  const userIdentifier = id || state.id;
  // Hook para obtener datos
  const {data: users, isLoading, error} = useGetUser(userIdentifier)
   //console.log('users', users)

   //llamada a los seguidores
  const {data: followers} = useGetFollowersId(userIdentifier)
  const {data: following} = useGetFollowingId(userIdentifier)
   

  const userData = useUserData(users, followers, following, following);
   
 
  if (isLoading){
      return <div><Spinner /></div>
  }


  if(error)  {
      return <div><ErrorMessage text={'Error al cargar los usuarios:'} /></div>
  }
 

  return (
    <div> 
      <UserStyle {...userData}/>
    </div>
  )  
}
