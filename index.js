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
app.get("/api/resources/:id", (req, res) => {
  const resources = getResources();
  const resourceId = req.params.id;
  const resource = resources.find((item) => item.id === resourceId);
  res.send(resource);
});
app.patch("/api/resources/:id", (req, res) => {
  const resources = getResources();
  const { id } = req.params;
  const index = resources.findIndex((item) => item.id === id);

  // only one ActiveResource
  const activeResource = resources.find(
    (resource) => resource.status === "active"
  );
  resources[index] = req.body;
  if (activeResource) {
    console.log("activeResoucre found");
    console.log(activeResource);
  }
  if (req.body.status === "active") {
    if (activeResource) {
      return res.status(422).send("Already active resource");
    }
    resources[index].status = "active";
    resources[index].activationTime = new Date();
  }
  // END only one ActiveResource

  fs.writeFile(pathToFile, JSON.stringify(resources, null, 2), (error) => {
    if (error) {
      return res.status(422).send("Cannot store data in file");
    } else {
      return res.send("Data updated");
    }
  });
});

app.post("/api/resources", (req, res) => {
  const resources = getResources();
  const resource = req.body;
  resource.createdAt = new Date();
  resource.status = "inactive";
  resource.id = Date.now().toString();
  // resources.push(resource);
  resources.unshift(resource);

  fs.writeFile(pathToFile, JSON.stringify(resources, null, 2), (error) => {
    if (error) {
      return res.status(422).send("Cannot store data in file");
    } else {
      return res.send("Data saved");
    }
  });
});
// END endpoints

app.listen(PORT, () => {
  console.log("server listening on port: " + PORT);
});
