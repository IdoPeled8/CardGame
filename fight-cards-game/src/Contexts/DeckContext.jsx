import { createContext, useContext, useState } from "react";
import { whoStart } from "../utils/PlayersUtils";
import {
  getStartGame,
  getTakeCard,
  postCreateNewPlayer,
  deleteRemoveAllPlayers,
} from "../Services/AxiosCalls";
// import { useNavigate } from 'react-router-dom';

const deckContext = createContext();

export function DeckProvider({ children }) {
  const [players, setPlayers] = useState([]);
  const [currentCard, setCurrentCard] = useState({});
  const [playerTurn, setPlayerTurn] = useState("");

  // const navigate = useNavigate();

  const onCreateNewPlayer = async (newPlayer) => {
    await postCreateNewPlayer(newPlayer);
    setPlayers([...players, newPlayer]);
  };
  const dealCardsServer = async () => {
    const playersData = await getStartGame();

    setPlayers((prevPlayers) => {
      const updatedPlayers = [...playersData];
      setPlayerTurn(whoStart(updatedPlayers));
      return updatedPlayers;
    });
  };

  const TakeCard = async () => {
    const card = await getTakeCard();
    setCurrentCard(card);
    return card;
  };

  const changeTurn = () => {
    const index = players.findIndex((player) => player.id === playerTurn.id);

    let newIndex = (index + 1) % players.length;

    while (players[newIndex].isDead === true) {
      newIndex = (newIndex + 1) % players.length;
      console.log("dead player");
    }
    setPlayerTurn(players[newIndex]);
    //move to server?
  };

  const checkDeath = () => {
    setPlayers((prevPlayers) => {
      const updatedPlayers = prevPlayers.map((player) => {
        if (player.hand.heart1.value === 0) {
          return { ...player, isDead: true };
        }
        return player;
      });
      return updatedPlayers;
    });
    //move to server?
  };

  const removeAllPlayers = async () => {
    await deleteRemoveAllPlayers();
    setPlayers([]);
    console.log("all players deleted");
    // navigate("/");
  };

  const changePlayerData = (playerToChange) => {
    const playerIndex = players.findIndex((player) => {
      return player.id === playerToChange.id
    });

    const updatedPlayers = [...players];
    updatedPlayers[playerIndex] = playerToChange;
    setPlayers(updatedPlayers);
    console.log(updatedPlayers);
  }

  return (
    <deckContext.Provider
      value={{
        currentCard,
        playerTurn,
        players,
        changeTurn,
        TakeCard,
        dealCardsServer,
        checkDeath,
        onCreateNewPlayer,
        removeAllPlayers,
        changePlayerData,
      }}
    >
      {children}
    </deckContext.Provider>
  );
}

export const useDeckContext = () => {
  return useContext(deckContext);
};
