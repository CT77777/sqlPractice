const express = require("express");
const { getResults, getResult, createNote } = require("./database");

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded());

app.get("/notes", async (req, res, next) => {
  getResults().then((result) => {
    res.send(result);
  });
});

app.get("/notes/:id", async (req, res) => {
  const id = req.params.id;
  getResult(id).then((result) => {
    res.send(result);
  });
});

app.post("/notes", async (req, res) => {
  const { text, contents } = req.body;
  createNote(text, contents).then((result) => {
    res.send(result);
  });
});

// test router
app.get("/aaa", (req, res) => {
  res.render("testError.html");
});

// invalid URL error
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  //   console.error(err.stack);
  //   res.status(err.status);
  res.send({ status: err.status, message: err.message, stack: err.stack });
});

app.listen(3000, () => {
  console.log("Running localhost:3000");
});
