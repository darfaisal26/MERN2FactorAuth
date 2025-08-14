import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import speakeasy from "speakeasy";
import qrCode from "qrcode";
import jwt from "jsonwebtoken";

export const registerUser = async ({ username, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    password: hashedPassword,
    isMfaActive: false,
  });
  await newUser.save();
  return newUser;
};

export const loginUser = (user) => {
  return {
    username: user.username,
    isMfaActive: user.isMfaActive,
  };
};

export const getAuthStatus = (user) => {
  return {
    username: user.username,
    isMfaActive: user.isMfaActive,
  };
};

export const logoutUser = async (user) => {
  user.isMfaActive = false;
  user.twoFactorSecret = "";
  await user.save();
};

export const setup2FAForUser = async (user) => {
  const secret = speakeasy.generateSecret();
  user.twoFactorSecret = secret.base32;
  user.isMfaActive = true;
  await user.save();

  const otpUrl = speakeasy.otpauthURL({
    secret: secret.base32,
    label: `${user.username}`,
    issuer: "faisal nazir",
    encoding: "base32",
  });

  const qrImageUrl = await qrCode.toDataURL(otpUrl);
  return {
    secret: secret.base32,
    qrCode: qrImageUrl,
  };
};

export const verify2FAForUser = (user, token) => {
  const verified = speakeasy.totp.verify({
    secret: user.twoFactorSecret,
    encoding: "base32",
    token,
  });

  if (!verified) return null;

  const jwtToken = jwt.sign(
    { username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return jwtToken;
};

export const reset2FAForUser = async (user) => {
  user.twoFactorSecret = "";
  user.isMfaActive = false;
  await user.save();
};
