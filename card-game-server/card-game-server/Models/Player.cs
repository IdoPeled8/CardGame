namespace card_game_server.Models
{
    public class Player
    {
        public string Id { get; set; } // was guid
        public string Name { get; set; }
        public Dictionary<string, Card?> Hand { get; set; }
        public bool turn {get; set;}
        public bool isDead { get; set;}
        public bool isWinner { get; set;}

        public Player(string name, string id)
        {
            Id = id; //was new guid
            Name = name;
            Hand = new Dictionary<string, Card?>
            {
                {HandKeys.Heart1,new Card(null!, 0, "noHealth.png") },
                {HandKeys.Heart2, new Card(null!, 0, "noHealth.png") },
                {HandKeys.Guard, new Card(null!, 0, "noHealth.png") },
                {HandKeys.Accumulate, new Card(null!, 0,"noHealth.png") }

            };

        }


    }
}
