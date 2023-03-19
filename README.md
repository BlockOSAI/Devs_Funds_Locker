This contract collect the funds allocated to the partecipating developers and will release the reward after 1 year <br/>
<br/>
Testing result:<br/>
<br/><br/>
 Deploying the locker smart contract<br/><br/>
      ✔ Should deploy the locker contract and assign the token address we have, to the constructor and god (77ms)<br/><br/>
    Adding devs to the<br/><br/>
      ✔ Should check if msg.sender is god (41ms)<br/>
      ✔ Should revert if is not participating list<br/>
      ✔ Should revert if hackathon is not running<br/>
      ✔ Should revert if dev is already on the list (48ms)<br/>
      ✔ Should add the developer on the list (46ms)<br/><br/>
    Removing devs from the list<br/><br/>
      ✔ Should check if msg.sender is god<br/>
      ✔ Should revert if dev is on the list<br/>
      ✔ Should remove the developer from the list (102ms)<br/><br/>
    Claim rewards<br/><br/>
      ✔ Should revert if is not participating list<br/>
      ✔ Should check if reward has been alrady claimed<br/>
      ✔ Should allow developers to claim rewards after specific time (122ms)<br/>
      ✔ Should revert if developers try to claim rewards before specific time (49ms)<br/>
