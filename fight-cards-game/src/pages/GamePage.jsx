import Package from "../components/Package";
import GamePlayers from "../components/GameBoard/GamePlayers";
import GameActions from "../components/GameBoard/GameActions";
import GameInfo from "../components/GameBoard/GameInfo";

// TO DO
//if already accumulate dont let it
// add save card for later attack logic
// add visuals + looking + custom CSS
// make authorization for admins to delete players and more...
// make rooms so every table will be with limited players
// make ready button so when all players ready start the game
// if player join in the middle of the game put him in waiting list
// add a chat for the game

const GamePage = () => {
  return (
    <div className="game-page">
      <GameActions></GameActions>
      {/* <GameInfo></GameInfo> */}
      <GamePlayers></GamePlayers>
    </div>
  );
};

export default GamePage;
