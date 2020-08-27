import React, { useState, useEffect } from 'react';
import SpeedRadioButton from '../components/RadioButtonSpeed';
import Cell from '../components/Cell';

const Chessboard = ({ rowsNumber }) => {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [solvingColumns, setSolvingColumns] = useState([]);
  const [speed, setSpeed] = useState('fast');

  useEffect(() => {
    document.title = '8 Queens Puzzle';
  }, []);

  const hasConflict = columns => {
    const indexLast = columns.length - 1;

    for (let indexCompare = columns.length - 2; indexCompare >= 0; indexCompare--) {
      // se já existe uma rainha na mesma linha reta que a coluna comparada, há conflito.
      if (columns[indexCompare] === columns[indexLast]) return true;
      // se existe uma rainha na mesma diferença entre o elemento e as posições, a rainha está na diagonal, portanto há conflito.
      if (columns[indexLast] - indexLast === columns[indexCompare] - indexCompare) return true;
      // se existe uma rainha na mesma soma entre o elemento e as posições, a rainha está na diagonal, portanto há conflito.
      if (columns[indexLast] + indexLast === columns[indexCompare] + indexCompare) return true;
    }
    return false;
  };

  const calcNextColumn = (total, columns, index = 0) => {
    let column = index;
    while (columns.includes(column) && column < total) {
      column++;
    }
    return column;
  };

  const placeNextQueen = async (total, queens, columns = []) => {
    if (queens === 0) return columns;

    let index = calcNextColumn(total, columns);

    while (index < total) {
      columns.push(index);
      await handleUpdateBoard(columns);

      if (!hasConflict(columns) && (await placeNextQueen(total, queens - 1, columns)) != null) {
        return columns;
      }

      index = calcNextColumn(total, columns, index);
      columns.pop(index);
    }

    return null;
  };

  const handleStart = async () => {
    setCount(0);
    setLoading(true);
    setSolvingColumns(await placeNextQueen(rowsNumber, rowsNumber));
    setLoading(false);
  };

  const handleStop = async () => {
    window.location.reload(false);
  };

  const handleUpdateBoard = async columns => {
    setSolvingColumns(columns);
    await tick(speed);
  };

  const renderBoard = columns => {
    const matrixBoard = Array(rowsNumber)
      .fill(undefined)
      .map(() => Array(rowsNumber).fill(''));

    columns.forEach((column, x) => {
      matrixBoard[x][column] = 'Q';
    });

    const renderBoard = matrixBoard.map((row, y) => (
      <div key={y} className="row">
        {row.map((cell, x) => (
          <Cell key={x} x={x} y={y}>
            {cell === 'Q' ? <img className="crown" src="/queen-crown.png" alt="👑" /> : null}
          </Cell>
        ))}
      </div>
    ));

    return renderBoard;
  };

  const tick = async speed => {
    setCount(count => count + 1);
    let sleep;
    switch (speed) {
      case 'slow':
        sleep = 1000;
        break;
      case 'superfast':
        sleep = 1;
        break;
      case 'fast':
      default:
        sleep = 100;
        break;
    }
    await new Promise(r => setTimeout(r, sleep));
  };

  return (
    <div className="chessboard">
      <h1 className="title">8 Queens Puzzle</h1>
      <div className="grid">{renderBoard(solvingColumns)}</div>
      <label className="text-margin" style={{ marginBottom: 0 }}>
        Queens: [{solvingColumns.map(x => x + 1).toString()}]
      </label>
      <label className="text-margin" style={{ marginTop: 0 }}>
        Count: {count}
      </label>
      <div className="card-control">
        <SpeedRadioButton speed={speed} onChange={setSpeed} disabled={loading} />
        <div className="btn-wrapper">
          <button className="btn-action" onClick={handleStart} disabled={loading}>
            Start
          </button>
          <button className="btn-action" onClick={handleStop} disabled={!loading}>
            Stop
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chessboard;
