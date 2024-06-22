import React from "react";
import Navbar from "../GLOBAL/components/Navbar";
import EnvironmentFact from "./components/EnvironmentFact";
import Category from "./components/Category";
import NewlyAdded from "./components/Recos";
import Footer from "../GLOBAL/components/Footer";
import "../styles/Homepage.css";

export default function Homepage({ userDetails, setUserDetails }) {
  return (
    <div className='home'>
      <Navbar className='header' userDetails={userDetails} setUserDetails={setUserDetails}/>
      <EnvironmentFact />
      <Category />
      <NewlyAdded />
      <Footer className='footer'/>
    </div>
  );
}

      

