import express from "express";
import session from "express-session";
import fileStore from "session-file-store";
import mongoose from "mongoose";
import { modelUser } from "./models/user.js";
import categoryRouter from "./routes/categories.js";
import authenticateRouter from "./routes/authenticate.js";
import path from "path";

mongoose.connect(
  "mongodb+srv://user_me:123ER123@cluster0.opbgv.mongodb.net/final?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);

const app = express();
const FileStore = fileStore(session);
app.use(express.json());

app.use(
  session({
    name: "sid",
    secret: "muda muda muda" ?? process.env.SECRET,
    store: new FileStore({
      secret: "muda muda muda" ?? process.env.SECRET,
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
    },
  })
);

// create a new user
app.put("/", async (req, res) => {
  await modelUser.createDefaultUser();
  res.end();
});

app.use("/auth", authenticateRouter);
app.use(categoryRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
});

app.use((err, req, res, next) => {
  console.log(">>>>", err);
});

const port = process.env.PORT ?? 3001;

app.listen(port, () => {
  console.log(`The server is app and listening on port ${port}`);
});
