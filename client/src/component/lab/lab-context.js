import { useContext, useState } from "react";
import React from "react";

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
  const [currentOptionIndex, setCurrentOptionIndex] = useState(0); // store the selected option index for interactive move

  const update_options_handler = (index, option) => {
    // update the option selected for the card so the next card can be enabled
    console.log(`Lab card #${index}: ${option}`);
    setSelectedOptions((prev) => ({
      ...prev,
      [index]: option,
    }));
    setCurrentOptionIndex(index);
  };

  const clear_selected_options = () => {
    setSelectedOptions({});
  };

  return (
    <LabOptionsContext.Provider value={{ selectedOptions, currentOptionIndex }}>
      <OptionsUpdateContext.Provider value={{ update_options_handler, clear_selected_options }}>
        { children }
      </OptionsUpdateContext.Provider>
    </LabOptionsContext.Provider>
  );
};

export default LabProvider;
