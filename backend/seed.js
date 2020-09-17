import { modelUser } from "./models/user.js";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const db = mongoose.connect(
  "mongodb+srv://vnikonov_63:faggot28A@cluster0.pnson.mongodb.net/finance?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const user1 = {
  totalMoney: 0,
  categories: [
    {
      value: "store",
      name: "bank",
      currentNumber: 1000,
      id: uuidv4(),
    },
    {
      value: "store",
      name: "cash",
      currentNumber: 5000,
      id: uuidv4(),
    },
    {
      value: "store",
      name: "deadend",
      currentNumber: 10000,
      id: uuidv4(),
    },
    {
      value: "expenditure",
      name: "food",
      currentNumber: 1000,
      id: uuidv4(),
    },
    {
      value: "expenditure",
      name: "rent",
      currentNumber: 2000,
      id: uuidv4(),
    },
    {
      value: "expenditure",
      name: "gas",
      currentNumber: 300,
      id: uuidv4(),
    },
    {
      value: "expenditure",
      name: "online subscription",
      currentNumber: 200,
      id: uuidv4(),
    },
    {
      value: "expenditure",
      name: "free time",
      currentNumber: 700,
      id: uuidv4(),
    },
  ],
  transactions: [
    {
      value: "gain",
      to: "some id od the store category",
      amount: 300,
      id: uuidv4(),
    },
    {
      value: "loss",
      from: "some id of the store category",
      to: "some id of the expenditure category",
      amount: 700,
      id: uuidv4(),
    },
  ],
};

const user2 = {
  totalMoney: 100,
  categories: [
    {
      value: "store",
      name: "bank",
      currentNumber: 1000,
      id: uuidv4(),
    },
    {
      value: "store",
      name: "cash",
      currentNumber: 5000,
      id: uuidv4(),
    },
    {
      value: "store",
      name: "deadend",
      currentNumber: 10000,
      id: uuidv4(),
    },
    {
      value: "expenditure",
      name: "food",
      currentNumber: 1000,
      id: uuidv4(),
    },
    {
      value: "expenditure",
      name: "rent",
      currentNumber: 2000,
      id: uuidv4(),
    },
    {
      value: "expenditure",
      name: "gas",
      currentNumber: 300,
      id: uuidv4(),
    },
    {
      value: "expenditure",
      name: "online subscription",
      currentNumber: 200,
      id: uuidv4(),
    },
    {
      value: "expenditure",
      name: "free time",
      currentNumber: 700,
      id: uuidv4(),
    },
  ],
  transactions: [
    {
      value: "gain",
      to: "some id od the store category",
      amount: 600,
      id: uuidv4(),
      time: Date.now(),
    },
    {
      value: "loss",
      from: "some id of the store category",
      to: "some id of the expenditure category",
      amount: 800,
      id: uuidv4(),
      time: Date.now(),
    },
  ],
};

db.then(async ({ connection }) => {
  await connection.db.dropDatabase();
  await modelUser.createDefaultUser();
  await connection.close();
});
