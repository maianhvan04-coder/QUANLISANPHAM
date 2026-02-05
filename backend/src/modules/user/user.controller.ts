import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { userService } from "./user.service";
import { createUserSchema, updateUserSchema } from "./user.schema";

type IdParams = { id: string };

export const userController = {
  list: asyncHandler(async (_req: Request, res: Response) => {
    res.json(await userService.list());
  }),

  get: asyncHandler(async (req: Request<IdParams>, res: Response) => {
    const user = await userService.getById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const payload = createUserSchema.parse(req.body);
    const user = await userService.create(payload);
    res.status(201).json(user);
  }),

  update: asyncHandler(async (req: Request<IdParams>, res: Response) => {
    const payload = updateUserSchema.parse(req.body);
    const user = await userService.update(req.params.id, payload);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  }),

  remove: asyncHandler(async (req: Request<IdParams>, res: Response) => {
    const ok = await userService.remove(req.params.id);
    if (!ok) return res.status(404).json({ message: "User not found" });
    res.status(204).send();
  }),
};
