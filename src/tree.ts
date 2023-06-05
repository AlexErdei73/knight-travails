export class Position {
  value: [x: number, y: number];
  constructor(x: number, y: number) {
    this.value = [x, y];
  }

  isValid() {
    const [x, y] = this.value;
    if (x >= 0 && x <= 7 && y >= 0 && y <= 7) return true;
    else return false;
  }

  isEqual(position: Position) {
    if (
      this.value[0] === position.value[0] &&
      this.value[1] === position.value[1]
    )
      return true;
    else return false;
  }

  inc(increment: [x: number, y: number]): Position {
    const [x, y] = this.value;
    const [incX, incY] = increment;
    return new Position(x + incX, y + incY);
  }
}

export interface TreeNode {
  parent: TreeNode | null;
  position: Position;
  children: TreeNode[];
}

export class Tree {
  root: TreeNode;
  constructor(start: Position) {
    this.root = {
      parent: null,
      position: start,
      children: [],
    };
  }

  private _find(pos: Position, node: TreeNode): TreeNode | null {
    if (node.position.isEqual(pos)) return node;
    if (node.children.length === 0) return null;
    else {
      let result = null;
      let i = 0;
      while (!result && i < node.children.length) {
        result = result || this._find(pos, node.children[i]);
      }
      return result;
    }
  }

  find(pos: Position) {
    return this._find(pos, this.root);
  }

  private _buildTree(node: TreeNode) {
    const POS_INCREMENTS: [x: number, y: number][] = [
      [1, 2],
      [2, 1],
      [-1, 2],
      [-2, 1],
      [1, -2],
      [2, -1],
      [-1, -2],
      [-2, -1],
    ];

    const newPositions = POS_INCREMENTS.map((inc) =>
      node.position.inc(inc)
    ).filter((pos) => pos.isValid);
    const childrenPositions = newPositions.filter((pos) => !this.find(pos));
    node.children = childrenPositions.map((pos) =>
      this._buildTree({
        parent: node,
        position: pos,
        children: [],
      })
    );
    return node;
  }

  buildTree() {
    return this._buildTree(this.root);
  }
}
