This contract collect the funds allocated to the partecipating developers and will release the reward after 1 year

Testing result:

 Deploying the locker smart contract
      ✔ Should deploy the locker contract and assign the token address we have, to the constructor and god (77ms)
    Adding devs to the
      ✔ Should check if msg.sender is god (41ms)
      ✔ Should revert if is not participating list
      ✔ Should revert if hackathon is not running
      ✔ Should revert if dev is already on the list (48ms)
      ✔ Should add the developer on the list (46ms)
    Removing devs from the list
      ✔ Should check if msg.sender is god
      ✔ Should revert if dev is on the list
      ✔ Should remove the developer from the list (102ms)
    Claim rewards
      ✔ Should revert if is not participating list
      ✔ Should check if reward has been alrady claimed
      ✔ Should allow developers to claim rewards after specific time (122ms)
      ✔ Should revert if developers try to claim rewards before specific time (49ms)