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
        public List<Player> GetAllPlayers() => _simpleData.Players;

        //public Player CreatePlayer(string name)
        //{
        //    _simpleData.Players.Add(new Player(name,null));
        //    return _simpleData.Players[_simpleData.Players.Count - 1];
        //}
        public Player FindPlayerById(string playerId)
        {
            var player = _simpleData.Players.FirstOrDefault(player => player.Id.ToString() == playerId);
            if (player == null)
            {
                throw new Exception("Player not nound");
            }
            return player;
        }

        public Player CreatePlayer(string name, string id)//try
        {
            _simpleData.Players.Add(new Player(name, id));
            return _simpleData.Players[_simpleData.Players.Count - 1];
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
                playerToAttack.Hand[HandKeys.Heart1] = new Card(null!, 0, "noHealth.png");
                playerToAttack.Hand[HandKeys.Heart2] = new Card(null!, 0, "noHealth.png");
                playerToAttack.Hand[HandKeys.Guard] = new Card(null!, 0, "noHealth.png");
                playerToAttack.isDead = true;
            }
            else if (totalHealth <= 13)
            {
                playerToAttack.Hand[HandKeys.Heart1] = _deckLogic.FindCardByValue(totalHealth);
                playerToAttack.Hand[HandKeys.Heart2] = new Card(null!, 0, "noHealth.png");
            }
            else
            {
                playerToAttack.Hand[HandKeys.Heart1] = _deckLogic.FindCardByValue(13);
                totalHealth -= 13;
                playerToAttack.Hand[HandKeys.Heart2] = _deckLogic.FindCardByValue(totalHealth);
            }
            var index = _simpleData.Players.FindIndex(player => player.Id == playerToAttack.Id);
            _simpleData.Players[index] = playerToAttack;
            return _simpleData.Players[index];
        }

        public Player ChangeGuard(string playerId, Card card)
        {
            var playerToChange = FindPlayerById(playerId);

            var index = _simpleData.Players.FindIndex(player => player.Id == playerToChange.Id);

            _simpleData.Players[index].Hand[HandKeys.Guard] = card;

            return _simpleData.Players[index];
        }

        public bool CheckAuthorization(string playerTurnId, string userId)
        {
            if (userId != playerTurnId)
            {
                Console.WriteLine("not client turn");
                return false;
            }
            else
            {
                Console.WriteLine("client is player");
                return true;
            }

        }

        public Player GetPlayerById(string id)
        {
            // this method already exist so delete this when all working
            var sender = _simpleData.Players.FirstOrDefault(player => player.Id == id);
            return sender;
        }

        public Player AccumulateCard(string accumulatePlayerId, Card card)
        {
            var accumulatePlayer = FindPlayerById(accumulatePlayerId);

            if (accumulatePlayer.Hand[HandKeys.Accumulate].Value != 0)
            {
                Console.WriteLine("this player already have card");
                return accumulatePlayer;
                // dont need to send him
            }
            card.ImageName = "accumulate.jpg";
            accumulatePlayer.Hand[HandKeys.Accumulate] = card;

            var index = _simpleData.Players.FindIndex(player => player.Id == accumulatePlayer.Id);
            _simpleData.Players[index] = accumulatePlayer;
            return accumulatePlayer;

            /* when accumulate card save the card value and shape but make the photo (accumulate)
             * change in the attack logic - if the attacker have accumulate card check him to and use it if can
             * change when attack you - if somone that got attacked have accumulate card, remove his accumulate
             */
        }
    }

}
