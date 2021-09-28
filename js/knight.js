let img_walk = new Image()
img_walk.src = 'img/enemies/knight/walk.png'

let img_attack = new Image()
img_attack.src = 'img/enemies/knight/attack.png'

class Knight {
    constructor(x, y, getPlayerPos) {
        this.animations = {
            walk: {
                img: img_walk,
                frames: 8, width: 96,
            },
            attack: {
                img: img_attack,
                frames: 16, width: 128,
            }
        }

        this.getPlayerPos = getPlayerPos
        this.x = x
        this.y = y
        this.speedX = 3
        this.speedY = 3
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
            // do attack
        }
    }
    
    update() {
        let playerPos = this.getPlayerPos()
        let dirX = playerPos.x > this.x ? 1 : -1
        let dirY = playerPos.y > this.y ? 1 : -1
        this.direction = dirX == 1 ? 'left' : 'right'
        this.x += this.speedX * dirX
        this.y += this.speedY * dirY
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
}

export default Knight