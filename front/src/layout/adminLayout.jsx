import Navbar from "../components/nav/navbar";
import Footer from "../components/nav/footer";
import AdminMenu from "../components/nav/adminMenu";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Loader from "../components/utils/loader";

function AdminLayout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState({});

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

        // If status error is 401, it means the token is invalid
        if (response.status === 401) {
          handleLogout();
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setAdmin(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data: ', err);
      }
    };

    checkAdmin();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader />
      </div>
    )
  }

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
      <div className="flex pt-9">
        <div className="w-1/5 bg-gray-800 text-white">
          <AdminMenu admin={admin} />
        </div>
        <div className="w-4/5">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AdminLayout;
