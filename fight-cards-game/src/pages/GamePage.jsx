import Player from '../components/Player/Player';
import Package from '../components/Package';
import { onAttack, onChangeGuard } from '../utils/PlayerMoves';
import { useDeckContext } from '../Contexts/DeckContext';
import SimpleButton from '../components/ui/SimpleButton';



const GamePage = () => {

  const { players, currentCard, playerTurn, changeTurn, TakeCard, dealCardsServer, checkDeath } = useDeckContext();

  const handleAttack = async (enemyPlayer) => {
    if (enemyPlayer.id === playerTurn.id) {
      console.log("cant attack yourself")
    }
    else {
      const card = await TakeCard()
      onAttack(enemyPlayer, card)
      checkDeath()
      changeTurn()
    }
  }

  const handleChangeGuard = async (playerToChange) => {
    const card = await TakeCard()
    onChangeGuard(playerToChange, card)
    changeTurn()
  }

  return (

    <div className="game-page">
      <SimpleButton onClick={dealCardsServer}>Deal Cards Server</SimpleButton>
      {/* show change turn button only if i deal cards */}
      <div className='someData'> Turn: {playerTurn.name}</div>
      <div className='someData'> Card: {currentCard.shape} {currentCard.value}

      </div>

      <div className="player-columns">
        {players.map((player, index) => (
          <div  key={index}>
            <Player player={player} handleAttack={handleAttack} handleChangeGuard={handleChangeGuard} />
          </div>
        ))}
      </div>


      <div><Package /></div>
    </div>
  );
};



export default GamePage;