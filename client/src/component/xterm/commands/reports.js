
export const reports = async (input, terminal) => {
    const response = await fetch(`http://localhost:8000/reports?source=local`);
    const data = await response.json();
    console.log(`server api response ::: ${data}`);
    
    terminal.write(
        "\r\n\x1B[1;3;32m Doc:\x1B[1;3;37m I can help you with the following reports:\r\n"
    );
    data.forEach((suite) => {
        terminal.write(`\r\n\x1B[1;3;30m  - ${suite}\x1B[0m\r\n`);
    });
    }