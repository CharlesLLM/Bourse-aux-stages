import './App.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import CompanyList from "./pages/companyList";
import Home from "../../front/src/pages/home";
import Layout from "./layout/layout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/entreprises",
    element: <CompanyList />,
  },
]);

function App() {

  return (
    <Layout children={<RouterProvider router={router}/>}/>
  )
}

export default App
