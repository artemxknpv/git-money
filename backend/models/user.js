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
      iconId: Number,
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
  await newUser.createNewStore("Банк", 15);
  await newUser.createNewStore("Наличные", 20);
  await newUser.createNewStore("Копилка", 14);
  await newUser.createNewExpenditure("Аренда", 13);
  await newUser.createNewExpenditure("Топливо", 3);
  await newUser.createNewExpenditure("Еда", 1);
  await newUser.createNewExpenditure("Онлайн-подписки", 12);
  await newUser.createNewExpenditure("Свободное время", 0);
  await newUser.save();
  return newUser;
});

userSchema.methods.createNewStore = function (name, iconId) {
  this.categories.push({
    value: "store",
    name: name,
    iconId,
    currentNumber: 0,
    id: uuidv4(),
  });
  return this.save();
};

userSchema.methods.findTheTransaction = function (idTransaction) {
  const transaction = this.transactions.filter(transaction => {
    return String(transaction._id) === idTransaction;
  });
  return transaction;
};

userSchema.methods.deleteTheTransaction = async function (id) {
  console.log("id", id);
  // const a = await this.model("User").find({ "transactions.id": id });
  await this.model("User").updateOne(
    { "transactions.id": id },
    { $pull: { transactions: { id: id } } }
  );
};

userSchema.methods.deleteCategory = async function (id) {
  await this.model("User").update(
    {},
    {
      $pull: { categories: { _id: id } },
    }
  );
  return this.save();
};

userSchema.methods.addMoneyStore = async function (idStore, amount) {
  await this.model("User").updateOne(
    {
      "categories.id": idStore,
    },
    {
      $inc: {
        "categories.$.currentNumber": amount,
      },
    }
  );
  return this.save();
};

userSchema.methods.subtractMoneyExpenditure = async function (
  idTransaction,
  amount
) {
  await this.model("User").updateOne(
    {
      "categories.id": idTransaction,
    },
    {
      $inc: {
        "categories.$.currentNumber": -amount,
      },
    }
  );
  return this.save();
};

userSchema.methods.createNewExpenditure = function (name, iconId) {
  this.categories.push({
    value: "expenditure",
    name: name,
    iconId,
    currentNumber: 0,
    id: uuidv4(),
  });
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

userSchema.methods.updateCategoryIcon = async function (id, newIconId) {
  await this.model("User").update(
    { "categories.id": id },
    {
      $set: { "categories.$.iconId": newIconId },
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
    time: Date.now(),
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
    from: fromId,
    amount: amount,
    id: uuidv4(),
    time: Date.now(),
  });
  return this.save();
};

export const modelUser = mongoose.model("User", userSchema);
