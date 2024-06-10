import { Terminal } from "@xterm/xterm";
import React, { useEffect, useRef } from "react";
import "./xterm.css";
import handleCommand from "./commands.js";
import FixMe from "../fixme/fixme";

const XTerm = ({ }) => {
  const terminalRef = useRef(null);
  const [num, setNum] = React.useState(1);
  const [showFixMe, setShowFixMe] = React.useState(false);

  const xterm = () => {
    const terminal = new Terminal();
    terminal.options.theme.foreground = `cyan`;
    terminal.options.cursorStyle = "underline";
    terminal.options.cursorBlink = true;
    
    terminal.open(terminalRef.current);
    terminal.write("\r\n\x1B[1;3;32m Doc:\x1B[1;3;37m Hi, I'm\x1B[1;3;32m Doctor Octopus\x1B[1;3;37m. What can I help you with?\x1B[0m\r\n");
    terminal.write(`\x1B[1;3;31m You\x1B[0m $ `);

    let input = "",
      cursor = 0;
    terminal.onData(async (data) => {
      const ascii_code = data.charCodeAt(0);
      // console.log(`input ASCII code: ${ascii_code}`);
      switch (ascii_code) {
        case 27:
          // console.log(`substring ${data.substring(data.length - 2)}`);
          const key = data.substring(1);
          if (key === "[C") {
            // Right
            console.log(`-> ${JSON.stringify(data.substring(1))}`);
            if (cursor < input.length) {
              cursor++;
              terminal.write(data);
            }
          } else if (key === "[D") {
            // Left
            console.log(`<- ${JSON.stringify(data.substring(1))}`);
            if (cursor > 0) {
              cursor--;
              terminal.write(data);
            }
          }
          break;
        case 13:
          // Enter
          await handleCommand(input, terminal, setShowFixMe);

          terminal.write(`\r\n\x1B[1;3;31m You\x1B[0m $ `);
          input = "";
          break;
        case ascii_code < 32 || ascii_code === 127:
          // Control characters
          break;

        default:
          // Visible characters
          terminal.write(data);
          input = input.substring(0, cursor) + data + input.substring(cursor);
          cursor++;
          break;
      }
    });
  };

  useEffect(() => {
    xterm();
  }, []);

  const incrementNum = () => {
    setNum(num + 1);
    console.log("xterm click #", num);
  };

  return <div ref={terminalRef} id="terminal" onClick={incrementNum}>
    { showFixMe && <FixMe /> }
  </div>;
};

export default XTerm;
