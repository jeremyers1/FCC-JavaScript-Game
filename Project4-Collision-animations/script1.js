/** @type {HTMLCanvasElement} */ // Tell VSCode to suggest built-in Canvas Methods
// see script.js for 3 basic versions of collision detection
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = (canvas.width = 500);
const CANVAS_HEIGHT = (canvas.height = 700);

const explosions = [];
let canvasPosition = canvas.getBoundingClientRect(); // returns an object providing information about an element relative to the viewport

/* ctx.fillStyle = 'white';
ctx.fillRect(50, 50, 100, 140); */

class Explosion {
	constructor(x, y) {
		this.spriteWidth = 200;
		this.spriteHeight = 179;
		this.width = this.spriteWidth * 0.7;
		this.height = this.spriteHeight * 0.7;
		this.x = x;
		this.y = y;
		this.image = new Image();
		this.image.src = 'boom.png';
		this.frame = 0;
		this.timer = 0;
		this.angle = Math.random() * 6.2;
		this.sound = new Audio();
		this.sound.src = 'boom.wav'; // sound FX at OpenGameArt.org
	}
	update() {
		if (this.frame === 0) this.sound.play();
		this.timer++;
		if (this.timer % 10 === 0) {
			this.frame++;
		}
	}
	draw() {
		// how to rotate drawings - to learn more, see the Halloween Episode from FranksLaboratory https://www.youtube.com/watch?v=TBXjWsR7XDA&t
		ctx.save(); // save the current state of the drawing
		ctx.translate(this.x, this.y); // translate rotation center point on top of current object
		ctx.rotate(this.angle); // rotate by a random angle value
		// ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
		ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight, 0 - this.width * 0.5, 0 - this.height * 0.5, this.width, this.height); // draw image
		ctx.restore(); // restore canvas context to original save point, to make sure rotate only affects one draw call of one object
	}
}

window.addEventListener('click', function (e) {
	createAnimation(e);
});

/* window.addEventListener('mousemove', function (e) {
	createAnimation(e);
}); */

function createAnimation(e) {
	let positionX = e.x - canvasPosition.left;
	let positionY = e.y - canvasPosition.top;
	// 	ctx.fillStyle = 'white';
	// ctx.fillRect(positionX - 25, positionY - 25, 50, 50);
	explosions.push(new Explosion(positionX, positionY));
}

function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (let i = 0; i < explosions.length; i++) {
		explosions[i].update();
		explosions[i].draw();
		if (explosions[i].frame > 5) {
			explosions.splice(i, 1);
			i--;
		}
	}
	requestAnimationFrame(animate);
}
animate();
