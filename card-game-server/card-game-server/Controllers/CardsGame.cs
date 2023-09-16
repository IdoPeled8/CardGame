using card_game_server.Data;
using card_game_server.Logic;
using card_game_server.Models;
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
        public IEnumerable<Player> StartGame()
        {
            _cardsData.Players.Clear();
            _cardsData.CreateNewDeck();

            _cardsLogic.ShuffleDeck();
            _cardsLogic.CreatePlayer("player1");
            _cardsLogic.CreatePlayer("player2");
            _cardsLogic.CreatePlayer("player3");
            _cardsLogic.CreatePlayer("player4");
            _cardsLogic.DealCards();

            return _cardsData.Players;

            //make put api for making player
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
