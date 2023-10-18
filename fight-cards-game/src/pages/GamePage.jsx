import Player from "../components/Player/Player";
import Package from "../components/Package";
//import { onChangeGuard } from "../utils/PlayerMoves";
import { useDeckContext } from "../Contexts/DeckContext";
import SimpleButton from "../components/ui/Button/SimpleButton";
import {
  deleteRemoveAllPlayers,
  postCreateNewPlayer,
  putAttackPlayer,
  putChangeGuard,
} from "../Services/AxiosCalls";
import { colors } from "../utils/Colors";
import SimpleLink from "../components/ui/Link/SimpleLink";
import Card from "../components/card/Card";
import { useEffect, useState } from "react";

const GamePage = () => {
  const {
    players,
    currentCard,
    playerTurn,
    startNewGame,
    removeAllPlayers,
    afterMove,
  } = useDeckContext();

  const [winnerPlayer, setWinnerPlayer] = useState();

  const handleAttack = async (playerToAttack) => {
    const data = await putAttackPlayer(playerToAttack);
    afterMove(data);
  };

  const handleChangeGuard = async (playerToChange) => {
    const data = await putChangeGuard(playerToChange);
    afterMove(data);
  };

  const onRemoveAllPlayers = () => {
    removeAllPlayers();
    window.navigator.reload();
  };

  const checkWinner = () => {
    setWinnerPlayer(players.find((player) => player.isWinner));
    console.log(winnerPlayer);
  };

  useEffect(() => {
    checkWinner()
  }, [handleAttack]);

  return (
    <div className="game-page">
      <div className="GameButtons">
      <SimpleButton color={colors.green} onClick={startNewGame}>
        Start new game
      </SimpleButton>
      <SimpleLink to="/">Back to home page</SimpleLink>
      <SimpleButton color={colors.red} onClick={onRemoveAllPlayers}>
        Remove all Players
      </SimpleButton>
      </div>
      <div className="someData">Turn: {playerTurn.name}</div>

      <div className="someData"> {winnerPlayer != undefined && winnerPlayer.name + " is the winner"}</div>

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
