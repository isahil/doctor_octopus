import { useEffect, useRef , useState} from "react";
import "./xterm.css";
import command_handler from "./commands/handler.js";

const XTerm = ({ terminal, set_show_fix_me }) => {
  const terminalRef = useRef(null);
  const [num, set_num] = useState(1);

  const xterm = () => {
    terminal.options.theme.foreground = `cyan`;
    terminal.options.cursorStyle = "underline";
    terminal.options.cursorBlink = true;
    
    terminal.open(terminalRef.current);
    terminal.write("\r\n\x1B[1;3;32m Doc:\x1B[1;3;37m Hi, I'm\x1B[1;3;32m Doctor Octopus\x1B[1;3;37m. Type 'test' to see my options\x1B[0m\r\n");
    terminal.write(`\x1B[1;3;31m You\x1B[0m $ `);

    let input = "", cursor = 0;
    terminal.onData(async (data) => {
      const ascii_code = data.charCodeAt(0);
      // console.log(`input ASCII code: ${ascii_code}`);
      switch (ascii_code) {
        case 27:
          const key = data.substring(1);
          if (key === "[C") {
            // Right // console.log(`-> ${JSON.stringify(data.substring(1))}`);
            if (cursor < input.length) {
              terminal.write(data);
              cursor++;
            }
          } else if (key === "[D") {
            // Left // console.log(`<- ${JSON.stringify(data.substring(1))}`);
            if (cursor > 0) {
              cursor--;
              terminal.write(data);
            }
          }
          break;
        case 13:
          // Enter
          await command_handler(input, terminal, set_show_fix_me);
          terminal.write(`\r\n\x1B[1;3;31m You\x1B[0m $ `);
          input = "";
          cursor = 0;
          break;
        case ascii_code < 32 || ascii_code === 127:
          // Control characters
          break;
        case 127:
          // Backspace
          if (cursor > 0) {
            input = input.substring(0, cursor - 1) + input.substring(cursor);
            cursor--;
            terminal.write("\b" + input.substring(cursor) + " \b");
          }
          break;
        default:
          // Visible characters
          input = input.substring(0, cursor) + data + input.substring(cursor);
          cursor++;
          terminal.write(data);
          break;
      }
    });
  };

  useEffect(() => {
    xterm();
  }, []);

  const incrementNum = () => {
    set_num(num + 1);
    console.log("xterm click #", num);
  };

  return (
    <div ref={terminalRef} id="terminal" onClick={incrementNum} className="component"></div>
  )
};

export default XTerm;
