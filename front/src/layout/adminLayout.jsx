import Navbar from "../components/nav/navbar";
import Footer from "../components/nav/footer";
import AdminMenu from "../components/nav/adminMenu";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <div className="flex pt-9">
        <div className="w-1/6 bg-gray-800 text-white">
          <AdminMenu />
        </div>
        <div className="w-5/6">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AdminLayout;
