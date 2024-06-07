import Navbar from "../components/nav/navbar";
import Footer from "../components/nav/footer";

function Layout({children}) {
  return (
    <div className="w-full min-h-screen">
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

export default Layout;
