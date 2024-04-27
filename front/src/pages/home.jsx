import React from 'react'
import Layout from "../layout/layout.jsx";
import Searchbar from '../components/Searchbar.jsx';
import FeaturedCompany from "../components/home/featuredCompany.jsx";

function Home() {
  return (
    <Layout>
      <div>
        <p className="underline">hello</p>
        < Searchbar />
        < FeaturedCompany />
      </div>
    </Layout>
  )
}

export default Home;

