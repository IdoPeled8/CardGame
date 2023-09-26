namespace card_game_server.Models
{
    public class Card
    {
        public string Shape { get; set; }
        public int Value { get; set; }
        public string ImageName { get; set; }

        public Card(string shape, int value, string imageName)
        {
            ImageName = imageName;
            Shape = shape;
            Value = value;
        }
    }
}
