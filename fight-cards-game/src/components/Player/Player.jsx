import React from "react";
import SimpleButton from "../ui/Button/SimpleButton";
import { colors } from "../../utils/Colors";
import { useDeckContext } from "../../Contexts/DeckContext";
import Card from "../card/Card";

const Player = ({ player, handleAttack, handleChangeGuard }) => {
  const { playerTurn, client } = useDeckContext();
  const attack = () => {
    handleAttack(player);
  };
  const changeGuard = () => {
    handleChangeGuard(player);
  };

  return (
    <div
      className={
        "player" +
        (player.isDead ? " dead" : " ") +
        (playerTurn.id === player.id ? " myTurn" : " ") +
        (player.isWinner ? " winner" : " ")
      }
    >
      <div className="playerName">{player.name}</div>

      {player.hand?.guard === undefined && <h4>Waiting Player</h4>}

      <br />
      <div className="card-container">
        {player.hand?.guard !== undefined && (
          <Card imageName={player.hand?.guard?.imageName}></Card>
        )}
      </div>
      {player.hand?.heart1 !== undefined && (
        <div className="card-container">
          <Card imageName={player.hand?.heart1?.imageName}></Card>
          <Card imageName={player.hand?.heart2?.imageName}></Card>
        </div>
      )}
      {!player.isDead && !player.isWinner && playerTurn.id === client.id && (
        <>
        <SimpleButton color={colors.green} onClick={changeGuard}>
          Change Guard
        </SimpleButton>
      {playerTurn.id !== player.id && (
        <SimpleButton color={colors.red} onClick={attack}>
        Attack
        </SimpleButton>
        )}
        </>
        )}
    </div>
  );
};

export default Player;
