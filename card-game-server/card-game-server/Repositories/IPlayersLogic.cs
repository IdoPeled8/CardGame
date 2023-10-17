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
        Player FindPlayerById(string playerId);
        void CheckDeath();
        Player ChangeTurn();
        List<Player> GetAllPlayers();
        Player AttackPlayer(string playerToAttackId, Card attackCard);
        Player ChangeGuard( string playerId, Card card);
        Player whoStart();
    }
}
