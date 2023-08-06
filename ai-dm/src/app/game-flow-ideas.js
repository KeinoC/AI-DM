
// the first primer prompt to the chat gpt api, we wont return it's response from this.
const InitialSystemPromptObjToText = `
Your role is ${initialSystemPrompts.role} for the ttrpg ${initialSystemPrompts.game}.
The scenarios is ${getScenarioById(initialSystemPrompts.scenario)}.
The players are ${getPlayersById(initialSystemPrompts.players).map(player => playerObjToText(player.id))}.
`

// helper functions for fetching and converting objects to string / sentences
function getScenarioById(sceneId) {
    return scenarios.find(scene => scene.id === sceneId)
}

function getPlayersByIds(playerIds) {
    return players.filter(player => playerIds.includes(player.id))
}

function playerObjToText(playerId) {
    const pName = players.find(player => player.id === playerId).name
    const pClass = players.find(player => player.id === playerId).class
    return `${pClass} named ${pName}`
}

// Game objects from the database, will be performing CRUD actions against these
const initialSystemPrompts = {
    role: "Game MediaStream",
    game: "Dungeons and Dragons 5e",
    scenario: 1,
    Players: [2, 3]
}

const players = [
    {
        id: 1,
        name: "Matt",
    },
    {
        id: 2,
        name: "Drew",
        class: "paladin"
    },
    {
        id: 3,
        name: "Keino",
        class: "warlock"
    }
]

const scenarios = [
    {
    id: 1,
    scenarioName: "Assassination",
    questGiver: "Akil Hoffman",
    target: "Duke Bailard",
    setting: "set scene for player: describe weather, smells, sounds, make it immersive",
    difficultyMod: 1.1,
    phases: [
        {
            phaseId: 1,
            phaseName: "discovery",
            phaseDescription: `players received a request from ${scenarios.questGiver} to assassinate ${scenarios.target}.`,
            targetLocation: "Duke Bailard's estate",
        }
    ]
}]