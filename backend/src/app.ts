import express from "express";
import cors from "cors";
import { router } from "./routes";
import { errorHandler } from "./middlewares/errorHandler";

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  // mount routes
  app.use("/api", router);

  // 404 (optional nhưng nên có)
  app.use((_req, res) => {
    res.status(404).json({ message: "Route not found" });
  });

  // error handler (phải đặt cuối)
  app.use(errorHandler);

  return app;
}
