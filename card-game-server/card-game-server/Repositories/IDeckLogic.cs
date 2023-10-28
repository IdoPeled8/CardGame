namespace card_game_server.Repositories
{
    public interface IDeckLogic
    {
        Card FindCardByValue(int value);
        void CreateNewDeck();
        List<Card> ShuffleDeck();
        Card TakeCardFromDeck();
    }
}
