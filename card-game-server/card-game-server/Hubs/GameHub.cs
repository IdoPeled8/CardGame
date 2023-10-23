using card_game_server.Models;
using card_game_server.Models.DTO_Models;
using card_game_server.Repositories;
using Microsoft.AspNetCore.SignalR;
using System.Reflection;

namespace card_game_server.Hubs
{
    public class GameHub : Hub
    {
        private readonly IDeckLogic _deckLogic;
        private readonly IPlayersLogic _playersLogic;
        private readonly IGameLogic _gameLogic;
        private readonly GameData _gameData;

        public GameHub(IDeckLogic deckLogic, IPlayersLogic playersLogic, IGameLogic gameLogic, GameData gameData)
        {
            _deckLogic = deckLogic;
            _playersLogic = playersLogic;
            _gameLogic = gameLogic;
            _gameData = gameData;
        }

        // make better implements for duplicate code

        public async Task SendMessage(string message)
        {
            //this should be change to send message to the gorup
            await Clients.All.SendAsync("ReceiveMessage", message);
        }

        public async Task CreatePlayer(string name)
        {

            try
            {
                var newPlayer = _playersLogic.CreatePlayer(name, Context.ConnectionId);

                await Groups.AddToGroupAsync(Context.ConnectionId, "GameGroup");

                var sender = _playersLogic.GetPlayerById(Context.ConnectionId);

                await Clients.Caller.SendAsync("GetClientSender", sender);

                //this is only for checks (dont really need it)
                await SendMessage($"{name} has joined the game!");
            }
            catch (Exception)
            {
                throw new Exception("somthing went wrong");
            }
            // await Clients.Group("GameGroup").SendAsync("PlayerJoined", player);
        }

        public async Task StartGame()
        {
            if (_playersLogic.GetAllPlayers().Count <= 1)
            {
                throw new ArgumentException("you dont have enoght players to start the game");
            }
            _gameLogic.ClearPlayerData();
            _deckLogic.CreateNewDeck();

            _deckLogic.ShuffleDeck();

            _gameLogic.DealCards();
            var startPlayer = _gameLogic.WhoStart();

            await UpdateData(new Card(null!, 0, "noHealth.png"), startPlayer);

        } //if the code is testable this means hes good

        public async Task AttackPlayer(string playerToAttackId, string playerTurnId)
        {
            var check = _playersLogic.CheckAuthorization(playerTurnId, Context.ConnectionId);
            if (check)
            {
                //throw new Exception("not this client turn");

                var card = _deckLogic.TakeCardFromDeck();

                _playersLogic.AttackPlayer(playerToAttackId, card);

                var playerTurn = _gameLogic.ChangeTurn();

                _gameLogic.CheckWinner();

                await UpdateData(card, playerTurn);
            }

        }

        public async Task ChangeGuard(string playerId)
        {
            var card = _deckLogic.TakeCardFromDeck();

            _playersLogic.ChangeGuard(playerId, card);

            var playerTurn = _gameLogic.ChangeTurn();

            await UpdateData(card, playerTurn);
        }

        public async Task AccumulateCard(string accumulatePlayerId)
        {
            var card = _deckLogic.TakeCardFromDeck();

            _playersLogic.AccumulateCard(accumulatePlayerId, card);
            var playerTurn = _gameLogic.ChangeTurn();

            await UpdateData(card, playerTurn);
        }



        public async Task DeleteAllPlayers()
        {
            try
            {
                _playersLogic.RemoveAllPlayers();
                await Clients.All.SendAsync("AllPlayersDeleted", _playersLogic.GetAllPlayers());
            }
            catch (Exception)
            {
                throw new Exception("somthing went wrong when try to remove Players");
            }
        }


        public async Task UpdateData(Card card, Player playerTurn)
        {
            //change all to group
            _gameLogic.fillGamedata(card, playerTurn, _playersLogic.GetAllPlayers());
            await Clients.All.SendAsync("AfterMoveUpdate", _gameData);

        }


        public async Task SendMessageInGroup()
        {
        }
    }
}

//make table system

//// Dictionary to map tables (groups) to their player count.
//Dictionary<string, int> tablePlayerCounts = new Dictionary<string, int>();

//// When a new player joins, add them to a table (group).
//string tableId = GetTableWithAvailableSpace(); // Implement this logic.
//await Groups.AddToGroupAsync(Context.ConnectionId, tableId);

//// Increase the player count for the table.
//tablePlayerCounts[tableId]++;

//// Implement a logic to check when a new group should be created.
//if (tablePlayerCounts[tableId] >= 4)
//{
//    string newTableId = CreateNewTable(); // Implement this logic.
//    tablePlayerCounts[newTableId] = 1; // Start with one player in the new table.
//    // You can also move players between tables at this point.
//}

//// Handle removing players from tables and removing empty tables as needed.

