import React from "react";
import Navbar from "../GLOBAL/components/Navbar";
import EnvironmentFact from "./components/EnvironmentFact";
import CategoriesFilter from "./components/CategoryButtons";
import NewlyAdded from "./components/NewlyAdded";
import Footer from "../GLOBAL/components/Footer";

import "../styles/Homepage.css";

export default function Homepage({ userDetails, setUserDetails }) {

  return (
    <div className='home'>
      <Navbar className='header' userDetails={userDetails} setUserDetails={setUserDetails}/>
      <div>
        <CategoriesFilter />
        <NewlyAdded />
      </div>
      <Footer className='footer'/>
    </div>
  );
}

      

