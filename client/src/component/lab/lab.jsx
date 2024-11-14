import { useState } from "react";
import "./lab.css";
import labCards from "./lab.json";

const Lab = ({ terminal }) => {
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionClick = (index, option) => {
    console.log(`Option clicked: ${option}`);
    setSelectedOptions((prev) => {
      return {
        ...prev,
        [index]: option,
      };
    });
  };

  const handleRunClick = async () => {
    let command = "npm run ";
    Object.entries(selectedOptions).forEach((entry, i) => {
      if (i === 0) command += `${entry[1]}`;
      else command += `:${entry[1]}`;
    });
    terminal.write(
      `\r\n\x1B[1;3;32m Doc:\x1B[1;3;37m Sending command to the server: '${command}'\r\n`
    );
    const response = await fetch(
      `http://localhost:8000/run-command?command=${command}`
    );
    const data = await response.json();
    // console.log(`Client received data from the server: ${data.split("\n")}`);

    terminal.write(
      `\r\n\x1B[1;3;32m Doc:\x1B[1;3;37m Server response below\r\n`
    );
    terminal.write(
      `\r\n -------------------------------------------------------------------\r\n`
    );
    // Process the response data to remove leading whitespace from each line
    data.split("\n").map((line) => {
      line.trimStart();
      terminal.write(`\r\n\ ${line}\r\n`);
    });
    terminal.write(
      `\r\n -------------------------------------------------------------------\r\n`
    );
    terminal.write(`\r\n\x1B[1;3;31m You\x1B[0m $ `);
  };

  // useEffect(() => {}, [])

  return (
    <div className="lab-component">
      <div className="lab-title">THE LAB</div>
      <div className="lab-header">
        {Object.entries(selectedOptions).map((entry, i) => {
          return <h1 key={i}>{entry[1]}</h1>;
        })}
      </div>

      <div className="lab-cards">
        {labCards.map((card, i) => {
          const cardName = card.name;
          let cardOptions;

          if(cardName === "suites" ) { // if the card is "suites", then the options are based on the previous selected options
            cardOptions = selectedOptions[i-1] ? card["options"][selectedOptions[i-1]] : card.options;
          } else cardOptions = card.options;

          const enabled = i === 0 || selectedOptions[i - 1];
          return (
            <div
              key={i}
              className={`lab-card ${
                enabled ? "enabled" : "disabled"
              }`}
            >
              <h2>{cardName} </h2>
              {enabled && (
                <div className="option-content">
                  {cardOptions.map((option, j) => {
                    return (
                      <div
                        key={j}
                        className="option-name"
                        onClick={() => handleOptionClick(i, option)}
                      >
                        {option}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div>
        <button className="submit-button" onClick={() => handleRunClick()}>
          Run
        </button>
      </div>
    </div>
  );
};

export default Lab;
