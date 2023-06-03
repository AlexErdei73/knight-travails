const boardContainer = document.querySelector(".chess-board")!;
const knight = document.querySelector(".knight")!;

const positions = [
  [5, 5],
  [6, 3],
  [7, 1],
];

function createChessBoard() {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const boardCell = document.createElement("div");
      boardCell.classList.add("board-cell");
      let color;
      if (col % 2 === 0) color = "bright";
      else color = "dark";
      if (row % 2 === 1)
        if (color === "bright") color = "dark";
        else color = "bright";
      boardCell.classList.add(color);
      boardContainer.appendChild(boardCell);
    }
  }
}

function putKnightTo(x: number, y: number) {
  let style = `top: ${87.5 - 12.5 * y}%; left: ${12.5 * x}%`;
  knight.setAttribute("style", style);
  knight.setAttribute("data-x", x.toString());
  knight.setAttribute("data-y", y.toString());
}

function moveKnightTo(x: number, y: number) {
  const oldX = +knight.getAttribute("data-x")!;
  const oldY = +knight.getAttribute("data-y")!;
  setTimeout(() => putKnightTo(x, oldY), 0);
  setTimeout(() => putKnightTo(x, y), 1000);
}

createChessBoard();
putKnightTo(5, 5);
knight.classList.add("animate");
let i = 0;
setInterval(() => {
  if (i === positions.length) {
    i = 0;
    knight.classList.remove("animate");
  }
  if (i === 1) knight.classList.add("animate");
  const [x, y] = positions[i];
  if (i === 0) putKnightTo(x, y);
  else moveKnightTo(x, y);
  i++;
}, 3000);
