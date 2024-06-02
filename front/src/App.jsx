import './App.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import CompanyIndex from "./pages/companyIndex";
import CompanyView from "./pages/companyView";
import Home from "../../front/src/pages/home";
import CompanyOffers from "../../front/src/pages/companyOffers";
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
  {
    path: "/entreprises/:slug",
    element: <CompanyView />,
  },
  {
    path: "/offres",
    element: <CompanyOffers />,
  }
]);

function App() {
  return (
    <Layout children={<RouterProvider router={router}/>}/>
  )
}

export default App;
