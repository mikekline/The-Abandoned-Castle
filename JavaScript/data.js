const gate = {
    type:"room",
    name:"Front Gate",
    Item:"key",
    description:"Though the castle is ancient it seams relatively new you think, as the large front gates loom before you. Locked of course! You notice a welcome mat, how nice you think.",
    directions:"You can go north though the gates"
}

const courtYard = {
    type:"room",
    name:"Courtyard",
    description:"As you enter the courtyard you notice it is very silent. Not even the wind can be heard here. You notice an apple tree off to the side, otherwise it is pretty dusty and quite.",
    directions:"You can go north, south, east, west"
}

const stables = {
    type:"room",
    name:"Stables",
    description:"You enter into an empty dark what once looked like a stables. But nothing is here now.",
    directions:"You can go east"
}

const banquet = {
    type:"room",
    name:"Banquet Room",
    description:"This is the large banquet room for entertaining many guests. Large tables with goblets and cobwebs everywhere litter the hall.",
    directions:"You can go north, south"
}

const kitchen = {
    type:"room",
    name:"Kitchen",
    description:"This is the kitchen. Large pots lay all over the stoves and floor. Once great feasts were prepared here, long long ago.",
    directions:"You can go south"
}

const dungeon = {
    type:"room",
    name:"Dungeon",
    description:"Down the stairs you desend into the murky, wet Dungeon, where prisoners were once kept. There is nothing left except for broken bars, chains and a few  skeletons laying about. Behind one of the skeletons there is an opening, that opens to a large cave.",
    directions:"You can go east, west"
}

const cave = {
    type:"room",
    name:"Cave",
    description:"Apon entering the cave, your eyes ajust to the light coming in from the mouth of the cave. It appears the cave opens up over a valley that exteneds to the mountains. You have reached the end of the beginning, press 'enter' to end.",
    directions:"You can go west"
}

const inventory = {
    type:"inventory",
    name:"inventory",
    backpack:[" sword", " stick of gum", " latest issue of abandon castles magazine"],
    description:"Your backpack where you carry all your stuff." 
}

const skeletons = {
    type:"monster",
    name:"skeleton",
    hitpoints:20,
    items:" 5 gold"
}

export {gate, courtYard, stables, banquet, kitchen, dungeon, cave, inventory, skeletons};