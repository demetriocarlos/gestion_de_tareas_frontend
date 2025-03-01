
  
//primer codigo
// Generar tiempo actual en formato ISO
export const tiempoActual = (() => {
   const fechaActual = new Date();
 
  
  const formatoConCero = (valor) => (valor < 10 ? `0${valor}` : valor);
 
   const año = fechaActual.getFullYear();
   const mes = formatoConCero(fechaActual.getMonth() + 1); // Mes comienza en 0
   const dia = formatoConCero(fechaActual.getDate());
   const horas = formatoConCero(fechaActual.getHours());
   const minutos = formatoConCero(fechaActual.getMinutes());
 
   return `${año}-${mes}-${dia}T${horas}:${minutos}:00.000Z`;
 })();
       
 
 

export const getStatusConfig = (task,statusConfig) => {
       
      if( task.expiration_date  <  tiempoActual && task.completed === false ){
        return statusConfig['not-completed'];
      }else if (task.completed === true){
        return statusConfig.completed;
      }else if (task.status === 'pendiente'){
        return statusConfig['in-progress'];
      }
       
      return {}; // Fallback en caso de que ninguna condición coincida
    };
