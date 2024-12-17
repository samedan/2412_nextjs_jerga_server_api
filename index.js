const express = require("express");
const app = express();
const PORT = 3001;
// const cors = require("cors");

// var corsOptions = {
//   origin: "http://localhost:3000",
//   optionsSuccessStatus: 200,
// };

// load data file
const path = require("path");
const fs = require("fs");
const pathToFile = path.resolve("./data.json");
console.log(pathToFile);
// END load data file

// app.use(cors(corsOptions));
const getResources = () => JSON.parse(fs.readFileSync(pathToFile));

// get JSON
app.use(express.json());

// endpoints
app.get("/", (req, res) => {
  res.send("hello node js server");
});
app.get("/api/resources", (req, res) => {
  const resources = getResources();
  res.send(resources);
});
app.post("/api/resources", (req, res) => {
  const resources = getResources();
  console.log("data received on server");
  console.log(req.body);
  res.send("data received on server");
});
// END endpoints

app.listen(PORT, () => {
  console.log("server listening on port: " + PORT);
});
