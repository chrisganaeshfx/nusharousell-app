import React from "react";
import Navbar from "../GLOBAL/components/Navbar";
import EnvironmentFact from "./components/EnvironmentFact";
import Category from "./components/Category";
import Recommendations from "./components/Recos";
import Footer from "../GLOBAL/components/Footer";
import "./Homepage.css";

export default function Homepage({user, setUser}) {
  return (
    <div className='home'>
      <Navbar className='header' user={user} setUser={setUser} defaultSearch={null}/>
      <EnvironmentFact />
      <Category />
      <Recommendations />
      <Footer className='footer'/>
    </div>
  );
}

