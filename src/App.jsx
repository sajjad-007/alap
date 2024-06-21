import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Home from "./pages/home/Home";
import Message from "./pages/message/Message";
import Setting from "./pages/setting/Setting";
import Error from "./pages/error/Error";
import Login from "./pages/auth/login/Login";
import Registration from "./pages/auth/registration/Registration";
import Notification from "./pages/notification/Notification";
import IsLoggedInUser from "./components/privetRoutes/IsLoggedInUser";
import NotLoggedInUser from "./components/privetRoutes/NotLoggedInUser";
import Profile from "./pages/profile/Profile";
// import NotLoggedInUser from "./components/privetRoutes/NotLoggedInUser";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<IsLoggedInUser/>}>
          <Route element={<RootLayout/>}>
            <Route path="/home" element={<Home/>}/>
            <Route path="/message" element={<Message/>}/>
            <Route path="/settings" element={<Setting/>}/>
            <Route path="/notification" element={<Notification/>}/>
            <Route path="/profile/:id" element={<Profile/>}/>
          </Route>
        </Route> 
            <Route path="/" element={<Login/>}/>
            <Route path="/registration" element={<Registration/>}/>
            <Route path="*" element={<Error/>}/>
      </Route>
    )
  );
  return (
    <RouterProvider router={router}/>
  )
}

export default App
