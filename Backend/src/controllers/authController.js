import * as authService from "../services/authServices.js";

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = await authService.registerUser({ username, password });
    res.status(201).json({
      message: "User registered successfully",
      username: newUser.username,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to register", details: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const data = authService.loginUser(req.user);
    res.status(200).json({ message: "User logged in successfully", ...data });
  } catch (error) {
    res.status(500).json({ error: "Failed to login", details: error.message });
  }
};

export const authStatus = (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized user" });
  res.status(200).json({
    message: "User is logged in",
    ...authService.getAuthStatus(req.user),
  });
};

export const logout = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized user" });

  try {
    await authService.logoutUser(req.user);
    req.logout((err) => {
      if (err) return res.status(400).json({ message: "User not logged in" });
      res.status(200).json({ message: "User logout successful" });
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const setup2FA = async (req, res) => {
  try {
    const result = await authService.setup2FAForUser(req.user);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error setting up 2FA" });
  }
};

export const verify2FA = (req, res) => {
  const token = req.body.token;
  const jwtToken = authService.verify2FAForUser(req.user, token);

  if (!jwtToken) {
    return res.status(400).json({ message: "Invalid 2FA token" });
  }

  res.status(200).json({ message: "Successful", token: jwtToken });
};

export const reset2FA = async (req, res) => {
  try {
    await authService.reset2FAForUser(req.user);
    res.status(200).json({ message: "Successfully reset 2FA" });
  } catch (error) {
    res.status(400).json({ message: "Reset error" });
  }
};

// import bcrypt from "bcryptjs";
// import User from "../models/user.model.js";
// import speakeasy from "speakeasy";
// import qrCode from "qrcode";
// import jwt from "jsonwebtoken";

// export const register = async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       username,
//       password: hashedPassword,
//       isMfaActive: false,
//     });
//     await newUser.save();

//     res.status(201).json({
//       message: "User Registered sucessfully",
//       newUser: newUser.username,
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to register", message: error });
//   }
// };

// export const login = async (req, res) => {
//   try {
//     res.status(200).json({
//       message: "user logged in successfully",
//       username: req.user.username,
//       isMfaActive: req.user.isMfaActive,
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to register", message: error });
//   }
// };

// export const authStatus = async (req, res) => {
//   if (req.user) {
//     res.status(200).json({
//       message: "user is loggedin",
//       username: req.user.username,
//       isMfaActive: req.user.isMfaActive,
//     });
//   } else {
//     res.status(401).json({ message: "unauthorized user" });
//   }
// };

// export const logout = async (req, res) => {
//   if (!req.user) {
//     return res.status(401).json({ message: "unauthorized user" });
//   }

//   try {
//     const user = req.user;
//     user.isMfaActive = false;
//     user.twoFactorSecret = "";
//     await req.user.save();

//     req.logout((err) => {
//       if (err) {
//         return res.status(400).json({ message: "user not logged in" });
//       }
//       return res.status(200).json({ message: "user logout successfully" });
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "internal server error" });
//   }
// };

// export const setup2FA = async (req, res) => {
//   try {
//     console.log("req user is :", req.user);
//     const user = req.user;
//     let secret = speakeasy.generateSecret();
//     console.log("secret object is", secret);
//     user.twoFactorSecret = secret.base32;
//     user.isMfaActive = true;
//     await user.save();
//     const otpUrl = speakeasy.otpauthURL({
//       secret: secret.base32,
//       label: `${req.user.username}`,
//       issuer: "faisal nazir",
//       encoding: "base32",
//     });
//     const qrImageUrl = await qrCode.toDataURL(otpUrl);
//     res.status(200).json({
//       secret: secret.base32,
//       qrCode: qrImageUrl,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Error setup 2fa" });
//   }
// };

// export const verify2FA = async (req, res) => {
//   const { token } = req.body;
//   const user = req.user;

//   const verified = speakeasy.totp({
//     secret: user.twoFactorSecret,
//     encoding: "base32",
//     token,
//   });
//   if (verified) {
//     const jwtToken = jwt.sign(
//       { username: user.username },
//       process.env.JWT_SECRET,
//       { expiresIn: "1hr" }
//     );
//     res.status(200).json({ message: "successfull", token: jwtToken });
//   } else {
//     res.status(400).json({ message: "Invalid 2FA token " });
//   }
// };

// export const reset2FA = async (req, res) => {
//   try {
//     const user = req.user;
//     user.twoFactorSecret = "";
//     user.isMfaActive = false;
//     await user.save();
//     res.status(200).json({ message: "successfull reseted" });
//   } catch (error) {
//     res.status(400).json({ message: "resetd error" });
//   }
// };
