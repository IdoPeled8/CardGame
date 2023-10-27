import React from "react";
import Player from "../Player/Player";
import { useGameContext } from "../../Contexts/GameContext";

const GamePlayers = () => {
  const { players } = useGameContext();

  return (
    <div className="players">
      {players.map((player, index) => (
        <Player
          key={index}
          player={player}
        />
      ))}
    </div>
  );
};

export default GamePlayers;
