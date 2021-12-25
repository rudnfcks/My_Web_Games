import { useEffect, useState } from "react";

import io from "socket.io-client";

import style from "./App.module.css";
import "./reset.css";

// Const variable Setting
//const socket = io.connect("http://zzanhi.iptime.org");
const socket = io.connect("localhost:8081");

function App() {
  // State Setting
  const [mountPopup, setMountPopup] = useState(false);

  // Mount Function
  useEffect(() => {
    setMountPopup(true);
    setTimeout(() => {
      setMountPopup(false);
    }, 1000);
  }, []);

  function onBtnClickHandler(event) {
    console.log(event.currentTarget.value);
    socket.emit("test");
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
    </div>
  );
}

export default App;
