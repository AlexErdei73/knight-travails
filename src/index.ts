import chessBoard from "./chessBoard";
import knight from "./knight";

const POSITIONS: [x: number, y: number][] = [
  [5, 5],
  [6, 3],
  [7, 1],
  [5, 2],
  [3, 3],
];

chessBoard.create();
knight.positions = POSITIONS;
knight.animate();

const formContainer = document.querySelector(".form-container")!;
const buttonSwap = document.querySelector("#btn-swap")!;

function handleSwapFormWithChessBoard() {
  // The main point is toggling the visible element
  // the rest is just the animation
  const ANIMATION_DURATION = 500;
  const DELAY = 20;
  if (buttonSwap.textContent === "Form") {
    buttonSwap.textContent = "Chess";
    chessBoard.boardContainer.classList.add("spin-out");
  } else {
    buttonSwap.textContent = "Form";
    formContainer.classList.add("spin-out");
  }
  setTimeout(() => {
    formContainer.classList.toggle("invisible");
    chessBoard.boardContainer.classList.toggle("invisible");
  }, ANIMATION_DURATION);
  setTimeout(() => {
    if (formContainer.classList.contains("invisible")) {
      chessBoard.boardContainer.classList.remove("spin-out");
    } else {
      formContainer.classList.remove("spin-out");
    }
  }, ANIMATION_DURATION + DELAY); //The previous step takes a few ms, hence the delay
}

buttonSwap.addEventListener("click", handleSwapFormWithChessBoard);
