// src/App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import SudokuGrid from './SudokuGrid';
import { generateSudokuPuzzle } from './generator';
import { solveSudoku } from './solver';

const App = () => {
  const [grid, setGrid] = useState(generateSudokuPuzzle());
  const [initialGrid, setInitialGrid] = useState(generateSudokuPuzzle());
  const [invalidCells, setInvalidCells] = useState(Array(9).fill().map(() => Array(9).fill(false)));
  const [error, setError] = useState('');

  useEffect(() => {
    const newPuzzle = generateSudokuPuzzle();
    setGrid(newPuzzle);
    setInitialGrid(newPuzzle);
    setInvalidCells(Array(9).fill().map(() => Array(9).fill(false)));
  }, []);

  const validateCell = (grid, row, col, value) => {
    for (let i = 0; i < 9; i++) {
      if (i !== col && grid[row][i] === value) {
        return false;
      }
      if (i !== row && grid[i][col] === value) {
        return false;
      }
    }
    const startRow = 3 * Math.floor(row / 3);
    const startCol = 3 * Math.floor(col / 3);
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if ((i !== row || j !== col) && grid[i][j] === value) {
          return false;
        }
      }
    }
    return true;
  };

  const handleChange = (newGrid, row, col, value) => {
    const isValid = value === '' || validateCell(newGrid, row, col, value);
    // if (!isValid) {
    //   alert('Invalid number!');
    // }
    const newInvalidCells = invalidCells.map((r, rowIndex) =>
      r.map((cell, colIndex) => (rowIndex === row && colIndex === col ? !isValid : cell))
    );
    setGrid(newGrid);
    setInvalidCells(newInvalidCells);
  };

  const handleSolve = () => {
    setError('');
    const solvedGrid = solveSudoku(grid);
    setGrid(solvedGrid);
  };

  const handleGenerateNew = () => {
    const newPuzzle = generateSudokuPuzzle();
    setGrid(newPuzzle);
    setInitialGrid(newPuzzle);
    setInvalidCells(Array(9).fill().map(() => Array(9).fill(false)));
    setError('');
  };

  return (
    <>
      <div className="App">
        <h1>Sudoku Solver</h1>
        <SudokuGrid grid={grid} onChange={handleChange} initialGrid={initialGrid} invalidCells={invalidCells} />
        {error && <p className="error">{error}</p>}
        {/* <button onClick={handleSolve}>Solve</button> */}
        <button onClick={handleGenerateNew}>Generate New Puzzle</button>
      </div>
    </>
  );
};

export default App;
