/** @type {HTMLCanvasElement} */ // Tell VSCode to suggest built-in Canvas Methods
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const collisionCanvas = document.getElementById('collisionCanvas');
const collisionCtx = collisionCanvas.getContext('2d');
collisionCanvas.height = window.innerHeight;
collisionCanvas.width = window.innerWidth;

let score = 0;
let gameOver = false;
ctx.font = '50px Impact';

let timeToNextRaven = 0;
let ravenInterval = 500; // 500ms
let lastTime = 0;

//TODO: Add fast-flying ravens that are more points
//TODO: Make ravens with particles worth more points
//TOD0: Allow more lives
//TODO: At every 100 points, the speed of all ravens increases

let ravens = [];

class Raven {
	constructor() {
		this.image = new Image();
		this.image.src = 'raven.png';
		this.spriteWidth = 271;
		this.spriteHeight = 194;
		this.sizeModifier = Math.random() * 0.6 + 0.4; // different raven sizes, used below
		this.width = this.spriteWidth * this.sizeModifier;
		this.height = this.spriteHeight * this.sizeModifier;
		this.frame = 0;
		this.maxFrame = 4;
		this.x = canvas.width;
		this.y = Math.random() * (canvas.height - this.height); // so raven starts within upper and lower ranges of window
		this.directionX = Math.random() * 5 + 3; // random x value between 3 and 8
		this.directionY = Math.random() * 5 - 2.5; // random y value between -2.5 and 2.5
		this.timeSinceFlap = 0;
		this.flapInterval = Math.random() * 50 + 50; // randomize flap speed
		this.markedForDeletion = false;
		this.randomColors = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
		this.color = 'rgb(' + this.randomColors[0] + ', ' + this.randomColors[1] + ', ' + this.randomColors[2] + ')';
		this.hasTrail = Math.random() > 0.5; // using Math.random to set a random boolean
	}
	update(deltaTime) {
		if (this.y < 0 || this.y > canvas.height - this.height) {
			this.directionY = this.directionY * -1;
		}
		this.x -= this.directionX;
		this.y += this.directionY;
		if (this.x < 0 - this.width) this.markedForDeletion = true; // has raven moved past left edge of screen?
		this.timeSinceFlap += deltaTime;
		if (this.timeSinceFlap > this.flapInterval) {
			if (this.frame > this.maxFrame) this.frame = 0;
			else this.frame++;
			this.timeSinceFlap = 0;
			if (this.hasTrail) {
				for (let i = 0; i < 5; i++) {
					particles.push(new Particle(this.x, this.y, this.width, this.color));
				}
			}
		}
		if (this.x < 0 - this.width) gameOver = true;
	}
	draw() {
		collisionCtx.fillStyle = this.color;
		collisionCtx.fillRect(this.x, this.y, this.width, this.height);
		ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
	}
}

let explosions = [];
class Explosion {
	constructor(x, y, size) {
		this.image = new Image();
		this.image.src = 'boom.png';
		this.spriteWidth = 200;
		this.spriteHeight = 179;
		this.size = size;
		this.x = x;
		this.y = y;
		this.frame = 0;
		this.sound = new Audio();
		this.sound.src = 'boom.wav';
		this.timeSinceLastFrame = 0;
		this.frameInterval = 200;
		this.markedForDeletion = false;
	}
	update(deltatime) {
		if (this.frame === 0) this.sound.play();
		this.timeSinceLastFrame += deltatime;
		if (this.timeSinceLastFrame > this.frameInterval) {
			this.frame++;
			this.timeSinceLastFrame = 0;
			if (this.frame > 5) this.markedForDeletion = true;
		}
	}
	draw() {
		ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y - this.size * 0.25, this.size, this.size);
	}
}

let particles = [];
class Particle {
	constructor(x, y, size, color) {
		this.size = size;
		this.x = x + this.size + Math.random() * 50 - 25;
		this.y = y + this.size / 2 + Math.random() * 50 - 25;
		this.radius = Math.random() * (this.size / 10);
		this.maxRadius = Math.random() * 20 + 35;
		this.color = color;
		this.markedForDeletion = false;
		this.speedX = Math.random() * 1 + 0.5;
	}
	update() {
		this.x += this.speedX;
		this.radius += 0.3; // particles grow at this rate
		if (this.radius > this.maxRadius - 5) this.markedForDeletion = true; // the -5 stops the particle from blinking AFTER it has become opaque from globalAlpha but before it was delted from particles array
	}
	draw() {
		ctx.save(); // without save/restore, the globalAlpha affects ALL objects on the screen
		ctx.globalAlpha = 1 - this.radius / this.maxRadius; // visibility of particle
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		ctx.fill();
		ctx.restore();
	}
}

function drawScore() {
	ctx.fillStyle = 'black';
	ctx.fillText('Score: ' + score, 50, 75);
	ctx.fillStyle = 'white'; // text shadow
	ctx.fillText('Score: ' + score, 55, 80);
}

function drawGameOver() {
	ctx.textAlign = 'center';
	ctx.fillStyle = 'black';
	ctx.fillText('GAME OVER, your score is ' + score, canvas.width / 2, canvas.height / 2);
	ctx.fillStyle = 'white';
	ctx.fillText('GAME OVER, your score is ' + score, canvas.width / 2 + 5, canvas.height / 2 + 5);
}

window.addEventListener('click', function (e) {
	const detectPixelColor = collisionCtx.getImageData(e.x, e.y, 1, 1);
	const pixelColor = detectPixelColor.data;
	ravens.forEach(object => {
		if (object.randomColors[0] === pixelColor[0] && object.randomColors[1] === pixelColor[1] && object.randomColors[2] === pixelColor[2]) {
			// collision detected
			object.markedForDeletion = true;
			score++;
			explosions.push(new Explosion(object.x, object.y, object.width));
		}
	});
});

// timestamp is built in to requestAnimationFrame so that all computers run the game the same way when programmed as done here
function animate(timestamp) {
	collisionCtx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// calculate time between frames
	let deltaTime = timestamp - lastTime;
	lastTime = timestamp;
	timeToNextRaven += deltaTime;
	// make sure that a new raven is only generated every 500ms (set above), so slow computers don't get overwhelmed
	if (timeToNextRaven > ravenInterval) {
		ravens.push(new Raven());
		timeToNextRaven = 0;
		ravens.sort(function (a, b) {
			return a.width - b.width; // sort by raven size, so larger ones are on top of smaller ones
		});
	}
	drawScore();
	[...particles, ...ravens, ...explosions].forEach(object => object.update(deltaTime));
	[...particles, ...ravens, ...explosions].forEach(object => object.draw());
	ravens = ravens.filter(object => !object.markedForDeletion); // keep ravens that have NOT been markedForDeletion
	explosions = explosions.filter(object => !object.markedForDeletion);
	particles = particles.filter(object => !object.markedForDeletion);
	if (!gameOver) requestAnimationFrame(animate);
	else drawGameOver();
}
animate(0); // provides starting timestamp of 0
