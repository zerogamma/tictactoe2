import React, { useState } from "react";
import ReactDOM from "react-dom";

const rowStyle = {
  display: "flex"
};

const squareStyle = {
  width: "60px",
  height: "60px",
  backgroundColor: "#ddd",
  margin: "4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "20px",
  color: "white"
};

const boardStyle = {
  backgroundColor: "#eee",
  width: "208px",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  border: "3px #eee solid"
};

const containerStyle = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column"
};

const instructionsStyle = {
  marginTop: "5px",
  marginBottom: "5px",
  fontWeight: "bold",
  fontSize: "16px"
};

const buttonStyle = {
  marginTop: "15px",
  marginBottom: "16px",
  width: "80px",
  height: "40px",
  backgroundColor: "#8acaca",
  color: "white",
  fontSize: "16px"
};

const Square = (props) => (
  <div className="square" style={squareStyle} onClick={props.onClick}>
    {props.value}
  </div>
);

const Board = () => {
  const initialState = {
    boxes: Array(9).fill(null),
    xIsNext: true
  };

  const [props, setProps] = useState(initialState);

  const handleBoxClick = (index) => {
    const boxes = props.boxes.slice();

    boxes[index] = props.xIsNext ? "x" : "o";

    const newState = {
      boxes: boxes,
      xIsNext: !props.xIsNext
    };
    setProps(newState);
  };

  const handleBoardRestart = () => {
    setProps(initialState);
  };

  const findWinner = (boxes) => {
    const rows = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < rows.length; i++) {
      const [a, b, c] = rows[i];

      if (boxes[a] && boxes[a] === boxes[b] && boxes[a] === boxes[c]) {
        return boxes[a];
      }
    }

    return null;
  };

  const areAllBoxesClicked = (boxes) => {
    let count = 0;

    boxes.forEach(function (item) {
      if (item !== null) {
        count++;
      }
    });

    if (count === 9) {
      return true;
    } else {
      return false;
    }
  };

  const winner = findWinner(props.boxes);
  return (
    <div style={containerStyle} className="gameBoard">
      <div className="status" style={instructionsStyle}>
        Next player: {props.xIsNext ? "x" : "o"}
      </div>
      <div className="winner" style={instructionsStyle}>
        Winner: {winner ? `${winner}` : "None"}
      </div>
      <button style={buttonStyle} onClick={handleBoardRestart}>
        Reset
      </button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          <Square value={props.boxes[0]} onClick={() => handleBoxClick(0)} />
          <Square value={props.boxes[1]} onClick={() => handleBoxClick(1)} />
          <Square value={props.boxes[2]} onClick={() => handleBoxClick(2)} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square value={props.boxes[3]} onClick={() => handleBoxClick(3)} />
          <Square value={props.boxes[4]} onClick={() => handleBoxClick(4)} />
          <Square value={props.boxes[5]} onClick={() => handleBoxClick(5)} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square value={props.boxes[6]} onClick={() => handleBoxClick(6)} />
          <Square value={props.boxes[7]} onClick={() => handleBoxClick(7)} />
          <Square value={props.boxes[8]} onClick={() => handleBoxClick(8)} />
        </div>
      </div>
    </div>
  );
};

const Game = () => {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
};

ReactDOM.render(<Game />, document.getElementById("root"));
