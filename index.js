const express = require("express");
const app = express();
const PORT = 3001;

// endpoints
app.get("/", (req, res) => {
  res.send("hello node js server");
});
app.get("/resources", (req, res) => {
  res.send("resources  server");
});

app.listen(PORT, () => {
  console.log("server listening on port: " + PORT);
});
