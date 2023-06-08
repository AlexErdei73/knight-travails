class ChessBoard {
	boardContainer: HTMLElement;
	constructor(boardContainer: HTMLElement) {
		this.boardContainer = boardContainer;
	}

	create(): void {
		for (let row = 0; row < 8; row++) {
			for (let col = 0; col < 8; col++) {
				if (row === 0) {
					const colLabelDiv = document.createElement("div");
					colLabelDiv.textContent = col.toString();
					colLabelDiv.classList.add("col-label");
					colLabelDiv.setAttribute(
						"style",
						`left: calc(${col * 12.5 + 6.25}% - .25rem`
					);
					this.boardContainer.appendChild(colLabelDiv);
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
