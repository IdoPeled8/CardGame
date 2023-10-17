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
        //instead of creating gameData everytime make one instance and use him??
        //inject??

        [HttpGet]
        public IActionResult StartGame()
        {
            _playersLogic.RemovePlayersHand();
            _deckLogic.CreateNewDeck();

            _deckLogic.ShuffleDeck();

            var players = _playersLogic.DealCards();
            var startPlayer = _playersLogic.whoStart();

            GameData data = new GameData()
            {
                playerTurn = startPlayer,
                Players = players
            };
            return Ok(data);


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
            Console.WriteLine("create");
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


        [HttpPut("{playerId}")]
        public IActionResult AttackPlayer(string playerId) 
        {
            var cardFromDeck = _deckLogic.TakeCardFromDeck();

            var player = _playersLogic.AttackPlayer(playerId, cardFromDeck);

            _playersLogic.CheckDeath();
            var playerTurn = _playersLogic.ChangeTurn();
            GameData data = new GameData()
            {
                cardTake = cardFromDeck,
                playerTurn = playerTurn,
                Players = _playersLogic.GetAllPlayers()

            };
            Console.WriteLine(data);

            return Ok(data);
        }

        [HttpPut("{playerId}")]
        public IActionResult ChangeGuard(string playerId)
        {
            var card = _deckLogic.TakeCardFromDeck();

            var player = _playersLogic.ChangeGuard(playerId, card);

            var playerTurn = _playersLogic.ChangeTurn();

            GameData data = new GameData()
            {
                cardTake = card,
                playerTurn = playerTurn,
                Players = _playersLogic.GetAllPlayers()
            };

            return Ok(data);
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
