using card_game_server.Models;

namespace card_game_server.Repositories
{
    public interface IPlayersLogic
     {
        void RemoveExistingPlayers();
        void RemovePlayersHand();
        void RemovePlayer(string id);
        void RemoveAllPlayers();
        List<Player> DealCards();
        Player CreatePlayer(string name);
        public Player FindPlayerById(string playerId);
    }
}
