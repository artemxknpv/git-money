import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  mail: {
    type: String,
    required: true,
    minlength: 3,
    match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  },
  login: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
    match: /^[A-Z]\w+$/i,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  totalMoney: Number,
  categories: [
    {
      value: {
        type: String,
        enum: ["store", "expenditure"],
      },
      name: String,
      currentNumber: Number,
      id: String,
    },
  ],
  transactions: [
    {
      value: {
        type: String,
        enum: ["gain", "loss"],
      },
      from: String,
      to: String,
      amount: Number,
      id: String,
      time: Number,
    },
  ],
});

userSchema.static("createDefaultUser", async function (
  firstName,
  lastName,
  mail,
  login,
  password
) {
  let newUser = new this({
    firstName,
    lastName,
    mail,
    login,
    password,
    totalMoney: 0,
    categories: [],
    transactions: [],
  });
  await newUser.createNewStore("bank");
  await newUser.createNewStore("cash");
  await newUser.createNewStore("deadend");
  await newUser.createNewExpenditure("rent");
  await newUser.createNewExpenditure("gas");
  await newUser.createNewExpenditure("food");
  await newUser.createNewExpenditure("online subscription");
  await newUser.createNewExpenditure("free time");
  await newUser.save();
  return newUser;
});

userSchema.methods.createNewStore = function (name) {
  this.categories.push({
    value: "store",
    name: name,
    currentNumber: 0,
    id: uuidv4(),
  });
  return this.save();
};

userSchema.methods.createNewExpenditure = function (name) {
  this.categories.push({
    value: "expenditure",
    name: name,
    currentNumber: 0,
    id: uuidv4(),
  });
  return this.save();
};

userSchema.methods.deleteCategory = async function (id) {
  await this.model("User").update(
    {},
    {
      $pull: { categories: { id: id } },
    }
  );
  return this.save();
};

userSchema.methods.updateCategory = async function (id, newName) {
  await this.model("User").update(
    { "categories.id": id },
    {
      $set: { "categories.$.name": newName },
    }
  );
  return this.save();
};

userSchema.methods.gainMoney = async function (idStore, amount) {
  await this.model("User").update(
    {
      "categories.id": idStore,
    },
    {
      $inc: {
        "categories.$.currentNumber": amount,
      },
    }
  );
  await this.transactions.push({
    value: "gain",
    to: idStore,
    amount: amount,
    id: uuidv4(),
  });
  return this.save();
};

userSchema.methods.spendMoney = async function (toId, fromId, amount) {
  await this.model("User").update(
    {
      "categories.id": toId,
    },
    {
      $inc: {
        "categories.$.currentNumber": amount,
      },
    }
  );
  await this.model("User").update(
    {
      "categories.id": fromId,
    },
    {
      $inc: {
        "categories.$.currentNumber": -amount,
      },
    }
  );
  await this.transactions.push({
    value: "loss",
    to: toId,
    from: toId,
    amount: amount,
    id: uuidv4(),
  });
  return this.save();
};

export const modelUser = mongoose.model("User", userSchema);
