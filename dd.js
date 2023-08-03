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
	let blank = (e.target.style.backgroundColor == "");

	if (blank && progressive && !color) {
		e.target.style.backgroundColor = "#e7e7e7";
	} else if (blank && progressive && color) {
		let r = Math.floor(Math.random() * 256).toString(16);
		let g = Math.floor(Math.random() * 256).toString(16);
		let b = Math.floor(Math.random() * 256).toString(16);

		r = r.length == 2 ? r : `0${r}`;
		g = g.length == 2 ? g : `0${g}`;
		b = b.length == 2 ? b : `0${b}`;

		let newColor = `#${r}${g}${b}`;
		e.target.style.backgroundColor = newColor;
	} else if (!progressive && !color) {
		e.target.style.backgroundColor = "#000000";
	} else if (!progressive && color) {
		randomColor = Math.floor(Math.random() * 16777215).toString(16);
		e.target.style.backgroundColor = "#" + randomColor;
	} else if (!blank && progressive) {
		let currentColorHex = rgba2hex(e.target.style.backgroundColor).slice(1, 7);

		let currentRHex = currentColorHex.slice(0, 2);
		let currentGHex = currentColorHex.slice(2, 4);
		let currentBHex = currentColorHex.slice(4, 6);

		let currentR = parseInt(currentRHex, 16);
		let currentG = parseInt(currentGHex, 16);
		let currentB = parseInt(currentBHex, 16);

		let newR = Math.floor(currentR / (10 ** (1 / (10 + (color * 10)))));
		let newG = Math.floor(currentG / (10 ** (1 / (10 + (color * 10)))));
		let newB = Math.floor(currentB / (10 ** (1 / (10 + (color * 10)))));

		let newRHex = newR.toString(16);
		let newGHex = newG.toString(16);
		let newBHex = newB.toString(16);

		newRHex = newRHex.length == 2 ? newRHex : `0${newRHex}`;
		newGHex = newGHex.length == 2 ? newGHex : `0${newGHex}`;
		newBHex = newBHex.length == 2 ? newRHex : `0${newBHex}`;

		let newColor = `#${newRHex}${newGHex}${newBHex}`;

		e.target.style.backgroundColor = newColor;
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

const rgba2hex = (rgba) => `#${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`;	// Source: https://stackoverflow.com/a/3627747

let gridResolution = 16;
let flexible = false;
let color = false;
let progressive = false;

const clearButton = document.getElementById("clear");
const changeResButton = document.getElementById("changeRes");
const flexibleInput = document.getElementById("flexible");
const colorInput = document.getElementById("color");
const progressiveInput = document.getElementById("progressive");
const grid = document.getElementsByClassName("grid")[0];
const style = document.createElement("style");

clearButton.addEventListener('click', () => { drawGrid(); });
changeResButton.addEventListener('click', () => { changeGridResolution(); });
flexibleInput.addEventListener('click', () => { updateStyle(); });
colorInput.addEventListener('click', () => { color = colorInput.checked; });
progressiveInput.addEventListener('click', () => {
	progressive =
		progressiveInput.checked;
});

style.type = "text/css";
document.getElementsByTagName("head")[0].appendChild(style);

drawGrid();