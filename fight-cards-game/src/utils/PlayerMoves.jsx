export const onAttack = (enemyPlayer, AttackCard) => {
  //should move to the server??
  //dont let playerTurn attack himself
  console.log(AttackCard)
  if (+AttackCard.value > +enemyPlayer.hand.guard.value) {

    let totalHealth = +enemyPlayer.hand.heart1.value + +enemyPlayer.hand.heart2.value;
    let AttackValue = +AttackCard.value - +enemyPlayer.hand.guard.value

    //make the attack
    totalHealth = +totalHealth - +AttackValue;

    //check for death and change health
    // i think i can make this better
    if (+totalHealth <= 0) {
      totalHealth = 0;
      enemyPlayer.hand.heart1.value = 0;
      enemyPlayer.hand.heart2.value = 0;
      
    }
    else if (+totalHealth <= 13) {
      enemyPlayer.hand.heart1.value = totalHealth;
      enemyPlayer.hand.heart2.value = 0;
    }
    else {
      enemyPlayer.hand.heart2.value = 13;
      totalHealth -= 13;
      enemyPlayer.hand.heart1.value = totalHealth;
    }
  }
  else {
  }
  console.log(enemyPlayer.hand.heart1.value, enemyPlayer.hand.heart2.value)
}


export const onChangeGuard = (playerToChange, currentCard) => {
  playerToChange.hand.guard = currentCard
}

export const CardStacking = () => {
  // do this later after basic things working
}