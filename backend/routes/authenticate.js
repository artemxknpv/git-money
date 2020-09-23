import express from "express";
import passport from "passport";
import bcrypt from "bcrypt";
import { modelUser } from "../models/user.js";
import bodyParser from "body-parser";

const router = express.Router();

router.post("/registration", bodyParser.json(), async (req, res) => {
  const { firstName, lastName, mail, login, password, repPassword } = req.body;
  let errors = [];
  // Check that al filds required
  if (!firstName || !lastName || !mail || !login || !password) {
    errors.push({ message: "Заполните все поля" });
  }
  if (mail < 3) {
    errors.push({ message: "Email должен быть в виде example@example.com" });
  }
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(mail)) {
    errors.push({ message: "Email должен быть в виде example@example.com" });
  }
  if (password.length < 8) {
    // Check password length
    errors.push({ message: "Пароль должен быть больше 8 символов" });
  }
  if (repPassword !== password) {
    errors.push({ message: "Пароли не совпадают" });
    // return res.status(401).json(errors);
  }
  if (errors.length > 0) {
    // we can send user inputs
    return res.status(401).json(errors);
  } else {
    //validation passed
    const userMail = await modelUser.findOne({ mail });
    const userLogin = await modelUser.findOne({ login });
    if (userMail || userLogin) {
      if (userMail) {
        errors.push({ message: "Пользователь с таким Email уже существует" });
        // we can send user inputs
        return res.status(401).json(errors);
      }
      if (userLogin) {
        errors.push({
          message: "Пользователь с таким логином уже существует",
        });
        // we can send user inputs
        return res.status(401).json(errors);
      }
    } else {
      const saltRounds = Number(process.env.SALT_ROUNDS ?? 3);
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const user = await modelUser.createDefaultUser(
        firstName,
        lastName,
        mail,
        login,
        hashedPassword
      );
      req.session.user = { userId: user.id, login: user.login };
      return res.status(200).json({ id: user.id });
    }
  }
});

router.post("/login", async (req, res) => {
  const { login, password } = req.body;
  let user;
  if (!login || !password) {
    res.status(401).json([{ message: "Заполните все поля" }]);
  }
  try {
    user = await modelUser
      .findOne({
        login,
      })
      .exec();
    if (!user) {
      return res
        .status(401)
        .json([{ message: "Пользователя с таким логином не существует" }]);
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json([{ message: "Неправильно введен пароль" }]);
    }
    req.session.user = { userId: user.id, login: user.login };
  } catch (err) {
    console.log("Ошибка логинизации:", err);
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
