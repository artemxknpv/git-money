import googleAuth from "passport-google-oauth20";
import LocalStrategy from "passport-local";
import bcrypt from "bcrypt";

import mongoose from "mongoose";
import { modelUser } from "../models/user.js";
import dotenv from "dotenv";
dotenv.config();

const GoogleStrategy = googleAuth.Strategy;
export const googleAuthentication = passport => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
      }
    )
  );
};

export const localAuthentication = (passport, getUserByLogin, getUserById) => {
  const authenticateUserLocal = async (login, password, done) => {
    const user = getUserByLogin(login);
    if (user) {
      return done(null, false, { message: "No user with such login" });
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Password is wrong" });
      }
    } catch (e) {
      return done(e);
    }
  };

  passport.use(
    new LocalStrategy(
      {
        usernameField: "login",
      },
      authenticateUserLocal
    )
  );
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    done(null, getUserById);
  });
};
