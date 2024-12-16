const express = require("express");
const app = express();
const PORT = 3001;

// load data file
const path = require("path");
const fs = require("fs");
const pathToFile = path.resolve("./data.json");
console.log(pathToFile);
// END load data file

const getResources = () => JSON.parse(fs.readFileSync(pathToFile));

// endpoints
app.get("/", (req, res) => {
  res.send("hello node js server");
});
app.get("/resources", (req, res) => {
  const resources = getResources();
  res.send(resources);
});
// END endpoints

app.listen(PORT, () => {
  console.log("server listening on port: " + PORT);
});
