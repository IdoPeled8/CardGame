using card_game_server.Data;
using card_game_server.Models;
using card_game_server.Models.DTO_Models;
using card_game_server.Repositories;

namespace card_game_server.Logic
{
    public class GameLogic:IGameLogic
    {
        private readonly SimpleData _simpleData;
        private readonly GameData _gameData;

        public GameLogic(SimpleData simpleData, GameData gameData)
        {
            _simpleData = simpleData;
            _gameData = gameData;
        }

        public void ClearPlayerData()
        {
            foreach (var player in _simpleData.Players)
            {
                player.Hand[HandKeys.Heart1] = new Card(null!, 0, "noHealth.png");
                player.Hand[HandKeys.Heart2] = new Card(null!, 0, "noHealth.png");
                player.Hand[HandKeys.Guard] = new Card(null!, 0, "noHealth.png");
                player.isDead = false;
                player.turn = false;
            }
        }
        public List<Player> DealCards()
        {
            foreach (var player in _simpleData.Players)
            {
                player.Hand[HandKeys.Heart1] = _simpleData.Deck[0];
                _simpleData.Deck.RemoveAt(0);
                player.Hand[HandKeys.Heart2] = _simpleData.Deck[0];
                _simpleData.Deck.RemoveAt(0);
                player.Hand[HandKeys.Guard] = _simpleData.Deck[0];
                _simpleData.Deck.RemoveAt(0);
            }
            // whoStart();
            Console.WriteLine(_simpleData.Deck.Count);
            return _simpleData.Players;
        }
        public Player WhoStart()
        {
            Player lowestGuardPlayer = null!;
            int lowestGuardValue = 14; // Start with a high value to ensure any guard value is lower

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
            Player currentPlayerTurn = _simpleData.Players.Find(player => player.turn == true)!;

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

            return newPlayer;
        }
        public GameData fillGamedata(Card CurrentCard, Player playerTurn, List<Player> players)
        {
            _gameData.Players = players;
            _gameData.cardTake = CurrentCard;
            _gameData.playerTurn = playerTurn;
            return _gameData;
        }
    }
}
