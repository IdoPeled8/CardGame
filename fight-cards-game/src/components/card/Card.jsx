import React from 'react';

const Card = ({imageName}) => {
  const imageUrl = `/static/cards-deck-photos/${imageName}`
  console.log(imageUrl)
  return <img className='card' src={imageUrl} alt="playing card" />
};

export default Card;