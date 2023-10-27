import React from "react";
import "./Player.css";
const PlayerInfo = ( { player }) => {
  return (
    <div className="bg-info playerName" >
      {player.name}

      {player.hand?.guard === undefined && <h4>Waiting Player</h4>}
    </div>
  );
};

export default PlayerInfo;
