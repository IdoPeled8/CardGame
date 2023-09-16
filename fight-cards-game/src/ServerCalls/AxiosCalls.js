import axios from "axios";

const GetStartGameUrl = "https://localhost:7129/api/CardsGame/StartGame"
const GetTakeCardUrl = "https://localhost:7129/api/CardsGame/TakeCard"

export const GetStartGame = async () => {
  const { data: newPlayers } = await axios.get(GetStartGameUrl);
  return newPlayers
}

export const GetTakeCard = async () => {
  const { data: card } = await axios.get(GetTakeCardUrl)
  return card
}