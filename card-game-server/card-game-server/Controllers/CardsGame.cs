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

        public CardsGame(IDeckLogic deckLogic, IPlayersLogic playersLogic)
        {
            _deckLogic = deckLogic;
            _playersLogic = playersLogic;
        }

        [HttpGet]
        public List<Player> StartGame()
        {
            _playersLogic.RemovePlayersHand();
            _deckLogic.CreateNewDeck();

            _deckLogic.ShuffleDeck();
            var players = _playersLogic.DealCards();

            return players;


        } //if the code is testable this means hes good

        [HttpGet]
        public List<Card> ShuffleDeck()
        {
            //this is ok for now but in real i need to check what is the currect cards of the players and shuffle deck without this cards
            _deckLogic.CreateNewDeck();
            var deck = _deckLogic.ShuffleDeck();

            return deck;

        }

        [HttpGet]
        public Card TakeCard() => _deckLogic.TakeCardFromDeck();

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

        [HttpPut("{playerId}/{cardValue}")]
        public IActionResult AttackPlayer(string playerId, int cardValue)
        {
            var enemyplayer = _playersLogic.FindPlayerById(playerId);
            var attackCard = _deckLogic.FindCardByValue(cardValue);
            Console.WriteLine(enemyplayer);
            Console.WriteLine(attackCard);

            var player = _deckLogic.AttackPlayer(enemyplayer, attackCard);
            return Ok(player);
        }

        [HttpDelete]
        public IActionResult DeleteAllPlayers()
        {
            try
            {
                _playersLogic.RemoveAllPlayers();
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest("somthing went wrong when trying to remove all players");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeletePlayerById(string id)
        {
            try
            {
                _playersLogic.RemovePlayer(id);
                return Ok();
            }
            catch (InvalidDataException e)
            {
                return BadRequest(e.Message);
            }
            catch (Exception)
            {
                return BadRequest("somthing went wrong when trying to remove player");
            }
        }

    }
}
