function drawGrid() {
	grid.replaceChildren();

	updateStyle();

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
	if (!color) {
		e.target.classList.add("a");
	} else {
		randomColor = Math.floor(Math.random()*16777215).toString(16);
		e.target.style.backgroundColor = "#" + randomColor;
	}
}

function changeGridResolution() {
	do {
		gridResolution = prompt("How many squares per side? Up to 100.", 16);
	} while (gridResolution > 100);

	drawGrid();
}

function updateStyle() {
	let size = (960 / gridResolution) + "px";
	flexible = flexibleInput.checked;

	style.innerHTML = flexible ?
		".s {flex: 1;} .r {flex: 1;} .grid {width: auto; height: auto;} " +
		"body {overflow: hidden;}" :
		`.s {width: ${size}; height: ${size};}`;
}

let gridResolution = 16;
let flexible = false;
let color = false;

const clearButton = document.getElementById("clear");
const changeResButton = document.getElementById("changeRes");
const flexibleInput = document.getElementById("flexible");
const colorInput = document.getElementById("color");
const grid = document.getElementsByClassName("grid")[0];
const style = document.createElement("style");

clearButton.addEventListener('click', () => { drawGrid(); });
changeResButton.addEventListener('click', () => { changeGridResolution(); });
flexibleInput.addEventListener('click', () => { updateStyle(); });
colorInput.addEventListener('click', () => { color = colorInput.checked; });

style.type = "text/css";
document.getElementsByTagName("head")[0].appendChild(style);

drawGrid();