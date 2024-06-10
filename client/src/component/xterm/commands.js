import { socket_client } from "./wsclient.js";
const handleCommand = async (input, terminal, setShowFixMe) => {
  const test_suites = ["api", "fix", "perf", "ui", "ws"];
  
  switch (true) {
    case input === "help":
      const response = await fetch(`http://localhost:8000/help`);
      const data = await response.json();
      console.log(`server api response ::: ${data}`);

      terminal.write(
        "\r\n\x1B[1;3;32m Doc:\x1B[1;3;37m I can help you with the following commands:"
      );
      data.forEach((suite) => {
        terminal.write(`\r\n\x1B[1;3;30m - ${suite}\x1B[0m\r\n`);
      });
      break;
    case input === "ls":
      terminal.write(
        "\r\n\x1B[1;3;32m Doc:\x1B[1;3;37m You can see the following directories:\r\n1. results\r\n2. logs\x1B[0m\r\n"
      );
      break;
    case input === "cd":
      terminal.write(
        "\r\n\x1B[1;3;32m Doc:\x1B[1;3;37m feature not supported yet.\x1B[0m\r\n"
      );
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
      terminal.write(
        "\r\n\x1B[1;3;32m Doc:\x1B[1;3;37m FixMe...\x1B[0m\r\n"
      );
      setShowFixMe(true);
      break;
    case test_suites.includes(input):
      terminal.write(
        `\r\n\x1B[1;3;32m Doc:\x1B[1;3;37m Requesting ${input} Tests... \x1B[0m\r\n`
      );
      // Call the WebSocket server to trigger the test suite
      await socket_client(input, terminal);
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
