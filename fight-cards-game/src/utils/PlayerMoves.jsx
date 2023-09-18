

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
    if (+totalHealth <= 0) {
      console.log("enemy has no health")
      totalHealth = 0;
      enemyPlayer.hand.heart1.value = 0;
      enemyPlayer.hand.heart2.value = 0;
      
      //if player died make backround red?
    }
    else if (+totalHealth <= 13) {
      console.log("inside else if below 13");
      enemyPlayer.hand.heart1.value = totalHealth;
      enemyPlayer.hand.heart2.value = 0;
    }
    else {
      console.log("inside else above 13");
      enemyPlayer.hand.heart2.value = 13;
      totalHealth -= 13;
      enemyPlayer.hand.heart1.value = totalHealth;
    }
  }
  else {
    console.log("attack Card to low");
  }
  console.log(enemyPlayer.hand.heart1.value, enemyPlayer.hand.heart2.value)
}

// export const ChangeSelfGuard = () => {

// }

export const onChangeGuard = (playerToChange, currentCard) => {
  console.log(currentCard)
  playerToChange.hand.guard = currentCard
  console.log(playerToChange.hand.guard)
}

export const CardStacking = () => {
  // do this later after basic things working
}