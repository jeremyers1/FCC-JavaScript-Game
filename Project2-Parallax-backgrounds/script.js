const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = (canvas.width = 800);
const CANVAS_HEIGHT = (canvas.height = 700);

let gameSpeed = 10;

const backgroundLayer1 = new Image();
backgroundLayer1.src = 'layer-1.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = 'layer-2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = 'layer-3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = 'layer-4.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src = 'layer-5.png';

/* The following method "works" but is not the best way, and becomes a larger mess withe ach background image added
let x = 0;
let x2 = 2400; // to load second image so infinite scroll

function animate() {
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	ctx.drawImage(backgroundLayer1, x, 0);
	ctx.drawImage(backgroundLayer1, x2, 0);
	if (x < -2400) x = 2400 + x2 - gameSpeed; // extra addition/subtraction at end to remove gap between images
	else x -= gameSpeed;
	if (x2 < -2400) x = 2400 + x - gameSpeed; // load second image while image 1 resets,
	else x2 -= gameSpeed;
	requestAnimationFrame(animate);
}
animate();
*/

// BETTER WAY uses JS Classes

// since images are large, don't start game until everything is loaded
window.addEventListener('load', function () {
	const slider = document.getElementById('slider');
	slider.value = gameSpeed;
	const showGameSpeed = document.getElementById('showGameSpeed');
	showGameSpeed.innerHTML = gameSpeed;
	slider.addEventListener('change', function (e) {
		gameSpeed = e.target.value;
		showGameSpeed.innerHTML = e.target.value;
	});

	class Layer {
		constructor(image, speedModifier) {
			this.x = 0;
			this.y = 0;
			this.width = 2400;
			this.height = 700;
			this.image = image;
			this.speedModifier = speedModifier;
			this.speed = gameSpeed * this.speedModifier;
		}
		// moves image by changing x value
		// resets when image moves offscreen, just as earlier on lines 27-30
		update() {
			this.speed = gameSpeed * this.speedModifier;
			if (this.x <= -this.width) {
				this.x = 0; // resets back to start of first image
			}
			this.x = this.x - this.speed;
		}
		// draws on canvas, as earlier on lines 25-26
		draw() {
			ctx.drawImage(this.image, this.x, this.y, this.width, this.height); // first image at x
			ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height); // second image at x + width
		}
	}

	const layer1 = new Layer(backgroundLayer1, 0.2);
	const layer2 = new Layer(backgroundLayer2, 0.4);
	const layer3 = new Layer(backgroundLayer3, 0.6);
	const layer4 = new Layer(backgroundLayer4, 0.8);
	const layer5 = new Layer(backgroundLayer5, 1);

	const gameObjects = [layer1, layer2, layer3, layer4, layer5];

	function animate() {
		ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		gameObjects.forEach(object => {
			object.update();
			object.draw();
		});
		requestAnimationFrame(animate);
	}
	animate();
});
