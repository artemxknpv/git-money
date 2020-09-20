import express from "express";
import passport from "passport";
import bcrypt from "bcrypt";
import { modelUser } from "../models/user.js";
import bodyParser from "body-parser";

const router = express.Router();

router.post("/registration", bodyParser.json(), async (req, res) => {
  const { firstName, lastName, mail, login, password } = req.body;
  let user;
  try {
    const saltRounds = Number(process.env.SALT_ROUNDS ?? 3);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    user = await modelUser.createDefaultUser(
      firstName,
      lastName,
      mail,
      login,
      hashedPassword
    );
    console.log(user);
    req.session.user = { userId: user.id, login: user.login };
  } catch (err) {
    console.log("Ошибка регистрации:", err);
  }
  res.status(200).json(user);
});

router.post("/login", async (req, res) => {
  const { login, password } = req.body;
  let user;
  try {
    user = await modelUser
      .findOne({
        login,
      })
      .exec();
    if (!user) {
      return res.status(401).end();
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).end();
    }
    req.session.user = { userId: user.id, login: user.login };
  } catch (err) {
    console.log("Ошибка регистрации:", err);
  }
  res.status(200).json({ id: user.id });
});

// router.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/login",
//     failureFlash: false,
//   })
// );

router.get("/logout", (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      return next(err);
    }
    res.clearCookie("sid");
    return res.status(200).end();
  });
});

export default router;
