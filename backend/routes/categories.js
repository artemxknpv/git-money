import express from "express";
import { modelUser } from "../models/user.js";

// I am using the body parser simply for the purpose of testing with POSTMAN
import bodyParser from "body-parser";

const route = express.Router();

// create a new store or expenditure
route.put("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await modelUser.findById(id);
  const { type, name, iconId } = req.body;
  if (type === "expenditure") {
    const userUpdate = await user.createNewExpenditure(name, iconId);
    const addition = userUpdate.categories[userUpdate.categories.length - 1];
    return res.json(addition);
  } else if (type === "store") {
    const userUpdate = await user.createNewStore(name, iconId);
    const addition = userUpdate.categories[userUpdate.categories.length - 1];
    return res.json(addition);
  } else {
    return res.status(404);
  }
});

// delete a certain store based on the id
route.delete("/:id", async (req, res) => {
  const { id } = req.body;
  const userId = req.params.id;
  const user = await modelUser.findById(userId);
  await user.deleteCategory(id);
  res.end();
});

// update the name of the category
route.patch("/:id", bodyParser.json(), async (req, res) => {
  const { id, name } = req.body;
  const userId = req.params.id;
  const user = await modelUser.findById(userId);
  await user.updateCategory(id, name);
  res.end();
});

// send the full info about the user
route.get("/:id", async (req, res) => {
  const userId = req.params.id;
  let userUpd;
  try {
    let user = await modelUser.findById(userId);
    userUpd = {
      firstName: user.firstName,
      lastName: user.lastName,
      mail: user.mail,
      login: user.login,
      totalMoney: user.totalMoney,
      categories: user.categories,
      transactions: user.transactions,
    };
    res.json(userUpd);
  } catch (err) {
    console.log("ошибка баз данных", err);
  }
});

// add money to store or transfer money from store to expenditure cat
route.put("/:id/:cat", async (req, res) => {
  const { amount } = req.body;
  const userId = req.params.id;
  const putId = req.params.cat;
  const user = await modelUser.findById(userId);
  if (!!req.body.from) {
    const from = req.body.from;
    await user.spendMoney(putId, from, amount);
    const lastTransaction = user.transactions[user.transactions.length - 1];
    return res.json(lastTransaction);
  } else {
    await user.gainMoney(putId, amount);
    const lastTransaction = user.transactions[user.transactions.length - 1];
    return res.json(lastTransaction);
  }
});

// delete the transaction, and add money to the proper parts of the programm
route.delete("/:id/:cat", async (req, res) => {
  const userId = req.params.id;
  const idTransaction = req.params.cat;
  const user = await modelUser.findById(userId);
  const transactionArray = await user.findTheTransaction(idTransaction);
  const transaction = transactionArray[0];
  const typeTransaction = transaction.value;
  if (typeTransaction === "loss") {
    await user.deleteTheTransaction(transaction.id);
    await user.addMoneyStore(transaction.from, transaction.amount);
    await user.subtractMoneyExpenditure(transaction.to, transaction.amount);
    res.end();
  } else if (typeTransaction === "gain") {
    await user.deleteTheTransaction(transaction.id);
    await user.subtractMoneyExpenditure(transaction.to, transaction.amount);
    res.end();
  } else {
    res.status(401).end();
  }
});

export default route;
