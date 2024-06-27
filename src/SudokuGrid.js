// src/SudokuGrid.js

import React from 'react';
import './SudokuGrid.css';

const SudokuGrid = ({ grid, onChange }) => {
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
      onChange(newGrid);
    }
  };

  return (
    <div>
      <table>
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="text"
                    value={cell}
                    maxLength="1"
                    onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                    style={{ width: '30px', textAlign: 'center' }}
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
