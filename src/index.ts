import chessBoard from "./chessBoard";
import knight from "./knight";
import { Tree, Position } from "./tree";

class Main {
	private formContainer = document.querySelector(".form-container")!;
	private buttonSwap = document.querySelector("#btn-swap")!;
	private shortestPathPElement = document.querySelector("#shortest-path")!;
	private form = document.querySelector("form")!;
	constructor() {
		this.handleSwapFormWithChessBoard =
			this.handleSwapFormWithChessBoard.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.sizeFormContainer = this.sizeFormContainer.bind(this);
	}

	private handleSwapFormWithChessBoard() {
		// The main point is toggling the visible element
		// the rest is just the animation
		const ANIMATION_DURATION = 500;
		const DELAY = 20;
		if (this.buttonSwap.textContent === "Form") {
			this.buttonSwap.textContent = "Chess";
			chessBoard.boardContainer.classList.add("spin-out");
		} else {
			this.buttonSwap.textContent = "Form";
			this.formContainer.classList.add("spin-out");
		}
		setTimeout(() => {
			this.formContainer.classList.toggle("invisible");
			chessBoard.boardContainer.classList.toggle("invisible");
		}, ANIMATION_DURATION);
		setTimeout(() => {
			if (this.formContainer.classList.contains("invisible")) {
				chessBoard.boardContainer.classList.remove("spin-out");
			} else {
				this.formContainer.classList.remove("spin-out");
			}
		}, ANIMATION_DURATION + DELAY); //The previous step takes a few ms, hence the delay
	}

	private getFormData() {
		const formElements = this.form.elements;
		const elementNames = ["start-x", "start-y", "end-x", "end-y"];
		const results = elementNames.map(
			(name: string) =>
				+(formElements.namedItem(name)! as HTMLSelectElement).value
		);
		const start = new Position(results[0], results[1]);
		const end = new Position(results[2], results[3]);
		return { start, end };
	}

	private calcShortestPath(formData: {
		start: Position;
		end: Position;
	}): [x: number, y: number][] {
		const tree = new Tree(formData.start);
		tree.buildTree();
		return tree.findShortestPathTo(formData.end);
	}

	private output(shortestPath: [x: number, y: number][]) {
		const characters = ["a", "b", "c", "d", "e", "f", "g", "h"];
		this.shortestPathPElement.innerHTML = "Shortest Path: <br>";
		shortestPath.forEach((pos, index) => {
			this.shortestPathPElement.innerHTML += `${index}. ${characters[pos[0]]}${
				pos[1] + 1
			} <br>`;
		});
	}

	private handleSubmit(event: Event) {
		event.preventDefault();
		knight.stopAnimation();
		const formData = this.getFormData();
		const shortestPath = this.calcShortestPath(formData);
		this.output(shortestPath);
		knight.positions = shortestPath;
		knight.animate();
	}

	private sizeFormContainer() {
		let height = window.innerHeight - 160;
		if (height > 500) height = 500;
		if (height < 150) height = 150;
		this.formContainer.setAttribute(
			"style",
			`height: ${height}px; width: ${height}px`
		);
	}

	run() {
		chessBoard.create();
		this.buttonSwap.addEventListener(
			"click",
			this.handleSwapFormWithChessBoard
		);
		this.form.addEventListener("submit", this.handleSubmit);
		window.addEventListener("resize", this.sizeFormContainer);
		this.sizeFormContainer();
	}
}

const main = new Main();
main.run();
