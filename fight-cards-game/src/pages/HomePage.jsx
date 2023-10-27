import React, {useState } from "react";
import SimpleButton from "../components/ui/Button/SimpleButton";
import { useGameContext } from "../Contexts/GameContext";
import { colors } from "../utils/Colors";
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
        <button className="btn btn-primary">Join table</button>
      </form>
    </div>
  );
};

export default HomePage;
