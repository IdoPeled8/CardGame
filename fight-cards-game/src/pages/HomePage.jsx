import React, { useState } from "react";
import SimpleButton from "../components/ui/SimpleButton";
import { useDeckContext } from "../Contexts/DeckContext";

const HomePage = () => {
  const [newPlayer, setNewPlayer] = useState("");

  const { onCreateNewPlayer, players } = useDeckContext();

  const handleCreateNewPlayer = () => {
    onCreateNewPlayer(newPlayer);
  };

  const startGame = () => {
    // navigate to game board
    console.log("start game");
  }

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault(handleCreateNewPlayer())}>
        <input onChange={(e) => setNewPlayer(e.target.value)}></input>
        <SimpleButton>add Player</SimpleButton>
      </form>
      {players.length >= 2 && <SimpleButton onClick={startGame}>Start game</SimpleButton>}
    </div>
  );
};

export default HomePage;
