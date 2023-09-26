using card_game_server.Data;
using card_game_server.Models;
using card_game_server.Repositories;

namespace card_game_server.Logic
{
    public static class HandKeys
    {
        public static string Heart1 = "heart1";
        public static string Heart2 = "heart2";
        public static string Guard = "guard";
    }
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

        public Card FindCardByValue(int value)
        {
            if (value > 0 && value <= 13)
            {
                var card = _simpleData.Deck.FirstOrDefault(card => card.Value == value);
                if (card == null)
                {
                    ShuffleDeck();
                    card = _simpleData.Deck.FirstOrDefault(card => card.Value == value);
                }
                return card!;
            }
            throw new Exception("this card value dosent exist");
        }

        public Player AttackPlayer(Player enemyPlayer, Card attackCard)
        {
            var totalHealth = enemyPlayer.Hand[HandKeys.Heart1]!.Value + enemyPlayer.Hand[HandKeys.Heart2]!.Value;

            var attackValue = attackCard.Value - enemyPlayer.Hand[HandKeys.Guard]!.Value;

            totalHealth -= attackValue;

            if (totalHealth <= 0)
            {
                enemyPlayer.Hand[HandKeys.Heart1] = new Card(null!, 0, "noHealth");
                enemyPlayer.Hand[HandKeys.Heart2] = new Card(null!, 0, "noHealth");
                //return new Card(null!, 0, "noHealth");
                //enemyPlayer.Hand[HandKeys.Heart1]!.Value = 0;
                //enemyPlayer.Hand[HandKeys.Heart2]!.Value = 0;
            }
            else if (totalHealth <= 13)
            {
                enemyPlayer.Hand[HandKeys.Heart1] = FindCardByValue(totalHealth);
                enemyPlayer.Hand[HandKeys.Heart2] = new Card(null!, 0, "noHealth");
                // return findCard(totalHealth); //return card with totalHealth value
                // enemyPlayer.Hand[HandKeys.Heart1]!.Value = totalHealth;
                // enemyPlayer.Hand[HandKeys.Heart2]!.Value = 0;
            }
            else
            {
                enemyPlayer.Hand[HandKeys.Heart1] = FindCardByValue(13);
                totalHealth -= 13;
                enemyPlayer.Hand[HandKeys.Heart2] = FindCardByValue(totalHealth);

                // enemyPlayer.Hand[HandKeys.Heart1]!.Value = 13;
                // enemyPlayer.Hand[HandKeys.Heart2]!.Value = totalHealth;
            }
            return enemyPlayer;
        }
    }
}


