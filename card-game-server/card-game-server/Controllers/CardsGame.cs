using card_game_server.Data;
using card_game_server.Logic;
using card_game_server.Models;
using card_game_server.Models.DTO_Models;
using Microsoft.AspNetCore.Mvc;


namespace card_game_server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CardsGame : ControllerBase
    {

        private readonly CardsData _cardsData;
        private readonly CardsLogic _cardsLogic;

        public CardsGame(CardsData cardsData, CardsLogic cardsLogic)
        {
            _cardsData = cardsData;
            _cardsLogic = cardsLogic;
        }

        // GET: api/<CardsGame>
        [HttpGet]
        public Tuple<List<Player>,List<Card>> StartGame()
        {
            _cardsData.Players.Clear();
            _cardsData.CreateNewDeck();

            _cardsLogic.ShuffleDeck();
            _cardsLogic.CreatePlayer("player1");
            _cardsLogic.CreatePlayer("player2");
            _cardsLogic.CreatePlayer("player3");
            _cardsLogic.CreatePlayer("player4");
            _cardsLogic.DealCards();

            var gameData = new Tuple<List<Player>, List<Card>>(_cardsData.Players, _cardsData.Deck);

            return gameData;

            //make put api for making player
        }

        [HttpGet]
        public List<Card> ShuffleDeck()
        {
            //this is ok for now but in real i need to check what is the currect cards of the players and shuffle deck without this cards
            //maybe just move this to the client to?
            _cardsData.CreateNewDeck();
            _cardsLogic.ShuffleDeck();

            return _cardsData.Deck;

        }

        [HttpGet]
        public Card TakeCard()
        {
            return _cardsLogic.TakeCardFromDeck();
        }

        //// GET api/<CardsGame>/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //// POST api/<CardsGame>
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        //// PUT api/<CardsGame>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE api/<CardsGame>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
