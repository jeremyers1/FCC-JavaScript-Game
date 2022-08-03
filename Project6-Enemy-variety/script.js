/** @type {HTMLCanvasElement} */ // Tell VSCode to suggest built-in Canvas Methods
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

function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// some code
	requestAnimationFrame(animate);
}

