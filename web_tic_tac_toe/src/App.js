import { useEffect, useState } from "react";

import io from "socket.io-client";

import style from "./App.module.css";
import "./reset.css";

// Const variable Setting
const socket = io.connect("http://113.199.116.33:81/");
//const socket = io.connect("localhost:8081");

function App() {
  // State Setting
  const [mountPopup, setMountPopup] = useState(false);
  const [gameWinPopup, setGameWinPopup] = useState(null);
  const [myIndex, setMyIndex] = useState(null);
  const [gameStart, setGameStart] = useState(false);
  const [gameInfo, setGameInfo] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  // Mount Function
  useEffect(() => {
    setMountPopup(true);
    setTimeout(() => {
      setMountPopup(false);
    }, 1400);
  }, []);

  // Socket Function
  useEffect(() => {
    // Socket Join Event
    socket.on("join", (memberCNT) => {
      if (memberCNT >= 2) {
        alert("이미 게임이 시작되었거나 방이 가득찼습니다.");
        document.location.href = "/";
      }
      console.log(`MyIndex : ${memberCNT}`);
      setMyIndex(memberCNT);
    });

    // Socket Exit Event
    socket.on("exit", () => {
      document.location.reload();
    });

    // Socket GameWin Event
    socket.on("gameWin", (value) => {
      setGameWinPopup(value);
    });

    // Socket Select Event
    socket.on("select", (value) => {
      setGameInfo(value);
    });

    // Socket GameStart Event
    socket.on("gameStart", () => {
      setGameStart(true);
    });
  }, []);

  function onBtnClickHandler(event) {
    socket.emit("select", { index: myIndex, value: event.currentTarget.value });
  }

  return (
    <div className="App">
      <h1 className={style.title}>Tic Tac Toe</h1>
      <div className={style.mainGrid}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>

        <div className={style.buttons}>
          {gameInfo.map((item, key) => (
            <button
              className={item === 0 ? style.x : style.o}
              value={key + 1}
              onClick={onBtnClickHandler}
            >
              {item === null ? "" : item === 0 ? "X" : "O"}
            </button>
          ))}
        </div>
        {gameStart && <h1 className={style.gameStart}>Game Start</h1>}
      </div>

      {mountPopup && (
        <div className={style.popup}>
          <h1>You</h1>
          <h1>{myIndex ? "O" : "X"}</h1>
        </div>
      )}

      {gameWinPopup !== null && (
        <div className={style.popup}>
          <h2
            className={
              gameWinPopup === 2 ? style.draw : gameWinPopup ? style.o : style.x
            }
          >
            {gameWinPopup === 2 ? "O X" : gameWinPopup ? "O" : "X"}
          </h2>
          <h2
            className={
              gameWinPopup === 2 ? style.draw : gameWinPopup ? style.o : style.x
            }
          >
            {gameWinPopup === 2 ? "Draw" : "Win"}
          </h2>
        </div>
      )}
    </div>
  );
}

export default App;
