using card_game_server.Data;
using card_game_server.Logic;
using card_game_server.Models;
using card_game_server.Models.DTO_Models;
using card_game_server.Repositories;
using Microsoft.AspNetCore.Mvc;


namespace card_game_server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CardsGame : ControllerBase
    {

        private readonly IDeckLogic _deckLogic;
        private readonly IPlayersLogic _playersLogic;

        public CardsGame(IDeckLogic deckLogic,IPlayersLogic playersLogic)
        {
            _deckLogic = deckLogic;
            _playersLogic = playersLogic;
        }

        // GET: api/<CardsGame>
        [HttpGet]
        public Tuple<List<Player>, List<Card>> StartGame()
        {
            _playersLogic.RemovePlayersHand();
            _deckLogic.CreateNewDeck();

            var deck = _deckLogic.ShuffleDeck();
            //_playersLogic.CreatePlayer("player1");
            //_playersLogic.CreatePlayer("player2");
            //_playersLogic.CreatePlayer("player3");
            //_playersLogic.CreatePlayer("player4");
            var players = _playersLogic.DealCards();

            var gameData = new Tuple<List<Player>, List<Card>>(players, deck);

            return gameData;

            //make put api for making player

        } //if the code is testble this means hes good

        [HttpGet]
        public List<Card> ShuffleDeck()
        {
            //this is ok for now but in real i need to check what is the currect cards of the players and shuffle deck without this cards
            //maybe just move this to the client to?
            _deckLogic.CreateNewDeck();
            var deck = _deckLogic.ShuffleDeck();

            return deck;

        }

        [HttpGet]
        public Card TakeCard()
        {
            return _deckLogic.TakeCardFromDeck();
        }

        [HttpPost]
        public IActionResult CreateNewPlayer(string name)
        {
            Console.WriteLine(name);
            try
            {
                var newPlayer = _playersLogic.CreatePlayer(name);
                return Ok(newPlayer);
            }
            catch (Exception)
            {
                return BadRequest("somthing went wrong when creating new player");
            }

        }
        //add delete players

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
