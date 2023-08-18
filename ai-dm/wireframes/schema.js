export const user = {
    username: "keinoc",
    email: "hello@keino.dev",
};

export const weapons = [
    {
        name: "sun blade",
        rank: 1,
        id: "wep001",
        type: "weapon",
        range: 5,
        hitMod: 1,
        dmgMod: 1,
    },
];

// Keino
// research d&d api
// make crud functions for weapons and items
// make route for all weapons and items with filters etc


export const items = [
    {
        type: "healing",
        numRolls: 1,
        sides: 6,
        mod: 1,
    },
];

// DREW
// build basic ui frame


// Connor 
// work on item/weapon generation.


function rollDice(numRolls, numSides, modifier=0) {
    const rolls = [];
    for (let i = 0; i < numRolls; i++) {
        rolls.push(Math.floor(Math.random() * numSides) + 1);
    }
    const result = rolls.reduce((sum, value) => sum + value, 0)+modifier
    return result;
}

// Example usage
const numRolls = 3;
const numSides = 6;
const result = rollDice(numRolls, numSides);
console.log(`Rolled ${numRolls}d${numSides}: ${result}`);
console.log(`Total: ${result.reduce((sum, value) => sum + value, 0)}`);

function handleHeal(item, character) {
    //break out hp
}

function genItemDescription(item) {
    const description = `Player found this item: name: ${item.name}, range: ${item.range}, hitMod: ${item.dmgMod}`;
}

export const characterSheet = {
    id: "1",
    AC: 20,
    HP: {
        current: 10,
        max: 10,
        temp: 0,
    },
    race: "human",
    class: "Bard",
    subclass: "Lore",
    stats: {
        str: 13,
        dex: 10,
        con: 10,
        int: 10,
        wis: 10,
        cha: 10,
    },
    background: "Sailor",
    inventory: {
        weapons: ["wep001"],
        items: [],
    },
};
