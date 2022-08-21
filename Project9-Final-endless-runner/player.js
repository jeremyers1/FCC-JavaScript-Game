import { Standing, Jumping, Falling, Running, Dazed, Sitting, Rolling, Attack1, Attack2, Attack3, Diving } from './playerStates.js';
import { CollisionAnimation } from './collisionAnimation.js';
import { FloatingMessages } from './floatingMessages.js';

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
		this.states = [new Standing(this.game), new Jumping(this.game), new Falling(this.game), new Running(this.game), new Dazed(this.game), new Sitting(this.game), new Rolling(this.game), new Attack1(this.game), new Attack2(this.game), new Attack3(this.game), new Diving(this.game)];
		this.currentState = null;
	}
	update(input, deltaTime) {
		this.checkCollision();
		this.currentState.handleInput(input);

		// horizontal movement
		this.x += this.speed;
		if (input.includes('ArrowRight') && this.currentState !== this.states[4]) this.speed = this.maxSpeed;
		else if (input.includes('ArrowLeft') && this.currentState !== this.states[4]) this.speed = -this.maxSpeed;
		else this.speed = 0;

		// horizontal boundaries
		if (this.x < 0) this.x = 0;
		if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;

		// vertical movement
		this.y += this.vy;
		if (!this.onGround()) this.vy += this.gravity;
		else this.vy = 0;

		// vertical boundaries
		if (this.y > this.game.height - this.height - this.game.groundMargin) this.y = this.game.height - this.height - this.game.groundMargin;

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
	checkCollision() {
		this.game.enemies.forEach(enemy => {
			// prettier-ignore
			if (enemy.x < this.x + this.width &&
				enemy.x + enemy.width > this.x &&
				enemy.y < this.y + this.height &&
				enemy.y + enemy.height > this.y) {
				
				// collision detected
				enemy.markedForDeletion = true;
				this.game.collisions.push(new CollisionAnimation(this.game, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
				if (this.currentState === this.states[6] || this.currentState === this.states[10] ) {
					this.game.score++;
					this.game.floatingMessages.push(new FloatingMessages('+1', enemy.x, enemy.y, 130, 45));
				} else {
					this.setState(4, 0);
					this.game.score -= 5;
					this.game.floatingMessages.push(new FloatingMessages('-5', enemy.x, enemy.y, 130, 45));
					this.game.lives--;
					if (this.game.lives <= 0) this.game.gameOver = true;
				}

			}
		});
	}
}
