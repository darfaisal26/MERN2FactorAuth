import { Router } from "express";
import passport from "passport";
import {
  authStatus,
  login,
  logout,
  register,
  reset2FA,
  setup2FA,
  verify2FA,
} from "../controllers/authController.js";

import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = Router();

router.post("/register", register);
router.post("/login", passport.authenticate("local"), login);
router.get("/status", authStatus);

router.post("/logout", logout);

router.post("/2fa/setup", isAuthenticated, setup2FA);
router.post("/2fa/verify", isAuthenticated, verify2FA);
router.post("/2fa/reset", isAuthenticated, reset2FA);

export default router;
