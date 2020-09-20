import mongoose from "mongoose";
export default mongoose.connect(
  "mongodb+srv://user_me:123ER123@cluster0.opbgv.mongodb.net/final?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log("Mongoose is connected");
  }
);
