import React from "react";
import Card from "../card/Card";
import { useGameActions } from "../../Hooks/UseGameActions";
import { useGameContext } from "../../Contexts/GameContext";

const PlayerHand = ({ player }) => {
  const { handleAttack, handleChangeGuard, handleAccumulate } =
    useGameActions();

  const { playerTurn, client } = useGameContext();
  return (
    <div>
      <div className="card-container ">
        <button
          className="card-container guard "
          onClick={() => handleChangeGuard(player)}
          disabled={
            player.isDead || player.isWinner || playerTurn.id !== client.id
          }
        >
          <Card imageName={player.hand?.guard?.imageName}></Card>
        </button>
      </div>
      <div className="card-container ">
        <button
          className="card-container health color-lightGreen"
          onClick={() => handleAttack(player)}
          disabled={
            player.isDead || player.isWinner || playerTurn.id === player.id || playerTurn.id !== client.id
          }
        >
          <Card imageName={player.hand?.heart1?.imageName}></Card>
          <Card imageName={player.hand?.heart2?.imageName}></Card>
        </button>
        <button
          className="card-container accumulate"
          onClick={() => handleAccumulate(player)}
          disabled={
            player.isDead || player.isWinner || playerTurn.id !== player.id || playerTurn.id !== client.id
          }
        >
          <Card imageName={player.hand.accumulate?.imageName}></Card>
        </button>
      </div>
    </div>
  );
};

export default PlayerHand;
