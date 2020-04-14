import * as rooms from './rooms.js';

let room = "";
let currentRoom = "road";

function selectRoom (e) {
  switch (currentRoom){
    case 'road':
      if (e == "n" || e.keyCode === 78 ){ 
        document.getElementById('article').innerHTML = rooms.gate.description; 
        currentRoom = 'Front Gate';
      }
      break;

    case 'Front Gate':
      if (e == "n" || e.keyCode === 78 ){ 
        document.getElementById('article').innerHTML = rooms.courtYard.description;
        currentRoom = 'Courtyard';
      }
      break;
  
    case 'Courtyard':
      if (e == "n" || e.keyCode === 78 ){ 
        document.getElementById('article').innerHTML = rooms.banquet.description;
        currentRoom = 'Banquet Room';
      } else if (e == "e" || e.keyCode === 69 ){ 
        document.getElementById('article').innerHTML = rooms.dungeon.description;
        currentRoom = 'Dungeon';
      } else if (e == "s" || e.keyCode === 83 ){ 
        document.getElementById('article').innerHTML = `<p>"The gates have sealed behind you, 
                                             you can no longer go that way."</p>` + rooms.courtYard.directions;
        currentRoom = 'Courtyard';
      } else if (e == "w" || e.keyCode === 87 ){ 
        document.getElementById('article').innerHTML = rooms.stables.description;
        currentRoom = 'Stables';
      }
      break;
 
    case 'Stables':
      if (e == "e" || e.keyCode === 69 ){ 
        document.getElementById('article').innerHTML = rooms.courtYard.description;
        currentRoom = 'Courtyard';
      }
      break;
 
    case 'Banquet Room':
      if (e == "n" || e.keyCode === 78 ){ 
        room = document.getElementById('article').innerHTML = rooms.kitchen.description;
        currentRoom = 'Kitchen';
      } else if (e == "s" || e.keyCode === 83 ){ 
        document.getElementById('article').innerHTML = rooms.courtYard.description;
        currentRoom = 'Courtyard';
      }
      break;
 
    case 'Kitchen':
      if (e == "s" || e.keyCode === 83 ){ 
        document.getElementById('article').innerHTML = rooms.banquet.description;
        currentRoom = 'Banquet Room';
      }
      break;
 
    case 'Dungeon':
      if (e == "w" || e.keyCode === 87 ){ 
        document.getElementById('article').innerHTML = rooms.courtYard.description;
        currentRoom = 'Courtyard';
      } else if (e == "e" || e.keyCode === 69 ){ 
        document.getElementById('article').innerHTML = rooms.cave.description;
        currentRoom = 'Cave';
      }
      break;
 
    case 'Cave':
      if (e == "w" || e.keyCode === 87 ){ 
        document.getElementById('article').innerHTML = rooms.dungeon.description;
        currentRoom = 'Dungeon';
      }
      break;
 
    default:
        document.getElementById('article').innerHTML = "you are lost, find your way back to the light";
      break;
  }  
}
 
document.addEventListener('keydown', selectRoom);
document.querySelector('#north').onclick = function(){selectRoom('n')};
document.querySelector('#east').onclick = function(){selectRoom('e')};
document.querySelector('#south').onclick = function(){selectRoom('s')};
document.querySelector('#west').onclick = function(){selectRoom('w')};



// let room = document.getElementById('article');
    // room.innerHTML = rooms.courtYard.description;
    // console.log(rooms.courtYard.description);



//you are lost, find your way back to the light





// // let roomName = rooms.gate.name
// const north = document.querySelector('#north');

//  function handleKeyPress (e) {
//     console.log("woot")
//     // document.querySelector('.north').onclick = "null";
//     // if (roomName === courtYard)
//     if (e || e.keyCode === 13) {

//       let room = document.getElementById('article');
//       room.innerHTML = rooms.courtYard.description;
//         roomName = rooms.courtYard.name;
//       console.log(roomName);
//       return false;
//     }
//     return false;
//   }
//   north.addEventListener('click', () => handleKeyPress);
// document.addEventListener('keydown', handleKeyPress);


