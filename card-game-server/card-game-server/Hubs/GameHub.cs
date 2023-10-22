using card_game_server.Models;
using Microsoft.AspNetCore.SignalR;
using System.Numerics;
using System.Text.RegularExpressions;

namespace card_game_server.Hubs
{
    public class GameHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Console.Out.WriteLineAsync(user);
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        public async Task CreatePlayer(List<Player> allPlayers)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, "GameGroup");
            
            await Clients.All.SendAsync($"GetAllPlayers", allPlayers);

           // await Clients.Group("GameGroup").SendAsync("PlayerJoined", player);
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

