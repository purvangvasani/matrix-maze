// src/generator.js
// src/generator.js

const isValid = (grid, row, col, num) => {
    for (let x = 0; x < 9; x++) {
        if (grid[row][x] === num || grid[x][col] === num) {
            return false;
        }

        const startRow = 3 * Math.floor(row / 3);
        const startCol = 3 * Math.floor(col / 3);
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (grid[startRow + i][startCol + j] === num) {
                    return false;
                }
            }
        }
    }
    return true;
};

const fillGrid = (grid) => {
    for (let i = 0; i < 81; i++) {
        const row = Math.floor(i / 9);
        const col = i % 9;

        if (grid[row][col] === '') {
            const numbers = [...Array(9).keys()].map(x => x + 1).sort(() => Math.random() - 0.5);
            for (const num of numbers) {
                if (isValid(grid, row, col, num.toString())) {
                    grid[row][col] = num.toString();
                    if (fillGrid(grid)) {
                        return true;
                    }
                    grid[row][col] = '';
                }
            }
            return false;
        }
    }
    return true;
};

export const generateCompleteGrid = () => {
    const grid = Array(9).fill('').map(() => Array(9).fill(''));
    fillGrid(grid);
    return grid;
};

const removeCells = (grid, count) => {
    const newGrid = grid.map(row => [...row]);
    let attempts = count;

    while (attempts > 0) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        if (newGrid[row][col] !== '') {
            newGrid[row][col] = '';
            attempts--;
        }
    }

    return newGrid;
};

export const generateSudokuPuzzle = () => {
    const completeGrid = generateCompleteGrid();
    return removeCells(completeGrid, 55); // Remove 50 cells to create a puzzle
};
