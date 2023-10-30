import { createContext, useContext, useEffect, useState } from "react";
fight-cards-game/src/Contexts/GameContext.jsx
import { HubConnectionBuilder } from "@microsoft/signalr";

const gameContext = createContext();

export function GameProvider({ children }) {
  const [players, setPlayers] = useState([]);
  const [currentCard, setCurrentCard] = useState({});
  const [playerTurn, setPlayerTurn] = useState("");
  const [connection, setConnection] = useState(null);
  const [client, setClient] = useState(null);
  const [uiMessage, setUiMessage] = useState("");
  const [winnerPlayer, setWinnerPlayer] = useState();

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
        setConnection(newConnection);
      })
      .catch((error) => console.error("Error connecting to SignalR", error));

    //LISTENERS
    newConnection.on("ReceiveMessage", (message) => {
      setUiMessage(message);
    });

    newConnection.on("getClientSender", (player) => {
      console.log(player);
      setClient(player);
    });

    newConnection.on("AllPlayersDeleted", (allPlayers) => {
      console.log(allPlayers);
      setPlayers([]);
      setCurrentCard({});
      setPlayerTurn("");
    });

    newConnection.on("AfterMoveUpdate", (gameData) => {
      console.log(gameData);
      setPlayers(gameData.players);
      setCurrentCard(gameData.cardTake);
      setPlayerTurn(gameData.playerTurn);
      checkWinner();
      console.log("set data");
    });

    // Return a cleanup function to stop the connection when the component unmounts
    return () => {
      if (newConnection && newConnection.state === "Connected") {
        newConnection.stop();
      }
    };
  }, []);

  const clearProps = () => {
    setPlayers([]);
    setCurrentCard({});
    setPlayerTurn("");
    console.log("clear props");
  };

  //move to logic
  const checkWinner = () => {
    setWinnerPlayer(players.find((player) => player.isWinner));
  };

  return (
    <gameContext.Provider
      value={{
        currentCard,
        playerTurn,
        players,
        connection,
        client,
        uiMessage,
        winnerPlayer,
        clearProps,
      }}
    >
      {children}
    </gameContext.Provider>
  );
}

export const useGameContext = () => {
  return useContext(gameContext);
};
