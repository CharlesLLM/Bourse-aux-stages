import Navbar from "../components/nav/navbar";
import Footer from "../components/nav/footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout;
