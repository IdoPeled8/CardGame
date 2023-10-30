
import React, { useState } from "react";
import { useGameContext } from "../Contexts/GameContext";

import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const [newPlayer, setNewPlayer] = useState("");

  const { connection } = useGameContext();

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
        <button className="simpleBtn color-lightBlue">Join table</button>
      </form>
     
    </div>
  );
};

export default HomePage;
