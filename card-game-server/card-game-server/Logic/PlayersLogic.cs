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
                //add data to the keys names for not hard coded every time

                player.Hand["heart1"] = _simpleData.Deck[0];
                _simpleData.Deck.RemoveAt(0);
                player.Hand["heart2"] = _simpleData.Deck[1];
                _simpleData.Deck.RemoveAt(1);
                player.Hand["guard"] = _simpleData.Deck[2];
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
                player.Hand["heart1"] = null;
                player.Hand["heart2"] = null;
                player.Hand["guard"] = null;
            }
        }
        public Player CreatePlayer(string name)
        {
            _simpleData.Players.Add(new Player(name));
            return _simpleData.Players[_simpleData.Players.Count - 1];
        }

        public void RemovePlayer(string id)
        {
            var player = _simpleData.Players.FirstOrDefault(player => player.Id.ToString() == id);
            if (player != null)
            {
                _simpleData.Players.Remove(player);
            }
            else
            {
                throw new InvalidDataException("id donset exist");
            }
        }

        public void RemoveAllPlayers()
        {
            _simpleData.Players.Clear();
        }

        public Player FindPlayerById(string playerId)
        {
            var player = _simpleData.Players.FirstOrDefault(player=> player.Id.ToString() == playerId);
            if (player == null)
            {
                throw new Exception("Player not nound");
            }
            return player;
        }
    }
}
