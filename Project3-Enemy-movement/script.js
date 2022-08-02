/** @type {HTMLCanvasElement} */ // Tell VSCode to suggest built-in Canvas Methods
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = (canvas.width = 500);
const CANVAS_HEIGHT = (canvas.height = 1000);
const numberOfEnemies = 20;
const enemiesArray = [];

let gameFrame = 0;

// ENEMY 1 -------- FLAP AND HOVER WITHIN A RANDOMIZED AREA
// TODO: consolidate all enemies into one class and send parameters to constructor for different enemies
/* class Enemy1 {
	constructor() {
		this.image = new Image();
		this.image.src = 'enemy1.png';
		// this.speed = Math.random() * 4 - 2; // random number between -2 and 2
		this.spriteWidth = 293;
		this.spriteHeight = 155;
		this.width = this.spriteWidth / 2;
		this.height = this.spriteHeight / 2;
		this.x = Math.random() * (canvas.width - this.width); // random location within canvas
		this.y = Math.random() * (canvas.height - this.height);
		this.frame = 0;
		this.flapSpeed = Math.floor(Math.random() * 3 + 1); // random number between 1 and 4
	}
	update() {
		this.x += Math.random() * 15 - 7.5; // enemy range
		this.y += Math.random() * 10 - 5;
		//animate sprites
		if (gameFrame % 2 === 0) {
			this.frame > 4 ? (this.frame = 0) : this.frame++;
		}
	}
	draw() {
		// ctx.strokeRect(this.x, this.y, this.width, this.height);
		ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
	}
}

//const enemy1 = new Enemy();
for (let i = 0; i < numberOfEnemies; i++) {
	enemiesArray.push(new Enemy1());
} */

/* // ENEMY 2 -------- ENDLESS HORIZONTAL MOVEMENT WITH RANDOMIZED VERTICAL SIN WAVE
//
class Enemy2 {
	constructor() {
		this.image = new Image();
		this.image.src = 'enemy2.png';
		this.speed = Math.random() * 4 + 1; // speed between 1 and 5
		this.spriteWidth = 266;
		this.spriteHeight = 188;
		this.width = this.spriteWidth / 2;
		this.height = this.spriteHeight / 2;
		this.x = Math.random() * (canvas.width - this.width);
		this.y = Math.random() * (canvas.height - this.height);
		this.frame = 0;
		this.flapSpeed = Math.floor(Math.random() * 3 + 1);
		this.angle = Math.random() * 2;
		this.angleSpeed = Math.random() * 0.2;
		this.curve = Math.random() * 7; // randomize wave
	}
	update() {
		this.x -= this.speed;
		this.y += Math.sin(this.angle) * this.curve; // random wave size
		this.angle += this.angleSpeed;
		if (this.x + this.width < 0) this.x = canvas.width;
		//animate sprites
		if (gameFrame % 2 === 0) {
			this.frame > 4 ? (this.frame = 0) : this.frame++;
		}
	}
	draw() {
		ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
	}
}

//const enemy1 = new Enemy();
for (let i = 0; i < numberOfEnemies; i++) {
	enemiesArray.push(new Enemy2());
} */

// ENEMY 3 -------- ENDLESS CIRCULAR MOVEMENT WITH RANDOMIZED VERTICAL SIN AND COS WAVES
/* class Enemy3 {
	constructor() {
		this.image = new Image();
		this.image.src = 'enemy3.png';
		this.speed = Math.random() * 4 + 1; // speed between 1 and 5
		this.spriteWidth = 218;
		this.spriteHeight = 177;
		this.width = this.spriteWidth / 2;
		this.height = this.spriteHeight / 2;
		this.x = Math.random() * (canvas.width - this.width);
		this.y = Math.random() * (canvas.height - this.height);
		this.frame = 0;
		this.flapSpeed = Math.floor(Math.random() * 3 + 1);
		this.angle = Math.random() * 500; // determins where they first appear
		this.angleSpeed = Math.random() * 2 + 0.5; // movement speed. Increase for later levels?
		//	this.curve = Math.random() * 200 + 50; // determins radius of circle that characters are moving in, can be used below instead of (canvas.width / 2)
	}
	update() {
		this.x = Math.cos((this.angle * Math.PI) / 90) * (canvas.width / 2) + (canvas.width / 2 - this.width / 2); // randomize wave movement within boundaries
		this.y = Math.sin((this.angle * Math.PI) / 270) * (canvas.height / 2) + (canvas.height / 2 - this.height / 2);
		// sin and cos togehter map a random circular path
		// with BOTH set at 180 (or 360, or 50, or whatever, they will be circular movements)
		// if change one or the other, will get different type of cycling patterns
		// the cos is the horizontal movement, the sin is the virtical. So if you set cos to 360 and sin to 90, you will get 4 horizontal moves for every 1 vertical
		// if both are cos, they will go back and forth in some path
		this.angle += this.angleSpeed;
		if (this.x + this.width < 0) this.x = canvas.width;
		//animate sprites
		if (gameFrame % 2 === 0) {
			this.frame > 4 ? (this.frame = 0) : this.frame++;
		}
	}
	draw() {
		ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
	}
} 

//const enemy1 = new Enemy();
for (let i = 0; i < numberOfEnemies; i++) {
	enemiesArray.push(new Enemy3());
} */

// ENEMY 4 -------- ENDLESS RANDOM MOVEMENT FROM ONE RANDOM POINT TO ANOTHER RANDOM POINT
class Enemy4 {
	constructor() {
		this.image = new Image();
		this.image.src = 'enemy4.png';
		this.speed = Math.random() * 4 + 1; // speed between 1 and 5
		this.spriteWidth = 213;
		this.spriteHeight = 213;
		this.width = this.spriteWidth / 2;
		this.height = this.spriteHeight / 2;
		this.x = Math.random() * (canvas.width - this.width);
		this.y = Math.random() * (canvas.height - this.height);
		this.newX = Math.random() * (canvas.width - this.width);
		this.newY = Math.random() * (canvas.height - this.height);
		this.frame = 0;
		this.flapSpeed = Math.floor(Math.random() * 3 + 1);
		this.interval = Math.floor(Math.random() * 200 + 50); // change number to change speed
	}
	update() {
		if (gameFrame % this.interval === 0) {
			this.newX = Math.random() * (canvas.width - this.width);
			this.newY = Math.random() * (canvas.height - this.height);
		}
		let dx = this.x - this.newX;
		let dy = this.y - this.newY;
		this.x -= dx / 20; // moves toward dx, change number to change speed
		this.y -= dy / 20; //moves toward dy, change number to change speed
		if (this.x + this.width < 0) this.x = canvas.width;
		//animate sprites
		if (gameFrame % 2 === 0) {
			this.frame > 4 ? (this.frame = 0) : this.frame++;
		}
	}
	draw() {
		ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
	}
}

//const enemy1 = new Enemy();
for (let i = 0; i < numberOfEnemies; i++) {
	enemiesArray.push(new Enemy4());
}

function animate() {
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	enemiesArray.forEach(enemy => {
		enemy.update();
		enemy.draw();
	});
	gameFrame++;
	requestAnimationFrame(animate);
}
animate();
