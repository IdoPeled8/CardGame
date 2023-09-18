using card_game_server.Data;
using card_game_server.Models;
using card_game_server.Repositories;

namespace card_game_server.Logic
{
    public class PlayersLogic : IPlayersLogic
    {
        private readonly SimpleData _simpleData;

        public PlayersLogic(SimpleData simpleData)
        {
            _simpleData = simpleData;
        }

        public void RemoveExistingPlayers() => _simpleData.Players.Clear();

        public List<Player> DealCards()
        {
            //using both cards and players

            foreach (var player in _simpleData.Players)
            {
                player.Hand.Add("heart1", _simpleData.Deck[0]);
                _simpleData.Deck.RemoveAt(0);
                player.Hand.Add("heart2", _simpleData.Deck[1]);
                _simpleData.Deck.RemoveAt(1);
                player.Hand.Add("guard", _simpleData.Deck[2]);
                _simpleData.Deck.RemoveAt(2);
            }
            Console.WriteLine(_simpleData.Deck.Count);
            Console.WriteLine(_simpleData.Players.Count);
            return _simpleData.Players;
        }

        public void RemovePlayersHand()
        {
            foreach (var player in _simpleData.Players)
            {
                player.Hand.Remove("heart1");
                player.Hand.Remove("heart2");
                player.Hand.Remove("guard");
                //maybe add string that represent every key
                //or even had the keys inside the player and just change the data of the key dont remove or add keys
            }
        }
        public Player CreatePlayer(string name)
        {
            _simpleData.Players.Add(new Player(name));
            return _simpleData.Players[_simpleData.Players.Count - 1];
        }
    }
}
