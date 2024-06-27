import { useCallback, useState, useEffect } from "react";

export default function EnvironmentFact() {
  const [fact, setFact] = useState("Loading...");
  const fetchFact = useCallback(() => {
    fetch("https://www.carboninterface.com/") //to get a website that works
      .then((res) => res.json())
      .then((data) => setFact(data.fact))
      .catch(() => setFact("Error fetching fact"));
  }, [setFact]);

  useEffect(() => {
    fetchFact();
  }, [fetchFact]);

  /*
  const handleRefreshClick = () => {
    fetchFact();
  };
  */

  return (
    <>
    <div className = "DYK">
        <h1>Did You Know? </h1>
    </div>
    <div className = "fact">
        <p>{fact}</p>
    </div>
    </>
  );
}