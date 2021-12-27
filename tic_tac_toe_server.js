const http = require("http").createServer();
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    Credential: true,
  },
});
const port = 8081;

// Variable
let memberCNT = 0;
let gameInfo = [null, null, null, null, null, null, null, null, null];
let turn = 0;

// Function
function checkWin(index) {
  let isWin;

  for (let i = 0; i < 3; i++) {
    isWin = true;
    for (let j = 0; j < 3; j++) {
      if (gameInfo[i * 3 + j] !== index) {
        isWin = false;
      }
    }
    if (isWin) {
      return true;
    }
  }

  for (let i = 0; i < 3; i++) {
    isWin = true;
    for (let j = i; j < 9; j += 3) {
      if (gameInfo[j] !== index) {
        isWin = false;
      }
    }
    if (isWin) {
      return true;
    }
  }

  isWin = true;
  for (let i = 0; i < 9; i += 4) {
    if (gameInfo[i] !== index) {
      isWin = false;
    }
  }
  if (isWin) {
    return true;
  }

  isWin = true;
  for (let i = 2; i < 9; i += 2) {
    if (gameInfo[i] !== index) {
      isWin = false;
    }
  }
  if (isWin) {
    return true;
  }
}
function reset() {
  gameInfo = [null, null, null, null, null, null, null, null, null];
  turn = 0;
}

io.on("connection", (socket) => {
  socket.emit("join", memberCNT);
  reset();
  memberCNT += 1;
  console.log(
    `[ Socket ID : ${socket.id} ] is Join to server : member ${memberCNT}/2`
  );

  socket.on("select", ({ index, value }) => {
    if (turn === index) {
      if (gameInfo[value - 1] === null) {
        if (turn === 0) {
          turn = 1;
        } else {
          turn = 0;
        }
        gameInfo[value - 1] = index;
        io.emit("select", gameInfo);

        if (checkWin(index)) {
          reset();
          io.emit("gameWin", index);

          setTimeout(() => {
            io.emit("select", gameInfo);
            io.emit("gameWin", null);
          }, 3000);
        }

        if (gameInfo.filter((item) => item === null).length === 0) {
          reset();
          io.emit("gameWin", 2);

          setTimeout(() => {
            io.emit("select", gameInfo);
            io.emit("gameWin", null);
          }, 3000);
        }
      }
    }
  });

  socket.on("disconnect", () => {
    io.emit("exit");
    memberCNT -= 1;
    reset();
    console.log(
      `[ Socket ID : ${socket.id} ] is Exit to server : member ${memberCNT}/2`
    );
  });
});

// Server Listen
http.listen(port, () => {
  console.log(`Server is Running on ${port}`);
});
