using card_game_server.Models;

namespace card_game_server.Repositories
{
    public interface IGameLogic
    {
        List<Player> DealCards();
        Player ChangeTurn();
        void RemovePlayersHand();
        Player whoStart();
    }
}
