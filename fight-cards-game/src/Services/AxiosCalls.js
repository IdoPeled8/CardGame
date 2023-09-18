import axios from "axios";

const GetStartGameUrl = "https://localhost:7129/api/CardsGame/StartGame"
const GetTakeCardUrl = "https://localhost:7129/api/CardsGame/TakeCard"
const GetShuffleDeckUrl = "https://localhost:7129/api/CardsGame/ShuffleDeck"


export const GetStartGame = async () => {
  const { data: GameData } = await axios.get(GetStartGameUrl);
  console.log(GameData)
  return GameData
}

export const GetTakeCard = async () => {
  const { data: card } = await axios.get(GetTakeCardUrl)
  return card
}


export const GetShuffleDeck = async() => {
  const { data: deck } = await axios.get(GetShuffleDeckUrl)
  console.log(deck)
  return deck
}