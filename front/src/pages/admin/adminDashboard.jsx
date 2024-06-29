import Container from "../../layout/container.jsx";

function AdminDashboard() {
  return (
    <Container className="flex-col gap-6">
      <h2 className="text-4xl">Bienvenue dans votre espace administrateur</h2>
      <span className="block w-full h-px bg-grey/50"></span>
    </Container>
  )
}

export default AdminDashboard;
