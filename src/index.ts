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
