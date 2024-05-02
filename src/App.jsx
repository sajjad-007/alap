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

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<RootLayout/>}>
          <Route path="/home" element={<Home/>}/>
          <Route path="/message" element={<Message/>}/>
          <Route path="/setting" element={<Setting/>}/>
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
