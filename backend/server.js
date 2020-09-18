import express from "express";
import session from "express-session";
import fileStore from "session-file-store";
import mongoose from "mongoose";
import { modelUser } from "./models/user.js";

import categoryRouter from "./routes/categories.js";

const app = express();
app.use(express.json());

const FileStore = fileStore(session);
const port = 3001;

app.use(
  session({
    store: new FileStore(),
    secret: process.env.SECRET ?? "muda muda muda",
  })
);

app.get("/", (req, res) => {
  res.send("Hello");
});

mongoose.connect(
  "mongodb+srv://user_me:123ER123@cluster0.opbgv.mongodb.net/final?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// create a new user
app.put("/", async (req, res) => {
  await modelUser.createDefaultUser();
  res.end();
});

app.use(categoryRouter);

app.listen(port, () => {
  console.log(`The server is app and listening on port ${port}`);
});
