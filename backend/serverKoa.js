import koa from "koa";
import json from "koa-json";
import koaRouter from "koa-router";
import mongoose from "mongoose";

const app = new koa();
const router = new koaRouter();

// the creation of the database
mongoose.connect(
  "mongodb+srv://vnikonov_63:faggot28A@cluster0.pnson.mongodb.net/finance?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use(json());
// app.use((ctx) => {
//   ctx.body = { msg: "Hello World" };
// });

app.use(router.routes()).use(router.allowedMethods());

router.get(
  "/test",
  (ctx) =>
    (ctx.body = {
      msg: "Hello test Koa",
    })
);

const port = 3001;
app.listen(port, () => {
  console.log(`The server is up and running on ${port}`);
});
