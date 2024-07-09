import React from 'react';
import '../css/MatrixInput.css';

const MatrixInput = ({ matrix, setMatrix }) => {
  const handleChange = (rowIndex, colIndex, event) => {
    const newMatrix = matrix.map((row, rIdx) =>
      row.map((col, cIdx) => (rIdx === rowIndex && cIdx === colIndex ? event.target.value : col))
    );
    setMatrix(newMatrix);
  };

  return (
    <div className="matrix-container">
      {matrix.map((row, rowIndex) => (
        <div key={rowIndex} className="matrix-row">
          {row.map((col, colIndex) => (
            <input
              key={colIndex}
              type="text"
              value={col}
              onChange={(e) => handleChange(rowIndex, colIndex, e)}
              className="matrix-input"
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default MatrixInput;
