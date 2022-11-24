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
app.post("/wilder/:wilderID/skills", wilderController.addSkill);
app.delete("/wilder/:wilderID/skills/:skillID", wilderController.deleteSkill);

//skills routes
app.post("/skill", skillController.createSkill);
app.delete("/skill/:id", skillController.deleteSkill);
app.put("/skill/:id", skillController.updateSkill);
app.get("/skill", skillController.readSkill);

const start = async () => {
  await dataSource.initialize();
  app.listen(3006, () => console.log("Server started on 3006"));  
};

start();