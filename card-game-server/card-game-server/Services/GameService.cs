using card_game_server.Hubs;
using card_game_server.Models.DTO_Models;
using card_game_server.Repositories;

namespace card_game_server.Services
{
    public class GameService
    {
        private readonly IDeckLogic _deckLogic;
        private readonly IPlayersLogic _playersLogic;
        private readonly IGameLogic _gameLogic;

        public GameService(IDeckLogic deckLogic, IPlayersLogic playersLogic, IGameLogic gameLogic)
        {
            _deckLogic = deckLogic;
            _playersLogic = playersLogic;
            _gameLogic = gameLogic;
        }


    }
}
