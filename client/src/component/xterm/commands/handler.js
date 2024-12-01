import { socket_client } from "../../../util/socket-client.js";
import { logs } from "./logs.js";
import commands from "./commands.json";

const command_handler = async (input, terminal, set_show_fix_me) => {
  const command_exists = Object.keys(commands).includes(input);
  const test_suites = Object.keys(commands.test.suites);

  switch (true) {
    case input === "test":
      terminal.write(
        "\r\n\x1B[1;3;32m Doc:\x1B[1;3;37m I can help you with the following commands:"
      );
      test_suites.forEach((suite) => {
        terminal.write(`\r\n\x1B[1;3;37m  - ${suite}\x1B[0m\r`);
      });
      break;
    case input === "logs":
      await logs(input, terminal);
      break;
    case input === "clear":
      terminal.clear();
      break;
    case input === "fixme":
      set_show_fix_me(true);
      terminal.write("\r\x1B[1;3;32m Doc:\x1B[1;3;37m Starting FixMe App...\x1B[0m\r");
      break;
    case command_exists:
      const description = commands[input].description;
      terminal.write(
        `\r\n\x1B[1;3;32m Doc:\x1B[1;3;37m ${description} \x1B[0m\r`
      );
      await socket_client("suite", input, terminal); // Call the WebSocket server to trigger the test suite
      break;
    default:
      terminal.write(
        "\r\n\x1B[1;3;32m Doc:\x1B[1;3;37m I can't help you with that.\x1B[0m\r\n\x1B[1;3;32m Doc:\x1B[1;3;37m Choose one from below.\x1B[0m\r"
      );
      terminal.write(`\r\n\x1B[1;3;30m      ${test_suites}\x1B[0m\r`);
      break;
  }
};

export default command_handler;
