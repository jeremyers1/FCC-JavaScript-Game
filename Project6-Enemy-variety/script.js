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
		constructor() {
			this.enemies = [];
			this.#addNewEnemy();
			console.log(this.enemies);
		}
		update() {
			this.enemies.forEach(object => object.update());
		}
		draw() {
			this.enemies.forEach(object => object.draw());
		}
		// private methods can only be called from within class
		#addNewEnemy() {
			this.enemies.push(new Enemy());
		}
	}

	// basic class for all enemies
	class Enemy {
		constructor() {
			this.x = 100;
			this.y = 100;
			this.width = 100;
			this.height = 100;
		}
		update() {
			this.x--;
		}
		draw() {
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}
	}

	const game = new Game();
	let lastTime = 0;
	function animate(timeStamp) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		const deltaTime = timeStamp - lastTime;
		lastTime = timeStamp;
		game.update();
		game.draw();
		// some code
		requestAnimationFrame(animate);
	}
	animate(0);
});
