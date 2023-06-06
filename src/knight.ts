class Knight {
  private knight: HTMLElement;
  private _positions: [x: number, y: number][] = [];
  private ANIM_STEP_DURATION = 500;
  private animationID: NodeJS.Timer | undefined;
  constructor(knight: HTMLElement) {
    this.knight = knight;
  }

  private putTo(position: [x: number, y: number]) {
    const [x, y] = position;
    let style = `top: ${87.5 - 12.5 * y}%; left: ${12.5 * x}%`;
    this.knight.setAttribute("style", style);
    this.knight.setAttribute("data-pos", JSON.stringify(position));
  }

  private moveTo(position: [x: number, y: number]) {
    const x = position[0];
    const oldY = JSON.parse(this.knight.getAttribute("data-pos")!)[1];
    setTimeout(() => this.putTo([x, oldY]), 0);
    setTimeout(() => this.putTo(position), this.ANIM_STEP_DURATION);
  }

  animate() {
    let i = 0;
    this.animationID = setInterval(() => {
      if (i === this._positions.length) {
        i = 0;
        this.knight.classList.remove("animate");
      }
      if (i === 1) this.knight.classList.add("animate");
      const nextPosition = this._positions[i];
      if (i === 0) this.putTo(nextPosition);
      else this.moveTo(nextPosition);
      i++;
    }, 3 * this.ANIM_STEP_DURATION);
  }

  stopAnimation() {
    if (this.animationID) clearInterval(this.animationID);
  }

  set positions(positions: [x: number, y: number][]) {
    this._positions = positions;
  }
}

export default new Knight(document.querySelector(".knight")!);
