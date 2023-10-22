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
    console.log(message);
  });

  newConnection.on("GetAllPlayers", (allPlayers) => {
    console.log(allPlayers);
    // Handle the list of players if needed
  });

  newConnection.on("AfterMoveUpdate", (gameData) => {
    console.log(gameData);
    afterMove(gameData);
  })

  // Return a cleanup function to stop the connection when the component unmounts
  return () => {
    if (newConnection && newConnection.state === "Connected") {
      newConnection.stop();
    }
  };
}, []);

  const onCreateNewPlayer = async (newPlayer) => {
    connection.invoke("CreatePlayer", newPlayer);
    //for now i dont update the players list everytime only when start game is clicked
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
       connection,
      }}
    >
      {children}
    </deckContext.Provider>
  );
}

export const useDeckContext = () => {
  return useContext(deckContext);
};
