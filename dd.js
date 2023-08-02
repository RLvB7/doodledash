function drawGrid() {
	grid.replaceChildren();

	let size = (960 / gridResolution) + "px";
	style.innerHTML = `.s {width: ${size}; height: ${size};}`;

	for (let r = 0; r < gridResolution; r++) {
		let newRow = document.createElement("div");
		newRow.classList.add("r");
		grid.appendChild(newRow);

		for (let c = 0; c < gridResolution; c++) {
			let newSquare = document.createElement("div");
			newSquare.classList.add("s");
			newSquare.addEventListener('mouseover', (e) => { onHover(e); });
			newRow.appendChild(newSquare);

		}
	}
}

function onHover(e) {
	e.target.classList.add("a");
}

function changeGridResolution() {
	do {
		gridResolution = prompt("How many squares per side? Up to 100.", 16);
	} while (gridResolution > 100);

	drawGrid();
}

let gridResolution = 16;

const button = document.getElementsByTagName("button")[0];
const grid = document.getElementsByClassName("grid")[0];
const style = document.createElement("style");

button.addEventListener('click', () => { changeGridResolution(); });

style.type = "text/css";
document.getElementsByTagName("head")[0].appendChild(style);

drawGrid();