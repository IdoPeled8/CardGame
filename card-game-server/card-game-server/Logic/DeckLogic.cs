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
            return card;
        }

        public Card FindCardByValue(int value)
        {
            if (value > 0 && value <= 13)
            {
                var card = _simpleData.Deck.FirstOrDefault(card => card.Value == value);
                if (card == null)
                {
                    CreateNewDeck() ;
                    ShuffleDeck();
                    card = _simpleData.Deck.FirstOrDefault(card => card.Value == value);
                }
                return card!;
            }
            throw new Exception("this card value dosent exist");
        }

       
    }
}


