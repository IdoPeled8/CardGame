namespace card_game_server.Models.DTO_Models
{
    public class GameData
    {
        public Card? cardTake { get; set; }
        public List<Player>? Players { get; set; }
        public Player? playerTurn { get; set; }
    }
}
