import { createContext, useContext, useState } from "react";
import {
  getStartGame,
  postCreateNewPlayer,
  deleteRemoveAllPlayers,
} from "../Services/AxiosCalls";

const deckContext = createContext();

export function DeckProvider({ children }) {
  const [players, setPlayers] = useState([]);
  const [currentCard, setCurrentCard] = useState({});
  const [playerTurn, setPlayerTurn] = useState("");

  const onCreateNewPlayer = async (newPlayer) => {
    await postCreateNewPlayer(newPlayer);
    setPlayers([...players, newPlayer]);
  };

  const startNewGame = async () => {
    clearProps();
    const data = await getStartGame();
    setPlayers(data.players);
    setPlayerTurn(data.playerTurn);
  };

  const removeAllPlayers = async () => {
    await deleteRemoveAllPlayers();
    clearProps();
    console.log("all players deleted");
  };

  const afterMove = (data) => {
    setPlayers(data.players);
    setCurrentCard(data.cardTake);
    setPlayerTurn(data.playerTurn);
  };
  
  const clearProps = () => {
    setPlayers([]);
    setCurrentCard({});
    setPlayerTurn("");
  };

  return (
    <deckContext.Provider
      value={{
        currentCard,
        playerTurn,
        players,
        startNewGame,
        onCreateNewPlayer,
        removeAllPlayers,
        afterMove,
      }}
    >
      {children}
    </deckContext.Provider>
  );
}

export const useDeckContext = () => {
  return useContext(deckContext);
};
