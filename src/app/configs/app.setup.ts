import express, { Express } from "express";
import cors from "cors";
import errorHandler from "../middlewares/error-handler.middleware";
import routes from "../routes/app.routes";

export const appSetup = (): Express => {
  const app = express();

  app.use(cors());

  app.use(express.json());

  app.use(errorHandler);

  app.use("/api", routes);

  return app;
};
