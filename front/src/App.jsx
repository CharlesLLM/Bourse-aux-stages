import './App.css'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import CompanyIndex from "./pages/companyIndex";
import CompanyView from "./pages/companyView";
import Home from "../../front/src/pages/home";
import CompanyOffers from "../../front/src/pages/companyOffers";
import AdminLayout from "./layout/adminLayout.jsx";
import Layout from "./layout/layout.jsx";
import Application from "./pages/application.jsx";
import OfferView from "./pages/offerView.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
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
        </Route>

        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout />} >
          <Route path="entreprise/:slug" element={<CompanyView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
