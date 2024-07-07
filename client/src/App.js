import React, { useEffect } from "react";
import Cards from "./component/card/cards";
import XTerm from "./component/xterm/xterm";
// import FixMe from "./component/fixme/fixme";

function App() {
  const [cards, setCards] = React.useState([]);
  const [source, setSource] = React.useState("remote");

  useEffect( () => {
    const getCards = async () => {
      const response = await fetch(`http://localhost:8000/cards?source=${source}`); // 'remote' or 'local'
      const cards_data = await response.json();
      console.log(`Total cards from server mounted: ${cards_data.length}`);
      setCards(cards_data);
    }
    getCards()
  },[source]);

  const toggleSource = () => {
    setSource(currentSource => (currentSource === "remote" ? "local" : "remote"));
  };

  return (
    <div className="app">
    <div className="app-header">
      <button onClick={toggleSource} className="source-toggle">
        {source.toUpperCase()}
      </button>
      <h1>Doctor Octopus</h1>
    </div>
    <div className="grid">
      <div className="cards">
        <Cards source={source} data={cards} />
      </div>
      <div className="tech">
        <XTerm />
        {/* <FixMe /> */}
      </div>
    </div>
  </div>
  );
}

export default App;
