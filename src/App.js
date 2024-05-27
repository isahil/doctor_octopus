import Cards from "./component/card/cards";
import XTerm from "./component/xterm/xterm";
import React from "react";
import cardsData from "./data/cards.json";

function App() {
  // const [name, setName] = React.useState("Hello World!");
  // const userInput = (event) => {
  //   setName(event.target.value);
  // }
  return (
    <div>
      <header className="app-header">
        <h1>Doctor Octopus</h1>
      </header>
      <div className="grid">
        <Cards data={cardsData} />
        <XTerm name="Imran"/>
      </div>
    </div>
  );
}

export default App;
