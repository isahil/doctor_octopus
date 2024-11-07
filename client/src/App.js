import React, { useEffect, useState } from "react";
import Cards from "./component/card/cards";
import XTerm from "./component/xterm/xterm";
import FixMe from "./component/fixme/fixme";
import Runner from "./component/runner/runner.jsx";

function App() {
  const [source, setSource] = React.useState("remote");
  const [showFixMe, setShowFixMe] = React.useState(false);

  const toggleSource = () => {
    setSource((currentSource) =>
      currentSource === "remote" ? "local" : "remote"
    );
    console.log("source", source);
  };

  return (
    <div className="app">
      <div className="app-header">
        <div className="source">
          <label>
            <input type="checkbox" onClick={toggleSource} />
          </label>
          <p className="source-label">source</p>
        </div>
        <div className="title">
          <h1>Doctor Octopus</h1>
        </div>
      </div>

      <div className="grid">
        <div className="cards">
          <Cards source={source} />
        </div>
        <div className="tech">
          <XTerm setShowFixMe={setShowFixMe} />
          <Runner />
          {/* showFixMe && <FixMe /> */}{" "}
          {/* Display the FixMe component when showFixMe is true */}
          <FixMe />
        </div>
      </div>
    </div>
  );
}

export default App;
