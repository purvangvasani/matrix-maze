// src/App.js

import React, { useState } from 'react';
import './App.css';
import SudokuGrid from './SudokuGrid';
import { solveSudoku } from './solver';

const isValidSudokuInput = (grid) => {
  const rows = Array(9).fill().map(() => new Set());
  const cols = Array(9).fill().map(() => new Set());
  const boxes = Array(9).fill().map(() => new Set());

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const value = grid[r][c];
      if (value !== '') {
        if (rows[r].has(value) || cols[c].has(value) || boxes[Math.floor(r / 3) * 3 + Math.floor(c / 3)].has(value)) {
          return false;
        }
        rows[r].add(value);
        cols[c].add(value);
        boxes[Math.floor(r / 3) * 3 + Math.floor(c / 3)].add(value);
      }
    }
  }
  return true;
};

const App = () => {
  const initialGrid = Array(9).fill('').map(() => Array(9).fill(''));
  const [grid, setGrid] = useState(initialGrid);
  const [error, setError] = useState('');

  const handleSolve = () => {
    setError('');
    const filledCells = grid.flat().filter(cell => cell !== '').length;

    if (filledCells < 17) {
      setError('Please fill at least 17 cells.');
      return;
    }

    if (!isValidSudokuInput(grid)) {
      setError('Invalid Sudoku input.');
      return;
    }

    const solvedGrid = solveSudoku(grid);
    setGrid(solvedGrid);
  };

  const handleReset = () => {
    setGrid(initialGrid);
    setError('');
  };

  return (
    <div className="App">
      <h1 style={{color: 'teal'}}><b>Sudoku Solver</b></h1>
      <SudokuGrid grid={grid} onChange={setGrid} />
      {error && <p className="error">{error}</p>}
      <button style={{border: '0.1rem solid', backgroundColor: 'green', color: 'white', borderColor: 'black' }} onClick={handleSolve}><b>Solve</b></button>
      <button style={{border: '0.1rem solid', backgroundColor: 'red', color: 'white', borderColor: 'black' }} onClick={handleReset}><b>Reset</b></button>
    </div>
  );
};

export default App;
