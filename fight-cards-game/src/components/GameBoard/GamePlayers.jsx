import React from "react";
import { useGameContext } from "../../Contexts/GameContext";
import PlayerHand from "../Player/PlayerHand";
import Package from "../Package";
// import "./GameBoardStyle.css";

const GamePlayers = () => {
  const { players, playerTurn } = useGameContext();

  return (
    <div className="vue-container">
      <div className="table">
        <div className="card2-place">
          <Package></Package>
        </div>
        <div className="players2">
          {players.map((player, index) => (
            <div
            key={index}
            className={`playerr player-${index + 1} ${
                playerTurn.id === player.id ? "playing" : ""
              } `}
              >
              <div className="avatar"></div>
              <div className="name">{player.name}</div>
              <div className="">
                <PlayerHand player={player}></PlayerHand>
              </div>
                <br/>
              <br/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamePlayers;

// ${playerPlaying === index ? 'playing' : ''}
