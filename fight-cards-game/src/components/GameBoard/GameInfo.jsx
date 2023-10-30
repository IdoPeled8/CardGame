import React from "react";
import { useGameContext } from "../../Contexts/GameContext";

const GameInfo = () => {

  const { winnerPlayer, playerTurn, uiMessage, client } = useGameContext();

  return (
    <div className="clientInfo">
      <div className="playerName">Player: {client?.name}</div>

      <div className="someData">
        {" "}
        {winnerPlayer != undefined && winnerPlayer.name + " is the winner"}
      </div>
      <div className="someData">Turn: {playerTurn.name}</div>
      <div className="someData">{uiMessage}</div>
      </div>
  );
};

export default GameInfo;
