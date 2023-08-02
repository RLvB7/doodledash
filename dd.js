let gridResolution = 16;

let size = (960 / gridResolution) + "px";

const grid = document.getElementsByClassName("grid")[0];
const style = document.createElement("style");

style.type = "text/css";
style.innerHTML = `.s {width: ${size}; height: ${size};}`;

document.getElementsByTagName("head")[0].appendChild(style);

for (let r = 0; r < gridResolution; r++) {
	let newRow = document.createElement("div");
	newRow.classList.add("r");
	grid.appendChild(newRow);

	for (let c = 0; c < gridResolution; c++) {
		let newSquare = document.createElement("div");
		newSquare.classList.add("s");
		newSquare.addEventListener('mouseover', (e) => {onHover(e);});
		newRow.appendChild(newSquare);

	}
}

function onHover(e) {
	e.target.classList.add("a");
}