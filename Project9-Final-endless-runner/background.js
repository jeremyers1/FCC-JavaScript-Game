class Layer {
	constructor(game, width, height, speedModifier, image) {
		this.game = game;
		this.width = width;
		this.height = height;
		this.speedModifier = speedModifier;
		this.image = image;
		this.x = 0;
		this.y = 0;
	}
	update() {
		if (this.x < -this.width) this.x = 0;
		else this.x -= this.game.speed * this.speedModifier;
	}
	draw(context) {
		context.drawImage(this.image, this.x, this.y, this.width, this.height);
		context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
	}
}

export class Background {
	constructor(game) {
		this.game = game;
		this.width = 1667;
		this.height = 500;
		/*  this.layer1image = layer1;
    this.layer2image = layer2;
    this.layer3image = layer3;
    this.layer4image = layer4;
    this.layer5image = layer5; */
		this.city1 = new Layer(this.game, this.width, this.height, 0, city1);
		this.city2 = new Layer(this.game, this.width, this.height, 0.2, city2);
		this.city3 = new Layer(this.game, this.width, this.height, 0.4, city3);
		this.city4 = new Layer(this.game, this.width, this.height, 0.8, city4);
		this.city5 = new Layer(this.game, this.width, this.height, 1, city5);
		this.backgroundLayers = [this.city1, this.city2, this.city3, this.city4, this.city5];
	}
	update() {
		this.backgroundLayers.forEach(layer => {
			layer.update();
		});
	}
	draw(context) {
		this.backgroundLayers.forEach(layer => {
			layer.draw(context);
		});
	}
}
