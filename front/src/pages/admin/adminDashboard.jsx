import Container from "../../layout/container.jsx";
import AdminHeader from "../../components/utils/adminHeader.jsx";
import { useEffect, useState } from "react";

function AdminDashboard() {
  const [company, setCompany] = useState([]);

  useEffect(() => {
    const getCompany = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACK_ENDPOINT}api/company`, {
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
        setCompany(data);
      } catch (err) {
        console.error('Error fetching data: ', err);
      }
    };

    getCompany();
  });

  return (
    <div>
      {company.name && company.logo && (
        <AdminHeader name={company.name} logo={company.logo} />
      )}
      <Container className="flex-col gap-6">
        <h2 className="text-4xl">Bienvenue dans votre espace administrateur</h2>
      </Container>
    </div>
  )
}

export default AdminDashboard;
