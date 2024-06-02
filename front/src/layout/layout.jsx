import React from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";

function Layout({children}) {
  return (
    <div className="w-full h-screen">
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

export default Layout;
