// Some usefull variables
var maxHealth = 10
var maxFood = 10
var handSize = 5
var cardUid = 0
var currentPlayingCard = null

// The consolidated state of our app
var state = {
    // World
    worldRatio: getWorldRatio(),
    // 游戏
    turn: 1,
    players: [
        {
            name: 'Anne of Cleves',
        },
        {
            name: 'William the Bald',
        },
    ],
    currentPlayerIndex: Math.round(Math.random()),
    testHand: [],
}
