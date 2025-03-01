
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { CreateAccount } from "./Components/CreateAccount";
import { LoginForm } from "./Components/LoginForm";
import { TaskList } from "./Components/TaskList";
import { useAuth } from "./hooks/useAuth";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Navbar } from './Components/Styles/Navbar';
import { MyTasks } from './Components/MyTasks';
import { CreateTask } from './Components/CreateTask';
import { Notifications } from './Components/Notifications';   
import { User } from './Components/User';
import { FollowingList } from './Components/FollowingList';
import { FollowersList } from './Components/FollowersList';
import { TaskDetailPage } from './Components/TaskDetailPage';
import { TaskNavigationPage } from './Components/Styles/TaskNavigationPage';
import { TaskListAssignament } from './Components/TaskListAssignament';
import { AssignedDetailPage } from './Components/AssignedDetailPage';
import { SearchResults } from './Components/SearchResults';
 
function App() {
   const {state, dispatch} = useAuth() // Usar el contexto de autenticación

   useEffect(() => {
      const loggedUserJSON = localStorage.getItem('loggedInUser');
      if(loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        dispatch({ type: 'LOGIN', payload: user });// Establecer el usuario en el estado
      }
   },[dispatch])

   if (!state) {
    return <div>Cargando...</div>;
  }

  //<LoginForm/>
  //<CreateAccount/>
  return (
    <>
       <div>
          {
            <Router>
              <ToastContainer />

              <nav>
                {state.username && <Navbar/>}
                {}
                   
                {/*state.username && <TestNavbar/>*/}

              </nav>
                
              <Routes>
                <Route path="/" element={state.username ? <TaskList /> : <Navigate to="/login" />} />
                <Route path="/taskNavigationPage/myTasks" element={state.username ? <MyTasks /> : <Navigate to="/login" />} />
                <Route path="/createTask" element={state.username ? <CreateTask /> : <Navigate to="/login" />} />
                <Route path="/taskNavigationPage" element={state.username ? <TaskNavigationPage /> : <Navigate to="/login" />} />
                <Route path="/notifications" element={state.username ? <Notifications /> : <Navigate to="/login" />} />
                <Route path="/user" element={state.username ? <User /> : <Navigate to="/login" />} />
                <Route path="/users/:id" element={state.username ? <User /> : <Navigate to="/login" />} />
                <Route path="/assigned-tasks" element={state.username ? <TaskListAssignament /> : <Navigate to="/login" />} />
                <Route path="/followingList/:id" element={state.username ? <FollowingList /> : <Navigate to="/login" />} />
                <Route path="/followersList/:id" element={state.username ? <FollowersList /> : <Navigate to="/login" />} />
                <Route path="/taskDetailPage/:id" element={state.username ? <TaskDetailPage /> : <Navigate to="/login" />} />
                <Route path="/assignedDetailPage/:id" element={state.username ? <AssignedDetailPage /> : <Navigate to="/login" />} />
                <Route path="/searchResults" element={state.username ? <SearchResults /> : <Navigate to="/login" />} />
                

                
                <Route path="/*" element={<TaskNavigationPage />} />

                <Route path="/login" element={state.username ? <Navigate to="/"/> : <LoginForm/> }/>
                <Route path="/CreateAccount" element={state.username ? <Navigate to="/" /> : <CreateAccount />} />
              </Routes>
            </Router>


          }
        
       </div>
        
    </>
  )
}

export default App
