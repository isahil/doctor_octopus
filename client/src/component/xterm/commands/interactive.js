import LabSettings from "../../lab/lab.json";

let currentOptionIndex = 0, selectedOptions = "";

export const interactive_mode = ({
  terminal,
  input,
  update_options_handler,
  handle_run_click
}) => {
  const last_cards_index = LabSettings.length; // index of the last card is used to enable the "Run" button
  console.log(
    `xterm - currentOptionIndex: ${currentOptionIndex} - input: ${input}`
  );

  // TODO: Add the logic to disable the handle_run_click function if the selectedOptions is ["client", "dealer"]
  // TODO: Add the logic to disable interactiveMode after the "Run" button is clicked
  if(currentOptionIndex === last_cards_index && input === "run") {
    handle_run_click(terminal);
    currentOptionIndex = 0; // reset the currentOptionIndex for the next interactive
    return;
  }

  selectedOptions = input; // store the selected option for the current card to verify if the "Run" button should be enabled
  update_options_handler(currentOptionIndex, input); // update the selected option for the currentOptionIndex card
  currentOptionIndex++; // increment the display messages for the next card options

  if (currentOptionIndex === last_cards_index) {
    console.log(`xterm - selectedOptions: ${JSON.stringify(selectedOptions)}`);
    let message = ["client", "dealer"].includes(selectedOptions)
      ? `\r\n\x1B[1;3;32m Doc:\x1B[1;3;37m All options selected. FixMe app is enabled.\x1B[0m\r`
      : `\r\n\x1B[1;3;32m Doc:\x1B[1;3;37m All options selected. Type 'run' to execute the command.\x1B[0m\r`;
    terminal.write(message);
  }

  // display the next card options for the user to select
  if (currentOptionIndex !== last_cards_index) {
    const current_setting = LabSettings[currentOptionIndex];
    const current_key = current_setting.key;
    const current_options = current_setting.options;

    terminal.write(
      `\r\n\x1B[1;3;32m Doc:\x1B[1;3;37m Enter value for [${current_key}]\x1B[0m\r`
    );
    terminal.write(`\r\n\x1B[1;3;36m options - ${JSON.stringify(current_options)}\x1B[0m\r`);
  }
};
