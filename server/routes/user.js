import express from "express";

import authMiddleware from "../middleware/auth.js";

import {
  register,
  login,
  updateUserInfo,
} from "../controllers/userController.js";

const router = express();

router.post("/register", register);
router.post("/login", login);
router.patch("/:id", authMiddleware, updateUserInfo);

export default router;
