const img_pretzel = new Image()
img_pretzel.src = './img/food/pretzel.png'

class Projectile {
    constructor(x, y, direction, checkCollision) {
        this.checkCollision = checkCollision
        this.img = img_pretzel
        this.width = this.img.width
        this.height = this.img.height
        this.x = x
        this.y = y
        this.speedY = 0
        this.speedX = direction == 'left' ? 30 : -30    
    }

    update() {
        this.x += this.speedX
        this.y += this.speedY
        this.checkCollision(this.x, this.y)
    }

    draw(ctx) {
        this.update()
        ctx.drawImage(this.img, this.x, this.y)
    }
}

export default Projectile