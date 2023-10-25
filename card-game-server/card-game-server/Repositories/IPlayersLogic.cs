using card_game_server.Models;

namespace card_game_server.Repositories
{
    public interface IPlayersLogic
    {
        List<Player> GetAllPlayers();
        Player FindPlayerById(string playerId);
        Player CreatePlayer(string name, string id);//try
        void RemovePlayer(string id);
        void RemoveAllPlayers();
        Player AttackPlayer(string playerToAttackId, Card attackCard,Player currentPlayerTurn);
        Player AccumulateCard(Player accumulatePlayer,Card card);
        Player ChangeGuard( string playerId, Card card);
        bool CheckAuthorization(string playerTurnId, string userId);
    }
}
