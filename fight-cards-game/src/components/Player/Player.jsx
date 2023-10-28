import React from "react";
import { useGameContext } from "../../Contexts/GameContext";
import PlayerHand from "./PlayerHand";
import PlayerInfo from "./PlayerInfo";
import "./Player.css";


const Player = ({ player }) => {
  const { playerTurn,client } = useGameContext();
  return (
    <button
    className={
        "player" +
        (player.isDead ? " dead" : " ") +
        (playerTurn.id === player.id ? " myTurn" : " ") +
        (player.isWinner ? " winner" : " ") +(
          player.id === client.id ? " myPlayer" : " ")
      }
      onClick={() => handleAttack(player)}
    >
      <PlayerInfo player={player}></PlayerInfo>
      <br />
      <PlayerHand player={player}></PlayerHand>
      {/* <PlayerActions player={player}></PlayerActions> */}
    </button>
  );
};

export default Player;
