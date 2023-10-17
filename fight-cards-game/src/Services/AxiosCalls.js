import axios from "axios";
import {
  putAttackPlayerUrl,
  deleteRemovePlayerUrl,
  deleteRemoveAllPlayersUrl,
  postCreateNewPlayerURL,
  getStartGameUrl,
  getTakeCardUrl,
  getShuffleDeckUrl,
  putChangeGuardUrl,
} from "../data/URLs";

export const getStartGame = async () => {
  const { data: GameData } = await axios.get(getStartGameUrl);
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
  const { data: newPlayerData } = await axios.post(
    postCreateNewPlayerURL + `?name=${newPlayer}`
  );
  return newPlayerData;
};

export const putAttackPlayer = async (playerToAttack) => {
  const { data } = await axios.put(
    putAttackPlayerUrl + `/${playerToAttack.id}`
  );
  return data;
};

export const putChangeGuard = async (playerToChange) => {
  const { data } = await axios.put(putChangeGuardUrl + `/${playerToChange.id}`);
  return data;
};
export const deleteRemovePlayer = async (id) => {
  const res = await axios.delete(deleteRemovePlayerUrl + "/" + id);
};
export const deleteRemoveAllPlayers = async () => {
  const res = await axios.delete(deleteRemoveAllPlayersUrl);
};
