import axios from "axios";

const GetStartGameUrl = "https://localhost:7129/api/CardsGame/StartGame";
const GetTakeCardUrl = "https://localhost:7129/api/CardsGame/TakeCard";
const GetShuffleDeckUrl = "https://localhost:7129/api/CardsGame/ShuffleDeck";
const PostCreateNewPlayerURL = "https://localhost:7129/api/CardsGame/CreateNewPlayer";

export const getStartGame = async () => {
  const { data: GameData } = await axios.get(GetStartGameUrl);
  console.log(GameData);
  return GameData;
};

export const getTakeCard = async () => {
  const { data: card } = await axios.get(GetTakeCardUrl);
  return card;
};

export const getShuffleDeck = async () => {
  const { data: deck } = await axios.get(GetShuffleDeckUrl);
  return deck;
};

export const postCreateNewPlayer = async (newPlayer) => {
  console.log(newPlayer);
  const {data: newPlayerData} = await axios.post(
    PostCreateNewPlayerURL + `?name=${newPlayer}`
  );
  console.log(newPlayerData);
  return newPlayerData;
};
