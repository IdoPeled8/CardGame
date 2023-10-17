using card_game_server.Models;

namespace card_game_server.Repositories
{
    public interface IPlayersLogic
    {
        List<Player> GetAllPlayers();
        Player FindPlayerById(string playerId);
        Player CreatePlayer(string name);
        void RemovePlayer(string id);
        void RemoveAllPlayers();
        Player AttackPlayer(string playerToAttackId, Card attackCard);
        Player ChangeGuard( string playerId, Card card);
       
    }
}
