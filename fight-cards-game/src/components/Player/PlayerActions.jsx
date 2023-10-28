// import React from "react";
// import { useGameActions } from "../../Hooks/UseGameActions";
// import { useGameContext } from "../../Contexts/GameContext";
// import { colors } from "../../utils/Colors";
// import SimpleButton from "../ui/Button/SimpleButton";
// import SimpleLink from "../ui/Link/SimpleLink";

// const PlayerActions = ({ player }) => {
//   const { handleAttack, handleChangeGuard, handleAccumulate } =
//     useGameActions();

//   const { playerTurn, client } = useGameContext();

//   return (
//     <div>
//       {!player.isDead && !player.isWinner && playerTurn.id === client.id && (
//         <div>
//           <button
//             className="niceBtn color-lightBlue"
//             onClick={() => handleChangeGuard(player)}
//           >
//             Change Guard
//           </button>
//           {playerTurn.id !== player.id && (
//             <button
//               className="niceBtn color-red"
//               onClick={() => handleAttack(player)}
//             >
//               Attack
//             </button>
//           )}
//           {playerTurn.id === player.id && (
//             <button
//               className="niceBtn color-yellow"
//               onClick={() => handleAccumulate(player)}
//             >
//               Accumulate
//             </button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PlayerActions;
