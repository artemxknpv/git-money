import express from "express";
const app = express();

const port = 3001;

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`The server is app and listening on port ${port}`);
});
