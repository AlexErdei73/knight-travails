class ChessBoard {
	boardContainer: HTMLElement;
	constructor(boardContainer: HTMLElement) {
		this.boardContainer = boardContainer;
	}

	create(): void {
		for (let row = 0; row < 8; row++) {
			for (let col = 0; col < 8; col++) {
				if (row === 0) {
					const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
					const colLabelDiv = document.createElement("div");
					colLabelDiv.textContent = letters[col];
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
				this.boardContainer.appendChild(boardCell);
			}
		}
	}
}

export default new ChessBoard(document.querySelector(".chess-board")!);
