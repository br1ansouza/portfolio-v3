const BAYER_4X4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

export function bayerOrder(columns: number, rows: number): number[] {
  const cells: { index: number; rank: number }[] = [];

  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < columns; x += 1) {
      const tile = BAYER_4X4[y % 4][x % 4];
      const jitter = ((x * 7 + y * 13) % 5) / 5;
      cells.push({ index: y * columns + x, rank: tile + jitter });
    }
  }

  cells.sort((a, b) => a.rank - b.rank);

  const order = new Array<number>(columns * rows);
  cells.forEach((cell, position) => {
    order[cell.index] = position;
  });

  return order;
}
