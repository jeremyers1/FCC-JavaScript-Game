/** @type {HTMLCanvasElement} */ // Tell VSCode to suggest built-in Canvas Methods
// wait for all sources to load before starting game
// he told me to use document.addEventListener('load'), but that didn't work as there is no Document: load event
// https://developer.mozilla.org/en-US/docs/Web/API/Document
window.addEventListener('load', function () {
	const canvas = document.getElementById('canvas1');
	const ctx = canvas.getContext('2d');
	canvas.width = 500;
	canvas.height = 800;

	// basic class for game movement and effects
	class Game {
		constructor(ctx, width, height) {
			this.ctx = ctx;
			this.width = width;
			this.height = height;
			this.enemies = [];
			this.enemyInterval = 500;
			this.enemyTimer = 0;
			this.enemyTypes = ['worm', 'ghost'];
		}
		update(deltaTime) {
			if (this.enemyTimer > this.enemyInterval) {
				this.enemies = this.enemies.filter(object => !object.markedForDeletion);
				this.#addNewEnemy();
				this.enemyTimer = 0;
			} else {
				this.enemyTimer += deltaTime;
			}
			this.enemies.forEach(object => object.update(deltaTime));
		}
		draw() {
			this.enemies.forEach(object => object.draw(this.ctx));
		}
		// private methods can only be called from within class
		#addNewEnemy() {
			const randomEnemy = this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)];
			if (randomEnemy === 'worm') this.enemies.push(new Worm(this));
			else if (randomEnemy === 'ghost') this.enemies.push(new Ghost(this));
			// to make higher-index enemies appear behind lower index enemies
			/* this.enemies.sort(function (a, b) {
				return a.y - b.y;
			}); */
		}
	}

	// basic class for all enemies
	class Enemy {
		constructor(game) {
			this.game = game;
			this.markedForDeletion = false;
		}
		update(deltaTime) {
			this.x -= this.vx * deltaTime;
			if (this.x < 0 - this.width) {
				this.markedForDeletion = true;
			}
		}
		draw(ctx) {
			// ctx.fillRect(this.x, this.y, this.width, this.height);
			// ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
			ctx.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
		}
	}

	class Worm extends Enemy {
		constructor(game) {
			super(game); // runs parent class constructor
			this.spriteWidth = 229;
			this.spriteHeight = 171;
			this.width = this.spriteWidth / 2;
			this.height = this.spriteHeight / 2;
			this.x = this.game.width;
			this.y = this.game.height - this.height; //worms on ground
			this.image = worm; // any html elment with an id is automatically added as a global variable by JS
			this.vx = Math.random() * 0.1 + 0.1; // velocity on horizontal axis x
		}
	}

	class Ghost extends Enemy {
		constructor(game) {
			super(game); // runs parent class constructor
			this.spriteWidth = 261;
			this.spriteHeight = 209;
			this.width = this.spriteWidth / 2;
			this.height = this.spriteHeight / 2;
			this.x = this.game.width;
			this.y = Math.random() * this.game.height * 0.6; // ghosts in top 60% of screen
			this.image = ghost;
			this.vx = Math.random() * 0.2 + 0.1;
			this.angle = 0;
			this.curve = Math.random() * 3;
		}
		update(deltaTime) {
			super.update(deltaTime); // run parent update(), and now add custom code
			this.y += Math.sin(this.angle) * this.curve; // for wavy flying
			this.angle += 0.04;
		}
		draw() {
			ctx.globalAlpha = 0.7; // globalAlpha affects all transparency amounts
			super.draw(ctx); // run parent draw(), and now add custom code
			ctx.globalAlpha = 1; // so change globalAlpha back to 1 after drawing a ghost ...
			// could also use save() ...restore() ... if changing multiple canvas properties rather than just globalAlpha
		}
	}

	const game = new Game(ctx, canvas.width, canvas.height);
	let lastTime = 0;
	function animate(timeStamp) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		const deltaTime = timeStamp - lastTime;
		lastTime = timeStamp;
		game.update(deltaTime);
		game.draw();
		// some code
		requestAnimationFrame(animate);
	}
	animate(0);
});
