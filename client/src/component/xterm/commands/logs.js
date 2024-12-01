// import { SERVER_HOST, SERVER_PORT  } from "../../index";

export const logs = async (input, terminal) => {
  terminal.write(
    "\r\n\x1B[1;3;32m Doc:\x1B[1;3;37m Feature not implemented yet."
  );
  // const response = await fetch(`http://${SERVER_HOST}:${SERVER_PORT}/logs`);
  // const data = await response.json();
  // console.log(`server api response for logs type ::: ${typeof data}`);

  // if (typeof data === "object") {
  //   terminal.write(
  //     "\r\n\x1B[1;3;32m Doc:\x1B[1;3;37m No logs available\x1B[0m\r\n"
  //   );
  //   return;
  // } else {
  //   terminal.write(
  //     "\r\n\x1B[1;3;32m Doc:\x1B[1;3;37m I can help you with the following logs:"
  //   );
  //   data.forEach((suite) => {
  //     terminal.write(`\r\n\x1B[1;3;30m  - ${suite}\x1B[0m\r\n`);
  //   });
  // }
};
