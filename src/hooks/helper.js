



export const useUserData = (users, followers, following) => {
    //numero de publicaciones del usuario
    const publicLength = users?.task?.filter((task) => task.isPublic).length || 0;
    //seguidores del usuario
    const userFollowers = followers?.map((follow) => follow.follower) || [];
    //usuarios seguidos
    const userFollowing = following?.map((follow) => follow.following) || [];
    //const userMyFollowing = myFollowing?.map((follow) => follow.following) || [];

    //console.log('userFollers', userFollowers)

    //console.log('user', users)
    
    return {
      username: users?.username,  
      userId: users?.id,
      publicationsCount: publicLength,
      followersCount: userFollowers.length,
      followingCount: userFollowing.length,
      //myFollowing:userMyFollowing,
      publicTasks: ["Completar informe mensual", "Preparar presentación"], // Ejemplo
    };
  };


  
  