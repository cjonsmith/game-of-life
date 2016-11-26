var cellSize = 15;

function setup() {
	createCanvas(600, 600);
	frameRate(5);

	play = false;
	cells = [];
	for (i=0; i<width / cellSize; i++) {
		cells.push([]);
		for (j=0; j<height / cellSize; j++) {
			cells[i].push(new Cell(i*cellSize, j*cellSize));
		}
	}
}

function draw() {
	background(51);

	if (play) {
		update();
	}

	// Draw all of the cells currently selected in the grid.
	for (i=0; i<cells.length; i++) {
		for(j=0; j<cells[i].length; j++) {
			if (cells[i][j].alive) {
				cells[i][j].show();
			}
		}
	}
}

/* update(cells)
 * Creates a temporary copy of the next iteration of cells. Overwrites the current iteration of cells once completed to
 * be updated at the next frame.
 */
function update() {
	var nextIter = [];
	for (i=0; i<cells.length; i++) {
		nextIter.push([]);
		for (j=0; j<cells[i].length; j++) {
			var numNeighbors = 0;
			var cell = new Cell(i*cellSize, j*cellSize);

			if (i>0 && cells[i-1][j].alive) {
				numNeighbors++;
			}
			if (i<cells.length-1 && cells[i+1][j].alive) {
				numNeighbors++;
			}
			if (j>0 && cells[i][j-1].alive) {
				numNeighbors++;
			}
			if (j<cells[i].length-1 && cells[i][j+1].alive) {
				numNeighbors++;
			}
			if (i>0 && j>0 && cells[i-1][j-1].alive) {
				numNeighbors++;
			}
			if (i>0 && j<cells[i].length-1 && cells[i-1][j+1].alive) {
				numNeighbors++;
			}
			if (i<cells.length-1 && j>0 && cells[i+1][j-1].alive) {
				numNeighbors++;
			}
			if (i<cells.length-1 && j<cells[i].length-1 && cells[i+1][j+1].alive) {
				numNeighbors++;
			}

			if (numNeighbors < 2 && cells[i][j].alive) {
				cell.alive = false;
			} else if (numNeighbors >= 2 && numNeighbors <= 3 && cells[i][j].alive) {
				cell.alive = true;
			} else if (numNeighbors > 3 && cells[i][j].alive) {
				cell.alive = false;
			} else if (numNeighbors === 3 && !cells[i][j].alive) {
				cell.alive = true;
			}
			nextIter[i].push(cell)
		}
	}

	cells = nextIter;
}

function mouseReleased() {
	// Floor the current x and y position to get the grid point of the new cell.
	var xCoord = Math.floor(mouseX / cellSize) * cellSize;
	var yCoord = Math.floor(mouseY / cellSize) * cellSize;

	for (i=0; i<cells.length; i++) {
		for (j=0; j<cells[i].length; j++) {
			if (cells[i][j].x === xCoord && cells[i][j].y === yCoord) {
				cells[i][j].alive = !cells[i][j].alive;
			}
		}
	}
}

function keyPressed() {
	if (keyCode === 32) {
		play = !play;
	}
}
