namespace card_game_server.Repositories
{
    public interface IGameLogic
    {
        List<Player> DealCards();
        Player ChangeTurn();
        void ClearPlayerData();
        Player WhoStart();
        public GameData fillGamedata(Card CurrentCard, Player playerTurn, List<Player> players);
        void CheckWinner();
    }
}
