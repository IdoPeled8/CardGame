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
    afterMove,
  } = useDeckContext();

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

  return (
    <div className="game-page">
      <SimpleButton color={colors.white} onClick={dealCardsServer}>
        Start new game
      </SimpleButton>
      <SimpleLink to="/">Back to home page</SimpleLink>
      <SimpleButton color={colors.red} onClick={onRemoveAllPlayers}>
        Remove all Players
      </SimpleButton>
      <div className="someData">Turn: {playerTurn.name}</div>
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
