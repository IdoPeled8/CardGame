import React from "react";
import Card from "../card/Card";
import { useGameActions } from "../../Hooks/UseGameActions";
import { useGameContext } from "../../Contexts/GameContext";
import "./player.css"
import { cardImagePath } from "../../utils/PhotosPath";
const PlayerHand = ({ player }) => {
  const { handleAttack, handleChangeGuard, handleAccumulate } =
    useGameActions();

  const { playerTurn, client } = useGameContext();
  return (
    <>
    {console.log("../../../public/cards deck photos/"+ player.hand?.heart1?.imageName)}
      <div className="card-container ">
        <button
          className="card-container health"
          onClick={() => handleAttack(player)}
          disabled={
            player.isDead ||
            player.isWinner ||
            playerTurn.id === player.id ||
            playerTurn.id !== client.id
          }
        >
          <Card imageName={cardImagePath + player.hand?.heart1?.imageName}></Card>
          <Card imageName={cardImagePath + player.hand?.heart2?.imageName}></Card>
        </button>
        <button
          className="accumulate"
          onClick={() => handleAccumulate(player)}
          disabled={
            player.isDead ||
            player.isWinner ||
            playerTurn.id !== player.id ||
            playerTurn.id !== client.id
          }
        >
          <Card imageName={cardImagePath + player.hand.accumulate?.imageName}></Card>
        </button>
      </div>
      <div className="card-container ">
        <button
          className="card-container guard "
          onClick={() => handleChangeGuard(player)}
          disabled={
            player.isDead || player.isWinner || playerTurn.id !== client.id
          }
        >
          <Card imageName={cardImagePath + player.hand?.guard?.imageName}></Card>
        </button>
      </div>
    </>
  );
};

export default PlayerHand;
