using card_game_server.Data;
using card_game_server.Models;
using card_game_server.Repositories;

namespace card_game_server.Logic
{


    public class PlayersLogic : IPlayersLogic
    {
        private readonly SimpleData _simpleData;
        private readonly IDeckLogic _deckLogic;

        public PlayersLogic(SimpleData simpleData, IDeckLogic deckLogic)
        {
            _simpleData = simpleData;
            _deckLogic = deckLogic;
        }

        public void RemoveExistingPlayers() => _simpleData.Players.Clear();

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
            whoStart();
            Console.WriteLine(_simpleData.Deck.Count);
            Console.WriteLine(_simpleData.Players.Count);
            return _simpleData.Players;
        }

        public void RemovePlayersHand()
        {
            foreach (var player in _simpleData.Players)
            {
                player.Hand[HandKeys.Heart1] = null;
                player.Hand[HandKeys.Heart2] = null;
                player.Hand[HandKeys.Guard] = null;
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
            var player = _simpleData.Players.FirstOrDefault(player => player.Id.ToString() == playerId);
            if (player == null)
            {
                throw new Exception("Player not nound");
            }
            return player;
        }

        private void whoStart()
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
        }

        public Player AttackPlayer(string playerToAttackId, Card attackCard)
        {
          var playerToAttack = FindPlayerById(playerToAttackId);

            if (attackCard.Value <= playerToAttack.Hand[HandKeys.Guard]!.Value)
            {
                Console.WriteLine("enemy guard is higher");
                return playerToAttack;
            }

            var totalHealth = playerToAttack.Hand[HandKeys.Heart1]!.Value + playerToAttack.Hand[HandKeys.Heart2]!.Value;

            var attackValue = attackCard.Value - playerToAttack.Hand[HandKeys.Guard]!.Value;

            totalHealth -= attackValue;

            if (totalHealth <= 0)
            {
                playerToAttack.Hand[HandKeys.Heart1] = new Card(null!, 0, "noHealth");
                playerToAttack.Hand[HandKeys.Heart2] = new Card(null!, 0, "noHealth");
            }
            else if (totalHealth <= 13)
            {
                playerToAttack.Hand[HandKeys.Heart1] = _deckLogic.FindCardByValue(totalHealth);
                playerToAttack.Hand[HandKeys.Heart2] = new Card(null!, 0, "noHealth");
            }
            else
            {
                playerToAttack.Hand[HandKeys.Heart1] = _deckLogic.FindCardByValue(13);
                totalHealth -= 13;
                playerToAttack.Hand[HandKeys.Heart2] = _deckLogic.FindCardByValue(totalHealth);
            }
            var index = _simpleData.Players.FindIndex(player => player.Id == playerToAttack.Id);
            _simpleData.Players[index] = playerToAttack;
            return playerToAttack;
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
        public List<Player> GetAllPlayers()
        {
            return _simpleData.Players;
        }

       public void CheckDeath()
        { // here i get exeption somthing about null value need to check this
            foreach (var player in _simpleData.Players)
            {
                if (player.Hand[HandKeys.Heart1]!.Value == 0 && player.Hand[HandKeys.Heart2]!.Value == 0)
                {
                    player.isDead = true;
                }
            }
        }

        public Player ChangeGuard(string playerId, Card card)
        {
          var playerToChange = FindPlayerById(playerId);

            var index = _simpleData.Players.FindIndex(player => player.Id == playerToChange.Id);

            _simpleData.Players[index].Hand[HandKeys.Guard] = card;

            return _simpleData.Players[index];
        }
    }

}
