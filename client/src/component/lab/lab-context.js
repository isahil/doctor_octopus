import { useContext, useState } from "react";
import React from "react";

const LabOptionsContext = React.createContext();
const HandleOptionClickContext = React.createContext();

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
export const useHandleOptionClick = () => {
  return useContext(HandleOptionClickContext);
};

/**
 * LabProvider component/context to handle and share the state of the selected lab options
 * @param {*} param0 object that contains the children components
 * @returns 
 */
const LabProvider = ({ children }) => {
  const [selected_options, set_selected_options] = useState({}); // store the selected options

  const handle_option_click = (index, option) => {
    // update the option selected for the card so the next card can be enabled
    console.log(`Lab card #${index}: ${option}`);
    set_selected_options((prev) => ({
      ...prev,
      [index]: option,
    }));
  };

  const clear_selected_options = () => {
    set_selected_options({});
  };

  return (
    <LabOptionsContext.Provider value={ selected_options }>
      <HandleOptionClickContext.Provider value={{ handle_option_click, clear_selected_options }}>
        { children }
      </HandleOptionClickContext.Provider>
    </LabOptionsContext.Provider>
  );
};

export default LabProvider;
