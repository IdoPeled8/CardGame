using card_game_server.Data;
using card_game_server.Models;
using card_game_server.Repositories;

namespace card_game_server.Logic
{
    public class GameLogic:IGameLogic
    {

        public void RemovePlayersHand()
        {
            foreach (var player in _simpleData.Players)
            {
                player.Hand[HandKeys.Heart1] = null;
                player.Hand[HandKeys.Heart2] = null;
                player.Hand[HandKeys.Guard] = null;
            }
        }
        public List<Player> DealCards()
        {
            //using both cards and players

            foreach (var player in _simpleData.Players)
            {
                //add data to the keys names for not hard coded every time

                player.Hand[HandKeys.Heart1] = _simpleData.Deck[0];
                _simpleData.Deck.RemoveAt(0);
                player.Hand[HandKeys.Heart2] = _simpleData.Deck[1];
                _simpleData.Deck.RemoveAt(1);
                player.Hand[HandKeys.Guard] = _simpleData.Deck[2];
                _simpleData.Deck.RemoveAt(2);
            }
            // whoStart();
            Console.WriteLine(_simpleData.Deck.Count);
            Console.WriteLine(_simpleData.Players.Count);
            return _simpleData.Players;
        }
        public Player whoStart()
        {
            Player lowestGuardPlayer = null!;
            int lowestGuardValue = 14; // Start with a high value to ensure any guard value is lower

            // Iterate through the players to find the one with the lowest guard
            foreach (var player in _simpleData.Players)
            {

                if (player.Hand[HandKeys.Guard]?.Value != null && player.Hand[HandKeys.Guard]!.Value < lowestGuardValue)
                {
                    lowestGuardValue = player.Hand[HandKeys.Guard]!.Value;
                    lowestGuardPlayer = player;
                }
            }
            var index = _simpleData.Players.FindIndex(player => player.Id == lowestGuardPlayer.Id);
            _simpleData.Players[index].turn = true;
            return _simpleData.Players[index];
        }
        public Player ChangeTurn()
        {
            Player currentPlayerTurn = _simpleData.Players.Find(player => player.turn == true);

            int index = _simpleData.Players.IndexOf(currentPlayerTurn);
            _simpleData.Players[index].turn = false;

            int newIndex = (index + 1) % _simpleData.Players.Count;

            while (_simpleData.Players[newIndex].isDead)
            {
                newIndex = (newIndex + 1) % _simpleData.Players.Count;
                Console.WriteLine("Dead player");
            }

            _simpleData.Players[newIndex].turn = true;
            Player newPlayer = _simpleData.Players[newIndex];

            //currentPlayerTurn = newPlayer;

            return newPlayer;
        }
    }
}
