/** @type {HTMLCanvasElement} */ // Tell VSCode to suggest built-in Canvas Methods
// wait for all sources to load before starting game
document.addEventListener('load', function () {
	const canvas = document.getElementById('canvas1');
	const ctx = canvas.getContext('2d');
	canvas.width = 500;
	canvas.height = 800;

	// basic class for game movement and effects
	class Game {
		constructor() {
			this.enemies = [];
		}
		update() {}
		draw() {}
		// private methods can only be called from within class
		#addNewEnemy() {}
	}

	// basic class for all enemies
	class Enemy {
		constructor() {}
		update() {}
		draw() {}
	}

  let lastTime = 0;
	function animate(timeStamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
		// some code
		requestAnimationFrame(animate);
  }
  animate(0);
});
