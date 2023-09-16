import React, { useState } from 'react';
import Player from '../components/Player/Player';
import Package from '../components/Package';
import { onAttack } from '../utils/PlayerMoves';
import { useDeckContext } from '../Contexts/DeckContext';



const GamePage = () => {

  const { players, currentCard, playerTurn, changeTurn, TakeCard, dealCardsServer } = useDeckContext();

  const handleAttack = (enemyPlayer) => {
    if (enemyPlayer.id === playerTurn.id) {
      console.log("cant attack yourself")
    }
    else {
      onAttack(enemyPlayer, playerTurn, currentCard)
      changeTurn()
    }
  }
  return (

    <div className="game-page">
      <button onClick={dealCardsServer}>Deal Cards Server</button>
      {/* show change turn button only if i deal cards */}
      <button onClick={changeTurn}>change Turn</button>
      <button onClick={TakeCard}>pick a card</button>
      <div className='someData'> Turn: {playerTurn.name}</div>
      <div className='someData'> Card: {currentCard.shape} {currentCard.value}

      </div>

      <div className="player-columns">
        {players.map((player, index) => (
          <div key={index}>
            <Player data={player} handleAttack={handleAttack} />
          </div>
        ))}
      </div>


      <div><Package /></div>
    </div>
  );
};



export default GamePage;