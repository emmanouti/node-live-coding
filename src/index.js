const express = require("express");
const dataSource = require("./utils").dataSource;
const wilderController = require("./controller/wilder");
const skillController = require("./controller/skills");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

//wilder routes
app.post("/wilder", wilderController.createWilder);
app.get("/wilder", wilderController.getAllWilder);
app.get("/wilder/:id", wilderController.getOneWilder);
app.get("/wilders", wilderController.readWilder);
app.put("/wilder/:id", wilderController.updateWilder);
app.delete("/wilder/:id", wilderController.deleteWilder);

//skills routes
app.post("/skill", skillController.createSkill);

const start = async () => {
  await dataSource.initialize();
  app.listen(3000, () => console.log("Server started on 3000"));  
};

start();