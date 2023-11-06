import React, { useState } from "react";
import { useGameContext } from "../../Contexts/GameContext";
import PlayerHand from "../Player/PlayerHand";
import PickCard from "../PickCard";
import HelpBox from "../HelpBox";
import Package from "../Package";
import GameInfo from "./GameInfo";
// import "./GameBoardStyle.css";

const GamePlayers = () => {
  const { players, playerTurn, client } = useGameContext();
  const [showHelp, setShowHelp] = useState(false);

  const toggleHelp = () => {
    console.log("showHelp", showHelp);
    setShowHelp(!showHelp);
  };

  return (
    <div className="vue-container">
      <div className="table">
        <div
          className="card2-place"
          onDragStart={(e) => e.preventDefault(console.log("drag start"))}
        >
        <div className="data">
          <PickCard></PickCard>
          <Package></Package>
        </div>
        <div className="data">
          <GameInfo></GameInfo>
        </div>
        </div>

        <div className="players2">
          {players.map((player, index) => (
            <div
              key={index}
              className={`playerr
    ${playerTurn.id === player.id ? "playing" : ""}
    ${player.id === client.id ? "player-1" : `player-${index + 2}`}
    ${player.isWinner ? "winner" : ""}
    ${player.isDead ? "dead" : ""}`
  }
>
              <div className="nameAvatar">
                <div className="name">{player.name}</div>
                <div className="avatar"></div>
              </div>
              <div className="hand">
                <PlayerHand player={player}></PlayerHand>
                {client.id === player.id && (
                  <>
                    <button className="buttonHelp" onClick={toggleHelp}>
                      Help
                    </button>
                    {showHelp && <HelpBox onClose={toggleHelp} />}
                  </>
                )}
              </div>
              <br />
              <br />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamePlayers;

// ${playerPlaying === index ? 'playing' : ''}
