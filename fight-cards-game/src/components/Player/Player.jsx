import React from 'react';
import SimpleButton from '../ui/Button/SimpleButton';
import { colors } from '../../utils/Colors';
import { useDeckContext } from '../../Contexts/DeckContext';
import Card from '../Card';

const Player = ({ player, handleAttack, handleChangeGuard }) => {

  const {playerTurn} = useDeckContext();
  const attack = () => {
    handleAttack(player)
  }
  const changeGuard = () => {
    handleChangeGuard(player)
  }

  return (
    <div className={player.isDead ? 'dead player' : 'alive player'}>
      <div className='playerName'>{player.name}</div>
      {player.hand?.guard === undefined && <h4>Waiting Player</h4>}
      <div className='playerHand'>
        <ul>
          <li>
            <strong>Guard:</strong>
            <br />
            {/* {player.hand?.guard.shape} | {player.hand?.guard.value} */}
            <Card imageName={player.hand?.guard.imageName}></Card>
          </li>
          <br />
          <li>
            <strong>Health:</strong>
            <br />
            {/* {player.hand?.heart1.shape} | {player.hand?.heart1.value}
            {player.hand?.heart2.shape} | {player.hand?.heart2.value} */}
            <Card imageName={player.hand?.heart1.imageName}></Card>
            <Card imageName={player.hand?.heart2.imageName}></Card>
          </li>
        </ul>
        {!player.isDead && (
          <>
          {playerTurn.name !== player.name && (
            <SimpleButton color={colors.red} onClick={attack}>Attack</SimpleButton>
          )}
            <SimpleButton color={colors.yellow} onClick={changeGuard}>Change Guard</SimpleButton>
          </>
        )}
      </div>
    </div>
  );
};

export default Player;
