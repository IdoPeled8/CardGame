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
        private readonly IGameLogic _gameLogic;
        private readonly GameData _gameData;

        public CardsGame(IDeckLogic deckLogic, IPlayersLogic playersLogic, IGameLogic gameLogic, GameData gameData)
        {
            _deckLogic = deckLogic;
            _playersLogic = playersLogic;
            _gameLogic = gameLogic;
            _gameData = gameData;
        }
        //instead of creating gameData everytime make one instance and use him??
        //inject??
       
        [HttpGet]
        public IActionResult StartGame()
        {
            _gameLogic.ClearPlayerData();
            _deckLogic.CreateNewDeck();

            _deckLogic.ShuffleDeck();

            _gameLogic.DealCards();
            var startPlayer = _gameLogic.WhoStart();

           _gameLogic.fillGamedata(null!, startPlayer,_playersLogic.GetAllPlayers());

            return Ok(_gameData);


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
            var card = _deckLogic.TakeCardFromDeck();

            _playersLogic.AttackPlayer(playerId, card);

            _playersLogic.CheckDeath();
            var playerTurn = _gameLogic.ChangeTurn();

            _gameLogic.fillGamedata(card, playerTurn, _playersLogic.GetAllPlayers());

            return Ok(_gameData);
        }

        [HttpPut("{playerId}")]
        public IActionResult ChangeGuard(string playerId)
        {
            var card = _deckLogic.TakeCardFromDeck();

           _playersLogic.ChangeGuard(playerId, card);

            var playerTurn = _gameLogic.ChangeTurn();

            _gameLogic.fillGamedata(card, playerTurn, _playersLogic.GetAllPlayers());
            
            return Ok(_gameData);
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
