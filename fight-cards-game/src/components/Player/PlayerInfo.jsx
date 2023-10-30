import React from "react";
import "./Player.css";
import { useGameContext } from "../../Contexts/GameContext";
const PlayerInfo = ({ player }) => {
  const { playerTurn, client } = useGameContext();
  return (
    <div
      className={
        playerTurn.id === client.id ? "player-turn playerName" : "playerName"
      }
    >
      {player.name}

      {player.hand?.guard === undefined && <h4>Waiting Player</h4>}
    </div>
  );
};

export default PlayerInfo;
