import Player from './player.js';
import Projectile from './projectile.js'
import Knight from './knight.js'

const img_sand = document.getElementById('img_sand')
const gameCanvas = document.getElementById('gameCanvas')
const ctx = gameCanvas.getContext('2d')
const fps = 30
const fpsInterval = 1000 / fps
const numKnights = 10
const gameObjects = []
const keys = []
let score = 0
let savedTime

let isOutside = (r1_x1, r1_y1, r1_x2, r1_y2, r2_x1, r2_y1, r2_x2, r2_y2) => {
    return r1_x1 < r2_x1 || r1_x2 > r2_x2 || r1_y1 < r2_y1 || r1_y2 > r2_y2
}

let isPointInside = (px, py, r_x1, r_x2, r_y1, r_y2) => {
    return r_x1 < px && px < r_x2 && r_y1 < py && py < r_y2
}

let draw = () => {
    let time = Date.now()
    if (time - savedTime > fpsInterval) {
        ctx.clearRect(0, 0, gameCanvas.scrollWidth, gameCanvas.scrollHeight)
        ctx.font = "22px Arial";
        ctx.drawImage(img_sand, 0, 0);
        ctx.fillText("Score: " + score, gameCanvas.scrollWidth - 120, 30);
        gameObjects.forEach((obj, i) => {
            obj.draw(ctx)
            if (obj instanceof Projectile &&
                isOutside(obj.x + obj.width, obj.x, obj.y + obj.height, obj.y,
                    0, 0, gameCanvas.scrollWidth, gameCanvas.scrollHeight)) {
                    gameObjects.splice(i, 1)
                }
        })
        savedTime = time
    }
    window.requestAnimationFrame(draw)
}

let init = () => {
    savedTime = Date.now()

    let spawnRandomKnight = () => {
        let x = Math.floor(Math.random() * gameCanvas.scrollWidth)
        let y = Math.floor(Math.random() * gameCanvas.scrollHeight)
        gameObjects.push(new Knight(x, y, player.getPos.bind(player)))
    }

    let checkCollision = (x, y) => {
        gameObjects.forEach((obj, i) => {
            if (obj instanceof Knight && isPointInside(x, y, obj.x, obj.x + obj.width, obj.y, obj.y + obj.height)) {
                gameObjects.splice(i, 1)
                spawnRandomKnight()
                score++
            }
        })
    }

    let spawnProjectile = (x, y, direction) => {
        gameObjects.push(new Projectile(x, y, direction, checkCollision))
    }

    let player = new Player(keys, spawnProjectile)
    gameObjects.push(player)

    for (let i = 0; i < numKnights; i++) {
        spawnRandomKnight()
    }

    window.addEventListener('keydown', (e) => keys[e.keyCode] = true)
    window.addEventListener('keyup', (e) => delete keys[e.keyCode])
    window.requestAnimationFrame(draw)
}

init()