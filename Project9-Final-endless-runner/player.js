import { Standing, Jumping, Falling, Running, Dazed, Sitting, Rolling, Attack1, Attack2, Attack3 } from './playerStates.js';

export class Player {
	constructor(game) {
		this.game = game;
		this.width = 100.4;
		this.height = 91.3;
		this.x = 0;
		this.y = this.game.height - this.height - this.game.groundMargin;
		this.image = player; // JS creates references in global namespace to all elements with IDs
		this.frameX = 0;
		this.frameY = 0;
		this.maxFrame;
		this.fps = 20;
		this.frameInterval = 1000 / this.fps;
		this.frameTimer = 0;

		this.speed = 0;
		this.maxSpeed = 10;

		this.vy = 0;
		this.gravity = 1;
		this.states = [new Standing(this), new Jumping(this), new Falling(this), new Running(this), new Dazed(this), new Sitting(this), new Rolling(this), new Attack1(this), new Attack2(this), new Attack3(this)];
		this.currentState = this.states[0];
		this.currentState.enter();
	}
	update(input, deltaTime) {
		this.currentState.handleInput(input);

		// horizontal movement
		this.x += this.speed;
		if (input.includes('ArrowRight')) this.speed = this.maxSpeed;
		else if (input.includes('ArrowLeft')) this.speed = -this.maxSpeed;
		else this.speed = 0;
		if (this.x < 0) this.x = 0;
		if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;

		// vertical movement
		this.y += this.vy;
		if (!this.onGround()) this.vy += this.gravity;
		else this.vy = 0;

		// sprite animation
		if (this.frameTimer > this.frameInterval) {
			this.frameTimer = 0;
			if (this.frameX < this.maxFrame) this.frameX++;
			else this.frameX = 0;
		} else {
			this.frameTimer += deltaTime;
		}
	}
	draw(context) {
		if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
		context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
	}
	onGround() {
		return this.y >= this.game.height - this.height - this.game.groundMargin;
	}
	setState(state, speed) {
		this.currentState = this.states[state];
		this.game.speed = this.game.maxSpeed * speed;
		this.currentState.enter();
	}
}
