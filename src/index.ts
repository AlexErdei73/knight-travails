import chessBoard from "./chessBoard";
import knight from "./knight";
import { Tree, Position } from "./tree";

chessBoard.create();
knight.positions = [[0, 0]];
knight.animate();

const formContainer = document.querySelector(".form-container")!;
const buttonSwap = document.querySelector("#btn-swap")!;
const shortestPathPElement = document.querySelector("#shortest-path")!;

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

const form = document.querySelector("form")!;

function handleSubmit(event: Event) {
  const characters = ["a", "b", "c", "d", "e", "f", "g", "h"];
  event.preventDefault();
  knight.stopAnimation();
  const formElements = form.elements;
  const elementNames = ["start-x", "start-y", "end-x", "end-y"];
  const results = elementNames.map(
    (name: string) =>
      +(formElements.namedItem(name)! as HTMLSelectElement).value
  );
  const start = new Position(results[0], results[1]);
  const tree = new Tree(start);
  const end = new Position(results[2], results[3]);
  tree.buildTree();
  const shortestPath = tree.findShortestPathTo(end);
  knight.positions = shortestPath;
  knight.animate();
  shortestPathPElement.innerHTML = "Shortest Path: <br>";
  shortestPath.forEach((pos, index) => {
    shortestPathPElement.innerHTML += `${index}. ${characters[pos[0]]}${
      pos[1] + 1
    } <br>`;
  });
}

form.addEventListener("submit", handleSubmit);
