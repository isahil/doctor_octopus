import { socket_client } from "./wsclient.js";
import { reports } from "./commands/reports.js";
import { logs } from "./commands/logs.js";

const handleCommand = async (input, terminal, setShowFixMe) => {
  const test_suites = ["api", "fix", "perf", "ui", "ws"];
  // terminal.write(
  //   `\r\n\x1B[1;3;32m Doc:\x1B[1;3;37m You entered: ${input}\x1B[0m\r\n`
  // );
  switch (true) {
    case input === "help":
      const response = await fetch(`http://localhost:8000/help`);
      const data = await response.json();
      console.log(`server api response ::: ${data}`);

      terminal.write(
        "\r\n\x1B[1;3;32m Doc:\x1B[1;3;37m I can help you with the following commands:"
      );
      data.forEach((suite) => {
        terminal.write(`\r\n\x1B[1;3;37m  - ${suite}\x1B[0m\r\n`);
      });
      break;
    case input === "ls":
      terminal.write(
        "\r\n\x1B[1;3;32m Doc:\x1B[1;3;37m You can see the following directories:\r\n 1. reports\r\n 2. logs\x1B[0m\r\n"
      );
      break;
    case input === "reports":
      await reports(input, terminal);
      break;
    case input === "logs":
      await logs(input, terminal);
      break;
    case input === "pwd":
      terminal.write(
        "\r\n\x1B[1;3;32m Doc:\x1B[1;3;37m You are in the root directory.\x1B[0m\r\n"
      );
      break;
    case input === "clear":
      terminal.clear();
      break;
    case input === "fixme":
      setShowFixMe(true);
      terminal.write("\r\n\x1B[1;3;32m Doc:\x1B[1;3;37m FixMe...\x1B[0m\r\n");
      break;
    case test_suites.includes(input):
      terminal.write(
        `\r\n\x1B[1;3;32m Doc:\x1B[1;3;37m Requesting ${input} Tests... \x1B[0m\r\n`
      );
      await socket_client(input, terminal); // Call the WebSocket server to trigger the test suite
      break;
    default:
      terminal.write(
        "\r\n\x1B[1;3;32m Doc:\x1B[1;3;37m I can't help you with that.\x1B[0m\r\n\x1B[1;3;32m Doc:\x1B[1;3;37m Choose one from below.\x1B[0m\r\n"
      );
      terminal.write(`\r\n\x1B[1;3;30m ${test_suites}\x1B[0m\r\n`);
      break;
  }
};

export default handleCommand;
