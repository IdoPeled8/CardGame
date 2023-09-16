// export const deckOfCards = [
//   { suit: 'Hearts', value: '2' },
//   { suit: 'Hearts', value: '3' },
//   { suit: 'Hearts', value: '4' },
//   { suit: 'Hearts', value: '5' },
//   { suit: 'Hearts', value: '6' },
//   { suit: 'Hearts', value: '7' },
//   { suit: 'Hearts', value: '8' },
//   { suit: 'Hearts', value: '9' },
//   { suit: 'Hearts', value: '10' },
//   { suit: 'Hearts', value: '11' },
//   { suit: 'Hearts', value: '12' },
//   { suit: 'Hearts', value: '13' },
//   { suit: 'Hearts', value: '1' },
//   { suit: 'Diamonds', value: '2' },
//   { suit: 'Diamonds', value: '3' },
//   { suit: 'Diamonds', value: '4' },
//   { suit: 'Diamonds', value: '5' },
//   { suit: 'Diamonds', value: '6' },
//   { suit: 'Diamonds', value: '7' },
//   { suit: 'Diamonds', value: '8' },
//   { suit: 'Diamonds', value: '9' },
//   { suit: 'Diamonds', value: '10' },
//   { suit: 'Diamonds', value: '11' },
//   { suit: 'Diamonds', value: '12' },
//   { suit: 'Diamonds', value: '13' },
//   { suit: 'Diamonds', value: '1' },
//   { suit: 'Clubs', value: '2' },
//   { suit: 'Clubs', value: '3' },
//   { suit: 'Clubs', value: '4' },
//   { suit: 'Clubs', value: '5' },
//   { suit: 'Clubs', value: '6' },
//   { suit: 'Clubs', value: '7' },
//   { suit: 'Clubs', value: '8' },
//   { suit: 'Clubs', value: '9' },
//   { suit: 'Clubs', value: '10' },
//   { suit: 'Clubs', value: '11' },
//   { suit: 'Clubs', value: '12' },
//   { suit: 'Clubs', value: '13' },
//   { suit: 'Clubs', value: '1' },
//   { suit: 'Spades', value: '2' },
//   { suit: 'Spades', value: '3' },
//   { suit: 'Spades', value: '4' },
//   { suit: 'Spades', value: '5' },
//   { suit: 'Spades', value: '6' },
//   { suit: 'Spades', value: '7' },
//   { suit: 'Spades', value: '8' },
//   { suit: 'Spades', value: '9' },
//   { suit: 'Spades', value: '10' },
//   { suit: 'Spades', value: '11' },
//   { suit: 'Spades', value: '12' },
//   { suit: 'Spades', value: '13' },
//   { suit: 'Spades', value: '1' }
// ];


//without server (in component)
  // const dealCards = () => {

  //   shuffleDeck(deckOfCards);

  //   const dealPlayers = players.map(player => ({ ...player, hand: deckOfCards.splice(0, 3) }));

  //   setPlayers(dealPlayers)

  //   console.log(players)
  // }



  // const dealPlayers = players.map((player) => {
    //   // Take the first two cards for health
    //   const healthCards = deck.splice(0, 2);
    //   // Take the last card for guard
    //   const guardCard = deck.pop();

    //   // Create an object to represent the player's hand
    //   const hand = {
    //     health: healthCards,
    //     guard: guardCard,
    //   };

    //   return { ...player, hand };
    // });

    // setPlayers((prevPlayers) => {
    //   console.log(dealPlayers); // Updated players data
    //   return dealPlayers;
    // });
    // console.log(players); // Updated players data

