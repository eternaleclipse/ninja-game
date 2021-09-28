const KEY_W = 87
const KEY_A = 65
const KEY_S = 83
const KEY_D = 68
const KEY_SPACE = 32

let img_idle = new Image()
img_idle.src = 'img/player/idle.png'

let img_walk = new Image()
img_walk.src = 'img/player/walk.png'

let img_attack = new Image()
img_attack.src = 'img/player/attack.png'

class Player {
    constructor(keys, spawnProjectile) {
        this.keys = keys
        this.spawnProjectile = spawnProjectile
        this.animations = {
            idle: {
                img: img_idle,
                frames: 8, width: 96,
            },
            walk: {
                img: img_walk,
                frames: 8, width: 96,
            },
            attack: {
                img: img_attack,
                frames: 16, width: 128,
            }
        }

        this.x = 0
        this.y = 0
        this.speedX = 0
        this.speedY = 0
        this.walkSpeed = 20 
        this.direction = 'left'
        this.width = 100
        this.height = 80
        this.frame = 0
        this.lastAttack = 0
        this.attackInterval = 50
        this.animation = this.animations.walk;
    }

    attack() {
        let time = Date.now()
        if (time - this.lastAttack > this.attackInterval) {
            this.lastAttack = time
            this.spawnProjectile(this.x + this.width / 2,
                this.y + this.height / 2,
                this.direction)
        }
    }
    
    update() {
        if (this.keys[KEY_W]) {
            this.speedY = -this.walkSpeed
        } else if (this.keys[KEY_S]) {
            this.speedY = this.walkSpeed
        } else {
            this.speedY = 0
        }

        if (this.keys[KEY_A]) {
            this.speedX = -this.walkSpeed
            this.direction = 'right'
        } else if (this.keys[KEY_D]) {
            this.speedX = this.walkSpeed
            this.direction = 'left'
        } else {
            this.speedX = 0
        }

        if (this.speedX == 0 && this.speedY == 0) {
            this.animation = this.animations.idle
        } else {
            this.animation = this.animations.walk
        }

        if (this.keys[KEY_SPACE]) {
            this.animation = this.animations.attack
            this.attack()
        }

        this.x += this.speedX
        this.y += this.speedY
    }

    draw(ctx) {
        this.update()
        ctx.save()
        this.visualX = this.x
        if (this.direction == 'right') {
            ctx.scale(-1, 1)
            this.visualX += this.animation.width
            this.visualX *= -1
        }

        ctx.drawImage(this.animation.img,
            this.animation.width * this.frame, 0,
            this.width, this.height,
            this.visualX, this.y,
            this.width, this.height)

        ctx.restore()
        this.frame = (this.frame + 1) % this.animation.frames;
    }

    getPos() { return {x: this.x, y: this.y } }
}

export default Player