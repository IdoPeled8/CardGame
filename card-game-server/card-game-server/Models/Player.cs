namespace card_game_server.Models
{
    public class Player
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Dictionary<string, Card?> Hand { get; set; }
        public bool turn {get; set;}
        public bool isDead { get; set;}
        public bool isWinner { get; set;}

        public Player(string name)
        {
            Id = Guid.NewGuid();
            Name = name;
            Hand = new Dictionary<string, Card?>
            {
                {"heart1",new Card(null!, 0, "noHealth.png") },
                {"heart2", new Card(null!, 0, "noHealth.png") },
                {"guard", new Card(null!, 0, "noHealth.png") }

            };

        }


    }
}
