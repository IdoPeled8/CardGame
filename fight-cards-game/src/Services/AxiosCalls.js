import axios from "axios";

const getStartGameUrl = "https://localhost:7129/api/CardsGame/StartGame";
const getTakeCardUrl = "https://localhost:7129/api/CardsGame/TakeCard";
const getShuffleDeckUrl = "https://localhost:7129/api/CardsGame/ShuffleDeck";
const postCreateNewPlayerURL = "https://localhost:7129/api/CardsGame/CreateNewPlayer";

const deleteRemovePlayerUrl = "https://localhost:7129/api/CardsGame/DeletePlayerById";

const deleteRemoveAllPlayersUrl = "https://localhost:7129/api/CardsGame/DeleteAllPlayers";

const putAttackPlayerUrl = "https://localhost:7129/api/CardsGame/AttackPlayer";

export const getStartGame = async () => {
  const { data: GameData } = await axios.get(getStartGameUrl);
  console.log(GameData);
  return GameData;
};

export const getTakeCard = async () => {
  const { data: card } = await axios.get(getTakeCardUrl);
  return card;
};

export const getShuffleDeck = async () => {
  const { data: deck } = await axios.get(getShuffleDeckUrl);
  return deck;
};

export const postCreateNewPlayer = async (newPlayer) => {
  console.log(newPlayer);
  const {data: newPlayerData} = await axios.post(
    postCreateNewPlayerURL + `?name=${newPlayer}`
  );
  console.log(newPlayerData);
  return newPlayerData;
};

export const putAttackPlayer = async (playerId, attackCardValue) => {
  const {data: newPlayerData} = await axios.put(
    putAttackPlayerUrl + `/${playerId}/${attackCardValue}`
  )
  console.log("after attack");
  console.log(newPlayerData);
  return newPlayerData
}
export const deleteRemovePlayer = async (id) => {
  const res = await axios.delete(deleteRemovePlayerUrl+"/"+id);
  console.log(res);
};
export const deleteRemoveAllPlayers = async () => {
  const res = await axios.delete(deleteRemoveAllPlayersUrl);
  console.log(res);
};