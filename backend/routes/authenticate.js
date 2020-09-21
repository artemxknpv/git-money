import express from "express";
import passport from "passport";
import bcrypt from "bcrypt";
import { modelUser } from "../models/user.js";
import bodyParser from "body-parser";

const router = express.Router();

router.post("/registration", bodyParser.json(), async (req, res) => {
  const { firstName, lastName, mail, login, password } = req.body;
  console.log(firstName, lastName, mail, login, password);
  let errors = [];
  // Check that al filds required
  if (!firstName || !lastName || !mail || !login || !password) {
    errors.push({ message: "Заполните все поля" });
  }
  // Check password length
  if (password.length < 8) {
    errors.push({ message: "Пароль должен быть больше 8 символов" });
  }
  if (errors.length > 0) {
    // we can send user inputs
    res.status(401).json(errors);
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
        errors.push({ message: "Пользователь с таким логином уже существует" });
        // we can send user inputs
        return res.status(401).json(errors);
      }
    } else {
      console.log(1);
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

// router.post("/registration", bodyParser.json(), async (req, res) => {
//   const { firstName, lastName, mail, login, password } = req.body;
//   let user;
//   try {
//     const saltRounds = Number(process.env.SALT_ROUNDS ?? 3);
//     const hashedPassword = await bcrypt.hash(password, saltRounds);
//     user = await modelUser.createDefaultUser(
//       firstName,
//       lastName,
//       mail,
//       login,
//       hashedPassword
//     );
//     req.session.user = { userId: user.id, login: user.login };
//   } catch (err) {
//     console.log("Ошибка регистрации:", err);
//   }
//   res.status(200).json(serializeUser(user));
// });

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
