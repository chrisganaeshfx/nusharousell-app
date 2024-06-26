import React from "react";
import Navbar from "../GLOBAL/components/Navbar";
import EnvironmentFact from "./components/EnvironmentFact";
import CategoriesFilter from "./components/CategoryButtons";
import Catalogue from "./components/Catalogue";
import Footer from "../GLOBAL/components/Footer";

import "../styles/Homepage.css";

export default function Homepage() {

  return (
    <div className='home'>
      <Navbar className='header'/>
      <div>
        <CategoriesFilter />
        <Catalogue />
      </div>
      <Footer className='footer'/>
    </div>
  );
}

      

