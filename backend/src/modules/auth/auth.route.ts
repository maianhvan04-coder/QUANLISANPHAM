import { Router } from "express";
import { authController } from "./auth.controller";
import { authGuard } from "../../middlewares/authGuard";

export const authRouter = Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);

authRouter.get("/me", authGuard, (req, res) => {
  res.json({ user: req.user });
});
