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

        public Player CreatePlayer(string name)
        {
            _simpleData.Players.Add(new Player(name));
            return _simpleData.Players[_simpleData.Players.Count - 1];
        }
        public List<Player> GetAllPlayers() => _simpleData.Players;
        public Player FindPlayerById(string playerId)
        {
            var player = _simpleData.Players.FirstOrDefault(player => player.Id.ToString() == playerId);
            if (player == null)
            {
                throw new Exception("Player not nound");
            }
            return player;
        }
        public void RemoveAllPlayers() => _simpleData.Players.Clear();
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


        //attack and change guard should be in game logic?
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
