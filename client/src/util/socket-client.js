import { io } from "socket.io-client";

export const socket_client = async (subscription, data, terminal) => {
    console.log("W.Socket client sending a message...");
    // Establish a WebSocket connection to your server
    const socket = io(`http://localhost:8000`, {
      path: "/ws/socket.io",
      transports: ["websocket", "polling", "flashsocket"],
    });

    socket.on("connect", () => console.log("Connected to the W.Socket server..."));

    socket.emit(subscription, data);

    socket.on(subscription, (data) => {
      console.log("FASTAPI W.Socket server: ", data);
      terminal.write(`\r\n\x1B[1;3;32m Doc: \x1B[1;3;37m${data}\x1B[0m\r\n`);
      terminal.write(`\x1B[1;3;31m You\x1B[0m $ `);
    });

    socket.on("disconnect", () => console.log("disconnected from WS server!"));
}
