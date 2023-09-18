import React from 'react';
import SimpleButton from '../ui/SimpleButton';

const Player = ({ player, handleAttack, handleChangeGuard }) => {

  const attack = () => {
    handleAttack(player)
  }
  const changeGuard = () => {
    handleChangeGuard(player)
  }

  return (
    <div className={player.isDead ? 'dead player' : 'alive player'}>
      <div className='playerName'>{player.name}</div>
      <div className='playerHand'>
        <ul>
          <li>
            <strong>Guard:</strong>
            <br />
            {player.hand.guard?.shape} | {player.hand.guard?.value}
          </li>
          <br />
          <li>
            <strong>Health:</strong>
            <br />
            {player.hand.heart1.shape} | {player.hand.heart1.value}
            <br />
            {player.hand.heart2.shape} | {player.hand.heart2.value}
          </li>
        </ul>
        {!player.isDead && (
          <>
            <SimpleButton onClick={attack}>Attack Me</SimpleButton>
            <SimpleButton onClick={changeGuard}>Change Guard</SimpleButton>
          </>
        )}
      </div>
    </div>
  );
};

export default Player;
