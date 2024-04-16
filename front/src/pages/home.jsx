import React from 'react'
import Layout from "../layout/layout.jsx";
import FeaturedCompagny from "../components/home/featuredCompagny.jsx";

function Home() {
  return (
    <Layout>
      <div className="px-16">
        <FeaturedCompagny />
      </div>
    </Layout>
  )
}

export default Home;
