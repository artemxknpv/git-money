import express from "express";
import bcrypt from "bcrypt";
import { modelUser } from "../models/user.js";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

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
  try {
    if (!login || !password) {
      return res.status(401).json([{ message: "Заполните все поля" }]);
    }
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
    return res.status(401).json([{ message: "Заполните все поля" }]);
  }
  return res.status(200).json({ id: user.id });
});

router.get("/logout", (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      return next(err);
    }
    res.clearCookie("sid");
    return res.status(200).end();
  });
});

router.patch("/forgotpassword", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await modelUser
      .findOne({
        mail: email,
      })
      .exec();
    if (!user) {
      return res.status(401).json([{ message: "Что-то пошло не так" }]);
    } else {
      //password generation
      const length = 8;
      const charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let retVal = "";
      for (let i = 0, n = charset.length; i < length; i++) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
      }

      //nodemailer
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: `${process.env.EMAIL}`,
          pass: `${process.env.EMAIL_PASSWORD}`,
        },
      });
      let send = {
        from: "GITmoney",
        to: email,
        subject: "Новый пароль",
        text: retVal,
      };
      transporter.sendMail(send, async function (error, info) {
        if (error) {
          return res.status(401).json([{ message: "Что-то пошло не так" }]);
        } else {
          const saltRounds = Number(process.env.SALT_ROUNDS ?? 3);
          const hashedPassword = await bcrypt.hash(retVal, saltRounds);
          user.password = hashedPassword;
          user.markModified();
          await user.save();
          return res.send("Done");
        }
      });
    }
  } catch (err) {
    return res.send("hello");
  }
});
export default router;
