namespace card_game_server
{
    public static class HandKeys //move to new class file
    {
        public static string Heart1 = "heart1";
        public static string Heart2 = "heart2";
        public static string Guard = "guard";
        public static string Accumulate = "accumulate";
     
    }
    public static class Helper
    {
        public static Card ZeroCard { get; } = new Card(null!, 0, "noHealth.png");
        public static string? AccumulateMSG { get; set; } 
    }
}


