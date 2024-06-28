// src/solver.js

export const solveSudoku = (grid) => {
  const findEmptyCell = (grid) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === '') {
          return [row, col];
        }
      }
    }
    return null;
  };

  const isValid = (grid, row, col, num) => {
    for (let i = 0; i < 9; i++) {
      if (grid[row][i] === num || grid[i][col] === num) {
        return false;
      }
      const boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
      const boxCol = 3 * Math.floor(col / 3) + (i % 3);
      if (grid[boxRow][boxCol] === num) {
        return false;
      }
    }
    return true;
  };

  const solver = (grid) => {
    const cell = findEmptyCell(grid);
    if (!cell) {
      return true;
    }

    const [row, col] = cell;
    for (let num = 1; num <= 9; num++) {
      if (isValid(grid, row, col, num.toString())) {
        grid[row][col] = num.toString();
        if (solver(grid)) {
          return true;
        }
        grid[row][col] = '';
      }
    }
    return false;
  };

  const newGrid = grid.map(row => [...row]);
  solver(newGrid);
  return newGrid;
};
