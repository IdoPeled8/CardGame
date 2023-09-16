namespace card_game_server.Models
{
    public class Card
    {
        public string Shape { get; set; }
        public string Value { get; set; }

        public Card(string shape, string value)
        {
            Shape = shape;
            Value = value;
        }
    }
}
