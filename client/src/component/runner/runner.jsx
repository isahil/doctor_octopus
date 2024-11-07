import { useEffect, useState } from "react";
import "./runner.css";
import protocols from "./runner.json";

const Runner = () => {
  const [suite, setSuite] = useState([]);

  const handleClick = (event, protocol) => {
    console.log(event.target.innerText);
    setSuite([protocol, event.target.innerText]);
  };

  return (
    <div className="runner-component">
      <div className="runner-header">
        <h1>{suite[0]} {suite[1]}</h1>
      </div>
      <div className="runner-cards">
        {protocols.map((protocol, i) => {
          return (
            <div key={i} className="runner-card">
              <h2 className="">{protocol.name} </h2>
              <div className="suite-content">
                {protocol.suites.map((t_suite, j) => {
                  return (
                    <div
                      key={j}
                      className="suite-name"
                      onClick={(event) => handleClick(event, protocol.name)}
                    >
                      <a>{t_suite}</a>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <button className="run-button">Run</button>
      </div>
    </div>
  );
};

export default Runner;
