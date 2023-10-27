import { useGameContext } from "../Contexts/GameContext";

export const useGameActions = () => {
  

  const {
    playerTurn,
    connection,
    clearProps,
  } = useGameContext();
  
  const startNewGame = async () => {
    clearProps();
    connection.invoke("StartGame");
  };
  
  const handleAttack = async (playerToAttack) => {
    await connection.invoke("AttackPlayer", playerToAttack.id, playerTurn.id);
  };
  
  const handleChangeGuard = async (playerToChange) => {
    await connection.invoke("ChangeGuard", playerToChange.id);
  };
  
  const handleAccumulate = async (playerToAccumulate) => {
    await connection.invoke("AccumulateCard", playerToAccumulate.id);
  };
  
  const onRemoveAllPlayers = async () => {
    await connection.invoke("DeleteAllPlayers");
  };
 
  return {
    handleAttack,
    handleChangeGuard,
    handleAccumulate,
    onRemoveAllPlayers,
    startNewGame
  }
}