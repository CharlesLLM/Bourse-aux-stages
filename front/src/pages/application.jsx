import React from "react";
import Layout from "../layout/layout.jsx";
import IdentityForm from "../components/forms/identityForm.jsx";

function Application() {
  return (
    <Layout>
      <form className="w-full space-y-6 px-8">
        <h2 className="text-4xl">Postulez à cette offre de stage</h2>
        <span className="block w-full h-0.5 bg-grey/50"></span>
        <IdentityForm />
        <span className="block w-full h-0.5 bg-grey/50"></span>
      </form>
    </Layout>
  )
}

export default Application;