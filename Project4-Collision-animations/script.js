/** @type {HTMLCanvasElement} */ // Tell VSCode to suggest built-in Canvas Methods
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = (canvas.width = 500);
const CANVAS_HEIGHT = (canvas.height = 1000);

// simple rectangle collision
rect1 = {
	x: 5,
	y: 154,
	width: 150,
	height: 150,
};
rect2 = {
	x: 150,
	y: 5,
	width: 150,
	height: 150,
};

function animate() {
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	ctx.strokeRect(rect1.x, rect1.y, rect1.width, rect1.height);
	ctx.fillRect(rect2.x, rect2.y, rect2.width, rect2.height);
}
animate();

// Rectangle Collision Detection 1
// prettier-ignore
// U=Uppler, L=Lower, r=right, l=left, C = Corner
// if rect1.UlC isLeftOf rect2.UrC &&
//    rect1.UrC isRightOf rect2.UlC &&
//    rect1.UlC isLowerThan rect2.LlC &&
//    rect1.LlC isHigherThan rect2.UlC
if (rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y) {
  //collision detected
  console.log("collision");
} else {
  // no collision
  console.log("NO collision");
}

// Rectangle Collision Detection 2
// ALTERNATE METHOD TO ABOVE, AND A LITTLE MORE EFFICIENT
// prettier-ignore
// U=Uppler, L=Lower, r=right, l=left, C = Corner
// if rect1.UlC isrightOf rect2.UrC ||
//    rect1.UrC isLeftOf rect2.UlC ||
//    rect1.UlC isHigherThan rect2.LlC ||
//    rect1.LlC isLowerThan rect2.UlC
// The y COORDS DON'T SEEM RIGHT TO ME... but they are.
// IN HTML Canvas, as y increases, it goes DOWN the y axis
if (rect1.x > rect2.x + rect2.width ||
    rect1.x + rect1.width < rect2.x ||
    rect1.y > rect2.y + rect2.height ||
    rect1.y + rect1.height < rect2.y) {
  // no collision
  console.log("NO collision 2");
} else {
  // collision
  console.log("collision 2");
}

// circle collision dectiction
// if distance between center1 and center2 is greater than raidus1 + radius2, no collision
const circle1 = { x: 10, y: 10, radius: 300 };
const circle2 = { x: 500, y: 500, radius: 150 };

let dx = circle2.x - circle1.x;
let dy = circle2.y - circle1.y;
let distance = Math.sqrt(dx * dx + dy * dy);
let sumOfRadii = circle1.radius + circle2.radius;

if (distance < sumOfRadii) console.log('collision');
else if (distance === sumOfRadii) console.log('touching');
else if (distance > sumOfRadii) console.log('No collision');
