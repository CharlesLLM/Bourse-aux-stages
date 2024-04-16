import React from 'react'
import Layout from "../layout/layout.jsx";
import Searchbar from '../components/searchbar.jsx';

function Home() {
  return (
    <Layout>
      <div>
        <p className="underline">hello</p>
        < Searchbar />
      </div>
    </Layout>
  )
}

export default Home;
