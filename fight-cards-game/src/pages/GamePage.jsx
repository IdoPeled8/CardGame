import Player from "../components/Player/Player";
import Package from "../components/Package";
import { onAttack, onChangeGuard } from "../utils/PlayerMoves";
import { useDeckContext } from "../Contexts/DeckContext";
import SimpleButton from "../components/ui/Button/SimpleButton";
import {
  deleteRemoveAllPlayers,
  postCreateNewPlayer,
  putAttackPlayer,
} from "../Services/AxiosCalls";
import { colors } from "../utils/Colors";
import SimpleLink from "../components/ui/Link/SimpleLink";
import Card from "../components/Card";

const GamePage = () => {
  const {
    players,
    currentCard,
    playerTurn,
    changeTurn,
    TakeCard,
    dealCardsServer,
    checkDeath,
    removeAllPlayers,
    changePlayerData,
  } = useDeckContext();

  const handleAttack = async (enemyPlayer) => {
    if (enemyPlayer.id === playerTurn.id) {
      console.log("cant attack yourself");
    } else {
      const card = await TakeCard();
      const newPlayerData = await onAttack(enemyPlayer, card);
      console.log(newPlayerData);
      if (newPlayerData !== undefined) {
        changePlayerData(newPlayerData);
        checkDeath();
      }
    }
    changeTurn();
  };

  const handleChangeGuard = async (playerToChange) => {
    const card = await TakeCard();
    onChangeGuard(playerToChange, card);
    changeTurn();
  };

  const onRemoveAllPlayers = () => {
    removeAllPlayers();
    window.navigator.reload();
  };

  return (
    <div className="game-page">
      {players.length >= 2 && (
        <SimpleButton color={colors.white} onClick={dealCardsServer}>
          Start new game
        </SimpleButton>
      )}
      <SimpleLink to="/">back to home page</SimpleLink>

      <SimpleButton color={colors.red} onClick={onRemoveAllPlayers}>
        Remove all Players
      </SimpleButton>
      {/* <SimpleButton color={colors.red} onClick={onRemovePlayer}>remove specific player(not working)</SimpleButton> */}

      <div className="someData"> Turn: {playerTurn.name}</div>
      <div className="someData">
        {" "}
        Card: <Card imageName={currentCard.imageName} />
      </div>
      <br />

      <div className="player-columns">
        {players.map((player, index) => (
          <div key={index}>
            <Player
              player={player}
              handleAttack={handleAttack}
              handleChangeGuard={handleChangeGuard}
            />
          </div>
        ))}
      </div>

      <div>
        <Package />
      </div>
    </div>
  );
};

export default GamePage;
