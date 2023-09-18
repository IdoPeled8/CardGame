export function whoStart(players) {
  let lowestGuardPlayer = null;
  let lowestGuardValue = 14; // Start with a high value to ensure any guard value is lower

  // Iterate through the players to find the one with the lowest guard
  for (const player of players) {
    if (player.hand && player.hand.guard && player.hand.guard.value) {
      const guardValue = parseInt(player.hand.guard.value, 10); // Convert guard value to an integer
      if (guardValue < lowestGuardValue) {
        lowestGuardValue = guardValue;
        lowestGuardPlayer = player;
      }
    }
  }
 return lowestGuardPlayer
 
  //return lowestGuardPlayer; // Return the player with the lowest guard
}

