import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { authService } from "./auth.service";
import { loginSchema, registerSchema } from "./auth.schema";

export const authController = {
  register: asyncHandler(async (req: Request, res: Response) => {
    const payload = registerSchema.parse(req.body);
    res.status(201).json(await authService.register(payload));
  }),

  login: asyncHandler(async (req: Request, res: Response) => {
    const payload = loginSchema.parse(req.body);
    res.json(await authService.login(payload));
  }),
};
