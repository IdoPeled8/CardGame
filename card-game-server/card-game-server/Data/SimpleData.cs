using card_game_server.Models;

namespace card_game_server.Data
{
    public class SimpleData
    {
        public List<Card> Deck;
        public List<Player> Players;


        public SimpleData()
        {
            Players = new List<Player>();
            CreateNewDeck();
        }

        public void CreateNewDeck()
        {
            Deck = new List<Card>
    {
        // Hearts
        new Card("Hearts", 2, "2_of_hearts.png"),
        new Card("Hearts", 3, "3_of_hearts.png"),
        new Card("Hearts", 4, "4_of_hearts.png"),
        new Card("Hearts", 5, "5_of_hearts.png"),
        new Card("Hearts", 6, "6_of_hearts.png"),
        new Card("Hearts", 7, "7_of_hearts.png"),
        new Card("Hearts", 8, "8_of_hearts.png"),
        new Card("Hearts", 9, "9_of_hearts.png"),
        new Card("Hearts", 10, "10_of_hearts.png"),
        new Card("Hearts", 11, "jack_of_hearts.png"),
        new Card("Hearts", 12, "queen_of_hearts.png"),
        new Card("Hearts", 13, "king_of_hearts.png"),
        new Card("Hearts", 1, "ace_of_hearts.png"),

        // Diamonds
        new Card("Diamonds", 2, "2_of_diamonds.png"),
        new Card("Diamonds", 3, "3_of_diamonds.png"),
        new Card("Diamonds", 4, "4_of_diamonds.png"),
        new Card("Diamonds", 5, "5_of_diamonds.png"),
        new Card("Diamonds", 6, "6_of_diamonds.png"),
        new Card("Diamonds", 7, "7_of_diamonds.png"),
        new Card("Diamonds", 8, "8_of_diamonds.png"),
        new Card("Diamonds", 9, "9_of_diamonds.png"),
        new Card("Diamonds", 10, "10_of_diamonds.png"),
        new Card("Diamonds", 11, "jack_of_diamonds.png"),
        new Card("Diamonds", 12, "queen_of_diamonds.png"),
        new Card("Diamonds", 13, "king_of_diamonds.png"),
        new Card("Diamonds", 1, "ace_of_diamonds.png"),

        // Clubs
        new Card("Clubs", 2, "2_of_clubs.png"),
        new Card("Clubs", 3, "3_of_clubs.png"),
        new Card("Clubs", 4, "4_of_clubs.png"),
        new Card("Clubs", 5, "5_of_clubs.png"),
        new Card("Clubs", 6, "6_of_clubs.png"),
        new Card("Clubs", 7, "7_of_clubs.png"),
        new Card("Clubs", 8, "8_of_clubs.png"),
        new Card("Clubs", 9, "9_of_clubs.png"),
        new Card("Clubs", 10, "10_of_clubs.png"),
        new Card("Clubs", 11, "jack_of_clubs.png"),
        new Card("Clubs", 12, "queen_of_clubs.png"),
        new Card("Clubs", 13, "king_of_clubs.png"),
        new Card("Clubs", 1, "ace_of_clubs.png"),

        // Spades
        new Card("Spades", 2, "2_of_spades.png"),
        new Card("Spades", 3, "3_of_spades.png"),
        new Card("Spades", 4, "4_of_spades.png"),
        new Card("Spades", 5, "5_of_spades.png"),
        new Card("Spades", 6, "6_of_spades.png"),
        new Card("Spades", 7, "7_of_spades.png"),
        new Card("Spades", 8, "8_of_spades.png"),
        new Card("Spades", 9, "9_of_spades.png"),
        new Card("Spades", 10, "10_of_spades.png"),
        new Card("Spades", 11, "jack_of_spades.png"),
        new Card("Spades", 12, "queen_of_spades.png"),
        new Card("Spades", 13, "king_of_spades.png"),
        new Card("Spades", 1, "ace_of_spades.png"),
    };
        }
    }
}
