//   // Help commands that will perform some actions
//   const help_commands = ["help", "fixme", "ls", "cd", "pwd", "clear"];

//  if(help_commands.includes(input)){}

// TODO: Implement the help commands and share the instrance of the terminal

// export const handle_help_commands = (command: string) => {
//   if (input === "help") {
//     terminal.write(
//       `\r\n\x1B[1;3;32mDoctor: What can I help you with ${name}?\x1B[0m\r\n`
//     );
//     const response = await fetch("http://localhost:8000/help");
//     const data = await response.json();
//     console.log(`fetched help data: ${data}`);
//     terminal.write(`\r\n\x1B[1;3;30moptions - ${data}\x1B[0m\r\n`);
//   } else if (input === "fixme") {
//     console.log("fixme sending a message to the socketio server");
//     // Establish a WebSocket connection to your server

//     // await fetch("http://localhost:8000/ws/socket.io");
//     const socket = io("http://localhost:8000", {
//       path: "/ws/socket.io",
//       transports: ["websocket", "polling", "flashsocket"],
//     });
//     socket.on("connect", () => console.log("connected to the WS server..."));

//     socket.emit("message", input);

//     socket.on("message", (msg) => {
//       console.log("FASTAPI WS server sent: ", msg);
//       terminal.write(`\r\n\x1B[1;3;32mDoctor: ${msg}\x1B[0m\r\n`);
//     });

//     socket.on("disconnect", () => console.log("disconnected from WS server!"));
//   }
// };
