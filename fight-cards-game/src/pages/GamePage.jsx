import Player from "../components/Player/Player";
import Package from "../components/Package";
//import { onChangeGuard } from "../utils/PlayerMoves";
import { useDeckContext } from "../Contexts/DeckContext";
import SimpleButton from "../components/ui/Button/SimpleButton";
import { putAttackPlayer, putChangeGuard } from "../Services/AxiosCalls";
import { colors } from "../utils/Colors";
import SimpleLink from "../components/ui/Link/SimpleLink";
import Card from "../components/card/Card";
import { useEffect, useState } from "react";

// TO DO
// add save card for later attack logic
// add visuals + looking + custom CSS
// make authorization for admins to delete players and more...
// make rooms so every table will be with limited players
// make ready button so when all players ready start the game
// if player join in the middle of the game put him in waiting list
// add a chat for the game

const GamePage = () => {
  const {
    players,
    currentCard,
    playerTurn,
    startNewGame,
    removeAllPlayers,
    connection,
    client,
    uiMessage,
  } = useDeckContext();

  const [winnerPlayer, setWinnerPlayer] = useState();
console.log(uiMessage);
  const handleAttack = async (playerToAttack) => {
    await connection.invoke("AttackPlayer", playerToAttack.id, playerTurn.id);
  };

  const handleChangeGuard = async (playerToChange) => {
    await connection.invoke("ChangeGuard", playerToChange.id);
  };

  const handleAccumulate = async (playerToAccumulate) => {
    await connection.invoke("AccumulateCard", playerToAccumulate.id);
  };

  const onRemoveAllPlayers = async () => {
    await connection.invoke("DeleteAllPlayers");
  };

  const checkWinner = () => {
    setWinnerPlayer(players.find((player) => player.isWinner));
  };

  useEffect(() => {
    checkWinner();
  }, [handleAttack]);

  return (
    <div className="game-page">
      <div className="GameButtons">
        <SimpleButton color={colors.green} onClick={startNewGame}>
          Start new game
        </SimpleButton>
        <SimpleLink to="/">Back to home page</SimpleLink>
        Remove all Players
        <SimpleButton
          color={colors.red}
          onClick={onRemoveAllPlayers}
        ></SimpleButton>
      </div>
      <div className="playerName">Player: {client?.name}</div>

      <div className="someData">
        {" "}
        {winnerPlayer != undefined && winnerPlayer.name + " is the winner"}
      </div>
          <div className="someData">Turn: {playerTurn.name}</div>
          <div className="someData">{uiMessage}</div>
      <div className="table">
        <div className="card-deck">
          {currentCard.value !== undefined && (
            <Card imageName={currentCard.imageName} />
          )}
        </div>
        <div className="players">
          {players.map((player, index) => (
            <Player
              key={index}
              player={player}
              handleAttack={handleAttack}
              handleChangeGuard={handleChangeGuard}
              handleAccumulate={handleAccumulate}
            />
          ))}
        </div>
      </div>
      <div>
        <Package />
      </div>
    </div>
  );
};

export default GamePage;
