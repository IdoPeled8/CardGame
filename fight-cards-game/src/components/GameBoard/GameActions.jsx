import React from "react";
import SimpleButton from "../ui/Button/SimpleButton";
import SimpleLink from "../ui/Link/SimpleLink";
import { colors } from "../../utils/Colors";
import { useGameActions } from "../../Hooks/UseGameActions";
import { Link } from "react-router-dom";

const GameActions = () => {
  const { startNewGame, onRemoveAllPlayers } = useGameActions();

  return (
    <div className="GameButtons">
      <button className={colors.green} onClick={startNewGame}>
        Start new game
      </button>
      <Link to="/" className={colors.lightBlue}>
        Back to home page
      </Link>
      <button className={colors.red} onClick={onRemoveAllPlayers}>
        Remove all Players
      </button>
    </div>
  );
};

export default GameActions;
