import { logs } from "./logs.js";
import LabSettings from "../../lab/lab.json";
import { interactive_mode } from "./interactive.js";

let interactiveMode = false;

export const command_handler = ({
  terminal,
  input,
  setShowFixMe,
  update_options_handler,
  handle_run_click,
}) => {
  switch (true) {
    case input === "test":
      interactiveMode = true; // enable interactive mode
      terminal.write(
        "\r\n\x1B[1;3;32m Doc:\x1B[1;3;37m Enter value for each command 'key' below in order.\x1B[0m\r"
      );

      LabSettings.forEach((setting) => {
        terminal.write(`\r\n\x1B[1;3;36m key - ${setting.key}\x1B[0m\r`);
        terminal.write(`\r\n\x1B[1;3;32m - ${setting.description}\x1B[0m\r`);
        terminal.write(
          `\r\n\x1B[1;3;37m options - ${JSON.stringify(
            setting.options
          )}\x1B[0m\r`
        );
      });
      terminal.write(
        `\r\n\x1B[1;3;36m ------------------------------------------ \x1B[0m\r`
      );

      // start with the first setting in the LabSettings array in interactive mode. the output will be passed to the interactive_mode function next time the user enters
      const current_setting = LabSettings[0];
      const current_key = current_setting.key;
      const current_options = current_setting.options;
      terminal.write(
        `\r\n\x1B[1;3;32m Doc:\x1B[1;3;37m Enter value for [${current_key}]\x1B[0m\r`
      );
      terminal.write(`\r\n\x1B[1;3;36m options - ${JSON.stringify(current_options)}\x1B[0m\r`);
      break;
    case input === "logs":
      logs(input, terminal);
      break;
    case input === "clear":
      terminal.clear();
      break;
    case input === "fixme":
      setShowFixMe(true);
      terminal.write(
        "\r\x1B[1;3;32m Doc:\x1B[1;3;37m Starting FixMe App...\x1B[0m\r"
      );
      break;
    default:
      console.log(`default :::: interactiveMode: ${interactiveMode}`);
      if (interactiveMode)
        interactive_mode({
          terminal,
          input,
          update_options_handler,
          handle_run_click,
        });
      else
        terminal.write(
          "\r\n\x1B[1;3;32m Doc:\x1B[1;3;37m I can't help you with that. Type 'test' for help.\x1B[0m\r"
        );
      break;
  }
};
