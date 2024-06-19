import React, { useEffect } from "react";
import Navbar from "../global/components/Navbar";
import EnvironmentFact from "./components/EnvironmentFact";
import Category from "./components/Category";
import Recommendations from "./components/Recos";
import Footer from "../global/components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <br />
      <EnvironmentFact />
      <br />
      <Category />
      <br />
      <Recommendations />
      <br />
      <Footer />
    </>
  );
}
export { Home };
