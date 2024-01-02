import { useState } from "react";
import "./App.css";

export default function App() {
  const initialState = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const [matrix, setMatrix] = useState(initialState);

  const [char, setChar] = useState("x");
  const [winner, setWinner] = useState("");
  const [restartBtn, setRestartBtn] = useState(true);
  const [count, setCount] = useState(1);

  const checkWinner = () => {
    // check all rows
    if (
      matrix[0][0] &&
      matrix[0][0] == matrix[0][1] &&
      matrix[0][1] == matrix[0][2]
    ) {
      setWinner(matrix[0][0] + " is winner");
      return "";
    }
    if (
      matrix[1][0] &&
      matrix[1][0] == matrix[1][1] &&
      matrix[1][1] == matrix[1][2]
    ) {
      setWinner(matrix[1][0] + " is winner");
      return "";
    }
    if (
      matrix[2][0] &&
      matrix[2][0] == matrix[2][1] &&
      matrix[2][1] == matrix[2][2]
    ) {
      setWinner(matrix[2][0] + " is winner");
      return "";
    }

    // check all column
    if (
      matrix[0][0] &&
      matrix[0][0] == matrix[1][0] &&
      matrix[1][0] == matrix[2][0]
    ) {
      setWinner(matrix[0][0] + " is winner");
      return "";
    }
    if (
      matrix[0][1] &&
      matrix[0][1] == matrix[1][1] &&
      matrix[1][1] == matrix[2][1]
    ) {
      setWinner(matrix[0][1] + " is winner");
      return "";
    }
    if (
      matrix[0][2] &&
      matrix[0][2] == matrix[1][2] &&
      matrix[1][2] == matrix[2][2]
    ) {
      setWinner(matrix[0][2] + " is winner");
      return "";
    }

    //check cross diagonals also
    if (
      matrix[0][0] &&
      matrix[0][0] == matrix[1][1] &&
      matrix[1][1] == matrix[2][2]
    ) {
      setWinner(matrix[0][0] + " is winner");
      return "";
    }
    if (
      matrix[0][2] &&
      matrix[0][2] == matrix[1][1] &&
      matrix[1][1] == matrix[2][0]
    ) {
      setWinner(matrix[0][2] + " is winner");
      return "";
    }

    //check the match has been draw
    if (count === 9) {
      setWinner("The match has been drawn!");
      return;
    }
  };

  const clickhanlder = (r: number, c: number) => {
    setRestartBtn(false);
    if (matrix[r][c]) return;
    let copyMatrix = [...matrix];
    copyMatrix[r][c] = char;
    setChar(char === "x" ? "o" : "x");
    setCount((count) => count + 1);
    checkWinner();
  };

  const getBGclass = (val: string) => {
    if (val === "x") return "yellow";
    else if (val === "o") return "orange";
  };

  return (
    <div className="App">
      <h1>TIC TOC TOE GAME </h1>
      {!winner && <h1>{char} turn</h1>}
      <div className="center">
        <div className="board">
          {winner ||
            matrix.map((row, rIndex) => (
              <div className="row" key={rIndex}>
                {row.map((_, cIndex) => (
                  <div
                    key={cIndex}
                    className={`cell center ${getBGclass(
                      matrix[rIndex][cIndex]
                    )}`}
                    onClick={() => clickhanlder(rIndex, cIndex)}
                  >
                    {matrix[rIndex][cIndex]}
                    {/* check for index for all cell */}
                    {/* {[rIndex] + [cIndex]} */}
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>
      <button
        className="restart"
        onClick={() => [
          setMatrix(initialState),
          setWinner(""),
          setChar("x"),
          setCount(1),
          setRestartBtn(true),
        ]}
        disabled={restartBtn}
      >
        Restart
      </button>
    </div>
  );
}
