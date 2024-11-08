import { useEffect, useState } from "react";
import "./runner.css";
import cards from "./runner.json";

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
        {cards.map((card, i) => {
          return (
            <div key={i} className="runner-card">
              <h2 className="">{card.name} </h2>
              <div className="option-content">
                {card.options.map((option, j) => {
                  return (
                    <div
                      key={j}
                      className="option-name"
                      onClick={(event) => handleClick(event, card.name)}
                    >
                      <a>{option}</a>
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
