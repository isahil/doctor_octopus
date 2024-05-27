import { Terminal } from "@xterm/xterm";
import React, { useEffect, useRef } from "react";
import "./xterm.css";
import { io } from "socket.io-client";

const XTerm = ({ name }) => {
  const terminalRef = useRef(null);
  const [num, setNum] = React.useState(1);
  //   const [input, setInput] = React.useState("");

  const xterm = () => {
    const terminal = new Terminal();
    terminal.open(terminalRef.current);
    terminal.write(`\x1B[1;3;31m${name}'s terminal\x1B[0m $ `);

    let input = "",
      cursor = 0;
    terminal.onData(async (data) => {
      const ascii_code = data.charCodeAt(0);
      // console.log(`ASCII code: ${ascii_code}`);
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
          const message = "\r\nBot: '" + input + "'\r\n";
          
          if (input === "help") {
            terminal.write(
              `\r\n\x1B[1;3;32mDoctor: What can I help you with ${name}?\x1B[0m\r\n`
            );
            const response = await fetch("http://localhost:8000/help");
            const data = await response.json();
            console.log(`fetched help data: ${data}`);
            terminal.write(`\r\n\x1B[1;3;30moptions - ${data}\x1B[0m\r\n`);
          } else if (input === "fixme") {
            console.log("fixme sending a message to the socketio server");
            // Establish a WebSocket connection to your server
            
            // await fetch("http://localhost:8000/ws/socket.io");
            const socket = io("http://localhost:8000", { path: "/ws/socket.io", transports: ['websocket', 'polling', 'flashsocket'] });
            socket.on("connect", () => console.log("connected to the WS server..."));
            
            socket.emit("message", input);
            
            socket.on("message", (msg) => {
              console.log("FASTAPI WS server sent: ", msg);
              terminal.write(`\r\n\x1B[1;3;32mDoctor: ${msg}\x1B[0m\r\n`);
            });
            
            socket.on("disconnect", () => console.log("disconnected from WS server!"));
          
          } else terminal.write(message);
          // console.log(`You: ${message}`);
          terminal.write(`\r\n\x1B[1;3;31m${name}'s terminal\x1B[0m $ `);
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
          // console.log("input: ", input); // see the current input
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

  return <div ref={terminalRef} id="terminal" onClick={incrementNum}></div>;
};

export default XTerm;
