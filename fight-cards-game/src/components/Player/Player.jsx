import React from "react";
import { useGameContext } from "../../Contexts/GameContext";
import PlayerHand from "./PlayerHand";
import PlayerActions from "./PlayerActions";
import PlayerInfo from "./PlayerInfo";
import "./Player.css";


const Player = ({ player }) => {
  const { playerTurn } = useGameContext();
  return (
   <div>
    <div
      className={
        "player" +
        (player.isDead ? " dead" : " ") +
        (playerTurn.id === player.id ? " myTurn" : " ") +
        (player.isWinner ? " winner" : " ")
      }
    >
      <PlayerInfo player={player}></PlayerInfo>
      <br />
      <PlayerHand player={player}></PlayerHand>
      <PlayerActions player={player}></PlayerActions>
    </div>
  </div>
  );
};

export default Player;
