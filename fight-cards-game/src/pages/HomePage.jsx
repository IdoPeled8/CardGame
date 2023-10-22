import React, { useEffect, useState } from "react";
import SimpleButton from "../components/ui/Button/SimpleButton";
import { useDeckContext } from "../Contexts/DeckContext";
import SimpleLink from "../components/ui/Link/SimpleLink";
import { colors } from "../utils/Colors";
import { HubConnectionBuilder } from "@microsoft/signalr";

const HomePage = () => {
  const [newPlayer, setNewPlayer] = useState("");

  const { onCreateNewPlayer, players } = useDeckContext();

  const handleCreateNewPlayer = async () => {
    if (newPlayer === "") {
      console.log("Please enter a name");
      return;
    }
    onCreateNewPlayer(newPlayer);
    setNewPlayer("");
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault(handleCreateNewPlayer())}>
        <input
          value={newPlayer}
          onChange={(e) => setNewPlayer(e.target.value)}
        ></input>
        {players.length < 1 && (
          <SimpleButton color={colors.green}>add Player</SimpleButton>
        )}
      </form>
      Players made:{players.length}

      <SimpleLink color={colors.yellow} to="/gamePage">
        Join table
      </SimpleLink>
    </div>
  );
};

export default HomePage;
