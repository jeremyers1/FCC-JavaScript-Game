const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d'); // load all canvas 2D methods
const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);

/* simple method for animation
const playerImage = new Image(); // call built-in image constructor, does same as document.createElement('img');
playerImage.src = 'shadow_dog.png';
const spriteWidth = 575;
const spriteHeight = 523;
let frameX = 0; // starting frame for ALL animations
let frameY = 4; // change to select different animation, and ALSO change 'frameX < ...' below b/c different rows have different # of frames
let gameFrame = 0;
const staggerFrames = 5; // change to change animation speed

function animate() {
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // clear all previous animations, x location, y location, width, height
	ctx.drawImage(playerImage, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight); // image, src x, src y, src width, src height, dest x, dest y, dest width, dest height
	// set gameFrame to help slow down animation
	if (gameFrame % staggerFrames === 0) {
		if (frameX < 8) frameX++; // to cycle through frames horinzontally
		else frameX = 0;
	}
	gameFrame++;
	requestAnimationFrame(animate); // built-in function that calls parameter one time, but since parameter is the function, it loops continuously
}

animate();
*/

// more complex method for animation

/* const playerImage = new Image();
playerImage.src = 'shadow_dog.png';
const spriteWidth = 575;
const spriteHeight = 523;
let frameX = 0;
let frameY = 0; // change to set which animation to draw, and change  % 6 below for number of frames animation has 
let gameFrame = 0;
const staggerFrames = 5;

function animate() {
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	let position = Math.floor(gameFrame / staggerFrames) % 6; // More advanced method of setting animation speed,
	frameX = spriteWidth * position; // the 6 above is b/c row 0 has 7 frames (0 through 6)
	ctx.drawImage(playerImage, frameX, frameY * spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);

	gameFrame++;
	requestAnimationFrame(animate);
}

animate(); */

// We can avoid having to change the number of frames on lines 38 and 44 by making a array of sprite objects:

let playerState = 'run'; // so we don't have to hardcode  which animation to use
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change', function (e) {
	playerState = e.target.value;
});

const playerImage = new Image();
playerImage.src = 'shadow_dog.png';
const spriteWidth = 575;
const spriteHeight = 523;
/* not needed now, because spriteAnimations[] has x and y coordinates
 let frameX = 0;
let frameY = 0; */
let gameFrame = 0;
const staggerFrames = 5;
const spriteAnimations = [];
const animationStates = [
	{
		name: 'idle',
		frames: 7,
	},
	{
		name: 'jump',
		frames: 7,
	},
	{
		name: 'fall',
		frames: 7,
	},
	{
		name: 'run',
		frames: 9,
	},
	{
		name: 'dizzy',
		frames: 11,
	},
	{
		name: 'sit',
		frames: 5,
	},
	{
		name: 'roll',
		frames: 7,
	},
	{
		name: 'bite',
		frames: 7,
	},
	{
		name: 'ko',
		frames: 11,
	},
	{
		name: 'getHit',
		frames: 4,
	},
];

animationStates.forEach((state, index) => {
	let frames = {
		loc: [],
	};
	for (let j = 0; j < state.frames; j++) {
		let positionX = j * spriteWidth;
		let positionY = index * spriteHeight;
		frames.loc.push({ x: positionX, y: positionY });
	}
	spriteAnimations[state.name] = frames; // for each state.name (from animationStates),
	// push an array of location objects to spriteAnimations, "named" with the state.name
});
console.log(spriteAnimations);

function animate() {
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length; // updated
	let frameX = spriteWidth * position; // updated
	let frameY = spriteAnimations[playerState].loc[position].y; // updated

	ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight); // updated b/c the * not needed, due to already set above

	gameFrame++;
	requestAnimationFrame(animate);
}

animate();
