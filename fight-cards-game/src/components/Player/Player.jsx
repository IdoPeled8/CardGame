import React from 'react';

const Player = ({ data , handleAttack}) => {

  const Attack=()=>{
    handleAttack(data)
  }
  return (
    <div className="player">
      <div className='playerName'>{data.name}</div>
      <div className='playerHand'>
        <ul>
          <li>
            <strong>Guard:</strong>
            <br />
            {data.hand.guard?.shape} | {data.hand.guard?.value}
          </li>
          <br />
          <li>
            <strong>Health:</strong>
            <br />
            {data.hand.heart1.shape} | {data.hand.heart1.value}
            <br />
            {data.hand.heart2.shape} | {data.hand.heart2.value}
          </li>
        </ul>
        <button onClick={Attack}>Attack Me</button>
        <button>Change Guard</button>
      </div>
    </div>
  );
};

export default Player;
