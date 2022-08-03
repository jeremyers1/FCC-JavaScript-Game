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
			this.enemyInterval = 1000;
			this.enemyTimer = 0;
		}
		update(deltaTime) {
			if (this.enemyTimer > this.enemyInterval) {
				this.enemies = this.enemies.filter(object => !object.markedForDeletion);
				this.#addNewEnemy();
				this.enemyTimer = 0;
				console.log(this.enemies);
			} else {
				this.enemyTimer += deltaTime;
			}
			this.enemies.forEach(object => object.update());
		}
		draw() {
			this.enemies.forEach(object => object.draw(this.ctx));
		}
		// private methods can only be called from within class
		#addNewEnemy() {
			this.enemies.push(new Enemy(this));
		}
	}

	// basic class for all enemies
	class Enemy {
		constructor(game) {
			this.game = game;
			this.x = this.game.width;
			this.y = Math.random() * this.game.height;
			this.width = 100;
			this.height = 100;
			this.markedForDeletion = false;
		}
		update() {
			this.x--;
			if (this.x < 0 - this.width) {
				this.markedForDeletion = true;
			}
		}
		draw(ctx) {
			ctx.fillRect(this.x, this.y, this.width, this.height);
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
