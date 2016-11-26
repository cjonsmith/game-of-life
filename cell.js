function Cell(x, y) {
	this.x = x;
	this.y = y;
	this.alive = false;

	this.show = function() {
		fill(129, 103, 255);
		rect(this.x, this.y, cellSize, cellSize);
	}
}
