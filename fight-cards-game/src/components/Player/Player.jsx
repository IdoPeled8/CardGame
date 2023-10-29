import React from "react";
import { useGameContext } from "../../Contexts/GameContext";
import PlayerHand from "./PlayerHand";
import PlayerInfo from "./PlayerInfo";
import "./Player.css";

const Player = ({ player }) => {
  const { playerTurn, client } = useGameContext();
  return (
    <div>
      <PlayerInfo player={player}></PlayerInfo>
      <PlayerHand player={player}></PlayerHand>
      {/* <PlayerActions player={player}></PlayerActions> */}
    </div>
  );
};

export default Player;
