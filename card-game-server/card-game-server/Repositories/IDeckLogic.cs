using card_game_server.Models;

namespace card_game_server.Repositories
{
    public interface IDeckLogic
    {
        void CreateNewDeck();
        List<Card> ShuffleDeck();
        Card TakeCardFromDeck();
    }
}
