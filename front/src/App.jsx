import './App.css'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import CompanyIndex from "./pages/companyIndex";
import CompanyView from "./pages/companyView";
import Home from "../../front/src/pages/home";
import CompanyOffers from "../../front/src/pages/companyOffers";
import AdminCompanyEdit from "../../front/src/pages/admin/adminCompanyEdit";
import AdminDashboard from "../../front/src/pages/admin/adminDashboard";
import Layout from "./layout/layout.jsx";
import AdminLayout from "./layout/adminLayout.jsx";
import Application from "./pages/application.jsx";
import OfferView from "./pages/offerView.jsx";
import CompanyOffersAdmin from "./pages/companyOffersAdmin.jsx";
import CreateCompanyOfferAdmin from "./pages/createCompanyOfferAdmin.jsx";
import Register from "./pages/register.jsx";
import Login from "./pages/login.jsx";
import AdminProfileEdit from './pages/admin/adminProfileEdit.jsx';
import StudentProfile from './pages/studentProfile.jsx';

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
    path: '/espace-entreprise/creer-offre',
    element: <CreateCompanyOfferAdmin />
  }
]);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Layout />}>
          <Route
            path=""
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
            path="offre/:id"
            element={<OfferView />}
          />
          <Route
            path="offre/:id/postuler"
            element={<Application />}
          />
          <Route
            path="inscription"
            element={<Register />}
          />
          <Route
            path="connexion"
            element={<Login />}
          />
          <Route
            path="profil"
            element={<StudentProfile />}
          />
        </Route>

        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout />} >
          <Route path="" element={<AdminDashboard />} />
          <Route path="entreprise/:slug" element={<AdminCompanyEdit />} />
          <Route path="profil" element={<AdminProfileEdit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
