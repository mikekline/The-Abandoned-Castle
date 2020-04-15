import * as data from './data.js';

let currentRoom = "road";
let gate = 0;
let damage = "";
let monster = 1;

/*********************************************/
/*          room navigation               */
/*********************************************/
function selectRoom (e) {
  const notifications = document.getElementById('notifications');
  const backpack = data.inventory.backpack;
  
  
  switch (currentRoom){
    /*on the road*/
    case 'road':
        if (e == "n" || e.keyCode === 78 || e.keyCode === 38){ 
            document.getElementById('description').innerText = data.gate.description;
            document.getElementById('direction').innerText = data.gate.directions;
            currentRoom = 'Front Gate';
          }
      break;
    
    /*Front Gate*/
    case 'Front Gate':
    
      /* welcome mat */
      if (!backpack.includes(' keys') && e == "p" || e.keyCode === 80){
        notifications.innerText = "You find keys under the mat and pick them up";
        backpack.push(' keys')
        reset(notifications);
      } else if (backpack.includes(' keys') && e == "p" || e.keyCode === 80){
        notifications.innerText = "You find nothing but dust under the mat.";
        reset(notifications);
      } else {
      /*the gate */
      if (gate === 0) {
       notifications.innerText = "The Gate is locked.";
       reset(notifications);
       currentRoom = 'Front Gate';
      } else if (gate === 1) {
        if (e == "n" || e.keyCode === 78 || e.keyCode === 38){ 
          document.getElementById('description').innerText = data.courtYard.description;
          document.getElementById('direction').innerText = data.courtYard.directions;
          currentRoom = 'Courtyard';
        }
      } 
      }
      break;
  
    /*Courtyard*/
    case 'Courtyard':
      if (e == "n" || e.keyCode === 78 || e.keyCode === 38){ 
        document.getElementById('description').innerText = data.banquet.description;
        document.getElementById('direction').innerText = data.banquet.directions;
        currentRoom = 'Banquet Room';
      } else if (e == "e" || e.keyCode === 69 || e.keyCode === 39){ 
        document.getElementById('description').innerText = data.dungeon.description;
        document.getElementById('direction').innerText = data.dungeon.directions;
        currentRoom = 'Dungeon';
      } else if (e == "s" || e.keyCode === 83 || e.keyCode === 40){ 
        document.getElementById('description').innerText = "The gates have sealed behind you. You can no longer go that way.";
        document.getElementById('direction').innerText = "You can go north, east, west";
        currentRoom = 'Courtyard';
      } else if (e == "w" || e.keyCode === 87 || e.keyCode === 37){ 
        document.getElementById('description').innerText = data.stables.description;
        document.getElementById('direction').innerText = data.stables.directions;
        currentRoom = 'Stables';
      }
      break;
 
    /*Stables*/  
    case 'Stables':
      if (e == "e" || e.keyCode === 69 || e.keyCode === 39){ 
        document.getElementById('description').innerText = data.courtYard.description;
        document.getElementById('direction').innerText = data.courtYard.directions;
        currentRoom = 'Courtyard';
      }
      break;
 
    /*Banquet Room*/ 
    case 'Banquet Room':
      if (e == "n" || e.keyCode === 78 || e.keyCode === 38){ 
        document.getElementById('description').innerText = data.kitchen.description;
        document.getElementById('direction').innerText = data.kitchen.directions;
        currentRoom = 'Kitchen';
      } else if (e == "s" || e.keyCode === 83 || e.keyCode === 40){ 
        document.getElementById('description').innerText = data.courtYard.description;
        document.getElementById('direction').innerText = data.courtYard.directions;
        currentRoom = 'Courtyard';
      }
      break;
 
    /*Kitchen*/
    case 'Kitchen':
      if (e == "s" || e.keyCode === 83 || e.keyCode === 40){ 
        document.getElementById('description').innerText = data.banquet.description;
        document.getElementById('direction').innerText = data.banquet.directions;
        currentRoom = 'Banquet Room';
      }
      break;

    /*Dungeon*/
    case 'Dungeon':
      if (e == "w" || e.keyCode === 87 || e.keyCode === 37){ 
        document.getElementById('description').innerText = data.courtYard.description;
        document.getElementById('direction').innerText = data.courtYard.directions;
        currentRoom = 'Courtyard';
      } else if (monster === 0){ 
         if ( e == "e" || e.keyCode === 69 || e.keyCode === 39){ 
        document.getElementById('description').innerText = data.cave.description;
        document.getElementById('direction').innerText = data.cave.directions;
        currentRoom = 'Cave';}
      } else if (monster > 0){
        notifications.innerText = "As you approach the skeleton it begins to start laughing as it becomes alive and lunges towards you.";
        
        //have to hit "a" twice to activate
        if (damage > 0 && e.keyCode === 65 || e == "a" ){ 
          const tillDead = data.skeletons.hitpoints -= damage;
          notifications.innerText = `you have done ${damage} damage to the ${data.skeletons.name}.`
          reset(notifications);
          if (tillDead <= 0){
            monster = 0;
            backpack.push(data.skeletons.items);
            notifications.innerText = `You killed the skeleton and received ${data.skeletons.items}.`;
            reset(notifications);
            data.dungeon.description = "Nothing remains of the skeleton and the opening into the cave is now accessable."
            document.getElementById('description').innerText = data.dungeon.description
          }
        }        
      };
      break;
 
    /*Cave*/
    case 'Cave':
      if (e == "w" || e.keyCode === 87 || e.keyCode === 37){ 
        document.getElementById('description').innerText = data.dungeon.description;
        document.getElementById('direction').innerText = data.dungeon.directions;
        currentRoom = 'Dungeon';
      }
      break;
 
    default:
        document.getElementById('article').innerHTML = "you are lost, find your way back to the light";
      break;
  }  
}

/*********************************************/
/*                  combat                   */
/*********************************************/
 
function attack (e) {
  if (e == "a" || e.keyCode === 65){
    damage = Math.ceil(Math.random() * 10);
    console.log(damage);
    selectRoom('a');
  }
}

/*********************************************/
/*               inventory                   */
/*********************************************/

function inventory (e) {
  const inventory = document.getElementById('items');
  const notifications = document.getElementById('notifications');
  const backpack = data.inventory.backpack;

  /*display inventory*/ 
  if (e == "i" || e.keyCode === 73){
    inventory.innerText = `Inventory: ${backpack}`; 
    reset(inventory);
  }

  /*uses key on gate*/
  if (backpack.includes(' keys') && e === "u" || e.keyCode === 85 && currentRoom === 'Front Gate' ) {
    gate = 1;
    notifications.innerText = "You have unlocked the gate and the key has disolved.";
    document.getElementById('description').innerText = "The gate is now unlocked and the welcome mat is still welcoming you.";
    backpack.splice(backpack.indexOf(' keys'), 1 );
    reset(notifications);
  }
}

/*********************************************/
/*            input controllers              */
/*********************************************/


document.addEventListener('keydown', selectRoom);
document.addEventListener('keydown', inventory);
document.addEventListener('keydown', attack);

document.querySelector('#north').onclick = function(){selectRoom('n')};
document.querySelector('#east').onclick = function(){selectRoom('e')};
document.querySelector('#south').onclick = function(){selectRoom('s')};
document.querySelector('#west').onclick = function(){selectRoom('w')};

document.querySelector('#inventory').onclick = function(){inventory('i')};
document.querySelector('#attack').onclick = function(){attack('a')};
document.querySelector('#pickUp').onclick = function(){selectRoom('p')};
document.querySelector('#use').onclick = function(){inventory('u')};


/*********************************************/
/*                 resets                    */
/*********************************************/

/*clears inner html of elements, specificly notifications and inventory*/
function reset (element) {
    setTimeout( function () { 
        element.innerHTML = '';
      }, 4000);
}