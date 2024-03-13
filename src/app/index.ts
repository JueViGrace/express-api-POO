import { Express, Request, Response } from "express";
import { appSetup } from "./configs/app.setup";

const port = Number(process.env.PORT) || 7000;
const host = process.env.HOST || "localhost";

const app: Express = appSetup();

app.use("/health", async (req: Request, res: Response) => {
  res.send({ message: "health OK!" });
});

app.listen(port, host, () => {
  console.log(`[server]: Server is running at http://${host}:${port}`);
});
