const gameWidth = 800
const gameHeight = 600
const loopInterval = 0.07
const snakeBlockSize = 15
const snakeLength = 10
const foodSize = 20
const maxFoodAmountEachSpawn = 1
const foodSpawnPosMargin = 40

let currentFoodAmountOnScreen = 0
let snakeDirection = 'RIGHT'
let score = 0
let gameState = 'playing'

kaboom({
    debug: false,
    width: gameWidth,
    height: gameHeight,
    background: [70, 70, 70]
})

// loadSound('power-up', 'sounds/power-up.wav')
// loadSound('game-over', 'sounds/game-over.wav')

const scoreText = add([
    pos(gameWidth / 2, 20),
    origin('center'),
    text('score: ' + score, {
        size: 24,
        font: 'sink'
    })
])

const head = add([
    'head',
    area(),
    rect(snakeBlockSize, snakeBlockSize),
    origin('center'),
    pos(100, 100),
    color(255, 255, 255)
])

const snakeBody = []
for (let i = 0; i < snakeLength; i++) {
    spawnBodyPart()
}

wait(2, () => {
    spawnFood()
})

loop(loopInterval, () => {
    if (gameState != 'playing') { return }
    const headOldPos = head.pos
    switch (snakeDirection) {
        case 'RIGHT':
            head.moveTo(head.pos.add(snakeBlockSize, 0))
            break
        case 'LEFT':
            head.moveTo(head.pos.sub(snakeBlockSize, 0))
            break
        case 'DOWN':
            head.moveTo(head.pos.add(0, snakeBlockSize))
            break
        case 'UP':
            head.moveTo(head.pos.sub(0, snakeBlockSize))
            break
        default:
            break
    }

    for (let i = 0; i < snakeBody.length; i++) {
        const tmpBodyPart = snakeBody[i]
        tmpBodyPart.oldPos = tmpBodyPart.bodyPart.pos
        if (i == 0) {
            tmpBodyPart.bodyPart.moveTo(headOldPos)
        } else {
            tmpBodyPart.bodyPart.moveTo(snakeBody[i - 1].oldPos)
        }
    }

    const posX = head.pos.x
    const posY = head.pos.y

    if (posX > gameWidth) {
        head.moveTo(0, head.pos.y)
    } else if (posX < 0) {
        head.moveTo(gameWidth, posY)
    }

    if (posY > gameHeight) {
        head.moveTo(head.pos.x, 0)
    } else if (posY < 0) {
        head.moveTo(head.pos.x, gameHeight)
    }
})

head.onCollide('food', (food) => {
    destroy(food)
    // play('power-up')
    currentFoodAmountOnScreen--
    score += 10
    scoreText.text = 'score: ' + score
    spawnBodyPart()
    spawnFood()
})

head.onCollide('body', () => {
    destroyAll('food')
    gameState = 'game-over'
    // play('game-over')
    scoreText.text = 'game over, your final score is: ' + score
})

onKeyPress('right', () => {
    if (snakeDirection != 'LEFT')
        snakeDirection = 'RIGHT'
})

onKeyPress('left', () => {
    if (snakeDirection != 'RIGHT')
        snakeDirection = 'LEFT'
})

onKeyPress('up', () => {
    if (snakeDirection != 'DOWN')
        snakeDirection = 'UP'
})

onKeyPress('down', () => {
    if (snakeDirection != 'UP')
        snakeDirection = 'DOWN'
})

function spawnBodyPart() {
    let spawnPos = head.pos
    if (snakeBody.length > 0) [
        spawnPos = snakeBody[snakeBody.length - 1].
            bodyPart.pos
    ]
    snakeBody.push({
        oldPos: head.pos,
        bodyPart: add([
            'body',
            area(),
            rect(snakeBlockSize, snakeBlockSize),
            origin('center'),
            pos(spawnPos),
            color(255, 255, 255)
        ])
    })
}

function spawnFood() {
    for (let i = 0; i < maxFoodAmountEachSpawn; i++) {
        if (currentFoodAmountOnScreen >= maxFoodAmountEachSpawn) { return }
        let posX = rand(foodSpawnPosMargin, gameWidth - foodSpawnPosMargin)
        let posY = rand(foodSpawnPosMargin, gameHeight - foodSpawnPosMargin)
        add([
            'food',
            area(),
            rect(foodSize, foodSize),
            origin('center'),
            pos(posX, posY),
            color(255, 255, 255)
        ])
        currentFoodAmountOnScreen++
    }
}