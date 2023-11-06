import React, { useState } from 'react';
import Card from './card/Card';
import { useGameContext } from '../Contexts/GameContext';
import "./animation.css"

const PickCard = () => {


  const { currentCard,cardAnimation} = useGameContext();
  console.log(cardAnimation);
  return (
    <div className={"card-animation "  + cardAnimation}  >
        {currentCard.value !== undefined && (
            <Card imageName={currentCard.imageName} />
          )}
    </div>
  );
};

export default PickCard;
