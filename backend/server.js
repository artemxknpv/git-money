import express from "express";
import mongoose from "mongoose";

import { modelUser } from "./models/user.js";

// I am using the body parser simply for the purpose of testing with POSTMAN
import bodyParser from "body-parser";

const app = express();

const port = 3001;

app.get("/", (req, res) => {
  res.send("Hello");
});

mongoose.connect(
  "mongodb+srv://vnikonov_63:faggot28A@cluster0.pnson.mongodb.net/finance?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// create a new user
app.put("/", async (req, res) => {
  await modelUser.createDefaultUser();
  res.end();
});

// create a new store or expenditure
app.put("/:id", bodyParser.json(), async (req, res) => {
  const id = req.params.id;
  const user = await modelUser.findById(id);
  const { type, name } = req.body;
  if (type === "expenditure") {
    await user.createNewExpenditure(name);
    return res.end();
  } else if (type === "store") {
    await user.createNewStore(name);
    return res.end();
  } else {
    return res.status(404);
  }
});

// delete a certain store based on the id
app.delete("/:id", bodyParser.json(), async (req, res) => {
  const { id } = req.body;
  const userId = req.params.id;
  const user = await modelUser.findById(userId);
  await user.deleteCategory(id);
  res.end();
});

// update the name of the category
app.patch("/:id", bodyParser.json(), async (req, res) => {
  const { id, name } = req.body;
  const userId = req.params.id;
  const user = await modelUser.findById(userId);
  await user.updateCategory(id, name);
  res.end();
});

// send the full info about the user
app.post("/:id", bodyParser.json(), async (req, res) => {
  const userId = req.params.id;
  const user = await modelUser.findById(userId);
  res.json(user);
});

// add money to store or transfer money from store to expenditure cat
app.put("/:id/:cat", bodyParser.json(), async (req, res) => {
  const { amount } = req.body;
  const userId = req.params.id;
  const putId = req.params.cat;
  const user = await modelUser.findById(userId);
  if (!!req.body.from) {
    const from = req.body.from;
    await user.spendMoney(putId, from, amount);
    return res.end();
  } else {
    await user.gainMoney(putId, amount);
    return res.end();
  }
});

app.listen(port, () => {
  console.log(`The server is app and listening on port ${port}`);
});
