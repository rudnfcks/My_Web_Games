const http = require("http").createServer();
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    Credential: true,
  },
});
const port = 8081;

let memberCNT = 0;
let gameInfo = [1, 2, 3, 4, 5, 6, 7, 8, 9];

io.on("connection", (socket) => {
  socket.emit("join", memberCNT);
  memberCNT += 1;
  console.log(
    `[ Socket ID : ${socket.id} ] is Join to server : member ${memberCNT}/2`
  );

  socket.on("select", ({ index, value }) => {
    console.log(gameInfo[value - 1]);
  });

  socket.on("disconnect", () => {
    io.emit("exit");
    memberCNT -= 1;
    console.log(
      `[ Socket ID : ${socket.id} ] is Exit to server : member ${memberCNT}/2`
    );
  });
});

// Server Listen
http.listen(port, () => {
  console.log(`Server is Running on ${port}`);
});
