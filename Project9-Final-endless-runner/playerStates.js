import { Dust, Fire, Splash } from './particles.js';

const states = {
	STANDING: 0,
	JUMPING: 1,
	FALLING: 2,
	RUNNING: 3,
	DAZED: 4,
	SITTING: 5,
	ROLLING: 6,
	ATTACK1: 7,
	ATTACK2: 8,
	ATTACK3: 9,
	DIVING: 10,
};

class State {
	constructor(state, game) {
		this.state = state;
		this.game = game;
	}
}

// STANDING: 0
export class Standing extends State {
	constructor(game) {
		super('STANDING', game);
	}
	enter() {
		this.game.player.frameX = 0;
		this.game.player.maxFrame = 6;
		this.game.player.frameY = 0;
	}
	handleInput(input) {
		if (input.includes('ArrowLeft') || input.includes('ArrowRight')) {
			this.game.player.setState(states.RUNNING, 1);
		} else if (input.includes(' ')) {
			this.game.player.setState(states.ROLLING, 2);
		}
	}
}

// JUMPING: 1
export class Jumping extends State {
	constructor(game) {
		super('JUMPING', game);
	}
	enter() {
		if (this.game.player.onGround()) this.game.player.vy -= 25;
		this.game.player.frameX = 0;
		this.game.player.maxFrame = 4;
		this.game.player.frameY = 1;
	}
	handleInput(input) {
		if (this.game.player.vy > this.game.player.gravity) {
			this.game.player.setState(states.FALLING, 1);
		} else if (input.includes(' ')) {
			this.game.player.setState(states.ROLLING, 2);
		} else if (input.includes('ArrowDown')) {
			this.game.player.setState(states.DIVING, 0);
		}
	}
}

// FALLING: 2
export class Falling extends State {
	constructor(game) {
		super('FALLING', game);
	}
	enter() {
		this.game.player.frameX = 0;
		this.game.player.maxFrame = 4;
		this.game.player.frameY = 2;
	}
	handleInput(input) {
		if (this.game.player.onGround()) {
			this.game.player.setState(states.RUNNING, 1);
		} else if (input.includes('ArrowDown')) {
			this.game.player.setState(states.DIVING, 0);
		}
	}
}

// RUNNING: 3
export class Running extends State {
	constructor(game) {
		super('RUNNING', game);
	}
	enter() {
		this.game.player.frameX = 0;
		this.game.player.maxFrame = 8;
		this.game.player.frameY = 3;
	}
	handleInput(input) {
		this.game.particles.unshift(new Dust(this.game, this.game.player.x + this.game.player.width * 0.4, this.game.player.y + this.game.player.height));
		if (input.includes('ArrowDown')) {
			this.game.player.setState(states.SITTING, 0);
		} else if (input.includes('ArrowUp')) {
			this.game.player.setState(states.JUMPING, 1);
		} else if (input.includes(' ')) {
			this.game.player.setState(states.ROLLING, 2);
		}
	}
}

// DAZED: 4
export class Dazed extends State {
	constructor(game) {
		super('DAZED', game);
	}
	enter() {
		this.game.player.frameX = 0;
		this.game.player.maxFrame = 10;
		this.game.player.frameY = 4;
	}
	handleInput(input) {
		if (input.includes('ArrowLeft') || input.includes('ArrowRight')) {
			this.game.player.setState(states.RUNNING, 1);
		}
	}
}

// SITTING: 5
export class Sitting extends State {
	constructor(game) {
		super('SITTING', game);
	}
	enter() {
		this.game.player.frameX = 0;
		this.game.player.maxFrame = 4;
		this.game.player.frameY = 5;
	}
	handleInput(input) {
		if (input.includes('ArrowLeft') || input.includes('ArrowRight')) {
			this.game.player.setState(states.RUNNING, 1);
		} else if (input.includes('ArrowUp')) {
			this.game.player.setState(states.JUMPING, 1);
		} else if (input.includes(' ')) {
			this.game.player.setState(states.ROLLING, 2);
		}
	}
}

// ROLLING: 6
export class Rolling extends State {
	constructor(game) {
		super('ROLLING', game);
	}
	enter() {
		this.game.player.frameX = 0;
		this.game.player.maxFrame = 6;
		this.game.player.frameY = 6;
	}
	handleInput(input) {
		this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5));
		if (!input.includes(' ') && this.game.player.onGround()) {
			this.game.player.setState(states.RUNNING, 1);
		} else if (!input.includes(' ') && !this.game.player.onGround()) {
			this.game.player.setState(states.FALLING, 1);
		} else if (input.includes(' ') && input.includes('ArrowUp') && this.game.player.onGround()) {
			this.game.player.vy -= 27; //rather than jumping state due to transition
		} else if (input.includes('ArrowDown')) {
			this.game.player.setState(states.DIVING, 0);
		}
	}
}

// ATTACK1: 7
export class Attack1 extends State {
	constructor(game) {
		super('ATTACK1', game);
	}
	enter() {
		this.game.player.frameX = 0;
		this.game.player.maxFrame = 6;
		this.game.player.frameY = 7;
	}
	handleInput(input) {
		if (input.includes('ArrowLeft') || input.includes('ArrowRight')) {
			this.game.player.setState(states.RUNNING, 1);
		}
	}
}

// ATTACK2: 8
export class Attack2 extends State {
	constructor(game) {
		super('ATTACK2', game);
	}
	enter() {
		this.game.player.frameX = 0;
		this.game.player.maxFrame = 11;
		this.game.player.frameY = 8;
	}
	handleInput(input) {
		if (input.includes('ArrowLeft') || input.includes('ArrowRight')) {
			this.game.player.setState(states.RUNNING, 1);
		}
	}
}

// ATTACK3: 9
export class Attack3 extends State {
	constructor(game) {
		super('ATTACK3', game);
	}
	enter() {
		this.game.player.frameX = 0;
		this.game.player.maxFrame = 3;
		this.game.player.frameY = 9;
	}
	handleInput(input) {
		if (input.includes('ArrowLeft') || input.includes('ArrowRight')) {
			this.game.player.setState(states.RUNNING, 1);
		}
	}
}

// DIVING: 10
export class Diving extends State {
	constructor(game) {
		super('DIVING', game);
	}
	enter() {
		this.game.player.frameX = 0;
		this.game.player.maxFrame = 6;
		this.game.player.frameY = 6; // same sprite as rolling
		this.game.player.vy = 15;
	}
	handleInput(input) {
		this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5));
		if (this.game.player.onGround()) {
			this.game.player.setState(states.RUNNING, 1);
			for (let i = 0; i < 30; i++) {
				this.game.particles.unshift(new Splash(this.game, this.game.player.x, this.game.player.y));
			}
		} else if (input.includes(' ') && this.game.player.onGround()) {
			this.game.player.setState(states.ROLLING, 2);
		}
	}
}
