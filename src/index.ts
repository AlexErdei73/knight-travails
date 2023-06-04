import chessBoard from "./chessBoard";

const knight = document.querySelector(".knight")!;
const ANIM_STEP_DURATION = 500;

const positions = [
  [5, 5],
  [6, 3],
  [7, 1],
  [5, 2],
  [3, 3],
];

function putKnightTo(x: number, y: number) {
  let style = `top: ${87.5 - 12.5 * y}%; left: ${12.5 * x}%`;
  knight.setAttribute("style", style);
  knight.setAttribute("data-y", y.toString());
}

function moveKnightTo(x: number, y: number) {
  const oldY = +knight.getAttribute("data-y")!;
  setTimeout(() => putKnightTo(x, oldY), 0);
  setTimeout(() => putKnightTo(x, y), ANIM_STEP_DURATION);
}

function animateKnight() {
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
  }, 3 * ANIM_STEP_DURATION);
}

chessBoard.create();
animateKnight();
