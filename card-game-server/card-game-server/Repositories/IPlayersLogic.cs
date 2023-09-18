using card_game_server.Models;

namespace card_game_server.Repositories
{
    public interface IPlayersLogic
     {
        void RemoveExistingPlayers();
        void RemovePlayersHand();
        List<Player> DealCards();
        Player CreatePlayer(string name);
    }
}
