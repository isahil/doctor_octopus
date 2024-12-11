import { useContext, useState } from "react";
import React from "react";
import { SERVER_HOST, SERVER_PORT } from "../../index";

const LabOptionsContext = React.createContext();
const OptionsUpdateContext = React.createContext();

/**
 * custom hooks for handling the lab options context/state
 * @returns {Object} context for lab options - selected options
 */
export const useLabOptions = () => {
  return useContext(LabOptionsContext);
};

/**
 * custom hooks for handling the option click context/state
 * @returns {Object} context for handle_option_click - function to handle the dd option click
 */
export const useOptionsUpdate = () => {
  return useContext(OptionsUpdateContext);
};

/**
 * LabProvider component/context to handle and share the state of the selected lab options
 * @param {*} param0 object that contains the children components
 * @returns
 */
const LabProvider = ({ children }) => {
  const [selectedOptions, setSelectedOptions] = useState({}); // store the selected options

  const update_options_handler = (index, option) => {
    // update the option selected for the card so the next card can be enabled
    console.log(`Lab card #${index}: ${option}`);
    setSelectedOptions((prev) => ({
      ...prev,
      [index]: option,
    }));
  };

  const clear_selected_options = () => {
    setSelectedOptions({});
  };

  const handle_run_click = async (terminal) => {
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

    terminal.write(
      `\r\n\x1B[1;3;32m Doc:\x1B[1;3;37m Server response below\r\n`
    );
    terminal.write(
      `\r\n\x1B[1;3;36m ----------------- [ interactive mode: ON ] ------------------- \x1B[0m\r\n`
    );

    // process the response data to remove leading whitespace from each line
    data.split("\n").forEach((line) => {
      line.trimStart();
      terminal.write(`\r\n ${line}\r\n`);
    });
    terminal.write(
      `\r\n\x1B[1;3;36m ----------------- [ interactive mode: ON ] ------------------- \x1B[0m\r\n`
    );
    terminal.write(`\r\n\x1B[1;3;31m You\x1B[0m $ `);

    console.log(`Command finished running!`);
  };

  return (
    <LabOptionsContext.Provider value={{ selectedOptions }}>
      <OptionsUpdateContext.Provider
        value={{
          update_options_handler,
          clear_selected_options,
          handle_run_click,
        }}
      >
        {children}
      </OptionsUpdateContext.Provider>
    </LabOptionsContext.Provider>
  );
};

export default LabProvider;
