import GamePlayers from "../components/GameBoard/GamePlayers";
import GameActions from "../components/GameBoard/GameActions";
import GameInfo from "../components/GameBoard/GameInfo";

// TO DO
// make authorization for admins to delete players and more...
//make login and players management
// make rooms so every table will be with limited players
// make ready button so when all players ready start the game
// if player join in the middle of the game put him in waiting list
// add a chat for the game
//need to change all the photos to xml??
//instead of putting collor behind the cards put photos of shiled and health
//add a sound
//add a timer
//add a score
//change buttons to admins only

const GamePage = () => {
  return (
    <div className="game-page">
      <GameActions></GameActions>
      
      <GamePlayers></GamePlayers>
    </div>
  );
};

export default GamePage;
