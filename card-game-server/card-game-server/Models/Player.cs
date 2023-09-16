namespace card_game_server.Models
{
    public class Player
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Dictionary<string, Card> Hand { get; } = new Dictionary<string, Card>();

        public Player(string name)
        {
            Id = Guid.NewGuid();
            Name = name;
        }

      
    }
}
