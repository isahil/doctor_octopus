import { io } from "socket.io-client";

export const socket_client = async (input, terminal) => {
    console.log("WSocket client sending a message to the WSocket server");
    // Establish a WebSocket connection to your server
    const socket = io(`http://localhost:8000`, {
      path: "/ws/socket.io",
      transports: ["websocket", "polling", "flashsocket"],
    });

    socket.on("connect", () => console.log("connected to the WSocket server..."));

    socket.emit("suite", input);

    socket.on("suite", (msg) => {
      console.log("FASTAPI WSocket server sent: ", msg);
      terminal.write(`\r\n\x1B[1;3;33m sdet: \x1B[1;3;37m${msg}\x1B[0m\r\n`);
      terminal.write(`\x1B[1;3;31m You\x1B[0m $ `);
    });

    socket.on("disconnect", () => console.log("disconnected from WS server!"));
}
