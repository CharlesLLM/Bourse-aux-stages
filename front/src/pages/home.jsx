import React from 'react'
import Layout from "../layout/layout.jsx";
import Searchbar from '../components/Searchbar.jsx';
import FeaturedCompagny from "../components/home/featuredCompagny.jsx";

function Home() {
  return (
    <Layout>
      <div>
        <p className="underline">hello</p>
        < Searchbar />
        < FeaturedCompagny />
      </div>
    </Layout>
  )
}

export default Home;

