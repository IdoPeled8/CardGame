using card_game_server.Data;
using card_game_server.Models;

namespace card_game_server.Logic
{
    public class CardsLogic
    {

        private readonly CardsData _cardsData;

        public CardsLogic(CardsData cardsData)
        {
            _cardsData = cardsData;
        }

        public void ShuffleDeck()
        {
            Random random = new Random();

            for (int i = 0; i < _cardsData.Deck.Count; i++)
            {
                int j = random.Next(i, _cardsData.Deck.Count);
                Card temp = _cardsData.Deck[i];
                _cardsData.Deck[i] = _cardsData.Deck[j];
                _cardsData.Deck[j] = temp;
            }
        }

        public void DealCards()
        {
            foreach (var player in _cardsData.Players)
            {
                player.Hand.Add("heart1", _cardsData.Deck[0]);
                _cardsData.Deck.RemoveAt(0);
                player.Hand.Add("heart2", _cardsData.Deck[1]);
                _cardsData.Deck.RemoveAt(1);
                player.Hand.Add("guard", _cardsData.Deck[2]);
                _cardsData.Deck.RemoveAt(2);
            }
            Console.WriteLine(_cardsData.Deck.Count);
            Console.WriteLine(_cardsData.Players.Count);
        }

        public void CreatePlayer(string name)
        {
            _cardsData.Players.Add(new Player(name));

        }

        public Card TakeCardFromDeck()
        {
            var card = _cardsData.Deck.First();
            _cardsData.Deck.Remove(card);
            Console.WriteLine(_cardsData.Deck.Count);
            return card;
        }

    }
}


