// src/SudokuGrid.js

import React from 'react';
import './SudokuGrid.css';

const SudokuGrid = ({ grid, onChange, initialGrid, invalidCells }) => {
  const handleInputChange = (row, col, value) => {
    if (value === '' || /^[1-9]$/.test(value)) {
      const newGrid = grid.map((r, rowIndex) =>
        r.map((cell, colIndex) => {
          if (rowIndex === row && colIndex === col) {
            return value;
          }
          return cell;
        })
      );
      onChange(newGrid, row, col, value);
    }
  };

  const getCellClassName = (row, col) => {
    let className = '';
    if ((row + 1) % 3 === 0 && row !== 8) {
      className += ' bottom-border';
    }
    if ((col + 1) % 3 === 0 && col !== 8) {
      className += ' right-border';
    }
    if (invalidCells[row][col]) {
      className += ' invalid-cell';
    }
    return className.trim();
  };

  return (
    <div>
      <table>
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex} className={getCellClassName(rowIndex, colIndex)}>
                  <input
                    type="text"
                    value={cell}
                    maxLength="1"
                    onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                    style={{
                      width: '30px',
                      textAlign: 'center',
                      backgroundColor: initialGrid[rowIndex][colIndex] !== '' ? '#d3d3d3' : invalidCells[rowIndex][colIndex] ? 'red' : '#fff',
                    }}
                    disabled={initialGrid[rowIndex][colIndex] !== ''}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SudokuGrid;
