function setup() {
	createCanvas(600, 600);

	cells = [];
	for (i=0; i<width; i+=10) {
		for (j=0; j<height; j+=10) {
			cells.push(new Cell(i, j));
		}
	}
}

function draw() {
	background(51);

	// Draw all of the cells currently selected in the grid.
	for (i=0; i<cells.length; i++) {
			if (cells[i].alive) {
				cells[i].show();
			}
	}
}

function mouseReleased() {
	// Floor the current x and y position to get the grid point of the new cell.
	var xCoord = Math.floor(mouseX / 10) * 10;
	var yCoord = Math.floor(mouseY / 10) * 10;

	for (i=0; i<cells.length; i++) {
		if (cells[i].x === xCoord && cells[i].y === yCoord) {
			cells[i].alive = !cells[i].alive;
		}
	}
}
