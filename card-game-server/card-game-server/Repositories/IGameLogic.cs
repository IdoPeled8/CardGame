using card_game_server.Models;
using card_game_server.Models.DTO_Models;

namespace card_game_server.Repositories
{
    public interface IGameLogic
    {
        List<Player> DealCards();
        Player ChangeTurn();
        void RemovePlayersHand();
        Player WhoStart();
        public GameData fillGamedata(Card CurrentCard, Player playerTurn, List<Player> players);
    }
}
