import { io } from "socket.io-client";

import { SERVER_HOST, SERVER_PORT } from "../index";

export const socketio_client = async (subscription, data, terminal) => {
  // Establish a WebSocket connection to your server
  terminal.write(`\r\n\x1B[1;3;32m Doc: \x1B[1;3;37mConnecting to the W.Socket server...\x1B[0m\r\n`);
  const sio = io(`http://${SERVER_HOST}:${SERVER_PORT}`, {
    path: "/ws/socket.io",
    transports: ["websocket", "polling", "flashsocket"],
  });

  sio.on("connect", () => console.log("Connected to the W.Socket server..."));

  sio.on("disconnect", () => console.log("disconnected from WS server!"));

  console.log(
    `W.Socket client sending a message to: ${subscription}...${SERVER_HOST}:${SERVER_PORT}`
  );

  // sio.emit(subscription, data, async(response) => {
  //  // callback function will wait for a server response
  //   console.log("W.Socket server response: ", response);
  //   await terminal.write(`\r\n\x1B[1;3;32m Doc: \x1B[1;3;37m${JSON.stringify(response)}\x1B[0m\r\n`);
  // });

  sio.emit(subscription, data);

  sio.on("fixme", (data) => {
    console.log("W.Socket server: ", data);
    terminal.write(`\r\n\x1B[1;3;32m Doc: \x1B[1;3;37m${data}\x1B[0m\r\n`);
    terminal.write(`\x1B[1;3;31m You\x1B[0m $ `);
  });
};
