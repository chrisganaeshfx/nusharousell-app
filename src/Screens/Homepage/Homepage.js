import React, { useEffect } from "react";
import Navbar from "../GLOBAL/components/Navbar";
import EnvironmentFact from "./components/EnvironmentFact";
import Category from "./components/Category";
import Recommendations from "./components/Recos";

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
    </>
  );
}
export { Home };
