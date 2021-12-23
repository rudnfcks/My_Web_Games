const express = require("express");
const app = express();
const http = require("http").createServer(app);
const port = 5000;

http.listen(port, () => {
  console.log(`Server is Running on ${port}`);
});
