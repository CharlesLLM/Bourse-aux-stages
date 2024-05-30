import './App.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import CompanyIndex from "./pages/companyIndex";
import Home from "../../front/src/pages/home";
import Layout from "./layout/layout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/entreprises",
    element: <CompanyIndex />,
  },
]);

function App() {

  return (
    <Layout children={<RouterProvider router={router}/>}/>
  )
}

export default App
