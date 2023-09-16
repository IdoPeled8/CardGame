import { createContext, useContext, useState } from "react";
import axios from "axios";
import { whoStart } from "../utils/PlayersUtils";
import { GetStartGame, GetTakeCard } from "../ServerCalls/AxiosCalls";

const deckContext = createContext()

export function DeckProvider({ children }) {
  const [players, setPlayers] = useState([]);
  const [currentCard, setCurrentCard] = useState({})
  const [playerTurn, setPlayerTurn] = useState("");

  const dealCardsServer = async () => {
    setPlayers([])

    const newPlayers = await GetStartGame();

    setPlayers((prevPlayers) => {
      const updatedPlayers = [...prevPlayers, ...newPlayers]; 
      setPlayerTurn(whoStart(updatedPlayers))
      return updatedPlayers;
    });
  };
  const TakeCard = async () => {
    setCurrentCard(await GetTakeCard())
  }

  const changeTurn = () => {
    const index = players.findIndex(player => player.name === playerTurn.name)
    const newIndex = (index + 1) % players.length
    setPlayerTurn((prev) => players[newIndex])
  };

  return (<deckContext.Provider value={{ currentCard, playerTurn, players, changeTurn, TakeCard, dealCardsServer }}>
    {children}
  </deckContext.Provider>)
}

export const useDeckContext = () => {
  return useContext(deckContext)
}