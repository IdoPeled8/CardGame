import React from 'react';

const Card = ({imageName}) => {
  const imageUrl = `../../../public/cards deck photos/${imageName}`
  return <img className='card' src={imageUrl} alt="playing card" />
};

export default Card;