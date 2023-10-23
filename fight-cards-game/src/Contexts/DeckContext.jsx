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
  const [connection, setConnection] = useState(null);
  const [client, setClient] = useState(null);

  //when all working add a chat for the game

useEffect(() => {
  // Create the SignalR connection when the component mounts
  const newConnection = new HubConnectionBuilder()
    .withUrl("https://localhost:7129/gameHub")
    .build();

  // Start the connection
  newConnection
    .start()
    .then(() => {
      console.log("Connected to SignalR");
      // Set the connection in state after it successfully starts
      setConnection(newConnection);
    })
    .catch((error) => console.error("Error connecting to SignalR", error));

    //LISTENERS
  newConnection.on("ReceiveMessage", (message) => {
  });

  newConnection.on("GetAllPlayers", (allPlayers) => {
    // Handle the list of players if needed
  });

  newConnection.on("getClientSender", (player) => {
    console.log(player);
    setClient(player);
  })

  newConnection.on("AllPlayersDeleted", (allPlayers) => {
    console.log(allPlayers);
    setPlayers([]);
    setCurrentCard({});
    setPlayerTurn("");
  });

  newConnection.on("AfterMoveUpdate", (gameData) => {
    //afterMove(gameData);
    setPlayers(gameData.players);
    setCurrentCard(gameData.cardTake);
    setPlayerTurn(gameData.playerTurn);
    console.log("set data");
  })

  // Return a cleanup function to stop the connection when the component unmounts
  return () => {
    if (newConnection && newConnection.state === "Connected") {
      newConnection.stop();
    }
  };
}, []);

  const startNewGame = async () => {
    clearProps();
    connection.invoke("StartGame");
  };

  const removeAllPlayers = async () => {
    await deleteRemoveAllPlayers();
    clearProps();
    console.log("all players deleted");
  };

  const clearProps = () => {
    setPlayers([]);
    setCurrentCard({});
    setPlayerTurn("");
  console.log("clear props");
  };

  const checkPlayerTurn = (player) => {
    if (playerTurn.id != player.id) {
      console.log("not your turn");
    }
  }

  return (
    <deckContext.Provider
      value={{
        currentCard,
        playerTurn,
        players,
        startNewGame,
        removeAllPlayers,
       connection,
       client,
      }}
    >
      {children}
    </deckContext.Provider>
  );
}

export const useDeckContext = () => {
  return useContext(deckContext);
};
