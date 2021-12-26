import { useEffect, useState } from "react";

import io from "socket.io-client";

import style from "./App.module.css";
import "./reset.css";

// Const variable Setting
const socket = io.connect("http://113.199.116.33/");
//const socket = io.connect("localhost:8081");

function App() {
  // State Setting
  const [mountPopup, setMountPopup] = useState(false);
  const [myIndex, setMyIndex] = useState(null);

  // Mount Function
  useEffect(() => {
    setMountPopup(true);
    setTimeout(() => {
      setMountPopup(false);
    }, 1000);
  }, []);

  // Socket Function
  useEffect(() => {
    socket.on("join", (memberCNT) => {
      if (memberCNT >= 2) {
        alert("이미 게임이 시작되었거나 방이 가득찼습니다.");
        document.location.href = "/";
      }
      console.log(`MyIndex : ${memberCNT}`);
      setMyIndex(memberCNT);
    });

    socket.on("exit", () => {
      document.location.reload();
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
          <button value={1} onClick={onBtnClickHandler}></button>
          <button value={2} onClick={onBtnClickHandler}></button>
          <button value={3} onClick={onBtnClickHandler}></button>
          <button value={4} onClick={onBtnClickHandler}></button>
          <button value={5} onClick={onBtnClickHandler}></button>
          <button value={6} onClick={onBtnClickHandler}></button>
          <button value={7} onClick={onBtnClickHandler}></button>
          <button value={8} onClick={onBtnClickHandler}></button>
          <button value={9} onClick={onBtnClickHandler}></button>
        </div>
      </div>

      {mountPopup && (
        <div className={style.popup}>
          <h1>You</h1>
          <h1>{myIndex ? "O" : "X"}</h1>
        </div>
      )}
    </div>
  );
}

export default App;
