const express = require("express");
const path = require("path");
const app = express();
const http = require("http").createServer(app);
const port = 8090;

app.use(express.json());
const cors = require("cors");
app.use(cors());

// Server Listen
http.listen(port, () => {
  console.log(`Server is Running on ${port}`);
});

// Static Setting
app.use("/", express.static(path.join(__dirname, "public")));
app.use(
  "/tic_tac_toe/",
  express.static(path.join(__dirname, "web_tic_tac_toe/build"))
);

// Main Page
app.get("/", function (request, response) {
  response.sendFile(path.join(__dirname, "/public/index.html"));
});

// Tic Tac Toe Game
app.get("/tic_tac_toe/", function (request, response) {
  response.sendFile(path.join(__dirname, "/web_tic_tac_toe/build/index.html"));
});
app.get("/tic_tac_toe/*", function (request, response) {
  response.redirect("/tic_tac_toe");
});
