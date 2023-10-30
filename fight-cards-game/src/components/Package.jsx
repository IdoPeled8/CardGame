import React from 'react';
import Card from './card/Card';
import { useGameContext } from '../Contexts/GameContext';

const Package = () => {

  const { currentCard } = useGameContext();
  
  return (
    <div className="card-deck">
        {currentCard.value !== undefined && (
            <Card imageName={currentCard.imageName} />
          )}
    </div>
  );
};

export default Package;