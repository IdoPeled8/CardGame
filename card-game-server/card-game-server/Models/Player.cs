namespace card_game_server.Models
{
    public class Player
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Dictionary<string, Card?> Hand { get; }

        public Player(string name)
        {
            Hand = new Dictionary<string, Card?>
            {
                {"heart1",null },
                {"heart2",null },
                {"guard",null }

            };
            Id = Guid.NewGuid();
            Name = name;
        }


    }
}
