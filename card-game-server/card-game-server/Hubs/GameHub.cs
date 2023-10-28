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

        //the context.id is not stable - need to change it to somthing better like identity\tokens or stuff like this
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

                var sender = _playersLogic.FindPlayerById(Context.ConnectionId);

                await Clients.Caller.SendAsync("GetClientSender", sender);

                await SendMessage($"{name} has joined the table!");
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
                await Console.Out.WriteLineAsync("you dont have enoght players to start the game");
                return;
            }
            _gameLogic.ClearPlayerData();
            _deckLogic.CreateNewDeck();
            _deckLogic.ShuffleDeck();
            _gameLogic.DealCards();
            var startPlayer = _gameLogic.WhoStart();

            await SendMessage($"game started!!");
            await UpdateData(Helper.ZeroCard, startPlayer);

        } //if the code is testable this means hes good


        //there is a bugggg
        public async Task AttackPlayer(string playerToAttackId, string currentPlayerTurnId)
        {
            //do this for all methods and also dont send the id to the logic just send the player
            var currentPlayerTurn = _playersLogic.FindPlayerById(Context.ConnectionId);
            if (currentPlayerTurn != null)
            {
                var card = _deckLogic.TakeCardFromDeck();

                if (currentPlayerTurn.Hand[HandKeys.Accumulate]!.Value != 0)
                {
                    Helper.AccumulateMSG = $"and with accumulate: {currentPlayerTurn.Hand[HandKeys.Accumulate]!.Value}";
                }

                //i can send the attacker directly and not the id and serch again inside the logic
                var playerToAttack = _playersLogic.AttackPlayer(playerToAttackId, card, currentPlayerTurn);

                //need to add here the accumulate card if have
                await SendMessage($"{currentPlayerTurn.Name} just attacked {playerToAttack.Name} with:{card.Value} {Helper.AccumulateMSG}");
                Helper.AccumulateMSG = "";

                var NewplayerTurn = _gameLogic.ChangeTurn();

                _gameLogic.CheckWinner();

                await UpdateData(card, NewplayerTurn);
            }

        }

        public async Task ChangeGuard(string playerId)
        {
            var currentPlayerTurn = _playersLogic.FindPlayerById(Context.ConnectionId);
            if (currentPlayerTurn != null)
            {
                var card = _deckLogic.TakeCardFromDeck();

                var playerToChange = _playersLogic.ChangeGuard(playerId, card);

                var NewPlayerTurn = _gameLogic.ChangeTurn();

                await SendMessage($"{currentPlayerTurn.Name} just change guard to {playerToChange.Name} with:{card.Value}");
                await UpdateData(card, NewPlayerTurn);
            }
        }

        public async Task AccumulateCard(string accumulatePlayerId)
        {
            var currentPlayerTurn = _playersLogic.FindPlayerById(Context.ConnectionId);
            if (currentPlayerTurn != null)
            {
                var card = _deckLogic.TakeCardFromDeck();

                _playersLogic.AccumulateCard(currentPlayerTurn, card);

                var NewPlayerTurn = _gameLogic.ChangeTurn();

                await SendMessage($"{currentPlayerTurn.Name} just accumulate :|");
                await UpdateData(card, NewPlayerTurn);
            }
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
            await Console.Out.WriteLineAsync(Context.ConnectionId);
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

