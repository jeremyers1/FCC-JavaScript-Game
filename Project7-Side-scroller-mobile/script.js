window.addEventListener('load', function () {
	/** @type {HTMLCanvasElement} */ // for some reason, only works inside event listener
	const canvas = document.getElementById('canvas1');
	const ctx = canvas.getContext('2d');
	canvas.width = 800;
	canvas.height = 720;

	class InputHandler {
		constructor() {
			this.keys = [];
			window.addEventListener('keydown', e => {
				// prettier-ignore
				if ((	e.key === 'ArrowDown' ||
							e.key === 'ArrowUp' ||
							e.key === 'ArrowLeft' ||
							e.key === 'ArrowRight')
							&& this.keys.indexOf(e.key) === -1) {
					this.keys.push(e.key);
				}
			});
			window.addEventListener('keyup', e => {
				// prettier-ignore
				if (	e.key === 'ArrowDown' ||
							e.key === 'ArrowUp' ||
							e.key === 'ArrowLeft' ||
							e.key === 'ArrowRight'){
					this.keys.splice(this.keys.indexOf(e.key), 1);
				}
			});
		}
	}

	class Player {}

	class Background {}

	class Enemy {}

	function handleEnemies() {}

	function displayStatusText() {}

	const input = new InputHandler();

	function animate() {}
});
