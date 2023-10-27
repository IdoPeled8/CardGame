import React from 'react';
import Card from '../card/Card';

const PlayerHand = ({ player }) => {


  return (
    <div>
       <div className="card-container ">
          <Card imageName={player.hand?.guard?.imageName}></Card>
      </div>
        <div className="card-container ">
          <Card imageName={player.hand?.heart1?.imageName}></Card>
          <Card imageName={player.hand?.heart2?.imageName}></Card>
          <Card imageName={player.hand.accumulate?.imageName}></Card>
        </div>
    </div>
  );
};

export default PlayerHand;