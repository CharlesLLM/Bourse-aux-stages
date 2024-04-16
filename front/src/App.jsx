import './App.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from "../../front/src/pages/home";
import Layout from "./layout/layout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

function App() {

  return (
    <Layout children={<RouterProvider router={router}/>}/>
  )
}

export default App
