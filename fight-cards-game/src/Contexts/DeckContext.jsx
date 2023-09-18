import { createContext, useContext, useState } from "react";
import { whoStart } from "../utils/PlayersUtils";
import { GetStartGame, GetTakeCard, GetShuffleDeck } from "../Services/AxiosCalls";

const deckContext = createContext()

export function DeckProvider({ children }) {
  const [players, setPlayers] = useState([]);
  const [currentCard, setCurrentCard] = useState({})
  const [playerTurn, setPlayerTurn] = useState("");
  const [deck, setDeck] = useState([])

  const dealCardsServer = async () => {
    setPlayers([])

    const PlayersAndDeck = await GetStartGame();
    const newPlayers = PlayersAndDeck.item1;
    const newDeck = PlayersAndDeck.item2;

    setDeck(newDeck)

    //i think i can remove the prevplayers and than remove set players to empty and this will just ovveride the prev players
    setPlayers((prevPlayers) => {
      const updatedPlayers = [...prevPlayers, ...newPlayers];

      setPlayerTurn(whoStart(updatedPlayers))

      return updatedPlayers;
    });
  };

  const shuffleDeck = async () => {
    const newDeck = await GetShuffleDeck()
    return newDeck
  }
  const TakeCard = async () => {

    if (deck.length === 1) {
      const newDeck = await shuffleDeck()
      setDeck(newDeck)
    }
    //manage deck in client (maybe security issue?)
    const newCard = deck[0]
    setCurrentCard(newCard)
    console.log(deck)
    deck.splice(0, 1)
    return newCard

    // ||| manage take card from server (if i dont want that the clint will know the deck) |||
    // const card = await GetTakeCard()
    // setCurrentCard(card)
    // return card
  }

  const changeTurn = () => {

    const index = players.findIndex(player => player.id === playerTurn.id);

    let newIndex = (index + 1) % players.length;

    while (players[newIndex].isDead === true) {

      newIndex = (newIndex + 1) % players.length;
      console.log("dead player")
    }

    setPlayerTurn(players[newIndex]);
  };

  const checkDeath = () => {
    setPlayers((prevPlayers) => {
      const updatedPlayers = prevPlayers.map(player => {
        if (player.hand.heart1.value === 0) {
          return { ...player, isDead: true }
        }
        return player
      })
      return updatedPlayers
    })
  }

  return (<deckContext.Provider value={{ currentCard, playerTurn, players, deck, changeTurn, TakeCard, dealCardsServer, checkDeath }}>
    {children}
  </deckContext.Provider>)
}

export const useDeckContext = () => {
  return useContext(deckContext)
}