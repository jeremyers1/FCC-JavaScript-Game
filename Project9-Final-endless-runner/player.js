export class Player {
	constructor(game) {
		this.game = game;
		this.width = 100;
		this.height = 91.3;
		this.x = 0;
		this.y = this.game.height - this.height;
		this.image = player; // JS creates references in global namespace to all elements with IDs
	}
  update() {
    this.x++;
  }
	draw(context) {
		context.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
	}
}
