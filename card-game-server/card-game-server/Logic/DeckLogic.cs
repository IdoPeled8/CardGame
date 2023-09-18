using card_game_server.Data;
using card_game_server.Models;
using card_game_server.Repositories;

namespace card_game_server.Logic
{
    public class DeckLogic : IDeckLogic
    {

        private readonly SimpleData _simpleData;

        public DeckLogic(SimpleData simpleData)
        {
            _simpleData = simpleData;
        }

        public void CreateNewDeck() => _simpleData.CreateNewDeck();

        public List<Card> ShuffleDeck()
        {
            Random random = new Random();

            for (int i = 0; i < _simpleData.Deck.Count; i++)
            {
                int j = random.Next(i, _simpleData.Deck.Count);
                Card temp = _simpleData.Deck[i];
                _simpleData.Deck[i] = _simpleData.Deck[j];
                _simpleData.Deck[j] = temp;
            }
            return _simpleData.Deck;
        }

        public Card TakeCardFromDeck()
        {
            if (_simpleData.Deck.Count == 0)
            {
                Console.WriteLine("shuffle new Deck");
                CreateNewDeck();
                ShuffleDeck();
            }
            var card = _simpleData.Deck.First();
            _simpleData.Deck.Remove(card);
            Console.WriteLine(_simpleData.Deck.Count);
            return card;
        }

    }
}


