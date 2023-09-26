import { putAttackPlayer } from "../Services/AxiosCalls";

export const onAttack = async (enemyPlayer, AttackCard) => {

  if (+AttackCard.value > +enemyPlayer.hand.guard.value) {
    const playerId = enemyPlayer.id;
    const attackCardValue = AttackCard.value;
    const newPlayerData = await putAttackPlayer(playerId, attackCardValue);
    return newPlayerData
  } else {
    console.log("enemy guard is to high");
  }
};

export const onChangeGuard = (playerToChange, currentCard) => {
  playerToChange.hand.guard = currentCard;
};

export const CardStacking = () => {
  // do this later after basic things working
};
