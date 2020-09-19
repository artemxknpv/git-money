import express from "express";
import session from "express-session";
import fileStore from "session-file-store";
import mongoose from "mongoose";
import { modelUser } from "./models/user.js";

import categoryRouter from "./routes/categories.js";
import authenticateRouter from "./routes/authenticate.js";

const app = express();
const FileStore = fileStore(session);

app.use(express.json());

app.use(
  session({
    name: "sid",
    secret: process.env.SECRET ?? "muda muda muda",
    store: new FileStore({
      secret: process.env.SECRET ?? "muda muda muda",
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
    },
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

app.use((req, res, next) => {
  res.locals.username = req.session.user?.username;
  next();
});

app.use(categoryRouter);
app.use(authenticateRouter);

const port = 3001;

app.listen(port, () => {
  console.log(`The server is app and listening on port ${port}`);
});
