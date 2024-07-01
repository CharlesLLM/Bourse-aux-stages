import Navbar from "../components/nav/navbar";
import Footer from "../components/nav/footer";
import { Outlet } from "react-router-dom";

function Layout() {
  async function handleLogout() {
    try {
      localStorage.clear();
      location.href = '/';
    }
    catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="w-full min-h-screen">
      <Navbar handleLogout={handleLogout} />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout;
