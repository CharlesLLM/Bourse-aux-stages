import './App.css'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import CompanyIndex from "./pages/companyIndex";
import CompanyView from "./pages/companyView";
import Home from "../../front/src/pages/home";
import CompanyOffers from "../../front/src/pages/companyOffers";
import Layout from "./layout/layout.jsx";
import Application from "./pages/application.jsx";
import OfferView from "./pages/offerView.jsx";
import CompanyOffersAdmin from "./pages/companyOffersAdmin.jsx";
import CreateCompanyOfferAdmin from "./pages/createCompanyOfferAdmin.jsx";
import Register from "./pages/register.jsx";
import Login from "./pages/login.jsx";

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
    path: "/entreprise/:slug",
    element: <CompanyView />,
  },
  {
    path: "/offres/:type",
    element: <CompanyOffers />,
  },
  {
    path: '/offre/:id',
    element: <OfferView />,
  },
  {
    path: '/offre/:id/postuler',
    element: <Application />
  },
  {
    path: '/espace-entreprise/offres',
    element: <CompanyOffersAdmin />
  },
  {
    path: '/espace-entreprise/offres/creation-offre',
    element: <CreateCompanyOfferAdmin />
  }
]);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="entreprises"
            element={<CompanyIndex />}
          />
          <Route
            path="entreprise/:slug"
            element={<CompanyView />}
          />
          <Route
            path="offres/:type"
            element={<CompanyOffers />}
          />
          <Route
            path="/offre/:id"
            element={<OfferView />}
          />
          <Route
            path="/offre/:id/postuler"
            element={<Application />}
          />
          <Route
            path="/inscription"
            element={<Register />}
          />
          <Route
            path="/connexion"
            element={<Login />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
