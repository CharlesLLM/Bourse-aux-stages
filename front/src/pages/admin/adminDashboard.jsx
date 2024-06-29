import { useEffect, useState } from "react";
import Container from "../../layout/container.jsx";

function AdminDashboard() {
  const [admin, setAdmin] = useState({});

  useEffect(() => {
    const getAdmin = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACK_ENDPOINT}api/admin/dashboard`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAdmin(data);
      } catch (err) {
        console.error('Error fetching data: ', err);
      }
    };

    getAdmin();
  }, []);

  return (
    <Container className="flex-col gap-6">
      <h2 className="text-4xl">Bienvenue dans votre espace administrateur</h2>
      <span className="block w-full h-0.5 bg-grey/50"></span>
      {admin && admin.user && (
        <div className="flex flex-col gap-2">
          <p className="text-lg">Nom: {admin.user.lastName}</p>
          <p className="text-lg">Prénom: {admin.user.firstName}</p>
          <p className="text-lg">Email: {admin.user.email}</p>
          <p className="text-lg">Entreprise: {admin.company.name}</p>
        </div>
      )}
    </Container>
  )
}

export default AdminDashboard;
