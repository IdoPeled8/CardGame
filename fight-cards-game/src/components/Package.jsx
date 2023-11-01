import React from 'react';
import Card from './card/Card';
import { useGameContext } from '../Contexts/GameContext';
import { cardImagePath } from '../utils/PhotosPath';

const Package = () => {

  const { currentCard } = useGameContext();
  
  return (
    <div className="card-deck">
        {currentCard.value !== undefined && (
            <Card imageName={cardImagePath + currentCard.imageName} />
          )}
    </div>
  );
};

export default Package;