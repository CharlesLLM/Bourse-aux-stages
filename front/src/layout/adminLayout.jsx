import Navbar from "../components/nav/navbar";
import Footer from "../components/nav/footer";
import AdminMenu from "../components/nav/adminMenu";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function AdminLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACK_ENDPOINT}api/check-admin`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        // If status error is 403, it means the user is not logged in or is not an admin
        if (response.status === 403) {
          navigate('/');
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (err) {
        console.error('Error fetching data: ', err);
      }
    };

    checkAdmin();
  }, []);

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
