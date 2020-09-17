import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  totalMoney: Number,
  categories: [
    {
      value: {
        type: String,
        enum: ["store", "expenditure"],
      },
      name: String,
      currentValue: Number,
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
    },
  ],
});

export const modelUser = mongoose.model("User", userSchema);
