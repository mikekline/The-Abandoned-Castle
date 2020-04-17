/*
	program heading: The Abandoned Castle
	author name: Mike Kline
	version: 0.1
  description: code that makes all stuff work, including 
  player input to navigation, combat and inventory control
	*/

  import * as data from './data.js';

let currentRoom = "road";
let gate = 0;
let damage = "";
let monster = 1;



/*********************************************/
/*              room navigation              */
/*********************************************/
/* alows navagation between rooms */
function selectRoom (e) {
  const notifications = document.getElementById('notifications');
  const backpack = data.inventory.backpack;

  
  switch (currentRoom){
      
    case 'road':
      if (e === "n" || e.keyCode === 78 || e.keyCode === 38){
        $('#description').text(data.gate.description);
        $('#direction').text(data.gate.directions);
        currentRoom = 'Front Gate';
      }
    break;

    case 'Front Gate':
    /* player interaction with the  welcome mat */
      if (!backpack.includes(' keys') && e === "p" || e.keyCode === 80){
        notifications.innerText = "You find keys under the mat and pick them up";
        backpack.push(' keys')
        reset(notifications);
      } else if (backpack.includes(' keys') && e === "p" || e.keyCode === 80){
        notifications.innerText = "You find nothing but dust under the mat.";
        reset(notifications);
      } else {
      /*player interaction with the gate */
      if (gate === 0) {
        notifications.innerText = "The Gate is locked.";
        reset(notifications);
        currentRoom = 'Front Gate';
      } else if (gate === 1) {
        if (e === "n" || e.keyCode === 78 || e.keyCode === 38){
          $('#description').text(data.courtYard.description);
          $('#direction').text(data.courtYard.directions);
          currentRoom = 'Courtyard';
        }
      }
    }
    break;

    case 'Courtyard':
      if (e === "n" || e.keyCode === 78 || e.keyCode === 38){
        $('#description').text(data.banquet.description);
        $('#direction').text(data.banquet.directions);
        currentRoom = 'Banquet Room';
      } else if (e === "e" || e.keyCode === 69 || e.keyCode === 39){
        $('#description').text(data.dungeon.description);
        $('#direction').text(data.dungeon.directions);
        currentRoom = 'Dungeon';
      } else if (e === "s" || e.keyCode === 83 || e.keyCode === 40){
        $('#description').text("The gates have sealed behind you. You can no longer go that way.");
        $('#direction').text("You can go north, east, west");
        currentRoom = 'Courtyard';
      } else if (e === "w" || e.keyCode === 87 || e.keyCode === 37){
        $('#description').text(data.stables.description);
        $('#direction').text(data.stables.directions);
        currentRoom = 'Stables';
      }
    break;

    case 'Stables':
      if (e === "e" || e.keyCode === 69 || e.keyCode === 39){
        $('#description').text(data.courtYard.description);
        $('#direction').text(data.courtYard.directions);
        currentRoom = 'Courtyard';
      }
    break;

    case 'Banquet Room':
      if (e === "n" || e.keyCode === 78 || e.keyCode === 38){
        $('#description').text(data.kitchen.description);
        $('#direction').text(data.kitchen.directions);
        currentRoom = 'Kitchen';
      } else if (e === "s" || e.keyCode === 83 || e.keyCode === 40){
        $('#description').text(data.courtYard.description);
        $('#direction').text(data.courtYard.directions);
        currentRoom = 'Courtyard';
      }
    break;

    case 'Kitchen':
      if (e === "s" || e.keyCode === 83 || e.keyCode === 40){
        $('#description').text(data.banquet.description);
        $('#direction').text(data.banquet.directions);
        currentRoom = 'Banquet Room';
      }
    break;

    case 'Dungeon':
      if (e === "w" || e.keyCode === 87 || e.keyCode === 37){
        $('#description').text(data.courtYard.description);
        $('#direction').text(data.courtYard.directions);
        currentRoom = 'Courtyard';
      } else if (monster === 0){
         if ( e === "e" || e.keyCode === 69 || e.keyCode === 39){
          $('#description').text(data.cave.description);
          $('#direction').text(data.cave.directions);
        currentRoom = 'Cave';}
      } else if (monster > 0){
        notifications.innerText = "As you approach the skeleton it begins to start laughing as it becomes alive and lunges towards you.";
        reset(notifications);
        /* combat logic to damage monster and move on to the next room, (refactor so mostly comes under compat function) */
        //bug: have to hit "a" twice to activate
        if (damage > 0 && e.keyCode === 65 || e === "a" ){

          const tillDead = data.skeletons.hitpoints -= damage;
          notifications.innerText = `you have done ${damage} damage to the ${data.skeletons.name}.`
          reset(notifications);
    
          if (tillDead <= 0){
            monster = 0;
            backpack.push(data.skeletons.items);

            notifications.innerText = `You killed the skeleton and received ${data.skeletons.items}.`;
            reset(notifications);

            data.dungeon.description = "Nothing remains of the skeleton and the opening into the cave is now accessable.";
            $('#description').text(data.dungeon.description);
          }
        }
      };
    break;

    case 'Cave':
      if (e === "w" || e.keyCode === 87 || e.keyCode === 37){
        $('#description').text(data.dungeon.description);
        $('#direction').text(data.dungeon.directions);
        currentRoom = 'Dungeon';
      }
      /* to end the demo and display message */
      if (e.keyCode === 13) {
        $('#end').show();
      }
    break;

    default:
        $('#article').text("you are lost, find your way back to the light");
    break;
  }
}

/*********************************************/
/*                  combat                   */
/*********************************************/
/* to calculate damage to a monster */
function attack (e) {
  if (e === "a" || e.keyCode === 65){
    damage = Math.ceil(Math.random() * 10);
  }
}

/*********************************************/
/*               inventory                   */
/*********************************************/

function inventory (e) {
  const inventory = document.getElementById('items');
  const notifications = document.getElementById('notifications');
  const backpack = data.inventory.backpack;

  /*to display inventory on scroll*/
  if (e === "i" || e.keyCode === 73){
    inventory.innerText = `Inventory: ${backpack}`;
    reset(inventory);
  }

  /*logic that uses "key" inventory item on gate*/
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
/* get player input */
$(document).keydown(selectRoom);
$(document).keydown(inventory);
$(document).keydown(attack);

$('#north').click(function(){selectRoom('n')});
$('#east').click(function(){selectRoom('e')});
$('#south').click(function(){selectRoom('s')});
$('#west').click(function(){selectRoom('w')});

$('#inventory').click(function(){inventory('i')});
$('#attack').click(function(){attack('a')});
$('#pickUp').click(function(){selectRoom('p')});
$('#use').click(function(){inventory('u')});


/*********************************************/
/*                 resets                    */
/*********************************************/

/*clears inner html of elements, specificly notifications and inventory*/
function reset (element) {
    setTimeout( function () {
        element.innerHTML = '';
      }, 4000);
}
