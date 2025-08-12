import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      const user = await User.findOne({ username }).select("+password");
      console.log(user, "came back");
      if (!user) return done(null, false, { message: "user not found" });
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) return done(null, user);
      else return done(null, false, { message: "incorrect password" });
    } catch (error) {
      console.log("passport ".error);
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  console.log("Serealize user");
  done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
  console.log("deserialize user");
  try {
    const user = await User.findById(_id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
