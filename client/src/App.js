import React, { useEffect } from "react";
import Cards from "./component/card/cards";
import XTerm from "./component/xterm/xterm";
// import FixMe from "./component/fixme/fixme";

function App() {
  const [cards, setCards] = React.useState([]);
  // const userInput = (event) => {
  //   setName(event.target.value);
  // };

  useEffect( () => {
    const getCards = async () => {
      const response = await fetch("http://localhost:8000/cards?source=local"); // 'remote' or 'local'
      const cards_data = await response.json();
      console.log(`Total cards from server mounted: ${cards_data.length}`);
      setCards(cards_data);
    }
    getCards()
  },[]);

  return (
      <div className="grid">
        <div className="cards" >
          <Cards data={cards} />
        </div>
        <div className="tech">
          <XTerm />
          {/* <FixMe /> */}
        </div>
      </div>
  );
}

export default App;
