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
};

class State {
	constructor(state) {
		this.state = state;
	}
}

// STANDING: 0
export class Standing extends State {
	constructor(player) {
		super('SITTING');
		this.player = player;
	}
  enter() {
    this.player.frameX = 0;
		this.player.maxFrame = 6;
		this.player.frameY = 0;
	}
	handleInput(input) {
		if (input.includes('ArrowLeft') || input.includes('ArrowRight')) {
			this.player.setState(states.RUNNING);
		}
	}
}

// JUMPING: 1
export class Jumping extends State {
	constructor(player) {
		super('JUMPING');
		this.player = player;
	}
	enter() {
    if (this.player.onGround()) this.player.vy -= 28;
    this.player.frameX = 0;
		this.player.maxFrame = 4;
		this.player.frameY = 1;
	}
	handleInput(input) {
		if (this.player.vy > this.player.gravity) {
			this.player.setState(states.FALLING);
		}
	}
}

// FALLING: 2
export class Falling extends State {
	constructor(player) {
		super('FALLING');
		this.player = player;
	}
  enter() {
    this.player.frameX = 0;
		this.player.maxFrame = 4;
		this.player.frameY = 2;
	}
	handleInput(input) {
		if (this.player.onGround()) {
			this.player.setState(states.RUNNING);
		}
	}
}

// RUNNING: 3
export class Running extends State {
	constructor(player) {
		super('RUNNING');
		this.player = player;
	}
  enter() {
    this.player.frameX = 0;
		this.player.maxFrame = 8;
		this.player.frameY = 3;
	}
	handleInput(input) {
		if (input.includes('ArrowDown')) {
			this.player.setState(states.SITTING);
		} else if (input.includes('ArrowUp')) {
			this.player.setState(states.JUMPING);
		}
	}
}

// DAZED: 4
export class Dazed extends State {
	constructor(player) {
		super('DAZED');
		this.player = player;
	}
  enter() {
    this.player.frameX = 0;
		this.player.maxFrame = 10;
		this.player.frameY = 4;
	}
	handleInput(input) {
		if (input.includes('ArrowLeft') || input.includes('ArrowRight')) {
			this.player.setState(states.RUNNING);
		}
	}
}

// Sitting: 5
export class Sitting extends State {
	constructor(player) {
		super('SITTING');
		this.player = player;
	}
  enter() {
    this.player.frameX = 0;
		this.player.maxFrame = 4;
		this.player.frameY = 5;
	}
	handleInput(input) {
		if (input.includes('ArrowLeft') || input.includes('ArrowRight')) {
			this.player.setState(states.RUNNING);
		}
	}
}

// ROLLING: 6
export class Rolling extends State {
	constructor(player) {
		super('ROLLING');
		this.player = player;
	}
  enter() {
    this.player.frameX = 0;
		this.player.maxFrame = 6;
		this.player.frameY = 6;
	}
	handleInput(input) {
		if (input.includes('ArrowLeft') || input.includes('ArrowRight')) {
			this.player.setState(states.RUNNING);
		}
	}
}

// ATTACK1: 7
export class Attack1 extends State {
	constructor(player) {
		super('ATTACK1');
		this.player = player;
	}
  enter() {
    this.player.frameX = 0;
		this.player.maxFrame = 6;
		this.player.frameY = 7;
	}
	handleInput(input) {
		if (input.includes('ArrowLeft') || input.includes('ArrowRight')) {
			this.player.setState(states.RUNNING);
		}
	}
}

// ATTACK2: 8
export class Attack2 extends State {
	constructor(player) {
		super('ATTACK2');
		this.player = player;
	}
  enter() {
    this.player.frameX = 0;
		this.player.maxFrame = 11;
		this.player.frameY = 8;
	}
	handleInput(input) {
		if (input.includes('ArrowLeft') || input.includes('ArrowRight')) {
			this.player.setState(states.RUNNING);
		}
	}
}

// ATTACK3: 9
export class Attack3 extends State {
	constructor(player) {
		super('ATTACK3');
		this.player = player;
	}
  enter() {
    this.player.frameX = 0;
		this.player.maxFrame = 3;
		this.player.frameY = 9;
	}
	handleInput(input) {
		if (input.includes('ArrowLeft') || input.includes('ArrowRight')) {
			this.player.setState(states.RUNNING);
		}
	}
}
