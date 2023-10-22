import { createContext, useContext, useEffect, useState } from "react";
import {
  getStartGame,
  postCreateNewPlayer,
  deleteRemoveAllPlayers,
} from "../Services/AxiosCalls";
import { HubConnectionBuilder } from "@microsoft/signalr";

const deckContext = createContext();

export function DeckProvider({ children }) {
  const [players, setPlayers] = useState([]);
  const [currentCard, setCurrentCard] = useState({});
  const [playerTurn, setPlayerTurn] = useState("");

  useEffect(() => {
    // Start the connection
    const connection = new HubConnectionBuilder()
      .withUrl("https://localhost:7129/gameHub")
      .build();

    connection
      .start()
      .then(() => console.log("Connected to SignalR"))
      .catch((error) => console.error("Error connecting to SignalR", error));

    connection.on("ReceiveMessage", (user, message) => {
      console.log(`${user}: ${message}`);
      setMsg(message);
    });
    connection.on("GetAllPlayers", (allPlayers) => {
      setPlayers(allPlayers);
    });

    //Return a cleanup function to stop the connection when the component unmounts
    return () => {
      connection.stop();
    };
  }, []);



  const onCreateNewPlayer = async (newPlayer) => {
    await postCreateNewPlayer(newPlayer);
    //setPlayers([...players, newPlayer]);
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
        // connection,
      }}
    >
      {children}
    </deckContext.Provider>
  );
}

export const useDeckContext = () => {
  return useContext(deckContext);
};
