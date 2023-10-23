import React, { useEffect, useState } from "react";
import SimpleButton from "../components/ui/Button/SimpleButton";
import { useDeckContext } from "../Contexts/DeckContext";
import SimpleLink from "../components/ui/Link/SimpleLink";
import { colors } from "../utils/Colors";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const [newPlayer, setNewPlayer] = useState("");

  const { players, connection } = useDeckContext();

  const handleCreateNewPlayer = async () => {
    if (newPlayer === "") {
      console.log("Please enter a name");
      return;
    }
    connection.invoke("CreatePlayer", newPlayer);

    navigate("/gamePage");
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault(handleCreateNewPlayer())}>
        Enter Name:
        <input
          value={newPlayer}
          onChange={(e) => setNewPlayer(e.target.value)}
        ></input>
        <SimpleButton color={colors.green}>Join table</SimpleButton>
      </form>
    </div>
  );
};

export default HomePage;
