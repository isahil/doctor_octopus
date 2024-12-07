import "./lab.css";
import lab_cards from "./lab.json";
import { SERVER_HOST, SERVER_PORT } from "../../index";
import { useLabOptions, useOptionsUpdate } from "./lab-context";

const Lab = ({ terminal }) => {
  const { selectedOptions } = useLabOptions(); // LabOptionsContext that store the selected options state
  const { update_options_handler, clear_selected_options } = useOptionsUpdate(); // HandleOptionClickContext that store the function to handle the dd option click
  const last_cards_index = lab_cards.length - 1; // index of the last card is used to enable the "Run" button

  const handle_run_click = async () => {
    // data to send in the request query
    const env = selectedOptions[0];
    const app = selectedOptions[1];
    const proto = selectedOptions[2];
    const suite = selectedOptions[3];
    // const command = `ENVIRONMENT=${env} PRODUCT=${app} npm run ${proto}:${suite}`;
    const command = `npm run ${proto}:${suite}`;
    console.log(`Run command: ${command}`);

    terminal.write(
      `\r\n\x1B[1;3;32m Doc:\x1B[1;3;37m Sending command to the server: '${command}'\r\n`
    );

    clear_selected_options();

    const response = await fetch(
      `http://${SERVER_HOST}:${SERVER_PORT}/run-command?command=${command}`
    );
    const data = await response.json();
    // console.log(`Client received data from the server: ${data.split("\n")}`);

    terminal.write(
      `\r\n\x1B[1;3;32m Doc:\x1B[1;3;37m Server response below\r\n`
    );
    terminal.write(
      `\r\n -------------------------------------------------------------------\r\n`
    );

    // process the response data to remove leading whitespace from each line
    data.split("\n").forEach((line) => {
      line.trimStart();
      terminal.write(`\r\n ${line}\r\n`);
    });
    terminal.write(
      `\r\n -------------------------------------------------------------------\r\n`
    );
    terminal.write(`\r\n\x1B[1;3;31m You\x1B[0m $ `);

    console.log(`Command finished running!`);
  };

  // useEffect(() => {}, [])

  return (
    <div className="lab component">
      <div className="lab-title">THE LAB</div>
      <div className="lab-header">
        {Object.entries(selectedOptions).map((entry, i) => {
          // header displaying the selected options
          return <h1 key={i}>{entry[1]}</h1>;
        })}
      </div>

      <div className="lab-cards">
        {lab_cards.map((card, i) => {
          // iterate through the lab cards and render them with dropdown options
          const card_name = card.key;
          let card_options;

          if (card_name === "suite") {
            // if the card is "suite", then the options are based on the previous selected option. "api", "ui", "fix" have different suite options
            card_options = selectedOptions[i - 1]
              ? card["options"][selectedOptions[i - 1]]
              : card.options;
          } else card_options = card.options;

          const enabled = i === 0 || selectedOptions[i - 1]; // enable the card if the previous card has been selected
          const selected = selectedOptions[i]; // check if the card has been selected

          return (
            <div
              key={i}
              className={`button lab-card-button ${
                enabled ? "enabled" : "disabled" // enable the card if the previous card has been selected
              } ${selected ? "selected" : "not-selected"}`} // check if the card has been selected
            >
              <h2>{card_name}</h2>
              {enabled && (
                <div className="option-content">
                  {card_options.map((option, j) => {
                    return (
                      <div
                        key={j}
                        className="option-name"
                        onClick={() => update_options_handler(i, option)}
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
        <button
          className={`button run-button ${
            selectedOptions[2] !== "fix" && selectedOptions[last_cards_index] ? "enabled" : "disabled" // enable the run button if the last card has been selected
          }`}
          onClick={handle_run_click}
        >
          Run
        </button>
      </div>
    </div>
  );
};

export default Lab;
