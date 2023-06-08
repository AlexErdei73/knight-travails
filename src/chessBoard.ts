class ChessBoard {
	boardContainer: HTMLElement;
	private _positions: [x: number, y: number][] = [];
	LETTERS = ["a", "b", "c", "d", "e", "f", "g", "h"];
	constructor(boardContainer: HTMLElement) {
		this.boardContainer = boardContainer;
	}

	create(): void {
		for (let row = 0; row < 8; row++) {
			for (let col = 0; col < 8; col++) {
				if (row === 0) {
					const colLabelDiv = document.createElement("div");
					colLabelDiv.textContent = this.LETTERS[col];
					colLabelDiv.classList.add("col-label");
					colLabelDiv.setAttribute(
						"style",
						`left: calc(${col * 12.5 + 6.25}% - .25rem`
					);
					this.boardContainer.appendChild(colLabelDiv);
				}
				if (col === 0) {
					const rowLabelDiv = document.createElement("div");
					rowLabelDiv.textContent = (row + 1).toString();
					rowLabelDiv.classList.add("row-label");
					rowLabelDiv.setAttribute(
						"style",
						`top: calc(${(7 - row) * 12.5 + 6.25}% - .5rem`
					);
					this.boardContainer.appendChild(rowLabelDiv);
				}
				const boardCell = document.createElement("div");
				boardCell.classList.add("board-cell");
				let color;
				if (col % 2 === 0) color = "bright";
				else color = "dark";
				if (row % 2 === 1)
					if (color === "bright") color = "dark";
					else color = "bright";
				boardCell.classList.add(color);
				const id = `${this.LETTERS[7 - row]}${col + 1}`;
				boardCell.id = id;
				this.boardContainer.appendChild(boardCell);
			}
		}
	}

	private getAllGameCells() {
		return document.querySelectorAll(".board-cell");
	}

	private filterElementsOfPath() {
		const ids = this._positions.map(
			(pos) => `${this.LETTERS[pos[1]]}${pos[0] + 1}`
		);
		return Array.from(this.getAllGameCells()).filter(
			(cell) => ids.indexOf(cell.id) !== -1
		);
	}

	private selectElementsOfPath() {
		this.filterElementsOfPath().forEach((element) =>
			element.classList.add("selected")
		);
	}

	private removeAllSelections() {
		this.getAllGameCells().forEach((cell) => cell.classList.remove("selected"));
	}

	set positions(positions: [x: number, y: number][]) {
		this._positions = positions;
		this.removeAllSelections();
		this.selectElementsOfPath();
	}
}

export default new ChessBoard(document.querySelector(".chess-board")!);
