import { Router } from "express";
import { userController } from "./user.controller";

export const userRouter = Router();

userRouter.get("/", userController.list);
userRouter.get("/:id", userController.get);
userRouter.post("/", userController.create);
userRouter.patch("/:id", userController.update);
userRouter.delete("/:id", userController.remove);
