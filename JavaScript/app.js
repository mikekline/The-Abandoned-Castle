import * as data from './data.js';

let currentRoom = "road";


/*********************************************/
/*          room navigation               */
/*********************************************/
function selectRoom (e) {
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
      if (e == "n" || e.keyCode === 78 || e.keyCode === 38){ 
        document.getElementById('description').innerText = data.courtYard.description;
        document.getElementById('direction').innerText = data.courtYard.directions;
        currentRoom = 'Courtyard';
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
      } else if (e == "e" || e.keyCode === 69 || e.keyCode === 39){ 
        document.getElementById('description').innerText = data.cave.description;
        document.getElementById('direction').innerText = data.cave.directions;
        currentRoom = 'Cave';
      }
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
/*          input controllers                */
/*********************************************/

document.addEventListener('keydown', selectRoom);
document.querySelector('#north').onclick = function(){selectRoom('n')};
document.querySelector('#east').onclick = function(){selectRoom('e')};
document.querySelector('#south').onclick = function(){selectRoom('s')};
document.querySelector('#west').onclick = function(){selectRoom('w')};