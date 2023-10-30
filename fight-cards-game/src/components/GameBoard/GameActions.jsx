import React from "react";
import { useGameActions } from "../../Hooks/UseGameActions";
import { Link } from "react-router-dom";

const GameActions = () => {
  const { startNewGame, onRemoveAllPlayers } = useGameActions();

  return (
    <div className="GameButtons">
      <button className="simpleBtn color-green" onClick={startNewGame}>
        Start new game
      </button>
      <Link to="/" className="simpleBtn color-lightBlue">
        Back to home page
      </Link>
      <button className="simpleBtn color-red" onClick={onRemoveAllPlayers}>
        Remove all Players
      </button>
    </div>
  );
};

export default GameActions;
