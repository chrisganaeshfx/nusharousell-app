import React from "react";
import Navbar from "../GLOBAL/components/Navbar";
import CategoriesFilter from "./components/CategoryButtons";
import Catalogue from "./components/Catalogue";
import Footer from "../GLOBAL/components/Footer";

import "../styles/Homepage.css";

export default function Homepage() {

  return (
    <div className='home'>
        <CategoriesFilter />
        <Catalogue />
    </div>
  );
}

      

