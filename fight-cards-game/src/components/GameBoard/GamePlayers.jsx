import React from "react";
import Player from "../Player/Player";
import { useGameContext } from "../../Contexts/GameContext";
import Card from "../card/Card";
import PlayerHand from "../Player/PlayerHand";
import Package from "../Package";

const GamePlayers = () => {
  const { players } = useGameContext();

  return (
    <div className="vue-container">
      <div className="table">
        <div className="card2-place">
          <Package></Package>
        </div>
        <div className="players2">
          {players.map((player, index) => (
            <div key={index} className={`playerr player-${index + 1} `}>
              <Player player={player}></Player>
              {/* <div className="bank"></div>
              <div className="avatar"></div>
              <div className="name">{player.name}</div>
            <PlayerHand player={player}></PlayerHand> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamePlayers;

// ${playerPlaying === index ? 'playing' : ''}
