import React from 'react';

const Card = ({imageName}) => {
  const imageUrl = `/static/cards-deck-photos/${imageName}`
  return( 
  <img onDragStart={e => e.preventDefault(console.log('drag start'))} className='flipCard card' src={imageUrl} alt="playing card" />)
};

export default Card;