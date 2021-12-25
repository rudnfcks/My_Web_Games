const http = require("http").createServer();
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    Credential: true,
  },
});
const port = 8081;

let memberCNT = 0;

io.on("connection", (socket) => {
  memberCNT += 1;
  console.log(
    `[ Socket ID : ${socket.id} ] is Join to server : member ${memberCNT}/2`
  );

  socket.on("disconnect", () => {
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
