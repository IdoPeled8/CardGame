import React, { useState } from "react";
import SimpleButton from "../components/ui/Button/SimpleButton";
import { useDeckContext } from "../Contexts/DeckContext";
import SimpleLink from "../components/ui/Link/SimpleLink";
import { colors } from "../utils/Colors";

const HomePage = () => {
  const [newPlayer, setNewPlayer] = useState("");

  const { onCreateNewPlayer, players } = useDeckContext();

  const handleCreateNewPlayer = () => {
    if (newPlayer === "") {
      console.log("please enter a name");
      return;
    }
    onCreateNewPlayer(newPlayer);
    setNewPlayer('');
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault(handleCreateNewPlayer())}>
        <input value={newPlayer} onChange={(e) => setNewPlayer(e.target.value)}></input>
        <SimpleButton color={colors.green}>add Player</SimpleButton>
      </form>
      Players made:{players.length}
      {players.length >= 2 && (
        <SimpleLink color={colors.yellow} to="/gamePage">
          Start Game
        </SimpleLink>
      )}
    </div>
  );
};

export default HomePage;
