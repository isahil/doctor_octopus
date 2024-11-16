import { useState } from "react";
import { Terminal } from "@xterm/xterm";
import Cards from "./component/card/cards";
import XTerm from "./component/xterm/xterm";
import FixMe from "./component/fixme/fixme";
import Lab from "./component/lab/lab.jsx";

function App() {
  const [source, setSource] = useState("local");
  const [showFixMe, setShowFixMe] = useState(false);
  
  const terminal = new Terminal();

  const toggleSource = () => {
    setSource((currentSource) =>
      currentSource === "remote" ? "local" : "remote"
    );
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
        <div className="cards-container">
          <Cards source={source} />
        </div>
        <div className="tech-container">
          <XTerm terminal={terminal} setShowFixMe={setShowFixMe} />
          <Lab terminal={terminal}/>
          {/* showFixMe && <FixMe /> */}{" "}
          {/* Display the FixMe component when showFixMe is true */}
          <FixMe />
        </div>
      </div>
    </div>
  );
}

export default App;
